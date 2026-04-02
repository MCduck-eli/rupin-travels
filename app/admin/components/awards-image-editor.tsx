"use client";

import React from "react";
import { ImageIcon, Award } from "lucide-react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

interface AwardsImageEditorProps {
    imageUrl: string;
    awardsText: string;
    onUpdate: (field: string, value: string) => void;
}

const AwardsImageEditor: React.FC<AwardsImageEditorProps> = ({
    imageUrl,
    awardsText,
    onUpdate,
}) => {
    const displayImage = imageUrl || "/images/default-awards-photo.jpg";

    return (
        <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 border-b pb-3">
                <Award className="text-yellow-500" size={20} /> Awards & Image
                Section
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5">
                            Awards Label
                        </label>
                        <textarea
                            rows={3}
                            className="w-full p-3 bg-gray-50 border-transparent border focus:border-[#004D3C] focus:bg-white rounded-xl outline-none transition-all text-sm font-serif italic"
                            value={awardsText}
                            onChange={(e) =>
                                onUpdate("awardsText", e.target.value)
                            }
                            placeholder="Enter award text..."
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5">
                            Upload Awards Image
                        </label>
                        <UploadButton<OurFileRouter, "imageUploader">
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                if (res?.[0]) {
                                    const uploadedUrl =
                                        res[0].ufsUrl || res[0].url;
                                    console.log("Rasm yuklandi:", uploadedUrl);
                                    onUpdate("imageUrl", uploadedUrl);
                                    alert("Rasm muvaffaqiyatli yuklandi!");
                                }
                            }}
                            onUploadError={(error: Error) => {
                                alert(`Xatolik: ${error.message}`);
                            }}
                            appearance={{
                                button: "ut-ready:bg-[#004D3C] ut-uploading:cursor-not-allowed bg-[#004D3C] rounded-xl text-sm h-11 w-full",
                                container: "w-full",
                                allowedContent: "text-[10px] text-gray-400",
                            }}
                        />
                    </div>
                </div>

                <div className="relative">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">
                        Live Preview
                    </p>
                    <div className="w-full aspect-video overflow-hidden rounded-xl shadow-inner bg-gray-100 border border-gray-100 flex items-center justify-center">
                        <img
                            src={displayImage}
                            alt="Awards Preview"
                            className="w-full h-full object-cover"
                            key={displayImage}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AwardsImageEditor;
