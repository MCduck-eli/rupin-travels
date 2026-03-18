"use client";

import React from "react";

const ExperienceSection: React.FC = () => {
    const priorityItems = [
        { id: 1, text: "Small groups" },
        { id: 2, text: "Thoughtful pacing" },
        { id: 3, text: "Authentic local partnerships" },
        { id: 4, text: "Personal attention" },
        { id: 5, text: "Space for integration" },
    ];

    return (
        <>
            <style>{`
        .es-section {
          background-color: #6e8e96;
          padding: 2.5rem clamp(1.5rem, 7vw, 6rem);
        }

        .es-heading {
          /* font-family olib tashlandi, h2 bo'lgani uchun globals.css dan oladi */
          font-size: clamp(2.2rem, 4.5vw, 3.5rem);
          font-weight: 400;
          color: #ffbd59;
          text-align: center;
          line-height: 1.4;
          margin: 0 0 1.4rem;
          animation: es-fadeUp 0.8s ease both;
        }

        .es-body {
          /* font-family olib tashlandi, p bo'lgani uchun globals.css dan oladi */
          font-size: clamp(1.1rem, 2.2vw, 1.45rem); 
          color: #ffffff;
          text-align: center;
          line-height: 1.6;
          letter-spacing: -0.01em; 
          max-width: 900px;
          margin: 0 auto 1.8rem;
          opacity: 0.95;
        }

        .es-bottom {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: clamp(2rem, 5vw, 4rem);
        }

        .es-text-col {
          flex: 1;
          max-width: 420px;
          min-width: 0;
          padding-left: clamp(0px, 4vw, 3rem);
        }

        .es-list-intro {
          /* font-family olib tashlandi, p bo'lgani uchun globals.css dan oladi */
          font-size: clamp(0.88rem, 1.5vw, 1rem);
          color: rgba(255,255,255,0.82);
          margin: 0 0 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
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
          /* font-family olib tashlandi, li bo'lgani uchun globals.css dan oladi */
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          color: rgba(255,255,255,0.88);
          animation: es-fadeUp 0.65s ease forwards;
        }

        .es-bullet {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.7);
          flex-shrink: 0;
        }

        .es-image-col {
          flex-shrink: 0;
          width: clamp(240px, 28vw, 380px);
          animation: es-scaleIn 0.9s ease both;
        }

        .es-image-wrap {
          width: 100%;
          aspect-ratio: 1.4;
          overflow: hidden;
          position: relative;
          clip-path: polygon(
              20% 0%, 80% 0%, 
              100% 20%, 100% 80%, 
              80% 100%, 20% 100%, 
              0% 80%, 0% 20%
          );
          border-radius: 40px; 
        }

        .es-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 640px) {
          .es-bottom { flex-direction: column; }
          .es-text-col { padding-left: 0; }
        }

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
                                    <span className="es-bullet" />
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="es-image-col">
                        <div className="es-image-wrap">
                            <img src="/villa.jpg" alt="Experience" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ExperienceSection;
