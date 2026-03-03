import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongo.db";
import Trip from "@/models/trip";

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        const newTrip = await Trip.create(body);

        return NextResponse.json(
            { success: true, data: newTrip },
            { status: 201 },
        );
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 },
        );
    }
}

export async function GET() {
    try {
        await dbConnect();
        const trips = await Trip.find({});
        return NextResponse.json({ success: true, data: trips });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 },
        );
    }
}
