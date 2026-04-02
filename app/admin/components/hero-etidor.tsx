import React from "react";
import { ImageIcon, Type } from "lucide-react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

interface HeroEditorProps {
    title: string;
    imageUrl: string;
    onTitleChange: (val: string) => void;
    onImageChange: (url: string) => void;
}

const HeroEditor: React.FC<HeroEditorProps> = ({
    title,
    imageUrl,
    onTitleChange,
    onImageChange,
}) => {
    return (
        <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 border-b pb-3">
                <ImageIcon className="text-blue-500" size={20} /> Hero Section
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5">
                            Main Title
                        </label>
                        <input
                            className="w-full p-3 bg-gray-50 border-transparent border focus:border-[#004D3C] focus:bg-white rounded-xl outline-none transition-all text-base font-medium"
                            value={title}
                            onChange={(e) => onTitleChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5">
                            Hero Image
                        </label>
                        <UploadButton<OurFileRouter, "imageUploader">
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                if (res?.[0]) {
                                    onImageChange(res[0].url);
                                    alert("Upload Completed");
                                }
                            }}
                            onUploadError={(error: Error) => {
                                alert(`ERROR! ${error.message}`);
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
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="Hero"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <ImageIcon size={32} className="text-gray-300" />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroEditor;
