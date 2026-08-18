"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  leadFormSchema,
  serviceOptions,
  type LeadFormValues,
} from "@/lib/validations";
import { cn } from "@/lib/utils";

type LeadFormProps = {
  source?: string;
  defaultService?: string;
  defaultPackage?: string;
  defaultAddOns?: string[];
  defaultMessage?: string;
  compact?: boolean;
  onSuccess?: () => void;
  className?: string;
};

export function LeadForm({
  source = "Website",
  defaultService,
  defaultPackage,
  defaultAddOns = [],
  defaultMessage = "",
  compact = false,
  onSuccess,
  className,
}: LeadFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      businessName: "",
      websiteUrl: "",
      service:
        (defaultService as LeadFormValues["service"]) || "Web Design",
      packageName: defaultPackage || "",
      addOns: defaultAddOns,
      message: defaultMessage,
      source,
    },
  });

  useEffect(() => {
    if (defaultService) {
      setValue("service", defaultService as LeadFormValues["service"]);
    }
    if (defaultPackage) setValue("packageName", defaultPackage);
    if (defaultAddOns) setValue("addOns", defaultAddOns);
    if (defaultMessage) setValue("message", defaultMessage);
    if (source) setValue("source", source);
  }, [
    defaultService,
    defaultPackage,
    defaultAddOns,
    defaultMessage,
    source,
    setValue,
  ]);

  const onSubmit = handleSubmit(async (values) => {
    clearErrors("root");
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError("root", {
          message:
            data.message ||
            "Something went wrong sending your request. Please try again.",
        });
        return;
      }

      reset({
        fullName: "",
        email: "",
        phone: "",
        businessName: "",
        websiteUrl: "",
        service: "Web Design",
        packageName: "",
        addOns: [],
        message: "",
        source,
      });
      onSuccess?.();
    } catch {
      setError("root", {
        message: "Network error. Please check your connection and try again.",
      });
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className={cn("space-y-4", className)}
      noValidate
    >
      <div className={cn("grid gap-4", compact ? "md:grid-cols-1" : "md:grid-cols-2")}>
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
        <Field label="Business Name" error={errors.businessName?.message}>
          <input
            {...register("businessName")}
            className="field-input"
            placeholder="Your company"
          />
        </Field>
        <Field
          label="Current Website URL"
          error={errors.websiteUrl?.message}
          className={compact ? undefined : "md:col-span-2"}
        >
          <input
            {...register("websiteUrl")}
            className="field-input"
            placeholder="https://"
          />
        </Field>
        <Field label="Service Required" error={errors.service?.message}>
          <select {...register("service")} className="field-input">
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Selected Package" error={errors.packageName?.message}>
          <input
            {...register("packageName")}
            className="field-input"
            placeholder="Optional"
          />
        </Field>
      </div>

      {(defaultAddOns?.length ?? 0) > 0 && (
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
          <p className="mb-1 font-medium text-cyan-200">Selected add-ons</p>
          <p>{defaultAddOns.join(", ")}</p>
        </div>
      )}

      <Field label="Project Notes / Message" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={compact ? 4 : 5}
          className="field-input resize-y"
          placeholder="Tell us about your goals, timeline, and current challenges..."
        />
      </Field>

      {errors.root?.message && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100"
        >
          {errors.root.message}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </span>
        ) : (
          "Send Request"
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block space-y-1.5", className)}>
      <span className="text-sm font-medium text-slate-200">{label}</span>
      {children}
      {error && <span className="block text-xs text-rose-300">{error}</span>}
    </label>
  );
}
