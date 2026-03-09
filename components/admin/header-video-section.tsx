import React from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Video, Trash2 } from "lucide-react";
import { ITrip } from "@/types/trip";
import { UploadDropzone } from "@/lib/uploadthing";

export const HeaderVideoSection = ({
    setValue,
    watch,
}: {
    setValue: UseFormSetValue<ITrip>;
    watch: UseFormWatch<ITrip>;
}) => {
    const headerVideo = watch("headerVideo");
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-[#004D3C] border-b pb-2 flex items-center gap-2">
                <Video size={20} /> Header Video
            </h3>
            {headerVideo && (
                <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden bg-black">
                    <video
                        src={headerVideo}
                        className="w-full h-full object-cover"
                        controls
                    />
                    <button
                        type="button"
                        onClick={() => setValue("headerVideo", "")}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )}
            <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) =>
                    setValue("headerVideo", res[0].ufsUrl || res[0].url)
                }
                appearance={{
                    container:
                        "border-2 border-dashed border-[#004D3C]/20 rounded-lg bg-[#F7F5F2] p-4",
                    button: "bg-[#004D3C] text-white px-4 py-2 rounded-md",
                }}
                content={{ label: "Upload MP4 Video" }}
            />
        </div>
    );
};
