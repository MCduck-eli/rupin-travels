"use client";

import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer
            className="w-full py-16 px-6 md:px-16"
            style={{ backgroundColor: "#4A4643" }}
        >
            <div className="max-w-7xl mx-auto relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
                    <div className="text-center md:text-left space-y-4">
                        <h3
                            className="text-[#D4A843] text-lg tracking-[0.15em] uppercase"
                            style={{
                                fontFamily:
                                    "'Beautifully Delicious', sans-serif",
                            }}
                        >
                            RESERVATIONS OFFICE
                        </h3>
                        <div
                            className="text-[#D4A843] text-lg space-y-1"
                            style={{ fontFamily: "'Higuen', serif" }}
                        >
                            <p>Los Angeles, CA</p>
                            <p>+1-805-285-3237</p>
                            <p className="lowercase italic">
                                Info@RupinTravels.com
                            </p>
                        </div>
                        <div className="pt-4">
                            <h3
                                className="text-[#D4A843] text-lg tracking-[0.15em] uppercase mb-2"
                                style={{
                                    fontFamily:
                                        "'Beautifully Delicious', sans-serif",
                                }}
                            >
                                HOURS
                            </h3>
                            <p
                                className="text-[#D4A843] text-lg"
                                style={{ fontFamily: "'Higuen', serif" }}
                            >
                                M-F - 9 - 6:00 PM PST
                            </p>
                        </div>
                    </div>

                    <div className="text-center md:text-left">
                        <h3
                            className="text-[#D4A843] text-lg tracking-[0.15em] uppercase mb-4"
                            style={{
                                fontFamily:
                                    "'Beautifully Delicious', sans-serif",
                            }}
                        >
                            TRAVEL HELP
                        </h3>
                        <a
                            href="#faqs"
                            className="text-[#D4A843] text-lg hover:underline"
                            style={{ fontFamily: "'Higuen', serif" }}
                        >
                            FAQs
                        </a>
                    </div>

                    <div className="flex flex-col items-center relative pt-4 lg:-mt-10">
                        <div className="bg-[#D4A843] p-6 rounded-xl relative mb-4 text-center shadow-lg">
                            <h3
                                className="text-[#4A4643] text-lg font-bold leading-tight uppercase mb-2"
                                style={{
                                    fontFamily:
                                        "'Beautifully Delicious', sans-serif",
                                }}
                            >
                                MAKE SURE TO JOIN US <br /> ON ZOOM
                            </h3>
                            <p
                                className="text-[#4A4643] text-sm italic"
                                style={{ fontFamily: "'Higuen', serif" }}
                            >
                                next Zoom call -{" "}
                                <span className="not-italic font-bold tracking-wider">
                                    &lt;ds99990999&gt;
                                </span>
                            </p>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-[#D4A843]"></div>
                        </div>
                    </div>

                    <div className="text-center md:text-right flex flex-col items-center md:items-end space-y-8">
                        <div>
                            <h3
                                className="text-[#D4A843] text-lg tracking-[0.15em] uppercase"
                                style={{
                                    fontFamily:
                                        "'Beautifully Delicious', sans-serif",
                                }}
                            >
                                CONTACT US
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <h3
                                className="text-[#D4A843] text-lg tracking-[0.15em] uppercase"
                                style={{
                                    fontFamily:
                                        "'Beautifully Delicious', sans-serif",
                                }}
                            >
                                FOLLOW US
                            </h3>
                            <div className="flex gap-4 justify-center md:justify-end text-white">
                                <Link
                                    href="#"
                                    className="bg-white p-1 rounded-sm"
                                >
                                    <Facebook
                                        size={24}
                                        className="text-[#4A4643]"
                                        fill="currentColor"
                                    />
                                </Link>
                                <Link
                                    href="#"
                                    className="bg-white p-1 rounded-sm"
                                >
                                    <Twitter
                                        size={24}
                                        className="text-[#4A4643]"
                                        fill="currentColor"
                                    />
                                </Link>
                                <Link
                                    href="#"
                                    className="bg-white p-1 rounded-sm"
                                >
                                    <Instagram
                                        size={24}
                                        className="text-[#4A4643]"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
