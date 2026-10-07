import { blogCategories } from "@/lib/blog/categories";
import { dummyImage } from "@/lib/dummy-images";
import type { BlogPost } from "@/lib/blog/types";

const industryInsights = blogCategories[1];
const companyNews = blogCategories[0];
const careGuides = blogCategories[2];

const SAMPLE_NOTICE =
  "Sample article for demonstration purposes. This content is placeholder copy and does not represent a verified company publication — replace it from the admin CMS.";

/**
 * Mock blog catalog. This file is the only thing Phase 6 needs to replace
 * with real Prisma queries — lib/blog/data.ts already returns Promises and
 * consumers only depend on the `BlogPost` type, not this data source.
 *
 * Every entry is marked `isSampleContent: true` and carries an explicit
 * disclaimer, per instruction not to present demo copy as real company
 * content.
 */
export const mockBlogPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "full-grain-vs-top-grain-leather",
    title: "Full-Grain vs. Top-Grain Leather: What Wholesale Buyers Should Know",
    excerpt:
      "A brief overview of two common leather grades and the trade-offs buyers typically weigh when specifying a program.",
    content: `${SAMPLE_NOTICE}

## Two Common Grades

Full-grain and top-grain are two of the most frequently referenced leather grades in outerwear manufacturing. Each has different characteristics around durability, texture, and finishing.

## What This Means for a Program

When specifying a program, buyers typically weigh grade against cost, intended use, and finish requirements. Confirming grade and sourcing details with your manufacturing partner at the quote stage is the most reliable way to land on the right fit.

## Talk to Our Team

Every program is different — our team can walk through material options once we understand your target price point and volumes.`,
    heroImage: {
      url: dummyImage(0, 1600),
      altText: "Rolls of leather hide in a manufacturing workshop",
    },
    category: industryInsights,
    tags: ["leather materials", "sourcing"],
    author: "ORBIS Editorial Team",
    publishedAt: "2026-08-20T00:00:00.000Z",
    status: "PUBLISHED",
    seoTitle: "Full-Grain vs. Top-Grain Leather — Buyer's Overview",
    seoDescription:
      "A brief, buyer-focused overview of full-grain and top-grain leather grades for wholesale outerwear programs.",
    isSampleContent: true,
    createdAt: "2026-08-10T00:00:00.000Z",
    updatedAt: "2026-08-20T00:00:00.000Z",
  },
  {
    id: "post-2",
    slug: "how-we-approach-quality-control",
    title: "How We Approach Quality Control in Leather Manufacturing",
    excerpt:
      "A look at the general checkpoints manufacturers commonly use to catch material and construction issues before shipment.",
    content: `${SAMPLE_NOTICE}

## Checkpoints Along the Line

Quality control in leather manufacturing typically happens at multiple stages — material inspection, cutting, stitching, and final finishing — rather than at a single checkpoint.

## Why It Matters for Buyers

For wholesale and private-label buyers, understanding a manufacturer's QC process is a useful part of due diligence. Ask about inspection frequency, tolerances, and how defects are handled before you commit to a program.

## Request Specifics

Our team can share more detail on our own process during the quote conversation.`,
    heroImage: {
      url: dummyImage(1, 1600),
      altText: "Quality inspection of a finished leather jacket seam",
    },
    category: companyNews,
    tags: ["manufacturing", "quality"],
    author: "ORBIS Editorial Team",
    publishedAt: "2026-07-05T00:00:00.000Z",
    status: "PUBLISHED",
    seoTitle: "Quality Control in Leather Manufacturing",
    seoDescription:
      "An overview of common quality-control checkpoints in leather outerwear manufacturing.",
    isSampleContent: true,
    createdAt: "2026-06-28T00:00:00.000Z",
    updatedAt: "2026-07-05T00:00:00.000Z",
  },
  {
    id: "post-3",
    slug: "caring-for-your-leather-jacket",
    title: "Caring for a Leather Jacket: A General Buyer's Guide",
    excerpt:
      "General, brand-agnostic guidance on storing, cleaning, and conditioning leather outerwear.",
    content: `${SAMPLE_NOTICE}

## Storage

Leather generally prefers a cool, dry space, away from direct sunlight and away from plastic covers that can trap moisture.

## Cleaning

Most light cleaning can be done with a soft, dry cloth. For anything beyond surface dust, it's worth checking care instructions specific to the finish before applying any product.

## Conditioning

Leather conditioner can help maintain flexibility over time, but frequency depends on the leather type and climate. When in doubt, a small test patch is a reasonable first step.`,
    heroImage: {
      url: dummyImage(2, 1600),
      altText: "Leather jacket hanging in a garment care setting",
    },
    category: careGuides,
    tags: ["care", "maintenance"],
    author: "ORBIS Editorial Team",
    publishedAt: "2026-05-14T00:00:00.000Z",
    status: "PUBLISHED",
    seoTitle: "Leather Jacket Care Guide",
    seoDescription: "General guidance on storing, cleaning, and conditioning leather outerwear.",
    isSampleContent: true,
    createdAt: "2026-05-01T00:00:00.000Z",
    updatedAt: "2026-05-14T00:00:00.000Z",
  },
  {
    id: "post-4",
    slug: "private-label-vs-wholesale-programs",
    title: "Private Label vs. Wholesale: Choosing the Right Program",
    excerpt:
      "A framework for thinking through the differences between private-label and standard wholesale manufacturing programs.",
    content: `${SAMPLE_NOTICE}

## Two Common Program Types

Wholesale programs typically draw from existing catalog styles, while private-label programs are built around a buyer's own designs and branding.

## Questions Worth Asking

Volume commitments, lead time, and customization scope all tend to differ between the two. Clarifying these upfront with your manufacturing partner helps set expectations on both sides.

## Getting Started

If you're unsure which fits your business, our team can help you think it through during a quote request.`,
    heroImage: {
      url: dummyImage(3, 1600),
      altText: "Private label leather jackets on a production rack",
    },
    category: industryInsights,
    tags: ["private label", "wholesale"],
    author: "ORBIS Editorial Team",
    publishedAt: "2026-04-02T00:00:00.000Z",
    status: "PUBLISHED",
    seoTitle: "Private Label vs. Wholesale Leather Programs",
    seoDescription:
      "A framework for choosing between private-label and standard wholesale leather manufacturing programs.",
    isSampleContent: true,
    createdAt: "2026-03-20T00:00:00.000Z",
    updatedAt: "2026-04-02T00:00:00.000Z",
  },
  {
    id: "post-5",
    slug: "orbis-sample-company-update",
    title: "A Sample Company Update Post",
    excerpt:
      "A placeholder example of the kind of short company update that could be published from the admin CMS.",
    content: `${SAMPLE_NOTICE}

## About This Post

This entry exists to demonstrate how a short company update might look in the blog list and article layout.

## Replacing This Content

Once the admin CMS is connected, this post — and every other sample post in this list — should be replaced or removed.`,
    heroImage: {
      url: dummyImage(4, 1600),
      altText: "Placeholder hero image for a sample company update",
    },
    category: companyNews,
    tags: ["company news"],
    author: "ORBIS Editorial Team",
    publishedAt: "2026-02-10T00:00:00.000Z",
    status: "PUBLISHED",
    seoTitle: "Sample Company Update",
    seoDescription: "Placeholder sample post demonstrating the company-news category.",
    isSampleContent: true,
    createdAt: "2026-02-01T00:00:00.000Z",
    updatedAt: "2026-02-10T00:00:00.000Z",
  },
];
