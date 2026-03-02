"use client";

import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

interface OfficeDetail {
    label: string;
    value: string;
    href?: string;
}

interface SocialLink {
    id: number;
    label: string;
    href: string;
    Icon: React.FC<{ size?: number; strokeWidth?: number }>;
}

const OFFICE_DETAILS: OfficeDetail[] = [
    { label: "Address", value: "Los Angeles, CA" },
    { label: "Phone", value: "+1-805-285-3237", href: "tel:+18052853237" },
    {
        label: "Email",
        value: "Info@RupinTravles.com",
        href: "mailto:Info@RupinTravles.com",
    },
];

const SOCIAL_LINKS: SocialLink[] = [
    { id: 1, label: "Facebook", href: "#", Icon: Facebook },
    { id: 2, label: "Twitter", href: "#", Icon: Twitter },
    { id: 3, label: "Instagram", href: "#", Icon: Instagram },
];

const COPPER = "#D98324";
const BG = "#424141";

const Footer: React.FC = () => {
    return (
        <footer
            className="w-full py-16 px-6 md:px-12 lg:px-24 text-center md:text-left"
            style={{ backgroundColor: BG }}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
                {/* 1. Reservations Office */}
                <div className="flex flex-col items-center md:items-start">
                    <h3
                        className="text-lg tracking-[0.2em] font-medium mb-6 uppercase"
                        style={{ color: COPPER, fontFamily: "sans-serif" }}
                    >
                        Reservations Office
                    </h3>
                    <div
                        className="flex flex-col space-y-2 text-white text-base md:text-lg italic"
                        style={{ fontFamily: "Georgia, serif" }}
                    >
                        {OFFICE_DETAILS.map((detail) =>
                            detail.href ? (
                                <a
                                    key={detail.label}
                                    href={detail.href}
                                    className="hover:opacity-70 transition-opacity"
                                >
                                    {detail.value}
                                </a>
                            ) : (
                                <p key={detail.label}>{detail.value}</p>
                            ),
                        )}
                    </div>
                </div>

                {/* 2. Hours & Travel Help Combined for Desktop */}
                <div className="flex flex-col items-center md:items-start space-y-10">
                    <div>
                        <h3
                            className="text-lg tracking-[0.2em] font-medium mb-4 uppercase"
                            style={{ color: COPPER, fontFamily: "sans-serif" }}
                        >
                            Hours
                        </h3>
                        <p
                            className="text-white text-base md:text-lg italic"
                            style={{ fontFamily: "Georgia, serif" }}
                        >
                            M-F - 9:00 AM TO 6:00 PM PST
                        </p>
                    </div>
                    <div>
                        <h3
                            className="text-lg tracking-[0.2em] font-medium mb-4 uppercase"
                            style={{ color: COPPER, fontFamily: "sans-serif" }}
                        >
                            Travel Help
                        </h3>
                        <a
                            href="#faqs"
                            className="text-white text-base md:text-lg italic hover:opacity-70 transition-opacity"
                            style={{ fontFamily: "Georgia, serif" }}
                        >
                            FAQs
                        </a>
                    </div>
                </div>

                {/* 3. Zoom Section */}
                <div className="flex flex-col items-center md:items-start">
                    <h3
                        className="text-lg tracking-[0.1em] font-medium leading-tight mb-4 uppercase"
                        style={{ color: COPPER, fontFamily: "sans-serif" }}
                    >
                        Make Sure to Join Us
                        <br className="hidden md:block" />
                        on Zoom
                    </h3>
                    <p
                        className="text-base md:text-lg italic"
                        style={{ color: COPPER, fontFamily: "Georgia, serif" }}
                    >
                        next Zoom call - <br className="md:hidden" />
                        <span className="not-italic text-white">
                            ds99990999
                        </span>
                    </p>
                </div>

                {/* 4. Follow Us */}
                <div className="flex flex-col items-center md:items-start">
                    <h3
                        className="text-lg tracking-[0.2em] font-medium mb-6 uppercase"
                        style={{ color: COPPER, fontFamily: "sans-serif" }}
                    >
                        Follow Us
                    </h3>
                    <div className="flex gap-6">
                        {SOCIAL_LINKS.map((social) => (
                            <a
                                key={social.id}
                                href={social.href}
                                className="text-white hover:scale-110 transition-transform"
                                aria-label={social.label}
                            >
                                <social.Icon size={28} strokeWidth={1.2} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 text-center">
                <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
                    © 2026 Rupin Travels. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
