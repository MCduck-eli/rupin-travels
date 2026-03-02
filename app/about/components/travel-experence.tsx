"use client";

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
    const lines = ["Welcome to your", "luxurious home", "away from home"];

    return (
        <section className="bg-[#F5F2ED] min-h-screen px-6 py-12 md:px-16 md:py-16 lg:px-24">
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
                    <div className="flex flex-col gap-6">
                        <h1 className="font-serif text-4xl leading-[1.15] text-[#4A2C1A] md:text-5xl lg:text-[3rem]">
                            {lines.map((line, i) => (
                                <span key={i} className="block overflow-hidden">
                                    <motion.span
                                        className="block"
                                        custom={i}
                                        initial="hidden"
                                        animate="visible"
                                        // @ts-ignore
                                        variants={maskReveal}
                                    >
                                        {line}
                                    </motion.span>
                                </span>
                            ))}
                        </h1>
                        <motion.p
                            initial="hidden"
                            animate="visible"
                            // @ts-ignore
                            variants={fadeUp}
                            className="max-w-md text-sm leading-relaxed text-[#2D2D2D]/60 md:text-base"
                        >
                            Write a paragraph that talks about your brand or
                            property here. Convince your prospective clients to
                            choose you and your offerings by highlighting the
                            qualities that set you apart from the competition.
                            Your audience is already on your website, so push a
                            little bit harder to seal the deal!
                        </motion.p>
                    </div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        // @ts-ignore
                        variants={fadeScale}
                        className="overflow-hidden flex justify-center"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
                            alt="Luxury pool"
                            className="w-full max-w-100 max-h-112.5 object-cover rounded-sm shadow-md"
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
                                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80"
                                alt="Palm trees"
                                className="w-full h-auto max-h-[400px] object-cover"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
