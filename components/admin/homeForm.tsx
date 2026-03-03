"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Save,
    Video,
    Image as ImageIcon,
    BookOpen,
    User,
    Star,
} from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";

const HomeForm = () => {
    const { register, handleSubmit, setValue, watch, reset } = useForm();

    const heroVideo = watch("heroVideo");
    const experienceImage = watch("experienceImage");
    const whoImage = watch("whoImage");

    useEffect(() => {
        fetch("/api/home-settings")
            .then((res) => res.json())
            .then((data) => {
                if (data) reset(data);
            });
    }, [reset]);

    const onSubmit = async (data: any) => {
        try {
            const res = await fetch("/api/home-settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) alert("Home sahifasi muvaffaqiyatli yangilandi!");
        } catch (error) {
            console.error("Xatolik:", error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 max-w-5xl pb-20"
        >
            {/* HERO SECTION */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-[#004D3C] border-b pb-2 flex items-center gap-2">
                    <Video size={20} /> Hero Section
                </h3>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Hero Video (Only the video changes.)
                    </label>
                    <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) =>
                            setValue("heroVideo", res[0].url)
                        }
                    />
                    {heroVideo && (
                        <p className="text-xs text-green-600">
                            Video uploaded: {heroVideo}
                        </p>
                    )}
                </div>
            </div>

            {/* PHILOSOPHY SECTION */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-[#004D3C] border-b pb-2 flex items-center gap-2">
                    <BookOpen size={20} /> Philosophy Section
                </h3>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Tagline (Sariq fondagi matn)
                    </label>
                    <textarea
                        {...register("philosophyTagline")}
                        rows={2}
                        className="border p-2 rounded-md outline-[#004D3C]"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        {...register("philosophyTitle")}
                        className="border p-2 rounded-md outline-[#004D3C]"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Content (Luxury list)
                    </label>
                    <textarea
                        {...register("philosophyContent")}
                        rows={6}
                        placeholder="Har bir qatorni yangi qatordan yozing"
                        className="border p-2 rounded-md outline-[#004D3C]"
                    />
                </div>
            </div>

            {/* EXPERIENCE SECTION */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-[#004D3C] border-b pb-2 flex items-center gap-2">
                    <Star size={20} /> Experience Section
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                {...register("experienceTitle")}
                                className="border p-2 rounded-md outline-[#004D3C]"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">
                                Content
                            </label>
                            <textarea
                                {...register("experienceContent")}
                                rows={4}
                                className="border p-2 rounded-md outline-[#004D3C]"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Experience Image
                        </label>
                        <UploadDropzone
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) =>
                                setValue("experienceImage", res[0].url)
                            }
                        />
                        {experienceImage && (
                            <img
                                src={experienceImage}
                                className="h-20 w-32 object-cover rounded border"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* WHO SECTION */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-[#004D3C] border-b pb-2 flex items-center gap-2">
                    <User size={20} /> Who Section
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Who Section Image
                        </label>
                        <UploadDropzone
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) =>
                                setValue("whoImage", res[0].url)
                            }
                        />
                        {whoImage && (
                            <img
                                src={whoImage}
                                className="h-20 w-32 object-cover rounded border"
                            />
                        )}
                    </div>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                {...register("whoTitle")}
                                className="border text-black p-2 rounded-md outline-[#004D3C]"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">
                                Content
                            </label>
                            <textarea
                                {...register("whoContent")}
                                rows={4}
                                className="border p-2 rounded-md outline-[#004D3C]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#004D3C] text-white px-10 py-3 rounded-lg font-medium hover:bg-[#003d30] shadow-lg transition-all"
                >
                    <Save size={20} />
                    Save Home Page
                </button>
            </div>
        </form>
    );
};

export default HomeForm;
