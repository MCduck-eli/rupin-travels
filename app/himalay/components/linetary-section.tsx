"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ITINERARY_DATA = [
    {
        day: 1,
        title: "Arrival & Welcome",
        desc: "Arrive at the mountain base. Traditional blessing ceremony and welcome dinner.",
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    },
    {
        day: 2,
        title: "Forest Exploration",
        desc: "Guided forest walk through ancient cedar groves and meditation.",
        img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    },
    {
        day: 3,
        title: "Sacred Lake Trek",
        desc: "Moderate trek to a glacial lake with reflection sessions.",
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    },
    {
        day: 4,
        title: "Alpine Yoga",
        desc: "Morning yoga in alpine meadows with panoramic views.",
        img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
    },
    {
        day: 5,
        title: "Summit Approach",
        desc: "Ascending towards the ridge with a focus on mindful movement.",
        img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    },
    {
        day: 6,
        title: "Summit Day",
        desc: "Reaching the peak and hanging traditional prayer flags.",
        img: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800",
    },
    {
        day: 7,
        title: "Restorative Soak",
        desc: "Descending to natural hot springs for muscle recovery.",
        img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    },
    {
        day: 8,
        title: "Village Culture",
        desc: "Immersion into local life, weaving workshops, and cooking.",
        img: "https://images.unsplash.com/photo-1518005020250-6eb5f3f2754d?w=800",
    },
    {
        day: 9,
        title: "Sound Healing",
        desc: "Scenic river walk followed by traditional sound therapy.",
        img: "https://images.unsplash.com/photo-1512100356956-c15874764e39?w=800",
    },
    {
        day: 10,
        title: "Final Departure",
        desc: "Integration session and transfer to the departure point.",
        img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
    },
];

export default function DayItineraryComponent() {
    const [activeDay, setActiveDay] = useState(0);

    return (
        <section className="bg-[#F5F2ED] py-12 px-6 md:px-16 lg:px-24 min-h-[600px] flex flex-col items-center">
            <div className="w-full max-w-5xl">
                {/* Sarlavha */}
                <div className="mb-10 text-left">
                    <h2 className="font-serif text-3xl md:text-4xl text-[#2D2D2D] tracking-tight">
                        Itinerary
                    </h2>
                </div>

                {/* Kunlar Selectori (10 ta tugma) */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
                    {ITINERARY_DATA.map((item, index) => (
                        <button
                            key={item.day}
                            onClick={() => setActiveDay(index)}
                            className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold tracking-widest transition-all duration-300 border ${
                                activeDay === index
                                    ? "bg-[#D4B94E] border-[#D4B94E] text-white shadow-md"
                                    : "bg-transparent border-[#2D2D2D]/20 text-[#2D2D2D]/40 hover:border-[#2D2D2D]/60"
                            }`}
                        >
                            DAY {item.day}
                        </button>
                    ))}
                </div>

                <div className="relative overflow-hidden min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeDay}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
                        >
                            <div className="order-2 md:order-1">
                                <div className="border border-[#4A2C1A]/20 p-2">
                                    <img
                                        src={ITINERARY_DATA[activeDay].img}
                                        alt={ITINERARY_DATA[activeDay].title}
                                        className="w-full h-75 object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                            </div>

                            <div className="order-1 md:order-2 text-center md:text-left">
                                <span className="text-[10px] tracking-[0.3em] text-[#D4B94E] font-bold uppercase block mb-2">
                                    Daily Experience
                                </span>
                                <h3 className="font-serif text-3xl md:text-4xl text-[#2D2D2D] mb-6 leading-tight">
                                    {ITINERARY_DATA[activeDay].title}
                                </h3>
                                <p className="text-[#2D2D2D]/60 text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0">
                                    {ITINERARY_DATA[activeDay].desc}
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
