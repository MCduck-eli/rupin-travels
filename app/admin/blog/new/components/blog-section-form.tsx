"use client";
import React from "react";
import { Plus, Trash2, ListChecks, Lightbulb } from "lucide-react";

interface BlogSectionFormProps {
    sectionKey: string;
    icon: React.ReactNode;
    titleLabel: string;
    formData: any;
    setFormData: (data: any) => void;
}

export const BlogSectionForm: React.FC<BlogSectionFormProps> = ({
    sectionKey,
    formData,
    setFormData,
}) => {
    const sectionData = formData[sectionKey] || {};

    const updateField = (field: string, value: any) => {
        setFormData({
            ...formData,
            [sectionKey]: {
                ...sectionData,
                [field]: value,
            },
        });
    };
    const listKey = sectionData.items
        ? "items"
        : sectionData.reasons
          ? "reasons"
          : sectionData.tips
            ? "tips"
            : "items";

    const activeList = sectionData[listKey] || [];

    const handleListItemChange = (index: number, value: string) => {
        const newItems = [...activeList];
        newItems[index] = value;
        updateField(listKey, newItems);
    };

    const addItem = () => updateField(listKey, [...activeList, ""]);

    const removeItem = (index: number) => {
        updateField(
            listKey,
            activeList.filter((_: any, i: number) => i !== index),
        );
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5 mb-6">
            <div className="space-y-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-1 w-16">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">
                            Emoji
                        </label>
                        <input
                            type="text"
                            placeholder="🌍"
                            className="p-2 border rounded-lg text-center text-xl outline-[#004D3C]"
                            value={sectionData.emoji || ""}
                            onChange={(e) =>
                                updateField("emoji", e.target.value)
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">
                            Section Title
                        </label>
                        <input
                            type="text"
                            placeholder="What to Expect..."
                            className="p-2 border rounded-lg text-black font-serif text-lg outline-[#004D3C]"
                            value={
                                sectionData.title || sectionData.mainTitle || ""
                            }
                            onChange={(e) =>
                                updateField(
                                    sectionData.title !== undefined
                                        ? "title"
                                        : "mainTitle",
                                    e.target.value,
                                )
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                        Intro / Subtitle
                    </label>
                    <textarea
                        placeholder="India is intense, colorful, and full of life..."
                        rows={2}
                        className="p-3 border text-black rounded-lg outline-[#004D3C] text-sm italic font-serif"
                        value={
                            sectionData.subtitle || sectionData.introText || ""
                        }
                        onChange={(e) =>
                            updateField(
                                sectionData.subtitle !== undefined
                                    ? "subtitle"
                                    : "introText",
                                e.target.value,
                            )
                        }
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                        <ListChecks size={12} /> Points List
                    </label>
                    {activeList.map((item: string, idx: number) => (
                        <div key={idx} className="flex gap-2 group">
                            <span className="text-gray-300 mt-2">•</span>
                            <input
                                type="text"
                                placeholder={`Point ${idx + 1}`}
                                className="flex-1 p-2 border-b border-gray-100 text-black outline-none focus:border-[#004D3C] text-sm transition-all bg-transparent"
                                value={item}
                                onChange={(e) =>
                                    handleListItemChange(idx, e.target.value)
                                }
                            />
                            <button
                                type="button"
                                onClick={() => removeItem(idx)}
                                className="text-red-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addItem}
                        className="text-[#004D3C] text-[11px] font-bold flex items-center gap-1 hover:underline mt-2"
                    >
                        <Plus size={14} /> Add Point
                    </button>
                </div>
                <div className="pt-4 border-t border-dashed mt-4 bg-yellow-50/30 p-3 rounded-xl border-yellow-100">
                    <label className="text-[10px] font-bold text-amber-600 uppercase flex items-center gap-1 mb-2">
                        <Lightbulb size={12} /> Pro Tip
                    </label>
                    <input
                        type="text"
                        placeholder="💡 Embrace the chaos — it’s part of the experience."
                        className="w-full p-2 border-b border-amber-200 bg-transparent text-black italic text-sm outline-none focus:border-amber-500 font-serif"
                        value={sectionData.proTip || ""}
                        onChange={(e) => updateField("proTip", e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};
