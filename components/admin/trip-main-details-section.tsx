"use client";

import {
    Users,
    Clock,
    Star,
    Activity,
    Calendar,
    CreditCard,
    Home,
    Settings,
} from "lucide-react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { ITrip } from "@/types/trip";

interface Props {
    register: UseFormRegister<ITrip>;
    initialData?: ITrip;
}

export const TripMainDetailsSection = ({ register, initialData }: Props) => {
    const detailFields = [
        {
            label: "Activity level",
            name: "activityLevel",
            icon: <Activity size={20} className="text-gray-400" />,
            placeholder: "e.g. Easy / Moderate",
        },
        {
            label: "Suitable for",
            name: "suitableFor",
            icon: <Users size={20} className="text-gray-400" />,
            placeholder: "e.g. 17 years & above",
        },
        {
            label: "Prices",
            name: "prices", // Modelda 'prices' (ko'plikda), shunga mos
            icon: <CreditCard size={20} className="text-gray-400" />,
            placeholder: "e.g. $ 4,500 pp",
        },
        {
            label: "Duration",
            name: "duration",
            icon: <Clock size={20} className="text-gray-400" />,
            placeholder: "e.g. 10 D/ 9 N",
        },
        {
            label: "Category",
            name: "category",
            icon: <Star size={20} className="text-gray-400" />,
            placeholder: "e.g. Stillness",
        },
        {
            label: "Group size",
            name: "groupSize",
            icon: <Users size={20} className="text-gray-400" />,
            placeholder: "e.g. Max of 10",
        },
        {
            label: "Date",
            name: "dateRange",
            icon: <Calendar size={20} className="text-gray-400" />,
            placeholder: "e.g. Apr 10 - Apr 25, 2026",
        },
        {
            label: "Accommodation",
            name: "accommodation",
            icon: <Home size={20} className="text-gray-400" />,
            placeholder: "e.g. Boutique Hotels",
        },
    ];

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b pb-3">
                <Settings size={22} className="text-[#004D3C]" />
                <h3 className="text-lg font-semibold text-[#004D3C]">
                    Trip Key Specifications
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {detailFields.map((field, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-2 p-3 rounded-lg border border-gray-50 bg-gray-50/50"
                    >
                        <div className="flex items-center gap-2">
                            {field.icon}
                            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                                {field.label}
                            </label>
                        </div>
                        <input
                            {...register(field.name as keyof ITrip)}
                            defaultValue={
                                (initialData as any)?.[field.name] || ""
                            } // Bazadagi ma'lumotni chiqaradi
                            className="w-full bg-white border border-gray-200 p-2 rounded-md text-sm text-[#004D3C] focus:outline-[#004D3C] transition-all"
                            placeholder={field.placeholder}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
