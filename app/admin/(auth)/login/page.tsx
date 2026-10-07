"use client";

import { useActionState } from "react";
import { login, type LoginFormState } from "@/lib/actions/auth";
import { Input } from "@/components/ui/form/input";
import { Button } from "@/components/ui/button";

const initialState: LoginFormState = { status: "idle", message: "", fieldErrors: {} };

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-lg border border-ink/10 bg-white p-8 shadow-sm">
        <h1 className="text-h3 font-bold text-ink">Admin Sign In</h1>
        <p className="mt-1 text-body-sm text-ink/60">ORBIS content &amp; inquiry management.</p>

        <form action={formAction} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-caption uppercase tracking-wide text-ink/60">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              invalid={Boolean(state.fieldErrors.email)}
            />
            {state.fieldErrors.email && (
              <p className="mt-1 text-body-sm text-red-600">{state.fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-caption uppercase tracking-wide text-ink/60"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              invalid={Boolean(state.fieldErrors.password)}
            />
            {state.fieldErrors.password && (
              <p className="mt-1 text-body-sm text-red-600">{state.fieldErrors.password}</p>
            )}
          </div>

          {state.status === "error" && state.message && (
            <p className="text-body-sm text-red-600">{state.message}</p>
          )}

          <Button type="submit" variant="primary" disabled={pending} className="mt-2 w-full">
            {pending ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
