import { Types } from "mongoose";

export interface IItinerary {
    day: number;
    title: string;
    content: string;
    image?: string;
}

export interface IGallery {
    url: string;
    label: string;
    title: string;
}

export interface IExtraDetail {
    title: string;
    description: string;
    icon: string;
}

export interface ITrip {
    _id: string;
    title: string;
    fullTitle: string;
    slug: string;
    headerVideo: string;
    description: string;
    fullDescription: string;
    itinerary: IItinerary[];
    gallery: IGallery[];
    price: string;
    highlights?: string[];
    extraCost?: string;
    cancellationPolicy?: string;
    extraDetails: IExtraDetail[];
    activityLevel: string;
    suitableFor: string;
    duration: string;
    category: string;
    groupSize: string;
    dateRange: string;
    accommodation: string;
    prices: string;
}
