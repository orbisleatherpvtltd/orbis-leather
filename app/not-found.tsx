import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/logo/logo";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container>
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 py-24 text-center">
        <Link href="/" aria-label="ORBIS Signature Leather">
          <Logo layout="stacked" showTagline />
        </Link>
        <div className="flex flex-col gap-2">
          <p className="text-eyebrow font-medium uppercase tracking-[0.16em] text-leather">
            404
          </p>
          <h1 className="text-h2 font-bold text-ink">Page not found</h1>
          <p className="mx-auto max-w-md text-body text-ink/70">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <ButtonLink href="/">Return Home</ButtonLink>
      </div>
    </Container>
  );
}
