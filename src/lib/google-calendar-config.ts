/**
 * Google Calendar Appointment Schedule configuration.
 *
 * Use the FULL iframe src URL from Share → Website embed:
 *   https://calendar.google.com/calendar/appointments/schedules/AcZssZ0...?gv=true
 *
 * Do NOT use calendar.app.google/ short links.
 *
 * Set GOOGLE_APPOINTMENT_URL in Vercel (Settings → Environment Variables), then redeploy.
 */

function readAppointmentUrl() {
  return (
    process.env.GOOGLE_APPOINTMENT_URL?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL?.trim() ||
    ""
  );
}

export const googleCalendarConfig = {
  get appointmentUrl() {
    return readAppointmentUrl();
  },
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
  /calendar\.app\.google/i,
];

const VALID_PATTERNS = [/calendar\.google\.com\/calendar\/appointments/i];

export type AppointmentUrlValidation =
  | { valid: true; embedUrl: string; bookingUrl: string }
  | { valid: false; reason: string };

export function validateGoogleAppointmentUrl(
  input: string
): AppointmentUrlValidation {
  const trimmed = input.trim();

  if (!trimmed) {
    return { valid: false, reason: "No booking URL configured." };
  }

  if (trimmed.includes("your-") || trimmed.includes("YOUR_")) {
    return {
      valid: false,
      reason: "Replace the placeholder with your real embed URL.",
    };
  }

  for (const pattern of INVALID_PATTERNS) {
    if (pattern.test(trimmed)) {
      if (/calendar\.app\.google/i.test(trimmed)) {
        return {
          valid: false,
          reason:
            'Short links (calendar.app.google/...) break on Vercel. Use the full URL: calendar.google.com/calendar/appointments/schedules/...',
        };
      }
      return {
        valid: false,
        reason:
          'Copy the iframe src URL that contains "/calendar/appointments/schedules/".',
      };
    }
  }

  let url = extractEmbedUrl(trimmed);

  const looksValid = VALID_PATTERNS.some((p) => p.test(url));
  if (!looksValid) {
    return {
      valid: false,
      reason:
        'URL must start with https://calendar.google.com/calendar/appointments/schedules/',
    };
  }

  const embedUrl = normalizeEmbedUrl(url);
  const bookingUrl = normalizeBookingUrl(url);

  return { valid: true, embedUrl, bookingUrl };
}

export function getResolvedAppointmentConfig() {
  return validateGoogleAppointmentUrl(googleCalendarConfig.appointmentUrl);
}

export function isGoogleAppointmentConfigured() {
  return getResolvedAppointmentConfig().valid;
}

function extractEmbedUrl(input: string): string {
  const iframeMatch = input.match(/src=["']([^"']+)["']/i);
  if (iframeMatch?.[1]) {
    return iframeMatch[1].trim();
  }
  return input.replace(/\s+/g, " ").trim();
}

/** URL for iframe embed (?gv=true) */
function normalizeEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("gv", "true");
    return parsed.toString();
  } catch {
    return url.includes("?") ? `${url}&gv=true` : `${url}?gv=true`;
  }
}

/** URL for scheduling button + direct link (no gv param) */
function normalizeBookingUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete("gv");
    return parsed.toString();
  } catch {
    return url.replace(/[?&]gv=true/, "");
  }
}

export function isGoogleCalendarApiConfigured() {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN
  );
}
