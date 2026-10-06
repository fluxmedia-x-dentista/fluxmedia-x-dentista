import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { CollectionEditor } from "@/components/admin/collection-editor";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { Faq, SocialPageService, SocialPageStep } from "@/lib/types";
import { L } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function SocialPageContentPage() {
  const supabase = createAdminSupabase();

  let services: SocialPageService[] = [];
  let steps: SocialPageStep[] = [];
  let faqs: Faq[] = [];

  if (supabase) {
    const [servicesResult, stepsResult, faqsResult] = await Promise.all([
      supabase.from("social_page_services").select("*").order("sort_order"),
      supabase.from("social_page_steps").select("*").order("sort_order"),
      supabase
        .from("faqs")
        .select("*")
        .eq("scope", "social")
        .order("sort_order"),
    ]);
    services = (servicesResult.data ?? []) as SocialPageService[];
    steps = (stepsResult.data ?? []) as SocialPageStep[];
    faqs = (faqsResult.data ?? []) as Faq[];
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold">
            Social page content
          </h1>
          <p className="mt-1.5 text-[13px] text-muted">
            Services, process steps and FAQ of /social-media. Headlines and
            button texts live in{" "}
            <Link
              href="/admin/pages/social"
              className="text-sky hover:underline"
            >
              Pages → Social page
            </Link>
            .
          </p>
        </div>
        <a
          href="/social-media"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost btn-sm"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View page
        </a>
      </div>

      <CollectionEditor
        compact
        resource="social_page_services"
        title="Services"
        sub="The grid of what the team delivers every month."
        addLabel="Add service"
        rows={services.map((service) => ({ ...service }))}
        rowTitle={(row) => L(row.title as SocialPageService["title"], "en")}
        defaults={{
          icon: "sparkles",
          title: { en: "", fr: "", ar: "" },
          text: { en: "", fr: "", ar: "" },
          active: true,
        }}
        fields={[
          { name: "title", label: "Title", type: "ml" },
          { name: "icon", label: "Icon (lucide name)", type: "text" },
          { name: "text", label: "Text", type: "mlarea" },
          { name: "active", label: "Visible", type: "bool" },
        ]}
      />

      <CollectionEditor
        compact
        resource="social_page_steps"
        title="Process steps"
        sub="The numbered “how we work” timeline."
        addLabel="Add step"
        rows={steps.map((step) => ({ ...step }))}
        rowTitle={(row) => L(row.title as SocialPageStep["title"], "en")}
        defaults={{
          step_no: 1,
          title: { en: "", fr: "", ar: "" },
          text: { en: "", fr: "", ar: "" },
          active: true,
        }}
        fields={[
          { name: "title", label: "Title", type: "ml" },
          { name: "step_no", label: "Step number", type: "number" },
          { name: "text", label: "Text", type: "mlarea" },
          { name: "active", label: "Visible", type: "bool" },
        ]}
      />

      <CollectionEditor
        compact
        resource="faqs"
        title="Social FAQ"
        sub="Questions shown at the bottom of the social media page."
        addLabel="Add question"
        rows={faqs.map((faq) => ({ ...faq }))}
        rowTitle={(row) => L(row.question as Faq["question"], "en")}
        defaults={{
          scope: "social",
          question: { en: "", fr: "", ar: "" },
          answer: { en: "", fr: "", ar: "" },
          visible: true,
        }}
        fields={[
          { name: "question", label: "Question", type: "ml", full: true },
          { name: "answer", label: "Answer", type: "mlarea" },
          { name: "visible", label: "Visible", type: "bool" },
        ]}
      />
    </div>
  );
}
