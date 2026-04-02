"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Plus, Trash2, Save, ListPlus } from "lucide-react";

interface ListItem {
    id: string;
    text: string;
}

interface ListSection {
    id: string;
    emoji: string;
    title: string;
    items: string[];
}

interface ListBlockEditorProps {
    onSave: (sections: ListSection[]) => void;
}

const ListBlockEditor: React.FC<ListBlockEditorProps> = ({ onSave }) => {
    const [emoji, setEmoji] = useState("🍲");
    const [title, setTitle] = useState("");
    const [items, setItems] = useState<ListItem[]>([
        { id: uuidv4(), text: "" },
    ]);
    const [savedSections, setSavedSections] = useState<ListSection[]>([]);

    const handleAddItem = () =>
        setItems([...items, { id: uuidv4(), text: "" }]);

    const handleItemChange = (id: string, text: string) => {
        setItems(items.map((i) => (i.id === id ? { ...i, text } : i)));
    };

    const deleteInputItem = (id: string) => {
        if (items.length > 1) setItems(items.filter((i) => i.id !== id));
    };
    const handleAddSection = () => {
        if (!title.trim()) return alert("Sarlavha kiriting!");

        const newSection: ListSection = {
            id: uuidv4(),
            emoji,
            title,
            items: items.map((i) => i.text).filter((t) => t.trim() !== ""),
        };

        const updatedSections = [...savedSections, newSection];
        setSavedSections(updatedSections);
        onSave(updatedSections);

        setTitle("");
        setItems([{ id: uuidv4(), text: "" }]);
        setEmoji("🍲");
    };

    const removeSavedSection = (id: string) => {
        const updated = savedSections.filter((s) => s.id !== id);
        setSavedSections(updated);
        onSave(updated);
    };

    return (
        <div className="w-full border border-slate-200 p-5 rounded-2xl bg-white shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#004D3C] font-bold text-sm border-b pb-2">
                <ListPlus size={18} /> Multi-List Editor
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300 space-y-3">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={emoji}
                        onChange={(e) => setEmoji(e.target.value)}
                        className="w-10 h-10 text-center border rounded-lg text-black bg-white outline-none focus:border-indigo-400"
                    />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Section Title (e.g. Best Dishes...)"
                        className="flex-1 px-3 border rounded-lg bg-white text-black outline-none focus:border-indigo-400 font-serif"
                    />
                </div>

                <div className="space-y-2 pl-12">
                    {items.map((item, idx) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-2 group"
                        >
                            <span className="text-slate-400 text-xs">•</span>
                            <input
                                type="text"
                                value={item.text}
                                onChange={(e) =>
                                    handleItemChange(item.id, e.target.value)
                                }
                                placeholder={`Item ${idx + 1}`}
                                className="flex-1 bg-transparent border-b  text-black border-slate-200 focus:border-indigo-400 outline-none text-sm py-1"
                            />
                            <button
                                onClick={() => deleteInputItem(item.id)}
                                className="text-red-400 opacity-0 group-hover:opacity-100 p-1"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                    <div className="flex justify-between items-center pt-2">
                        <button
                            onClick={handleAddItem}
                            className="text-indigo-600 text-xs font-bold flex items-center gap-1 hover:underline"
                        >
                            <Plus size={14} /> Add Point
                        </button>
                        <button
                            onClick={handleAddSection}
                            className="bg-[#004D3C] text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-opacity-90 transition"
                        >
                            <Save size={14} /> Save Block
                        </button>
                    </div>
                </div>
            </div>
            {savedSections.length > 0 && (
                <div className="mt-6 space-y-6 pt-4 border-t border-slate-100 font-serif">
                    <p className="text-[10px] text-center text-slate-400 tracking-widest uppercase">
                        Saved Content Preview
                    </p>
                    {savedSections.map((section) => (
                        <div
                            key={section.id}
                            className="relative group max-w-xl mx-auto"
                        >
                            <button
                                onClick={() => removeSavedSection(section.id)}
                                className="absolute -left-8 top-1 text-red-300 opacity-0 group-hover:opacity-100 hover:text-red-500 transition"
                            >
                                <Trash2 size={16} />
                            </button>
                            <h3 className="text-[20px] font-bold flex items-center gap-2 text-[#1a1a1a]">
                                <span>{section.emoji}</span> {section.title}
                            </h3>
                            <ul className="mt-2 space-y-1 ml-6">
                                {section.items.map((text, i) => (
                                    <li
                                        key={i}
                                        className="list-disc text-[16px] text-[#1a1a1a] opacity-90 leading-relaxed"
                                    >
                                        {text}
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

export default ListBlockEditor;
