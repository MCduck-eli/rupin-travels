"use client";

import { useState } from "react";
import { ChevronRight, ChevronsRight } from "lucide-react";
import { motion } from "framer-motion";

interface GalleryItem {
    id: number;
    src: string;
    alt: string;
    label: string;
    title: string;
}

const galleryItems: GalleryItem[] = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        alt: "Modern glass house at night",
        label: "PHOTOS OF THE TRIP",
        title: "XYZ trek",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
        alt: "White minimalist building",
        label: "PHOTOS OF ACTIVITIES",
        title: "XYZ trek",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        alt: "Classic villa entrance",
        label: "PHOTOS OF ACTIVITIES",
        title: "XYZ trek",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        x: -100,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            // @ts-ignore
            variants={itemVariants}
            className={`flex flex-col gap-4 relative ${index === 0 ? "mb-12 md:mb-0" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {index === 0 && (
                <button
                    className="absolute -left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#E9D172] text-white md:hidden"
                    aria-label="Previous"
                >
                    <ChevronRight className="h-6 w-6 rotate-180" />
                </button>
            )}

            <div className="relative aspect-3/4 w-full overflow-hidden">
                <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-all duration-700 ease-in-out"
                    style={{
                        filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                    }}
                />
            </div>

            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-medium tracking-[0.3em] text-neutral-500 uppercase">
                        {item.label}
                    </span>
                    <span className="text-xl font-light text-neutral-900">
                        {item.title}
                    </span>
                </div>
                {index === 1 && (
                    <div className="md:hidden">
                        <ChevronsRight
                            className="h-10 w-10 text-neutral-800 opacity-80"
                            strokeWidth={1}
                        />
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default function GallerySection() {
    return (
        <section className="relative flex min-h-screen items-center overflow-hidden bg-[#F5F2ED] px-6 py-20 md:px-12 lg:px-20">
            <button
                className="absolute left-4 z-20 hidden h-12 w-12 items-center justify-center rounded-full bg-[#E9D172] text-white transition-transform hover:scale-110 md:flex md:left-8"
                aria-label="Previous"
            >
                <ChevronRight className="h-6 w-6 rotate-180" />
            </button>

            <motion.div
                className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:gap-16"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {galleryItems.map((item, index) => (
                    <GalleryCard key={item.id} item={item} index={index} />
                ))}
            </motion.div>

            <div className="absolute right-4 z-20 hidden md:block md:right-8">
                <ChevronsRight
                    className="h-16 w-16 text-neutral-800 opacity-80"
                    strokeWidth={1}
                />
            </div>
        </section>
    );
}
