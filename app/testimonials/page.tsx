"use client";

import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
    id: number;
    name: string;
    image: string;
    quote: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Kian Graham",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
        quote: "Boost your product and service's credibility by adding testimonials from your clients. People love recommendations so feedback from others who've tried it is invaluable.",
    },
    {
        id: 2,
        name: "Celine Guajardo",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
        quote: "Boost your product and service's credibility by adding testimonials from your clients. People love recommendations so feedback from others who've tried it is invaluable.",
    },
    {
        id: 3,
        name: "Maya Patel",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80",
        quote: "Boost your product and service's credibility by adding testimonials from your clients. People love recommendations so feedback from others who've tried it is invaluable.",
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
            <div className="aspect-square w-full overflow-hidden">
                <img
                    src={testimonial.image}
                    alt={`Portrait of ${testimonial.name}`}
                    className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                />
            </div>
            <div className="flex flex-1 flex-col justify-between pt-6">
                <p className="mb-6 font-serif text-base italic leading-relaxed text-[#1a1a1a]/80">
                    {`"${testimonial.quote}"`}
                </p>
                <p className="font-serif text-2xl text-[#1a1a1a] md:text-3xl">
                    {`\u2014 ${testimonial.name}`}
                </p>
            </div>
        </motion.div>
    );
}

export default function ClientTestimonials() {
    return (
        <section className="bg-[#F5F2ED] px-6 py-20 md:px-16 lg:px-24">
            <div className="mx-auto max-w-6xl">
                <h2 className="mb-2 text-center font-serif text-4xl text-[#1a1a1a] md:text-5xl">
                    Client Testimonials
                </h2>
                <div className="mx-auto mb-14 mt-4 h-px w-full max-w-4xl bg-[#1a1a1a]/15" />
                <motion.div
                    className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {testimonials.map((testimonial) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
