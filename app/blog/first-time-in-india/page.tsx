"use client";

import { useState, useEffect } from "react";
import BlogView from "../components/blog-view";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import BlogHero from "../components/blog-hero";
import IntroSection from "../components/Intro-section";
import ExpectationSection from "../components/expectation-section";
import AwardsImage from "../components/awards-image";
import FoodGuide from "../components/food-guide";
import SafetyTips from "../components/safety-tips";
import CulturalTips from "../components/cultural-tips";
import WhyVisitIndia from "../components/why-visitIndia";

export default function BlogListPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [mainArticle, setMainArticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllBlogs = async () => {
            try {
                const res = await fetch("/api/blogs");
                const data = await res.json();

                if (data.success) {
                    setBlogs(data.data);
                    const targetBlog = data.data.find(
                        (b: any) => b.slug === "first-time-in-india",
                    );
                    if (targetBlog) {
                        setMainArticle(targetBlog);
                    }
                }
            } catch (error) {
                console.error("Bloglarni yuklashda xato:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllBlogs();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="animate-spin text-[#004D3C]" size={40} />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            {blogs.length > 0 ? (
                <div className="py-10">
                    <h1 className="text-3xl font-serif text-center mb-10 text-[#004D3C]">
                        Our Latest Stories
                    </h1>
                    <BlogView blogs={blogs} />
                    <BlogHero
                        title={mainArticle?.title || "First Time in India"}
                        imageUrl={
                            mainArticle?.mainImage || "/chocolate-mountain.png"
                        }
                        imageAlt={mainArticle?.title || "Travel blog banner"}
                    />

                    <IntroSection
                        question={mainArticle?.intro?.question}
                        description1={
                            mainArticle?.intro?.description1 ||
                            "Planning your first time in India? This complete travel guide covers everything you need to know-from safely and food to transportation and cultural tips-so you can explore India confidently and avoid common beginner mistakes. India is one of the most diverse and vibrant countries in the world. Whether you're visiting Delhi, Mumbai, or Jaipur, your first trip will be unforgettable."
                        }
                        description2={
                            mainArticle?.intro?.description2 ||
                            "Yes, India is a great destination for first-time travelers—if you come prepared. With the right planning, awareness, and mindset, vou can safely enjoy its culture, food, and unique experiences."
                        }
                    />
                    <ExpectationSection
                        title={mainArticle?.expectations?.title}
                        subtitle={mainArticle?.expectations?.subtitle}
                        items={
                            mainArticle?.expectations?.items?.length > 0
                                ? mainArticle.expectations.items
                                : undefined
                        }
                        proTip={mainArticle?.expectations?.proTip}
                    />
                    <AwardsImage
                        imageUrl={
                            mainArticle?.awards?.imageUrl ||
                            "/mayon-volcano.jpg"
                        }
                        imageAlt={
                            mainArticle?.awards?.imageAlt ||
                            "Awards Photography"
                        }
                        awardsText={
                            mainArticle?.awards?.awardsText ||
                            "Best Travel Destination 2023"
                        }
                    />

                    <FoodGuide
                        mainTitle={
                            mainArticle?.foodGuide?.mainTitle ||
                            "Indian Food Guide for First-Time Visitors"
                        }
                        introText={
                            mainArticle?.foodGuide?.introText ||
                            "Indian cuisine is as diverse as its culture. From spicy curries to sweet desserts, there is something for everyone."
                        }
                        listTitle={
                            mainArticle?.foodGuide?.listTitle ||
                            "Must-Try Dishes"
                        }
                        foodItems={
                            mainArticle?.foodGuide?.foodItems || [
                                "Butter Chicken (Murgh Makhani)",
                                "Masala Dosa with Chutney",
                                "Paneer Tikka",
                                "Chole Bhature",
                            ]
                        }
                        safetyTitle={
                            mainArticle?.foodGuide?.safetyTitle ||
                            "Food Safety Tips"
                        }
                        safetyTips={
                            mainArticle?.foodGuide?.safetyTips || [
                                "Only drink bottled or filtered water.",
                                "Eat at busy places with high turnover.",
                                "Avoid raw vegetables and peeled fruits.",
                                "Wash your hands frequently before eating.",
                            ]
                        }
                    />

                    <SafetyTips
                        title={
                            mainArticle?.safety?.title ||
                            "Stay Safe on Your Journey"
                        }
                        subtitle={
                            mainArticle?.safety?.subtitle ||
                            "Basic precautions to keep in mind while traveling:"
                        }
                        tips={
                            mainArticle?.safety?.tips || [
                                "Use official prepaid taxis or apps like Uber/Ola.",
                                "Keep your passport and large cash in the hotel safe.",
                                "Dress modestly, especially when visiting religious sites.",
                                "Always have a local SIM card with active data for maps.",
                            ]
                        }
                    />

                    <CulturalTips
                        mainTitle={
                            mainArticle?.culture?.mainTitle ||
                            "Cultural Etiquette in India"
                        }
                        introText={
                            mainArticle?.culture?.introText ||
                            "Respecting local traditions will make your trip much smoother:"
                        }
                        tipsList={
                            mainArticle?.culture?.tipsList || [
                                "Cover your shoulders and knees in religious sites",
                                "Ask for permission before taking photos of people",
                                "Remove your shoes before entering someone's home",
                                "Greeting with a 'Namaste' is always appreciated",
                            ]
                        }
                        challengesTitle={
                            mainArticle?.culture?.challengesTitle ||
                            "Common Travel Challenges"
                        }
                        challenges={
                            mainArticle?.culture?.challenges || [
                                {
                                    emoji: "🚕",
                                    title: "Navigation",
                                    description:
                                        "Streets can be confusing, use offline maps or ask locals.",
                                },
                                {
                                    emoji: "🍛",
                                    title: "Spicy Food",
                                    description:
                                        "Always ask for 'no spicy' if you have a sensitive stomach.",
                                },
                                {
                                    emoji: "⏳",
                                    title: "Indian Stretchable Time",
                                    description:
                                        "Events might start later than planned—be flexible.",
                                },
                            ]
                        }
                    />

                    <WhyVisitIndia
                        title={
                            mainArticle?.whyVisit?.title ||
                            "Why You Should Visit India at Least Once"
                        }
                        subtitle={
                            mainArticle?.whyVisit?.subtitle ||
                            "India is more than just a destination; it's a life-changing experience because of:"
                        }
                        reasons={
                            mainArticle?.whyVisit?.reasons || [
                                "Unrivaled spiritual and yoga retreats",
                                "The incredible hospitality of the Indian people",
                                "World-famous architecture like the Taj Mahal",
                                "A sensory explosion of colors, smells, and sounds",
                            ]
                        }
                        closingText={
                            mainArticle?.whyVisit?.closingText ||
                            "Your first trip may challenge your comfort zone—but it will undoubtedly expand your perspective on the world."
                        }
                    />
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500">No blogs yet..</p>
                    <Link
                        href="/"
                        className="text-[#004D3C] underline mt-4 inline-block"
                    >
                        Return to homepage
                    </Link>
                </div>
            )}
        </main>
    );
}
