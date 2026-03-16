"use client";

import React from "react";

interface PhilosophySectionProps {
    tagline?: string;
    title?: string;
    content?: string;
}

const DEFAULT_TAGLINE =
    "\u201cTravel that transforms \u2013 curated journeys for leaders, entrepreneurs, elite professionals & seniors seeking meaning.";

const PhilosophySection: React.FC<PhilosophySectionProps> = ({
    tagline,
    title,
    content,
}) => {
    return (
        <>
            <style>{`
        .ps-tagline-band {
          background-color: #F8F6F2;
          padding: 4rem 1.5rem;
          text-align: center;
        }
        .ps-tagline {
          font-family: 'Higuen', serif;
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          font-weight: 500;
          color: #1a1510;
          line-height: 1.3;
          max-width: 850px;
          margin: 0 auto;
        }

        .ps-philosophy-band {
          background-color: #3d3530;
          padding: 3.5rem 1.5rem;
        }

        .ps-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .ps-section-header {
          margin-bottom: 1.2rem;
        }

        .ps-label-gold {
          font-family: 'Beautifully Delicious', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.3rem;
          color: #ffbd59;
        }

        .ps-title-white {
          font-family: 'Beautifully Delicious', sans-serif;
          font-size: 2rem;
          color: #ffbd59;
        }

        .ps-divider {
          height: 1px;
          background: rgba(212, 168, 67, 0.3);
          margin: 1.5rem 0;
        }

        .ps-luxury-item {
          font-family: 'Higuen', serif;
          font-size: 1.2rem;
          color: #d4baac;
          line-height: 1.6;
          white-space: pre-line;
        }

        .ps-footer-text {
          font-family: 'Beautifully Delicious', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #ffbd59;
          border-top: 1px solid rgba(184, 154, 103, 0.2);
          padding-top: 1.5rem;
        }
      `}</style>

            <div className="ps-tagline-band">
                <p className="ps-tagline">{tagline || DEFAULT_TAGLINE}</p>
            </div>

            <div className="ps-philosophy-band">
                <div className="ps-container">
                    <div className="ps-section-header">
                        <span className="ps-label-gold">Our Philosophy</span>
                        <h2 className="ps-title-white">Luxury As Intention</h2>
                    </div>

                    <div className="ps-divider" />

                    <div className="ps-luxury-item">
                        {content ||
                            `To us, luxury means:
                        • Time to slow down
                        • Space to think clearly
                        • Access to trusted practitioners
                        • Ethical partnerships
                        • Experiences that stay with you long after you return home`}
                    </div>

                    <p className="ps-footer-text">
                        We design journeys that protect these values.
                    </p>
                </div>
            </div>
        </>
    );
};

export default PhilosophySection;
