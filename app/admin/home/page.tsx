"use client";
import { useState, useEffect } from "react";

export default function AdminHomeSettings() {
    const [settings, setSettings] = useState({
        heroVideoUrl: "",
        philosophyTagline: "",
        philosophyTitle: "",
        philosophyContent: "",
    });

    useEffect(() => {
        fetch("/api/home-settings")
            .then((res) => res.json())
            .then((data) => setSettings(data));
    }, []);

    const handleSave = async () => {
        const res = await fetch("/api/home-settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(settings),
        });
        if (res.ok) alert("Home sahifasi muvaffaqiyatli yangilandi!");
    };

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-10">
            <h1 className="text-3xl font-serif mb-8 border-b pb-4 text-[#0D2B1D]">
                Home Page Settings
            </h1>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Hero Video URL (Direct link)
                    </label>
                    <input
                        type="text"
                        className="w-full p-3 border rounded-md mt-1"
                        value={settings.heroVideoUrl}
                        onChange={(e) =>
                            setSettings({
                                ...settings,
                                heroVideoUrl: e.target.value,
                            })
                        }
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Philosophy Tagline
                    </label>
                    <input
                        type="text"
                        className="w-full p-3 border rounded-md mt-1"
                        value={settings.philosophyTagline}
                        onChange={(e) =>
                            setSettings({
                                ...settings,
                                philosophyTagline: e.target.value,
                            })
                        }
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-1000">
                        Philosophy Title
                    </label>
                    <input
                        type="text"
                        className="w-full p-3 border rounded-md mt-1"
                        value={settings.philosophyTitle}
                        onChange={(e) =>
                            setSettings({
                                ...settings,
                                philosophyTitle: e.target.value,
                            })
                        }
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Philosophy Content (List items)
                    </label>
                    <textarea
                        rows={5}
                        className="w-full p-3 border rounded-md mt-1"
                        value={settings.philosophyContent}
                        onChange={(e) =>
                            setSettings({
                                ...settings,
                                philosophyContent: e.target.value,
                            })
                        }
                        placeholder="Har bir qatorni yangi satrdan yozing..."
                    />
                </div>

                <button
                    onClick={handleSave}
                    className="bg-[#0D2B1D] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all"
                >
                    O'zgarishlarni Saqlash
                </button>
            </div>
        </div>
    );
}
