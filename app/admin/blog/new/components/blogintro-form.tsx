"use client";
import React from "react";
import { MessageSquareQuote } from "lucide-react";

interface BlogIntroFormProps {
    formData: any;
    setFormData: (data: any) => void;
}

export const BlogIntroForm: React.FC<BlogIntroFormProps> = ({
    formData,
    setFormData,
}) => {
    const handleIntroChange = (field: string, value: string) => {
        setFormData({
            ...formData,
            intro: {
                ...formData.intro,
                [field]: value,
            },
        });
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center gap-2 text-[#004D3C] font-bold text-lg mb-2">
                <MessageSquareQuote size={22} /> Intro Section
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">
                        Intro Question (Sarlavha)
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. ? Is India Good for First-Time Travelers?"
                        className="w-full p-4 border rounded-xl outline-[#004D3C] text-black font-serif text-lg"
                        value={formData.intro.question}
                        onChange={(e) =>
                            handleIntroChange("question", e.target.value)
                        }
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">
                        Paragraph 1
                    </label>
                    <textarea
                        placeholder="General information for new travelers..."
                        rows={3}
                        className="w-full p-4 border rounded-xl outline-[#004D3C] text-black"
                        value={formData.intro.description1}
                        onChange={(e) =>
                            handleIntroChange("description1", e.target.value)
                        }
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">
                        Paragraph 2
                    </label>
                    <textarea
                        placeholder="Second paragraph (optional)..."
                        rows={3}
                        className="w-full p-4 border rounded-xl outline-[#004D3C] text-black"
                        value={formData.intro.description2}
                        onChange={(e) =>
                            handleIntroChange("description2", e.target.value)
                        }
                    />
                </div>
            </div>
        </div>
    );
};
