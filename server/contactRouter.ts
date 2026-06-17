import nodemailer from "nodemailer";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";
import { publicProcedure, router } from "./_core/trpc";

const RECIPIENT = "liran@socalytix.io";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  company: z.string().max(200).optional(),
  email: z.string().email("Invalid email address"),
  requestType: z.string().max(100).optional(),
  message: z.string().min(1, "Message is required").max(5000),
});

async function sendViaSmtp(input: z.infer<typeof contactSchema>): Promise<boolean> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.warn("[Contact] GMAIL_USER or GMAIL_APP_PASSWORD not set — falling back to notifyOwner");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: gmailUser, pass: gmailPass },
  });

  const subject = `V-Safe Inquiry: ${input.requestType || "General"} — ${input.name}`;
  const html = `
    <div style="font-family: 'Space Grotesk', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F8FAFC; border-radius: 12px; overflow: hidden;">
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

  await transporter.sendMail({
    from: `"V-Safe Website" <${gmailUser}>`,
    to: RECIPIENT,
    replyTo: input.email,
    subject,
    html,
  });

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

      // Try SMTP first, fall back to Manus owner notification
      const smtpSent = await sendViaSmtp(input).catch(() => false);

      if (!smtpSent) {
        // Fallback: send as Manus owner notification so the lead is never lost
        await notifyOwner({
          title: subject,
          content: `To: ${RECIPIENT}\n\n${content}`,
        }).catch((err) => {
          console.error("[Contact] Both SMTP and notifyOwner failed:", err);
        });
      }

      return { success: true };
    }),
});
