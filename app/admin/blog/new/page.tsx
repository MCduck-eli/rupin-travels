"use client";

import { useState } from "react";
import { BlogHeroForm } from "./components/blog-hero-form";
import { BlogSectionForm } from "./components/blog-section-form";
import { ShieldCheck, Save, Loader2 } from "lucide-react";
import BlogSubHeaderBlock, {
    SubItem,
} from "./components/blog-sub-header-block";
import { BlogIntroForm } from "./components/blogintro-form";
import FullContentBlock from "./components/full-content-block";
import ImageUploadBlock from "./components/image-upload-block";
import ListBlockEditor from "./components/list-block-editor";
import BlogHeaderBlock from "./components/blog-header-block";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        mainImage: null,
        intro: {
            question: "",
            description1: "",
            description2: "",
            highlightText: "",
        },
        subHeader: [] as SubItem[],
        fullContent: {
            title: "",
            description: "",
        },
        contentImage: {
            url: "",
            caption: "",
        },
        listData: [],
        headerBlock: {
            emoji: "",
            title: "",
            description: "",
        },
        foodGuide: {
            mainTitle: "Indian Food Guide",
            items: ["Butter Chicken"],
        },
        safetyTips: {
            mainTitle: "Safety Tips",
            items: ["Avoid isolated areas"],
        },
    });
    const handleSaveAll = async () => {
        if (!formData.title) return alert("Please enter a title first!");

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/blogs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                alert("Blog saved successfully!");
                router.push("/admin/blog");
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Error saving blog:", error);
            alert("An error occurred while saving the blog.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-10 bg-[#F7F5F2] min-h-screen space-y-6 pb-32 font-sans relative">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-serif text-[#004D3C]">
                    Create New Story
                </h1>
                <button
                    onClick={handleSaveAll}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-[#004D3C] text-white px-8 py-3 rounded-xl hover:bg-[#003d30] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <Save size={20} />
                    )}
                    {isSubmitting ? "Saving..." : "Publish Blog"}
                </button>
            </div>

            <BlogHeroForm formData={formData} setFormData={setFormData} />
            <BlogIntroForm formData={formData} setFormData={setFormData} />

            <BlogSectionForm
                sectionKey="safetyTips"
                icon={<ShieldCheck size={20} />}
                titleLabel="Safety Tips Section"
                formData={formData}
                setFormData={setFormData}
            />
            <ImageUploadBlock
                initialData={formData.contentImage}
                onSave={(imageData) =>
                    setFormData((prev) => ({
                        ...prev,
                        contentImage: imageData,
                    }))
                }
            />

            <ListBlockEditor
                onSave={(data: any) =>
                    setFormData({ ...formData, listData: data })
                }
            />

            <BlogHeaderBlock
                onSave={(data: any) =>
                    setFormData({ ...formData, headerBlock: data })
                }
            />

            <BlogSubHeaderBlock
                onSave={(data: SubItem[]) =>
                    setFormData({ ...formData, subHeader: data })
                }
            />

            <FullContentBlock
                onSave={(data: any) =>
                    setFormData({ ...formData, fullContent: data })
                }
            />
        </div>
    );
}
