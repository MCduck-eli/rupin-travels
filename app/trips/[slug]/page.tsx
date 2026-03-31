import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongo.db";
import Trip from "@/models/trip";
import Hero from "./components/hero";
import TripDetails from "./components/trip-details";
import RetHimalay from "./components/rethimalay";
import GallerySection from "./components/photo-gallery";
import InfoAccordion from "./components/accordion";
import CompleteTripInfo from "./components/complate-trip";
import CulturalValues from "./components/culture-value";
import { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const resolvedParams = await params;
    await dbConnect();

    const trip = (await Trip.findOne({
        slug: resolvedParams.slug,
    }).lean()) as any;

    if (!trip) return { title: "Trip Not Found" };

    return {
        title: `${trip.title} | Rupin Travels`,
        description:
            trip.description?.substring(0, 160) ||
            `${trip.title} Check out the full tour details, prices, and itinerary.`,
        openGraph: {
            title: trip.title,
            description: trip.description?.substring(0, 160),
            images: [trip.mainImage || "/visit-banner.png"],
        },
    };
}

async function getTrip(slug: string) {
    await dbConnect();
    const trip = await Trip.findOne({ slug }).lean();
    if (!trip) return null;
    return JSON.parse(JSON.stringify(trip));
}

export default async function Page({ params }: { params: { slug: string } }) {
    const resolvedParams = await params;
    const tripData = await getTrip(resolvedParams.slug);

    if (!tripData) {
        return notFound();
    }

    const trip = tripData as any;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: trip.title,
        image:
            trip.mainImage ||
            `${process.env.NEXT_PUBLIC_BASE_URL}/visit-banner.png`,
        description: trip.description || "Premium travel experience",
        offers: {
            "@type": "Offer",
            price: trip.price || "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
        },
    };

    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Hero data={tripData} />
            <TripDetails data={tripData} />
            <RetHimalay data={tripData} />
            <GallerySection data={tripData.gallery || []} />
            <InfoAccordion data={tripData} />
            <CompleteTripInfo data={tripData} />
            <CulturalValues />
        </main>
    );
}
