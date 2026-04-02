"use client";

import React from "react";
import Link from "next/link";

interface BlogItem {
    id: string;
    title: string;
    slug: string;
    mainImage: string;
    intro: {
        description1: string;
    };
}

interface BlogViewProps {
    blogs: BlogItem[];
}

const BlogView: React.FC<BlogViewProps> = ({ blogs }) => {
    const filteredBlogs = blogs
        ? blogs.filter((blog) => blog.slug !== "first-time-in-india")
        : [];

    return (
        <div className="w-full bg-white py-4">
            <div className="w-[85%] mx-auto bg-[#F4F2EE] rounded-3xl py-6 px-6 md:px-8">
                <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
                    <h2 className="text-lg font-serif text-gray-800 italic tracking-wide">
                        Latest Stories
                    </h2>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                        {filteredBlogs.length} posts
                    </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredBlogs && filteredBlogs.length > 0 ? (
                        filteredBlogs.slice(0, 4).map((blog) => (
                            <Link
                                href={`/blog/${blog.slug}`}
                                key={blog.id}
                                className="group block"
                            >
                                <div className="transition-all duration-300">
                                    <div className="relative w-full h-32 overflow-hidden rounded-xl mb-3 shadow-sm">
                                        <img
                                            src={
                                                blog.mainImage ||
                                                "/placeholder.png"
                                            }
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                                    </div>

                                    <div className="px-1">
                                        <h3 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-[#004D3C] transition-colors line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <div className="mt-2 flex items-center text-[10px] text-gray-400 font-bold uppercase tracking-tighter group-hover:text-black transition-colors">
                                            Read —{" "}
                                            <span className="ml-1">→</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-6 text-gray-400 text-xs italic">
                            No stories yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogView;
