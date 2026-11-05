import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { LegalBody, LegalIntro, LegalSection, LegalList } from "@/components/legal/legal-body";
import { buildMetadata } from "@/lib/seo/metadata";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | ORBIS",
  titleMode: "absolute",
  description:
    "How ORBIS collects, uses and protects your personal information when you visit our website or send us an inquiry.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <Section size="lg">
      <div className="flex flex-col gap-8">
        <Reveal>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
        </Reveal>
        <Reveal delay={0.05}>
          <Badge variant="outline" className="w-fit">
            Legal
          </Badge>
        </Reveal>
        <SectionHeader as="h1" title="Privacy Policy" />
      </div>

      <LegalBody className="mt-12 md:mt-16">
        <p className="text-caption font-medium text-ink/60">Last updated: 21 October 2026</p>

        <LegalIntro>
          This Privacy Policy explains how ORBIS Leather (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
          &ldquo;our&rdquo;) collects, uses and protects personal information when you visit
          orbisleatherpvtltd.com (the &ldquo;Website&rdquo;) or contact us about our leather
          jackets and manufacturing services. By using the Website, you agree to this policy.
        </LegalIntro>

        <LegalSection number={1} title="Who we are">
          <p>
            ORBIS is a leather jacket manufacturer based in Karachi, Pakistan. We are
            responsible for the personal information described in this policy. You can contact
            us at{" "}
            <a href="mailto:inquiry@orbisleatherpvtltd.com" className="link-underline font-medium text-ink">
              inquiry@orbisleatherpvtltd.com
            </a>{" "}
            or{" "}
            <a href="tel:+923334544557" className="link-underline font-medium text-ink">
              +92 333-4544557
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection number={2} title="Information we collect">
          <p>
            <strong className="font-semibold text-ink">Information you give us.</strong> When you
            fill in our Contact or Request Quote forms, or message us, we may collect:
          </p>
          <LegalList>
            <li>Your name, email address, and phone or WhatsApp number</li>
            <li>Your company or brand name and your country</li>
            <li>Whether you are a startup, an existing brand or a wholesaler</li>
            <li>
              Details about your project, such as jacket style, quantity, embroidery, labels,
              leather type, delivery timing and target price
            </li>
            <li>Files you upload, such as designs, tech packs, artwork and reference images</li>
            <li>Anything else you write in your message</li>
          </LegalList>
          <p>
            <strong className="font-semibold text-ink">Information collected automatically.</strong>{" "}
            When you visit the Website, we and our service providers may collect technical
            information such as your IP address, browser and device type, the pages you view, the
            time you spend on them and the website you came from. We collect this through cookies
            and similar tools (see section 7).
          </p>
          <p>
            <strong className="font-semibold text-ink">Messages on WhatsApp.</strong> If you
            contact us on WhatsApp, we receive your phone number and the messages you send.
            WhatsApp is operated by Meta and handles messages under its own terms and privacy
            policy.
          </p>
        </LegalSection>

        <LegalSection number={3} title="How we use your information">
          <p>We use your information:</p>
          <LegalList>
            <li>To reply to your inquiries and prepare quotes</li>
            <li>To make samples, and to produce and deliver your orders</li>
            <li>To arrange payment, shipping and after-sales support</li>
            <li>To keep records and meet legal, tax and accounting duties</li>
            <li>To improve the Website and understand which pages and services visitors find useful</li>
            <li>To protect the Website from spam, fraud and misuse</li>
          </LegalList>
          <p>
            We use your email address, phone number or WhatsApp number to contact you about your
            inquiry or order. We do not sell your personal information.
          </p>
        </LegalSection>

        <LegalSection number={4} title="Our legal bases (where GDPR or similar laws apply)">
          <p>
            Where laws such as the GDPR apply, we process your information because: you ask us to
            take steps before entering into a contract, such as giving you a quote; it is
            necessary for our legitimate interests in running our business and answering
            inquiries; we must meet a legal obligation; or you have given your consent, for
            example for non-essential cookies where required. You can withdraw your consent at
            any time.
          </p>
        </LegalSection>

        <LegalSection number={5} title="Your designs and files">
          <p>
            Designs, tech packs, artwork and reference images that you send us are used only to
            prepare your quote, sample and order. We do not use them for other customers. We
            share them only with the people who need them to do that work for you, such as our
            production team and the service providers who help us deliver your order.
          </p>
        </LegalSection>

        <LegalSection number={6} title="Who we share information with">
          <p>We share personal information only when needed to run our business:</p>
          <LegalList>
            <li>
              Service providers that help us run the Website and handle inquiries, such as
              website hosting, email, form handling, file storage and analytics
            </li>
            <li>
              Couriers, freight forwarders, and payment or banking providers, when we ship your
              order or receive payment
            </li>
            <li>Professional advisers, such as accountants and lawyers</li>
            <li>Authorities, when the law requires it</li>
          </LegalList>
          <p>
            These providers may use your information only to provide services to us. We do not
            sell your personal information.
          </p>
        </LegalSection>

        <LegalSection number={7} title="Cookies and analytics">
          <p>Cookies are small files stored on your device. We use:</p>
          <LegalList>
            <li>
              <strong className="font-semibold text-ink">Essential cookies</strong>, which the
              Website needs to work properly
            </li>
            <li>
              <strong className="font-semibold text-ink">Analytics cookies</strong>, which help us
              see how visitors use the Website, for example through Google Analytics. We use this
              information in aggregate form to improve our content.
            </li>
          </LegalList>
          <p>
            You can block or delete cookies in your browser settings. Blocking essential cookies
            may stop parts of the Website from working. Google also provides a browser add-on
            that lets you opt out of Google Analytics.
          </p>
        </LegalSection>

        <LegalSection number={8} title="International processing">
          <p>
            We are based in Pakistan and work with buyers around the world. Your information may
            be processed in Pakistan and in other countries where our service providers operate.
            We take reasonable steps to protect your information wherever it is processed.
          </p>
        </LegalSection>

        <LegalSection number={9} title="How long we keep information">
          <p>
            We keep your information only for as long as we need it for the purposes in this
            policy. Inquiry details are kept while we are in contact with you and for a
            reasonable period afterwards. Order, invoice and payment records are kept for as long
            as the law and our business records require. You can ask us to delete your
            information (see section 11), unless we must keep it by law.
          </p>
        </LegalSection>

        <LegalSection number={10} title="Security">
          <p>
            We use reasonable technical and organisational measures to protect your information,
            including secure connections (HTTPS) on the Website and limited access to your data.
            No method of transmission or storage is completely secure, so we cannot guarantee
            absolute security.
          </p>
        </LegalSection>

        <LegalSection number={11} title="Your rights and choices">
          <p>Depending on where you live, you may have the right to:</p>
          <LegalList>
            <li>Ask for a copy of the personal information we hold about you</li>
            <li>Ask us to correct it</li>
            <li>Ask us to delete it</li>
            <li>Object to, or ask us to restrict, certain uses of it</li>
            <li>Withdraw your consent</li>
            <li>Ask for your information in a portable format</li>
          </LegalList>
          <p>
            To use any of these rights, email us at{" "}
            <a href="mailto:inquiry@orbisleatherpvtltd.com" className="link-underline font-medium text-ink">
              inquiry@orbisleatherpvtltd.com
            </a>
            . We may need to confirm your identity first. We will respond as soon as we can and
            within the time required by applicable law.
          </p>
        </LegalSection>

        <LegalSection number={12} title="Children">
          <p>
            Our Website and services are for businesses and adults. We do not knowingly collect
            personal information from anyone under 18. If you believe a child has sent us
            information, please contact us and we will delete it.
          </p>
        </LegalSection>

        <LegalSection number={13} title="Links to other sites">
          <p>
            The Website may link to other sites and services, such as WhatsApp and social media.
            We are not responsible for their privacy practices. Please read their policies.
          </p>
        </LegalSection>

        <LegalSection number={14} title="Changes to this policy">
          <p>
            We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at
            the top shows when it was last changed. Please check this page for the latest
            version.
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
                +92 333 4544557
              </a>
            </span>
          </address>
        </LegalSection>
      </LegalBody>
    </Section>
  );
}
