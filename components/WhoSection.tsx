"use client";

import React from "react";

if (
    typeof document !== "undefined" &&
    !document.head.querySelector('[href*="Cormorant"]')
) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
        "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Playfair+Display:wght@400;500&family=Inter:wght@300;400&display=swap";
    document.head.appendChild(link);
}

interface BulletItem {
    id: number;
    text: string;
}

interface WhoSectionProps {
    founderImageSrc?: string;
    founderImageAlt?: string;
    youtubeHref?: string;
    onFounderClick?: () => void;
    bulletItems?: BulletItem[];
}

const DEFAULT_BULLETS: BulletItem[] = [
    {
        id: 1,
        text: "These journeys are for those who have traveled widely, and now seek experiences that are slower, quieter, and more meaningful.",
    },
    {
        id: 2,
        text: "They are designed for those who value comfort without excess, small groups and space for personal reflection.",
    },
    {
        id: 3,
        text: "For individuals seeking a quieter, more thoughtful engagement with India's spiritual and cultural traditions - away from crowds, haste, and noise.",
    },
    {
        id: 4,
        text: "For those at a stage in life where travel becomes a return inward — not about nostalgia, but about clarity and connection.",
    },
];

const PLACEHOLDER_FOUNDER =
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80";
const BLOB_ID = "who-blob-clip";

const BlobClipDef: React.FC = () => (
    <svg
        width="0"
        height="0"
        style={{ position: "absolute", overflow: "hidden" }}
        aria-hidden="true"
    >
        <defs>
            <clipPath id={BLOB_ID} clipPathUnits="objectBoundingBox">
                <path d="M 0.50,0.02 C 0.62,0.00 0.78,0.04 0.82,0.16 C 0.88,0.10 0.98,0.14 0.98,0.26 C 1.00,0.36 0.94,0.44 0.86,0.46 C 0.96,0.52 0.98,0.64 0.90,0.72 C 0.84,0.80 0.74,0.80 0.66,0.76 C 0.64,0.88 0.54,0.96 0.44,0.94 C 0.34,0.92 0.26,0.84 0.26,0.74 C 0.16,0.80 0.04,0.74 0.02,0.62 C 0.00,0.52 0.06,0.42 0.14,0.38 C 0.04,0.32 0.00,0.20 0.08,0.12 C 0.14,0.04 0.26,0.02 0.36,0.06 C 0.38,0.02 0.44,-0.00 0.50,0.02 Z" />
            </clipPath>
        </defs>
    </svg>
);

const WhoSection: React.FC<WhoSectionProps> = ({
    founderImageSrc = PLACEHOLDER_FOUNDER,
    founderImageAlt = "Founder of Rupin Travels",
    youtubeHref = "#",
    onFounderClick,
    bulletItems = DEFAULT_BULLETS,
}) => {
    return (
        <>
            <BlobClipDef />
            <style>{`
                .ws-section {
                    background-color: #efede7;
                    padding: clamp(1rem, 3vw, 2rem) clamp(1.5rem, 7vw, 5.5rem);
                }
                .ws-grid {
                    display: flex;
                    justify-content: space-between;
                    align-items: stretch;
                    gap: clamp(2rem, 5vw, 5rem);
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .ws-text-column {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .ws-heading {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(2.2rem, 4vw, 3rem);
                    font-weight: 400;
                    color: #004D3C;
                    line-height: 1.1;
                    margin-bottom: 1.5rem;
                }
                .ws-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .ws-list-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(1.1rem, 1.8vw, 1.25rem);
                    font-weight: 400;
                    color: #004D3C;
                    line-height: 1.25;
                }
                .ws-bullet {
                    margin-top: 0.45rem;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: #004D3C;
                    flex-shrink: 0;
                }
                .ws-card {
                    background-color: #D2B4A3;
                    border-radius: 30px;
                    padding: 3rem 2.5rem;
                    width: clamp(320px, 35vw, 400px);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 2rem;
                }
                .ws-blob-wrap {
                    width: 160px;
                    height: 160px;
                    position: relative;
                }
                .ws-blob-img {
                    width: 100%;
                    height: 100%;
                    clip-path: url(#${BLOB_ID});
                    object-fit: cover;
                }
                .ws-yt-link {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1.2rem;
                    font-style: italic;
                    color: #1A1A1A;
                    text-decoration: underline;
                    text-underline-offset: 4px;
                }
                .ws-cta-btn {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.75rem;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: #ffffff;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.7);
                    border-radius: 6px;
                    padding: 1.1rem 2rem;
                    cursor: pointer;
                    width: 100%;
                    transition: all 0.3s ease;
                }
                .ws-cta-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: #ffffff;
                }
                
                @media (max-width: 900px) {
                    .ws-grid { flex-direction: column; }
                    .ws-card { width: 100%; }
                }
            `}</style>

            <section className="ws-section">
                <div className="ws-grid">
                    <div className="ws-text-column">
                        <h2 className="ws-heading">
                            Who these journeys are for
                        </h2>
                        <ul className="ws-list">
                            {bulletItems.map((item) => (
                                <li key={item.id} className="ws-list-item">
                                    <span
                                        className="ws-bullet"
                                        aria-hidden="true"
                                    />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="ws-card">
                        <div className="ws-blob-wrap">
                            <img
                                src={founderImageSrc}
                                alt={founderImageAlt}
                                className="ws-blob-img"
                            />
                        </div>
                        <a
                            href={youtubeHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ws-yt-link"
                        >
                            Listen to our story
                        </a>
                        <button className="ws-cta-btn" onClick={onFounderClick}>
                            From Our Founder
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WhoSection;
