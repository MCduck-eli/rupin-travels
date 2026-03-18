"use client";

import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";

interface HeroSectionProps {
    videoSrc?: string;
    title?: string;
    subtitle?: string;
    posterSrc?: string;
    onLearnMore?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
    videoSrc: initialVideo,
    title: initialTitle,
    subtitle: initialSubtitle,
    posterSrc,
    onLearnMore,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [dynamicData, setDynamicData] = useState({
        title: initialTitle,
        subtitle: initialSubtitle,
        videoSrc: initialVideo,
    });

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const res = await fetch("/api/home-settings");
                const data = await res.json();
                if (data) {
                    setDynamicData({
                        title: data.heroTitle || initialTitle,
                        subtitle: data.heroSubtitle || initialSubtitle,
                        videoSrc: data.heroVideo || initialVideo,
                    });
                }
            } catch (err) {
                console.error("Hero settings loading error:", err);
            }
        };
        loadSettings();
    }, [initialTitle, initialSubtitle, initialVideo]);

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
                  /* font-family olib tashlandi, globals.css dan h1 qoidasini oladi */
                  font-size: 56px;
                  font-weight: 600;
                  color: #c9a84c;
                  line-height: 1.08;
                  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.7); 
                  animation: fadeUp 1s ease both;
                  animation-delay: 0.2s;
                  text-align: center;
                  word-break: break-word;
                }

                .rp-subtitle {
                  /* font-family olib tashlandi, globals.css dan p qoidasini oladi */
                  font-size: 17px;
                  font-weight: 400;
                  color: #ffffff;
                  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6); 
                  max-width: 800px;
                  line-height: 1.45;
                  animation: fadeUp 1s ease both;
                  animation-delay: 0.45s;
                  text-align: center;
                }

                @media (max-width: 850px) {
                  .hero-container { min-height: 50vh !important; }
                  .rp-title { font-size: 40px; }
                }
            `}</style>

            <section
                className="hero-container"
                style={{
                    position: "relative",
                    width: "100%",
                    minHeight: "60vh",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {dynamicData.videoSrc ? (
                    <video
                        key={dynamicData.videoSrc}
                        ref={videoRef}
                        src={dynamicData.videoSrc}
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
                        padding: "2rem 1.5rem",
                        gap: "1.6rem",
                        width: "100%",
                        maxWidth: "1200px",
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

                    <h1 className="rp-title">{dynamicData.title}</h1>
                    <p className="rp-subtitle">{dynamicData.subtitle}</p>

                    <Link href={"/contact"}>
                        <button className="px-10 py-3 border border-white/60 text-white text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:bg-white hover:text-black hover:border-white">
                            Contact us
                        </button>
                    </Link>
                </div>
            </section>
        </>
    );
};

export default HeroSection;
