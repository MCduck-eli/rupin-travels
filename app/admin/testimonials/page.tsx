"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2, Plus, Trash2, Quote, User, MapPin } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";

export default function AdminTestimonials() {
    const [settings, setSettings] = useState({
        pageTitle: "",
        pageSubtitle: "",
        testimonials: [] as any[],
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch("/api/testimonial-settings")
            .then((res) => res.json())
            .then((data) => {
                if (data && !data.error) {
                    setSettings({
                        pageTitle: data.pageTitle || "",
                        pageSubtitle: data.pageSubtitle || "",
                        testimonials: data.testimonials || [],
                    });
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const addTestimonial = () => {
        setSettings({
            ...settings,
            testimonials: [
                ...settings.testimonials,
                { name: "", location: "", comment: "", image: "" },
            ],
        });
    };

    const removeTestimonial = (index: number) => {
        const newItems = settings.testimonials.filter((_, i) => i !== index);
        setSettings({ ...settings, testimonials: newItems });
    };

    const updateTestimonial = (index: number, field: string, value: string) => {
        const newItems = [...settings.testimonials];
        newItems[index] = { ...newItems[index], [field]: value };
        setSettings({ ...settings, testimonials: newItems });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/testimonial-settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            if (res.ok) alert("Testimonials saved successfully! ✨");
        } catch (err) {
            alert("Error saving data");
        } finally {
            setSaving(false);
        }
    };

    if (loading)
        return (
            <div className="p-10 font-serif italic text-[#004D3C] text-center">
                Loading Testimonials Panel...
            </div>
        );

    return (
        <div className="p-8 bg-[#F7F5F2] min-h-screen text-[#1a1a1a]">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-serif text-[#004D3C] flex items-center gap-3">
                            <Quote size={32} /> Testimonials Management
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Update client feedback and page headers
                        </p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-[#004D3C] text-white px-8 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:bg-[#003d30] transition-all disabled:opacity-50"
                    >
                        {saving ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <Save size={20} />
                        )}
                        {saving ? "Saving..." : "Save All Changes"}
                    </button>
                </div>

                <div className="space-y-8">
                    {/* Section 1: Page Header Settings */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-[#004D3C] font-serif text-xl mb-6">
                            Page Header Settings
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[2px] text-gray-400 font-bold ml-1">
                                    Main Title
                                </label>
                                <input
                                    placeholder="e.g. Client Testimonials"
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#004D3C]/20 outline-none transition-all"
                                    value={settings.pageTitle}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            pageTitle: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[2px] text-gray-400 font-bold ml-1">
                                    Subtitle (Optional)
                                </label>
                                <input
                                    placeholder="e.g. What our travelers say"
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#004D3C]/20 outline-none transition-all"
                                    value={settings.pageSubtitle}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            pageSubtitle: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Feedbacks List */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-end px-2">
                            <div>
                                <h2 className="text-[#004D3C] font-serif text-xl">
                                    Client Feedbacks
                                </h2>
                                <p className="text-gray-400 text-xs">
                                    Manage individual review cards
                                </p>
                            </div>
                            <button
                                onClick={addTestimonial}
                                className="bg-[#B59461] text-white px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 hover:bg-[#967a4f] transition-all shadow-md"
                            >
                                <Plus size={18} /> Add New Review
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(settings.testimonials || []).map((t, i) => (
                                <div
                                    key={i}
                                    className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm relative group hover:shadow-md transition-all"
                                >
                                    <button
                                        onClick={() => removeTestimonial(i)}
                                        className="absolute top-6 right-6 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                    <div className="space-y-6">
                                        {/* Image Upload Area */}
                                        <div className="flex items-center gap-5 pb-4 border-b border-gray-50">
                                            <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 flex-shrink-0 flex items-center justify-center relative">
                                                {t.image ? (
                                                    <img
                                                        src={t.image}
                                                        className="w-full h-full object-cover grayscale"
                                                        alt="client"
                                                    />
                                                ) : (
                                                    <User
                                                        className="text-gray-300"
                                                        size={32}
                                                    />
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                                                    Client Portrait
                                                </label>
                                                <UploadButton
                                                    endpoint="imageUploader"
                                                    onClientUploadComplete={(
                                                        res,
                                                    ) =>
                                                        updateTestimonial(
                                                            i,
                                                            "image",
                                                            res?.[0].url,
                                                        )
                                                    }
                                                    content={{
                                                        button({ ready }) {
                                                            if (ready)
                                                                return "Upload Photo";
                                                            return "Loading...";
                                                        },
                                                    }}
                                                    appearance={{
                                                        button: "text-xs bg-[#004D3C] text-white px-5 py-2.5 rounded-xl hover:bg-[#003d30] transition-all shadow-sm active:scale-95 border-none",
                                                        allowedContent:
                                                            "hidden",
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Comment Field */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">
                                                Testimonial Quote
                                            </label>
                                            <textarea
                                                placeholder="Enter the client's feedback here..."
                                                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl h-32 resize-none focus:bg-white focus:ring-2 focus:ring-[#004D3C]/20 outline-none transition-all font-serif italic text-gray-700"
                                                value={t.comment}
                                                onChange={(e) =>
                                                    updateTestimonial(
                                                        i,
                                                        "comment",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>

                                        {/* Name and Location Fields */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">
                                                    Client Name
                                                </label>
                                                <input
                                                    placeholder="e.g. Kian Graham"
                                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#004D3C]/20 outline-none transition-all text-sm"
                                                    value={t.name}
                                                    onChange={(e) =>
                                                        updateTestimonial(
                                                            i,
                                                            "name",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1 text-nowrap">
                                                    Location / Title
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        placeholder="e.g. London, UK"
                                                        className="w-full p-3 pl-9 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#004D3C]/20 outline-none transition-all text-sm"
                                                        value={t.location}
                                                        onChange={(e) =>
                                                            updateTestimonial(
                                                                i,
                                                                "location",
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                    <MapPin
                                                        size={14}
                                                        className="absolute left-3 top-3.5 text-gray-300"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
