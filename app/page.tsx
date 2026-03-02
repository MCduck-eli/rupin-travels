import ClientTestimonials from "@/components/ClientTestimonials";
import ExperienceSection from "@/components/ExperienceSection";
import HeroSection from "@/components/HeroSection";
import HighlightedTrips from "@/components/HighlightedTrips";
import InThePress from "@/components/InThePress";
import PhilosophySection from "@/components/PhilosophySection";
import WhoSection from "@/components/WhoSection";

export default function Index() {
    return (
        <>
            <HeroSection videoSrc="/herobg.mp4" />
            <PhilosophySection />
            <ExperienceSection imageSrc="villa.jpg" imageAlt="villa" />
            <HighlightedTrips />
            <WhoSection />
            <InThePress />
            <ClientTestimonials />
        </>
    );
}
