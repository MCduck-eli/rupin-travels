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
import CulturalTipsEditor from "../../components/cultural-tips-editor";
import WhyVisitIndiaEditor from "../../components/why-visitIndia-editor";

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

    const DEFAULT_FOOD_GUIDE = {
        mainTitle: "Indian Food Guide for First-Time Visitors",
        introText: "Indian cuisine is as diverse as its culture...",
        listTitle: "Must-Try Dishes",
        foodItems: [
            "Butter Chicken",
            "Masala Dosa",
            "Paneer Tikka",
            "Chole Bhature",
        ],
        safetyTitle: "Food Safety Tips",
        safetyTips: [
            "Drink bottled water",
            "Eat at busy places",
            "Avoid raw veg",
            "Wash hands",
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

    const DEFAULT_CULTURAL = {
        mainTitle: "Cultural Etiquette in India",
        introText:
            "Respecting local traditions will make your trip much smoother:",
        tipsList: [
            "Cover your shoulders and knees in religious sites",
            "Ask for permission before taking photos of people",
            "Remove your shoes before entering someone's home",
            "Greeting with a 'Namaste' is always appreciated",
        ],
        challengesTitle: "Common Travel Challenges",
        challenges: [
            {
                emoji: "🚕",
                title: "Navigation",
                description: "Streets can be confusing.",
            },
            {
                emoji: "🍛",
                title: "Spicy Food",
                description: "Always ask for 'no spicy'.",
            },
            {
                emoji: "⏳",
                title: "Indian Stretchable Time",
                description: "Be flexible.",
            },
        ],
    };

    const DEFAULT_WHY_VISIT = {
        title: "Why You Should Visit India at Least Once",
        subtitle:
            "India is more than just a destination; it's a life-changing experience because of:",
        reasons: [
            "Unrivaled spiritual and yoga retreats",
            "The incredible hospitality of the Indian people",
            "World-famous architecture like the Taj Mahal",
        ],
        closingText:
            "Your first trip may challenge your comfort zone—but it will undoubtedly expand your perspective on the world.",
    };

    useEffect(() => {
        setLoading(true);
        fetch("/api/blogs", { cache: "no-store" })
            .then((res) => res.json())
            .then((data) => {
                if (!data.success || !data.data) return;
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
                        foodGuide: {
                            ...DEFAULT_FOOD_GUIDE,
                            ...main.foodGuide,
                            foodItems:
                                main.foodGuide?.foodItems?.length > 0
                                    ? main.foodGuide.foodItems
                                    : DEFAULT_FOOD_GUIDE.foodItems,
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
                        culturalTips: {
                            mainTitle:
                                main.culturalTips?.mainTitle ||
                                DEFAULT_CULTURAL.mainTitle,
                            introText:
                                main.culturalTips?.introText ||
                                DEFAULT_CULTURAL.introText,
                            tipsList:
                                main.culturalTips?.tipsList?.length > 0
                                    ? main.culturalTips.tipsList
                                    : DEFAULT_CULTURAL.tipsList,
                            challengesTitle:
                                main.culturalTips?.challengesTitle ||
                                DEFAULT_CULTURAL.challengesTitle,
                            challenges:
                                main.culturalTips?.challenges?.length > 0
                                    ? main.culturalTips.challenges
                                    : DEFAULT_CULTURAL.challenges,
                        },
                        whyVisit: {
                            title:
                                main.whyVisit?.title || DEFAULT_WHY_VISIT.title,
                            subtitle:
                                main.whyVisit?.subtitle ||
                                DEFAULT_WHY_VISIT.subtitle,
                            reasons:
                                main.whyVisit?.reasons?.length > 0
                                    ? main.whyVisit.reasons
                                    : DEFAULT_WHY_VISIT.reasons,
                            closingText:
                                main.whyVisit?.closingText ||
                                DEFAULT_WHY_VISIT.closingText,
                        },
                    });
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [SLUG]);

    const handleSave = async () => {
        if (!formData) return;
        setSaving(true);
        try {
            const url = formData._id
                ? `/api/blogs/${formData._id}`
                : "/api/blogs";
            const res = await fetch(url, {
                method: formData._id ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) alert("Saved!");
            else alert("Error!");
        } catch (err) {
            alert("Network Error!");
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
        <div className="w-full min-h-screen bg-white text-black font-sans pb-40">
            <div className="max-w-5xl mx-auto px-4 py-10">
                <div className="mb-8">
                    <Link
                        href="/admin/blog"
                        className="flex items-center gap-2 text-gray-500 hover:text-black transition w-fit"
                    >
                        <ArrowLeft size={20} /> Dashboard
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
                        className="mt-4 md:mt-0 bg-[#004D3C] text-white px-10 py-4 rounded-2xl flex items-center gap-2 hover:bg-[#003d2a] transition-all shadow-xl disabled:opacity-50"
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
                            setFormData((p: any) => ({ ...p, title: val }))
                        }
                        onImageChange={(val) =>
                            setFormData((p: any) => ({ ...p, mainImage: val }))
                        }
                    />

                    <IntroEditor
                        {...formData.intro}
                        onUpdate={(field, value) =>
                            setFormData((p: any) => ({
                                ...p,
                                intro: { ...p.intro, [field]: value },
                            }))
                        }
                    />

                    <ExpectationEditor
                        {...formData.expectations}
                        onUpdate={(field, value) =>
                            setFormData((p: any) => ({
                                ...p,
                                expectations: {
                                    ...p.expectations,
                                    [field]: value,
                                },
                            }))
                        }
                    />

                    <AwardsImageEditor
                        imageUrl={formData.awards?.imageUrl}
                        awardsText={formData.awards?.awardsText}
                        onUpdate={(field, value) =>
                            setFormData((p: any) => ({
                                ...p,
                                awards: { ...p.awards, [field]: value },
                            }))
                        }
                    />

                    <FoodGuideEditor
                        data={formData.foodGuide}
                        onUpdate={(field, value) =>
                            setFormData((p: any) => ({
                                ...p,
                                foodGuide: { ...p.foodGuide, [field]: value },
                            }))
                        }
                    />

                    <SafetyTipsEditor
                        data={formData.safety}
                        onUpdate={(field, value) =>
                            setFormData((p: any) => ({
                                ...p,
                                safety: { ...p.safety, [field]: value },
                            }))
                        }
                    />

                    <CulturalTipsEditor
                        data={formData.culturalTips}
                        onUpdate={(field, value) =>
                            setFormData((p: any) => ({
                                ...p,
                                culturalTips: {
                                    ...p.culturalTips,
                                    [field]: value,
                                },
                            }))
                        }
                    />
                    <WhyVisitIndiaEditor
                        data={formData.whyVisit}
                        onUpdate={(field, value) =>
                            setFormData((p: any) => ({
                                ...p,
                                whyVisit: { ...p.whyVisit, [field]: value },
                            }))
                        }
                    />
                </div>
            </div>
        </div>
    );
}
