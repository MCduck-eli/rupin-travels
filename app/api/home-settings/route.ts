import dbConnect from "@/lib/mongo.db";
import HomeSettings from "@/models/homeSettings";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const settings = await HomeSettings.findOne({});
        return NextResponse.json(settings || {});
    } catch (error) {
        return NextResponse.json({ error: "Error loading" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const data = await req.json();

        const updatedSettings = await HomeSettings.findOneAndUpdate(
            {},
            {
                $set: {
                    heroVideoUrl: data.heroVideoUrl,
                    heroTitle: data.heroTitle,
                    heroSubtitle: data.heroSubtitle,
                    philosophyTagline: data.philosophyTagline,
                    philosophyTitle: data.philosophyTitle,
                    philosophyContent: data.philosophyContent,
                    tripsSectionTitle: data.tripsSectionTitle,
                    tripsSectionSubtitle: data.tripsSectionSubtitle,
                    highlightedTrips: data.highlightedTrips,
                },
            },
            { upsert: true, new: true, runValidators: true },
        );

        return NextResponse.json(updatedSettings);
    } catch (error) {
        return NextResponse.json(
            { error: "Error while saving" },
            { status: 500 },
        );
    }
}
