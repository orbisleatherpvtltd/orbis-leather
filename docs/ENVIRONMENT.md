# Environment Variables

Copy `.env.example` to `.env` and fill in real values. Never commit `.env`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string. Used by Prisma (server-side only — never exposed to the browser). |
| `SESSION_SECRET` | Yes | Random 32+ byte secret used to sign/verify admin session cookies. Generate with `openssl rand -base64 32`. Rotating it invalidates all existing admin sessions. |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | No | Only read by `prisma/seed.ts` on the very first seed run, to set a known initial admin login instead of the default placeholder email + a random generated password. No effect once that AdminUser row exists — change the password via the admin UI (or directly in the DB) after that. |
| `RESEND_API_KEY` | No | [Resend](https://resend.com) API key, used to send inquiry notification/confirmation emails. Get one from the Resend dashboard under API Keys. |
| `EMAIL_FROM` | No (required if `RESEND_API_KEY` is set) | The "from" address used for outgoing emails, e.g. `quotes@yourdomain.com`. Must be a verified sender/domain in Resend. |
| `EMAIL_TO` | No | Where new-inquiry admin notifications are sent, e.g. `sales@yourdomain.com`. If unset, admin notifications are skipped (the inquiry is still saved). |
| `BLOB_READ_WRITE_TOKEN` | No — unused | Leftover from earlier scaffolding. This project stores uploaded media locally under `public/uploads/` (see `lib/media/storage.ts`), not on Vercel Blob. Safe to leave blank or remove. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Google Analytics 4 measurement ID (e.g. `G-XXXXXXXXXX`). Deliberately `NEXT_PUBLIC_` since GA4 requires client-side loading — this is not a secret. Get one from the GA4 Admin > Data Streams. |
| `GOOGLE_SITE_VERIFICATION` | No | The content value of the Google Search Console HTML tag verification method (Search Console > Settings > Ownership verification > HTML tag). |

## Analytics fallback behavior

`components/analytics/google-analytics.tsx` renders nothing when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is unset — local development, CI, and builds never require a real GA4 ID. The same applies to Search Console: `app/layout.tsx` only adds the `verification.google` meta tag when `GOOGLE_SITE_VERIFICATION` is set.

## Email provider fallback behavior

`lib/email/index.ts` picks a provider automatically:

- If both `RESEND_API_KEY` and `EMAIL_FROM` are set, emails are sent via Resend's HTTP API.
- Otherwise, emails are logged to the server console instead of sent (`lib/email/console-provider.ts`). This means local development, CI, and builds never fail or require real email credentials — inquiries are still validated and saved to the database either way.

Email sending failures (e.g. an invalid `RESEND_API_KEY`, or Resend being down) are logged server-side via `console.error` and never affect the visitor-facing form response — the inquiry has already been persisted to the database by the time emails are attempted.

## Security notes

- No API key or secret in this table is ever sent to the browser. Emails and session verification happen exclusively in Server Actions / Server Components.
- `DATABASE_URL` and `SESSION_SECRET` are required for the app to function at all; the admin panel and inquiry form will error without them.
