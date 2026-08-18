import { Resend } from "resend";
import {
  formatMeetingDateTime,
  getMeetingEndTime,
  type LeadFormValues,
  type MeetingFormValues,
} from "./validations";

const resend = new Resend(process.env.RESEND_API_KEY);

const clientEmail =
  process.env.CLIENT_EMAIL || "ddonathan84@gmail.com";

const fromEmail =
  process.env.EMAIL_FROM ||
  "David Donathan Media <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function assertEmailConfigured() {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes("xxxx")) {
    throw new Error(
      "Email is not configured. Add a valid RESEND_API_KEY to .env.local."
    );
  }
}

function formatLeadHtml(data: LeadFormValues) {
  const rows = [
    ["Full Name", data.fullName],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Business Name", data.businessName || "—"],
    ["Website URL", data.websiteUrl || "—"],
    ["Service Required", data.service],
    ["Selected Package", data.packageName || "—"],
    ["Add-ons", data.addOns?.length ? data.addOns.join(", ") : "—"],
    ["Source", data.source || "Website"],
    ["Project Notes", data.message],
  ];

  return `
    <div style="font-family:Arial,sans-serif;background:#0a1628;padding:32px;color:#e8eef7;">
      <div style="max-width:640px;margin:0 auto;background:#10233f;border:1px solid #1e3a5f;border-radius:16px;overflow:hidden;">
        <div style="padding:28px 32px;background:linear-gradient(135deg,#0d213f,#164e63);">
          <p style="margin:0;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#67e8f9;">New Lead</p>
          <h1 style="margin:8px 0 0;font-size:24px;color:#ffffff;">David Donathan Media</h1>
          <p style="margin:8px 0 0;color:#b6c7dc;">A new proposal request was submitted from the website.</p>
        </div>
        <div style="padding:28px 32px;">
          <table style="width:100%;border-collapse:collapse;">
            ${rows
              .map(
                ([label, value]) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1e3a5f;color:#8fb0d0;width:38%;vertical-align:top;">${label}</td>
                <td style="padding:10px 0;border-bottom:1px solid #1e3a5f;color:#ffffff;vertical-align:top;">${escapeHtml(String(value))}</td>
              </tr>`
              )
              .join("")}
          </table>
        </div>
      </div>
    </div>
  `;
}

function formatAutoReplyHtml(data: LeadFormValues) {
  return `
    <div style="font-family:Arial,sans-serif;background:#f4f8fc;padding:32px;color:#0a1628;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #d7e4f2;border-radius:16px;overflow:hidden;">
        <div style="padding:28px 32px;background:#0a1628;color:#ffffff;">
          <p style="margin:0;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#67e8f9;">David Donathan Media</p>
          <h1 style="margin:8px 0 0;font-size:24px;">Thanks, ${escapeHtml(data.fullName)}!</h1>
        </div>
        <div style="padding:28px 32px;line-height:1.6;">
          <p style="margin:0 0 16px;">We received your request for <strong>${escapeHtml(data.service)}</strong>.</p>
          <p style="margin:0 0 16px;">David will review your details and reach out within <strong>24 hours</strong>.</p>
          <p style="margin:0 0 16px;">If you need to talk sooner, call <a href="tel:+18722059258" style="color:#0e7490;">+1 872-205-9258</a>.</p>
          <p style="margin:24px 0 0;color:#5b6f86;">— David Donathan Media</p>
        </div>
      </div>
    </div>
  `;
}

function formatMeetingNotificationHtml(data: MeetingFormValues) {
  const duration = Number(data.duration);
  const when = formatMeetingDateTime(data.date, data.time);
  const endTime = getMeetingEndTime(data.date, data.time, duration);
  const meetingLabel =
    duration === 15 ? "15 Minute Consultation" : "30 Minute Strategy Call";

  const rows = [
    ["Client Name", data.fullName],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Meeting Type", meetingLabel],
    ["Scheduled For", when],
    ["End Time", endTime],
    ["Notes", data.notes || "—"],
    ["Source", data.source || "Website"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;background:#0a1628;padding:32px;color:#e8eef7;">
      <div style="max-width:640px;margin:0 auto;background:#10233f;border:1px solid #1e3a5f;border-radius:16px;overflow:hidden;">
        <div style="padding:28px 32px;background:linear-gradient(135deg,#0d213f,#164e63);">
          <p style="margin:0;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#67e8f9;">Meeting Scheduled</p>
          <h1 style="margin:8px 0 0;font-size:24px;color:#ffffff;">New appointment on your website</h1>
          <p style="margin:8px 0 0;color:#b6c7dc;">A visitor registered a meeting through the booking calendar.</p>
        </div>
        <div style="padding:28px 32px;">
          <p style="margin:0 0 20px;padding:16px;background:#0a2740;border-radius:12px;color:#ffffff;font-size:18px;">
            <strong>${escapeHtml(data.fullName)}</strong> scheduled a <strong>${escapeHtml(meetingLabel)}</strong><br/>
            <span style="color:#67e8f9;">${escapeHtml(when)}</span>
          </p>
          <table style="width:100%;border-collapse:collapse;">
            ${rows
              .map(
                ([label, value]) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1e3a5f;color:#8fb0d0;width:38%;vertical-align:top;">${label}</td>
                <td style="padding:10px 0;border-bottom:1px solid #1e3a5f;color:#ffffff;vertical-align:top;">${escapeHtml(String(value))}</td>
              </tr>`
              )
              .join("")}
          </table>
        </div>
      </div>
    </div>
  `;
}

function formatMeetingConfirmationHtml(data: MeetingFormValues) {
  const duration = Number(data.duration);
  const when = formatMeetingDateTime(data.date, data.time);
  const endTime = getMeetingEndTime(data.date, data.time, duration);
  const meetingLabel =
    duration === 15 ? "15 Minute Consultation" : "30 Minute Strategy Call";

  return `
    <div style="font-family:Arial,sans-serif;background:#f4f8fc;padding:32px;color:#0a1628;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #d7e4f2;border-radius:16px;overflow:hidden;">
        <div style="padding:28px 32px;background:#0a1628;color:#ffffff;">
          <p style="margin:0;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#67e8f9;">David Donathan Media</p>
          <h1 style="margin:8px 0 0;font-size:24px;">Your meeting is scheduled</h1>
        </div>
        <div style="padding:28px 32px;line-height:1.6;">
          <p style="margin:0 0 16px;">Hi ${escapeHtml(data.fullName)},</p>
          <p style="margin:0 0 16px;">Your <strong>${escapeHtml(meetingLabel)}</strong> with David is confirmed.</p>
          <p style="margin:0 0 8px;"><strong>When:</strong> ${escapeHtml(when)}</p>
          <p style="margin:0 0 16px;"><strong>Ends:</strong> ${escapeHtml(endTime)}</p>
          <p style="margin:0 0 16px;">David will reach out if any additional details are needed. For changes, reply to this email or call <a href="tel:+18722059258" style="color:#0e7490;">+1 872-205-9258</a>.</p>
          <p style="margin:24px 0 0;color:#5b6f86;">— David Donathan Media</p>
        </div>
      </div>
    </div>
  `;
}

export async function sendLeadEmails(data: LeadFormValues) {
  assertEmailConfigured();

  const subjectParts = [
    "New lead",
    data.service,
    data.packageName ? `• ${data.packageName}` : null,
  ].filter(Boolean);

  const notification = await resend.emails.send({
    from: fromEmail,
    to: [clientEmail],
    replyTo: data.email,
    subject: `${subjectParts.join(" ")} — ${data.fullName}`,
    html: formatLeadHtml(data),
  });

  if (notification.error) {
    throw new Error(notification.error.message);
  }

  const autoReply = await resend.emails.send({
    from: fromEmail,
    to: [data.email],
    subject: "We received your request — David Donathan Media",
    html: formatAutoReplyHtml(data),
  });

  if (autoReply.error) {
    throw new Error(autoReply.error.message);
  }

  return {
    notificationId: notification.data?.id,
    autoReplyId: autoReply.data?.id,
  };
}

export async function sendMeetingEmails(data: MeetingFormValues) {
  assertEmailConfigured();

  const when = formatMeetingDateTime(data.date, data.time);
  const duration = Number(data.duration);
  const meetingLabel =
    duration === 15 ? "15 Minute Consultation" : "30 Minute Strategy Call";

  const notification = await resend.emails.send({
    from: fromEmail,
    to: [clientEmail],
    replyTo: data.email,
    subject: `Meeting scheduled — ${data.fullName} on ${when}`,
    html: formatMeetingNotificationHtml(data),
  });

  if (notification.error) {
    throw new Error(notification.error.message);
  }

  const confirmation = await resend.emails.send({
    from: fromEmail,
    to: [data.email],
    subject: `Your ${meetingLabel} is confirmed — David Donathan Media`,
    html: formatMeetingConfirmationHtml(data),
  });

  if (confirmation.error) {
    throw new Error(confirmation.error.message);
  }

  return {
    notificationId: notification.data?.id,
    confirmationId: confirmation.data?.id,
  };
}
