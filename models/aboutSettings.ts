import mongoose from "mongoose";

const AboutSettingsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: "Welcome to your luxurious home away from home",
        },
        description: {
            type: String,
            default:
                "Write a paragraph that talks about your brand or property here...",
        },
        topImage: { type: String, default: "" },
        bottomImage: { type: String, default: "" },
        whoAreWeTitle: {
            type: String,
            default: "Who Are We?",
        },
        founderName: {
            type: String,
            default: "Sashi Nk",
        },
        founderRole: {
            type: String,
            default: "Founder and CEO",
        },
        founderImage: {
            type: String,
            default: "",
        },
        founderAboutTitle: {
            type: String,
            default: "About the Founder",
        },
        founderDescription1: {
            type: String,
            default: "",
        },
        founderDescription2: {
            type: String,
            default: "",
        },
    },
    { timestamps: true },
);

export default mongoose.models.AboutSettings ||
    mongoose.model("AboutSettings", AboutSettingsSchema);
