"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { ImageIcon, Info, Upload, X, Lock, Loader2 } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";

interface BlogHeroFormProps {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const BlogHeroForm: React.FC<BlogHeroFormProps> = ({
    formData,
    setFormData,
}) => {
    const [preview, setPreview] = useState<string | null>(null);
    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onClientUploadComplete: (res) => {
            if (res && res[0]) {
                const uploadedUrl = res[0].url;
                console.log("Yuklangan rasm URL:", uploadedUrl);
                setFormData((prev: any) => {
                    const newData = { ...prev, mainImage: uploadedUrl };
                    console.log("Yangi state (Hero ichida):", newData);
                    return newData;
                });

                setPreview(uploadedUrl);
            }
        },
        onUploadError: (error: Error) => {
            alert(`Yuklashda xato yuz berdi: ${error.message}`);
        },
    });
    useEffect(() => {
        if (formData?.mainImage) {
            setPreview(formData.mainImage);
        }
    }, [formData?.mainImage]);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPreview(URL.createObjectURL(file));
        try {
            await startUpload([file]);
        } catch (err) {
            console.error("Upload error:", err);
        }
    };

    const removeImage = () => {
        setPreview(null);
        setFormData((prev: any) => ({ ...prev, mainImage: null }));
    };

    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center gap-2 text-[#004D3C] font-bold text-base border-b pb-3">
                <Info size={18} /> Hero & Basic Info
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <ImageIcon size={14} /> Cover Image
                    </label>

                    {!preview ? (
                        <label
                            className={`group flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-100 rounded-xl cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 transition-all ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
                        >
                            {isUploading ? (
                                <Loader2 className="animate-spin text-emerald-500" />
                            ) : (
                                <>
                                    <Upload className="w-6 h-6 text-emerald-400 mb-1 group-hover:scale-110 transition" />
                                    <span className="text-[10px] text-gray-400 font-medium italic">
                                        Click to Upload
                                    </span>
                                </>
                            )}
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={isUploading}
                            />
                        </label>
                    ) : (
                        <div className="relative w-full h-32 rounded-xl overflow-hidden border group bg-gray-50">
                            <img
                                src={preview}
                                alt="Preview"
                                className={`w-full h-full object-cover ${isUploading ? "opacity-40 animate-pulse grayscale" : "opacity-100"}`}
                            />
                            {isUploading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Loader2
                                        className="animate-spin text-[#004D3C]"
                                        size={24}
                                    />
                                </div>
                            )}
                            {!isUploading && (
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="bg-white text-red-500 p-2 rounded-full hover:bg-red-50 shadow-lg transform hover:scale-110 transition"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="md:col-span-2 space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            placeholder="Title..."
                            className="w-full p-3 border rounded-lg outline-[#004D3C] text-black font-serif text-base bg-gray-50 focus:bg-white transition"
                            value={formData.title || ""}
                            onChange={(e) => {
                                const val = e.target.value;
                                setFormData((prev: any) => ({
                                    ...prev,
                                    title: val,
                                    slug: val
                                        .toLowerCase()
                                        .trim()
                                        .replace(/[^\w\s-]/g, "")
                                        .replace(/[\s_-]+/g, "-"),
                                }));
                            }}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                            URL Slug <Lock size={10} />
                        </label>
                        <input
                            type="text"
                            className="w-full p-2.5 border rounded-lg text-gray-400 font-mono text-xs bg-gray-100/50 cursor-not-allowed italic"
                            value={formData.slug || ""}
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
