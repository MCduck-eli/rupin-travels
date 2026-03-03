"use client";

import React, { useState, useEffect } from "react";
import {
    Save,
    Loader2,
    Phone,
    Mail,
    MapPin,
    Trash2,
    Image as ImageIcon,
} from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";

export default function AdminContact() {
    const [settings, setSettings] = useState({
        address: "",
        email: "",
        phone: "",
        image: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch("/api/contact-settings")
            .then((res) => res.json())
            .then((data) => {
                if (data && !data.error) setSettings(data);
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/contact-settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            if (res.ok) alert("Contact info saved! 📞");
        } catch (err) {
            alert("Error saving");
        } finally {
            setSaving(false);
        }
    };

    if (loading)
        return (
            <div className="p-10 font-serif italic text-center text-[#004D3C]">
                Loading Contact Panel...
            </div>
        );

    return (
        <div className="p-8 bg-[#F7F5F2] min-h-screen text-[#1a1a1a]">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-serif text-[#004D3C] flex items-center gap-3">
                        <Phone /> Contact Management
                    </h1>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-[#004D3C] text-white px-8 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:bg-[#003d30] transition-all"
                    >
                        {saving ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <Save />
                        )}
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Image Section */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border space-y-4">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold flex items-center gap-2">
                            <ImageIcon size={14} /> Side Image
                        </label>
                        <div className="aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 relative group">
                            {settings.image ? (
                                <>
                                    <img
                                        src={settings.image}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={() =>
                                            setSettings({
                                                ...settings,
                                                image: "",
                                            })
                                        }
                                        className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-300 italic text-sm">
                                    No image
                                </div>
                            )}
                        </div>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) =>
                                setSettings({
                                    ...settings,
                                    image: res?.[0].url,
                                })
                            }
                            appearance={{
                                button: "w-full text-xs bg-[#004D3C] text-white py-3 rounded-xl hover:bg-[#003d30] transition-all border-none",
                                allowedContent: "hidden",
                            }}
                        />
                    </div>

                    {/* Details Section */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold flex items-center gap-2">
                                <MapPin size={14} /> Mailing Address
                            </label>
                            <textarea
                                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl h-24 resize-none outline-none focus:ring-2 focus:ring-[#004D3C]/10 transition-all"
                                value={settings.address}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        address: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold flex items-center gap-2">
                                <Mail size={14} /> Email Address
                            </label>
                            <input
                                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#004D3C]/10 transition-all"
                                value={settings.email}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold flex items-center gap-2">
                                <Phone size={14} /> Phone Number
                            </label>
                            <input
                                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#004D3C]/10 transition-all"
                                value={settings.phone}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        phone: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
