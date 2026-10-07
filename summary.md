# ORBIS Signature Leather — Project Summary

_Last updated: 2026-09-27_

## Important — please read first

**Yeh website abhi kahin live/deploy nahi hai.** Yeh sirf local machine par code hai — koi hosting (Vercel/etc.) set up nahi hui, aur koi live database bhi connect nahi hai (Docker is dev machine par nahi chal raha). Iska matlab:

- Koi live URL abhi maujood nahi hai.
- Admin panel ka login (neeche diya gaya) **abhi kaam nahi karega** kyunke woh database record hi database ke live hone par create hota hai (seed script se). Neeche exact steps diye hain ke deploy ke baad yeh kaise activate hoga.
- GA4 code add ho gaya hai aur build me verify ho gaya hai ke script sahi render ho raha hai — lekin real tracking data tab hi aayega jab site live ho aur real visitors aayen. Deploy ke baad confirm kar dena.

---

## 1. All Website Links (Routes)

### Public pages
| Page | Path |
|---|---|
| Home | `/` |
| About | `/about` |
| Capabilities | `/capabilities` |
| Products (all) | `/products` |
| Men's Leather Jackets | `/products/mens-leather-jackets` |
| Women's Leather Jackets | `/products/womens-leather-jackets` |
| Custom / Private Label | `/products/custom-private-label` |
| Product detail | `/products/[slug]` |
| Quality & Compliance | `/quality-compliance` |
| Blog | `/blog` |
| Blog article | `/blog/[slug]` |
| FAQ | `/faq` |
| Contact | `/contact` |
| Request a Quote | `/request-quote` |
| Privacy Policy | `/privacy-policy` |
| Terms | `/terms` |
| Sitemap (XML, for Google) | `/sitemap.xml` |
| Robots.txt | `/robots.txt` |

Once the site is live, real URLs will simply be `https://<your-domain>` + the path above (e.g. `https://yourdomain.com/products`).

### Admin panel pages (all require login)
| Page | Path |
|---|---|
| Login | `/admin/login` |
| Dashboard | `/admin/dashboard` |
| Products | `/admin/products` |
| Blog | `/admin/blog` |
| FAQ | `/admin/faq` |
| Testimonials | `/admin/testimonials` |
| Inquiries (contact/quote form submissions) | `/admin/inquiries` |
| Settings | `/admin/settings` |

### External links currently in the site (placeholders — need real values)
| Link | Current value | Where used |
|---|---|---|
| WhatsApp | `https://wa.me/10000000000` | Header, Contact page |
| Instagram | `#` (not set) | Footer |
| LinkedIn | `#` (not set) | Footer |
| Facebook | `#` (not set) | Footer |
| Contact email | `info@orbisleather.example` | Contact page |
| Contact phone | `+00 (0) 000 000 000` | Contact page |

**Yeh sab abhi placeholder hain** — real WhatsApp number, real social media links, real email/phone milne par `lib/site-config.ts` file me update karni hain (ek hi jagah, sab pages automatically update ho jayenge).

---

## 2. Admin Panel — Username & Password

Admin login is created automatically the **first time** the database is seeded (`npx prisma db seed`), because there's no live database yet, no admin account exists yet either. To get a predictable, known login instead of a random one, credentials have already been pre-configured in `.env`:

```
Email:    admin@orbisleather.example
Password: mbW6bjqoPD0UJLj9
```

These will become the real, working admin login **automatically** the first time someone runs:

```bash
npx prisma migrate deploy
npx prisma db seed
```

against the live production database (see deployment steps below). No further action needed for this — it's already wired via `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`.

**Security notes:**
- `admin@orbisleather.example` is a placeholder domain — recommend changing `ADMIN_EMAIL` in `.env` to a real email address you control before the first deploy/seed.
- After first login, change the password from inside the admin panel (`/admin/settings`) once that feature is used, or simply treat this as the permanent password if you're comfortable with it — either way, don't share this file publicly since it contains a working credential.
- This only affects the **first ever seed run**. Once the `AdminUser` row exists in the database, changing `.env` values here has no further effect.

---

## 3. Google Analytics 4 — Added ✅

- **Measurement ID**: `G-L0Q8WZKEZ7`
- Added to `.env` as `NEXT_PUBLIC_GA_MEASUREMENT_ID="G-L0Q8WZKEZ7"`.
- Verified in a production build (`npm run build`) that the GA4 script (`gtag.js`) is correctly embedded into every page's HTML output.
- Code location: `components/analytics/google-analytics.tsx`, rendered site-wide from `app/layout.tsx`.

**Cannot fully confirm live tracking yet** — since the site isn't deployed, there's no real visitor traffic for GA4 to report. Once deployed:
1. Make sure `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-L0Q8WZKEZ7` is also set in the hosting platform's environment variables (not just this local `.env` — hosting providers don't read this repo's `.env` file).
2. Visit the live site yourself.
3. Check **GA4 → Reports → Realtime** — you should see your own visit within a minute or two.

I'll confirm on my end once it's deployed and I can verify the script fires; you can also verify independently via GA4 Realtime as above.

---

## 4. Google Search Console / Sitemap — Confirmed ✅

- No code changes needed for DNS-based domain verification, as you noted.
- Sitemap already generates automatically at `/sitemap.xml` (`app/sitemap.ts`) — includes every static page plus every published product and blog post from the database, and gracefully falls back to just the static pages if the database is temporarily unreachable.
- `/robots.txt` also already generates automatically and points to the sitemap.
- Once live, submit `https://<your-domain>/sitemap.xml` in Search Console — no further code work required on my end for this item.

---

## 5. What's Still Needed Before Going Live

### From you (business owner):
- Real domain name → set as `NEXT_PUBLIC_SITE_URL` (affects canonical URLs, sitemap, social previews)
- Real logo & product/facility photography
- Real contact info (phone, email, address) and social media URLs
- Real WhatsApp business number
- Real client testimonials (currently none seeded — add via `/admin/testimonials` once live)
- Real certifications/compliance documents (currently shown as "coming soon" on About/Quality pages)

### Infrastructure (technical, one-time setup):
- A hosting provider (Vercel recommended, matches this Next.js project) + a managed Postgres database (Vercel Postgres, Neon, etc.)
- `RESEND_API_KEY` + verified sender domain, so the contact/quote forms actually send email notifications (without it, submissions are still saved to the database, just no email alert)
- Environment variables set in the hosting dashboard — full list in `docs/ENVIRONMENT.md`

### Deployment steps (once hosting + DB are ready):
```bash
# 1. Set all environment variables in the hosting dashboard (see docs/ENVIRONMENT.md)
# 2. Apply the database schema
npx prisma migrate deploy
# 3. Seed initial data (categories, sample products/blog, and the admin login above)
npx prisma db seed
# 4. Deploy the app (e.g. `git push` if using Vercel's Git integration, or `next build && next start`)
```

---

## 6. Quick Reference

| Item | Status |
|---|---|
| Lint / Typecheck / Build | ✅ All passing |
| GA4 (`G-L0Q8WZKEZ7`) | ✅ Code added, embedded in build — awaiting live traffic to confirm |
| Search Console | ✅ Nothing needed from code side — sitemap ready to submit |
| Sitemap / robots.txt | ✅ Auto-generated |
| Admin login | ⚠️ Pre-configured, activates on first `npx prisma db seed` against a live DB |
| Live URL | ❌ Not deployed yet |
| Database | ❌ Not deployed yet (schema + migration ready to apply) |
