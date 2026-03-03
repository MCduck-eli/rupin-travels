"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface HighlightedTrip {
    title: string;
    duration: string;
    subtitle: string;
    nights: string;
    imageUrl: string;
}

const DEFAULT_TRIPS: HighlightedTrip[] = [
    {
        title: "Tashkent & Samarkand",
        duration: "7 DAYS / 6 NIGHTS",
        subtitle: "The Silk Road Gem",
        nights: "From $1,200 per person",
        imageUrl:
            "https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?q=80&w=800&auto=format&fit=crop",
    },
    {
        title: "Bukhara Heritage",
        duration: "5 DAYS / 4 NIGHTS",
        subtitle: "Ancient City Soul",
        nights: "From $950 per person",
        imageUrl:
            "https://images.unsplash.com/photo-1580191947416-62d35a55e71d?q=80&w=800&auto=format&fit=crop",
    },
    {
        title: "Khiva Desert Oasis",
        duration: "4 DAYS / 3 NIGHTS",
        subtitle: "Open Air Museum",
        nights: "From $800 per person",
        imageUrl:
            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop",
    },
    {
        title: "Fergana Valley",
        duration: "3 DAYS / 2 NIGHTS",
        subtitle: "Crafts & Silk Center",
        nights: "From $650 per person",
        imageUrl:
            "https://images.unsplash.com/photo-1628243426700-66772422031e?q=80&w=800&auto=format&fit=crop",
    },
    {
        title: "Boysun Adventure",
        duration: "4 DAYS / 3 NIGHTS",
        subtitle: "Untouched Traditions",
        nights: "From $850 per person",
        imageUrl:
            "https://images.unsplash.com/photo-1527506338382-789073103290?q=80&w=800&auto=format&fit=crop",
    },
];

interface HighlightedTripsProps {
    title?: string;
    subtitle?: string;
    trips?: HighlightedTrip[];
}

const HighlightedTrips: React.FC<HighlightedTripsProps> = ({
    title,
    subtitle,
    trips = [],
}) => {
    // Agar trips massivi kelsa uni ishlatamiz, kelsa-yu bo'sh bo'lsa DEFAULT_TRIPS ni ishlatamiz
    const displayTrips = trips && trips.length > 0 ? trips : DEFAULT_TRIPS;

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
                {/* Agar title bo'lmasa default chiqadi */}
                <h2 className="text-5xl md:text-[100px] text-[#0D2B1D] text-center mb-10 md:mb-16 font-serif leading-[0.9] tracking-tight">
                    {title || "Highlighted Trips"}
                </h2>

                <div className="bg-[#FAF7F2] p-4 md:p-12 rounded-sm relative shadow-sm">
                    {/* Agar subtitle bo'lmasa default chiqadi */}
                    <h3 className="text-[#2D2D2D] text-2xl md:text-4xl mb-6 md:mb-10 font-serif font-light">
                        {subtitle || "Top Selling Tours"}
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
                                        <div className="relative aspect-10/10 overflow-hidden rounded-3xl mb-6 shadow-md transition-all duration-500 group-hover:shadow-xl">
                                            <img
                                                src={
                                                    trip.imageUrl ||
                                                    "https://placehold.co/600x600?text=Trip+Image"
                                                }
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

                                        <div className="text-center hidden md:block">
                                            <h5 className="text-[#0D2B1D] text-2xl lg:text-3xl font-serif mb-1">
                                                {trip.subtitle}
                                            </h5>
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

                {/* Mobile ko'rinishi uchun ham displayTrips ishlatildi */}
                <div className="mt-16 space-y-12 md:hidden">
                    <div className="h-px bg-[#0D2B1D]/10 w-full mb-8" />
                    {displayTrips.map((trip, index) => (
                        <div key={`mobile-${index}`} className="text-center">
                            <h4 className="text-2xl text-[#0D2B1D] font-serif mb-2 uppercase tracking-tight">
                                {trip.subtitle}
                            </h4>
                            <p className="text-[#6F4E37] italic text-lg font-serif">
                                {trip.nights}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HighlightedTrips;
