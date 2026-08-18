"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  formatMeetingDateTime,
  meetingFormSchema,
  type MeetingFormValues,
} from "@/lib/validations";

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

function formatTimeLabel(value: string) {
  const [hour, minute] = value.split(":").map(Number);
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function todayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

type MeetingFormProps = {
  source?: string;
  onSuccess?: () => void;
  className?: string;
};

export function MeetingForm({
  source = "Website",
  onSuccess,
  className,
}: MeetingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [confirmedWhen, setConfirmedWhen] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<MeetingFormValues>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      duration: "30",
      date: "",
      time: "",
      notes: "",
      source,
    },
  });

  const selectedDate = watch("date");
  const selectedTime = watch("time");
  const selectedDuration = watch("duration");

  const minDate = useMemo(() => todayString(), []);

  const onSubmit = handleSubmit(async (values) => {
    clearErrors("root");
    try {
      const response = await fetch("/api/book-meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError("root", {
          message:
            data.message ||
            "Something went wrong scheduling your meeting. Please try again.",
        });
        return;
      }

      setConfirmedWhen(formatMeetingDateTime(values.date, values.time));
      setSubmitted(true);
      reset({
        fullName: "",
        email: "",
        phone: "",
        duration: "30",
        date: "",
        time: "",
        notes: "",
        source,
      });
      onSuccess?.();
    } catch {
      setError("root", {
        message: "Network error. Please check your connection and try again.",
      });
    }
  });

  if (submitted) {
    return (
      <div
        className={cn(
          "flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-emerald-400/20 bg-emerald-500/10 px-6 py-12 text-center",
          className
        )}
      >
        <CheckCircle2 className="mb-4 h-12 w-12 text-emerald-400" />
        <h3 className="font-display text-2xl text-white">
          Your meeting is scheduled!
        </h3>
        <p className="mt-3 max-w-md text-slate-300">
          <strong className="text-white">{confirmedWhen}</strong>
        </p>
        <p className="mt-3 max-w-md text-sm text-slate-400">
          A confirmation email is on its way to you. David has been notified
          about this appointment.
        </p>
        <button
          type="button"
          className="btn-secondary mt-8"
          onClick={() => setSubmitted(false)}
        >
          Book another meeting
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "rounded-3xl border border-white/10 bg-[#0a1829] p-6 md:p-8",
        className
      )}
      noValidate
    >
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <Field label="Full Name" error={errors.fullName?.message}>
          <input
            {...register("fullName")}
            className="field-input"
            placeholder="Jane Smith"
            autoComplete="name"
          />
        </Field>
        <Field label="Email Address" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            className="field-input"
            placeholder="jane@company.com"
            autoComplete="email"
          />
        </Field>
        <Field label="Phone Number" error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            className="field-input"
            placeholder="+1 555 000 0000"
            autoComplete="tel"
          />
        </Field>
        <Field label="Meeting Length" error={errors.duration?.message}>
          <select {...register("duration")} className="field-input">
            <option value="15">15 Minute Consultation</option>
            <option value="30">30 Minute Strategy Call</option>
          </select>
        </Field>
      </div>

      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-200">
          <CalendarDays className="h-4 w-4 text-cyan-300" />
          Select a date
        </div>
        <input
          {...register("date")}
          type="date"
          min={minDate}
          className="field-input max-w-xs"
        />
        {errors.date?.message && (
          <p className="mt-1.5 text-xs text-rose-300">{errors.date.message}</p>
        )}
        <p className="mt-2 text-xs text-slate-500">
          Available Monday–Friday. Pick any open time below.
        </p>
      </div>

      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-200">
          <Clock className="h-4 w-4 text-cyan-300" />
          Select a time
          {selectedDuration === "30" && (
            <span className="text-xs font-normal text-slate-400">
              (Central Time — 9:00 AM to 5:00 PM)
            </span>
          )}
        </div>
        <input type="hidden" {...register("time")} />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
          {TIME_SLOTS.map((slot) => {
            const active = selectedTime === slot;
            return (
              <button
                key={slot}
                type="button"
                onClick={() =>
                  setValue("time", slot, { shouldValidate: true })
                }
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "border-cyan-300/50 bg-cyan-400/15 text-cyan-100"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-300/30 hover:text-white"
                )}
              >
                {formatTimeLabel(slot)}
              </button>
            );
          })}
        </div>
        {errors.time?.message && (
          <p className="mt-1.5 text-xs text-rose-300">{errors.time.message}</p>
        )}
      </div>

      {selectedDate && selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100"
        >
          Selected:{" "}
          <strong>{formatMeetingDateTime(selectedDate, selectedTime)}</strong>
          {" · "}
          {selectedDuration === "15" ? "15 minutes" : "30 minutes"}
        </motion.div>
      )}

      <Field label="Notes (optional)" error={errors.notes?.message}>
        <textarea
          {...register("notes")}
          rows={3}
          className="field-input resize-y"
          placeholder="What would you like to discuss?"
        />
      </Field>

      {errors.root?.message && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100"
        >
          {errors.root.message}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Scheduling...
          </span>
        ) : (
          "Confirm Meeting"
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      {children}
      {error && <span className="block text-xs text-rose-300">{error}</span>}
    </label>
  );
}
