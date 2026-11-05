"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { AlertIcon, CheckIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form/form-field";
import { Input } from "@/components/ui/form/input";
import { Select } from "@/components/ui/form/select";
import { Textarea } from "@/components/ui/form/textarea";
import { submitInquiry, type InquiryFormState } from "@/lib/actions/inquiry";
import {
  BUYER_TYPES,
  DELIVERY_OPTIONS,
  EMBROIDERY_PLACEMENTS,
  GENERAL_INQUIRY,
  HEARD_ABOUT_OPTIONS,
  INQUIRY_TYPES,
  LABEL_OPTIONS,
  SAMPLE_OPTIONS,
} from "@/lib/inquiries/fields";
import { COUNTRIES } from "@/lib/inquiries/countries";
import { cn } from "@/lib/utils";

const initialInquiryState: InquiryFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

export type InquiryFormVariant = "contact" | "quote";

function ChoiceGroup({
  name,
  options,
  required,
  value,
  onChange,
}: {
  name: string;
  options: readonly string[];
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-3 text-body text-ink/80">
          <input
            type="radio"
            name={name}
            value={option}
            required={required}
            checked={value === undefined ? undefined : value === option}
            onChange={onChange ? () => onChange(option) : undefined}
            className="h-4 w-4 accent-leather"
          />
          {option}
        </label>
      ))}
    </div>
  );
}

export function InquiryForm({
  variant,
  className,
  defaultMessage,
}: {
  variant: InquiryFormVariant;
  className?: string;
  defaultMessage?: string;
}) {
  const [state, formAction, isPending] = useActionState<InquiryFormState, FormData>(
    submitInquiry,
    initialInquiryState,
  );
  const [formRenderedAt] = useState(() => Date.now().toString());
  const [enhanced, setEnhanced] = useState(false);
  const inquiryTypes =
    variant === "quote" ? INQUIRY_TYPES.filter((option) => option !== GENERAL_INQUIRY) : INQUIRY_TYPES;
  const [inquiryType, setInquiryType] = useState(
    variant === "quote" ? inquiryTypes[0] : "",
  );
  const [embroidery, setEmbroidery] = useState("");

  useEffect(() => {
    setEnhanced(true);
  }, []);

  const showDetails = !enhanced || (inquiryType !== "" && inquiryType !== GENERAL_INQUIRY);
  const messageRequired = inquiryType === GENERAL_INQUIRY;
  const showPlacement = !enhanced || embroidery === "Yes";

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

      <FormField id="name" label="Full name" required errorText={state.fieldErrors.name}>
        <Input id="name" name="name" type="text" autoComplete="name" required invalid={!!state.fieldErrors.name} />
      </FormField>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="email" label="Email" required errorText={state.fieldErrors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" required invalid={!!state.fieldErrors.email} />
        </FormField>
        <FormField
          id="phone"
          label="Phone or WhatsApp"
          helperText="Include country code, e.g. +92"
          errorText={state.fieldErrors.phone}
        >
          <Input id="phone" name="phone" type="tel" autoComplete="tel" invalid={!!state.fieldErrors.phone} />
        </FormField>
      </div>

      <FormField id="companyName" label="Company or brand name" errorText={state.fieldErrors.companyName}>
        <Input id="companyName" name="companyName" type="text" autoComplete="organization" />
      </FormField>

      <FormField
        id="country"
        label="Country"
        required
        helperText="Where should we ship to?"
        errorText={state.fieldErrors.country}
      >
        <Select id="country" name="country" required defaultValue="" invalid={!!state.fieldErrors.country}>
          <option value="" disabled>
            Select a country
          </option>
          {COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField id="buyerType" label="I am a" required errorText={state.fieldErrors.buyerType}>
        <ChoiceGroup name="buyerType" options={BUYER_TYPES} required />
      </FormField>

      <FormField id="inquiryType" label="Inquiry type" required errorText={state.fieldErrors.inquiryType}>
        <Select
          id="inquiryType"
          name="inquiryType"
          required
          value={inquiryType}
          onChange={(event) => setInquiryType(event.target.value)}
          invalid={!!state.fieldErrors.inquiryType}
        >
          <option value="" disabled>
            Select an inquiry type
          </option>
          {inquiryTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FormField>

      <div className={cn("flex flex-col gap-6", !showDetails && "hidden")}>
        <FormField id="jacketStyle" label="Jacket style" errorText={state.fieldErrors.jacketStyle}>
          <Input
            id="jacketStyle"
            name="jacketStyle"
            type="text"
            placeholder="e.g. biker, bomber, cafe racer, or paste a reference link"
          />
        </FormField>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            id="quantityPerStyle"
            label="Quantity per style"
            required={showDetails}
            helperText="Minimum 5 pieces per style"
            errorText={state.fieldErrors.quantityPerStyle}
          >
            <Input
              id="quantityPerStyle"
              name="quantityPerStyle"
              type="number"
              min={5}
              step={1}
              inputMode="numeric"
              required={showDetails}
              invalid={!!state.fieldErrors.quantityPerStyle}
            />
          </FormField>
          <FormField
            id="numberOfStyles"
            label="Number of styles"
            helperText="How many different styles?"
            errorText={state.fieldErrors.numberOfStyles}
          >
            <Input id="numberOfStyles" name="numberOfStyles" type="number" min={1} step={1} inputMode="numeric" />
          </FormField>
        </div>

        <FormField id="customEmbroidery" label="Custom embroidery?" errorText={state.fieldErrors.customEmbroidery}>
          <ChoiceGroup
            name="customEmbroidery"
            options={["No", "Yes"]}
            value={embroidery}
            onChange={setEmbroidery}
          />
        </FormField>

        <div className={cn(!showPlacement && "hidden")}>
          <FormField id="embroideryPlacement" label="Where should the embroidery go?">
            <div className="flex flex-col gap-2">
              {EMBROIDERY_PLACEMENTS.map((option) => (
                <label key={option} className="flex items-center gap-3 text-body text-ink/80">
                  <input
                    type="checkbox"
                    name="embroideryPlacement"
                    value={option}
                    className="h-4 w-4 accent-leather"
                  />
                  {option}
                </label>
              ))}
            </div>
          </FormField>
        </div>

        <FormField id="ownLabels" label="Do you need your own labels or tags?">
          <ChoiceGroup name="ownLabels" options={LABEL_OPTIONS} />
        </FormField>

        <FormField id="leatherType" label="Leather type">
          <Input
            id="leatherType"
            name="leatherType"
            type="text"
            placeholder='If you know it. Otherwise write "not sure"'
          />
        </FormField>

        <FormField id="sampleFirst" label="Sample first?">
          <ChoiceGroup name="sampleFirst" options={SAMPLE_OPTIONS} />
        </FormField>

        <FormField id="delivery" label="When do you need delivery?">
          <Select id="delivery" name="delivery" defaultValue="">
            <option value="">Select a timeframe</option>
            {DELIVERY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField
          id="targetPrice"
          label="Target price per piece (USD)"
          helperText="Optional. Helps us suggest the right leather and construction."
          errorText={state.fieldErrors.targetPrice}
        >
          <Input id="targetPrice" name="targetPrice" type="number" min={0} step="0.01" inputMode="decimal" />
        </FormField>

        <FormField
          id="designFiles"
          label="Upload design, tech pack or reference images"
          helperText="Up to 5 files, 10 MB each. PDF, AI, SVG, PNG, JPG"
          errorText={state.fieldErrors.designFiles}
        >
          <Input
            id="designFiles"
            name="designFiles"
            type="file"
            multiple
            accept=".pdf,.ai,.svg,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg,image/svg+xml"
          />
        </FormField>
      </div>

      <FormField
        id="message"
        label="Anything else we should know?"
        required={messageRequired}
        errorText={state.fieldErrors.message}
      >
        <Textarea
          id="message"
          name="message"
          required={messageRequired}
          invalid={!!state.fieldErrors.message}
          defaultValue={defaultMessage}
        />
      </FormField>

      <FormField id="heardAbout" label="How did you hear about us?">
        <Select id="heardAbout" name="heardAbout" defaultValue="">
          <option value="">Select an option</option>
          {HEARD_ABOUT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField id="consent" label="Consent" required errorText={state.fieldErrors.consent}>
        <label className="flex items-start gap-3 text-body text-ink/80">
          <input type="checkbox" name="consent" value="yes" required className="mt-1 h-4 w-4 accent-leather" />
          <span>
            I agree that ORBIS may contact me about this inquiry. See our{" "}
            <Link href="/privacy-policy" className="link-underline text-leather">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
      </FormField>

      <Button type="submit" variant="primary" size="lg" disabled={isPending} className="self-start">
        {isPending ? "Submitting..." : "Send Inquiry"}
      </Button>
    </form>
  );
}
