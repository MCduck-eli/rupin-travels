"use client";

import React from "react";
import { motion } from "framer-motion";

const features = [
    {
        title: "Support Local Practitioners and Preserving Cultural Traditions",
        description:
            "We honor India's heritage by offering authentic yoga, meditation, Ayurveda, and cultural experiences while supporting the teachers and communities who keep these traditions alive.",
    },
    {
        title: "Every journey supports a local women's initiative",
        description:
            "We prioritize partnering with women-led businesses, artisans, and wellness practitioners to help create economic opportunities and empower women in the communities we visit",
    },
];

export default function CulturalSupportSection() {
    return (
        <section className="bg-white px-6 py-16 md:px-16 lg:px-24">
            <div className="mx-auto max-w-6xl w-full">
                <div className="space-y-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="flex flex-col space-y-4"
                        >
                            <div className="flex items-start gap-4">
                                <span className="mt-[14px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#59493b]" />
                                <h3
                                    style={{
                                        fontFamily:
                                            "'Beautifully Delicious', sans-serif",
                                    }}
                                    className="text-2xl md:text-3xl lg:text-[32px] text-[#59493b] leading-tight uppercase tracking-wide"
                                >
                                    {feature.title}
                                </h3>
                            </div>
                            <div className="md:pl-8">
                                <p
                                    style={{ fontFamily: "'Higuen', serif" }}
                                    className="text-[17px] md:text-[19px] leading-[1.7] text-[#59493b] font-light"
                                >
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
