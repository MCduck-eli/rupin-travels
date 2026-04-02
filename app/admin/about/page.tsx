"use client";

import React, { useState, useEffect } from "react";
import {
    Save,
    Loader2,
    Info,
    Image as ImageIcon,
    Trash2,
    User,
} from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";

export default function AdminAbout() {
    const [settings, setSettings] = useState({
        whoAreWeTitle: "Who Are We?",
        founderName: "Sashi Nk",
        founderRole: "Founder and CEO",
        founderImage:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
        founderAboutTitle: "About the Founder",
        founderDescription1: "",
        founderDescription2: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch("/api/about-settings")
            .then((res) => res.json())
            .then((data) => {
                if (data && !data.error)
                    setSettings((prev) => ({ ...prev, ...data }));
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/about-settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            if (res.ok) alert("About Us updated! ✨");
        } catch (error) {
            alert("Error saving data");
        } finally {
            setSaving(false);
        }
    };

    const clearImage = (field: string) => {
        setSettings({ ...settings, [field]: "" });
    };

    if (loading)
        return (
            <div className="p-10 font-serif italic text-[#004D3C] text-center">
                Loading About Panel...
            </div>
        );

    return (
        <div className="p-8 bg-[#F7F5F2] min-h-screen text-[#1a1a1a]">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border">
                    <h1 className="text-3xl font-serif text-[#004D3C] flex items-center gap-3">
                        <Info /> Edit About Page
                    </h1>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-[#004D3C] text-white px-8 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:bg-[#003d30] transition-all disabled:opacity-50"
                    >
                        {saving ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <Save />
                        )}
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Chap tomonda: Founder Ma'lumotlari */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border space-y-4">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold flex items-center gap-2">
                                <User size={14} /> Founder Image (Circle)
                            </label>

                            <div className="aspect-square w-48 mx-auto bg-gray-50 rounded-full overflow-hidden border-2 border-dashed border-gray-200 relative group">
                                {settings.founderImage ? (
                                    <>
                                        <img
                                            src={settings.founderImage}
                                            className="w-full h-full object-cover grayscale"
                                        />
                                        <button
                                            onClick={() =>
                                                clearImage("founderImage")
                                            }
                                            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="text-white" />
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-300 text-xs text-center p-4">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) =>
                                    setSettings({
                                        ...settings,
                                        founderImage: res?.[0].url,
                                    })
                                }
                                appearance={{
                                    button: "w-full text-xs bg-[#59493b] text-white py-2 rounded-xl hover:opacity-90",
                                    allowedContent: "hidden",
                                }}
                            />

                            <div className="space-y-4 pt-4">
                                <div>
                                    <label className="text-[10px] text-gray-400 uppercase font-bold">
                                        Name
                                    </label>
                                    <input
                                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-1 focus:ring-[#59493b]"
                                        value={settings.founderName}
                                        onChange={(e) =>
                                            setSettings({
                                                ...settings,
                                                founderName: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-gray-400 uppercase font-bold">
                                        Role
                                    </label>
                                    <input
                                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-1 focus:ring-[#59493b]"
                                        value={settings.founderRole}
                                        onChange={(e) =>
                                            setSettings({
                                                ...settings,
                                                founderRole: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* O'ng tomonda: Matnlar */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">
                                        Section Title
                                    </label>
                                    <input
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#59493b]/10 transition-all"
                                        value={settings.whoAreWeTitle}
                                        onChange={(e) =>
                                            setSettings({
                                                ...settings,
                                                whoAreWeTitle: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">
                                        About Title
                                    </label>
                                    <input
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#59493b]/10 transition-all"
                                        value={settings.founderAboutTitle}
                                        onChange={(e) =>
                                            setSettings({
                                                ...settings,
                                                founderAboutTitle:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">
                                    Description Paragraph 1
                                </label>
                                <textarea
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl h-32 resize-none outline-none focus:ring-2 focus:ring-[#59493b]/10 leading-relaxed"
                                    value={settings.founderDescription1}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            founderDescription1: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">
                                    Description Paragraph 2
                                </label>
                                <textarea
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl h-32 resize-none outline-none focus:ring-2 focus:ring-[#59493b]/10 leading-relaxed"
                                    value={settings.founderDescription2}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            founderDescription2: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
