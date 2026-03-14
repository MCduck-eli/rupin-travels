"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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

    const infoItems: TripInfoItem[] = data?.extraDetails || [];

    if (!infoItems || infoItems.length === 0) return null;

    return (
        <section className="w-full py-16 px-4 md:px-10 bg-[#ede4d9]">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-[20px] md:text-[22px] font-light text-[#1a1a1a] mb-8 tracking-[0.05em] uppercase border-b border-black/5 pb-4">
                    Complete Trip Information
                </h2>

                <div className="flex flex-col">
                    {infoItems.map((item, index) => {
                        const isOpen = openIndex === index;
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
                                        <span
                                            className={`text-[16px] md:text-[17px] font-light tracking-wide transition-colors duration-300 ${isOpen ? "text-[#2b5a9e]" : "text-[#1a1a1a]"}`}
                                        >
                                            {item.title}
                                        </span>
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
                                            <div className="pb-6 pl-13 pr-4 md:pl-13">
                                                <ul className="space-y-3 border-l border-black/5 ml-4 md:ml-4 pl-5">
                                                    {lines.length > 0 ? (
                                                        lines.map((line, i) => (
                                                            <li
                                                                key={i}
                                                                className="text-[14px] md:text-[15px] leading-relaxed text-black/60 italic flex items-start gap-2"
                                                            >
                                                                <span className="mt-2 text-[#2b5a9e]/40 text-[12px]">
                                                                    •
                                                                </span>
                                                                {line}
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li className="text-[14px] text-black/30 italic">
                                                            No information
                                                            provided.
                                                        </li>
                                                    )}
                                                </ul>
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
