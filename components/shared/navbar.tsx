"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "HimalayanStillness", href: "/himalay" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
];

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!document.head.querySelector('[href*="Playfair"]')) {
            const fontLink = document.createElement("link");
            fontLink.rel = "stylesheet";
            fontLink.href =
                "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Cormorant+Garamond:wght@400&display=swap";
            document.head.appendChild(fontLink);
        }
    }, []);

    return (
        <nav className="sticky-nav">
            <style>{`
                .sticky-nav {
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    background-color: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(8px);
                    border-bottom: 1px solid #e8e4de;
                    width: 100%;
                }

                .nav-inner {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0.9rem 1.5rem;
                    position: relative;
                }

                .logo {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.2rem;
                    color: #1a1a1a;
                    fontWeight: bold;
                    text-decoration: none;
                }

                .nav-links-wrapper {
                    display: flex;
                }

                .rp-nav-link {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 0.72rem;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: #1a1a1a;
                    padding: 0 1.1rem;
                    border-right: 1px solid #d0ccc5;
                    cursor: pointer;
                    transition: color 0.2s;
                    white-space: nowrap;
                    text-decoration: none;
                }

                .rp-nav-link:last-child { border-right: none; }
                .rp-nav-link:hover { color: #b8933a; }

                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 5px;
                    position: absolute;
                    right: 20px;
                    color: #1a1a1a;
                }

                @media (max-width: 850px) {
                    .mobile-menu-btn { display: block; }
                    .nav-inner { justify-content: flex-start; }
                    
                    .nav-links-wrapper {
                        display: ${isMenuOpen ? "flex" : "none"};
                        flex-direction: column;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        width: 100%;
                        background: white;
                        padding: 1rem 0;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.05);
                    }

                    .rp-nav-link {
                        border-right: none;
                        border-bottom: 1px solid #f0f0f0;
                        padding: 1.2rem !important;
                        text-align: center;
                    }
                }
            `}</style>

            <div className="nav-inner">
                <Link href="/" className="logo">
                    Rupin
                </Link>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        {isMenuOpen ? (
                            <path d="M18 6L6 18M6 6l12 12" />
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                <div className="nav-links-wrapper">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="rp-nav-link"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
