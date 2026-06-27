import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM ?? "Scalp Micro USA <onboarding@resend.dev>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "matthew.iulo1@gmail.com";

interface ApplicantSummary {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  cityState: string;
  hairLossStory: string;
  whyMe: string;
  applicationId: string;
}

// ─── Notification to Matt on each new application ────────────────────────────

export async function sendAdminNotification(a: ApplicantSummary): Promise<void> {
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    replyTo: a.email,
    subject: `New casting application — ${a.firstName} ${a.lastName}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 560px;">
        <h2 style="margin-bottom: 4px;">New Documentary Project application</h2>
        <p style="color:#666; margin-top:0;">${a.cityState} · Age ${a.age}</p>
        <table style="border-collapse:collapse; font-size:14px; margin:16px 0;">
          <tr><td style="padding:4px 12px 4px 0; color:#888;">Name</td><td>${a.firstName} ${a.lastName}</td></tr>
          <tr><td style="padding:4px 12px 4px 0; color:#888;">Email</td><td>${a.email}</td></tr>
          <tr><td style="padding:4px 12px 4px 0; color:#888;">Phone</td><td>${a.phone}</td></tr>
        </table>
        <p style="font-size:13px; color:#888; margin-bottom:2px;">Hair loss journey</p>
        <p style="font-size:14px; margin-top:0; white-space:pre-wrap;">${escapeHtml(a.hairLossStory)}</p>
        <p style="font-size:13px; color:#888; margin-bottom:2px;">Why they're the right candidate</p>
        <p style="font-size:14px; margin-top:0; white-space:pre-wrap;">${escapeHtml(a.whyMe)}</p>
        <p style="font-size:12px; color:#aaa;">View photos and full record in Supabase · ID ${a.applicationId}</p>
      </div>
    `,
  });
}

// ─── Confirmation to the applicant ───────────────────────────────────────────
// NOTE: placeholder copy — to be finalized before launch (see PLANNING.md).
// Should warm the applicant further down the funnel.

export async function sendApplicantConfirmation(a: ApplicantSummary): Promise<void> {
  await resend.emails.send({
    from: FROM,
    to: a.email,
    subject: "We received your application — The Documentary Project",
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 560px; color:#1a1a1a;">
        <p style="font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#e8401c;">
          Application Received
        </p>
        <h1 style="font-size:28px; margin:8px 0 16px;">Thank you, ${a.firstName}.</h1>
        <p style="font-size:15px; line-height:1.6;">
          Your story is now with us. Matt personally reviews every application for
          The Documentary Project, and we're grateful you shared yours.
        </p>
        <h3 style="font-size:15px; margin:24px 0 8px;">What happens next</h3>
        <ul style="font-size:14px; line-height:1.7; color:#333; padding-left:18px;">
          <li>Applications are reviewed on a rolling monthly basis.</li>
          <li>If your story connects, someone from our team will reach out directly
              to discuss the filming and treatment process.</li>
          <li>Selected candidates receive a fully sponsored SMP transformation.</li>
        </ul>
        <h3 style="font-size:15px; margin:24px 0 8px;">While you wait</h3>
        <p style="font-size:14px; line-height:1.6; color:#333;">
          Learn more about Scalp Micro USA and see real transformations on our
          <a href="https://scalpmicrousa.com" style="color:#e8401c;">main site</a>.
          [Placeholder — add social proof, before/afters, FAQ links before launch.]
        </p>
        <p style="font-size:12px; color:#999; margin-top:32px;">
          Scalp Micro USA · The Documentary Project
        </p>
      </div>
    `,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
