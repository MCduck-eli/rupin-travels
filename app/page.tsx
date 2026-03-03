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

    return (
        <>
            <HeroSection videoSrc={settings?.heroVideo || "/herobg.mp4"} />

            <PhilosophySection
                tagline={settings?.philosophyTagline}
                title={settings?.philosophyTitle}
                content={settings?.philosophyContent}
            />
            <ExperienceSection />

            <HighlightedTrips />

            <WhoSection />

            <InThePress />

            <ClientTestimonials />
        </>
    );
}
