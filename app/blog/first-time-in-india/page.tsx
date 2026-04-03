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

    const SLUG = "first-time-in-india";

    useEffect(() => {
        const fetchAllBlogs = async () => {
            try {
                const res = await fetch("/api/blogs", { cache: "no-store" });
                const data = await res.json();

                if (data.success && data.data) {
                    setBlogs(data.data);
                    const targetBlog = data.data.find(
                        (b: any) => b.slug === SLUG,
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
                        description1={mainArticle?.intro?.description1}
                        description2={mainArticle?.intro?.description2}
                    />

                    <ExpectationSection
                        title={mainArticle?.expectations?.title}
                        subtitle={mainArticle?.expectations?.subtitle}
                        items={mainArticle?.expectations?.items}
                        proTip={mainArticle?.expectations?.proTip}
                    />

                    <AwardsImage
                        imageUrl={
                            mainArticle?.awards?.imageUrl ||
                            "/mayon-volcano.jpg"
                        }
                        awardsText={mainArticle?.awards?.awardsText}
                    />

                    <FoodGuide
                        mainTitle={mainArticle?.foodGuide?.mainTitle}
                        introText={mainArticle?.foodGuide?.introText}
                        listTitle={mainArticle?.foodGuide?.listTitle}
                        foodItems={mainArticle?.foodGuide?.foodItems}
                        safetyTitle={mainArticle?.foodGuide?.safetyTitle}
                        safetyTips={mainArticle?.foodGuide?.safetyTips}
                    />

                    <SafetyTips
                        title={mainArticle?.safety?.title}
                        subtitle={mainArticle?.safety?.subtitle}
                        tips={mainArticle?.safety?.tips}
                    />
                    <CulturalTips
                        mainTitle={mainArticle?.culturalTips?.mainTitle}
                        introText={mainArticle?.culturalTips?.introText}
                        tipsList={mainArticle?.culturalTips?.tipsList}
                        challengesTitle={
                            mainArticle?.culturalTips?.challengesTitle
                        }
                        challenges={mainArticle?.culturalTips?.challenges}
                    />

                    <WhyVisitIndia
                        title={mainArticle?.whyVisit?.title}
                        subtitle={mainArticle?.whyVisit?.subtitle}
                        reasons={mainArticle?.whyVisit?.reasons}
                        closingText={mainArticle?.whyVisit?.closingText}
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
