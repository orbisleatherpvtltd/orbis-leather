"use client";

import { useActionState, useState } from "react";
import type { InquiryType } from "@/app/generated/prisma/enums";
import { AlertIcon, CheckIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form/form-field";
import { Input } from "@/components/ui/form/input";
import { Select } from "@/components/ui/form/select";
import { Textarea } from "@/components/ui/form/textarea";
import { submitInquiry, type InquiryFormState } from "@/lib/actions/inquiry";
import { cn } from "@/lib/utils";

const productInterestOptions = [
  "Men's Leather Jackets",
  "Women's Leather Jackets",
  "Custom / Private Label",
  "Other",
];

const initialInquiryState: InquiryFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

export type InquiryFormVariant = "contact" | "quote";

export function InquiryForm({
  variant,
  className,
  defaultProductInterest,
  defaultMessage,
}: {
  variant: InquiryFormVariant;
  className?: string;
  defaultProductInterest?: string;
  defaultMessage?: string;
}) {
  const type: InquiryType = variant === "quote" ? "QUOTE" : "CONTACT";
  const action = submitInquiry.bind(null, type);
  const [state, formAction, isPending] = useActionState<InquiryFormState, FormData>(
    action,
    initialInquiryState,
  );
  const [formRenderedAt] = useState(() => Date.now().toString());

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 border border-stone-200 bg-stone-50 p-8">
        <CheckIcon className="h-8 w-8 text-leather" aria-hidden="true" />
        <p className="text-h4 font-bold text-ink">Thank you.</p>
        <p className="text-body text-ink/70">{state.message}</p>
      </div>
    );
  }

  const hasFieldErrors = Object.keys(state.fieldErrors).length > 0;

  return (
    <form action={formAction} noValidate className={cn("flex flex-col gap-6", className)}>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name="formRenderedAt" value={formRenderedAt} />

      {state.status === "error" && !hasFieldErrors && (
        <div className="flex items-start gap-3 border border-red-200 bg-red-50 p-4" role="alert">
          <AlertIcon className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
          <p className="text-body text-red-700">{state.message}</p>
        </div>
      )}

      <FormField id="name" label="Full Name" required errorText={state.fieldErrors.name}>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          invalid={!!state.fieldErrors.name}
          aria-invalid={!!state.fieldErrors.name}
          aria-describedby={state.fieldErrors.name ? "name-error" : undefined}
        />
      </FormField>

      {variant === "quote" && (
        <FormField
          id="companyName"
          label="Company Name"
          required
          errorText={state.fieldErrors.companyName}
        >
          <Input
            id="companyName"
            name="companyName"
            type="text"
            autoComplete="organization"
            required
            invalid={!!state.fieldErrors.companyName}
            aria-invalid={!!state.fieldErrors.companyName}
            aria-describedby={state.fieldErrors.companyName ? "companyName-error" : undefined}
          />
        </FormField>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="email" label="Email" required errorText={state.fieldErrors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            invalid={!!state.fieldErrors.email}
            aria-invalid={!!state.fieldErrors.email}
            aria-describedby={state.fieldErrors.email ? "email-error" : undefined}
          />
        </FormField>
        <FormField id="phone" label="Phone" helperText="Optional" errorText={state.fieldErrors.phone}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            invalid={!!state.fieldErrors.phone}
            aria-invalid={!!state.fieldErrors.phone}
            aria-describedby={state.fieldErrors.phone ? "phone-error" : undefined}
          />
        </FormField>
      </div>

      {variant === "quote" && (
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField id="country" label="Country" helperText="Optional">
            <Input id="country" name="country" type="text" autoComplete="country-name" />
          </FormField>
          <FormField id="quantityEstimate" label="Estimated Quantity" helperText="e.g. 500 units">
            <Input id="quantityEstimate" name="quantityEstimate" type="text" />
          </FormField>
        </div>
      )}

      {variant === "quote" && (
        <FormField id="productInterest" label="Product Interest" helperText="Optional">
          <Select id="productInterest" name="productInterest" defaultValue={defaultProductInterest ?? ""}>
            <option value="" disabled>
              Select a category
            </option>
            {productInterestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormField>
      )}

      <FormField
        id="message"
        label={variant === "quote" ? "Message / Project Details" : "Message"}
        required
        errorText={state.fieldErrors.message}
      >
        <Textarea
          id="message"
          name="message"
          required
          invalid={!!state.fieldErrors.message}
          aria-invalid={!!state.fieldErrors.message}
          aria-describedby={state.fieldErrors.message ? "message-error" : undefined}
          defaultValue={defaultMessage}
        />
      </FormField>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isPending}
        className="self-start"
      >
        {isPending ? "Submitting..." : variant === "quote" ? "Request Quote" : "Send Message"}
      </Button>
    </form>
  );
}
