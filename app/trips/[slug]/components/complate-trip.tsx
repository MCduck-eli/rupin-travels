"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DayItineraryComponent from "./linetary-section";

interface TripInfoItem {
    title: string;
    description: string;
    icon?: string;
}

interface CompleteTripInfoProps {
    data: any;
}

export default function CompleteTripInfo({ data }: CompleteTripInfoProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const defaultTitles = [
        "Who this is for",
        "Who this is not for",
        "Perfect For",
        "Inclusions",
        "Exclusions",
        "Food Philosophy",
        "Quick Itinerary",
        "Detailed Itinerary",
    ];

    const rawItems: TripInfoItem[] = data?.extraDetails || [];

    const infoItems = defaultTitles.map((title) => {
        const existingItem = rawItems.find(
            (item) => item.title.trim().toLowerCase() === title.toLowerCase(),
        );

        return {
            title: title,
            description: existingItem?.description || "",
            icon: existingItem?.icon || "",
        };
    });

    if (!infoItems || infoItems.length === 0) return null;

    return (
        <section className="w-full py-16 px-4 md:px-10 bg-[#ede4d9]">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-[32px] md:text-[40px] font-normal text-[#1a1a1a] mb-8 tracking-normal border-b border-black/5 pb-4">
                    Complete Trip Information
                </h2>

                <div className="flex flex-col">
                    {infoItems.map((item, index) => {
                        const isOpen = openIndex === index;
                        const isDetailedItinerary =
                            item.title === "Detailed Itinerary";

                        const lines =
                            item.description
                                ?.split("\n")
                                .filter((l) => l.trim() !== "") || [];

                        return (
                            <div
                                key={index}
                                className="w-full border-t border-dotted border-black/20"
                            >
                                <button
                                    onClick={() =>
                                        setOpenIndex(isOpen ? null : index)
                                    }
                                    className="w-full py-5 flex items-center justify-between text-left transition-all duration-300 hover:pl-2"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-9 h-9 shrink-0 bg-white/50 border border-black/5 flex items-center justify-center overflow-hidden rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
                                            {item.icon ? (
                                                <img
                                                    src={item.icon}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover grayscale opacity-70"
                                                />
                                            ) : (
                                                <div className="w-2 h-2 rounded-full bg-black/10" />
                                            )}
                                        </div>
                                        <h3
                                            className={`text-[18px] md:text-[20px] font-normal tracking-wide transition-colors duration-300 ${isOpen ? "text-[#2b5a9e]" : "text-[#1a1a1a]"}`}
                                        >
                                            {item.title}
                                        </h3>
                                    </div>

                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{
                                            duration: 0.4,
                                            ease: "easeInOut",
                                        }}
                                        className={
                                            isOpen
                                                ? "text-[#2b5a9e]"
                                                : "text-black/30"
                                        }
                                    >
                                        <ChevronDown
                                            size={20}
                                            strokeWidth={1.5}
                                        />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                            }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-6">
                                                {isDetailedItinerary ? (
                                                    <div className="mt-4">
                                                        <DayItineraryComponent
                                                            itinerary={
                                                                data?.itinerary
                                                            }
                                                        />
                                                    </div>
                                                ) : (
                                                    <ul className="space-y-3 border-l border-black/5 ml-13 pl-5">
                                                        {lines.length > 0 ? (
                                                            lines.map(
                                                                (line, i) => (
                                                                    <li
                                                                        key={i}
                                                                        className="text-[15px] md:text-[17px] leading-relaxed text-black/70 flex items-start gap-2"
                                                                    >
                                                                        <span className="mt-2 text-[#2b5a9e]/40 text-[12px]">
                                                                            •
                                                                        </span>
                                                                        {line}
                                                                    </li>
                                                                ),
                                                            )
                                                        ) : (
                                                            <li className="text-[14px] text-black/30 italic">
                                                                No information
                                                                provided yet.
                                                            </li>
                                                        )}
                                                    </ul>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                    <div className="border-t border-dotted border-black/20 w-full" />
                </div>
            </div>
        </section>
    );
}
