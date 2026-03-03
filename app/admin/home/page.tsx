"use client";

import React, { useState, useEffect } from "react";
import {
    Save,
    ArrowLeft,
    LayoutDashboard,
    Video,
    Loader2,
    Type,
    Map,
    Image as ImageIcon,
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

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/home-settings");
                const data = await res.json();
                if (data && !data.error) {
                    setSettings({
                        heroVideoUrl: data.heroVideoUrl || "",
                        heroTitle: data.heroTitle || "",
                        heroSubtitle: data.heroSubtitle || "",
                        philosophyTagline: data.philosophyTagline || "",
                        philosophyTitle: data.philosophyTitle || "",
                        philosophyContent: data.philosophyContent || "",
                        tripsSectionTitle: data.tripsSectionTitle || "",
                        tripsSectionSubtitle: data.tripsSectionSubtitle || "",
                        highlightedTrips: data.highlightedTrips || [],
                    });
                }
            } catch (err) {
                console.error("Yuklashda xatolik:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

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
            } else {
                const errorData = await res.json();
                alert(`Xatolik: ${errorData.error || "Saqlab bo'lmadi"}`);
            }
        } catch (err) {
            console.error(err);
            alert("Server bilan bog'lanishda xatolik yuz berdi.");
        } finally {
            setSaving(false);
        }
    };

    // Card boshqaruv funksiyalari (o'zgarmasdan qoldi)
    const addTripCard = () => {
        setSettings({
            ...settings,
            highlightedTrips: [
                ...settings.highlightedTrips,
                {
                    title: "",
                    duration: "",
                    subtitle: "",
                    nights: "",
                    imageUrl: "",
                },
            ],
        });
    };
    const removeTripCard = (index: number) => {
        setSettings({
            ...settings,
            highlightedTrips: settings.highlightedTrips.filter(
                (_, i) => i !== index,
            ),
        });
    };
    const updateTripCard = (index: number, field: string, value: string) => {
        const newTrips = [...settings.highlightedTrips];
        newTrips[index] = { ...newTrips[index], [field]: value };
        setSettings({ ...settings, highlightedTrips: newTrips });
    };

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen font-serif italic text-[#004D3C]">
                <Loader2 className="animate-spin mr-2" /> Loading...
            </div>
        );

    return (
        <div className="p-8 bg-[#F7F5F2] min-h-screen">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <Link
                        href="/admin/trips"
                        className="flex items-center gap-2 text-gray-500 hover:text-[#004D3C] transition-all font-medium"
                    >
                        <ArrowLeft size={20} /> Back to Dashboard
                    </Link>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-[#004D3C] text-white px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-[#003d30] transition-all shadow-lg disabled:opacity-50"
                    >
                        {saving ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <Save size={20} />
                        )}
                        {saving ? "Saving..." : "Save All Changes"}
                    </button>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-black">
                    <h1 className="text-3xl font-serif text-[#004D3C] mb-8 flex items-center gap-3 border-b pb-6">
                        <LayoutDashboard /> Home Page Customization
                    </h1>

                    <div className="space-y-10">
                        {/* HERO SECTION - MANA SHU YERGA INPUTLAR QO'SHILDI */}
                        <section className="p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 space-y-6">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                <Video size={16} /> Hero Section (Video & Text)
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500">
                                        Hero Main Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Welcome to Our Journey"
                                        className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#004D3C]"
                                        value={settings.heroTitle}
                                        onChange={(e) =>
                                            setSettings({
                                                ...settings,
                                                heroTitle: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500">
                                        Hero Subtitle
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Travel designed to change how you feel"
                                        className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#004D3C]"
                                        value={settings.heroSubtitle}
                                        onChange={(e) =>
                                            setSettings({
                                                ...settings,
                                                heroSubtitle: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-6 pt-4 border-t border-gray-200">
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
                                    onClientUploadComplete={(res) => {
                                        if (res?.[0]) {
                                            setSettings((prev) => ({
                                                ...prev,
                                                heroVideoUrl:
                                                    res[0].ufsUrl || res[0].url,
                                            }));
                                            alert("Video uploaded!");
                                        }
                                    }}
                                    appearance={{
                                        button: "bg-[#004D3C] rounded-xl px-6 py-2",
                                    }}
                                />
                            </div>
                        </section>

                        {/* HIGHLIGHTED TRIPS SECTION */}
                        <section className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                    <Map size={16} /> Highlighted Trips
                                </h2>
                                <button
                                    onClick={addTripCard}
                                    className="flex items-center gap-1 bg-[#B59461] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#967a4f]"
                                >
                                    <Plus size={16} /> Add Card
                                </button>
                            </div>
                            {/* ... Carousel inputlari o'zgarmasdan qoladi ... */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Section Big Title"
                                    className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-[#004D3C]"
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
                                    className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-[#004D3C]"
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
                            {/* Trip Card'lar ro'yxati (siz yuborgan kod bo'yicha) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {settings.highlightedTrips.map(
                                    (trip, index) => (
                                        <div
                                            key={index}
                                            className="p-6 bg-gray-50 rounded-2xl border relative space-y-4 shadow-sm"
                                        >
                                            <button
                                                onClick={() =>
                                                    removeTripCard(index)
                                                }
                                                className="absolute top-4 right-4 text-red-400 hover:text-red-600"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            <input
                                                placeholder="Trip Title"
                                                className="w-full p-2 border rounded-lg text-sm"
                                                value={trip.title}
                                                onChange={(e) =>
                                                    updateTripCard(
                                                        index,
                                                        "title",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {/* Boshqa inputlaringiz... */}
                                        </div>
                                    ),
                                )}
                            </div>
                        </section>

                        {/* PHILOSOPHY SECTION */}
                        <section className="space-y-6">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 border-b pb-2 flex items-center gap-2">
                                <Type size={16} /> Philosophy Content
                            </h2>
                            <div className="grid gap-4">
                                <input
                                    type="text"
                                    placeholder="Tagline"
                                    className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-[#004D3C]"
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
                                    className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-[#004D3C]"
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
                                    className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-[#004D3C] resize-none"
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
