"use client";

import React from "react";

interface ValueItem {
    title: string;
    description: string;
}

interface CulturalValuesProps {
    data?: any;
}

export default function CulturalValues({ data }: CulturalValuesProps) {
    const values: ValueItem[] = [
        {
            title: "Preserving Cultural Traditions",
            description:
                data?.preserving_traditions ||
                "We honor India's heritage by offering authentic yoga, meditation, Ayurveda, and cultural experiences while supporting the teachers and communities who keep these traditions alive.",
        },
        {
            title: "Cultural Exchange",
            description:
                data?.cultural_exchange ||
                "We aim to build meaningful connections between travelers and local communities, fostering mutual respect and deeper cultural understanding.",
        },
    ];

    return (
        <section className="w-full py-16 px-6 md:px-16 lg:px-24 bg-[#ede4d9]">
            <div className="max-w-6xl mx-auto space-y-12">
                {values.map((item, index) => (
                    <div key={index} className="space-y-4">
                        <h3 className="text-[28px] md:text-[34px] font-normal text-black tracking-normal">
                            {item.title}
                        </h3>
                        <p className="text-[18px] md:text-[21px] font-light leading-relaxed text-black/80 max-w-5xl">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
