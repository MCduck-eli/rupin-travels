import React from "react";
import {
    Control,
    UseFormRegister,
    useFieldArray,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { ITrip } from "@/types/trip";
import { UploadDropzone } from "@/lib/uploadthing";

export const ItinerarySection = ({
    register,
    control,
    setValue,
    watch,
}: {
    register: UseFormRegister<ITrip>;
    control: Control<ITrip>;
    setValue: UseFormSetValue<ITrip>;
    watch: UseFormWatch<ITrip>;
}) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "itinerary",
    });
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-semibold text-[#004D3C]">
                    Daily Itinerary
                </h3>
                <button
                    type="button"
                    onClick={() =>
                        append({
                            day: fields.length + 1,
                            title: "",
                            content: "",
                            image: "",
                        })
                    }
                    className="flex items-center gap-1 text-sm bg-[#004D3C] text-white px-3 py-1 rounded-md"
                >
                    <Plus size={16} /> Add Day
                </button>
            </div>
            <div className="space-y-6">
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="p-4 bg-gray-50 rounded-lg relative border border-gray-100 space-y-4"
                    >
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute top-2 right-2 text-red-500 p-1"
                        >
                            <Trash2 size={18} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="text-xs uppercase text-gray-500">
                                    Day
                                </label>
                                <input
                                    type="number"
                                    {...register(
                                        `itinerary.${index}.day` as const,
                                    )}
                                    className="w-full border p-2 rounded-md text-[#004D3C]"
                                />
                            </div>
                            <div className="md:col-span-3">
                                <label className="text-xs uppercase text-gray-500">
                                    Title
                                </label>
                                <input
                                    {...register(
                                        `itinerary.${index}.title` as const,
                                    )}
                                    className="w-full border p-2 rounded-md text-[#004D3C]"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs uppercase text-gray-500">
                                    Day Image
                                </label>
                                <UploadDropzone
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) =>
                                        setValue(
                                            `itinerary.${index}.image`,
                                            res[0].ufsUrl || res[0].url,
                                        )
                                    }
                                    appearance={{
                                        container:
                                            "border-2 border-dashed border-[#004D3C]/10 rounded-lg bg-white p-4 h-32",
                                        button: "bg-[#004D3C] text-white text-[10px] px-2 py-1",
                                    }}
                                />
                            </div>
                            {watch(`itinerary.${index}.image`) && (
                                <div className="relative h-32 w-full rounded-lg overflow-hidden border border-gray-200">
                                    <img
                                        src={watch(`itinerary.${index}.image`)}
                                        className="w-full h-full object-cover"
                                        alt="Preview"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="mt-4">
                            <label className="text-xs uppercase text-gray-500">
                                Content
                            </label>
                            <textarea
                                {...register(
                                    `itinerary.${index}.content` as const,
                                )}
                                rows={3}
                                className="w-full border p-2 rounded-md text-[#004D3C]"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
