"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, destroySession } from "@/lib/auth/session";
import { loginSchema } from "@/lib/validation/auth";

export type LoginFormState = {
  status: "idle" | "error";
  message: string;
  fieldErrors: Record<string, string>;
};

export async function login(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please correct the highlighted fields.", fieldErrors };
  }

  const { email, password } = parsed.data;
  const genericError: LoginFormState = {
    status: "error",
    message: "Invalid email or password.",
    fieldErrors: {},
  };

  // Fixed dummy hash so an unknown email still pays the scrypt cost paid by a
  // known email with the wrong password — avoids a login timing side-channel
  // that would otherwise let an attacker enumerate valid admin emails.
  const DUMMY_HASH =
    "00000000000000000000000000000000:00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

  try {
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) {
      await verifyPassword(password, DUMMY_HASH);
      return genericError;
    }

    const valid = await verifyPassword(password, admin.passwordHash);
    if (!valid) return genericError;

    await createSession(admin.id);
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    });
  } catch (error) {
    console.error("Login failed:", error);
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
      fieldErrors: {},
    };
  }

  redirect("/admin/dashboard");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}
