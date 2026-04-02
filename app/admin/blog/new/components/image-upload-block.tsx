"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { ImagePlus, X, ImageIcon, Loader2 } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";

interface ImageUploadBlockProps {
    onSave: (data: { url: string; caption: string }) => void;
    initialData?: { url: string; caption: string };
}

const ImageUploadBlock: React.FC<ImageUploadBlockProps> = ({
    onSave,
    initialData,
}) => {
    const [preview, setPreview] = useState<string | null>(
        initialData?.url || null,
    );
    const [caption, setCaption] = useState<string>(initialData?.caption || "");
    useEffect(() => {
        if (initialData?.url) setPreview(initialData.url);
        if (initialData?.caption) setCaption(initialData.caption);
    }, [initialData]);

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onClientUploadComplete: (res) => {
            if (res && res[0]) {
                const uploadedUrl = res[0].ufsUrl || res[0].url;

                console.log("Kontent rasmi yuklandi:", uploadedUrl);

                setPreview(uploadedUrl);
                onSave({ url: uploadedUrl, caption: caption });
            }
        },
        onUploadError: (error: Error) => {
            console.error("Yuklashda xato:", error);
            alert("Rasm yuklanmadi!");
        },
    });

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setPreview(URL.createObjectURL(selectedFile));
            await startUpload([selectedFile]);
        }
    };

    const handleCaptionChange = (val: string) => {
        setCaption(val);
        onSave({ url: preview || "", caption: val });
    };

    const removeImage = () => {
        setPreview(null);
        setCaption("");
        onSave({ url: "", caption: "" });
    };

    return (
        <div className="w-full border border-slate-200 p-4 rounded-xl bg-white shadow-sm hover:border-[#004D3C]/30 transition-all">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-50">
                <div className="flex items-center gap-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                    <ImageIcon size={14} /> Content Image
                </div>
                {isUploading && (
                    <Loader2
                        size={14}
                        className="animate-spin text-[#004D3C]"
                    />
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                {!preview ? (
                    <label
                        className={`w-full md:w-40 h-28 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 bg-slate-50 rounded-lg cursor-pointer hover:bg-emerald-50 transition shrink-0 ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
                    >
                        <ImagePlus size={20} className="text-slate-400 mb-1" />
                        <span className="text-[10px] text-slate-400 font-medium italic">
                            Upload
                        </span>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                            disabled={isUploading}
                        />
                    </label>
                ) : (
                    <div className="relative w-full md:w-40 h-28 shrink-0">
                        <img
                            src={preview}
                            alt="Content"
                            className={`w-full h-full rounded-lg object-cover border border-slate-100 ${isUploading ? "opacity-40 animate-pulse" : ""}`}
                        />
                        {!isUploading && (
                            <button
                                onClick={removeImage}
                                className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full shadow-md hover:scale-110 transition"
                            >
                                <X size={12} />
                            </button>
                        )}
                    </div>
                )}
                <div className="flex-1 w-full space-y-2">
                    <textarea
                        value={caption}
                        onChange={(e) => handleCaptionChange(e.target.value)}
                        placeholder="Describe this image..."
                        rows={2}
                        className="w-full text-sm p-3 bg-slate-50 border-none rounded-lg focus:ring-1 focus:ring-emerald-200 outline-none resize-none font-serif italic text-black"
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageUploadBlock;
