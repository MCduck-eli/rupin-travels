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
    },
    { timestamps: true },
);

export default mongoose.models.AboutSettings ||
    mongoose.model("AboutSettings", AboutSettingsSchema);
