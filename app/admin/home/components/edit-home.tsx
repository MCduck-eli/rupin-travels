"use client";

import React from "react";
import Link from "next/link";
import { Settings } from "lucide-react";

export default function EditHomeButton() {
    return (
        <Link
            href="/admin/home"
            className="border-2 border-[#004D3C] text-[#004D3C] px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-[#004D3C] hover:text-white transition-all shadow-sm font-medium"
        >
            <Settings size={20} /> Edit Home Page
        </Link>
    );
}
