"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import { BlogHeroForm } from "../../new/components/blog-hero-form";
import { BlogIntroForm } from "../../new/components/blogintro-form";
import { BlogSectionForm } from "../../new/components/blog-section-form";
import BlogSubHeaderBlock from "../../new/components/blog-sub-header-block";
import FullContentBlock from "../../new/components/full-content-block";
import ImageUploadBlock from "../../new/components/image-upload-block";
import ListBlockEditor from "../../new/components/list-block-editor";
import BlogHeaderBlock from "../../new/components/blog-header-block";

export default function EditBlogPage() {
    const { id } = useParams();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
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
        subHeader: [],
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

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const res = await fetch(`/api/blogs/${id}`);
                const data = await res.json();
                if (data.success) {
                    setFormData(data.data);
                } else {
                    alert("Blog post not found!");
                    router.push("/admin/blog");
                }
            } catch (error) {
                console.error("Fetch error:", error);
                alert("Failed to load blog data.");
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchBlogData();
    }, [id, router]);

    const handleUpdate = async () => {
        if (!formData.title) return alert("Title is required!");

        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/blogs/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                alert("Blog updated successfully!");
                router.push("/admin/blog");
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("An error occurred while updating the post.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <Loader2 className="animate-spin text-[#004D3C]" size={48} />
                <p className="font-serif italic text-gray-500">
                    Loading story details...
                </p>
            </div>
        );
    }

    return (
        <div className="p-10 bg-[#F7F5F2] min-h-screen space-y-6 pb-32 font-sans relative">
            <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <button
                    onClick={() => router.push("/admin/blog")}
                    className="flex items-center gap-2 text-gray-400 hover:text-black transition-all font-medium"
                >
                    <ArrowLeft size={18} /> Back to Dashboard
                </button>

                <div className="flex items-center gap-4">
                    <span className="text-[10px] text-gray-300 uppercase tracking-widest hidden md:block">
                        Post ID: {id}
                    </span>
                    <button
                        onClick={handleUpdate}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 bg-[#004D3C] text-white px-10 py-3 rounded-xl hover:bg-[#003d2a] transition-all shadow-lg disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <Loader2 className="animate-spin" size={18} />
                        ) : (
                            <Save size={18} />
                        )}
                        {isSubmitting ? "Saving..." : "Update Story"}
                    </button>
                </div>
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
                onSave={(imageData: any) =>
                    setFormData((prev: any) => ({
                        ...prev,
                        contentImage: imageData,
                    }))
                }
            />

            <ListBlockEditor
                onSave={(data: any) =>
                    setFormData((prev) => ({ ...prev, listData: data }))
                }
            />

            <BlogHeaderBlock
                onSave={(data: any) =>
                    setFormData((prev) => ({ ...prev, headerBlock: data }))
                }
            />

            <BlogSubHeaderBlock
                onSave={(data: any) =>
                    setFormData((prev) => ({ ...prev, subHeader: data }))
                }
            />

            <FullContentBlock
                onSave={(data: any) =>
                    setFormData((prev) => ({ ...prev, fullContent: data }))
                }
            />
        </div>
    );
}
