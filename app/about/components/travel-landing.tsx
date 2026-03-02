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
        name: "Yanis Petros",
        role: "Founder and CEO",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    },
    {
        name: "Helen Paquet",
        role: "Chief Financial Officer",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    },
    {
        name: "Larissa Charter",
        role: "Head of Marketing",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    },
    {
        name: "Thomas Larson",
        role: "Environmental Scientist",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    },
    {
        name: "Troy Stockert",
        role: "Program Officer",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    },
];

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
};

const slideIn = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
};

export default function MarineTeamSection() {
    return (
        <section className="bg-white px-6 py-12 md:px-16 lg:px-24 flex items-center">
            <div className="mx-auto max-w-5xl w-full">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-10 font-serif text-4xl font-bold uppercase tracking-wide text-[#5BA4D9] md:text-5xl lg:text-6xl leading-tight"
                >
                    Passionate About
                    <br />
                    Marine Environments
                </motion.h2>

                <div className="flex flex-col items-center gap-8">
                    <motion.div
                        className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {teamMembers.slice(0, 3).map((member) => (
                            <TeamMemberCard key={member.name} member={member} />
                        ))}
                    </motion.div>

                    <motion.div
                        className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {teamMembers.slice(3).map((member) => (
                            <TeamMemberCard key={member.name} member={member} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
    return (
        <motion.div
            // @ts-ignore
            variants={slideIn}
            className="flex items-center gap-5 min-w-62.5"
        >
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full md:h-24 md:w-24 shadow-sm border border-gray-100">
                <img
                    src={member.image}
                    alt={`Portrait of ${member.name}`}
                    className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
            </div>
            <div className="flex flex-col">
                <span className="text-base font-bold text-[#2D2D2D] md:text-lg">
                    {member.name}
                </span>
                <span className="text-sm text-[#2D2D2D]/60 md:text-base font-medium">
                    {member.role}
                </span>
            </div>
        </motion.div>
    );
}
