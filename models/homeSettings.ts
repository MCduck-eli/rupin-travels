import mongoose, { Schema, Document } from "mongoose";

export interface IHighlightedTrip {
    title: string;
    duration: string;
    subtitle: string;
    nights: string;
    imageUrl: string;
}

export interface IHomeSettings extends Document {
    heroVideoUrl: string;
    heroTitle: string;
    heroSubtitle: string;
    philosophyTagline: string;
    philosophyTitle: string;
    philosophyContent: string;
    tripsSectionTitle: string;
    tripsSectionSubtitle: string;
    highlightedTrips: IHighlightedTrip[];
}

const HomeSettingsSchema: Schema = new Schema(
    {
        heroVideoUrl: { type: String, default: "" },
        heroTitle: { type: String, default: "Rupin Travels" },
        heroSubtitle: {
            type: String,
            default: "Travel designed to change how you feel",
        },
        philosophyTagline: { type: String, default: "" },
        philosophyTitle: { type: String, default: "" },
        philosophyContent: { type: String, default: "" },
        tripsSectionTitle: { type: String, default: "Highlighted Trips" },
        tripsSectionSubtitle: { type: String, default: "Top Selling Tours" },
        highlightedTrips: [
            {
                title: { type: String, default: "" },
                duration: { type: String, default: "" },
                subtitle: { type: String, default: "" },
                nights: { type: String, default: "" },
                imageUrl: { type: String, default: "" },
            },
        ],
    },
    { timestamps: true },
);

export default mongoose.models.HomeSettings ||
    mongoose.model<IHomeSettings>("HomeSettings", HomeSettingsSchema);
