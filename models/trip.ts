import mongoose, { Schema, Document, Model } from "mongoose";
import { ITrip } from "@/types/trip";

export interface ITripDocument extends Omit<ITrip, "_id">, Document {}

const TripSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        fullTitle: { type: String },
        slug: { type: String, required: true, unique: true },
        headerVideo: { type: String },
        description: { type: String },
        fullDescription: { type: String },
        highlights: [{ type: String }],
        extraCost: { type: String },
        cancellationPolicy: { type: String },
        extraDetails: [
            {
                title: { type: String },
                description: { type: String },
                icon: { type: String },
            },
        ],
        itinerary: [
            {
                day: { type: Number },
                title: { type: String },
                content: { type: String },
                image: { type: String },
            },
        ],
        gallery: [
            {
                url: { type: String },
                label: { type: String },
                title: { type: String },
            },
        ],
        price: { type: String },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

const Trip: Model<ITripDocument> =
    mongoose.models.Trip || mongoose.model<ITripDocument>("Trip", TripSchema);

export default Trip;
