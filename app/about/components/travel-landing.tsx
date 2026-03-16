"use client";

import React from "react";
import { motion } from "framer-motion";

interface TeamMember {
    name: string;
    role: string;
    image: string;
}

const teamMembers: TeamMember[] = [
    {
        name: "Sashi Nk",
        role: "Founder and CEO",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    },
    {
        name: "Sabitha Kadi",
        role: "Program Officer",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    },
    {
        name: "Larissa Charter",
        role: "Head of Marketing",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    },
];

const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
};

export default function MarineTeamSection() {
    return (
        <section className="bg-white px-6 py-16 md:px-16 lg:px-24 flex items-center">
            <div className="mx-auto max-w-6xl w-full">
                {/* 1. Sarlavha - Beautifully Delicious */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{
                        fontFamily: "'Beautifully Delicious', sans-serif",
                    }}
                    className="mb-12 text-center text-5xl md:text-6xl text-[#5BA4D9] leading-tight"
                >
                    Who Are We?
                </motion.h2>

                <div className="space-y-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                        <div className="md:col-span-5 flex justify-center md:justify-end">
                            <TeamMemberCard member={teamMembers[0]} />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            className="md:col-span-7"
                        >
                            <p
                                className="text-[18px] md:text-[22px] font-light leading-relaxed text-[#2D2D2D]/80 max-w-lg"
                                style={{ fontFamily: "'Higuen', serif" }}
                            >
                                Transformative journeys to India for wellness,
                                culture, and self-discovery.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-10"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <TeamMemberCard member={teamMembers[1]} center />
                        <TeamMemberCard member={teamMembers[2]} center />
                    </motion.div>
                </div>

                <div className="relative mt-20 pt-16 border-t border-black/10">
                    {/* Markaziy qora chiziq faqat desktopda */}
                    <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 h-full w-[1px] bg-black/10" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                        {/* Our Mission */}
                        <motion.div
                            // @ts-ignore
                            variants={slideUp}
                            initial="hidden"
                            whileInView="visible"
                            className="space-y-6 text-center md:text-right"
                        >
                            <h3
                                className="text-[38px] md:text-[45px] font-normal text-[#B5A18B]"
                                style={{
                                    fontFamily:
                                        "'Beautifully Delicious', sans-serif",
                                }}
                            >
                                Our Mission
                            </h3>
                            <div
                                className="space-y-4 text-[18px] md:text-[20px] font-light leading-relaxed text-[#2D2D2D]/90"
                                style={{ fontFamily: "'Higuen', serif" }}
                            >
                                <p>
                                    To create journeys that heal, inspire, and
                                    transform — while building authentic bridges
                                    between cultures.
                                </p>
                            </div>
                        </motion.div>

                        {/* Why Rupin Travels */}
                        <motion.div
                            // @ts-ignore
                            variants={slideUp}
                            initial="hidden"
                            whileInView="visible"
                            className="space-y-6 text-center md:text-left"
                        >
                            <h3
                                className="text-[38px] md:text-[45px] font-normal text-[#B5A18B]"
                                style={{
                                    fontFamily:
                                        "'Beautifully Delicious', sans-serif",
                                }}
                            >
                                Why Rupin Travels?
                            </h3>
                            <p
                                className="text-[18px] md:text-[20px] font-light leading-relaxed text-[#2D2D2D]/90 max-w-sm mx-auto md:mx-0"
                                style={{ fontFamily: "'Higuen', serif" }}
                            >
                                Our journeys are a gateway to self-discovery,
                                cultural connection, and inner transformation.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

interface CardProps {
    member: TeamMember;
    center?: boolean;
}

function TeamMemberCard({ member, center }: CardProps) {
    return (
        <motion.div
            // @ts-ignore
            variants={slideUp}
            className={`flex items-center gap-6 min-w-[280px] ${center ? "justify-center" : ""}`}
        >
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full shadow-md border border-gray-100">
                <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
            </div>
            <div className="flex flex-col">
                <span
                    className="text-2xl md:text-3xl text-[#1A1A1A] leading-tight"
                    style={{
                        fontFamily: "'Beautifully Delicious', sans-serif",
                    }}
                >
                    {member.name}
                </span>
                <span
                    className="text-sm md:text-base text-[#1A1A1A]/70"
                    style={{ fontFamily: "'Higuen', serif" }}
                >
                    {member.role}
                </span>
            </div>
        </motion.div>
    );
}
