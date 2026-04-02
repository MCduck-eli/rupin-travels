import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongo.db";
import { Blog } from "@/models/blog";

export async function GET() {
    try {
        await dbConnect();
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: blogs });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Server error" },
            { status: 500 },
        );
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const existingBlog = await Blog.findOne({ slug: body.slug });
        if (existingBlog) {
            return NextResponse.json(
                { success: false, error: "Bu URL slug band, boshqa tanlang" },
                { status: 400 },
            );
        }

        const newBlog = await Blog.create(body);
        return NextResponse.json(
            { success: true, data: newBlog },
            { status: 201 },
        );
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 },
        );
    }
}
