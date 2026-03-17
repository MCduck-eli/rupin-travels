"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MarineTeamSection() {
    const [data, setData] = useState({
        whoAreWeTitle: "Who Are We?",
        founderName: "Sashi Nk",
        founderRole: "Founder and CEO",
        founderImage:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
        founderAboutTitle: "About the Founder",
        founderDescription1:
            "A traveler passionate about wellness and personal growth, Sashi created Rupin Travels to help others reconnect with themselves through transformative journeys and India's rich cultural traditions.",
        founderDescription2:
            "After growing up in India and living in the U.S. for over 30 years, her goal is to design meaningful experiences that allow travelers to discover India in a way that is authentic, supportive, and deeply inspiring.",
    });

    useEffect(() => {
        fetch("/api/about-settings")
            .then((res) => res.json())
            .then((resData) => {
                if (resData && !resData.error) {
                    setData((prev) => ({
                        whoAreWeTitle:
                            resData.whoAreWeTitle || prev.whoAreWeTitle,
                        founderName: resData.founderName || prev.founderName,
                        founderRole: resData.founderRole || prev.founderRole,
                        founderImage: resData.founderImage || prev.founderImage,
                        founderAboutTitle:
                            resData.founderAboutTitle || prev.founderAboutTitle,
                        founderDescription1:
                            resData.founderDescription1 ||
                            prev.founderDescription1,
                        founderDescription2:
                            resData.founderDescription2 ||
                            prev.founderDescription2,
                    }));
                }
            })
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    return (
        <section className="bg-white px-6 py-12 md:px-16 lg:px-24">
            <div className="mx-auto max-w-6xl w-full">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        fontFamily: "'Beautifully Delicious', sans-serif",
                    }}
                    className="mb-16 text-center text-5xl md:text-6xl text-[#59493b] uppercase tracking-[0.2em]"
                >
                    {data.whoAreWeTitle}
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start">
                    <div className="md:col-span-3 flex flex-col items-center md:items-start space-y-4">
                        <div className="w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-full border border-gray-100 shadow-sm">
                            <img
                                src={data.founderImage}
                                alt={data.founderName}
                                className="w-full h-full object-cover grayscale"
                            />
                        </div>
                        <div className="text-center md:text-left pl-2">
                            <p
                                style={{ fontFamily: "'Higuen', serif" }}
                                className="text-lg text-[#59493b] font-semibold leading-tight"
                            >
                                {data.founderName}
                            </p>
                            <p
                                style={{ fontFamily: "'Higuen', serif" }}
                                className="text-sm text-[#59493b]/70 italic"
                            >
                                {data.founderRole}
                            </p>
                        </div>
                    </div>
                    <div className="md:col-span-9 space-y-6 pt-2 md:pl-8">
                        <h3
                            style={{
                                fontFamily:
                                    "'Beautifully Delicious', sans-serif",
                            }}
                            className="text-3xl md:text-4xl text-[#59493b] uppercase tracking-wider"
                        >
                            {data.founderAboutTitle}
                        </h3>

                        <div
                            style={{ fontFamily: "'Higuen', serif" }}
                            className="text-[17px] md:text-[19px] leading-[1.7] text-[#59493b] space-y-6 font-light max-w-none"
                        >
                            <p>{data.founderDescription1}</p>
                            <p>{data.founderDescription2}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
