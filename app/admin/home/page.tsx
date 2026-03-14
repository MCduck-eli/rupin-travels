"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
    Save,
    ArrowLeft,
    LayoutDashboard,
    Video,
    Loader2,
    Type,
    Map,
    Plus,
    Trash2,
} from "lucide-react";
import Link from "next/link";
import { UploadButton } from "@/lib/uploadthing";

export default function AdminHomeSettings() {
    const [settings, setSettings] = useState({
        heroVideoUrl: "",
        heroTitle: "",
        heroSubtitle: "",
        philosophyTagline: "",
        philosophyTitle: "",
        philosophyContent: "",
        tripsSectionTitle: "",
        tripsSectionSubtitle: "",
        highlightedTrips: [] as any[],
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const settingsRes = await fetch("/api/home-settings");
            const settingsData = await settingsRes.json();

            const tripsRes = await fetch("/api/trips");
            const tripsData = await tripsRes.json();

            if (tripsData.success && settingsData) {
                const savedTrips = settingsData.highlightedTrips || [];

                const mergedTrips = tripsData.data.map((t: any) => {
                    const cleanSlug = t.slug.replace(/-+$/, "");
                    const existingTrip = savedTrips.find(
                        (s: any) => s.slug === cleanSlug,
                    );

                    if (existingTrip) {
                        return { ...existingTrip, slug: cleanSlug };
                    }

                    return {
                        slug: cleanSlug,
                        title: t.title,
                        duration: t.duration || "7 DAYS",
                        subtitle: t.fullTitle || t.title,
                        nights: `From $${t.price || 0} per person`,
                        imageUrl: t.image || "",
                    };
                });

                setSettings({
                    ...settingsData,
                    highlightedTrips: mergedTrips,
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/home-settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                alert("Home settings saved successfully! ✨");
                fetchData();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const updateTripCard = (index: number, field: string, value: string) => {
        setSettings((prev) => {
            const newTrips = [...prev.highlightedTrips];
            newTrips[index] = { ...newTrips[index], [field]: value };
            return { ...prev, highlightedTrips: newTrips };
        });
    };

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen font-serif italic text-[#004D3C]">
                <Loader2 className="animate-spin mr-2" /> Loading...
            </div>
        );

    return (
        <div className="p-8 bg-[#F7F5F2] min-h-screen text-black">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <Link
                        href="/admin/trips"
                        className="flex items-center gap-2 text-gray-500 hover:text-[#004D3C] transition-all font-medium"
                    >
                        <ArrowLeft size={20} /> Back to Dashboard
                    </Link>
                    <button
                        onClick={() => handleSave()}
                        disabled={saving}
                        className="bg-[#004D3C] text-white px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-[#003d30] shadow-lg disabled:opacity-50"
                    >
                        {saving ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <Save size={20} />
                        )}
                        Save All Changes
                    </button>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h1 className="text-3xl font-serif text-[#004D3C] mb-8 flex items-center gap-3 border-b pb-6">
                        <LayoutDashboard /> Home Page Customization
                    </h1>

                    <div className="space-y-10">
                        {/* Hero Section */}
                        <section className="p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 space-y-6">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                <Video size={16} /> Hero Section (Video & Text)
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Hero Title"
                                    className="w-full p-4 border rounded-xl"
                                    value={settings.heroTitle}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            heroTitle: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Hero Subtitle"
                                    className="w-full p-4 border rounded-xl"
                                    value={settings.heroSubtitle}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            heroSubtitle: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col items-center gap-6 pt-4 border-t">
                                {settings.heroVideoUrl && (
                                    <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black">
                                        <video
                                            key={settings.heroVideoUrl}
                                            src={settings.heroVideoUrl}
                                            controls
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <UploadButton
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res: any) =>
                                        setSettings((prev) => ({
                                            ...prev,
                                            heroVideoUrl:
                                                res[0].ufsUrl || res[0].url,
                                        }))
                                    }
                                    appearance={{
                                        button: "bg-[#004D3C] rounded-xl px-6 py-2",
                                    }}
                                />
                            </div>
                        </section>

                        {/* Carousel Section */}
                        <section className="space-y-6">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                <Map size={16} /> Carousel Trips (From Trips
                                List)
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Section Title"
                                    className="w-full p-4 bg-gray-50 border rounded-2xl"
                                    value={settings.tripsSectionTitle}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            tripsSectionTitle: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Small Subtitle"
                                    className="w-full p-4 bg-gray-50 border rounded-2xl"
                                    value={settings.tripsSectionSubtitle}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            tripsSectionSubtitle:
                                                e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {settings.highlightedTrips.map(
                                    (trip, index) => (
                                        <div
                                            key={trip.slug}
                                            className="p-6 bg-gray-50 rounded-2xl border flex flex-col md:flex-row gap-6"
                                        >
                                            <div className="w-full md:w-1/3 space-y-3">
                                                <div className="aspect-video rounded-xl overflow-hidden border">
                                                    <img
                                                        src={trip.imageUrl}
                                                        className="w-full h-full object-cover"
                                                        alt={trip.title}
                                                    />
                                                </div>
                                                <UploadButton
                                                    endpoint="imageUploader"
                                                    onClientUploadComplete={(
                                                        res: any,
                                                    ) =>
                                                        updateTripCard(
                                                            index,
                                                            "imageUrl",
                                                            res[0].ufsUrl ||
                                                                res[0].url,
                                                        )
                                                    }
                                                    appearance={{
                                                        button: "bg-[#004D3C] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#003d30] transition-all shadow-sm w-full md:w-auto mt-2",
                                                    }}
                                                    content={{
                                                        button: "Change Photo",
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {/* FAQAT O'QISH UCHUN QILINDI (ReadOnly) */}
                                                <input
                                                    placeholder="Title on Card"
                                                    className="p-2 border rounded-lg text-sm bg-gray-200 cursor-not-allowed"
                                                    value={trip.title}
                                                    readOnly
                                                />
                                                <input
                                                    placeholder="Duration"
                                                    className="p-2 border rounded-lg text-sm"
                                                    value={trip.duration}
                                                    onChange={(e) =>
                                                        updateTripCard(
                                                            index,
                                                            "duration",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <input
                                                    placeholder="Card Subtitle"
                                                    className="p-2 border rounded-lg text-sm"
                                                    value={trip.subtitle}
                                                    onChange={(e) =>
                                                        updateTripCard(
                                                            index,
                                                            "subtitle",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <input
                                                    placeholder="Price Text"
                                                    className="p-2 border rounded-lg text-sm"
                                                    value={trip.nights}
                                                    onChange={(e) =>
                                                        updateTripCard(
                                                            index,
                                                            "nights",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <div className="md:col-span-2 text-xs text-gray-400 font-mono">
                                                    Linked to: /trips/
                                                    {trip.slug}
                                                </div>
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </section>

                        {/* Philosophy Section */}
                        <section className="space-y-6">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 border-b pb-2 flex items-center gap-2">
                                <Type size={16} /> Philosophy Content
                            </h2>
                            <div className="grid gap-4">
                                <input
                                    type="text"
                                    placeholder="Tagline"
                                    className="w-full p-4 bg-gray-50 border rounded-2xl"
                                    value={settings.philosophyTagline}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            philosophyTagline: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className="w-full p-4 bg-gray-50 border rounded-2xl"
                                    value={settings.philosophyTitle}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            philosophyTitle: e.target.value,
                                        })
                                    }
                                />
                                <textarea
                                    rows={4}
                                    placeholder="Content"
                                    className="w-full p-4 bg-gray-50 border rounded-2xl resize-none"
                                    value={settings.philosophyContent}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            philosophyContent: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
