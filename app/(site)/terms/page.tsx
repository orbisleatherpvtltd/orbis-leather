import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { LegalBody, LegalIntro, LegalSection } from "@/components/legal/legal-body";
import { buildMetadata } from "@/lib/seo/metadata";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions | ORBIS",
  titleMode: "absolute",
  description:
    "The terms and conditions for using the ORBIS Leather website and for quotes, samples and orders for leather jackets.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Section size="lg">
      <div className="flex flex-col gap-8">
        <Reveal>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]} />
        </Reveal>
        <Reveal delay={0.05}>
          <Badge variant="outline" className="w-fit">
            Legal
          </Badge>
        </Reveal>
        <SectionHeader as="h1" title="Terms & Conditions" />
      </div>

      <LegalBody className="mt-12 md:mt-16">
        <p className="text-caption font-medium text-ink/60">Last updated: 21 October 2026</p>

        <LegalIntro>
          These terms apply when you use orbisleatherpvtltd.com (the &ldquo;Website&rdquo;) and when
          you ask us for a quote, a sample or an order. ORBIS (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
          &ldquo;our&rdquo;) is a leather jacket manufacturer based in Karachi, Pakistan. By using
          the Website or placing an order with us, you agree to these terms.
        </LegalIntro>

        <LegalSection number={1} title="Using the Website">
          <p>
            You may use the Website for lawful business purposes. You must not misuse it, try to
            break or overload it, use automated tools to copy its content, or send us false or
            harmful information. We may update, suspend or remove parts of the Website at any
            time.
          </p>
          <p>
            The Website, its text, photos, logo and the ORBIS Leather name belong to us. You may
            not copy or reuse them without our written permission.
          </p>
        </LegalSection>

        <LegalSection number={2} title="Information on the Website">
          <p>
            The information on the Website, including product descriptions, photos, minimum
            order quantities (MOQ) and general guidance in our FAQ, is for general information.
            It is not a binding offer. The terms of each order are set out in our written quote
            or proforma invoice. We try to keep the Website accurate, but it may contain mistakes
            or be out of date.
          </p>
        </LegalSection>

        <LegalSection number={3} title="Quotes and orders">
          <p>
            Sending us an inquiry or Request Quote form does not create an order. We will reply
            with a written quote. A quote is valid for the period stated in it.
          </p>
          <p>
            An order is confirmed only when we confirm it in writing (for example with a proforma
            invoice) and we receive the payment due at that stage. We start production after you
            have approved the design, sample or specifications and the payment due at that stage
            has been received.
          </p>
        </LegalSection>

        <LegalSection number={4} title="Prices and payment">
          <p>
            Prices, currency and payment terms are stated in your quote or proforma invoice.
            Payment terms depend on the size of the order, and the balance, where one applies, is
            due before dispatch. Bank and transfer charges are your responsibility unless we
            agree otherwise in writing. We may delay production or dispatch until payment is
            received as agreed.
          </p>
        </LegalSection>

        <LegalSection number={5} title="Samples and approvals">
          <p>
            You can ask us to make a sample before a larger order. Any sample fee and timing are
            stated in your quote. Once you approve a sample, design, artwork or specification, we
            will produce your order to match what you approved. We are not responsible for errors
            in the artwork, measurements or specifications that you provided and approved.
          </p>
        </LegalSection>

        <LegalSection number={6} title="Your designs and intellectual property">
          <p>
            You keep all rights in your designs, logos, artwork and tech packs. By sending them to
            us, you confirm that you have the right to use them and that they do not infringe
            anyone else&rsquo;s rights, including trademarks and copyright. You allow us to use
            them only to prepare your quote, sample and order. We do not use them for other
            customers.
          </p>
          <p>
            We will ask for your permission before we show your jackets or your brand name in our
            photos, portfolio or case studies.
          </p>
          <p>
            We keep all rights in the Website and its content, in the ORBIS Leather name and
            logo, and in our own existing styles.
          </p>
        </LegalSection>

        <LegalSection number={7} title="Natural leather">
          <p>
            Leather is a natural material. Differences in grain, texture, shade and small natural
            marks are normal and are not defects. Colors may also look different on different
            screens. If appearance is important to you, ask us for a sample before you order.
          </p>
        </LegalSection>

        <LegalSection number={8} title="Shipping and delivery">
          <p>
            The shipping method, shipping cost and delivery terms (including Incoterms) are
            agreed for each order and stated in your quote or proforma invoice. Delivery dates
            are estimates unless we agree otherwise in writing. Unless we agree otherwise, you
            are responsible for import duties, taxes and customs clearance in the destination
            country.
          </p>
          <p>
            We are not responsible for delays caused by events outside our reasonable control,
            such as supply disruptions, power failures, strikes, natural events, government
            action, or customs and courier delays.
          </p>
        </LegalSection>

        <LegalSection number={9} title="Quality claims">
          <p>
            Please inspect your order when you receive it. If you believe an item does not match
            the sample, design or specification you approved, send us a written notice with clear
            photos within the period stated in your quote or order confirmation. If none is
            stated, please do so within a reasonable time. We will review your claim and, if it is
            valid, agree a remedy with you, such as repair, replacement or credit.
          </p>
        </LegalSection>

        <LegalSection number={10} title="Changes and cancellations">
          <p>
            Changes or cancellations after an order is confirmed are handled as stated in your
            quote or proforma invoice. Custom items, including jackets with custom embroidery or
            private label details, are made specially for you, so changes or cancellations may
            not be possible once production has started. Costs we have already incurred may be
            charged.
          </p>
        </LegalSection>

        <LegalSection number={11} title="Limits on our liability">
          <p>
            To the extent the law allows, we are not liable for indirect or consequential losses,
            such as lost profit, lost sales or damage to your reputation. Our total liability for
            any order is limited to the amount you paid us for that order. The Website is
            provided &ldquo;as is&rdquo;. Nothing in these terms limits any liability that cannot
            be limited by law.
          </p>
        </LegalSection>

        <LegalSection number={12} title="Privacy">
          <p>
            We handle your personal information as described in our{" "}
            <Link href="/privacy-policy" className="link-underline font-medium text-ink">
              Privacy Policy
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection number={13} title="Governing law">
          <p>These terms are governed by the laws of Pakistan.</p>
        </LegalSection>

        <LegalSection number={14} title="Changes to these terms">
          <p>
            We may update these terms from time to time. The &ldquo;Last updated&rdquo; date at
            the top shows when they were last changed. The terms that apply to an order are the
            ones in force when we confirm it.
          </p>
        </LegalSection>

        <LegalSection number={15} title="Contact us">
          <address className="flex flex-col gap-1 not-italic">
            <span>ORBIS Leather</span>
            <span>Karachi, Pakistan</span>
            <span>
              Email:{" "}
              <a href="mailto:inquiry@orbisleatherpvtltd.com" className="link-underline font-medium text-ink">
                inquiry@orbisleatherpvtltd.com
              </a>
            </span>
            <span>
              Phone:{" "}
              <a href="tel:+923334544557" className="link-underline font-medium text-ink">
                +92 333-4544557
              </a>
            </span>
          </address>
        </LegalSection>
      </LegalBody>
    </Section>
  );
}
