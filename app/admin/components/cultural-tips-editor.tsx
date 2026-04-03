"use client";

import React from "react";
import { Compass, Plus, Trash2, Smile } from "lucide-react";

interface ChallengeItem {
    emoji: string;
    title: string;
    description: string;
}

interface CulturalTipsEditorProps {
    data: {
        mainTitle: string;
        introText: string;
        tipsList: string[];
        challengesTitle: string;
        challenges: ChallengeItem[];
    };
    onUpdate: (field: string, value: any) => void;
}

const CulturalTipsEditor: React.FC<CulturalTipsEditorProps> = ({
    data,
    onUpdate,
}) => {
    const handleTipChange = (index: number, value: string) => {
        const newTips = [...(data.tipsList || [])];
        newTips[index] = value;
        onUpdate("tipsList", newTips);
    };
    const handleChallengeChange = (
        index: number,
        field: keyof ChallengeItem,
        value: string,
    ) => {
        const newChallenges = [...(data.challenges || [])];
        newChallenges[index] = { ...newChallenges[index], [field]: value };
        onUpdate("challenges", newChallenges);
    };

    return (
        <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 border-b pb-3">
                <Compass className="text-blue-500" size={20} /> Cultural Tips
                Editor
            </h2>

            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5">
                        Main Title
                    </label>
                    <input
                        className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#004D3C] text-sm text-black"
                        value={data.mainTitle || ""}
                        onChange={(e) => onUpdate("mainTitle", e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5">
                        Intro Text
                    </label>
                    <textarea
                        className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#004D3C] text-sm text-black h-20"
                        value={data.introText || ""}
                        onChange={(e) => onUpdate("introText", e.target.value)}
                    />
                </div>
            </div>
            <div className="space-y-3">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400">
                    Tips List
                </label>
                {(data.tipsList || []).map((tip, idx) => (
                    <div key={idx} className="flex gap-2">
                        <input
                            className="flex-1 p-2 bg-gray-50 border rounded-lg text-sm text-black"
                            value={tip}
                            onChange={(e) =>
                                handleTipChange(idx, e.target.value)
                            }
                        />
                        <button
                            onClick={() =>
                                onUpdate(
                                    "tipsList",
                                    data.tipsList.filter((_, i) => i !== idx),
                                )
                            }
                            className="text-red-400 p-2"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
                <button
                    onClick={() =>
                        onUpdate("tipsList", [...(data.tipsList || []), ""])
                    }
                    className="text-xs font-bold text-[#004D3C] flex items-center gap-1"
                >
                    <Plus size={14} /> Add Tip
                </button>
            </div>

            <hr />
            <div className="space-y-4">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400">
                    Challenges Section
                </label>
                <input
                    className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#004D3C] text-sm font-bold text-black"
                    value={data.challengesTitle || ""}
                    onChange={(e) =>
                        onUpdate("challengesTitle", e.target.value)
                    }
                    placeholder="Challenges Title"
                />

                <div className="space-y-4">
                    {(data.challenges || []).map((item, idx) => (
                        <div
                            key={idx}
                            className="p-4 border rounded-xl bg-gray-50 space-y-3 relative"
                        >
                            <button
                                onClick={() =>
                                    onUpdate(
                                        "challenges",
                                        data.challenges.filter(
                                            (_, i) => i !== idx,
                                        ),
                                    )
                                }
                                className="absolute top-2 right-2 text-red-400"
                            >
                                <Trash2 size={16} />
                            </button>
                            <div className="flex gap-2">
                                <input
                                    className="w-12 p-2 border rounded-lg text-center"
                                    value={item.emoji}
                                    onChange={(e) =>
                                        handleChallengeChange(
                                            idx,
                                            "emoji",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Emoji"
                                />
                                <input
                                    className="flex-1 p-2 border rounded-lg font-bold"
                                    value={item.title}
                                    onChange={(e) =>
                                        handleChallengeChange(
                                            idx,
                                            "title",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Title"
                                />
                            </div>
                            <textarea
                                className="w-full p-2 border rounded-lg text-sm"
                                value={item.description}
                                onChange={(e) =>
                                    handleChallengeChange(
                                        idx,
                                        "description",
                                        e.target.value,
                                    )
                                }
                                placeholder="Description"
                            />
                        </div>
                    ))}
                    <button
                        onClick={() =>
                            onUpdate("challenges", [
                                ...(data.challenges || []),
                                { emoji: "❓", title: "", description: "" },
                            ])
                        }
                        className="text-xs font-bold text-[#004D3C] flex items-center gap-1"
                    >
                        <Plus size={14} /> Add Challenge
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CulturalTipsEditor;
