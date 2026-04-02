"use client";

import React from "react";
import { List, Globe, Lightbulb, Plus, Trash2 } from "lucide-react";

interface ExpectationEditorProps {
    title?: string;
    subtitle?: string;
    items?: string[];
    proTip?: string;
    onUpdate: (field: string, value: any) => void;
}

const ExpectationEditor: React.FC<ExpectationEditorProps> = ({
    title,
    subtitle,
    items,
    proTip,
    onUpdate,
}) => {
    const defaultItems = [
        "Busy streets and vibrant markets",
        "Rich history and iconic landmarks",
        "Diverse languages and traditions",
        "Friendly and helpful locals",
    ];

    const currentItems = items && items.length > 0 ? items : defaultItems;
    const currentTitle = title || "What to Expect on Your First Visit to India";
    const currentSubtitle =
        subtitle || "India is intense, colorful, and full of life. Expect:";
    const currentProTip =
        proTip || "Embrace the chaos—it's part of the experience.";

    const handleItemChange = (index: number, newValue: string) => {
        const newItems = [...currentItems];
        newItems[index] = newValue;
        onUpdate("items", newItems);
    };

    const addItem = () => {
        onUpdate("items", [...currentItems, ""]);
    };

    const removeItem = (index: number) => {
        onUpdate(
            "items",
            currentItems.filter((_, i) => i !== index),
        );
    };

    return (
        <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 border-b pb-3">
                <Globe className="text-green-600" size={20} /> Expectations
                Section
            </h2>

            <div className="grid grid-cols-1 gap-5">
                <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 ml-1 block">
                        Title
                    </label>
                    <input
                        className="w-full p-3 bg-gray-50 border-transparent border focus:border-[#004D3C] focus:bg-white rounded-xl outline-none transition-all text-base font-medium"
                        value={currentTitle}
                        onChange={(e) => onUpdate("title", e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 ml-1 block">
                        Subtitle
                    </label>
                    <input
                        className="w-full p-3 bg-gray-50 border-transparent border focus:border-[#004D3C] focus:bg-white rounded-xl outline-none transition-all text-base font-medium"
                        value={currentSubtitle}
                        onChange={(e) => onUpdate("subtitle", e.target.value)}
                    />
                </div>
                <div>
                    <label className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 ml-1">
                        <span className="flex items-center gap-2">
                            <List size={14} /> List Items
                        </span>
                        <button
                            onClick={addItem}
                            className="text-[#004D3C] hover:underline flex items-center gap-1 font-bold"
                        >
                            <Plus size={12} /> Add Item
                        </button>
                    </label>
                    <div className="space-y-3">
                        {currentItems.map((item, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    className="flex-1 p-3 bg-gray-50 border-transparent border focus:border-[#004D3C] focus:bg-white rounded-xl outline-none transition-all text-sm"
                                    value={item}
                                    onChange={(e) =>
                                        handleItemChange(index, e.target.value)
                                    }
                                />
                                <button
                                    onClick={() => removeItem(index)}
                                    className="p-3 text-red-400 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 ml-1">
                        <Lightbulb size={14} /> Pro Tip
                    </label>
                    <textarea
                        rows={2}
                        className="w-full p-3 bg-gray-50 border-transparent border focus:border-[#004D3C] focus:bg-white rounded-xl outline-none transition-all text-sm italic font-medium"
                        value={currentProTip}
                        onChange={(e) => onUpdate("proTip", e.target.value)}
                    />
                </div>
            </div>
        </section>
    );
};

export default ExpectationEditor;
