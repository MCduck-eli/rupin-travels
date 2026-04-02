import React from "react";
import { AlignLeft, HelpCircle, Highlighter } from "lucide-react";

interface IntroEditorProps {
    question: string;
    description1: string;
    description2: string;
    highlightText: string;
    onUpdate: (field: string, value: string) => void;
}

const IntroEditor: React.FC<IntroEditorProps> = ({
    question,
    description1,
    description2,
    highlightText,
    onUpdate,
}) => {
    return (
        <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 border-b pb-3">
                <AlignLeft className="text-red-500" size={20} /> Intro Section
                Settings
            </h2>

            <div className="grid grid-cols-1 gap-5">
                <div>
                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 ml-1">
                        <HelpCircle size={14} /> Main Question
                    </label>
                    <input
                        className="w-full p-3 bg-gray-50 border-transparent border focus:border-[#004D3C] focus:bg-white rounded-xl outline-none transition-all text-base font-medium"
                        value={question}
                        onChange={(e) => onUpdate("question", e.target.value)}
                        placeholder="Is India Good for First-Time Travelers?"
                    />
                </div>
                <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 ml-1 block">
                        First Paragraph
                    </label>
                    <textarea
                        rows={3}
                        className="w-full p-3 bg-gray-50 border-transparent border focus:border-[#004D3C] focus:bg-white rounded-xl outline-none transition-all text-sm leading-relaxed"
                        value={description1}
                        onChange={(e) =>
                            onUpdate("description1", e.target.value)
                        }
                        placeholder="Enter first paragraph content..."
                    />
                </div>
                <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 ml-1 block">
                        Second Paragraph
                    </label>
                    <textarea
                        rows={3}
                        className="w-full p-3 bg-gray-50 border-transparent border focus:border-[#004D3C] focus:bg-white rounded-xl outline-none transition-all text-sm leading-relaxed"
                        value={description2}
                        onChange={(e) =>
                            onUpdate("description2", e.target.value)
                        }
                        placeholder="Enter second paragraph content..."
                    />
                </div>
                <div>
                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 ml-1">
                        <Highlighter size={14} /> Highlighted Conclusion
                    </label>
                    <textarea
                        rows={2}
                        className="w-full p-3 bg-gray-50 border-transparent border focus:border-[#004D3C] focus:bg-white rounded-xl outline-none transition-all text-base font-serif italic italic text-[#1a1a1a]"
                        value={highlightText}
                        onChange={(e) =>
                            onUpdate("highlightText", e.target.value)
                        }
                        placeholder="Enter highlighted conclusion..."
                    />
                </div>
            </div>
        </section>
    );
};

export default IntroEditor;
