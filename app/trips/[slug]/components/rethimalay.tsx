"use client";

import React from "react";
import { ITrip } from "@/types/trip";

interface Props {
    data: ITrip;
}

const RetHimalay: React.FC<Props> = ({ data }) => {
    const getHighlights = () => {
        const h = data.highlights;

        if (Array.isArray(h)) {
            const filtered = h.filter((item) => item && item.trim() !== "");
            if (filtered.length > 0) return filtered;
        }

        if (typeof h === "string" && (h as string).trim() !== "") {
            return (h as string)
                .split("\n")
                .filter((line) => line.trim() !== "");
        }

        return (
            data.itinerary
                ?.slice(0, 6)
                .map((item) => item.title)
                .filter((t) => t) || []
        );
    };

    const highlights = getHighlights();

    return (
        <section className="relative w-full bg-white py-16 px-6 md:px-16 lg:px-24 text-[#2d2d2d]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    <div className="md:col-span-8">
                        <h3 className="text-[#2b5a9e] text-[22px] md:text-[28px] mb-6 font-normal">
                            Trip Highlights:
                        </h3>
                        <ul className="space-y-3">
                            {highlights.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3 text-[18px]  font-normal text-[#333]"
                                >
                                    <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <div className="sticky top-12 bg-[#ede4d9] rounded-[30px] p-8 md:p-10 shadow-sm space-y-6">
                            <div>
                                <p className="text-gray-600 text-[12px] uppercase tracking-widest mb-1 font-medium">
                                    Cost
                                </p>
                                <p className="text-[28px] md:text-[32px] font-light text-[#333]">
                                    $ {data.price || "0.00"} pp
                                </p>
                            </div>

                            {data.extraCost && (
                                <div className="pt-4 border-t border-black/10">
                                    <p className="text-[17px] font-light text-[#444] leading-snug">
                                        {data.extraCost}
                                    </p>
                                </div>
                            )}

                            <div className="pt-6">
                                <button
                                    className="text-[15px] font-medium border-b border-black/30 hover:border-black transition-all text-black/70 hover:text-black"
                                    onClick={() =>
                                        data.cancellationPolicy &&
                                        alert(data.cancellationPolicy)
                                    }
                                >
                                    Cancellation Policy
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-full pt-10 border-t border-gray-100">
                        <h2 className="text-[#2b5a9e] text-[22px] md:text-[28px] mb-6 font-normal">
                            Trip Description
                        </h2>
                        <div className="space-y-6 text-[18px] md:text-[20px] font-light leading-relaxed text-[#444]">
                            <p className="italic font-medium text-black/80">
                                {data.fullTitle || data.title}
                            </p>
                            <div className="whitespace-pre-line w-full">
                                {data.fullDescription || data.description}
                            </div>
                            <p className="font-normal text-black pt-4 border-t border-gray-50 italic">
                                Arrive as you are—leave grounded, refreshed, and
                                inspired.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RetHimalay;
