"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Save, Image as ImageIcon, Video } from "lucide-react";
import { ITrip } from "@/types/trip";
import { UploadDropzone } from "@/lib/uploadthing";

interface TripFormProps {
    initialData?: ITrip;
    onSubmit: (data: ITrip) => void;
}

const convertToSlug = (text: string) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

const TripForm: React.FC<TripFormProps> = ({ initialData, onSubmit }) => {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ITrip>({
        defaultValues: initialData || {
            title: "",
            fullTitle: "",
            slug: "",
            headerVideo: "",
            description: "",
            fullDescription: "",
            price: "",
            itinerary: [{ day: 1, title: "", content: "", image: "" }],
            gallery: [],
        },
    });

    const {
        fields: itineraryFields,
        append: appendDay,
        remove: removeDay,
    } = useFieldArray({ control, name: "itinerary" });

    const galleryItems = watch("gallery") || [];
    const headerVideo = watch("headerVideo");
    const watchedTitle = watch("title");

    useEffect(() => {
        if (watchedTitle && !initialData) {
            // Faqat yangi trip yaratilayotganda slugni auto-update qiladi
            const newSlug = convertToSlug(watchedTitle);
            setValue("slug", newSlug, {
                shouldValidate: true,
                shouldDirty: true,
            });
        }
    }, [watchedTitle, setValue, initialData]);

    const handleUploadComplete = (res: any) => {
        const newImages = res.map((file: any) => ({
            url: file.ufsUrl || file.url, // v9 uchun ufsUrl qo'shildi
            label: "",
            title: "",
        }));

        setValue("gallery", [...galleryItems, ...newImages], {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    const removeImage = (index: number) => {
        const updatedGallery = galleryItems.filter((_, i) => i !== index);
        setValue("gallery", updatedGallery, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 max-w-5xl pb-20"
        >
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-[#004D3C] border-b pb-2">
                    General Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-[#004D3C]">
                            Trip Title (Hero)
                        </label>
                        <input
                            {...register("title", { required: true })}
                            placeholder="e.g. Himalayan Stillness"
                            className="border p-2 rounded-md text-[#004D3C] outline-[#004D3C]"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-[#004D3C]">
                            URL Slug (Auto-generated)
                        </label>
                        <input
                            {...register("slug")}
                            readOnly
                            placeholder="himalayan-stillness"
                            className="border p-2 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed outline-none border-gray-200"
                        />
                    </div>

                    <div className="flex flex-col gap-1 md:col-span-2">
                        <label className="text-sm font-medium text-[#004D3C]">
                            Full Title (Main Section)
                        </label>
                        <input
                            {...register("fullTitle")}
                            className="border p-2 rounded-md text-[#004D3C] outline-[#004D3C]"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-[#004D3C]">
                        Hero Description (Short)
                    </label>
                    <textarea
                        {...register("description")}
                        rows={2}
                        className="border p-2 rounded-md outline-[#004D3C] text-[#004D3C]"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-[#004D3C]">
                        Main Section Description (Long)
                    </label>
                    <textarea
                        {...register("fullDescription")}
                        rows={4}
                        className="border p-2 rounded-md outline-[#004D3C] text-[#004D3C]"
                    />
                </div>

                <div className="flex flex-col gap-1 w-full md:w-1/3">
                    <label className="text-sm font-medium text-[#004D3C]">
                        Base Price (Starting from)
                    </label>
                    <input
                        {...register("price")}
                        placeholder="e.g. 1200"
                        className="border p-2 rounded-md text-[#004D3C] outline-[#004D3C]"
                    />
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-[#004D3C] border-b pb-2 flex items-center gap-2">
                    <Video size={20} /> Header Video
                </h3>
                {headerVideo && (
                    <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden bg-black">
                        <video
                            src={headerVideo}
                            className="w-full h-full object-cover"
                            controls
                        />
                        <button
                            type="button"
                            onClick={() => setValue("headerVideo", "")}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                )}
                <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={
                        (res) =>
                            setValue("headerVideo", res[0].ufsUrl || res[0].url) // v9 update
                    }
                    appearance={{
                        container:
                            "border-2 border-dashed border-[#004D3C]/20 rounded-lg bg-[#F7F5F2] p-4",
                        button: "bg-[#004D3C] text-white px-4 py-2 rounded-md",
                    }}
                    content={{ label: "Upload MP4 Video" }}
                />
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-[#004D3C] border-b pb-2 flex items-center gap-2">
                    <ImageIcon size={20} /> Trip Gallery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryItems.map((img, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-2 p-3 border rounded-lg bg-gray-50 group"
                        >
                            <div className="relative aspect-square rounded-md overflow-hidden shadow-sm">
                                <img
                                    src={img.url}
                                    className="w-full h-full object-cover"
                                    alt="Gallery"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                            <input
                                {...register(`gallery.${index}.label` as const)}
                                placeholder="Label (e.g. Day 1)"
                                className="text-xs text-black border p-2 rounded outline-[#004D3C]"
                            />
                            <input
                                {...register(`gallery.${index}.title` as const)}
                                placeholder="Title (e.g. Sunset)"
                                className="text-xs border text-black p-2 rounded font-semibold outline-[#004D3C]"
                            />
                            <input
                                type="hidden"
                                {...register(`gallery.${index}.url` as const)}
                            />
                        </div>
                    ))}
                </div>
                <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={handleUploadComplete}
                    appearance={{
                        container:
                            "border-2 border-dashed border-[#004D3C]/20 rounded-lg bg-[#F7F5F2] py-8",
                        button: "bg-[#004D3C] text-white px-6 py-2 rounded-md mt-4",
                    }}
                />
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="text-lg font-semibold text-[#004D3C]">
                        Daily Itinerary
                    </h3>
                    <button
                        type="button"
                        onClick={() =>
                            appendDay({
                                day: itineraryFields.length + 1,
                                title: "",
                                content: "",
                                image: "",
                            })
                        }
                        className="flex items-center gap-1 text-sm bg-[#004D3C] text-white px-3 py-1 rounded-md"
                    >
                        <Plus size={16} /> Add Day
                    </button>
                </div>
                <div className="space-y-6">
                    {itineraryFields.map((field, index) => (
                        <div
                            key={field.id}
                            className="p-4 bg-gray-50 rounded-lg relative border border-gray-100 space-y-4"
                        >
                            <button
                                type="button"
                                onClick={() => removeDay(index)}
                                className="absolute top-2 right-2 text-red-500 p-1"
                            >
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="text-xs uppercase text-gray-500">
                                        Day
                                    </label>
                                    <input
                                        type="number"
                                        {...register(
                                            `itinerary.${index}.day` as const,
                                        )}
                                        className="w-full border p-2 rounded-md text-[#004D3C]"
                                    />
                                </div>
                                <div className="md:col-span-3">
                                    <label className="text-xs uppercase text-gray-500">
                                        Title
                                    </label>
                                    <input
                                        {...register(
                                            `itinerary.${index}.title` as const,
                                        )}
                                        className="w-full border p-2 rounded-md text-[#004D3C]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs uppercase text-gray-500">
                                        Day Image
                                    </label>
                                    <UploadDropzone
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            setValue(
                                                `itinerary.${index}.image`,
                                                res[0].ufsUrl || res[0].url,
                                            ); // v9 update
                                        }}
                                        appearance={{
                                            container:
                                                "border-2 border-dashed border-[#004D3C]/10 rounded-lg bg-white p-4 h-32",
                                            button: "bg-[#004D3C] text-white text-[10px] px-2 py-1",
                                        }}
                                    />
                                </div>
                                {watch(`itinerary.${index}.image`) && (
                                    <div className="relative h-32 w-full rounded-lg overflow-hidden border border-gray-200">
                                        <img
                                            src={watch(
                                                `itinerary.${index}.image`,
                                            )}
                                            className="w-full h-full object-cover"
                                            alt="Preview"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setValue(
                                                    `itinerary.${index}.image`,
                                                    "",
                                                )
                                            }
                                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4">
                                <label className="text-xs uppercase text-gray-500">
                                    Content
                                </label>
                                <textarea
                                    {...register(
                                        `itinerary.${index}.content` as const,
                                    )}
                                    rows={3}
                                    className="w-full border p-2 rounded-md text-[#004D3C]"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

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
