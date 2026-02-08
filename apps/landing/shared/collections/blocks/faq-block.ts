import type { Block } from "payload";

export const FaqBlock: Block = {
    slug: "faq",
    interfaceName: "FaqBlock",
    fields: [
        {
            name: "badge",
            type: "group",
            fields: [
                {
                    name: "icon",
                    type: "upload",
                    relationTo: "media",
                    required: false,
                },
                {
                    name: "text",
                    type: "text",
                    required: true,
                    localized: true,
                    defaultValue: "Your Questions",
                },
            ],
        },
        {
            name: "heading",
            type: "text",
            required: true,
            localized: true,
            defaultValue: "Guidance for your journey",
        },
        {
            name: "subtitle",
            type: "textarea",
            required: true,
            localized: true,
            defaultValue:
                "Begin in moments, not hours. Our intuitive approach welcomes you wherever you are—no prior experience needed, just an open heart.",
        },
        {
            name: "questions",
            type: "array",
            minRows: 3,
            maxRows: 10,
            defaultValue: [
                {
                    question:
                        "How can spiritual practices help in everyday life?",
                    answer: "Spiritual practices bring awareness and clarity into your daily routine. By cultivating inner stillness, you develop the ability to respond rather than react, make conscious choices, and experience deeper connection with yourself and others. Over time, this transforms not just your inner world, but your relationships, work, and overall quality of life.",
                },
                {
                    question: "Do I need prior experience to begin?",
                    answer: "Not at all. Our approach welcomes you exactly where you are. Whether you are completely new to spiritual practices or have years of experience, the journey is uniquely yours. We provide gentle guidance and practical tools that adapt to your personal level of readiness and openness.",
                },
                {
                    question:
                        "How long does it take to feel the effects of inner work?",
                    answer: "Many people notice subtle shifts in awareness and emotional balance within the first few sessions. Deeper transformation unfolds naturally over time as you develop a consistent practice. There is no rush—transformation happens at your own pace when you connect authentically with yourself.",
                },
                {
                    question:
                        "Is this approach available in multiple languages?",
                    answer: "Yes! We support Russian, Ukrainian, and English-speaking communities. Our practices and guidance are available in multiple languages to ensure that everyone can access inner transformation in a way that feels natural and comfortable to them.",
                },
            ],
            fields: [
                {
                    name: "icon",
                    type: "upload",
                    relationTo: "media",
                    required: false,
                    admin: {
                        description: "Icon for this FAQ item (optional)",
                    },
                },
                {
                    name: "question",
                    type: "text",
                    required: true,
                    localized: true,
                },
                {
                    name: "answer",
                    type: "textarea",
                    required: true,
                    localized: true,
                },
            ],
        },
    ],
};
