"use client";

import React, { useCallback, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ITrip } from "@/types/trip";

interface GallerySectionProps {
    data: ITrip["gallery"];
}

const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

function GalleryCard({
    src,
    title,
    label,
}: {
    src: string;
    title: string;
    label: string;
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            variants={itemVariants as any}
            className="flex flex-col gap-4 px-4 flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative aspect-4/4 w-full overflow-hidden rounded-2xl bg-neutral-200 shadow-md transition-all duration-500 hover:shadow-xl">
                <img
                    src={src}
                    alt={title}
                    className="h-full w-full object-cover transition-all duration-700 ease-in-out"
                    style={{
                        filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
                        transform: isHovered ? "scale(1.1)" : "scale(1)",
                    }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                    <h4
                        className="text-lg md:text-xl leading-tight mb-1"
                        style={{
                            fontFamily: "'Beautifully Delicious', sans-serif",
                        }}
                    >
                        {title || "Untitled Moment"}
                    </h4>
                    <p
                        className="text-[10px] md:text-xs tracking-[0.2em] opacity-80 uppercase font-bold"
                        style={{
                            fontFamily: "'Higuen', serif",
                        }}
                    >
                        {label || "Moments"}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default function GallerySection({ data }: GallerySectionProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: (data?.length || 0) > 3,
        align: "start",
    });

    const scrollPrev = useCallback(
        () => emblaApi && emblaApi.scrollPrev(),
        [emblaApi],
    );
    const scrollNext = useCallback(
        () => emblaApi && emblaApi.scrollNext(),
        [emblaApi],
    );

    if (!data || data.length === 0) return null;

    return (
        <section className="bg-[#efede7] py-6 md:py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="bg-[#FAF7F2] p-4 rounded-sm relative shadow-sm">
                    <div className="relative group/arrows">
                        <button
                            onClick={scrollPrev}
                            className="absolute -left-3 md:-left-15 top-[50%] -translate-y-1/2 bg-[#B59461] text-white w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center z-20 hover:bg-[#967a4f] transition-all shadow-lg active:scale-90"
                        >
                            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                        </button>

                        <button
                            onClick={scrollNext}
                            className="absolute -right-3 md:-right-15 top-[50%] -translate-y-1/2 bg-[#B59461] text-white w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center z-20 hover:bg-[#967a4f] transition-all shadow-lg active:scale-90"
                        >
                            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                        </button>

                        <motion.div
                            className="overflow-hidden cursor-grab active:cursor-grabbing px-2"
                            ref={emblaRef}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={{
                                visible: {
                                    transition: { staggerChildren: 0.2 },
                                },
                            }}
                        >
                            <div className="flex -ml-4">
                                {data.map((image, index) => (
                                    <GalleryCard
                                        key={index}
                                        src={image.url}
                                        title={image.title}
                                        label={image.label}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
