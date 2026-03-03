import dbConnect from "@/lib/mongo.db";
import TestimonialSettings from "@/models/testimonialSettings";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    const settings = await TestimonialSettings.findOne({});
    return NextResponse.json(settings || {});
}

export async function POST(req: Request) {
    await dbConnect();
    const data = await req.json();
    const updated = await TestimonialSettings.findOneAndUpdate({}, data, {
        upsert: true,
        new: true,
    });
    return NextResponse.json(updated);
}
