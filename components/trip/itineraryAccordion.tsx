"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { IItinerary } from "@/types/trip";

interface Props {
    itinerary: IItinerary[];
}

export const ItineraryAccordion: React.FC<Props> = ({ itinerary }) => {
    const [openDay, setOpenDay] = useState<number | null>(1); // Birinchi kun ochiq turadi

    return (
        <div className="max-w-4xl mx-auto space-y-4">
            {itinerary
                .sort((a, b) => a.day - b.day)
                .map((item) => (
                    <div
                        key={item.day}
                        className="border-b border-[#004D3C]/10 pb-4 last:border-0"
                    >
                        <button
                            onClick={() =>
                                setOpenDay(
                                    openDay === item.day ? null : item.day,
                                )
                            }
                            className="w-full flex items-baseline justify-between py-4 text-left group"
                        >
                            <div className="flex items-baseline gap-6">
                                <span className="text-[10px] tracking-[0.2em] text-[#004D3C]/50 font-medium">
                                    DAY {String(item.day).padStart(2, "0")}
                                </span>
                                <h3 className="text-xl md:text-2xl font-serif text-[#004D3C] group-hover:opacity-70 transition-opacity">
                                    {item.title}
                                </h3>
                            </div>
                            <motion.div
                                animate={{
                                    rotate: openDay === item.day ? 180 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="text-[#004D3C]"
                            >
                                <ChevronDown size={20} strokeWidth={1.5} />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {openDay === item.day && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.04, 0.62, 0.23, 0.98],
                                    }}
                                    className="overflow-hidden"
                                >
                                    <div className="pl-[78px] pr-10 pb-6 text-[#004D3C]/80 leading-relaxed text-lg max-w-2xl">
                                        {item.content}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
        </div>
    );
};
