"use client";

import TripForm from "@/components/admin/tripForm";
import { ITrip } from "@/types/trip";
import { useRouter } from "next/navigation";

export default function NewTripPage() {
    const router = useRouter();

    const handleCreateTrip = async (data: ITrip) => {
        try {
            const response = await fetch("/api/trips", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Trip created successfully!");
                router.push("/admin/trips");
            } else {
                const error = await response.json();
                alert("Error: " + error.error);
            }
        } catch (err) {
            console.error("Failed to save trip", err);
        }
    };

    return (
        <div className="p-8 bg-[#F7F5F2] min-h-screen">
            <h1 className="text-3xl font-bold text-[#004D3C] mb-8">
                Create New Journey
            </h1>
            <TripForm onSubmit={handleCreateTrip} />
        </div>
    );
}
