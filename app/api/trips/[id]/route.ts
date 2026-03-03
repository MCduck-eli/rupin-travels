import dbConnect from "@/lib/mongo.db";
import Trip from "@/models/trip";
import { NextRequest, NextResponse } from "next/server";

// GET funksiyasi
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }, // Params endi Promise deb e'lon qilindi
) {
    try {
        await dbConnect();

        // 1. Paramsni await orqali kutib olamiz
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { success: false, error: "ID kiritilmagan" },
                { status: 400 },
            );
        }

        const trip = await Trip.findById(id);

        if (!trip) {
            console.log("Bazada bunday ID li safar yo'q:", id);
            return NextResponse.json(
                { success: false, error: "Safar topilmadi" },
                { status: 404 },
            );
        }

        return NextResponse.json({ success: true, data: trip });
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 },
        );
    }
}

// PUT funksiyasi
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }, // Bu yerda ham Promise
) {
    try {
        await dbConnect();
        const { id } = await params; // To'g'ri await qilish
        const body = await request.json();
        const updatedTrip = await Trip.findByIdAndUpdate(id, body, {
            new: true,
        });
        return NextResponse.json({ success: true, data: updatedTrip });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 },
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        await dbConnect();
        const { id } = await params; // To'g'ri await qilish
        await Trip.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "O'chirildi" });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 },
        );
    }
}
