"use client";

import React from "react";

const TRIPS = [
    {
        id: 1,
        imageSrc:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
        title: "Golden Triangle & Bequest Rajasthan",
        duration: "10 DAYS TOURS",
    },
    {
        id: 2,
        imageSrc:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80",
        title: "The Temple Run",
        duration: "17 DAYS TOURS",
    },
    {
        id: 3,
        imageSrc:
            "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&q=80",
        title: "The Hangover From The Past",
        duration: "12 DAYS TOURS",
    },
];

const HighlightedTrips: React.FC = () => {
    return (
        <section className="bg-[#D3C5BB] py-8 md:py-16 px-4 md:px-20">
            {/* Sarlavha - Mobile-da ham markazda va ixcham */}
            <h2 className="text-4xl md:text-8xl text-[#1a2e22] text-center mb-8 md:mb-12 font-serif leading-tight">
                Highlighted
                <br />
                Trips
            </h2>

            {/* Oq karta qismi */}
            <div className="bg-[#FDF6E9] p-3 md:p-8 rounded-sm max-w-6xl mx-auto relative shadow-sm">
                <p className="text-[#6F4E37] text-xs md:text-xl mb-4 md:mb-6 font-serif">
                    Top Selling Tours
                </p>

                {/* 3 ta karta har doim bir qatorda (Mobile-da ham) */}
                <div className="grid grid-cols-3 gap-1 md:gap-4 relative">
                    {/* Chap o'q */}
                    <button className="absolute left-[-10px] md:left-[-20px] top-1/2 -translate-y-1/2 bg-[#8B6914] text-white w-5 h-5 md:w-8 md:h-8 rounded-full flex items-center justify-center z-10 opacity-70">
                        <span className="text-[8px] md:text-xs">❮</span>
                    </button>

                    {TRIPS.map((trip) => (
                        <div
                            key={trip.id}
                            className="relative aspect-[3/4] overflow-hidden rounded-sm"
                        >
                            <img
                                src={trip.imageSrc}
                                alt={trip.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-1 md:p-4 text-white">
                                <h3 className="text-[6px] md:text-lg font-serif leading-tight mb-0.5 md:mb-1">
                                    {trip.title}
                                </h3>
                                <p className="text-[5px] md:text-xs opacity-90 uppercase tracking-tighter md:tracking-widest">
                                    {trip.duration}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* O'ng o'q */}
                    <button className="absolute right-[-10px] md:right-[-20px] top-1/2 -translate-y-1/2 bg-[#8B6914] text-white w-5 h-5 md:w-8 md:h-8 rounded-full flex items-center justify-center z-10 opacity-70">
                        <span className="text-[8px] md:text-xs">❯</span>
                    </button>
                </div>
            </div>

            {/* Pastki matnli qism - Mobile-da ham proporsional kichik */}
            <div className="mt-10 md:mt-16 flex flex-col items-center space-y-8 md:space-y-12">
                <div className="text-center">
                    <h4 className="text-xl md:text-5xl text-[#1a2e22] font-serif">
                        Himalayan Stillness
                    </h4>
                    <p className="text-[#6F4E37] italic text-sm md:text-2xl mt-1 md:mt-2 font-serif font-light text-center">
                        9 Nights / 10 Days
                    </p>
                </div>
                <div className="text-center">
                    <h4 className="text-xl md:text-5xl text-[#1a2e22] font-serif">
                        South India
                    </h4>
                    <p className="text-[#6F4E37] italic text-sm md:text-2xl mt-1 md:mt-2 font-serif font-light text-center">
                        6 Nights / 7 Days
                    </p>
                </div>
                <div className="text-center">
                    <h4 className="text-xl md:text-5xl text-[#1a2e22] font-serif">
                        Chardham on two wheels
                    </h4>
                    <p className="text-[#6F4E37] italic text-sm md:text-2xl mt-1 md:mt-2 font-serif font-light text-center">
                        6 Nights / 7 Days
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HighlightedTrips;
