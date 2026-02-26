import React from "react";

// ── Google Fonts injection (idempotent) ───────────────────────────────────────
if (typeof document !== "undefined" && !document.head.querySelector('[href*="Playfair"]')) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:wght@300;400;500&display=swap";
  document.head.appendChild(link);
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface LuxuryItem {
  id: number;
  text: string;
}

interface PhilosophySectionProps {
  /** Override the tagline quote if needed */
  tagline?: string;
  /** Override luxury list items */
  luxuryItems?: LuxuryItem[];
  /** Override footer text */
  footerText?: string;
}

// ── Static data ───────────────────────────────────────────────────────────────
const DEFAULT_TAGLINE =
  "\u201cTravel that transforms \u2013 curated journeys for leaders, entrepreneurs, elite professionals & seniors seeking meaning.";

const DEFAULT_LUXURY_ITEMS: LuxuryItem[] = [
  { id: 1, text: "TIME TO SLOW DOWN" },
  { id: 2, text: "SPACE TO THINK CLEARLY" },
  { id: 3, text: "ACCESS TO TRUSTED PRACTITIONERS" },
  { id: 4, text: "ETHICAL PARTNERSHIPS" },
  { id: 5, text: "EXPERIENCES THAT STAY WITH YOU LONG AFTER YOU RETURN HOME" },
];

const DEFAULT_FOOTER = "WE DESIGN JOURNEYS THAT PROTECT THESE VALUES.";

// ── Component ─────────────────────────────────────────────────────────────────
const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  tagline = DEFAULT_TAGLINE,
  luxuryItems = DEFAULT_LUXURY_ITEMS,
  footerText = DEFAULT_FOOTER,
}) => {
  return (
    <>
      <style>{`
        /* ── Keyframes ── */
        @keyframes ps-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ps-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ps-lineGrow {
          from { width: 0; }
          to   { width: 48px; }
        }

        /* ── Tagline band ── */
        .ps-tagline-band {
          background: linear-gradient(175deg, #f7f4ef 0%, #eae5dc 60%, #6b5e4e 100%);
          padding: clamp(3rem, 7vw, 5.5rem) clamp(1.5rem, 8vw, 8rem);
          text-align: center;
        }
        .ps-tagline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 3.6vw, 2.85rem);
          font-weight: 600;
          color: #1a1510;
          line-height: 1.38;
          max-width: 900px;
          margin: 0 auto;
          animation: ps-fadeUp 1s ease both;
        }

        /* ── Philosophy band ── */
        .ps-philosophy-band {
          background-color: #3d3530;
          padding: clamp(3rem, 6vw, 5rem) clamp(1.5rem, 8vw, 7rem);
        }

        /* ── Section header ── */
        .ps-section-header {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0.55rem;
          margin-bottom: 2.4rem;
          animation: ps-fadeUp 0.9s ease both;
          animation-delay: 0.15s;
        }
        .ps-label-white {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.7rem, 1.4vw, 0.82rem);
          font-weight: 400;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #c5bfb5;
        }
        .ps-label-gold {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.7rem, 1.4vw, 0.82rem);
          font-weight: 500;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #D4A843;
        }

        /* ── Divider ── */
        .ps-divider {
          height: 1px;
          background: linear-gradient(to right, #D4A843 0%, transparent 80%);
          margin-bottom: 2.4rem;
          animation: ps-fadeIn 0.8s ease both;
          animation-delay: 0.3s;
        }

        /* ── List intro ── */
        .ps-list-intro {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.68rem, 1.3vw, 0.78rem);
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #b0a899;
          margin-bottom: 1.1rem;
          animation: ps-fadeUp 0.9s ease both;
          animation-delay: 0.35s;
        }

        /* ── List ── */
        .ps-luxury-list {
          list-style: none;
          padding: 0;
          margin: 0 0 3.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.72rem;
        }
        .ps-luxury-item {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.7rem, 1.4vw, 0.82rem);
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #d6cfc4;
          opacity: 0;
          animation: ps-fadeUp 0.7s ease forwards;
        }
        .ps-bullet {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #D4A843;
          flex-shrink: 0;
        }

        /* ── Footer text ── */
        .ps-footer-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.72rem, 1.5vw, 0.88rem);
          font-weight: 500;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #D4A843;
          text-align: center;
          padding-top: 2.5rem;
          border-top: 1px solid rgba(212,168,67,0.25);
          animation: ps-fadeIn 1s ease both;
          animation-delay: 0.9s;
        }
      `}</style>

      {/* ── Tagline Band ── */}
      <div className="ps-tagline-band">
        <p className="ps-tagline">{tagline}</p>
      </div>

      {/* ── Philosophy Band ── */}
      <div className="ps-philosophy-band">

        {/* Header row */}
        <div className="ps-section-header">
          <span className="ps-label-white">Our Philosophy</span>
          <span className="ps-label-gold">Luxury As Intention</span>
        </div>

        {/* Divider */}
        <div className="ps-divider" />

        {/* List intro */}
        <p className="ps-list-intro">To us, luxury means:</p>

        {/* Luxury items */}
        <ul className="ps-luxury-list">
          {luxuryItems.map((item, index) => (
            <li
              key={item.id}
              className="ps-luxury-item"
              style={{ animationDelay: `${0.45 + index * 0.1}s` }}
            >
              <span className="ps-bullet" aria-hidden="true" />
              {item.text}
            </li>
          ))}
        </ul>

        {/* Footer text */}
        <p className="ps-footer-text">{footerText}</p>
      </div>
    </>
  );
};

export default PhilosophySection;
