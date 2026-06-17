import { Resend } from "resend";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";
import { publicProcedure, router } from "./_core/trpc";

const RECIPIENT = "sales@socalytix.io";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  company: z.string().max(200).optional(),
  email: z.string().email("Invalid email address"),
  requestType: z.string().max(100).optional(),
  message: z.string().min(1, "Message is required").max(5000),
});

async function trySendViaResend(input: z.infer<typeof contactSchema>): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Contact] RESEND_API_KEY not set");
    return false;
  }

  const resend = new Resend(apiKey);
  const subject = `V-Safe Inquiry: ${input.requestType || "General"} — ${input.name}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F8FAFC; border-radius: 12px; overflow: hidden;">
      <div style="background: #0F1F4B; padding: 32px 40px;">
        <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">New V-Safe Inquiry</h1>
        <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 14px;">${subject}</p>
      </div>
      <div style="padding: 32px 40px; background: white;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 120px;">Name</td><td style="padding: 8px 0; color: #0F1F4B; font-weight: 600;">${input.name}</td></tr>
          ${input.company ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Company</td><td style="padding: 8px 0; color: #0F1F4B;">${input.company}</td></tr>` : ""}
          <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${input.email}" style="color: #0D9488;">${input.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Request type</td><td style="padding: 8px 0; color: #0F1F4B;">${input.requestType || "General inquiry"}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
        <h3 style="color: #0F1F4B; font-size: 14px; margin: 0 0 10px;">Message</h3>
        <p style="color: #374151; font-size: 14px; line-height: 1.7; white-space: pre-wrap; margin: 0;">${input.message}</p>
      </div>
      <div style="padding: 20px 40px; background: #F8FAFC; border-top: 1px solid #f1f5f9;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">Sent from the V-Safe website contact form</p>
      </div>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: "V-Safe Website <noreply@v-safe.ai>",
    to: RECIPIENT,
    replyTo: input.email,
    subject,
    html,
  });

  if (error) {
    console.error("[Contact] Resend error:", error);
    return false;
  }

  console.log(`[Contact] Resend sent successfully to ${RECIPIENT}`);
  return true;
}

export const contactRouter = router({
  submit: publicProcedure
    .input(contactSchema)
    .mutation(async ({ input }) => {
      const subject = `V-Safe Inquiry: ${input.requestType || "General"} — ${input.name}`;
      const content = [
        `Name: ${input.name}`,
        input.company ? `Company: ${input.company}` : null,
        `Email: ${input.email}`,
        `Request type: ${input.requestType || "General inquiry"}`,
        "",
        "Message:",
        input.message,
      ]
        .filter(Boolean)
        .join("\n");

      // Fire email in background — always return success immediately to the user
      void (async () => {
        let sent = false;
        try {
          sent = await trySendViaResend(input);
        } catch (err) {
          console.error("[Contact] Resend threw:", err instanceof Error ? err.message : String(err));
        }

        if (!sent) {
          console.log("[Contact] Resend unavailable — using notifyOwner fallback");
          try {
            await notifyOwner({
              title: subject,
              content: `To: ${RECIPIENT}\n\n${content}`,
            });
            console.log("[Contact] notifyOwner fallback succeeded");
          } catch (err) {
            console.error("[Contact] Both Resend and notifyOwner failed:", err instanceof Error ? err.message : String(err));
          }
        }
      })();

      return { success: true };
    }),
});
