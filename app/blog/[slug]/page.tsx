"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import AwardsImage from "../components/awards-image";
import BlogHero from "../components/blog-hero";
import CulturalTips from "../components/cultural-tips";
import ExpectationSection from "../components/expectation-section";
import FoodGuide from "../components/food-guide";
import IntroSection from "../components/Intro-section";
import SafetyTips from "../components/safety-tips";
import WhyVisitIndia from "../components/why-visitIndia";
import { Loader2 } from "lucide-react";

export default function BlogDetailPage() {
    const { slug } = useParams();
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/blogs/slug/${slug}`);
                const data = await res.json();

                if (data.success) {
                    setBlog(data.data);
                }
            } catch (error) {
                console.error("Xatolik:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchBlog();
    }, [slug]);

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="animate-spin text-[#004D3C]" size={40} />
            </div>
        );

    if (!blog) return <div className="text-center p-20">Blog topilmadi!</div>;

    return (
        <div>
            <BlogHero
                title={blog.title}
                imageUrl={blog.mainImage || "/chocolate-mountain.png"}
                imageAlt={blog.title}
            />

            <IntroSection
                question={blog.intro?.question || "Is India Good?"}
                description1={blog.intro?.description1}
                description2={blog.intro?.description2}
                highlightText={blog.intro?.highlightText}
            />

            <ExpectationSection
                title={blog.expectations?.title}
                subtitle={blog.expectations?.subtitle}
                items={blog.expectations?.items || []}
                proTip={blog.expectations?.proTip}
            />

            <AwardsImage
                imageUrl={blog.contentImage?.url || "/mayon-volcano.jpg"}
                awardsText={blog.contentImage?.caption || "TRAVEL GUIDES"}
            />

            <FoodGuide
                mainTitle={blog.foodGuide?.mainTitle}
                introText={blog.foodGuide?.introText}
                listTitle={blog.foodGuide?.listTitle}
                foodItems={blog.foodGuide?.foodItems || []}
                safetyTitle={blog.foodGuide?.safetyTitle}
                safetyTips={blog.foodGuide?.safetyTips || []}
            />

            <SafetyTips
                title={blog.safetyTips?.title}
                subtitle={blog.safetyTips?.subtitle}
                tips={blog.safetyTips?.tips || []}
            />

            <CulturalTips
                mainTitle={blog.culturalTips?.mainTitle}
                tipsList={blog.culturalTips?.tipsList || []}
                challenges={blog.culturalTips?.challenges || []}
            />

            <WhyVisitIndia
                title={blog.whyVisit?.title}
                subtitle={blog.whyVisit?.subtitle}
                reasons={blog.whyVisit?.reasons || []}
                closingText={blog.whyVisit?.closingText}
            />
        </div>
    );
}
