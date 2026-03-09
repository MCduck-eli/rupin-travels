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

export default function TravelLandingPage() {
    const [data, setData] = useState({
        title: "Welcome to your luxurious home away from home",
        description:
            "Write a paragraph that talks about your brand or property here. Convince your prospective clients to choose you and your offerings by highlighting the qualities that set you apart from the competition. Your audience is already on your website, so push a little bit harder to seal the deal!",
        topImage:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    });

    useEffect(() => {
        fetch("/api/about-settings")
            .then((res) => res.json())
            .then((resData) => {
                if (resData && !resData.error) {
                    setData((prev) => ({
                        ...prev,
                        title: resData.title || prev.title,
                        description: resData.description || prev.description,
                        topImage: resData.topImage || prev.topImage,
                    }));
                }
            })
            .catch((err) => console.error("Error loading about data:", err));
    }, []);

    return (
        <section className="bg-white min-h-screen px-6 py-12 md:px-16 lg:px-24 flex flex-col items-center justify-center">
            <div className="mx-auto max-w-7xl w-full space-y-24">
                {/* 1. Yuqori qism: Cultural Information (Rasmdagi tepa qism) */}
                <div className="max-w-6xl space-y-10">
                    <div className="space-y-3">
                        <h3 className="text-[20px] md:text-[22px] font-bold text-black tracking-tight">
                            Preserving Cultural Traditions
                        </h3>
                        <p className="text-[17px] md:text-[19px] font-light leading-relaxed text-black/90">
                            We honor India’s heritage by offering authentic
                            yoga, meditation, Ayurveda, and cultural experiences
                            while supporting the teachers and communities who
                            keep these traditions alive.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-[20px] md:text-[22px] font-bold text-black tracking-tight">
                            Cultural Exchange
                        </h3>
                        <p className="text-[17px] md:text-[19px] font-light leading-relaxed text-black/90">
                            We aim to build meaningful connections between
                            travelers and local communities, fostering mutual
                            respect and deeper cultural understanding.
                        </p>
                    </div>
                </div>

                {/* 2. Pastki qism: Welcome Section (Rasm va Yonidagi matn) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center pt-10">
                    {/* Matn chap tomonda */}
                    <div className="md:col-span-7 flex flex-col gap-6 order-2 md:order-1">
                        <motion.h1
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            // @ts-ignore
                            variants={maskReveal}
                            custom={0}
                            className="font-serif text-[32px] md:text-[42px] leading-[1.2] text-[#8C7355] italic"
                        >
                            {data.title}
                        </motion.h1>

                        <motion.p
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            // @ts-ignore
                            variants={fadeUp}
                            className="text-[13px] leading-relaxed text-black/80 max-w-lg"
                        >
                            {data.description}
                        </motion.p>
                    </div>

                    {/* Rasm o'ng tomonda (Kichikroq va vertikal) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="md:col-span-5 flex justify-center md:justify-end order-1 md:order-2"
                    >
                        <div className="relative w-[300px] h-[400px] md:w-[350px] md:h-[480px] overflow-hidden shadow-sm">
                            <img
                                src={data.topImage}
                                alt="Luxury Home"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
