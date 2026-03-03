import mongoose, { Schema, Document } from "mongoose";

const TestimonialSettingsSchema = new Schema(
    {
        pageTitle: { type: String, default: "Client Testimonials" },
        testimonials: [
            {
                name: { type: String, default: "" },
                location: { type: String, default: "" },
                comment: { type: String, default: "" },
                image: { type: String, default: "" },
            },
        ],
    },
    { timestamps: true },
);

export default mongoose.models.TestimonialSettings ||
    mongoose.model("TestimonialSettings", TestimonialSettingsSchema);
