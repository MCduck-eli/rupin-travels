"use client";

import React from "react";
import { Utensils, AlertTriangle, Plus, Trash2 } from "lucide-react";

interface FoodGuideEditorProps {
    data: {
        mainTitle: string;
        introText: string;
        listTitle: string;
        foodItems: string[];
        safetyTitle: string;
        safetyTips: string[];
    };
    onUpdate: (field: string, value: any) => void;
}

const FoodGuideEditor: React.FC<FoodGuideEditorProps> = ({
    data,
    onUpdate,
}) => {
    const handleArrayChange = (
        field: "foodItems" | "safetyTips",
        index: number,
        value: string,
    ) => {
        const newList = [...data[field]];
        newList[index] = value;
        onUpdate(field, newList);
    };

    const addItem = (field: "foodItems" | "safetyTips") => {
        onUpdate(field, [...data[field], ""]);
    };

    const removeItem = (field: "foodItems" | "safetyTips", index: number) => {
        const newList = data[field].filter((_, i) => i !== index);
        onUpdate(field, newList);
    };

    return (
        <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 border-b pb-3">
                <Utensils className="text-orange-500" size={20} /> Food Guide
                Section
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5">
                        Main Title
                    </label>
                    <input
                        className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#004D3C] text-sm"
                        value={data.mainTitle}
                        onChange={(e) => onUpdate("mainTitle", e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5">
                        Intro Text
                    </label>
                    <textarea
                        rows={3}
                        className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#004D3C] text-sm"
                        value={data.introText}
                        onChange={(e) => onUpdate("introText", e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400">
                            Food Items List
                        </label>
                        <input
                            placeholder="List Title (e.g. Must try dishes)"
                            className="w-full p-2 bg-gray-50 border rounded-lg text-sm mb-2"
                            value={data.listTitle}
                            onChange={(e) =>
                                onUpdate("listTitle", e.target.value)
                            }
                        />
                        {data.foodItems.map((item, idx) => (
                            <div key={idx} className="flex gap-2">
                                <input
                                    className="flex-1 p-2 bg-gray-50 border rounded-lg text-sm"
                                    value={item}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "foodItems",
                                            idx,
                                            e.target.value,
                                        )
                                    }
                                />
                                <button
                                    onClick={() => removeItem("foodItems", idx)}
                                    className="text-red-400 hover:text-red-600"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => addItem("foodItems")}
                            className="flex items-center gap-1 text-xs font-bold text-[#004D3C] uppercase tracking-wider"
                        >
                            <Plus size={14} /> Add Dish
                        </button>
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 items-center gap-1">
                            <AlertTriangle size={12} /> Safety Title & Tips
                        </label>
                        <input
                            placeholder="Safety Title"
                            className="w-full p-2 bg-gray-50 border rounded-lg text-sm mb-2"
                            value={data.safetyTitle}
                            onChange={(e) =>
                                onUpdate("safetyTitle", e.target.value)
                            }
                        />
                        {data.safetyTips.map((tip, idx) => (
                            <div key={idx} className="flex gap-2">
                                <input
                                    className="flex-1 p-2 bg-gray-50 border rounded-lg text-sm"
                                    value={tip}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "safetyTips",
                                            idx,
                                            e.target.value,
                                        )
                                    }
                                />
                                <button
                                    onClick={() =>
                                        removeItem("safetyTips", idx)
                                    }
                                    className="text-red-400 hover:text-red-600"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => addItem("safetyTips")}
                            className="flex items-center gap-1 text-xs font-bold text-[#004D3C] uppercase tracking-wider"
                        >
                            <Plus size={14} /> Add Tip
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FoodGuideEditor;
