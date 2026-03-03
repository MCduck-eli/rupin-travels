"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const maskReveal = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.4,
            delay: i * 0.18,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.2, delay: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
};

const fadeScale = {
    hidden: { opacity: 0, scale: 1.03 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function TravelLandingPage() {
    // Dinamik state
    const [data, setData] = useState({
        title: "Welcome to your luxurious home away from home",
        description:
            "Write a paragraph that talks about your brand or property here...",
        topImage:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
        bottomImage:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    });

    useEffect(() => {
        // API'dan ma'lumotni olish
        fetch("/api/about-settings")
            .then((res) => res.json())
            .then((resData) => {
                if (resData && !resData.error) {
                    setData({
                        title: resData.title || data.title,
                        description: resData.description || data.description,
                        topImage: resData.topImage || data.topImage,
                        bottomImage: resData.bottomImage || data.bottomImage,
                    });
                }
            })
            .catch((err) => console.error("Error loading about data:", err));
    }, []);

    // Sarlavhani qatorlarga bo'lish (animatsiya uchun)
    const titleLines = data.title.split(/(?<=[.?!])\s+|(?<=\w)\s+(?=\w{10,})/);
    // Yoki oddiyroq: title'ni qismlarga bo'lish
    const lines =
        data.title.length > 30
            ? [data.title.substring(0, 20), data.title.substring(20)]
            : [data.title];

    return (
        <section className="bg-[#F5F2ED] min-h-screen px-6 py-12 md:px-16 md:py-16 lg:px-24">
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
                    <div className="flex flex-col gap-6">
                        <h1 className="font-serif text-4xl leading-[1.15] text-[#4A2C1A] md:text-5xl lg:text-[3rem]">
                            {/* Dinamik Title */}
                            <span className="block overflow-hidden">
                                <motion.span
                                    className="block"
                                    initial="hidden"
                                    animate="visible"
                                    // @ts-ignore
                                    variants={maskReveal}
                                    custom={0}
                                >
                                    {data.title}
                                </motion.span>
                            </span>
                        </h1>
                        <motion.p
                            initial="hidden"
                            animate="visible"
                            // @ts-ignore
                            variants={fadeUp}
                            className="max-w-md text-sm leading-relaxed text-[#2D2D2D]/60 md:text-base whitespace-pre-line"
                        >
                            {/* Dinamik Description */}
                            {data.description}
                        </motion.p>
                    </div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        // @ts-ignore
                        variants={fadeScale}
                        className="overflow-hidden flex justify-center"
                    >
                        {/* Dinamik Top Image */}
                        <img
                            src={data.topImage}
                            alt="Luxury about"
                            className="w-full max-w-100 h-[300px] md:h-[450px] object-cover rounded-sm shadow-md"
                        />
                    </motion.div>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    // @ts-ignore
                    variants={fadeScale}
                    className="mx-auto max-w-4xl"
                >
                    <div className="border border-[#4A2C1A]/20 p-2">
                        <div className="border border-[#4A2C1A]/10 p-1 overflow-hidden">
                            <img
                                src={data.bottomImage}
                                alt="Scenic view"
                                className="w-full h-auto max-h-125 object-cover"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
