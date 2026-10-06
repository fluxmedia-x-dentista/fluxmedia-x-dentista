/**
 * Optional outbound webhook (Make.com / Zapier / n8n / Google Sheets).
 *
 * Server-side only. Never throws: a broken automation must not break an order.
 */

export type MakeEvent = "order.created" | "order.updated" | "contact.created";

export async function sendToMake(
  event: MakeEvent,
  data: unknown,
): Promise<void> {
  const url = process.env.MAKE_WEBHOOK_URL;
  if (!url) return;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        sent_at: new Date().toISOString(),
        data,
      }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("[make] webhook failed", event, error);
  }
}
