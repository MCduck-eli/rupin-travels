import React from "react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { Plus, Trash2, ListChecks } from "lucide-react";
import { ITrip } from "@/types/trip";

export const TripHighlights = ({
    register,
    control,
}: {
    register: UseFormRegister<ITrip>;
    control: Control<ITrip>;
}) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "highlights" as any,
    });
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="text-lg font-semibold text-[#004D3C] border-b pb-2 flex items-center gap-2">
                <ListChecks size={20} /> Trip Highlights & Pricing Details
            </h3>
            <div className="space-y-4">
                <label className="text-sm font-medium text-[#004D3C]">
                    Trip Highlights (for RetHimalay Section)
                </label>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                        <input
                            {...register(`highlights.${index}` as any)}
                            placeholder="e.g. Daily yoga"
                            className="flex-1 border p-2 rounded-md text-[#004D3C] outline-[#004D3C]"
                        />
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 p-2"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => append("")}
                    className="flex items-center gap-1 text-xs bg-gray-100 text-[#004D3C] px-3 py-2 rounded-md hover:bg-gray-200"
                >
                    <Plus size={14} /> Add Highlight
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-[#004D3C]">
                        Base Price ($ pp)
                    </label>
                    <input
                        {...register("price")}
                        placeholder="e.g. 4,500"
                        className="border p-2 rounded-md text-[#004D3C] outline-[#004D3C]"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-[#004D3C]">
                        Extra Cost Info (Rs.)
                    </label>
                    <input
                        {...register("extraCost" as any)}
                        placeholder="e.g. + Rs. 4,500"
                        className="border p-2 rounded-md text-[#004D3C] outline-[#004D3C]"
                    />
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-sm font-medium text-[#004D3C]">
                        Cancellation Policy Text
                    </label>
                    <textarea
                        {...register("cancellationPolicy" as any)}
                        placeholder="Enter policy details..."
                        rows={2}
                        className="border p-2 rounded-md text-[#004D3C] outline-[#004D3C]"
                    />
                </div>
            </div>
        </div>
    );
};
