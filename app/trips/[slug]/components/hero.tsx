"use client";

import React from "react";
import { ITrip } from "@/types/trip";
import Link from "next/link";

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
                <h2
                    className="text-[56px] font-medium tracking-tight mb-4 drop-shadow-md leading-tight"
                    style={{
                        fontFamily: "'Beautifully Delicious', sans-serif",
                    }}
                >
                    {data.title}
                </h2>

                <div
                    className="w-16 h-px bg-[#D4A843] mb-6"
                    style={{ animation: "ps-lineGrow 1.5s ease-out forwards" }}
                />

                <p
                    className="text-[17px] font-light tracking-widest mb-10 opacity-95"
                    style={{
                        fontFamily: "'Beautifully Delicious', sans-serif",
                    }}
                >
                    {data.description || "Journeys that transform"}
                </p>

                <Link href={"/contact"}>
                    <button
                        className="px-10 py-3 border border-white/60 text-white text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:bg-white hover:text-black hover:border-white"
                        style={{ fontFamily: "'Higuen', serif" }}
                    >
                        Contact us
                    </button>
                </Link>
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
