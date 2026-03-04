"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface HighlightedTrip {
    title: string;
    duration: string;
    subtitle: string;
    nights: string;
    imageUrl: string;
    slug: string;
}

const DEFAULT_TRIPS: HighlightedTrip[] = [
    {
        title: "Tashkent & Samarkand",
        duration: "7 DAYS / 6 NIGHTS",
        subtitle: "The Silk Road Gem",
        nights: "From $1,200 per person",
        imageUrl:
            "https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?q=80&w=800&auto=format&fit=crop",
        slug: "tashkent-samarkand",
    },
    {
        title: "Bukhara Heritage",
        duration: "5 DAYS / 4 NIGHTS",
        subtitle: "Ancient City Soul",
        nights: "From $950 per person",
        imageUrl:
            "https://images.unsplash.com/photo-1580191947416-62d35a55e71d?q=80&w=800&auto=format&fit=crop",
        slug: "bukhara-heritage",
    },
];

interface HighlightedTripsProps {
    title?: string;
    subtitle?: string;
    trips?: any[];
}

const HighlightedTrips: React.FC<HighlightedTripsProps> = ({
    title: initialTitle,
    subtitle: initialSubtitle,
    trips: initialTripsProp = [],
}) => {
    const [displayTrips, setDisplayTrips] = useState<any[]>(
        initialTripsProp.length > 0 ? initialTripsProp : DEFAULT_TRIPS,
    );
    const [sectionTitle, setSectionTitle] = useState(
        initialTitle || "Highlighted Trips",
    );
    const [sectionSubtitle, setSectionSubtitle] = useState(
        initialSubtitle || "Top Selling Tours",
    );

    useEffect(() => {
        const loadData = async () => {
            try {
                const homeRes = await fetch("/api/home-settings");
                const homeData = await homeRes.json();

                if (
                    homeData &&
                    homeData.highlightedTrips &&
                    homeData.highlightedTrips.length > 0
                ) {
                    const validatedTrips = homeData.highlightedTrips.map(
                        (t: any) => {
                            // 1. Agar slug bo'lsa, uni tozalaymiz (oxiridagi chiziqchalarni olib tashlaymiz)
                            // 2. Agar slug bo'lmasa, title dan yasaymiz
                            const finalSlug = t.slug
                                ? t.slug.trim().replace(/-+$/, "")
                                : t.title
                                  ? t.title
                                        .toLowerCase()
                                        .trim()
                                        .replace(/[^\w\s-]/g, "")
                                        .replace(/[\s_-]+/g, "-")
                                        .replace(/^-+|-+$/g, "")
                                  : "";

                            return {
                                ...t,
                                slug: finalSlug,
                            };
                        },
                    );

                    setDisplayTrips(validatedTrips);
                    setSectionTitle(
                        homeData.tripsSectionTitle ||
                            initialTitle ||
                            "Highlighted Trips",
                    );
                    setSectionSubtitle(
                        homeData.tripsSectionSubtitle ||
                            initialSubtitle ||
                            "Top Selling Tours",
                    );
                } else {
                    const tripsRes = await fetch("/api/trips");
                    const tripsData = await tripsRes.json();
                    if (tripsData.success) {
                        const formatted = tripsData.data.map((t: any) => ({
                            title: t.title,
                            duration: t.duration || "Custom Days",
                            subtitle: t.fullTitle || t.title,
                            nights: `From $${t.price || "0"} per person`,
                            imageUrl:
                                t.image ||
                                "https://placehold.co/600x600?text=Trip+Image",
                            slug: t.slug
                                ? t.slug.trim().replace(/-+$/, "")
                                : "",
                        }));
                        setDisplayTrips(formatted);
                    }
                }
            } catch (err) {
                console.error("Data fetch error:", err);
            }
        };

        loadData();
    }, [initialTitle, initialSubtitle]);

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: displayTrips.length > 3, align: "start" },
        [Autoplay({ delay: 4000, stopOnInteraction: false })],
    );

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section className="bg-[#efede7] py-12 md:py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl md:text-[100px] text-[#0D2B1D] text-center mb-10 md:mb-16 font-serif leading-[0.9] tracking-tight">
                    {sectionTitle}
                </h2>

                <div className="bg-[#FAF7F2] p-4 md:p-12 rounded-sm relative shadow-sm">
                    <h3 className="text-[#2D2D2D] text-2xl md:text-4xl mb-6 md:mb-10 font-serif font-light">
                        {sectionSubtitle}
                    </h3>

                    <div className="relative group/arrows">
                        <button
                            onClick={scrollPrev}
                            className="absolute -left-3 md:-left-15 top-[40%] -translate-y-1/2 bg-[#B59461] text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center z-20 hover:bg-[#967a4f] transition-all shadow-lg active:scale-90"
                        >
                            <span>❮</span>
                        </button>

                        <button
                            onClick={scrollNext}
                            className="absolute -right-3 md:-right-15 top-[40%] -translate-y-1/2 bg-[#B59461] text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center z-20 hover:bg-[#967a4f] transition-all shadow-lg active:scale-90"
                        >
                            <span>❯</span>
                        </button>

                        <div
                            className="overflow-hidden cursor-grab active:cursor-grabbing px-2"
                            ref={emblaRef}
                        >
                            <div className="flex -ml-4">
                                {displayTrips.map((trip, index) => (
                                    <div
                                        key={index}
                                        className="flex-[0_0_100%] min-w-0 md:flex-[0_0_33.33%] pl-4 group"
                                    >
                                        <Link href={`/trips/${trip.slug}`}>
                                            <div className="relative aspect-10/10 overflow-hidden rounded-3xl mb-6 shadow-md transition-all duration-500 group-hover:shadow-xl">
                                                <img
                                                    src={trip.imageUrl}
                                                    alt={trip.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                                                    <h4 className="text-xl md:text-2xl font-serif leading-tight mb-2 transform transition-transform duration-500 group-hover:-translate-y-1">
                                                        {trip.title}
                                                    </h4>
                                                    <p className="text-xs md:text-sm font-sans tracking-[0.2em] opacity-80 uppercase font-bold">
                                                        {trip.duration}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>

                                        <div className="text-center hidden md:block">
                                            <Link href={`/trips/${trip.slug}`}>
                                                <h5 className="text-[#0D2B1D] text-2xl lg:text-3xl font-serif mb-1 hover:text-[#B59461] transition-colors">
                                                    {trip.subtitle}
                                                </h5>
                                            </Link>
                                            <p className="text-[#6F4E37] italic text-lg font-serif opacity-80">
                                                {trip.nights}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 space-y-12 md:hidden">
                    <div className="h-px bg-[#0D2B1D]/10 w-full mb-8" />
                    {displayTrips.map((trip, index) => (
                        <Link
                            href={`/trips/${trip.slug}`}
                            key={`mobile-${index}`}
                            className="block text-center"
                        >
                            <h4 className="text-2xl text-[#0D2B1D] font-serif mb-2 uppercase tracking-tight">
                                {trip.subtitle}
                            </h4>
                            <p className="text-[#6F4E37] italic text-lg font-serif">
                                {trip.nights}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HighlightedTrips;
