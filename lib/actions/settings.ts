"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-admin";
import { DEFAULT_SETTINGS } from "@/lib/settings/data";

export async function updateSiteSetting(key: string, formData: FormData): Promise<void> {
  await requireAdmin();

  if (!(key in DEFAULT_SETTINGS)) return;

  const value = formData.get("value");
  const stringValue = typeof value === "string" ? value.trim() : "";

  await prisma.siteSetting.upsert({
    where: { key },
    create: { key, value: stringValue },
    update: { value: stringValue },
  });

  revalidatePath("/admin/settings");
}
