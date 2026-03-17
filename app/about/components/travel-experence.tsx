"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MissionVisionSection() {
    return (
        <section className="bg-white px-6 py-20 md:px-16 lg:px-24">
            <div className="mx-auto max-w-6xl w-full">
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0">
                    {/* Markaziy chiziq qalinligi va rangi o'zgartirildi */}
                    <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-[#59493b]" />

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:pr-16 space-y-8 flex flex-col items-center md:items-start text-center md:text-left"
                    >
                        <h2
                            style={{
                                fontFamily:
                                    "'Beautifully Delicious', sans-serif",
                            }}
                            className="text-4xl md:text-5xl text-[#59493b] uppercase tracking-wider"
                        >
                            Our Mission
                        </h2>

                        <div
                            style={{ fontFamily: "'Higuen', serif" }}
                            className="text-[17px] md:text-[19px] leading-[1.7] text-[#59493b] space-y-6 font-light"
                        >
                            <p>
                                To create journeys that heal, inspire, and
                                transform — while building authentic bridges
                                between cultures.
                            </p>
                            <p>
                                Our journeys are a gateway to self-discovery,
                                cultural connection, and inner transformation.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:pl-16 space-y-8 flex flex-col items-center md:items-start text-center md:text-left pt-12 md:pt-0 border-t border-black/10 md:border-none"
                    >
                        <h2
                            style={{
                                fontFamily:
                                    "'Beautifully Delicious', sans-serif",
                            }}
                            className="text-4xl md:text-5xl text-[#59493b] uppercase tracking-wider"
                        >
                            Our Vision
                        </h2>

                        <div
                            style={{ fontFamily: "'Higuen', serif" }}
                            className="text-[17px] md:text-[19px] leading-[1.7] text-[#59493b] space-y-6 font-light"
                        >
                            <p>
                                Our vision is to become a leading provider of
                                transformative wellness journeys in India,
                                helping travelers discover deeper connection.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
