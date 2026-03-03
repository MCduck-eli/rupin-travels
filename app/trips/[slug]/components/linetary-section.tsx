"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DayItineraryProps {
    itinerary: { title: string; content: string; image?: string }[];
}

export default function DayItineraryComponent({
    itinerary,
}: DayItineraryProps) {
    const [activeDay, setActiveDay] = useState(0);

    if (!itinerary || itinerary.length === 0) return null;

    return (
        <section className="bg-[#F5F2ED] py-12 px-6 md:px-16 lg:px-24 min-h-150 flex flex-col items-center">
            <div className="w-full max-w-5xl">
                <div className="mb-10 text-left">
                    <h2 className="font-serif text-3xl md:text-4xl text-[#2D2D2D] tracking-tight italic">
                        The Journey Day by Day
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
                    {itinerary.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveDay(index)}
                            className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] transition-all duration-300 border ${
                                activeDay === index
                                    ? "bg-[#D4B94E] border-[#D4B94E] text-white shadow-md"
                                    : "bg-transparent border-[#2D2D2D]/20 text-[#2D2D2D]/40 hover:border-[#2D2D2D]/60"
                            }`}
                        >
                            DAY {index + 1}
                        </button>
                    ))}
                </div>

                <div className="relative overflow-hidden min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeDay}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
                        >
                            <div className="order-2 md:order-1">
                                <div className="border border-[#4A2C1A]/10 p-2 bg-white shadow-sm">
                                    <img
                                        src={
                                            itinerary[activeDay].image ||
                                            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"
                                        }
                                        alt={itinerary[activeDay].title}
                                        className="w-full h-80 object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                                    />
                                </div>
                            </div>

                            <div className="order-1 md:order-2 text-center md:text-left">
                                <span className="text-[10px] tracking-[0.3em] text-[#D4B94E] font-bold uppercase block mb-2">
                                    Daily Experience
                                </span>
                                <h3 className="font-serif text-3xl md:text-4xl text-[#2D2D2D] mb-6 leading-tight">
                                    {itinerary[activeDay].title}
                                </h3>
                                <p className="text-[#2D2D2D]/60 text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0 font-light">
                                    {itinerary[activeDay].content}
                                </p>
                                <div className="mt-8 h-px w-24 bg-[#D4B94E] mx-auto md:mx-0" />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
