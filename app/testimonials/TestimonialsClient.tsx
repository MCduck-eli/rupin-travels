"use client";

import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
    name: string;
    image: string;
    comment: string;
    location?: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
    {
        name: "Kian Graham",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
        comment:
            "Boost your product and service's credibility by adding testimonials from your clients. People love recommendations so feedback from others who've tried it is invaluable.",
    },
    {
        name: "Celine Guajardo",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
        comment:
            "Boost your product and service's credibility by adding testimonials from your clients. People love recommendations so feedback from others who've tried it is invaluable.",
    },
    {
        name: "Maya Patel",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80",
        comment:
            "Boost your product and service's credibility by adding testimonials from your clients. People love recommendations so feedback from others who've tried it is invaluable.",
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
};

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <motion.div
            // @ts-ignore
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col"
        >
            <div className="aspect-square w-full overflow-hidden rounded-2xl bg-white shadow-sm">
                <img
                    src={testimonial.image || "/placeholder-user.jpg"}
                    alt={testimonial.name}
                    className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                />
            </div>
            <div className="flex flex-1 flex-col justify-between pt-6">
                {/* Comment uchun Higuen */}
                <p
                    className="mb-6 text-[18px] md:text-[20px] italic leading-relaxed text-[#1a1a1a]/80"
                    style={{ fontFamily: "'Higuen', serif" }}
                >
                    {`"${testimonial.comment}"`}
                </p>
                <div>
                    {/* Name uchun Higuen */}
                    <p
                        className="text-2xl text-[#1a1a1a] md:text-3xl"
                        style={{ fontFamily: "'Higuen', serif" }}
                    >
                        {`\u2014 ${testimonial.name}`}
                    </p>
                    {testimonial.location && (
                        <p
                            className="text-xs uppercase tracking-[0.2em] text-[#D4A843] mt-2"
                            style={{
                                fontFamily:
                                    "'Beautifully Delicious', sans-serif",
                            }}
                        >
                            {testimonial.location}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function TestimonialsClient({
    title,
    testimonials,
}: {
    title?: string;
    testimonials?: Testimonial[];
}) {
    const displayData =
        testimonials && testimonials.length > 0
            ? testimonials
            : DEFAULT_TESTIMONIALS;
    const displayTitle = title || "Client Testimonials";

    return (
        <section className="bg-[#F5F2ED] px-6 py-20 md:px-16 lg:px-24">
            <div className="mx-auto max-w-6xl">
                {/* Sarlavha uchun Beautifully Delicious */}
                <h2
                    className="mb-2 text-center text-4xl md:text-6xl text-[#1a1a1a]"
                    style={{
                        fontFamily: "'Beautifully Delicious', sans-serif",
                    }}
                >
                    {displayTitle}
                </h2>
                <div className="mx-auto mb-14 mt-4 h-px w-full max-w-4xl bg-[#1a1a1a]/15" />
                <motion.div
                    className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {displayData.map((t, i) => (
                        <TestimonialCard key={i} testimonial={t} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
