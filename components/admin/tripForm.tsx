"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Save } from "lucide-react";
import { ITrip } from "@/types/trip";
import { GeneralInfo } from "./generalInfo";
import { TripHighlights } from "./trip-highlights";
import { HeaderVideoSection } from "./header-video-section";
import { TripGallerySection } from "./trip-gallery";
import { ItinerarySection } from "./Itinerary-section";
import { TripDetailsSection } from "./trip-details-section";

const TripForm = ({
    initialData,
    onSubmit,
}: {
    initialData?: ITrip;
    onSubmit: (data: ITrip) => void;
}) => {
    const { register, control, handleSubmit, setValue, watch } = useForm<ITrip>(
        {
            defaultValues: initialData || {
                title: "",
                fullTitle: "",
                slug: "",
                headerVideo: "",
                description: "",
                fullDescription: "",
                price: "",
                highlights: [""],
                extraCost: "",
                cancellationPolicy: "",
                itinerary: [{ day: 1, title: "", content: "", image: "" }],
                gallery: [],
            },
        },
    );

    const watchedTitle = watch("title");
    useEffect(() => {
        if (watchedTitle && !initialData) {
            setValue(
                "slug",
                watchedTitle
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/[\s_-]+/g, "-")
                    .replace(/^-+|-+$/g, ""),
                { shouldValidate: true, shouldDirty: true },
            );
        }
    }, [watchedTitle, setValue, initialData]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 max-w-5xl pb-20"
        >
            <GeneralInfo register={register} />
            <TripHighlights register={register} control={control} />
            <HeaderVideoSection setValue={setValue} watch={watch} />
            <TripGallerySection
                register={register}
                setValue={setValue}
                watch={watch}
            />
            <TripDetailsSection
                register={register}
                setValue={setValue}
                watch={watch}
                control={control}
            />
            <ItinerarySection
                register={register}
                control={control}
                setValue={setValue}
                watch={watch}
            />
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#004D3C] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#003d30] shadow-lg transition-all"
                >
                    <Save size={20} /> Save Trip Data
                </button>
            </div>
        </form>
    );
};
export default TripForm;
