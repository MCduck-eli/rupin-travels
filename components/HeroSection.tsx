"use client";

import React, { useRef, useState, useEffect } from "react";

if (
    typeof document !== "undefined" &&
    !document.head.querySelector('[href*="Playfair"]')
) {
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:wght@300;400&display=swap";
    document.head.appendChild(fontLink);
}

interface HeroSectionProps {
    videoSrc?: string;
    posterSrc?: string;
    onLearnMore?: () => void;
}

const NAV_ITEMS: string[] = [
    "Home",
    "Experiences",
    "In The Press",
    "About Us",
    "Testimonials",
    "Contact Us",
];

const HeroSection: React.FC<HeroSectionProps> = ({
    videoSrc,
    posterSrc,
    onLearnMore,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const handlePlayToggle = (): void => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play().catch(() => null);
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

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

        /* Navbar Sticky va Glassmorphism effekti */
        .sticky-nav {
          position: sticky;
          top: 0;
          z-index: 1000;
          background-color: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid #e8e4de;
          width: 100%;
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.9rem 1.5rem;
          position: relative;
        }

        .rp-nav-link {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1a1a1a;
          padding: 0 1.1rem;
          border-right: 1px solid #d0ccc5;
          cursor: pointer;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .rp-nav-link:last-child { border-right: none; }
        .rp-nav-link:hover { color: #b8933a; }

        /* Mobile Toggle Tugmasi */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          position: absolute;
          right: 20px;
        }

        .rp-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 600;
          color: #c9a84c;
          line-height: 1.08;
          animation: fadeUp 1s ease both;
          animation-delay: 0.2s;
        }

        .rp-subtitle {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: clamp(1.15rem, 2.8vw, 1.7rem);
          font-weight: 400;
          color: #ffffff;
          text-shadow: 0 2px 18px rgba(0,0,0,0.45);
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
        }
        .rp-btn:hover {
          background: rgba(255,255,255,0.15);
          border-color: #ffffff;
        }

        /* Responsive Dizayn */
        @media (max-width: 850px) {
          .mobile-menu-btn { display: block; }
          
          .nav-inner { justify-content: flex-start; }

          .nav-links-wrapper {
            display: ${isMenuOpen ? "flex" : "none"};
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            padding: 1rem 0;
            box-shadow: 0 10px 20px rgba(0,0,0,0.05);
            animation: fadeUp 0.3s ease forwards;
          }

          .rp-nav-link {
            border-right: none;
            border-bottom: 1px solid #f0f0f0;
            padding: 1.2rem !important;
            text-align: center;
            font-size: 0.85rem;
          }
        }
      `}</style>

            <nav className="sticky-nav">
                <div className="nav-inner">
                    <div
                        style={{
                            fontFamily: "Playfair Display",
                            fontSize: "1.2rem",
                            color: "#1a1a1a",
                            display: "block",
                            fontWeight: "bold",
                        }}
                        className="mobile-logo-view"
                    >
                        Rupin
                    </div>

                    <button
                        className="mobile-menu-btn text-black"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            {isMenuOpen ? (
                                <path d="M18 6L6 18M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    <div className="nav-links-wrapper">
                        {NAV_ITEMS.map((item) => (
                            <span key={item} className="rp-nav-link">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </nav>

            <section
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
                                "linear-gradient(160deg, #3a7fa8 0%, #5aaa8a 45%, #2b5c6e 100%)",
                            zIndex: 0,
                        }}
                    />
                )}

                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.45) 100%)",
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
                    <div
                        className="rp-lotus"
                        style={{ animation: "scaleIn 0.8s ease both" }}
                    >
                        <svg
                            width="45"
                            height="45"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20 34C20 34 8 27 8 18C8 13.6 13.4 10 20 14C26.6 10 32 13.6 32 18C32 27 20 34 20 34Z"
                                stroke="white"
                                strokeWidth="1.2"
                            />
                            <path
                                d="M20 34C20 34 12 24 12 16C12 12 15.5 9.5 20 12C24.5 9.5 28 12 28 16C28 24 20 34 20 34Z"
                                stroke="white"
                                strokeWidth="1.2"
                            />
                            <path
                                d="M20 34C20 34 16 26 16 19C16 15.8 17.8 14 20 15C22.2 14 24 15.8 24 19C24 26 20 34 20 34Z"
                                stroke="white"
                                strokeWidth="1.2"
                            />
                        </svg>
                    </div>

                    <h1 className="rp-title">Rupin Travels</h1>

                    <p className="rp-subtitle">
                        Travel designed to change how you feel —&nbsp;not just
                        what you see
                    </p>

                    <button
                        className="rp-btn"
                        onClick={onLearnMore}
                        type="button"
                    >
                        Learn More
                    </button>
                </div>
            </section>
        </>
    );
};

export default HeroSection;
