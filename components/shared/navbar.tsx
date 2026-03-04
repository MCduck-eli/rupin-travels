"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [trips, setTrips] = useState<
        { title: string; slug: string; _id: string }[]
    >([]);

    useEffect(() => {
        fetch("/api/trips")
            .then((res) => res.json())
            .then((res) => {
                if (res.success) setTrips(res.data);
            })
            .catch((err) => console.error("Trips fetch error:", err));

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
                    font-weight: bold;
                    text-decoration: none;
                }

                .nav-links-wrapper {
                    display: flex;
                }

                .nav-item-container {
                    position: relative;
                    display: flex;
                    align-items: center;
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
                    display: flex;
                    align-items: center;
                    height: 100%;
                }

                .nav-item-container:last-child .rp-nav-link { border-right: none; }
                .rp-nav-link:hover { color: #b8933a; }

                .dropdown-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    background: white;
                    min-width: 240px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(10px);
                    transition: all 0.3s ease;
                    border: 1px solid #e8e4de;
                }

                .nav-item-container:hover .dropdown-menu {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }

                .dropdown-link {
                    display: block;
                    padding: 1rem 1.5rem;
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 0.75rem;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #1a1a1a;
                    text-decoration: none;
                    border-bottom: 1px solid #f5f2ed;
                    transition: background 0.2s;
                }

                .dropdown-link:last-child { border-bottom: none; }
                .dropdown-link:hover { background: #fcfaf7; color: #b8933a; }

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

                    .nav-item-container { flex-direction: column; width: 100%; }
                    .rp-nav-link {
                        border-right: none;
                        border-bottom: 1px solid #f0f0f0;
                        padding: 1.2rem !important;
                        text-align: center;
                        width: 100%;
                        justify-content: center;
                    }
                    .dropdown-menu {
                        position: static;
                        opacity: 1;
                        visibility: visible;
                        transform: none;
                        width: 100%;
                        box-shadow: none;
                        border: none;
                        background: #fcfaf7;
                        display: ${isMenuOpen ? "block" : "none"};
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
                    <div className="nav-item-container">
                        <Link
                            href="/"
                            className="rp-nav-link"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                    </div>

                    <div className="nav-item-container">
                        <span className="rp-nav-link">Experiences</span>
                        <div className="dropdown-menu">
                            {trips.length > 0 ? (
                                trips.map((trip) => (
                                    <Link
                                        key={trip._id}
                                        href={`/trips/${trip.slug}`}
                                        className="dropdown-link"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {trip.title}
                                    </Link>
                                ))
                            ) : (
                                <>
                                    <Link
                                        href="/trips/himalayan-stillness"
                                        className="dropdown-link"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Himalayan Experiences
                                    </Link>
                                    <Link
                                        href="/trips/soulful-south"
                                        className="dropdown-link"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Soulful South
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="nav-item-container">
                        <Link
                            href="/testimonials"
                            className="rp-nav-link"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Testimonials
                        </Link>
                    </div>

                    <div className="nav-item-container">
                        <Link
                            href="/about"
                            className="rp-nav-link"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About Us
                        </Link>
                    </div>

                    <div className="nav-item-container">
                        <Link
                            href="/contact"
                            className="rp-nav-link"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
