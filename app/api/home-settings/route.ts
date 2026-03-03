import dbConnect from "@/lib/mongo.db";
import HomeSettings from "@/models/homeSettings";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    const settings = await HomeSettings.findOne();
    return NextResponse.json(settings || {});
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const data = await req.json();
        const updatedSettings = await HomeSettings.findOneAndUpdate({}, data, {
            upsert: true,
            new: true,
        });

        return NextResponse.json(updatedSettings);
    } catch (error) {
        return NextResponse.json(
            { error: "Saqlashda xatolik" },
            { status: 500 },
        );
    }
}
