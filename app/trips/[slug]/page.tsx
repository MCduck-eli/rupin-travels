import { notFound } from "next/navigation";

// Komponentlaringizni import qiling
import Hero from "./components/hero";
import TripDetails from "./components/trip-details";
import RetHimalay from "./components/rethimalay";
import GallerySection from "./components/photo-gallery";
import InfoAccordion from "./components/accordion";
import ItinerarySection from "./components/linetary-section";
import dbConnect from "@/lib/mongo.db";
import Trip from "@/models/trip";

async function getTrip(slug: string) {
    await dbConnect();
    const trip = await Trip.findOne({ slug }).lean();
    return trip ? JSON.parse(JSON.stringify(trip)) : null;
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const trip = await getTrip(slug);

    if (!trip) return notFound();

    return (
        <>
            <Hero data={trip} />
            <TripDetails data={trip} />
            <RetHimalay data={trip} />
            <GallerySection data={trip.gallery} />
            <InfoAccordion data={trip} />
            <ItinerarySection itinerary={trip.itinerary} />
        </>
    );
}
