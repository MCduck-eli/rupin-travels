"use client";

import React from "react";
import { Camera, Instagram, Users, Clock, MapPin, Star } from "lucide-react";
import { ITrip } from "@/types/trip";

interface Props {
    data: ITrip;
}

const TripDetails: React.FC<Props> = ({ data }) => {
    const details = [
        {
            label: "Group size",
            value: "Max of 10",
            icon: <Users size={32} strokeWidth={1} />,
        },
        {
            label: "Duration",
            value: `${data.itinerary?.length || 0} Days`,
            icon: <Clock size={32} strokeWidth={1} />,
        },
        {
            label: "Category",
            value: "Boutique Travel",
            icon: <Star size={32} strokeWidth={1} />,
        },
        {
            label: "Location",
            value: data.title,
            icon: <MapPin size={32} strokeWidth={1} />,
        },
    ];

    return (
        <div className="bg-[#eeeeee] py-16 px-6 md:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10">
                {details.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 group">
                        <div className="text-[#004D3C] transition-transform duration-300 group-hover:scale-110">
                            {item.icon}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm tracking-wider uppercase font-light">
                                {item.label}
                            </span>
                            <span className="text-black text-lg font-medium font-serif">
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
