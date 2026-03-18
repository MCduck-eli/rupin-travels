"use client";

import React from "react";

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

const InThePress: React.FC<InThePressProps> = ({ cards = DEFAULT_CARDS }) => {
    return (
        <>
            <style>{`
       .itp-section {
         background-color: #efede7;
         padding: clamp(3rem, 6vw) clamp(1.5rem, 6vw, 5rem); 
         padding-bottom: 2rem;
         }
        .itp-heading {
          /* font-family olib tashlandi, globals.css dan h2 qoidasini oladi */
          font-size: clamp(2.2rem, 4.5vw, 3.4rem);
          font-weight: 400;
          color: #6f4e37;
          text-align: center;
          line-height: 1.15;
          margin: 0 0 clamp(2rem, 4vw, 3.5rem);
          animation: itp-fadeUp 0.8s ease both;
        }

        .itp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.2rem, 2.5vw, 2rem);
          max-width: 1100px;
          margin: 0 auto;
        }

        .itp-card-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.1rem;
          opacity: 0;
          animation: itp-fadeUp 0.7s ease forwards;
        }

        .itp-card {
          width: 80%;
          aspect-ratio: 4 / 5;
          background-color: #A69384;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1.5rem, 3vw, 2.5rem);

          --r: clamp(16px, 2.5vw, 28px);   
          --bg: #F2EFE9;                    

          border-radius: 4px;

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

        .itp-card-text {
          /* font-family olib tashlandi, globals.css dan div qoidasini oladi */
          font-size: clamp(0.78rem, 1.4vw, 0.95rem);
          font-weight: 300;
          color: rgba(255,255,255,0.92);
          text-align: center;
          line-height: 1.85;
          letter-spacing: 0.03em;
        }

        .itp-label {
          /* font-family olib tashlandi, globals.css dan span qoidasini oladi */
          font-size: clamp(0.7rem, 1.2vw, 0.85rem);
          font-weight: 400;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #3a3530;
          text-align: center;
        }

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
                                <div className="itp-card-text">
                                    {card.content}
                                </div>
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
