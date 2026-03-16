"use client";

import React, { useCallback, useState } from "react";
import { ChevronsRight, ChevronLeft } from "lucide-react";
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
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-neutral-200 shadow-lg">
                <img
                    src={src}
                    alt={title}
                    className="h-full w-full object-cover transition-all duration-700 ease-in-out"
                    style={{
                        filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                    }}
                />
            </div>

            <div className="flex flex-col gap-1">
                {/* Label uchun Beautifully Delicious */}
                <span
                    className="text-[14px] md:text-[16px] tracking-[0.1em] text-[#D4A843] uppercase"
                    style={{
                        fontFamily: "'Beautifully Delicious', sans-serif",
                    }}
                >
                    {label || "Moments"}
                </span>
                {/* Title uchun Higuen */}
                <span
                    className="text-xl font-light text-neutral-900 italic"
                    style={{ fontFamily: "'Higuen', serif" }}
                >
                    {title || "Untitled Moment"}
                </span>
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
        <section className="relative flex min-h-[80vh] items-center bg-[#F5F2ED] px-4 py-24 md:px-12 lg:px-20 overflow-hidden">
            <button
                onClick={scrollPrev}
                className="absolute left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-[#004D3C] transition-all hover:bg-[#004D3C] hover:text-white shadow-xl active:scale-90"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>

            <motion.div
                className="mx-auto w-full max-w-7xl overflow-hidden cursor-grab active:cursor-grabbing"
                ref={emblaRef}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                    visible: { transition: { staggerChildren: 0.2 } },
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

            <button
                onClick={scrollNext}
                className="absolute right-4 z-30 transition-all hover:scale-110 active:scale-90"
            >
                <ChevronsRight className="h-12 w-12 md:h-20 md:w-20 text-[#004D3C] opacity-70" />
            </button>
        </section>
    );
}
