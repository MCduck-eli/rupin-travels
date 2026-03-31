import CulturalSupportSection from "./components/cultural-support-section";
import TravelLandingPage from "./components/travel-experence";
import MarineTeamSection from "./components/travel-landing";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Expertise & Cultural Experience | Rupin Travels",
    description:
        "Discover the heart of hospitality with Rupin Travels. Our professional team provides deep cultural insights and premium travel support for an unforgettable journey.",
    keywords: [
        "travel expertise",
        "cultural tourism",
        "Rupin Travels team",
        "premium travel support",
        "authentic experiences",
    ],
    openGraph: {
        title: "Experience the Best with Rupin Travels",
        description:
            "Professional travel support and authentic cultural experiences designed for you.",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
        siteName: "Rupin Travels",
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/visit-banner.png`,
                width: 1200,
                height: 630,
                alt: "Rupin Travels - Professional Team and Cultural Support",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Our Expertise & Cultural Experience | Rupin Travels",
        description:
            "Join us for a journey beyond the ordinary with our expert travel team.",
        images: ["/visit-banner.png"],
    },
};

export default function Page() {
    return (
        <main>
            <MarineTeamSection />
            <TravelLandingPage />
            <CulturalSupportSection />
        </main>
    );
}
