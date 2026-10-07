"use client";

import { useActionState } from "react";
import { FormField } from "@/components/ui/form/form-field";
import { Input } from "@/components/ui/form/input";
import { Textarea } from "@/components/ui/form/textarea";
import { Select } from "@/components/ui/form/select";
import { MediaPicker } from "@/components/admin/media-picker";
import { Button } from "@/components/ui/button";
import type { BlogPostFormState } from "@/lib/actions/blog";

const initialState: BlogPostFormState = { status: "idle", message: "", fieldErrors: {} };

export type BlogPostFormValues = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  heroImageUrl: string;
  categoryId: string;
  tags: string[];
  author: string;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  ogImageUrl: string;
};

export function BlogForm({
  action,
  categories,
  defaultValues,
  submitLabel,
}: {
  action: (prevState: BlogPostFormState, formData: FormData) => Promise<BlogPostFormState>;
  categories: { id: string; name: string }[];
  defaultValues: BlogPostFormValues;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex max-w-3xl flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="title" label="Title" required errorText={state.fieldErrors.title}>
          <Input id="title" name="title" defaultValue={defaultValues.title} required />
        </FormField>
        <FormField id="slug" label="Slug" required errorText={state.fieldErrors.slug}>
          <Input id="slug" name="slug" defaultValue={defaultValues.slug} required />
        </FormField>
      </div>

      <FormField id="categoryId" label="Category" errorText={state.fieldErrors.categoryId}>
        <Select id="categoryId" name="categoryId" defaultValue={defaultValues.categoryId}>
          <option value="">No category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField id="excerpt" label="Excerpt">
        <Textarea id="excerpt" name="excerpt" defaultValue={defaultValues.excerpt} rows={2} />
      </FormField>

      <FormField id="content" label="Content">
        <Textarea id="content" name="content" defaultValue={defaultValues.content} rows={12} />
      </FormField>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="author" label="Author">
          <Input id="author" name="author" defaultValue={defaultValues.author} />
        </FormField>
        <FormField id="tags" label="Tags" helperText="Comma-separated list.">
          <Input id="tags" name="tags" defaultValue={defaultValues.tags.join(", ")} />
        </FormField>
      </div>

      <MediaPicker name="heroImageUrl" label="Hero Image" defaultValue={defaultValues.heroImageUrl} />

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="status" label="Status">
          <Select id="status" name="status" defaultValue={defaultValues.status}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </Select>
        </FormField>
        <FormField
          id="publishedAt"
          label="Publish Date"
          helperText="Leave blank to publish immediately. Set a future date to schedule."
        >
          <Input
            id="publishedAt"
            name="publishedAt"
            type="datetime-local"
            defaultValue={defaultValues.publishedAt}
          />
        </FormField>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="seoTitle" label="SEO Title">
          <Input id="seoTitle" name="seoTitle" defaultValue={defaultValues.seoTitle} />
        </FormField>
        <FormField id="seoDescription" label="SEO Description">
          <Input id="seoDescription" name="seoDescription" defaultValue={defaultValues.seoDescription} />
        </FormField>
      </div>

      <MediaPicker name="ogImageUrl" label="Social Share Image (OG Image)" defaultValue={defaultValues.ogImageUrl} />

      {state.status === "error" && state.message && (
        <p className="text-body-sm text-red-600">{state.message}</p>
      )}

      <Button type="submit" variant="primary" disabled={pending} className="w-fit">
        {pending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
