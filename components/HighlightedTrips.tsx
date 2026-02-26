"use client";

import React, { useState } from "react";

if (
    typeof document !== "undefined" &&
    !document.head.querySelector('[href*="Tenor"]')
) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
        "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Tenor+Sans&display=swap";
    document.head.appendChild(link);
}

interface Trip {
    id: number;
    imageSrc: string;
    imageAlt: string;
    dateRange: string;
    title: string;
    duration: string;
}

interface HighlightedTripsProps {
    trips?: Trip[];
}

const DEFAULT_TRIPS: Trip[] = [
    {
        id: 1,
        imageSrc:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        imageAlt: "Himalayan hotel room with warm lighting",
        dateRange: "April 8 – 25",
        title: "Himalayan Stillness",
        duration: "9 Nights / 10 Days",
    },
    {
        id: 2,
        imageSrc:
            "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
        imageAlt: "Ocean view suite with blue sofa",
        dateRange: "Jun 8 – 25",
        title: "Coastal Serenity",
        duration: "6 Nights / 7 Days",
    },
    {
        id: 3,
        imageSrc:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
        imageAlt: "Luxury mountain villa bedroom",
        dateRange: "4 Adults | 2 Children Below 7",
        title: "Alpine Retreat",
        duration: "6 Nights / 7 Days",
    },
    {
        id: 4,
        imageSrc:
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
        imageAlt: "Desert resort at sunset",
        dateRange: "Sep 10 – 20",
        title: "Desert Wandering",
        duration: "9 Nights / 10 Days",
    },
    {
        id: 5,
        imageSrc:
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
        imageAlt: "Jungle villa with infinity pool",
        dateRange: "Nov 1 – 12",
        title: "Jungle Immersion",
        duration: "10 Nights / 11 Days",
    },
];

const ArrowLeft: React.FC = () => (
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="currentColor">
        <polygon points="30,4 10,20 30,36" />
    </svg>
);
const ArrowRight: React.FC = () => (
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="currentColor">
        <polygon points="10,4 30,20 10,36" />
    </svg>
);

const HighlightedTrips: React.FC<HighlightedTripsProps> = ({
    trips = DEFAULT_TRIPS,
}) => {
    const [startIndex, setStartIndex] = useState<number>(0);
    const VISIBLE = 3;

    const canPrev = startIndex > 0;
    const canNext = startIndex + VISIBLE < trips.length;

    const handlePrev = (): void => {
        if (canPrev) setStartIndex((i) => i - 1);
    };
    const handleNext = (): void => {
        if (canNext) setStartIndex((i) => i + 1);
    };

    const visibleTrips = trips.slice(startIndex, startIndex + VISIBLE);

    return (
        <>
            <style>{`
        .ht-section {
          background-color: #e1d5cc; 
          padding: clamp(1.5rem, 3vw, 2.5rem) 0;
          overflow: hidden;
        }
        .ht-heading {
        font-family: 'Cormorant Garamond', serif;
        font-size: clamp(2.2rem, 5vw, 3.8rem);
        color: #1a2e22;   
        letter-spacing: -0.02em;   
        font-weight: 800;
        text-align: center;
        line-height: 1.1;
        margin: 0 0 clamp(1rem, 2.5vw, 1.8rem);
        animation: ht-fadeUp 0.8s ease both;
        }

        /* ── Slider wrapper ── */
        .ht-slider-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 0 clamp(0.5rem, 3vw, 2rem);
          position: relative;
        }

        /* ── Arrow buttons ── */
        .ht-arrow {
          flex-shrink: 0;
          width: clamp(44px, 6vw, 72px);
          height: clamp(44px, 6vw, 72px);
          color: #111111;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s, transform 0.15s;
          z-index: 2;
        }
        .ht-arrow:disabled {
          opacity: 0.18;
          cursor: default;
        }
        .ht-arrow:not(:disabled):hover {
          transform: scale(1.1);
        }

        /* ── Cards grid ── */
        .ht-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 2.5vw, 2rem);
          flex: 1;
          max-width: 1100px;
        }

        /* ── Individual card ── */
        .ht-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          animation: ht-fadeUp 0.6s ease forwards;
        }

        /* ── Square image ── */
        .ht-img-wrap {
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 4px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          margin-bottom: 0.8rem;
        }
        .ht-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .ht-img-wrap:hover img {
          transform: scale(1.05);
        }

        /* ── Card text ── */
        .ht-date {
          font-family: 'Inter', 'Tenor Sans', sans-serif;
          font-size: clamp(0.6rem, 1.1vw, 0.7rem);
          font-weight: 300;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #5a5248;
          text-align: center;
          margin-bottom: 0.2rem;
        }
        .ht-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.2rem, 2.4vw, 1.75rem);
          font-weight: 600;
          color: #1a2e22;
          text-align: center;
          line-height: 1.2;
          margin-bottom: 0.3rem;
        }
        .ht-duration {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.78rem, 1.4vw, 0.9rem);
          font-weight: 400;
          font-style: italic;
          color: #5a5248;
          text-align: center;
        }

        /* ── Dot indicators ── */
        .ht-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: clamp(1rem, 2vw, 1.5rem);
        }
        .ht-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #bbb4aa;
          transition: background 0.25s, transform 0.25s;
          cursor: pointer;
          border: none;
          padding: 0;
        }
        .ht-dot.active {
          background: #1a2e22;
          transform: scale(1.3);
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .ht-cards {
            grid-template-columns: 1fr;
            max-width: 320px;
          }
          .ht-arrow { width: 36px; height: 36px; }
        }

        /* ── Keyframes ── */
        @keyframes ht-fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            <section className="ht-section">
                <h2 className="ht-heading">Highlighted Trips</h2>

                <div className="ht-slider-wrap">
                    <button
                        className="ht-arrow"
                        onClick={handlePrev}
                        disabled={!canPrev}
                        aria-label="Previous trips"
                        type="button"
                    >
                        <ArrowLeft />
                    </button>

                    <div className="ht-cards">
                        {visibleTrips.map((trip, index) => (
                            <div
                                key={trip.id}
                                className="ht-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="ht-img-wrap">
                                    <img
                                        src={trip.imageSrc}
                                        alt={trip.imageAlt}
                                        loading="lazy"
                                    />
                                </div>
                                <p className="ht-date">{trip.dateRange}</p>
                                <h3 className="ht-title">{trip.title}</h3>
                                <p className="ht-duration">{trip.duration}</p>
                            </div>
                        ))}
                    </div>

                    <button
                        className="ht-arrow"
                        onClick={handleNext}
                        disabled={!canNext}
                        aria-label="Next trips"
                        type="button"
                    >
                        <ArrowRight />
                    </button>
                </div>

                <div className="ht-dots" role="tablist" aria-label="Trip pages">
                    {Array.from({ length: trips.length - VISIBLE + 1 }).map(
                        (_, i) => (
                            <button
                                key={i}
                                className={`ht-dot${startIndex === i ? " active" : ""}`}
                                onClick={() => setStartIndex(i)}
                                aria-label={`Go to page ${i + 1}`}
                                aria-selected={startIndex === i}
                                role="tab"
                                type="button"
                            />
                        ),
                    )}
                </div>
            </section>
        </>
    );
};

export default HighlightedTrips;
