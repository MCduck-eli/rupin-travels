"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import HeroEditor from "../../components/hero-etidor";
import IntroEditor from "../../components/intro-editor";
import ExpectationEditor from "../../components/expectation-editor";
import AwardsImageEditor from "../../components/awards-image-editor";
import FoodGuideEditor from "../../components/food-guide-editor";
import SafetyTipsEditor from "../../components/safety-tips-editor";

export default function MainBlogEditor() {
    const [formData, setFormData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const SLUG = "first-time-in-india";

    const DEFAULT_INTRO = {
        question: "Is India Good for First-Time Travelers?",
        description1: "Planning your first time in India...",
        description2: "Yes, India is a great destination...",
        highlightText: "",
    };

    const DEFAULT_EXPECTATIONS = {
        title: "What to Expect on Your First Visit to India",
        subtitle: "India is intense, colorful, and full of life. Expect:",
        items: [
            "Busy streets and vibrant markets",
            "Rich history and iconic landmarks",
            "Diverse languages and traditions",
            "Friendly and helpful locals",
        ],
        proTip: "Embrace the chaos—it's part of the experience.",
    };

    const DEFAULT_AWARDS = {
        imageUrl: "/images/default-awards-photo.jpg",
        awardsText: "XI GLOBAL PHOTOGRAPHY AWARDS",
    };

    const DEFAULT_FOOD_GUIDE = {
        mainTitle: "Indian Food Guide for First-Time Visitors",
        introText:
            "Indian cuisine is as diverse as its culture. From spicy curries to sweet desserts, there is something for everyone.",
        listTitle: "Must-Try Dishes",
        foodItems: [
            "Butter Chicken (Murgh Makhani)",
            "Masala Dosa with Chutney",
            "Paneer Tikka",
            "Chole Bhature",
        ],
        safetyTitle: "Food Safety Tips",
        safetyTips: [
            "Only drink bottled or filtered water.",
            "Eat at busy places with high turnover.",
            "Avoid raw vegetables and peeled fruits.",
            "Wash your hands frequently before eating.",
        ],
    };

    const DEFAULT_SAFETY = {
        title: "Stay Safe on Your Journey",
        subtitle: "Basic precautions to keep in mind while traveling:",
        tips: [
            "Use official prepaid taxis or apps like Uber/Ola.",
            "Keep your passport and large cash in the hotel safe.",
            "Dress modestly, especially when visiting religious sites.",
            "Always have a local SIM card with active data for maps.",
        ],
    };

    useEffect(() => {
        setLoading(true);

        fetch("/api/blogs", {
            cache: "no-store",
            headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.success || !data.data) {
                    console.error("Ma'lumot topilmadi");
                    return;
                }

                const main = data.data.find((b: any) => b.slug === SLUG);

                if (main) {
                    setFormData({
                        ...main,
                        intro: {
                            question:
                                main.intro?.question || DEFAULT_INTRO.question,
                            description1:
                                main.intro?.description1 ||
                                DEFAULT_INTRO.description1,
                            description2:
                                main.intro?.description2 ||
                                DEFAULT_INTRO.description2,
                            highlightText: main.intro?.highlightText || "",
                        },
                        expectations: {
                            title:
                                main.expectations?.title ||
                                DEFAULT_EXPECTATIONS.title,
                            subtitle:
                                main.expectations?.subtitle ||
                                DEFAULT_EXPECTATIONS.subtitle,
                            items:
                                main.expectations?.items?.length > 0
                                    ? main.expectations.items
                                    : DEFAULT_EXPECTATIONS.items,
                            proTip:
                                main.expectations?.proTip ||
                                DEFAULT_EXPECTATIONS.proTip,
                        },
                        awards: {
                            imageUrl:
                                main.awards?.imageUrl ||
                                DEFAULT_AWARDS.imageUrl,
                            awardsText:
                                main.awards?.awardsText ||
                                DEFAULT_AWARDS.awardsText,
                        },
                        foodGuide: {
                            mainTitle:
                                main.foodGuide?.mainTitle ||
                                DEFAULT_FOOD_GUIDE.mainTitle,
                            introText:
                                main.foodGuide?.introText ||
                                DEFAULT_FOOD_GUIDE.introText,
                            listTitle:
                                main.foodGuide?.listTitle ||
                                DEFAULT_FOOD_GUIDE.listTitle,
                            foodItems:
                                main.foodGuide?.foodItems?.length > 0
                                    ? main.foodGuide.foodItems
                                    : DEFAULT_FOOD_GUIDE.foodItems,
                            safetyTitle:
                                main.foodGuide?.safetyTitle ||
                                DEFAULT_FOOD_GUIDE.safetyTitle,
                            safetyTips:
                                main.foodGuide?.safetyTips?.length > 0
                                    ? main.foodGuide.safetyTips
                                    : DEFAULT_FOOD_GUIDE.safetyTips,
                        },
                        safety: {
                            title: main.safety?.title || DEFAULT_SAFETY.title,
                            subtitle:
                                main.safety?.subtitle ||
                                DEFAULT_SAFETY.subtitle,
                            tips:
                                main.safety?.tips?.length > 0
                                    ? main.safety.tips
                                    : DEFAULT_SAFETY.tips,
                        },
                    });
                }
            })
            .catch((err) => {
                console.error("Data loading error:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [SLUG]);

    const handleSave = async () => {
        if (!formData) return;
        setSaving(true);

        try {
            const isUpdate = formData._id ? true : false;
            const method = isUpdate ? "PUT" : "POST";
            const url = isUpdate ? `/api/blogs/${formData._id}` : "/api/blogs";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert("Successfully saved!");
            } else {
                alert("Failed to save!");
            }
        } catch (err) {
            console.error("Save error:", err);
            alert("Network error occurred!");
        } finally {
            setSaving(false);
        }
    };

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <Loader2 className="animate-spin text-[#004D3C]" size={40} />
            </div>
        );

    return (
        <div className="w-full min-h-screen bg-white text-black font-sans">
            <div className="max-w-5xl mx-auto px-4 py-10 pb-40">
                <div className="mb-8">
                    <Link
                        href="/admin/blog"
                        className="flex items-center gap-2 text-gray-500 hover:text-black transition w-fit"
                    >
                        <ArrowLeft size={20} /> Back to Dashboard
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 bg-[#F8F9FA] p-6 rounded-3xl border border-gray-100 sticky top-5 z-50 shadow-sm">
                    <div>
                        <h1 className="text-3xl font-bold text-[#004D3C] font-serif">
                            Main Blog Editor
                        </h1>
                        <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest font-bold">
                            Slug: {SLUG}
                        </p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="mt-4 md:mt-0 bg-[#004D3C] text-white px-10 py-4 rounded-2xl flex items-center gap-2 hover:bg-[#003d2a] transition-all shadow-xl active:scale-95 disabled:opacity-50"
                    >
                        {saving ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <Save size={20} />
                        )}
                        {saving ? "Saving..." : "Update Blog"}
                    </button>
                </div>

                <div className="space-y-8">
                    <HeroEditor
                        title={formData.title}
                        imageUrl={formData.mainImage}
                        onTitleChange={(val) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                title: val,
                            }))
                        }
                        onImageChange={(val) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                mainImage: val,
                            }))
                        }
                    />

                    <IntroEditor
                        question={formData.intro?.question}
                        description1={formData.intro?.description1}
                        description2={formData.intro?.description2}
                        highlightText={formData.intro?.highlightText}
                        onUpdate={(field, value) => {
                            setFormData((prev: any) => ({
                                ...prev,
                                intro: { ...prev.intro, [field]: value },
                            }));
                        }}
                    />

                    <ExpectationEditor
                        title={formData.expectations?.title}
                        subtitle={formData.expectations?.subtitle}
                        items={formData.expectations?.items}
                        proTip={formData.expectations?.proTip}
                        onUpdate={(field: string, value: any) => {
                            setFormData((prev: any) => ({
                                ...prev,
                                expectations: {
                                    ...(prev.expectations || {}),
                                    [field]: value,
                                },
                            }));
                        }}
                    />

                    <AwardsImageEditor
                        imageUrl={formData.awards?.imageUrl || ""}
                        awardsText={formData.awards?.awardsText || ""}
                        onUpdate={(field, value) => {
                            setFormData((prev: any) => ({
                                ...prev,
                                awards: {
                                    ...(prev.awards || {}),
                                    [field]: value,
                                },
                            }));
                        }}
                    />

                    <FoodGuideEditor
                        data={{
                            mainTitle: formData?.foodGuide?.mainTitle || "",
                            introText: formData?.foodGuide?.introText || "",
                            listTitle: formData?.foodGuide?.listTitle || "",
                            foodItems: formData?.foodGuide?.foodItems || [],
                            safetyTitle: formData?.foodGuide?.safetyTitle || "",
                            safetyTips: formData?.foodGuide?.safetyTips || [],
                        }}
                        onUpdate={(field, value) => {
                            setFormData((prev: any) => ({
                                ...prev,
                                foodGuide: {
                                    ...(prev?.foodGuide || {}),
                                    [field]: value,
                                },
                            }));
                        }}
                    />
                    <SafetyTipsEditor
                        data={{
                            title: formData?.safety?.title || "",
                            subtitle: formData?.safety?.subtitle || "",
                            tips: formData?.safety?.tips || [],
                        }}
                        onUpdate={(field, value) => {
                            setFormData((prev: any) => ({
                                ...prev,
                                safety: {
                                    ...(prev?.safety || {}),
                                    [field]: value,
                                },
                            }));
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
