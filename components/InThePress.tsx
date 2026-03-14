import React from "react";

if (
    typeof document !== "undefined" &&
    !document.head.querySelector('[href*="Cormorant"]')
) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
        "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Tenor+Sans&family=Inter:wght@300;400&display=swap";
    document.head.appendChild(link);
}

interface PressCard {
    id: number;
    content: React.ReactNode;
    label: string;
}

interface InThePressProps {
    cards?: PressCard[];
}

const DEFAULT_CARDS: PressCard[] = [
    {
        id: 1,
        label: "First Time in India",
        content: (
            <>
                Blog post on travel
                <br />
                Blog post on travel Blog
                <br />
                post on travel Blog post
                <br />
                on travel
                <br />
                Blog post on travel
                <br />
                Blog post on travel
                <br />
                Blog post on travel
            </>
        ),
    },
    {
        id: 2,
        label: "Mariana's Luxe Travels",
        content: (
            <>
                "Boost your product and service's credibility by adding
                testimonials from your clients. People love recommendations so
                feedback from others who've tried it is invaluable."
            </>
        ),
    },
    {
        id: 3,
        label: "PH Travel Journal",
        content: (
            <>
                Make sure to join us on our next Zoom call
                <br />
                <br />
                Details of the Zoom call
            </>
        ),
    },
];
const MASK_ID = "itp-notch-mask";

const NotchMaskDef: React.FC = () => (
    <svg
        width="0"
        height="0"
        style={{ position: "absolute", overflow: "hidden" }}
        aria-hidden="true"
    >
        <defs>
            <clipPath id={MASK_ID} clipPathUnits="objectBoundingBox">
                <path
                    d="
          M 0.07,0
          L 0.93,0
          Q 1,0 1,0.07
          L 1,0.0
          Q 0.93,0 0.93,0
          M 0.07,0
          Q 0,0 0,0.07

          M 0.07,0
          L 0.93,0
          A 0.07,0.07 0 0 0 1,0.07
          L 1,0.93
          A 0.07,0.07 0 0 0 0.93,1
          L 0.07,1
          A 0.07,0.07 0 0 0 0,0.93
          L 0,0.07
          A 0.07,0.07 0 0 0 0.07,0
          Z
        "
                />
            </clipPath>
            <clipPath id="itp-notch-concave" clipPathUnits="objectBoundingBox">
                <path
                    d="
          M 0.09,0
          L 0.91,0
          A 0.09,0.09 0 0 1 1,0.09
          L 1,0.91
          A 0.09,0.09 0 0 1 0.91,1
          L 0.09,1
          A 0.09,0.09 0 0 1 0,0.91
          L 0,0.09
          A 0.09,0.09 0 0 1 0.09,0
          Z
        "
                />
            </clipPath>
        </defs>
    </svg>
);

const InThePress: React.FC<InThePressProps> = ({ cards = DEFAULT_CARDS }) => {
    return (
        <>
            <NotchMaskDef />

            <style>{`
       .itp-section {
         background-color: #efede7;
         padding: clamp(3rem, 6vw) clamp(1.5rem, 6vw, 5rem); 
         padding-bottom: 2rem;
         }
        .itp-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 5.5vw, 4rem);
          font-weight: 550;
          color: #6f4e37;
          text-align: center;
          line-height: 1.15;
          margin: 0 0 clamp(2rem, 4vw, 3.5rem);
          animation: itp-fadeUp 0.8s ease both;
        }

        /* ── Cards grid ── */
        .itp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.2rem, 2.5vw, 2rem);
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── Card wrapper (handles label below) ── */
        .itp-card-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.1rem;
          opacity: 0;
          animation: itp-fadeUp 0.7s ease forwards;
        }

        /* ── The card itself ── */
        .itp-card {
          width: 80%;
          aspect-ratio: 4 / 5;
          background-color: #A69384;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1.5rem, 3vw, 2.5rem);

          /*
            Concave / notched corners:
            We layer two box-shadows that "fake" the background bleeding into
            the corners, combined with a clip-path that rounds into the card.
            Approach: use a radial-gradient mask at each corner.
          */
          --r: clamp(16px, 2.5vw, 28px);   /* corner notch radius */
          --bg: #F2EFE9;                    /* must match section background */

          border-radius: 4px;

          /* 
            Four corner radial gradients that paint the section bg colour
            into each corner, creating the illusion of inward-curved notches.
          */
          -webkit-mask:
            radial-gradient(circle at 0    0,    transparent var(--r), white calc(var(--r) + 0.5px)) top    left  / 51% 51% no-repeat,
            radial-gradient(circle at 100% 0,    transparent var(--r), white calc(var(--r) + 0.5px)) top    right / 51% 51% no-repeat,
            radial-gradient(circle at 0    100%, transparent var(--r), white calc(var(--r) + 0.5px)) bottom left  / 51% 51% no-repeat,
            radial-gradient(circle at 100% 100%, transparent var(--r), white calc(var(--r) + 0.5px)) bottom right / 51% 51% no-repeat;
          mask:
            radial-gradient(circle at 0    0,    transparent var(--r), white calc(var(--r) + 0.5px)) top    left  / 51% 51% no-repeat,
            radial-gradient(circle at 100% 0,    transparent var(--r), white calc(var(--r) + 0.5px)) top    right / 51% 51% no-repeat,
            radial-gradient(circle at 0    100%, transparent var(--r), white calc(var(--r) + 0.5px)) bottom left  / 51% 51% no-repeat,
            radial-gradient(circle at 100% 100%, transparent var(--r), white calc(var(--r) + 0.5px)) bottom right / 51% 51% no-repeat;
        }

        /* ── Card text ── */
        .itp-card-text {
          font-family: 'Tenor Sans', 'Inter', sans-serif;
          font-size: clamp(0.78rem, 1.4vw, 0.95rem);
          font-weight: 300;
          color: rgba(255,255,255,0.92);
          text-align: center;
          line-height: 1.85;
          letter-spacing: 0.03em;
        }

        /* ── Bottom label ── */
        .itp-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.62rem, 1.1vw, 0.72rem);
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #3a3530;
          text-align: center;
        }

        /* ── Mobile ── */
        @media (max-width: 680px) {
          .itp-grid {
            grid-template-columns: 1fr;
            max-width: 360px;
          }
          .itp-card { aspect-ratio: 3 / 2; }
        }
        @media (min-width: 681px) and (max-width: 900px) {
          .itp-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* ── Keyframes ── */
        @keyframes itp-fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            <section className="itp-section">
                <h2 className="itp-heading">In the Press</h2>

                <div className="itp-grid">
                    {cards.map((card, index) => (
                        <div
                            key={card.id}
                            className="itp-card-wrap"
                            style={{ animationDelay: `${index * 0.13}s` }}
                        >
                            <div className="itp-card">
                                <p className="itp-card-text">{card.content}</p>
                            </div>
                            <span className="itp-label">{card.label}</span>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default InThePress;
