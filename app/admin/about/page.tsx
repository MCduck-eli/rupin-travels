"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2, Info, Image as ImageIcon, Trash2 } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";

export default function AdminAbout() {
    const [settings, setSettings] = useState({
        title: "",
        description: "",
        topImage: "",
        bottomImage: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch("/api/about-settings")
            .then((res) => res.json())
            .then((data) => {
                if (data && !data.error) setSettings(data);
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

    // Rasmni o'chirish funksiyasi
    const clearImage = (field: "topImage" | "bottomImage") => {
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
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-serif text-[#004D3C] flex items-center gap-3">
                        <Info /> Edit About Us
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

                {/* Text Content */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">
                            Main Heading
                        </label>
                        <input
                            className="w-full p-4 text-black bg-gray-50 border border-gray-100 rounded-2xl font-serif text-xl outline-none focus:ring-2 focus:ring-[#004D3C]/10 transition-all"
                            value={settings.title}
                            onChange={(e) =>
                                setSettings({
                                    ...settings,
                                    title: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">
                            Description Text
                        </label>
                        <textarea
                            className="w-full p-4 text-black bg-gray-50 border border-gray-100 rounded-2xl h-40 resize-none outline-none focus:ring-2 focus:ring-[#004D3C]/10 leading-relaxed"
                            value={settings.description}
                            onChange={(e) =>
                                setSettings({
                                    ...settings,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                {/* Images Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Top Image */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border space-y-4">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold flex items-center gap-2">
                            <ImageIcon size={14} /> Top Right Image
                        </label>
                        <div className="aspect-video bg-gray-50 rounded-2xl overflow-hidden mb-4 border-2 border-dashed border-gray-200 relative group">
                            {settings.topImage ? (
                                <>
                                    <img
                                        src={settings.topImage}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Trash Button */}
                                    <button
                                        onClick={() => clearImage("topImage")}
                                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                        title="Remove image"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-300 italic text-sm">
                                    No image selected
                                </div>
                            )}
                        </div>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) =>
                                setSettings({
                                    ...settings,
                                    topImage: res?.[0].url,
                                })
                            }
                            appearance={{
                                button: "w-full text-xs bg-[#004D3C] text-white py-3 rounded-xl hover:bg-[#003d30] transition-all",
                                allowedContent: "hidden",
                            }}
                        />
                    </div>

                    {/* Bottom Image */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border space-y-4">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold flex items-center gap-2">
                            <ImageIcon size={14} /> Bottom Center Image
                        </label>
                        <div className="aspect-video bg-gray-50 rounded-2xl overflow-hidden mb-4 border-2 border-dashed border-gray-200 relative group">
                            {settings.bottomImage ? (
                                <>
                                    <img
                                        src={settings.bottomImage}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Trash Button */}
                                    <button
                                        onClick={() =>
                                            clearImage("bottomImage")
                                        }
                                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                        title="Remove image"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-300 italic text-sm">
                                    No image selected
                                </div>
                            )}
                        </div>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) =>
                                setSettings({
                                    ...settings,
                                    bottomImage: res?.[0].url,
                                })
                            }
                            appearance={{
                                button: "w-full text-xs bg-[#004D3C] text-white py-3 rounded-xl hover:bg-[#003d30] transition-all",
                                allowedContent: "hidden",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
