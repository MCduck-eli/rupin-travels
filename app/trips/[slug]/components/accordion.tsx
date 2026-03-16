"use client";

import React, { useState } from "react";
import { ChevronDown, Info, ShieldCheck, Map, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InfoAccordionProps {
    data: any;
}

export default function InfoAccordion({ data }: InfoAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const infoItems = [
        {
            title: "General Information",
            content:
                data.description || "No description provided for this journey.",
            icon: <Info size={20} />,
        },
        {
            title: "What's Included",
            content:
                "Expert guiding, all accommodations, internal transfers, and curated meals as per the itinerary.",
            icon: <ShieldCheck size={20} />,
        },
        {
            title: "Essential Gear",
            content:
                "Comfortable walking shoes, weather-appropriate layers, a reusable water bottle, and a personal first-aid kit.",
            icon: <Map size={20} />,
        },
        {
            title: "Booking Policy",
            content:
                "A 30% deposit is required to secure your spot. Full payment is due 60 days before departure.",
            icon: <CreditCard size={20} />,
        },
    ];

    if (!data) return null;

    return (
        <section className="py-24 px-6 bg-[#F7F5F2]">
            <div className="max-w-3xl mx-auto">
                <h2
                    className="text-4xl md:text-5xl text-[#004D3C] mb-12 text-center"
                    style={{
                        fontFamily: "'Beautifully Delicious', sans-serif",
                    }}
                >
                    Essential Information
                </h2>

                <div className="space-y-4">
                    {infoItems.map((item, index) => (
                        <div
                            key={index}
                            className="border border-[#004D3C]/10 rounded-sm bg-white overflow-hidden"
                        >
                            <button
                                onClick={() =>
                                    setOpenIndex(
                                        openIndex === index ? null : index,
                                    )
                                }
                                className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-[#F7F5F2]"
                            >
                                <div className="flex items-center gap-4 text-[#004D3C]">
                                    <span className="opacity-60">
                                        {item.icon}
                                    </span>
                                    <span
                                        className="text-lg font-medium tracking-wide"
                                        style={{
                                            fontFamily: "'Higuen', serif",
                                        }}
                                    >
                                        {item.title}
                                    </span>
                                </div>
                                <motion.div
                                    animate={{
                                        rotate: openIndex === index ? 180 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="text-[#004D3C]/40"
                                >
                                    <ChevronDown size={20} />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        <div
                                            className="px-6 pb-6 pl-[60px] text-[#004D3C]/80 leading-relaxed font-light text-lg"
                                            style={{
                                                fontFamily: "'Higuen', serif",
                                            }}
                                        >
                                            {item.content}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
