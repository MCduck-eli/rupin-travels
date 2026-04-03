"use client";

import React from "react";
import { Sparkles, Plus, Trash2 } from "lucide-react";

interface WhyVisitIndiaEditorProps {
    data: {
        title: string;
        subtitle: string;
        reasons: string[];
        closingText: string;
    };
    onUpdate: (field: string, value: any) => void;
}

const WhyVisitIndiaEditor: React.FC<WhyVisitIndiaEditorProps> = ({
    data,
    onUpdate,
}) => {
    const handleReasonChange = (index: number, value: string) => {
        const newReasons = [...(data.reasons || [])];
        newReasons[index] = value;
        onUpdate("reasons", newReasons);
    };

    return (
        <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 border-b pb-3">
                <Sparkles className="text-yellow-500" size={20} /> Why Visit
                India Editor
            </h2>

            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5">
                        Section Title
                    </label>
                    <input
                        className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#004D3C] text-sm text-black"
                        value={data.title || ""}
                        onChange={(e) => onUpdate("title", e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5">
                        Subtitle
                    </label>
                    <textarea
                        className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#004D3C] text-sm text-black h-20"
                        value={data.subtitle || ""}
                        onChange={(e) => onUpdate("subtitle", e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-3">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400">
                    Reasons List
                </label>
                {(data.reasons || []).map((reason, idx) => (
                    <div key={idx} className="flex gap-2">
                        <input
                            className="flex-1 p-2 bg-gray-50 border rounded-lg text-sm text-black"
                            value={reason}
                            onChange={(e) =>
                                handleReasonChange(idx, e.target.value)
                            }
                        />
                        <button
                            onClick={() =>
                                onUpdate(
                                    "reasons",
                                    data.reasons.filter((_, i) => i !== idx),
                                )
                            }
                            className="text-red-400 p-2 hover:bg-red-50 rounded-lg transition"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
                <button
                    onClick={() =>
                        onUpdate("reasons", [...(data.reasons || []), ""])
                    }
                    className="text-xs font-bold text-[#004D3C] flex items-center gap-1 hover:underline"
                >
                    <Plus size={14} /> Add Reason
                </button>
            </div>

            <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5">
                    Closing Text
                </label>
                <textarea
                    className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#004D3C] text-sm text-black h-24"
                    value={data.closingText || ""}
                    onChange={(e) => onUpdate("closingText", e.target.value)}
                />
            </div>
        </section>
    );
};

export default WhyVisitIndiaEditor;
