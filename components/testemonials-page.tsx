"use client";

import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
    name: string;
    location?: string;
    image: string;
    comment: string;
}

interface ClientTestimonialsProps {
    title?: string;
    data?: Testimonial[];
}

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
            <div className="aspect-square w-full overflow-hidden rounded-2xl shadow-sm">
                <img
                    src={testimonial.image || "/placeholder-user.jpg"}
                    alt={`Portrait of ${testimonial.name}`}
                    className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                />
            </div>
            <div className="flex flex-1 flex-col justify-between pt-6">
                <p className="mb-6 font-serif text-base italic leading-relaxed text-[#1a1a1a]/80">
                    {`"${testimonial.comment}"`}
                </p>
                <div>
                    <p className="font-serif text-2xl text-[#1a1a1a] md:text-3xl">
                        {`\u2014 ${testimonial.name}`}
                    </p>
                    {testimonial.location && (
                        <p className="text-sm font-sans uppercase tracking-widest text-gray-400 mt-1">
                            {testimonial.location}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function ClientTestimonials({
    title,
    data = [],
}: ClientTestimonialsProps) {
    if (!data || data.length === 0) return null;

    return (
        <section className="bg-[#F5F2ED] px-6 py-20 md:px-16 lg:px-24">
            <div className="mx-auto max-w-6xl">
                <h2 className="mb-2 text-center font-serif text-4xl text-[#1a1a1a] md:text-5xl">
                    {title || "Client Testimonials"}
                </h2>
                <div className="mx-auto mb-14 mt-4 h-px w-full max-w-4xl bg-[#1a1a1a]/15" />
                <motion.div
                    className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {data.map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            testimonial={testimonial}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
