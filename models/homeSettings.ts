import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHomeSettings extends Document {
    heroTitle: string;
    heroSubtitle: string;
    heroVideo: string;

    // Philosophy qismi uchun yangi maydonlar
    philosophyTagline: string; // BU YERGA QOSHING
    philosophyTitle: string;
    philosophyContent: string;

    experienceTitle: string;
    experienceContent: string;
    experienceImage: string;

    whoTitle: string;
    whoContent: string;
    whoImage: string;

    footerQuote: string;
}

const HomeSettingsSchema: Schema = new Schema(
    {
        heroTitle: { type: String, default: "Welcome to Our Journey" },
        heroSubtitle: { type: String, default: "Experience the world" },
        heroVideo: { type: String, default: "" },

        philosophyTagline: { type: String, default: "" },
        philosophyTitle: { type: String, default: "" },
        philosophyContent: { type: String, default: "" },
    },
    { timestamps: true },
);

const HomeSettings: Model<IHomeSettings> =
    mongoose.models.HomeSettings ||
    mongoose.model<IHomeSettings>("HomeSettings", HomeSettingsSchema);

export default HomeSettings;
