import dbConnect from "@/lib/mongo.db";
import Trip from "@/models/trip";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        await dbConnect();

        const resolvedParams = await params;
        const id = resolvedParams.id;

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

export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        await dbConnect();
        const { id } = await params;
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
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        await dbConnect();
        const { id } = await params;
        await Trip.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "O'chirildi" });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 },
        );
    }
}
