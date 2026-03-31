import ClientTestimonials from "@/components/ClientTestimonials";
import ExperienceSection from "@/components/ExperienceSection";
import HeroSection from "@/components/HeroSection";
import HighlightedTrips from "@/components/HighlightedTrips";
import InThePress from "@/components/InThePress";
import PhilosophySection from "@/components/PhilosophySection";
import WhoSection from "@/components/WhoSection";
import dbConnect from "@/lib/mongo.db";
import HomeSettings from "@/models/homeSettings";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    await dbConnect();
    const settings = await HomeSettings.findOne().lean();

    return {
        title: settings?.heroTitle || "Rupin Travels | Luxury Hotels & Tours",
        description:
            settings?.philosophyContent?.substring(0, 160) ||
            "Explore premium hotels and unforgetable journeys with Rupin Travels.",
        openGraph: {
            title: settings?.heroTitle,
            description: settings?.heroSubtitle,
            images: ["/visit-banner.png"],
        },
    };
}

export default async function Index() {
    await dbConnect();

    const settings = await HomeSettings.findOne().lean();
    const data = JSON.parse(JSON.stringify(settings));

    return (
        <>
            <HeroSection
                videoSrc={data?.heroVideoUrl || "/herobg.mp4"}
                title={data?.heroTitle}
                subtitle={data?.heroSubtitle}
            />

            <PhilosophySection
                tagline={data?.philosophyTagline}
                title={data?.philosophyTitle}
                content={data?.philosophyContent}
            />

            <ExperienceSection />

            <HighlightedTrips
                title={data?.tripsSectionTitle}
                subtitle={data?.tripsSectionSubtitle}
                trips={data?.highlightedTrips || []}
            />

            <WhoSection />
            <InThePress />
            <ClientTestimonials />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "TravelAgency",
                        name: "Rupin Travels",
                        image: "https://rupin-travels.vercel.app/visit-banner.png",
                        description:
                            data?.philosophyContent ||
                            "Premium hotel and travel services.",
                        url: "https://rupin-travels.vercel.app",
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: "209 Condari Ave, Torrance",
                            addressLocality: "California",
                            addressRegion: "CA",
                            postalCode: "90502",
                            addressCountry: "US",
                        },
                        priceRange: "$$$",
                        telephone: "+998901234567",
                    }),
                }}
            />
        </>
    );
}
