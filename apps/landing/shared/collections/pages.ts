import type { CollectionConfig } from "payload";
import { HeroBlock } from "./blocks/hero-block";
import { ProcessBlock } from "./blocks/process-block";
import { PricingBlock } from "./blocks/pricing-block";
import { PricingAltBlock } from "./blocks/pricing-alt-block";
import { FeatureBlock } from "./blocks/feature-block";
import { IntegrationBlock } from "./blocks/integration-block";
import { TestimonialBlock } from "./blocks/testimonial-block";
import { FaqBlock } from "./blocks/faq-block";
import { CtaBlock } from "./blocks/cta-block";
import { HeaderBlock } from "./blocks/header-block";
import { FooterBlock } from "./blocks/footer-block";
import { BlogBlock } from "./blocks/blog-block";
import { PartnershipBlock } from "./blocks/partnership-block";
import { GalleryBlock } from "./blocks/gallery-block";

export const Pages: CollectionConfig = {
    slug: "pages",
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "slug", "updatedAt"],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
            localized: true,
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            admin: {
                position: "sidebar",
            },
            hooks: {
                beforeValidate: [
                    ({ value }) => {
                        if (typeof value === "string") {
                            return value
                                .toLowerCase()
                                .replace(/\s+/g, "-")
                                .replace(/[^a-z0-9-]/g, "");
                        }
                        return value;
                    },
                ],
            },
        },
        {
            name: "blocks",
            type: "blocks",
            blocks: [
                HeroBlock,
                HeaderBlock,
                ProcessBlock,
                PricingBlock,
                PricingAltBlock,
                FeatureBlock,
                IntegrationBlock,
                TestimonialBlock,
                FaqBlock,
                CtaBlock,
                BlogBlock,
                FooterBlock,
                PartnershipBlock,
                GalleryBlock,
            ],
            required: true,
            minRows: 1,
        },
        {
            name: "seo",
            type: "group",
            fields: [
                {
                    name: "title",
                    type: "text",
                    localized: true,
                },
                {
                    name: "description",
                    type: "textarea",
                    localized: true,
                },
                {
                    name: "keywords",
                    type: "text",
                    localized: true,
                },
                {
                    name: "ogImage",
                    type: "upload",
                    relationTo: "media",
                },
            ],
        },
        {
            name: "publishedAt",
            type: "date",
            admin: {
                position: "sidebar",
                date: {
                    pickerAppearance: "dayAndTime",
                },
            },
        },
    ],
    versions: {
        drafts: true,
    },
};
