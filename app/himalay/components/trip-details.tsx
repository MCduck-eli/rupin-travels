import React from "react";
import { Camera, Instagram } from "lucide-react";

const TripDetails = () => {
    const details = [
        { label: "Activity level", value: "Easy" },
        { label: "Suitable for", value: "17 years & above" },
        { label: "Group size", value: "Max of 10" },
        { label: "Duration", value: "10 D/ 9 N" },
        { label: "Category", value: "Stillness" },
        { label: "Group size", value: "Max of 10" },
        { label: "Duration", value: "10 D/ 9 N" },
        { label: "Accomodation", value: "Boutique Hotels /Guest houses" },
    ];

    return (
        <div className="bg-[#eeeeee] py-12 px-6 md:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10">
                {details.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <div className="mt-1">
                            <Instagram
                                size={38}
                                strokeWidth={1.5}
                                className="text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-700 text-lg font-light leading-tight">
                                {item.label}
                            </span>
                            <span className="text-black text-xl font-medium leading-tight">
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
