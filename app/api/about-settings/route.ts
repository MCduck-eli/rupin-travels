import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongo.db";
import AboutSettings from "@/models/aboutSettings";

export async function GET() {
    await dbConnect();
    const settings = await AboutSettings.findOne();
    return NextResponse.json(settings || {});
}

export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();
    const settings = await AboutSettings.findOneAndUpdate({}, body, {
        upsert: true,
        new: true,
    });
    return NextResponse.json(settings);
}
