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
                <path
                    d="
          M 0.50,0.02
          C 0.62,0.00 0.78,0.04 0.82,0.16
          C 0.88,0.10 0.98,0.14 0.98,0.26
          C 1.00,0.36 0.94,0.44 0.86,0.46
          C 0.96,0.52 0.98,0.64 0.90,0.72
          C 0.84,0.80 0.74,0.80 0.66,0.76
          C 0.64,0.88 0.54,0.96 0.44,0.94
          C 0.34,0.92 0.26,0.84 0.26,0.74
          C 0.16,0.80 0.04,0.74 0.02,0.62
          C 0.00,0.52 0.06,0.42 0.14,0.38
          C 0.04,0.32 0.00,0.20 0.08,0.12
          C 0.14,0.04 0.26,0.02 0.36,0.06
          C 0.38,0.02 0.44,-0.00 0.50,0.02
          Z
        "
                />
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
          padding: clamp(3.5rem, 7vw, 4rem) clamp(1.5rem, 7vw, 5.5rem);
          outline-offset: -3px;
        }


        .ws-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: start;
          gap: clamp(2rem, 5vw, 5rem);
        }


        .ws-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4.5vw, 3.4rem);
          font-weight: 500;
          color: #1A2E22;
          line-height: 1.18;
          margin: 0 0 clamp(1.5rem, 3vw, 2.5rem);
          animation: ws-fadeUp 0.8s ease both;
        }

        .ws-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .ws-list-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.98rem, 1.8vw, 1.14rem);
          font-weight: 400;
          color: #2a3a2e;
          line-height: 1.65;
          opacity: 0;
          animation: ws-fadeUp 0.7s ease forwards;
        }
        .ws-bullet {
          margin-top: 0.52em;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2a3a2e;
          flex-shrink: 0;
        }

       .ws-card {
          background-color: #D2B4A3;
          border-radius: 40px; /* Rasmdagidek yumshoqroq burchaklar */
          padding: clamp(2rem, 4vw, 3rem);
          width: clamp(300px, 35vw, 420px);
          min-height: 400px; 
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between; /* Elementlarni yuqori va pastga yoyish uchun */
          gap: 1.5rem;
          animation: ws-scaleIn 0.85s ease both;
          animation-delay: 0.2s;
          flex-shrink: 0;
          }

        /* ── Top row: blob image + youtube link ── */
        .ws-card-top {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          width: 100%;
        }

        /* ── Blob image ── */
        .ws-blob-wrap {
          width: clamp(110px, 14vw, 160px);
          height: clamp(110px, 14vw, 160px);
          flex-shrink: 0;
          position: relative;
        }
        /* The blue decorative blob behind the photo */
        .ws-blob-bg {
          position: absolute;
          top: -10%;
          left: -8%;
          width: 66%;
          height: 66%;
          background-color: #6e7fa3;
          border-radius: 50% 40% 60% 30% / 50% 60% 40% 50%;
          z-index: 0;
        }
        .ws-blob-img {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          -webkit-clip-path: url(#${BLOB_ID});
          clip-path: url(#${BLOB_ID});
          object-fit: cover;
          display: block;
        }

        /* ── YouTube link ── */
        .ws-yt-link {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.8rem, 1.4vw, 1.94rem);
          font-weight: 400;
          color: #000;
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
          transition: color 0.2s;
          background: none;
          border: none;
          padding: 0;
          text-align: left;
        }
        .ws-yt-link:hover { color: #333; }

        /* ── Ghost CTA button ── */
        .ws-cta-btn {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.62rem, 1.1vw, 0.72rem);
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #ffffff;
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.7);
          border-radius: 6px;
          padding: 0.9rem 1.6rem;
          cursor: pointer;
          width: 100%;
          transition: background 0.22s, border-color 0.22s;
        }
        .ws-cta-btn:hover {
          background: rgba(255,255,255,0.15);
          border-color: #ffffff;
        }

        /* ── Mobile ── */
        @media (max-width: 700px) {
          .ws-grid {
            grid-template-columns: 1fr;
          }
          .ws-card {
            width: 100%;
            min-height: 200px; 
          }
        }

        /* ── Keyframes ── */
        @keyframes ws-fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ws-scaleIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

            <section className="ws-section">
                <div className="ws-grid">
                    <div>
                        <h2 className="ws-heading">
                            Who these journeys are for
                        </h2>
                        <ul className="ws-list">
                            {bulletItems.map((item, index) => (
                                <li
                                    key={item.id}
                                    className="ws-list-item"
                                    style={{
                                        animationDelay: `${0.1 + index * 0.12}s`,
                                    }}
                                >
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
                        <div className="ws-card-top">
                            <div className="ws-blob-wrap">
                                <div
                                    className="ws-blob-bg"
                                    aria-hidden="true"
                                />
                                <img
                                    src={founderImageSrc}
                                    alt={founderImageAlt}
                                    className="ws-blob-img"
                                    loading="lazy"
                                />
                            </div>
                            <a
                                href={youtubeHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ws-yt-link"
                                aria-label="Link to YouTube founder video"
                            >
                                Link to youtube
                            </a>
                        </div>

                        <button
                            className="ws-cta-btn"
                            onClick={onFounderClick}
                            type="button"
                            aria-label="Watch video from our founder"
                        >
                            From Our Founder
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WhoSection;
