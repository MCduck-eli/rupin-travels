"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    Edit,
    Trash2,
    Plus,
    ExternalLink,
    BookOpen,
    ArrowLeft,
    Loader2,
    Settings,
} from "lucide-react";
import { IBlog } from "@/types/trip";

export default function AdminBlogList() {
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const res = await fetch("/api/blogs", {
                cache: "no-store",
                headers: {
                    "Cache-Control": "no-cache",
                },
            });
            const data = await res.json();
            if (data.success) {
                setBlogs(data.data);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this blog post?")) {
            try {
                const res = await fetch(`/api/blogs/${id}`, {
                    method: "DELETE",
                });
                const data = await res.json();
                if (data.success) {
                    setBlogs(blogs.filter((b) => b._id !== id));
                    alert("Blog post deleted successfully.");
                }
            } catch (error) {
                alert("An error occurred while deleting.");
            }
        }
    };

    if (loading)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-3">
                <Loader2 className="animate-spin text-[#004D3C]" size={32} />
                <p className="font-serif italic text-[#004D3C]">
                    Loading Stories...
                </p>
            </div>
        );

    return (
        <div className="p-8 bg-[#F7F5F2] min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <Link
                        href="/admin/dashboard"
                        className="text-[#004D3C] flex items-center gap-2 text-sm mb-2 hover:underline"
                    >
                        <ArrowLeft size={16} /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-serif text-[#004D3C] flex items-center gap-3">
                        <BookOpen /> Blog Management
                    </h1>
                </div>

                <div className="flex gap-3">
                    <Link
                        href="/admin/blog/main-editor"
                        className="bg-amber-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-amber-700 transition-all shadow-lg active:scale-95"
                    >
                        <Settings size={20} /> Edit Main Story
                    </Link>

                    <Link
                        href="/admin/blog/new"
                        className="bg-[#004D3C] text-white px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-[#003d30] transition-all shadow-lg active:scale-95"
                    >
                        <Plus size={20} /> Create New Blog
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {blogs.filter((b) => b.slug !== "first-time-in-india")
                    .length === 0 ? (
                    <div className="bg-white p-20 text-center rounded-3xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-serif italic">
                            No blog posts found.
                        </p>
                    </div>
                ) : (
                    blogs
                        .filter((blog) => blog.slug !== "first-time-in-india")
                        .map((blog) => (
                            <div
                                key={blog._id}
                                className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col md:flex-row justify-between items-center shadow-sm hover:shadow-md transition-all group"
                            >
                                <div className="space-y-1">
                                    <h3 className="text-xl font-serif text-black group-hover:text-[#004D3C]">
                                        {blog.title}
                                    </h3>
                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                        Slug: {blog.slug}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/blog/${blog.slug}`}
                                        target="_blank"
                                        className="p-2 text-gray-400 hover:text-[#004D3C]"
                                    >
                                        <ExternalLink size={20} />
                                    </Link>
                                    <Link
                                        href={`/admin/blog/edit/${blog._id}`}
                                        className="p-2 text-gray-400 hover:text-amber-600"
                                    >
                                        <Edit size={20} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(blog._id!)}
                                        className="p-2 text-gray-400 hover:text-red-600"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
}
