import React from "react";
import {
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form";
import { ImageIcon, Trash2 } from "lucide-react";
import { ITrip } from "@/types/trip";
import { UploadDropzone } from "@/lib/uploadthing";

export const TripGallerySection = ({
    register,
    setValue,
    watch,
}: {
    register: UseFormRegister<ITrip>;
    setValue: UseFormSetValue<ITrip>;
    watch: UseFormWatch<ITrip>;
}) => {
    const galleryItems = watch("gallery") || [];
    const handleUploadComplete = (res: any) => {
        const newImages = res.map((file: any) => ({
            url: file.ufsUrl || file.url,
            label: "",
            title: "",
        }));
        setValue("gallery", [...galleryItems, ...newImages], {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-[#004D3C] border-b pb-2 flex items-center gap-2">
                <ImageIcon size={20} /> Trip Gallery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {galleryItems.map((img, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-2 p-3 border rounded-lg bg-gray-50 group"
                    >
                        <div className="relative aspect-square rounded-md overflow-hidden shadow-sm">
                            <img
                                src={img.url}
                                className="w-full h-full object-cover"
                                alt="Gallery"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setValue(
                                        "gallery",
                                        galleryItems.filter(
                                            (_, i) => i !== index,
                                        ),
                                    )
                                }
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                        <input
                            {...register(`gallery.${index}.label` as const)}
                            placeholder="Label"
                            className="text-xs text-black border p-2 rounded outline-[#004D3C]"
                        />
                        <input
                            {...register(`gallery.${index}.title` as const)}
                            placeholder="Title"
                            className="text-xs border text-black p-2 rounded font-semibold outline-[#004D3C]"
                        />
                    </div>
                ))}
            </div>
            <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={handleUploadComplete}
                appearance={{
                    container:
                        "border-2 border-dashed border-[#004D3C]/20 rounded-lg bg-[#F7F5F2] py-8",
                    button: "bg-[#004D3C] text-white px-6 py-2 rounded-md mt-4",
                }}
            />
        </div>
    );
};
