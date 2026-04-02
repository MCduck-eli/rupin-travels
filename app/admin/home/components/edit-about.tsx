"use client";

import Link from "next/link";
import { Info } from "lucide-react";

export default function EditAboutButton() {
    return (
        <Link
            href="/admin/about"
            className="flex items-center gap-2 px-4 py-3 border border-[#004D3C] rounded-xl text-[#004D3C] hover:bg-gray-50 transition-all font-medium text-sm"
        >
            <Info size={18} />
            <span>Edit About Us</span>
        </Link>
    );
}
