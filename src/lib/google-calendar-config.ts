/**
 * Google Calendar booking — verified working URLs with env override.
 *
 * GOOGLE_APPOINTMENT_URL = short link (calendar.app.google/...) for direct booking
 * GOOGLE_APPOINTMENT_EMBED_URL = optional full embed URL for inline calendar
 *
 * Known broken schedule (do not use): AcZssZ2Vnk87...
 */

/** Verified working — tested Aug 2026 */
export const DEFAULT_BOOKING_URL =
  "https://calendar.app.google/K3yLS4tnKzaEQhrH7";

export const DEFAULT_EMBED_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3MifHU_aNxC1QW994rSOvDWUpcwU4-N0GCcvKLwe4K13rfzR9CwXb42FQaIYlyIIsUIrgwn3-n?gv=true";

const BROKEN_SCHEDULE_FRAGMENT =
  "AcZssZ2Vnk87FOlG3LfccUwuflKQ9abzksw1EcKcHkflErH3M6rr1EMt8-VfeZZtFUSWgqA9D3V6-tgJ";

function readEnv(key: string) {
  return process.env[key]?.trim() || "";
}

function readAppointmentUrl() {
  return (
    readEnv("GOOGLE_APPOINTMENT_URL") ||
    readEnv("NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL") ||
    ""
  );
}

function readEmbedUrl() {
  return readEnv("GOOGLE_APPOINTMENT_EMBED_URL") || "";
}

export const googleCalendarConfig = {
  get appointmentUrl() {
    return resolveBookingUrl();
  },
  get embedUrl() {
    return resolveEmbedUrl();
  },
  calendarId: readEnv("GOOGLE_CALENDAR_ID") || "primary",
  timezone: readEnv("GOOGLE_CALENDAR_TIMEZONE") || "America/Chicago",
  clientEmail: readEnv("CLIENT_EMAIL") || "ddonathan84@gmail.com",
  setupUrl:
    "https://support.google.com/calendar/answer/10729749?hl=en",
};

const INVALID_PATTERNS = [
  /\.css/i,
  /\.js/i,
  /scheduling-button-script/i,
  /rel=["']stylesheet/i,
];

export type AppointmentUrlValidation =
  | {
      valid: true;
      bookingUrl: string;
      embedUrl: string;
      isShortLink: boolean;
      usedFallback: boolean;
    }
  | { valid: false; reason: string };

function extractUrl(input: string): string {
  const iframeMatch = input.match(/src=["']([^"']+)["']/i);
  if (iframeMatch?.[1]) return iframeMatch[1].trim();
  return input.replace(/\s+/g, " ").trim();
}

function isBrokenSchedule(url: string) {
  return url.includes(BROKEN_SCHEDULE_FRAGMENT);
}

function isShortLink(url: string) {
  return /calendar\.app\.google/i.test(url);
}

function isFullSchedule(url: string) {
  return /calendar\.google\.com\/calendar\/appointments/i.test(url);
}

function normalizeEmbed(url: string) {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("gv", "true");
    return parsed.toString();
  } catch {
    return url.includes("?") ? `${url}&gv=true` : `${url}?gv=true`;
  }
}

function normalizeBooking(url: string) {
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete("gv");
    return parsed.toString();
  } catch {
    return url.replace(/[?&]gv=true/, "");
  }
}

function resolveBookingUrl(): string {
  const raw = readAppointmentUrl();
  if (!raw || isBrokenSchedule(raw) || raw.includes("YOUR_")) {
    return DEFAULT_BOOKING_URL;
  }
  const url = extractUrl(raw);
  if (isBrokenSchedule(url)) return DEFAULT_BOOKING_URL;
  if (isShortLink(url)) return url;
  if (isFullSchedule(url)) return normalizeBooking(url);
  return DEFAULT_BOOKING_URL;
}

function resolveEmbedUrl(): string {
  const embedEnv = readEmbedUrl();
  if (embedEnv && !isBrokenSchedule(embedEnv)) {
    return normalizeEmbed(extractUrl(embedEnv));
  }

  const raw = readAppointmentUrl();
  if (raw && isFullSchedule(extractUrl(raw)) && !isBrokenSchedule(raw)) {
    return normalizeEmbed(extractUrl(raw));
  }

  return DEFAULT_EMBED_URL;
}

export function validateGoogleAppointmentUrl(
  input?: string
): AppointmentUrlValidation {
  const raw = input ?? readAppointmentUrl();
  const usedFallback =
    !raw ||
    raw.includes("YOUR_") ||
    isBrokenSchedule(raw) ||
    (!isShortLink(extractUrl(raw)) && !isFullSchedule(extractUrl(raw)));

  for (const pattern of INVALID_PATTERNS) {
    if (pattern.test(raw)) {
      return {
        valid: false,
        reason: "Invalid URL — paste your Google Calendar booking or embed link.",
      };
    }
  }

  const bookingUrl = resolveBookingUrl();
  const embedUrl = resolveEmbedUrl();

  return {
    valid: true,
    bookingUrl,
    embedUrl,
    isShortLink: isShortLink(bookingUrl),
    usedFallback,
  };
}

export function getResolvedAppointmentConfig() {
  return validateGoogleAppointmentUrl();
}

export function isGoogleAppointmentConfigured() {
  return getResolvedAppointmentConfig().valid;
}

export function isGoogleCalendarApiConfigured() {
  return Boolean(
    readEnv("GOOGLE_CLIENT_ID") &&
      readEnv("GOOGLE_CLIENT_SECRET") &&
      readEnv("GOOGLE_REFRESH_TOKEN")
  );
}
