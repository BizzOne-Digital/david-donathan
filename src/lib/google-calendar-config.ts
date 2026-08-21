/**
 * Google Calendar Appointment Schedule embed configuration.
 *
 * Paste ONLY the iframe src URL from:
 * Google Calendar → Appointment schedule → Share → Website embed
 *
 * Example (correct):
 *   https://calendar.google.com/calendar/appointments/schedules/AcZssZ0abc123?gv=true
 *
 * NOT a CSS/JS link like scheduling-button-script.css
 */

export const googleCalendarConfig = {
  appointmentUrl:
    process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL?.trim() || "",
  calendarId: process.env.GOOGLE_CALENDAR_ID?.trim() || "primary",
  timezone: process.env.GOOGLE_CALENDAR_TIMEZONE?.trim() || "America/Chicago",
  clientEmail: process.env.CLIENT_EMAIL || "ddonathan84@gmail.com",
  setupUrl:
    "https://support.google.com/calendar/answer/10729749?hl=en",
};

const INVALID_PATTERNS = [
  /\.css/i,
  /\.js/i,
  /scheduling-button-script/i,
  /rel=["']stylesheet/i,
  /stylesheet/i,
];

const VALID_PATTERNS = [
  /calendar\.google\.com\/calendar\/appointments/i,
  /calendar\.app\.google/i,
];

export type AppointmentUrlValidation =
  | { valid: true; embedUrl: string }
  | { valid: false; reason: string };

/** Validate and normalize the appointment embed URL. */
export function validateGoogleAppointmentUrl(
  input: string
): AppointmentUrlValidation {
  const trimmed = input.trim();

  if (!trimmed) {
    return { valid: false, reason: "No URL configured." };
  }

  if (trimmed.includes("your-") || trimmed.includes("YOUR_")) {
    return { valid: false, reason: "Replace the placeholder with your real embed URL." };
  }

  for (const pattern of INVALID_PATTERNS) {
    if (pattern.test(trimmed)) {
      return {
        valid: false,
        reason:
          'You pasted a CSS or script link — not the booking page. Copy the iframe src that contains "/calendar/appointments/" instead.',
      };
    }
  }

  let url = extractEmbedUrl(trimmed);

  const looksValid = VALID_PATTERNS.some((p) => p.test(url));
  if (!looksValid) {
    return {
      valid: false,
      reason:
        'URL must contain "/calendar/appointments/" (from Google Calendar → Share → Website embed).',
    };
  }

  url = normalizeAppointmentUrl(url);
  return { valid: true, embedUrl: url };
}

export function isGoogleAppointmentConfigured() {
  return validateGoogleAppointmentUrl(googleCalendarConfig.appointmentUrl).valid;
}

export function getGoogleAppointmentEmbedUrl(input: string): string {
  const result = validateGoogleAppointmentUrl(input);
  return result.valid ? result.embedUrl : "";
}

function extractEmbedUrl(input: string): string {
  // Accept full iframe HTML block pasted from Google (inline booking page)
  const iframeMatch = input.match(/src=["']([^"']+)["']/i);
  if (iframeMatch?.[1]) {
    return iframeMatch[1].trim();
  }
  return input.replace(/\s+/g, " ").trim();
}

function normalizeAppointmentUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("calendar.google.com")) {
      parsed.searchParams.set("gv", "true");
      return parsed.toString();
    }
    return url;
  } catch {
    return url;
  }
}

export function isGoogleCalendarApiConfigured() {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN
  );
}
