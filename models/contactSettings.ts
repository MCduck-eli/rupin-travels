import mongoose from "mongoose";

const ContactSettingsSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            default: "123 Anywhere St. Any City, ST 12345",
        },
        email: { type: String, default: "hello@reallygreatsite.com" },
        phone: { type: String, default: "(123) 456-7890" },
        image: { type: String, default: "" },
    },
    { timestamps: true },
);

export default mongoose.models.ContactSettings ||
    mongoose.model("ContactSettings", ContactSettingsSchema);
