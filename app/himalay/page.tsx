import InfoAccordion from "./components/accordion";
import Hero from "./components/hero";
import ItinerarySection from "./components/linetary-section";
import GallerySection from "./components/photo-gallery";
import RetHimalay from "./components/rethimalay";
import TripDetails from "./components/trip-details";

export default function Page() {
    return (
        <>
            <Hero />
            <TripDetails />
            <RetHimalay />
            <GallerySection />
            <InfoAccordion />
            <ItinerarySection />
        </>
    );
}
