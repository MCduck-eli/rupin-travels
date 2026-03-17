"use client";

import React from "react";
import {
    Users,
    Clock,
    Star,
    Activity,
    Calendar,
    CreditCard,
    Home,
} from "lucide-react";
import { ITrip } from "@/types/trip";

interface Props {
    data: ITrip;
}

const TripDetails: React.FC<Props> = ({ data }) => {
    const details = [
        {
            label: "Activity level",
            value: data?.activityLevel || "Easy",
            icon: <Activity size={32} strokeWidth={1} />,
        },
        {
            label: "Suitable for",
            value: data?.suitableFor || "17 years & above",
            icon: <Users size={32} strokeWidth={1} />,
        },
        {
            label: "Price",
            value: data?.prices || data?.price || "$ 4,500 pp",
            icon: <CreditCard size={32} strokeWidth={1} />,
        },
        {
            label: "Duration",
            value: data?.duration || "10 D/ 9 N",
            icon: <Clock size={32} strokeWidth={1} />,
        },
        {
            label: "Category",
            value: data?.category || "Stillness",
            icon: <Star size={32} strokeWidth={1} />,
        },
        {
            label: "Group size",
            value: data?.groupSize || "Max of 10",
            icon: <Users size={32} strokeWidth={1} />,
        },
        {
            label: "Date",
            value: data?.dateRange || "Apr 10 - Apr 25, 2026",
            icon: <Calendar size={32} strokeWidth={1} />,
        },
        {
            label: "Accommodation",
            value: data?.accommodation || "Boutique Hotels / Guest houses",
            icon: <Home size={32} strokeWidth={1} />,
        },
    ];

    return (
        <div className="bg-[#eeeeee]  py-6 px-6 md:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10">
                {details.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 group">
                        <div className="text-[#004D3C] transition-transform duration-300 group-hover:scale-110">
                            {item.icon}
                        </div>
                        <div className="flex flex-col">
                            <span
                                className="text-gray-500 text-xs tracking-widest uppercase mb-1"
                                style={{
                                    fontFamily:
                                        "'Beautifully Delicious', sans-serif",
                                }}
                            >
                                {item.label}
                            </span>
                            <span
                                className="text-black text-lg font-medium"
                                style={{ fontFamily: "'Higuen', serif" }}
                            >
                                {item.value}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TripDetails;
