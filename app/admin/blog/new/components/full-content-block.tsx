"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface ListItem {
    id: string;
    text: string;
}

interface FullBlockData {
    emoji: string;
    title: string;
    description: string;
    items: ListItem[];
    footerText: string;
}

interface FullContentBlockProps {
    onSave: (data: FullBlockData) => void;
}

const FullContentBlock: React.FC<FullContentBlockProps> = ({ onSave }) => {
    const [emoji, setEmoji] = useState<string>("✨");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [footerText, setFooterText] = useState<string>("");
    const [items, setItems] = useState<ListItem[]>([
        { id: uuidv4(), text: "" },
    ]);

    const handleItemChange = (id: string, text: string) => {
        setItems(items.map((i) => (i.id === id ? { ...i, text } : i)));
    };

    const addItem = () => setItems([...items, { id: uuidv4(), text: "" }]);
    const removeItem = (id: string) => {
        if (items.length > 1) setItems(items.filter((i) => i.id !== id));
    };

    const handleSave = () => {
        if (title.trim()) {
            onSave({
                emoji,
                title,
                description,
                items: items.filter((i) => i.text.trim()),
                footerText,
            });
        } else {
            alert("Please enter a Title at least.");
        }
    };

    return (
        <div className="w-full border-2 border-dashed border-slate-200 p-8 rounded-2xl bg-white shadow-sm hover:border-purple-400 transition-all group font-sans">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                    Complex Content Block (All-in-one)
                </span>
            </div>

            <div className="space-y-4">
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={emoji}
                        onChange={(e) => setEmoji(e.target.value)}
                        className="w-14 h-14 text-2xl text-center text-black border rounded-xl outline-none focus:ring-2 focus:ring-purple-400"
                        placeholder="✨"
                    />
                    <div className="grow space-y-2">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full text-xl font-bold text-black font-serif border-b outline-none focus:border-purple-500 py-1"
                            placeholder="Title: Why Visit India at Least Once?"
                        />
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full text-sm font-serif text-black border-b outline-none focus:border-purple-500 py-1"
                            placeholder="Subtitle: India offers experiences you won't find anywhere else:"
                        />
                    </div>
                </div>
                <div className="pl-16 space-y-2">
                    <label className="text-[9px] uppercase font-bold text-slate-400">
                        List Items:
                    </label>
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-2 group/item"
                        >
                            <span className="text-slate-300">•</span>
                            <input
                                type="text"
                                value={item.text}
                                onChange={(e) =>
                                    handleItemChange(item.id, e.target.value)
                                }
                                className="grow text-sm font-serif border-b border-transparent text-black focus:border-slate-200 outline-none py-1"
                                placeholder={`Item ${index + 1}`}
                            />
                            <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-300 opacity-0 group-hover/item:opacity-100 hover:text-red-500"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={addItem}
                        className="text-purple-600 text-[11px] font-bold mt-1"
                    >
                        + ADD ITEM
                    </button>
                </div>
                <div className="pt-4 border-t">
                    <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
                        Bottom Text (Closing Statement):
                    </label>
                    <textarea
                        value={footerText}
                        onChange={(e) => setFooterText(e.target.value)}
                        className="w-full p-3 bg-slate-50 text-black rounded-lg text-sm font-serif outline-none focus:ring-1 focus:ring-purple-300 resize-none"
                        rows={2}
                        placeholder="e.g., Your first trip may challenge you—but it will also change your perspective."
                    />
                </div>
            </div>
            <div className="mt-12 pt-8 border-t-2 border-slate-50 bg-[#fafafa] p-8 rounded-b-2xl">
                <p className="text-[9px] text-slate-300 mb-8 tracking-[0.3em] text-center uppercase">
                    --- Blog Frontend Preview ---
                </p>

                <div className="max-w-2xl mx-auto font-serif text-[#1a1a1a]">
                    <h3 className="text-[24px] font-bold leading-tight flex items-start gap-3 mb-2">
                        <span className="shrink-0">{emoji}</span>
                        {title || "Main Title"}
                    </h3>
                    <p className="text-[18px] leading-relaxed mb-6 opacity-90">
                        {description}
                    </p>

                    <ul className="space-y-3 ml-6 mb-8">
                        {items.map(
                            (item) =>
                                item.text && (
                                    <li
                                        key={item.id}
                                        className="flex items-start gap-4 text-[17px] opacity-85 leading-relaxed"
                                    >
                                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                                        {item.text}
                                    </li>
                                ),
                        )}
                    </ul>

                    {footerText && (
                        <p className="text-[19px] leading-snug mt-10 border-t pt-6 opacity-90">
                            {footerText}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FullContentBlock;
