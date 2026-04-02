"use client";

import React from "react";
import { ShieldAlert, Plus, Trash2 } from "lucide-react";

interface SafetyTipsEditorProps {
    data: {
        title: string;
        subtitle: string;
        tips: string[];
    };
    onUpdate: (field: string, value: any) => void;
}

const SafetyTipsEditor: React.FC<SafetyTipsEditorProps> = ({
    data,
    onUpdate,
}) => {
    const handleTipChange = (index: number, value: string) => {
        const newTips = [...(data.tips || [])];
        newTips[index] = value;
        onUpdate("tips", newTips);
    };

    const addTip = () => {
        onUpdate("tips", [...(data.tips || []), ""]);
    };

    const removeTip = (index: number) => {
        const newTips = (data.tips || []).filter((_, i) => i !== index);
        onUpdate("tips", newTips);
    };

    return (
        <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 border-b pb-3">
                <ShieldAlert className="text-red-500" size={20} /> Safety Tips
                Section
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5">
                        Section Title
                    </label>
                    <input
                        className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#004D3C] text-sm text-black"
                        value={data.title}
                        onChange={(e) => onUpdate("title", e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5">
                        Subtitle
                    </label>
                    <input
                        className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#004D3C] text-sm text-black"
                        value={data.subtitle}
                        onChange={(e) => onUpdate("subtitle", e.target.value)}
                    />
                </div>

                <div className="space-y-3">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400">
                        Safety Tips List
                    </label>
                    {(data.tips || []).map((tip, idx) => (
                        <div key={idx} className="flex gap-2">
                            <input
                                className="flex-1 p-2 bg-gray-50 border rounded-lg text-sm text-black"
                                value={tip}
                                onChange={(e) =>
                                    handleTipChange(idx, e.target.value)
                                }
                                placeholder="Enter safety tip..."
                            />
                            <button
                                type="button"
                                onClick={() => removeTip(idx)}
                                className="text-red-400 hover:text-red-600 p-2"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addTip}
                        className="flex items-center gap-1 text-xs font-bold text-[#004D3C] uppercase mt-2"
                    >
                        <Plus size={14} /> Add Safety Tip
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SafetyTipsEditor;
