"use client";

import { useState } from "react";
import { ChevronsDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItem {
    id: number;
    title: string;
    content: string;
}

const accordionItems: AccordionItem[] = [
    {
        id: 1,
        title: "Who this is for",
        content:
            "This trek is ideal for beginners and nature enthusiasts who want to experience the beauty of the Himalayas. If you enjoy camping under the stars, walking through pine forests, and soaking in panoramic mountain views, this trek is for you.",
    },
    {
        id: 2,
        title: "Who this is not for",
        content:
            "This trek may not be suitable for those with serious medical conditions, individuals who are not comfortable walking 5-6 hours a day on mountain trails, or anyone looking for a luxury travel experience.",
    },
    {
        id: 3,
        title: "Inclusions",
        content:
            "All meals from Day 1 dinner to the last day breakfast, camping equipment including tents and sleeping bags, certified trek leaders and support staff, first aid and medical kits, forest permits and entry fees, and all transportation from the base camp.",
    },
    {
        id: 4,
        title: "Exclusions",
        content:
            "Travel to and from the base camp, personal expenses such as snacks and beverages, travel insurance, any gear or equipment not mentioned in inclusions, tips for guides and porters, and emergency evacuation costs.",
    },
    {
        id: 5,
        title: "Itinerary",
        content:
            "Day 1: Arrival at base camp and acclimatization walk. Day 2: Trek through dense oak and pine forests to the first campsite. Day 3: Summit day with panoramic views of the Himalayan range. Day 4: Descend back to base camp and departure.",
    },
    {
        id: 6,
        title: "FAQs",
        content:
            "What is the difficulty level? This is an easy-to-moderate trek suitable for beginners. What should I carry? Warm layers, sturdy trekking shoes, a daypack, sunscreen, and a water bottle. Is there network connectivity? Limited to no network availability on the trail.",
    },
];

const contentVariants = {
    collapsed: {
        height: 0,
        opacity: 0,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
    },
    expanded: {
        height: "auto",
        opacity: 1,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
    },
};

function AccordionRow({ item }: { item: AccordionItem }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-neutral-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between py-6 text-left transition-colors hover:bg-neutral-50 md:py-8"
                aria-expanded={isOpen}
            >
                <span className="text-lg font-normal text-neutral-800 md:text-xl">
                    {item.title}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="ml-4 shrink-0 text-neutral-500"
                >
                    <ChevronsDown className="h-6 w-6" />
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        // @ts-ignore
                        variants={contentVariants}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 pr-12 text-base leading-relaxed text-neutral-600 md:pb-8">
                            {item.content}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function InfoAccordion() {
    return (
        <section className="flex min-h-screen items-center justify-center bg-neutral-50 px-6 py-16 md:px-16 lg:px-24">
            <div className="w-full max-w-2xl">
                {accordionItems.map((item) => (
                    <AccordionRow key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}
