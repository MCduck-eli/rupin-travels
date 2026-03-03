import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongo.db";
import ContactSettings from "@/models/contactSettings";

export async function GET() {
    await dbConnect();
    const settings = await ContactSettings.findOne();
    return NextResponse.json(settings || {});
}

export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();
    const settings = await ContactSettings.findOneAndUpdate({}, body, {
        upsert: true,
        new: true,
    });
    return NextResponse.json(settings);
}
