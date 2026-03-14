import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongo.db";
import Trip from "@/models/trip";
import Hero from "./components/hero";
import TripDetails from "./components/trip-details";
import RetHimalay from "./components/rethimalay";
import GallerySection from "./components/photo-gallery";
import InfoAccordion from "./components/accordion";
import ItinerarySection from "./components/linetary-section";
import CompleteTripInfo from "./components/complate-trip";
import CulturalValues from "./components/culture-value";

async function getTrip(slug: string) {
    await dbConnect();
    const trip = await Trip.findOne({ slug }).lean();
    if (!trip) return null;
    return JSON.parse(JSON.stringify(trip));
}

export default async function Page({ params }: { params: { slug: string } }) {
    const resolvedParams = await params;
    const trip = await getTrip(resolvedParams.slug);

    if (!trip) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <Hero data={trip} />
            <TripDetails data={trip} />
            <RetHimalay data={trip} />
            <GallerySection data={trip.gallery || []} />
            <InfoAccordion data={trip} />
            <CompleteTripInfo data={trip} />
            <ItinerarySection itinerary={trip.itinerary || []} />
            <CulturalValues />
        </main>
    );
}
