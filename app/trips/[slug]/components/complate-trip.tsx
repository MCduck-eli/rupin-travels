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
        <section className="w-full py-10 px-4 md:px-10 bg-[#ede4d9]">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-[18px] md:text-[20px] font-medium text-[#1a1a1a] mb-5 tracking-tight">
                    Complete Trip Information
                </h2>

                <div className="flex flex-col">
                    {infoItems.map((item, index) => (
                        <div
                            key={index}
                            className="w-full border-t border-dotted border-black/20"
                        >
                            <button
                                onClick={() =>
                                    setOpenIndex(
                                        openIndex === index ? null : index,
                                    )
                                }
                                className="w-full py-3 flex items-center justify-between text-left transition-all hover:bg-black/5"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 shrink-0 bg-white/40 border border-black/10 flex items-center justify-center overflow-hidden rounded-md shadow-sm">
                                        {item.icon ? (
                                            <img
                                                src={item.icon}
                                                alt={item.title}
                                                className="w-full h-full object-cover grayscale opacity-80"
                                            />
                                        ) : (
                                            <div className="w-2 h-2 rounded-full bg-black/20" />
                                        )}
                                    </div>
                                    <span className="text-[15px] md:text-[16px] font-light text-[#1a1a1a]">
                                        {item.title}
                                    </span>
                                </div>

                                <motion.div
                                    animate={{
                                        rotate: openIndex === index ? 180 : 0,
                                    }}
                                    className="text-black/50"
                                >
                                    <ChevronDown size={18} strokeWidth={2} />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-4 pl-11 pr-4 text-[14px] leading-relaxed text-black/70 italic whitespace-pre-line">
                                            {item.description ||
                                                "No information provided yet."}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                    <div className="border-t border-dotted border-black/20 w-full" />
                </div>
            </div>
        </section>
    );
}
