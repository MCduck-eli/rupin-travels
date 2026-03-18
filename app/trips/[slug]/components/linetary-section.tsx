"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DayItineraryProps {
    itinerary?: { title: string; content: string; image?: string }[];
}

const DEFAULT_ITINERARY = [
    {
        title: "Ancient City Exploration",
        content:
            "Spend the day wandering through labyrinthine streets, visiting turquoise-domed madrasas and vibrant silk markets. Our expert guides will reveal the hidden stories behind the thousand-year-old walls.",
        image: "https://images.unsplash.com/photo-1580191947416-62d35a55e71d?w=800&q=80",
    },
    {
        title: "The Golden Journey Continues",
        content:
            "A scenic drive through changing landscapes leads us to our next destination. Along the way, we'll visit a local artisan's workshop to see the intricate process of traditional pottery and weaving.",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    },
];

export default function DayItineraryComponent({
    itinerary,
}: DayItineraryProps) {
    const [activeDay, setActiveDay] = useState(0);

    const displayItinerary =
        itinerary && itinerary.length > 0 ? itinerary : DEFAULT_ITINERARY;

    return (
        <section className="bg-[#F5F2ED] py-6 px-4 md:px-10 lg:px-16 min-h-fit flex flex-col items-center">
            <div className="w-full max-w-5xl">
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {displayItinerary.map((_, index) => (
                        <h3>
                            <button
                                key={index}
                                onClick={() => setActiveDay(index)}
                                style={{ fontFamily: "'Higuen', serif" }}
                                className={`px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[9px] md:text-[11px] font-bold tracking-[0.15em] transition-all duration-300 border ${
                                    activeDay === index
                                        ? "bg-[#D4B94E] border-[#D4B94E] text-white shadow-sm"
                                        : "bg-transparent border-[#2D2D2D]/10 text-[#2D2D2D]/40 hover:border-[#2D2D2D]/40"
                                }`}
                            >
                                DAY {index + 1}
                            </button>
                        </h3>
                    ))}
                </div>

                <div className="relative overflow-hidden min-h-[300px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeDay}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
                        >
                            <div className="order-2 md:order-1">
                                <div className="border border-[#4A2C1A]/10 p-1.5 bg-white shadow-sm rounded-sm">
                                    <img
                                        src={
                                            displayItinerary[activeDay].image ||
                                            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"
                                        }
                                        alt={displayItinerary[activeDay].title}
                                        className="w-full h-64 md:h-72 object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                                    />
                                </div>
                            </div>

                            <div className="order-1 md:order-2 text-center md:text-left">
                                <h3
                                    className="text-2xl md:text-3xl text-[#2D2D2D] mb-3 leading-tight italic"
                                    style={{ fontFamily: "'Higuen', serif" }}
                                >
                                    {displayItinerary[activeDay].title}
                                </h3>
                                <p
                                    className="text-[#2D2D2D]/70 text-sm md:text-[16px] leading-relaxed max-w-md mx-auto md:mx-0 font-light"
                                    style={{ fontFamily: "'Higuen', serif" }}
                                >
                                    {displayItinerary[activeDay].content}
                                </p>
                                <div className="mt-4 h-px w-16 bg-[#D4B94E] mx-auto md:mx-0" />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
