"use client";

import React from "react";
import Link from "next/link";
import { Quote } from "lucide-react";

export default function EditTestimonialsButton() {
    return (
        <Link
            href="/admin/testimonials"
            className="flex items-center gap-2 px-4 py-3 border border-[#004D3C] rounded-xl text-[#004D3C] hover:bg-gray-50 transition-all font-medium text-sm"
        >
            <Quote size={18} />
            <span>Edit Testimonials</span>
        </Link>
    );
}
