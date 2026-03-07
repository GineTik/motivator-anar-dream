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
import { FooterBlock } from "./blocks/footer-block";
import { BlogBlock } from "./blocks/blog-block";
import { PartnershipBlock } from "./blocks/partnership-block";
import { GalleryBlock } from "./blocks/gallery-block";
import { ContactUsBlock } from "./blocks/contact-us-block";

export const Pages: CollectionConfig = {
    slug: "pages",
    labels: {
        singular: "Сторінка",
        plural: "Сторінки",
    },
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
            label: "Заголовок",
            required: true,
            localized: true,
        },
        {
            name: "slug",
            type: "text",
            label: "Адреса (slug)",
            required: true,
            unique: true,
            admin: {
                position: "sidebar",
                description:
                    "Унікальна адреса сторінки в URL (автоматично форматується)",
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
            label: "Блоки сторінки",
            blocks: [
                HeroBlock,
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
                ContactUsBlock,
            ],
            required: true,
            minRows: 1,
            admin: {
                description:
                    "Додавайте та впорядковуйте блоки контенту на сторінці",
            },
        },
        {
            name: "seo",
            type: "group",
            label: "SEO налаштування",
            admin: {
                description:
                    "Налаштування для пошукових систем (Google, тощо)",
            },
            fields: [
                {
                    name: "title",
                    type: "text",
                    label: "SEO заголовок",
                    localized: true,
                    admin: {
                        description: "Заголовок сторінки для пошукових систем",
                    },
                },
                {
                    name: "description",
                    type: "textarea",
                    label: "SEO опис",
                    localized: true,
                },
                {
                    name: "keywords",
                    type: "text",
                    label: "Ключові слова",
                    localized: true,
                },
                {
                    name: "ogImage",
                    type: "upload",
                    label: "Зображення для соцмереж",
                    relationTo: "media",
                },
            ],
        },
        {
            name: "publishedAt",
            type: "date",
            label: "Дата публікації",
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
