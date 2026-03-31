import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/Footer";
import NextAuthSessionProvider from "@/components/providers/sessionProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "Rupin Travels | Unforgettable trips across USA",
        template: "%s | Rupin Travels",
    },
    description:
        "Travel to the most beautiful parts of USA with Rupin Travels. Premium hotels, convenient tours and 24/7 customer support.",
    keywords: [
        "travel USA",
        "hotel booking tashkent",
        "to travel in USA and hotels",
        "hotel reservation",
        "Rupin Travels",
        "Usa travel",
    ],
    authors: [{ name: "Rupin Travels Team" }],
    creator: "Rupin Travels",

    openGraph: {
        type: "website",
        locale: "en_US",
        url: process.env.NEXT_PUBLIC_BASE_URL || "",
        siteName: "Rupin Travels",
        title: "Rupin Travels - Worldwide Travel and Hotels",
        description: "Book the best hotels and enjoy your trip with us.",
        images: [
            {
                url: "/public/visit-banner.png",
                width: 1200,
                height: 630,
                alt: "Rupin Travels - Travel agency",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Rupin Travels | Travel and Hotels",
        description:
            "A collection of the best tours and hotels across America.",
        images: ["/public/visit-banner.png"],
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
            >
                <NextAuthSessionProvider>
                    <Navbar />
                    <main className="grow">{children}</main>
                    <Footer />
                </NextAuthSessionProvider>
            </body>
        </html>
    );
}
