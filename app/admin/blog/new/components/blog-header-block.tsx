"use client";

import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface HeaderBlockData {
    emoji: string;
    title: string;
    description: string;
    items: string[];
}

interface BlogHeaderBlockProps {
    onSave: (data: HeaderBlockData) => void;
}

const BlogHeaderBlock: React.FC<BlogHeaderBlockProps> = ({ onSave }) => {
    const [emoji, setEmoji] = useState<string>("⚠️");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [items, setItems] = useState<string[]>([""]);

    const handleAddItem = () => setItems([...items, ""]);

    const handleItemChange = (index: number, value: string) => {
        const newItems = [...items];
        newItems[index] = value;
        setItems(newItems);
    };

    const handleRemoveItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        onSave({
            emoji,
            title,
            description,
            items: items.filter((i) => i.trim() !== ""),
        });
    };

    return (
        <div className="w-full border border-slate-200 p-6 rounded-2xl bg-white shadow-sm hover:border-orange-300 transition-all">
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    List Block Editor
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={emoji}
                            onChange={(e) => setEmoji(e.target.value)}
                            className="w-12 h-12 text-xl text-center text-black border rounded-xl outline-none focus:border-orange-400"
                        />
                        <div className="flex-1 space-y-3">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Section Title..."
                                className="w-full text-lg font-bold text-black border-b focus:border-orange-400 outline-none"
                            />
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Short description..."
                                className="w-full text-sm border-b text-black focus:border-orange-400 outline-none italic"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">
                            List Items
                        </label>
                        {items.map((item, idx) => (
                            <div key={idx} className="flex gap-2 group">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) =>
                                        handleItemChange(idx, e.target.value)
                                    }
                                    placeholder={`Point ${idx + 1}`}
                                    className="flex-1 text-sm p-2 border text-black rounded-lg outline-none focus:border-orange-400"
                                />
                                <button
                                    onClick={() => handleRemoveItem(idx)}
                                    className="text-red-400 opacity-0 group-hover:opacity-100 transition"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={handleAddItem}
                            className="flex items-center gap-1 text-orange-500 text-xs font-bold mt-2 hover:underline"
                        >
                            <Plus size={14} /> Add Item
                        </button>
                    </div>
                </div>
                <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 font-serif">
                    <h3 className="text-[22px] font-bold leading-tight text-[#1a1a1a] flex items-center gap-2">
                        <span>{emoji}</span> {title || "Title"}
                    </h3>
                    <p className="text-[18px] font-medium text-[#1a1a1a] mt-1 mb-4">
                        {description || "Description..."}
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                        {items.map(
                            (item, idx) =>
                                item && (
                                    <li
                                        key={idx}
                                        className="text-[17px] text-[#1a1a1a] leading-snug"
                                    >
                                        {item}
                                    </li>
                                ),
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BlogHeaderBlock;
