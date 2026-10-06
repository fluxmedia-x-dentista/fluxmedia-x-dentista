import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

import { getAdminSession } from "@/lib/auth";
import { RESOURCES, isResource, pickColumns } from "@/lib/admin/resources";
import { createAdminSupabase } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: { resource: string } };

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function forbidden() {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

function notConfigured() {
  return NextResponse.json(
    { error: "Supabase is not configured" },
    { status: 503 },
  );
}

async function revalidate(resource: string) {
  const config = RESOURCES[resource];
  for (const tag of config.tags) revalidateTag(tag);
  revalidatePath("/", "layout");
}

/* ------------------------------- read -------------------------------- */

export async function GET(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return unauthorized();
  if (!isResource(params.resource)) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }

  const supabase = createAdminSupabase();
  if (!supabase) return notConfigured();

  const config = RESOURCES[params.resource];
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const limit = Number(url.searchParams.get("limit") ?? 500);

  let query = supabase.from(config.table).select(config.select ?? "*");

  if (id) {
    query = query.eq(config.primaryKey, id);
  } else {
    // Simple equality filters: ?status=click&service_type=card
    for (const [key, value] of url.searchParams.entries()) {
      if (["limit", "id", "q", "from", "to"].includes(key)) continue;
      if (config.columns.includes(key) || key === config.primaryKey) {
        query = query.eq(key, value);
      }
    }
    if (config.orderBy) {
      query = query.order(config.orderBy.column, {
        ascending: config.orderBy.ascending,
      });
    }
    query = query.limit(Math.min(Math.max(limit, 1), 2000));
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data: id ? (data?.[0] ?? null) : data });
}

/* ------------------------------ create -------------------------------- */

export async function POST(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return unauthorized();
  if (!isResource(params.resource)) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }

  const config = RESOURCES[params.resource];
  if (config.ownerOnly && session.role !== "owner") return forbidden();

  const supabase = createAdminSupabase();
  if (!supabase) return notConfigured();

  const body = (await request.json()) as Record<string, unknown>;
  const payload = pickColumns(config, body);

  if (params.resource === "site_content") {
    // Content is upserted by key so the registry stays the source of truth.
    const { data, error } = await supabase
      .from(config.table)
      .upsert(
        {
          ...payload,
          updated_by: session.email,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "key" },
      )
      .select("*")
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });
    await revalidate(params.resource);
    return NextResponse.json({ data });
  }

  const { data, error } = await supabase
    .from(config.table)
    .insert(payload)
    .select(config.select ?? "*")
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  await revalidate(params.resource);
  return NextResponse.json({ data });
}

/* ------------------------------ update -------------------------------- */

async function updateHandler(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return unauthorized();
  if (!isResource(params.resource)) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }

  const config = RESOURCES[params.resource];
  if (config.ownerOnly && session.role !== "owner") return forbidden();

  const supabase = createAdminSupabase();
  if (!supabase) return notConfigured();

  const url = new URL(request.url);
  const body = (await request.json()) as Record<string, unknown>;
  const id = url.searchParams.get("id") ?? (body[config.primaryKey] as string);

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const payload = pickColumns(config, body);
  payload.updated_at = new Date().toISOString();
  if (params.resource === "site_content") payload.updated_by = session.email;

  const { data, error } = await supabase
    .from(config.table)
    .update(payload)
    .eq(config.primaryKey, id)
    .select(config.select ?? "*")
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  await revalidate(params.resource);
  return NextResponse.json({ data });
}

export const PATCH = updateHandler;
export const PUT = updateHandler;

/* ------------------------------ delete -------------------------------- */

export async function DELETE(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return unauthorized();
  if (!isResource(params.resource)) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }

  const config = RESOURCES[params.resource];
  if (
    (config.ownerOnly || config.ownerOnlyDelete) &&
    session.role !== "owner"
  ) {
    return forbidden();
  }

  const supabase = createAdminSupabase();
  if (!supabase) return notConfigured();

  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabase
    .from(config.table)
    .delete()
    .eq(config.primaryKey, id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  await revalidate(params.resource);
  return NextResponse.json({ ok: true });
}
