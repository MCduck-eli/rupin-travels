import React from "react";

// ── Google Fonts injection (idempotent) ───────────────────────────────────────
if (
    typeof document !== "undefined" &&
    !document.head.querySelector('[href*="Cormorant"]')
) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
        "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Tenor+Sans&family=Inter:wght@300;400;500&display=swap";
    document.head.appendChild(link);
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface Speaker {
    id: number;
    name: string;
    title: string;
    imageSrc: string;
    imageAlt: string;
    blobVariant: 1 | 2 | 3;
}

interface FooterAndSpeakersProps {
    speakers?: Speaker[];
    zoomLink?: string;
    contactHref?: string;
}

// ── Default data ──────────────────────────────────────────────────────────────
const DEFAULT_SPEAKERS: Speaker[] = [
    {
        id: 1,
        name: "Aiyla Hakim",
        title: "Iriswell Founder and CEO",
        imageSrc:
            "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
        imageAlt: "Aiyla Hakim – Iriswell Founder and CEO",
        blobVariant: 1,
    },
    {
        id: 2,
        name: "Soo Jin Ae",
        title: "COO/Assistant Lead/Co-Manager",
        imageSrc:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
        imageAlt: "Soo Jin Ae – COO",
        blobVariant: 2,
    },
    {
        id: 3,
        name: "Chidi Eze",
        title: "CFO/Team Member",
        imageSrc:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        imageAlt: "Chidi Eze – CFO",
        blobVariant: 3,
    },
];

// ── Blob clip-path variants ───────────────────────────────────────────────────
// Three organic shapes, each slightly different
const blobPaths: Record<1 | 2 | 3, string> = {
    1: `M 0.50,0.02
      C 0.65,-0.01 0.82,0.06 0.88,0.20
      C 0.96,0.14 1.00,0.26 0.96,0.38
      C 1.02,0.46 0.98,0.60 0.88,0.64
      C 0.94,0.76 0.86,0.88 0.72,0.90
      C 0.64,1.00 0.48,0.98 0.38,0.90
      C 0.28,0.98 0.12,0.94 0.06,0.82
      C -0.02,0.72 0.02,0.56 0.10,0.48
      C 0.02,0.38 0.02,0.22 0.14,0.14
      C 0.22,0.04 0.38,-0.02 0.50,0.02 Z`,
    2: `M 0.48,0.00
      C 0.62,-0.02 0.80,0.04 0.86,0.18
      C 0.96,0.10 1.02,0.24 0.98,0.36
      C 1.04,0.48 0.96,0.62 0.84,0.66
      C 0.88,0.80 0.78,0.94 0.62,0.96
      C 0.52,1.02 0.38,0.96 0.30,0.86
      C 0.18,0.96 0.04,0.88 0.00,0.74
      C -0.04,0.62 0.06,0.48 0.16,0.42
      C 0.06,0.32 0.04,0.16 0.14,0.08
      C 0.24,0.00 0.38,-0.02 0.48,0.00 Z`,
    3: `M 0.52,0.02
      C 0.66,0.00 0.80,0.08 0.84,0.22
      C 0.94,0.14 1.00,0.28 0.96,0.40
      C 1.02,0.50 0.96,0.64 0.84,0.68
      C 0.90,0.80 0.82,0.94 0.66,0.96
      C 0.56,1.02 0.40,0.96 0.32,0.86
      C 0.20,0.96 0.06,0.88 0.02,0.74
      C -0.02,0.60 0.08,0.46 0.18,0.40
      C 0.08,0.30 0.06,0.14 0.16,0.06
      C 0.26,-0.02 0.40,-0.00 0.52,0.02 Z`,
};

// Blob accent color per variant (the decorative shape behind the photo)
const blobAccents: Record<1 | 2 | 3, string> = {
    1: "#7a9e9a",
    2: "#7a9e9a",
    3: "#4a5a7a",
};

// ── SVG defs for all three blob clip-paths ────────────────────────────────────
const BlobDefs: React.FC = () => (
    <svg
        width="0"
        height="0"
        style={{ position: "absolute", overflow: "hidden" }}
        aria-hidden="true"
    >
        <defs>
            {([1, 2, 3] as const).map((v) => (
                <clipPath
                    key={v}
                    id={`fs-blob-${v}`}
                    clipPathUnits="objectBoundingBox"
                >
                    <path d={blobPaths[v]} />
                </clipPath>
            ))}
        </defs>
    </svg>
);

// ── Social icon SVGs ──────────────────────────────────────────────────────────
const FacebookIcon: React.FC = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);
const TwitterIcon: React.FC = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
);
const InstagramIcon: React.FC = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
    >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
);

// ── Leaf decoration SVG ───────────────────────────────────────────────────────
const LeafDecoration: React.FC = () => (
    <div
        style={{
            position: "absolute",
            top: "1.5rem",
            right: "2rem",
            opacity: 0.85,
        }}
    >
        <svg width="68" height="72" viewBox="0 0 68 72" fill="none">
            <ellipse
                cx="44"
                cy="24"
                rx="18"
                ry="10"
                fill="#7a9a5a"
                transform="rotate(-30 44 24)"
            />
            <ellipse
                cx="28"
                cy="46"
                rx="14"
                ry="8"
                fill="#a0b870"
                transform="rotate(-20 28 46)"
            />
            <line
                x1="44"
                y1="24"
                x2="28"
                y2="58"
                stroke="#5a7a3a"
                strokeWidth="1.5"
            />
        </svg>
    </div>
);

const FooterAndSpeakers: React.FC<FooterAndSpeakersProps> = ({
    speakers = DEFAULT_SPEAKERS,
    zoomLink = "<ds99990999>",
    contactHref = "#contact",
}) => {
    return (
        <>
            <BlobDefs />
            <style>{`
        .fs-footer {
          background-color: #504c4c;
          padding: clamp(2rem, 4vw, 3rem) clamp(1.5rem, 6vw, 5rem) 0;
        }

        /* Three-column top bar */
        .fs-footer-top {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: clamp(1rem, 3vw, 2rem);
          align-items: start;
          padding-bottom: clamp(1.5rem, 3vw, 2.5rem);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .fs-col-label {
          font-family: 'Tenor Sans', 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          margin: 0 0 0.6rem;
          text-align: center;
        }
        .fs-col-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.78rem, 1.4vw, 1rem);
          font-weight: 400;
          color: rgba(255,255,255,0.82);
          line-height: 1.75;
          margin: 0;
          text-align: center;
        }
        .fs-col-value a {
          color: inherit;
          text-decoration: none;
        }
        .fs-col-value a:hover { text-decoration: underline; }

        /* Social icons column */
        .fs-social-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
        }
        .fs-social-row {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .fs-social-icon {
          color: rgba(255,255,255,0.75);
          cursor: pointer;
          transition: color 0.2s;
          display: flex;
        }
        .fs-social-icon:hover { color: #ffffff; }

        .fs-contact-link {
          font-family: 'Tenor Sans', 'Inter', sans-serif;
          font-size: 0.90rem;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #D4A843;
          text-decoration: none;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .fs-contact-link:hover { opacity: 0.75; }

        /* Zoom banner */
        .fs-zoom-banner {
          text-align: center;
          padding: clamp(1.2rem, 2.5vw, 2rem) 0;
        }
        .fs-zoom-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.9rem, 1.8vw, 1.18rem);
          font-style: italic;
          font-weight: 400;
          color: rgba(255,255,255,0.88);
          letter-spacing: 0.04em;
          margin: 0;
        }

        /* Mobile footer */
        @media (max-width: 600px) {
          .fs-footer-top {
            grid-template-columns: 1fr;
          }
          .fs-social-col { align-items: flex-start; }
        }

        /* ─────────────────────────────────────────────────
           MEET THE SPEAKERS
        ───────────────────────────────────────────────── */
        .fs-speakers-section {
          background-color: #FCF9F2;
          padding: clamp(3rem, 6vw, 5rem) clamp(1.5rem, 6vw, 5rem);
          position: relative;
          overflow: hidden;
        }

        .fs-speakers-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 600;
          color: #8B7355;
          margin: 0 0 0.5rem;
          animation: fs-fadeUp 0.8s ease both;
        }
        .fs-speakers-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.82rem, 1.5vw, 0.96rem);
          font-weight: 400;
          color: #6a6055;
          margin: 0 0 clamp(2.5rem, 5vw, 4rem);
          line-height: 1.6;
          animation: fs-fadeUp 0.8s ease both;
          animation-delay: 0.1s;
        }

        /* Speaker grid */
        .fs-speaker-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.5rem, 3vw, 3rem);
          max-width: 2000px;
        }

        /* Individual speaker card */
        .fs-speaker-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          animation: fs-fadeUp 0.7s ease forwards;
        }

        /* Blob image container */
        .fs-blob-outer {
          position: relative;
          width: clamp(120px, 16vw, 180px);
          height: clamp(120px, 16vw, 180px);
          margin-bottom: 1.2rem;
        }
        /* decorative blob accent behind photo */
        .fs-blob-accent {
          position: absolute;
          top: -8%;
          left: -10%;
          width: 65%;
          height: 65%;
          border-radius: 50% 40% 60% 30% / 50% 60% 40% 50%;
          z-index: 0;
        }
        .fs-blob-img {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Speaker name */
        .fs-speaker-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.5rem, 1.8vw, 1.2rem);
          font-weight: 800;
          color: #8B7355;
          text-align: center;
          margin: 0 0 0.55rem;
        }

        /* Title with lines */
        .fs-speaker-title-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          gap: 0.3rem;
        }
        .fs-speaker-rule {
          width: 100%;
          height: 1px;
          background: #b0a898;
        }
        .fs-speaker-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 1.2vw, 0.8rem);
          font-weight: 600;
          color: #8B7355;
          text-align: center;
          padding: 0.25rem 0.5rem;
          line-height: 1.4;
        }

        /* Mobile */
        @media (max-width: 580px) {
          .fs-speaker-grid {
            grid-template-columns: 1fr;
            max-width: 280px;
            margin: 0 auto;
          }
        }

        /* ── Keyframes ── */
        @keyframes fs-fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
            <footer className="fs-footer">
                <div className="fs-footer-top">
                    <div>
                        <p className="fs-col-label">Reservations Office</p>
                        <p className="fs-col-value">
                            Los Angeles, CA
                            <br />
                            +1-805-285-3237
                            <br />
                            <a href="mailto:Info@RupinTravles.com">
                                Info@RupinTravles.com
                            </a>
                        </p>
                    </div>

                    <div>
                        <p className="fs-col-label">Office Hours</p>
                        <p className="fs-col-value">
                            Monday to Friday
                            <br />
                            9:00 am to 6:00 pm PST
                        </p>
                    </div>

                    <div className="fs-social-col">
                        <div className="fs-social-row">
                            <a
                                href="#facebook"
                                className="fs-social-icon"
                                aria-label="Facebook"
                            >
                                <FacebookIcon />
                            </a>
                            <a
                                href="#twitter"
                                className="fs-social-icon"
                                aria-label="Twitter"
                            >
                                <TwitterIcon />
                            </a>
                            <a
                                href="#instagram"
                                className="fs-social-icon"
                                aria-label="Instagram"
                            >
                                <InstagramIcon />
                            </a>
                        </div>
                        <a href={contactHref} className="fs-contact-link">
                            Contact Us
                        </a>
                    </div>
                </div>

                <div className="fs-zoom-banner">
                    <p className="fs-zoom-text">
                        Make sure to join us for our next Zoom call &mdash;{" "}
                        {zoomLink}
                    </p>
                </div>
            </footer>

            <section className="fs-speakers-section">
                <LeafDecoration />

                <h2 className="fs-speakers-heading">Meet the Speakers</h2>
                <p className="fs-speakers-sub">
                    Add a short description of the speakers.
                    <br />
                    Establish their credibility and expertise here.
                </p>

                <div className="fs-speaker-grid">
                    {speakers.map((speaker, index) => (
                        <div
                            key={speaker.id}
                            className="fs-speaker-card"
                            style={{ animationDelay: `${0.1 + index * 0.15}s` }}
                        >
                            <div className="fs-blob-outer">
                                <div
                                    className="fs-blob-accent"
                                    style={{
                                        backgroundColor:
                                            blobAccents[speaker.blobVariant],
                                    }}
                                    aria-hidden="true"
                                />
                                <img
                                    src={speaker.imageSrc}
                                    alt={speaker.imageAlt}
                                    className="fs-blob-img"
                                    loading="lazy"
                                    style={{
                                        WebkitClipPath: `url(#fs-blob-${speaker.blobVariant})`,
                                        clipPath: `url(#fs-blob-${speaker.blobVariant})`,
                                    }}
                                />
                            </div>

                            <h3 className="fs-speaker-name">{speaker.name}</h3>

                            <div className="fs-speaker-title-wrap">
                                <div className="fs-speaker-rule" />
                                <p className="fs-speaker-title">
                                    {speaker.title}
                                </p>
                                <div className="fs-speaker-rule" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default FooterAndSpeakers;
