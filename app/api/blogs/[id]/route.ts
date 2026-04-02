import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongo.db";
import { Blog } from "@/models/blog";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        await dbConnect();
        const { id } = await params;
        const blog = await Blog.findById(id).lean();

        if (!blog) {
            return NextResponse.json(
                { success: false, error: "Blog not found" },
                { status: 404 },
            );
        }
        return NextResponse.json(
            { success: true, data: blog },
            {
                headers: {
                    "Cache-Control": "no-store, max-age=0, must-revalidate",
                    Pragma: "no-cache",
                },
            },
        );
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 },
        );
    }
}
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { $set: body },
            {
                new: true,
                runValidators: true,
                overwrite: false,
            },
        ).lean();

        if (!updatedBlog) {
            return NextResponse.json(
                { success: false, error: "Blog not found" },
                { status: 404 },
            );
        }
        return NextResponse.json(
            { success: true, data: updatedBlog },
            {
                headers: {
                    "Cache-Control": "no-store, max-age=0, must-revalidate",
                },
            },
        );
    } catch (error: any) {
        console.error("PUT xatosi:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 },
        );
    }
}
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        await dbConnect();
        const { id } = await params;
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return NextResponse.json(
                { success: false, error: "Blog not found" },
                { status: 404 },
            );
        }
        return NextResponse.json({
            success: true,
            message: "Deleted successfully",
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 },
        );
    }
}
