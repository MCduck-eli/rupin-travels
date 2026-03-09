import React from "react";
import {
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
    useFieldArray,
    Control,
} from "react-hook-form";
import { Plus, Trash2, Info } from "lucide-react";
import { ITrip } from "@/types/trip";
import { UploadDropzone } from "@/lib/uploadthing";

interface Props {
    register: UseFormRegister<ITrip>;
    setValue: UseFormSetValue<ITrip>;
    watch: UseFormWatch<ITrip>;
    control: Control<ITrip>;
}

export const TripDetailsSection = ({
    register,
    setValue,
    watch,
    control,
}: Props) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "extraDetails",
    });

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-semibold text-[#004D3C] flex items-center gap-2">
                    <Info size={20} /> Complete Trip Information
                </h3>
                <button
                    type="button"
                    onClick={() =>
                        append({ title: "", description: "", icon: "" })
                    }
                    className="flex items-center gap-1 text-sm bg-[#004D3C] text-white px-3 py-1 rounded-md hover:bg-[#003d30] transition-all"
                >
                    <Plus size={16} /> Add Section
                </button>
            </div>

            <div className="space-y-6">
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-100 relative group"
                    >
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute top-2 right-2 text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={18} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="md:col-span-3 flex flex-col gap-2">
                                <label className="text-[10px] uppercase font-bold text-gray-400">
                                    Icon
                                </label>
                                {watch(`extraDetails.${index}.icon`) ? (
                                    <div className="relative w-full h-24 rounded-md border bg-white overflow-hidden group/img">
                                        <img
                                            src={watch(
                                                `extraDetails.${index}.icon`,
                                            )}
                                            className="w-full h-full object-contain p-2"
                                            alt="icon"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setValue(
                                                    `extraDetails.${index}.icon`,
                                                    "",
                                                )
                                            }
                                            className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <UploadDropzone
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) =>
                                            setValue(
                                                `extraDetails.${index}.icon`,
                                                res[0].ufsUrl || res[0].url,
                                            )
                                        }
                                        appearance={{
                                            container:
                                                "border-dashed border-gray-300 bg-white p-2 h-24",
                                            button: "bg-[#004D3C] text-[10px] px-2 py-1",
                                        }}
                                        content={{ label: "Upload" }}
                                    />
                                )}
                            </div>

                            <div className="md:col-span-9 space-y-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] uppercase font-bold text-gray-400">
                                        Title
                                    </label>
                                    <input
                                        {...register(
                                            `extraDetails.${index}.title` as const,
                                        )}
                                        placeholder="e.g. Who this is for"
                                        className="w-full border p-2 rounded-md text-[#004D3C] font-medium outline-[#004D3C]"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] uppercase font-bold text-gray-400">
                                        Description
                                    </label>
                                    <textarea
                                        {...register(
                                            `extraDetails.${index}.description` as const,
                                        )}
                                        rows={2}
                                        className="w-full border p-2 rounded-md text-[#004D3C] outline-[#004D3C]"
                                        placeholder="Enter details..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {fields.length === 0 && (
                    <div className="text-center py-10 border-2 border-dashed rounded-xl text-gray-300">
                        No extra sections added. Click "Add Section" to start.
                    </div>
                )}
            </div>
        </div>
    );
};
