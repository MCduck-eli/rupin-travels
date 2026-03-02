"use client";

import Link from "next/link";
import React, { useRef } from "react";

if (
    typeof document !== "undefined" &&
    !document.head.querySelector('[href*="Playfair"]')
) {
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:wght@300;400&family=Bodoni+Moda:ital,wght@0,400;0,700;1,400&display=swap";
    document.head.appendChild(fontLink);
}

interface HeroSectionProps {
    videoSrc?: string;
    posterSrc?: string;
    onLearnMore?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
    videoSrc,
    posterSrc,
    onLearnMore,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <>
            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }

        .rp-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 600;
          color: #c9a84c;
          line-height: 1.08;
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.7); 
          animation: fadeUp 1s ease both;
          animation-delay: 0.2s;
        }

        .rp-subtitle {
          font-family: 'Bodoni Moda', serif;
          font-style: italic;
          font-size: clamp(1.15rem, 2.8vw, 1.7rem);
          font-weight: 400;
          color: #ffffff;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6); 
          max-width: 680px;
          line-height: 1.45;
          animation: fadeUp 1s ease both;
          animation-delay: 0.45s;
        }

        .rp-btn {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.78rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #ffffff;
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.75);
          padding: 0.85rem 2.4rem;
          border-radius: 3px;
          cursor: pointer;
          transition: background 0.25s, border-color 0.25s, color 0.25s;
          animation: fadeUp 1s ease both;
          animation-delay: 0.7s;
          text-decoration: none;
          display: inline-block;
        }
        .rp-btn:hover {
          background: rgba(255,255,255,0.15);
          border-color: #ffffff;
        }

        @media (max-width: 850px) {
          .hero-container { min-height: 55vh !important; }
        }
      `}</style>

            <section
                className="hero-container"
                style={{
                    position: "relative",
                    width: "100%",
                    minHeight: "85vh",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {videoSrc ? (
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            zIndex: 0,
                        }}
                    />
                ) : (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(160deg, #3a7fa8 0%, #2b5c6e 100%)",
                            zIndex: 0,
                        }}
                    />
                )}

                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.3)",
                        zIndex: 1,
                    }}
                />

                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        padding: "2rem 1.5rem",
                        gap: "1.6rem",
                    }}
                >
                    <div style={{ animation: "scaleIn 0.8s ease both" }}>
                        <svg
                            width="45"
                            height="45"
                            viewBox="0 0 40 40"
                            fill="none"
                        >
                            <path
                                d="M20 34C20 34 8 27 8 18C8 13.6 13.4 10 20 14C26.6 10 32 13.6 32 18C32 27 20 34 20 34Z"
                                stroke="white"
                                strokeWidth="1.2"
                            />
                        </svg>
                    </div>
                    <h1 className="rp-title">Rupin Travels</h1>
                    <p className="rp-subtitle">
                        Travel designed to change how you feel
                    </p>
                    <Link
                        href="#experiences"
                        className="rp-btn"
                        onClick={onLearnMore}
                    >
                        Learn More
                    </Link>
                </div>
            </section>
        </>
    );
};

export default HeroSection;
