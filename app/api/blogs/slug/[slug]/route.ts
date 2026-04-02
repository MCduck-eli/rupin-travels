import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongo.db";
import { Blog } from "@/models/blog";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> },
) {
    try {
        await dbConnect();
        const { slug } = await params;
        const blog = await Blog.findOne({ slug: slug });

        if (!blog) {
            return NextResponse.json(
                { success: false, error: "Blog topilmadi" },
                { status: 404 },
            );
        }

        return NextResponse.json({ success: true, data: blog });
    } catch (error: any) {
        console.error("Slug API Error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 },
        );
    }
}
