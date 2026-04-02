import mongoose, { Schema, model, models } from "mongoose";

const BlogSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    mainImage: { type: String, default: null },
    contentImage: {
        url: { type: String, default: "" },
        caption: { type: String, default: "" },
    },
    awards: {
        imageUrl: { type: String, default: "" },
        awardsText: { type: String, default: "" },
    },
    safety: {
        title: { type: String, default: "" },
        subtitle: { type: String, default: "" },
        tips: { type: [String], default: [] },
    },
    intro: {
        question: String,
        description1: String,
        description2: String,
        highlightText: String,
    },
    expectations: {
        title: String,
        subtitle: String,
        items: [String],
        proTip: String,
    },
    foodGuide: {
        mainTitle: String,
        introText: String,
        listTitle: String,
        foodItems: [String],
        safetyTitle: String,
        safetyTips: [String],
    },
    culturalTips: {
        mainTitle: String,
        introText: String,
        tipsList: [String],
        challengesTitle: String,
        challenges: [
            {
                emoji: String,
                title: String,
                description: String,
            },
        ],
    },
    whyVisit: {
        title: String,
        subtitle: String,
        reasons: [String],
        closingText: String,
    },
    createdAt: { type: Date, default: Date.now },
});

export const Blog = models.Blog || model("Blog", BlogSchema);
