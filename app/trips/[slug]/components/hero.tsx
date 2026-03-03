"use client";

import React from "react";
import { ITrip } from "@/types/trip";

interface HeroProps {
    data: ITrip;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
    return (
        <section
            className="relative w-full flex flex-col items-center justify-center text-white overflow-hidden"
            style={{ height: "60vh" }}
        >
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <video
                    key={data.headerVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src={data.headerVideo} type="video/mp4" />
                </video>
            </div>

            <div className="relative z-20 flex flex-col items-center text-center px-4">
                <h1
                    className="text-4xl md:text-6xl font-medium tracking-widest mb-4 drop-shadow-md uppercase"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {/* Faqat Hero uchun sarlavha */}
                    {data.title}
                </h1>

                <div
                    className="w-16 h-px bg-[#D4A843] mb-6"
                    style={{ animation: "ps-lineGrow 1.5s ease-out forwards" }}
                />

                <p
                    className="text-lg md:text-xl font-light tracking-[0.15em] mb-10 opacity-90 uppercase"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                    {data.description || "Journeys that transform"}
                </p>

                <button className="px-10 py-3 border border-white/60 text-white text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:bg-white hover:text-black hover:border-white">
                    Explore the Journey
                </button>
            </div>

            <style jsx>{`
                @keyframes ps-lineGrow {
                    from {
                        width: 0;
                    }
                    to {
                        width: 64px;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;
