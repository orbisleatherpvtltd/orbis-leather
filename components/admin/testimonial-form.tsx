"use client";

import { useActionState } from "react";
import { FormField } from "@/components/ui/form/form-field";
import { Input } from "@/components/ui/form/input";
import { Textarea } from "@/components/ui/form/textarea";
import { Checkbox } from "@/components/ui/form/checkbox";
import { MediaPicker } from "@/components/admin/media-picker";
import { Button } from "@/components/ui/button";
import type { TestimonialFormState } from "@/lib/actions/testimonial";

const initialState: TestimonialFormState = { status: "idle", message: "", fieldErrors: {} };

export type TestimonialFormValues = {
  companyName: string;
  personName: string;
  role: string;
  quote: string;
  logoUrl: string;
  isPublished: boolean;
  sortOrder: number;
};

export function TestimonialForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (prevState: TestimonialFormState, formData: FormData) => Promise<TestimonialFormState>;
  defaultValues: TestimonialFormValues;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="companyName" label="Company Name" required errorText={state.fieldErrors.companyName}>
          <Input id="companyName" name="companyName" defaultValue={defaultValues.companyName} required />
        </FormField>
        <FormField id="personName" label="Person Name">
          <Input id="personName" name="personName" defaultValue={defaultValues.personName} />
        </FormField>
      </div>

      <FormField id="role" label="Role / Title">
        <Input id="role" name="role" defaultValue={defaultValues.role} />
      </FormField>

      <FormField id="quote" label="Quote" required errorText={state.fieldErrors.quote}>
        <Textarea id="quote" name="quote" defaultValue={defaultValues.quote} rows={5} required />
      </FormField>

      <MediaPicker name="logoUrl" label="Company Logo" defaultValue={defaultValues.logoUrl} />

      <div className="flex items-center gap-6">
        <FormField id="sortOrder" label="Sort Order">
          <Input id="sortOrder" name="sortOrder" type="number" defaultValue={defaultValues.sortOrder} />
        </FormField>
        <Checkbox name="isPublished" label="Published" defaultChecked={defaultValues.isPublished} />
      </div>

      {state.status === "error" && state.message && (
        <p className="text-body-sm text-red-600">{state.message}</p>
      )}

      <Button type="submit" variant="primary" disabled={pending} className="w-fit">
        {pending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
