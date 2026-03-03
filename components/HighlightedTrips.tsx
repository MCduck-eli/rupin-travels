"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Trip {
    _id: string;
    title: string;
    duration: string;
    subtitle: string;
    nights: string;
    images: string[];
}

const HighlightedTrips: React.FC = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const res = await fetch("/api/trips");
                const data = await res.json();

                // API-dan kelayotgan ma'lumotni massiv ekanligini tekshirish
                const fetchedTrips = Array.isArray(data)
                    ? data
                    : data?.trips || [];
                setTrips(fetchedTrips);
            } catch (err) {
                console.error("Trips fetch error:", err);
                setTrips([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: trips.length > 3, align: "start" },
        [Autoplay({ delay: 4000, stopOnInteraction: false })],
    );

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    // 1. Yuklanish jarayoni (Oq ekran bo'lmasligi uchun)
    if (loading) {
        return (
            <div className="bg-[#efede7] py-20 text-center font-serif text-xl">
                Loading journeys...
            </div>
        );
    }

    // 2. Agar bazada birorta ham Trip yo'q bo'lsa
    if (trips.length === 0) {
        return (
            <div className="bg-[#efede7] py-20 text-center font-serif text-xl text-gray-600">
                No trips available. Please add trips in the admin panel.
            </div>
        );
    }

    return (
        <section className="bg-[#efede7] py-12 md:py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl md:text-[100px] text-[#0D2B1D] text-center mb-10 md:mb-16 font-serif leading-[0.9] tracking-tight">
                    Highlighted Trips
                </h2>

                <div className="bg-[#FAF7F2] p-4 md:p-12 rounded-sm relative shadow-sm">
                    <h3 className="text-[#2D2D2D] text-2xl md:text-4xl mb-6 md:mb-10 font-serif font-light">
                        Top Selling Tours
                    </h3>

                    <div className="relative group/arrows">
                        {/* Navigatsiya tugmalari */}
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
                                {trips.map((trip) => (
                                    <div
                                        key={trip._id}
                                        className="flex-[0_0_100%] min-w-0 md:flex-[0_0_33.33%] pl-4 group"
                                    >
                                        <div className="relative aspect-10/13 overflow-hidden rounded-3xl mb-6 shadow-md transition-all duration-500 group-hover:shadow-xl">
                                            <img
                                                src={
                                                    trip.images?.[0] ||
                                                    "/placeholder-trip.jpg"
                                                }
                                                alt={trip.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />

                                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
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

                <div className="mt-16 space-y-12 md:hidden">
                    <div className="h-px bg-[#0D2B1D]/10 w-full mb-8" />
                    {trips.map((trip) => (
                        <div key={`mobile-${trip._id}`} className="text-center">
                            <h4 className="text-3xl text-[#0D2B1D] font-serif mb-2 uppercase tracking-tight">
                                {trip.subtitle}
                            </h4>
                            <p className="text-[#6F4E37] italic text-xl font-serif">
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
