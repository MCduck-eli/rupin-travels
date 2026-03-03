"use client";
import React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";

export default function EditContactButton() {
    return (
        <Link
            href="/admin/contact"
            className="flex items-center gap-2 px-4 py-3 border border-[#004D3C] rounded-xl text-[#004D3C] hover:bg-gray-50 transition-all font-medium text-sm"
        >
            <Phone size={18} />
            <span>Edit Contact</span>
        </Link>
    );
}
