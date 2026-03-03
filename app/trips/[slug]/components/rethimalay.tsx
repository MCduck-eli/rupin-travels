"use client";

import React from "react";
import { ITrip } from "@/types/trip";

interface Props {
    data: ITrip;
}

const RetHimalay: React.FC<Props> = ({ data }) => {
    // Sayohat rejasidan (itinerary) birinchi 6 ta sarlavhani ajratib olish
    const features =
        data.itinerary?.slice(0, 6).map((item) => item.title) || [];

    return (
        <section className="relative w-full bg-[#f9f8f6] py-20 px-6 md:px-16 lg:px-24 text-[#2d2d2d] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                    {/* CHAP TOMON: Highlights va Batafsil matn */}
                    <div className="md:col-span-8 space-y-12">
                        <ul className="space-y-2">
                            {features.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-4 text-[20px] md:text-[22px] font-light tracking-tight leading-snug"
                                    style={{
                                        fontFamily:
                                            "'Cormorant Garamond', serif",
                                    }}
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="max-w-3xl space-y-8 pt-4">
                            <p className="text-[22px] md:text-[24px] leading-relaxed font-light font-serif italic text-black/80">
                                Rediscover yourself through the journey of{" "}
                                {/* Hero'dan farqli bo'lishi uchun fullTitle ishlatiladi */}
                                {data.fullTitle || data.title}.
                            </p>

                            <p className="text-[20px] md:text-[21px] leading-relaxed font-light text-black/70 tracking-wide">
                                {/* Batafsil tavsif uchun fullDescription ishlatiladi */}
                                {data.fullDescription || data.description}
                            </p>

                            <p className="text-[20px] md:text-[21px] leading-relaxed font-light text-black/90 tracking-wide">
                                Arrive as you are—leave grounded, refreshed, and
                                inspired.
                            </p>
                        </div>
                    </div>

                    {/* O'NG TOMON: Qisqa xulosa (The Essence) */}
                    <div className="md:col-span-4 hidden md:block">
                        <div className="sticky top-12 space-y-10 border-l border-black/5 pl-10">
                            <ul className="space-y-10">
                                <li className="flex items-start gap-4">
                                    <span className="mt-3 h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                                    <p className="text-[22px] md:text-[24px] font-light leading-tight italic font-serif">
                                        Immersive <br />
                                        experience in <br />
                                        {data.fullTitle || data.title}
                                    </p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="mt-3 h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                                    <p className="text-[22px] md:text-[24px] font-light leading-tight italic font-serif">
                                        {data.itinerary?.length || 0} days to{" "}
                                        <br />
                                        integrate and <br />
                                        reflect
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RetHimalay;
