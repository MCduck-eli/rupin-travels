"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ITrip } from "@/types/trip";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import TripForm from "@/components/admin/tripForm";

export default function EditTripPage() {
    const [trip, setTrip] = useState<ITrip | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // URL dagi [id] ni oladi
    const router = useRouter();

    // 1. Safar ma'lumotlarini ID orqali yuklab olish
    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const res = await fetch(`/api/trips/${id}`);
                const data = await res.json();
                if (data.success) {
                    setTrip(data.data);
                } else {
                    alert("Safar topilmadi!");
                    router.push("/admin/trips");
                }
            } catch (error) {
                console.error("Yuklashda xatolik:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchTrip();
    }, [id, router]);

    // 2. Yangilangan ma'lumotlarni bazaga yuborish (PUT)
    const handleUpdate = async (data: ITrip) => {
        try {
            const response = await fetch(`/api/trips/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Safar muvaffaqiyatli yangilandi!");
                router.push("/admin/trips");
                router.refresh(); // Sahifani yangilash
            } else {
                const err = await response.json();
                alert("Xatolik: " + err.error);
            }
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-[#004D3C]">
                <Loader2 className="animate-spin mb-2" size={32} />
                <p className="font-serif italic">Loading trip details...</p>
            </div>
        );
    }

    return (
        <div className="p-8 bg-[#F7F5F2] min-h-screen">
            <div className="max-w-5xl mx-auto">
                {/* Orqaga qaytish */}
                <Link
                    href="/admin/trips"
                    className="flex items-center gap-2 text-[#004D3C] hover:underline mb-6 transition-all"
                >
                    <ChevronLeft size={20} /> Back to Dashboard
                </Link>

                <h1 className="text-3xl font-serif text-[#004D3C] mb-8">
                    Edit Journey:{" "}
                    <span className="italic opacity-70">{trip?.title}</span>
                </h1>

                {/* 3. TripForm ga mavjud ma'lumotlarni (initialData) uzatamiz */}
                {trip && (
                    <TripForm initialData={trip} onSubmit={handleUpdate} />
                )}
            </div>
        </div>
    );
}
