import React from "react";

// ── Google Fonts injection (idempotent) ───────────────────────────────────────
if (
    typeof document !== "undefined" &&
    !document.head.querySelector('[href*="Playfair"]')
) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:wght@300;400;500&display=swap";
    document.head.appendChild(link);
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface PriorityItem {
    id: number;
    text: string;
}

interface ExperienceSectionProps {
    imageSrc?: string;
    imageAlt?: string;
    priorityItems?: PriorityItem[];
}

// ── Static defaults ───────────────────────────────────────────────────────────
const DEFAULT_PRIORITIES: PriorityItem[] = [
    { id: 1, text: "Small groups" },
    { id: 2, text: "Thoughtful pacing" },
    { id: 3, text: "Authentic local partnerships" },
    { id: 4, text: "Personal attention" },
    { id: 5, text: "Space for integration" },
];

const PLACEHOLDER_IMAGE =
    "https://images.unsplash.com/photo-1582610116397-edb72e1a5b6c?w=700&q=80";

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
    imageSrc = PLACEHOLDER_IMAGE,
    imageAlt = "Luxury villa with infinity pool overlooking the sea",
    priorityItems = DEFAULT_PRIORITIES,
}) => {
    return (
        <>
            <style>{`
      .es-section {
  background-color: #6e8e96;
  padding: 2.5rem clamp(1.5rem, 7vw, 6rem); /* 4rem dan 2.5rem ga tushirdik */
}

        /* ── Top text block ── */
        .es-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.2rem, 2.4vw, 1.75rem);
          font-weight: 600;
          font-style: italic;
          color: #D4A843;
          text-align: center;
          line-height: 1.4;
          margin: 0 0 1.4rem;
          animation: es-fadeUp 0.8s ease both;
        }
      .es-body {
        font-family: "Radley", serif;
         font-style: normal;
         font-weight: 400;
  
  font-size: clamp(1.1rem, 2.2vw, 1.45rem); 
  
  color: #ffffff;
  text-align: center;
  line-height: 1.6;
  
  /* Harflar orasini biroz jipslashtiramiz (luxury vibe uchun) */
  letter-spacing: -0.01em; 
  
  max-width: 900px;
  margin: 0 auto 1.8rem;
  opacity: 0.95;
}

        /* ── Bottom two-column row ── */
        .es-bottom {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: clamp(2rem, 5vw, 4rem);
        }

        /* ── List column ── */
        .es-text-col {
          flex: 1;
          max-width: 420px;
          min-width: 0;
          padding-left: clamp(0px, 4vw, 3rem);
        }
        .es-list-intro {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.88rem, 1.5vw, 1rem);
          font-weight: 400;
          color: rgba(255,255,255,0.82);
          margin: 0 0 0.65rem;
          animation: es-fadeUp 0.8s ease both;
          animation-delay: 0.22s;
        }
        .es-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.52rem;
        }
        .es-list-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          font-weight: 400;
          color: rgba(255,255,255,0.88);
          opacity: 0;
          animation: es-fadeUp 0.65s ease forwards;
        }
        .es-bullet {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.7);
          flex-shrink: 0;
        }

        /* ── Arched image: flat-topped arch shape ── */
        .es-image-col {
          flex-shrink: 0;
          width: clamp(240px, 28vw, 380px);
          animation: es-scaleIn 0.9s ease both;
          animation-delay: 0.3s;
        }
.es-image-wrap {
    width: 100%;
    aspect-ratio: 1.4; /* Rasmdagi kabi enliroq proporsiya */
    overflow: hidden;
    position: relative;
    
    /* Canvadagi o'sha shaklni beruvchi aniq maska */
    clip-path: polygon(
        20% 0%, 80% 0%, 
        100% 20%, 100% 80%, 
        80% 100%, 20% 100%, 
        0% 80%, 0% 20%
    );
    
    /* Lekin burchaklar yumshoq bo'lishi uchun border-radius ham qo'shamiz */
    border-radius: 40px; 
}
        .es-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.55s ease;
        }
        .es-image-wrap:hover img {
          transform: scale(1.04);
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .es-bottom {
            flex-direction: column;
          }
          .es-text-col {
            padding-left: 0;
            max-width: 100%;
          }
          .es-image-col {
            width: min(70vw, 300px);
          }
        }

        /* ── Keyframes ── */
        @keyframes es-fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes es-scaleIn {
          from { opacity: 0; transform: scale(0.93); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

            <section className="es-section">
                <h2 className="es-heading">
                    Not a Tour. A Carefully Held Experience.
                </h2>
                <p className="es-body">
                    Our journeys are intentionally intimate and personally
                    guided. Every location, teacher, and transition is curated
                    with care — so you can move through each destination with
                    presence rather than pressure.
                </p>

                <div className="es-bottom">
                    {/* List */}
                    <div className="es-text-col">
                        <p className="es-list-intro">We prioritize:</p>
                        <ul className="es-list">
                            {priorityItems.map((item, index) => (
                                <li
                                    key={item.id}
                                    className="es-list-item"
                                    style={{
                                        animationDelay: `${0.32 + index * 0.09}s`,
                                    }}
                                >
                                    <span
                                        className="es-bullet"
                                        aria-hidden="true"
                                    />
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="es-image-col">
                        <div className="es-image-wrap">
                            <img src={imageSrc} alt={imageAlt} loading="lazy" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ExperienceSection;
