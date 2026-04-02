"use client";

import React, { useState } from "react";
import { Plus, Trash2, Layout, ListChecks } from "lucide-react";

// SubItem interfeysini rasmga moslab yangiladik
export interface SubItem {
    id: string;
    emoji: string;
    title: string;
    description: string;
    items: string[]; // Bullet points uchun
}

interface BlogSubHeaderBlockProps {
    onSave: (items: SubItem[]) => void;
}

const BlogSubHeaderBlock: React.FC<BlogSubHeaderBlockProps> = ({ onSave }) => {
    const [emoji, setEmoji] = useState<string>("🚦");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [points, setPoints] = useState<string[]>([""]); // Bullet points uchun state
    const [savedItems, setSavedItems] = useState<SubItem[]>([]);

    // Yangi punkt qo'shish
    const addPoint = () => setPoints([...points, ""]);

    // Punktni o'zgartirish
    const updatePoint = (index: number, value: string) => {
        const newPoints = [...points];
        newPoints[index] = value;
        setPoints(newPoints);
    };

    // Punktni o'chirish
    const removePoint = (index: number) => {
        if (points.length > 1) {
            setPoints(points.filter((_, i) => i !== index));
        }
    };

    const handleAddSubBlock = () => {
        if (!title.trim()) return alert("Enter a title!");

        const newItem: SubItem = {
            id: Math.random().toString(36).substr(2, 9),
            emoji,
            title,
            description,
            items: points.filter((p) => p.trim() !== ""), // Bo'sh punktlarni olib tashlaymiz
        };

        const updatedItems = [...savedItems, newItem];
        setSavedItems(updatedItems);
        onSave(updatedItems);

        // Formani tozalash
        setTitle("");
        setDescription("");
        setEmoji("🚦");
        setPoints([""]);
    };

    const removeItem = (id: string) => {
        const updated = savedItems.filter((item) => item.id !== id);
        setSavedItems(updated);
        onSave(updated);
    };

    return (
        <div className="w-full border border-slate-200 p-5 rounded-2xl bg-white shadow-sm transition-all group">
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Layout size={14} /> Sub-Header Group Editor
                </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200 mb-6 space-y-4">
                <div className="flex gap-3 items-start">
                    <input
                        type="text"
                        value={emoji}
                        onChange={(e) => setEmoji(e.target.value)}
                        className="w-12 h-12 text-xl text-center border bg-white rounded-lg outline-none focus:border-blue-400 transition"
                    />
                    <div className="flex-1 space-y-3">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Sub-title (e.g., Cultural Tips)"
                            className="w-full text-[17px] font-bold text-black font-serif border-b bg-transparent border-slate-200 outline-none focus:border-blue-400 py-1"
                        />
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Intro description (optional)..."
                            className="w-full text-[14px] font-serif border-b bg-transparent border-slate-200 outline-none focus:border-blue-400 text-black py-1 italic"
                        />
                    </div>
                </div>
                <div className="ml-14 space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <ListChecks size={12} /> Bullet Points
                    </label>
                    {points.map((point, idx) => (
                        <div key={idx} className="flex gap-2">
                            <input
                                type="text"
                                value={point}
                                onChange={(e) =>
                                    updatePoint(idx, e.target.value)
                                }
                                placeholder={`Point ${idx + 1}`}
                                className="flex-1 p-2 border text-black rounded-lg text-sm bg-white outline-none focus:border-blue-400"
                            />
                            <button
                                onClick={() => removePoint(idx)}
                                className="text-red-400 hover:text-red-600"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={addPoint}
                        className="text-blue-600 text-[11px] font-bold flex items-center gap-1 hover:underline pt-1"
                    >
                        <Plus size={14} /> Add Point
                    </button>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        onClick={handleAddSubBlock}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-sm"
                    >
                        <Plus size={14} /> Add Block to List
                    </button>
                </div>
            </div>
            {savedItems.length > 0 && (
                <div className="space-y-8 pt-4 border-t border-slate-50 font-serif">
                    {savedItems.map((item) => (
                        <div
                            key={item.id}
                            className="relative group max-w-xl mx-auto pl-2"
                        >
                            <button
                                onClick={() => removeItem(item.id)}
                                className="absolute -left-8 top-1 text-red-300 opacity-0 group-hover:opacity-100 hover:text-red-500 transition"
                            >
                                <Trash2 size={16} />
                            </button>

                            <h4 className="text-[19px] font-bold flex items-center gap-2 text-[#1a1a1a]">
                                <span>{item.emoji}</span> {item.title}
                            </h4>
                            {item.description && (
                                <p className="text-[16px] text-[#1a1a1a] opacity-90 mt-1 mb-2">
                                    {item.description}
                                </p>
                            )}
                            <ul className="list-disc ml-8 space-y-1">
                                {item.items.map((p, i) => (
                                    <li
                                        key={i}
                                        className="text-[16px] text-[#1a1a1a] opacity-90 leading-relaxed"
                                    >
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogSubHeaderBlock;
