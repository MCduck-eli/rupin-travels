import React from "react";
import { UseFormRegister } from "react-hook-form";
import { ITrip } from "@/types/trip";

export const GeneralInfo = ({
    register,
}: {
    register: UseFormRegister<ITrip>;
}) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-[#004D3C] border-b pb-2">
            General Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#004D3C]">
                    Trip Title (Hero)
                </label>
                <input
                    {...register("title", { required: true })}
                    placeholder="e.g. Himalayan Stillness"
                    className="border p-2 rounded-md text-[#004D3C] outline-[#004D3C]"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#004D3C]">
                    URL Slug (Auto-generated)
                </label>
                <input
                    {...register("slug")}
                    readOnly
                    placeholder="himalayan-stillness"
                    className="border p-2 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed outline-none border-gray-200"
                />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-medium text-[#004D3C]">
                    Full Title (Main Section)
                </label>
                <input
                    {...register("fullTitle")}
                    className="border p-2 rounded-md text-[#004D3C] outline-[#004D3C]"
                />
            </div>
        </div>
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#004D3C]">
                Hero Description (Short)
            </label>
            <textarea
                {...register("description")}
                rows={2}
                className="border p-2 rounded-md outline-[#004D3C] text-[#004D3C]"
            />
        </div>
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#004D3C]">
                Main Section Description (Long)
            </label>
            <textarea
                {...register("fullDescription")}
                rows={4}
                className="border p-2 rounded-md outline-[#004D3C] text-[#004D3C]"
            />
        </div>
    </div>
);
