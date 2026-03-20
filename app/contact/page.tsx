"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface ContactData {
    address: string;
    email: string;
    phone: string;
    description: string;
}

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    message: string;
}

export default function ContactSection() {
    const [data, setData] = useState<ContactData>({
        address: "209 Condari Ave",
        email: "info@RupinTravels.com",
        phone: "+1-309-310-4360",
        description:
            "A boutique tour company offering completely customized, bespoke trips to India & Southeast Asia.",
    });

    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        phone: "",
        message: "",
    });

    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        fetch("/api/contact-settings")
            .then((res) => res.json())
            .then((resData) => {
                if (resData && !resData.error) {
                    setData({
                        address: resData.address || data.address,
                        email: resData.email || data.email,
                        phone: resData.phone || data.phone,
                        description: resData.description || data.description,
                    });
                }
            })
            .catch((err) => console.error(err));
    }, []);

    const handleBlur = (field: string) => {
        setTouched({ ...touched, [field]: true });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    to: "info@RupinTravels.com",
                }),
            });

            if (response.ok) {
                setIsSubmitted(true);
                setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    message: "",
                });
                setTouched({});
            } else {
                alert("Submission failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid =
        formData.fullName.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.phone.trim().length > 5 &&
        formData.message.trim() !== "";

    const renderError = (field: keyof FormData) => {
        if (touched[field] && !formData[field].trim()) {
            return (
                <span className="text-red-500 text-xs mt-1 animate-pulse">
                    Please enter your{" "}
                    {field === "fullName" ? "full name" : field}!
                </span>
            );
        }
        return null;
    };

    return (
        <section className="bg-white py-20 px-6 md:px-16 lg:px-24 font-['Higuen']">
            <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start justify-between gap-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full md:w-1/3 space-y-10 border-l border-gray-200 pl-6"
                >
                    <div>
                        <h2 className="text-5xl text-[#59493b] mb-4 font-normal">
                            Bout India
                        </h2>
                        <p className="text-gray-500 leading-relaxed font-light">
                            {data.description}
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/15/15874.png"
                                alt="phone"
                                className="w-6 h-6 opacity-60 mt-1"
                            />
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="text-xs text-gray-800 font-medium">
                                        Call /
                                    </p>
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                                        alt="whatsapp"
                                        className="w-4 h-4"
                                    />
                                    <p className="text-xs text-gray-800 font-medium">
                                        WhatsApp
                                    </p>
                                </div>
                                <p className="text-2xl text-[#a68258] font-normal leading-none">
                                    {data.phone}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/542/542689.png"
                                alt="email"
                                className="w-6 h-6 opacity-60 mt-1"
                            />
                            <div>
                                <p className="text-xs text-gray-800 font-medium mb-1">
                                    Email Info
                                </p>
                                <p className="text-xl text-[#a68258] font-normal">
                                    {data.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/484/484167.png"
                                alt="location"
                                className="w-6 h-6 opacity-60 mt-1"
                            />
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <img
                                        src="https://flagcdn.com/w20/in.png"
                                        alt="India"
                                        className="w-5 h-auto"
                                    />
                                    <p className="text-xs font-bold text-gray-800 uppercase tracking-widest">
                                        India
                                    </p>
                                </div>
                                <p className="text-sm text-gray-500 leading-snug font-light max-w-[280px]">
                                    {data.address}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/484/484167.png"
                                alt="location"
                                className="w-6 h-6 opacity-60 mt-1"
                            />
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <img
                                        src="https://flagcdn.com/w20/us.png"
                                        alt="USA"
                                        className="w-5 h-auto"
                                    />
                                    <p className="text-xs font-bold text-gray-800 uppercase tracking-widest">
                                        USA
                                    </p>
                                </div>
                                <p className="text-sm text-gray-500 leading-snug font-light">
                                    Torrance, CA, USA-90502
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full md:w-2/3 min-h-[500px] flex flex-col justify-center"
                >
                    <AnimatePresence mode="wait">
                        {isSubmitting ? (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center space-y-4 py-20"
                            >
                                <div className="w-12 h-12 border-4 border-[#a68258]/20 border-t-[#a68258] rounded-full animate-spin"></div>
                                <p className="text-[#a68258] font-light tracking-widest animate-pulse">
                                    PROCESSING INQUIRY...
                                </p>
                            </motion.div>
                        ) : !isSubmitted ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <h2 className="text-4xl text-[#59493b] mb-2 font-normal">
                                    Contact Us
                                </h2>
                                <p className="text-gray-500 mb-8 font-light">
                                    Get in touch with us for your personalized
                                    travel experience.
                                </p>

                                <form
                                    onSubmit={handleSubmit}
                                    className="bg-[#f9f9f9] p-8 rounded-lg border-l-4 border-[#a68258] shadow-sm"
                                >
                                    <h3 className="text-[#a68258] text-xl mb-6 font-normal">
                                        Contact Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-black">
                                        <div className="flex flex-col">
                                            <label className="block text-sm mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                className={`w-full p-3 border rounded-md focus:outline-[#a68258] ${touched.fullName && !formData.fullName ? "border-red-500" : "border-gray-200"}`}
                                                value={formData.fullName}
                                                onBlur={() =>
                                                    handleBlur("fullName")
                                                }
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        fullName:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                            {renderError("fullName")}
                                        </div>
                                        <div className="flex flex-col text-black">
                                            <label className="block text-sm mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                className={`w-full p-3 border rounded-md focus:outline-[#a68258] ${touched.email && !formData.email ? "border-red-500" : "border-gray-200"}`}
                                                value={formData.email}
                                                onBlur={() =>
                                                    handleBlur("email")
                                                }
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        email: e.target.value,
                                                    })
                                                }
                                            />
                                            {renderError("email")}
                                        </div>
                                    </div>

                                    <div className="mb-6 flex flex-col text-black">
                                        <label className="block text-sm mb-2">
                                            Phone No. *
                                        </label>
                                        <PhoneInput
                                            country={"in"}
                                            value={formData.phone}
                                            onChange={(phone) =>
                                                setFormData({
                                                    ...formData,
                                                    phone,
                                                })
                                            }
                                            onBlur={() => handleBlur("phone")}
                                            inputStyle={{
                                                width: "100%",
                                                height: "50px",
                                                color: "black",
                                                borderRadius: "6px",
                                            }}
                                        />
                                        {renderError("phone")}
                                    </div>

                                    <div className="mb-8 flex flex-col text-black">
                                        <label className="block text-sm mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            rows={5}
                                            required
                                            className={`w-full p-3 border rounded-md focus:outline-[#a68258] ${touched.message && !formData.message ? "border-red-500" : "border-gray-200"}`}
                                            value={formData.message}
                                            onBlur={() => handleBlur("message")}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    message: e.target.value,
                                                })
                                            }
                                        ></textarea>
                                        {renderError("message")}
                                    </div>

                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            disabled={
                                                !isFormValid || isSubmitting
                                            }
                                            className={`px-12 py-4 rounded-md text-lg transition-all ${isFormValid && !isSubmitting ? "bg-[#a68258] text-white hover:bg-[#8e6d46]" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                                        >
                                            Send Inquiry
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="thanks"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-[#f9f9f9] p-16 rounded-lg border-l-4 border-[#a68258] shadow-sm text-center"
                            >
                                <div className="text-[#a68258] text-6xl mb-6">
                                    ✓
                                </div>
                                <h2 className="text-4xl text-[#59493b] mb-4 font-normal tracking-wide">
                                    Thank You!
                                </h2>
                                <p className="text-gray-600 text-lg font-light leading-relaxed">
                                    Your inquiry has been successfully sent. Our
                                    team will get back to you shortly.
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="mt-8 text-[#a68258] hover:underline font-medium uppercase tracking-widest text-sm"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
