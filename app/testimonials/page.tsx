import dbConnect from "@/lib/mongo.db";
import TestimonialSettings from "@/models/testimonialSettings";
import TestimonialsClient from "./TestimonialsClient";

export default async function TestimonialsPage() {
    let data = null;
    try {
        await dbConnect();
        const settings = await TestimonialSettings.findOne().lean();
        data = JSON.parse(JSON.stringify(settings));
    } catch (e) {
        console.error("Database connection error:", e);
    }

    return (
        <TestimonialsClient
            title={data?.pageTitle}
            testimonials={data?.testimonials}
        />
    );
}
