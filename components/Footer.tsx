"use client";

import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer
            className="w-full py-12 px-6 md:px-16 border-t border-white/10"
            style={{ backgroundColor: "#3f3e38" }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
                    <div className="text-center md:text-left space-y-4">
                        <h3
                            className="text-white text-xl tracking-[0.1em] uppercase"
                            style={{
                                fontFamily:
                                    "'Beautifully Delicious', sans-serif",
                            }}
                        >
                            RESERVATIONS OFFICE
                        </h3>
                        <div
                            className="text-white/90 text-lg space-y-1 font-light"
                            style={{ fontFamily: "'Higuen', serif" }}
                        >
                            <p>Los Angeles, CA</p>
                            <p>+1-805-285-3237</p>
                            <p>Info@RupinTravels.com</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-y-6">
                        <h3
                            className="text-white text-xl tracking-[0.1em] uppercase border border-white/20 px-8 py-2 rounded-lg"
                            style={{
                                fontFamily:
                                    "'Beautifully Delicious', sans-serif",
                            }}
                        >
                            FOLLOW US
                        </h3>
                        <div className="flex gap-6 text-white">
                            <Link
                                href="#"
                                className="hover:opacity-80 transition-opacity"
                            >
                                <Facebook size={28} fill="currentColor" />
                            </Link>
                            <Link
                                href="#"
                                className="hover:opacity-80 transition-opacity"
                            >
                                <Twitter size={28} fill="currentColor" />
                            </Link>
                            <Link
                                href="#"
                                className="hover:opacity-80 transition-opacity"
                            >
                                <Instagram size={28} />
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-center"></div>
                    <div className="flex flex-col items-center md:items-end">
                        <Link
                            href={"/contact"}
                            className="text-white text-xl tracking-widest uppercase border border-white/20 px-10 py-3 rounded-lg hover:bg-white/5 transition-all"
                            style={{
                                fontFamily:
                                    "'Beautifully Delicious', sans-serif",
                            }}
                        >
                            CONTACT US
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
