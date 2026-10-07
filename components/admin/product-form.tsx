"use client";

import { useActionState } from "react";
import { FormField } from "@/components/ui/form/form-field";
import { Input } from "@/components/ui/form/input";
import { Textarea } from "@/components/ui/form/textarea";
import { Select } from "@/components/ui/form/select";
import { Checkbox } from "@/components/ui/form/checkbox";
import { Button } from "@/components/ui/button";
import { ProductImagesField, type ProductImageEntry } from "@/components/admin/product-images-field";
import type { ProductFormState } from "@/lib/actions/product";

const initialState: ProductFormState = { status: "idle", message: "", fieldErrors: {} };

export type ProductFormValues = {
  slug: string;
  name: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  leatherType: string;
  priceRange: string;
  moq: string;
  leadTime: string;
  isPrivateLabel: boolean;
  isFeatured: boolean;
  status: "DRAFT" | "PUBLISHED";
  seoTitle: string;
  seoDescription: string;
  customizationOptions: string[];
  images: ProductImageEntry[];
};

export function ProductForm({
  action,
  categories,
  defaultValues,
  submitLabel,
}: {
  action: (prevState: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  categories: { id: string; name: string }[];
  defaultValues: ProductFormValues;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex max-w-3xl flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="name" label="Name" required errorText={state.fieldErrors.name}>
          <Input id="name" name="name" defaultValue={defaultValues.name} required />
        </FormField>
        <FormField id="slug" label="Slug" required errorText={state.fieldErrors.slug}>
          <Input id="slug" name="slug" defaultValue={defaultValues.slug} required />
        </FormField>
      </div>

      <FormField id="categoryId" label="Category" required errorText={state.fieldErrors.categoryId}>
        <Select id="categoryId" name="categoryId" defaultValue={defaultValues.categoryId} required>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField id="shortDescription" label="Short Description">
        <Textarea
          id="shortDescription"
          name="shortDescription"
          defaultValue={defaultValues.shortDescription}
          rows={2}
        />
      </FormField>

      <FormField id="description" label="Full Description">
        <Textarea id="description" name="description" defaultValue={defaultValues.description} rows={6} />
      </FormField>

      <div className="grid gap-6 sm:grid-cols-3">
        <FormField id="leatherType" label="Leather Type">
          <Input id="leatherType" name="leatherType" defaultValue={defaultValues.leatherType} />
        </FormField>
        <FormField id="moq" label="MOQ">
          <Input id="moq" name="moq" defaultValue={defaultValues.moq} />
        </FormField>
        <FormField id="leadTime" label="Lead Time">
          <Input id="leadTime" name="leadTime" defaultValue={defaultValues.leadTime} />
        </FormField>
      </div>

      <FormField
        id="priceRange"
        label="Price Range"
        helperText="Internal/admin field. Never shown publicly — see Request Quote CTA."
      >
        <Input id="priceRange" name="priceRange" defaultValue={defaultValues.priceRange} />
      </FormField>

      <FormField
        id="customizationOptions"
        label="Customization Options"
        helperText="Comma-separated list."
      >
        <Input
          id="customizationOptions"
          name="customizationOptions"
          defaultValue={defaultValues.customizationOptions.join(", ")}
        />
      </FormField>

      <div className="flex flex-wrap gap-6">
        <Checkbox
          name="isPrivateLabel"
          label="Private label"
          defaultChecked={defaultValues.isPrivateLabel}
        />
        <Checkbox name="isFeatured" label="Featured" defaultChecked={defaultValues.isFeatured} />
      </div>

      <FormField id="status" label="Status">
        <Select id="status" name="status" defaultValue={defaultValues.status}>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </Select>
      </FormField>

      <div>
        <p className="mb-3 text-caption font-medium uppercase tracking-wide text-ink/80">Images</p>
        <ProductImagesField defaultImages={defaultValues.images} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="seoTitle" label="SEO Title">
          <Input id="seoTitle" name="seoTitle" defaultValue={defaultValues.seoTitle} />
        </FormField>
        <FormField id="seoDescription" label="SEO Description">
          <Input id="seoDescription" name="seoDescription" defaultValue={defaultValues.seoDescription} />
        </FormField>
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
