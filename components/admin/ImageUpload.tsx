"use client";

import { generateUploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";

const UploadDropzone = generateUploadDropzone<OurFileRouter>();

interface ImageUploadProps {
    onChange: (url: string) => void;
    value: string;
}

export const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-4 border-2 border-dashed border-gray-300 p-4 rounded-xl bg-gray-50/50 transition hover:bg-gray-50">
            {value ? (
                <div className="relative w-full aspect-video md:aspect-square max-h-75">
                    <img
                        src={value}
                        alt="Uploaded content"
                        className="w-full h-full object-cover rounded-lg shadow-sm"
                    />
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        const url = res?.[0]?.ufsUrl || res?.[0]?.url;
                        if (url) {
                            onChange(url);
                            alert("Rasm muvaffaqiyatli yuklandi!");
                        }
                    }}
                    onUploadError={(error: Error) => {
                        alert(`Yuklashda xatolik: ${error.message}`);
                    }}
                    appearance={{
                        button: "bg-[#004D3C] border-none after:bg-[#003d30]",
                        label: "text-[#004D3C] hover:text-[#003d30]",
                        container: "border-none bg-transparent",
                    }}
                />
            )}
        </div>
    );
};
