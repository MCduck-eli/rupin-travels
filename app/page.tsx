import ClientTestimonials from "@/components/ClientTestimonials";
import ExperienceSection from "@/components/ExperienceSection";
import HeroSection from "@/components/HeroSection";
import HighlightedTrips from "@/components/HighlightedTrips";
import InThePress from "@/components/InThePress";
import PhilosophySection from "@/components/PhilosophySection";
import WhoSection from "@/components/WhoSection";
import dbConnect from "@/lib/mongo.db";
import HomeSettings from "@/models/homeSettings";

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
        </>
    );
}
