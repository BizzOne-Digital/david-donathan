import { z } from "zod";

export const serviceOptions = [
  "Web Design",
  "Social Media",
  "SEO",
  "All",
] as const;

export const meetingDurationOptions = ["15", "30"] as const;

export const leadFormSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  businessName: z.string().optional().or(z.literal("")),
  websiteUrl: z.string().optional().or(z.literal("")),
  service: z.enum(serviceOptions, {
    error: "Please select a service",
  }),
  packageName: z.string().optional().or(z.literal("")),
  addOns: z.array(z.string()),
  message: z.string().min(10, "Please share a few details about your project"),
  source: z.string().optional().or(z.literal("")),
});

export const meetingFormSchema = z
  .object({
    fullName: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().min(7, "Please enter a valid phone number"),
    duration: z.enum(meetingDurationOptions, {
      error: "Please select a meeting length",
    }),
    date: z.string().min(1, "Please select a date"),
    time: z.string().min(1, "Please select a time"),
    notes: z.string().optional().or(z.literal("")),
    source: z.string().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const selected = new Date(`${data.date}T${data.time}:00`);
    const now = new Date();
    if (Number.isNaN(selected.getTime())) {
      ctx.addIssue({
        code: "custom",
        message: "Please choose a valid date and time",
        path: ["date"],
      });
      return;
    }
    if (selected <= now) {
      ctx.addIssue({
        code: "custom",
        message: "Please choose a future date and time",
        path: ["time"],
      });
    }
    const day = selected.getDay();
    if (day === 0 || day === 6) {
      ctx.addIssue({
        code: "custom",
        message: "Meetings are available Monday through Friday",
        path: ["date"],
      });
    }
  });

export type LeadFormValues = z.infer<typeof leadFormSchema>;
export type MeetingFormValues = z.infer<typeof meetingFormSchema>;

export function formatMeetingDateTime(date: string, time: string) {
  const value = new Date(`${date}T${time}:00`);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(value);
}

export function getMeetingEndTime(date: string, time: string, durationMinutes: number) {
  const start = new Date(`${date}T${time}:00`);
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(end);
}
