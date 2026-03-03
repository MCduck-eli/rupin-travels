"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus, ExternalLink, PlaneTakeoff } from "lucide-react";
import { ITrip } from "@/types/trip";

export default function AdminTripsList() {
    const [trips, setTrips] = useState<ITrip[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTrips = async () => {
        try {
            const res = await fetch("/api/trips");
            const data = await res.json();
            if (data.success) {
                setTrips(data.data);
            }
        } catch (error) {
            console.error("Xatolik:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Haqiqatdan ham ushbu safarni o'chirmoqchimisiz?")) {
            const res = await fetch(`/api/trips/${id}`, { method: "DELETE" });
            if (res.ok) {
                setTrips(trips.filter((t) => t._id !== id));
            }
        }
    };

    if (loading)
        return (
            <div className="p-10 text-center font-serif italic text-[#004D3C]">
                Loading Journeys...
            </div>
        );

    return (
        <div className="p-8 bg-[#F7F5F2] min-h-screen">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-serif text-[#004D3C] flex items-center gap-3">
                        <PlaneTakeoff /> Admin Dashboard
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage your boutique travel experiences
                    </p>
                </div>
                <Link
                    href="/admin/trips/new"
                    className="bg-[#004D3C] text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-[#003d30] transition-all shadow-lg"
                >
                    <Plus size={20} /> Create New Trip
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {trips.length === 0 ? (
                    <div className="bg-white p-20 text-center rounded-2xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-400">
                            No trips have been added yet.
                        </p>
                    </div>
                ) : (
                    trips.map((trip) => (
                        <div
                            key={trip._id}
                            className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="space-y-1">
                                <h3 className="text-xl font-serif text-[#004D3C]">
                                    {trip.title}
                                </h3>
                                <div className="flex items-center gap-4 text-xs text-gray-400 uppercase tracking-widest">
                                    <span>Slug: /{trip.slug}</span>
                                    <span>•</span>
                                    <span>
                                        {trip.itinerary?.length || 0} Days
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-4 md:mt-0">
                                <Link
                                    href={`/trips/${trip.slug}`}
                                    target="_blank"
                                    className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                    title="View Site"
                                >
                                    <ExternalLink size={20} />
                                </Link>

                                <Link
                                    href={`/admin/trips/edit/${trip._id}`}
                                    className="p-3 text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                                    title="Edit Trip"
                                >
                                    <Edit size={20} />
                                </Link>

                                <button
                                    onClick={() => handleDelete(trip._id!)}
                                    className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
