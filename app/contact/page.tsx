"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
    const [data, setData] = useState({
        address: "123 Anywhere St.\nAny City, ST 12345",
        email: "hello@reallygreatsite.com",
        phone: "(123) 456-7890",
        image: "https://img.freepik.com/free-vector/customer-support-flat-design-concept_23-2148290240.jpg",
    });

    useEffect(() => {
        fetch("/api/contact-settings")
            .then((res) => res.json())
            .then((resData) => {
                if (resData && !resData.error) {
                    setData({
                        address: resData.address || data.address,
                        email: resData.email || data.email,
                        phone: resData.phone || data.phone,
                        image: resData.image || data.image,
                    });
                }
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <section className="bg-[#fff7f5] py-24 px-6 md:px-16 lg:px-24">
            <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/2 flex justify-center md:justify-start"
                >
                    <div className="relative max-w-112.5 w-full overflow-hidden rounded-sm shadow-sm">
                        <img
                            src={data.image}
                            alt="Contact"
                            className="w-full h-auto mix-blend-multiply opacity-90 object-cover "
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/2"
                >
                    {/* Sarlavha - Beautifully Delicious */}
                    <h2
                        className="text-5xl md:text-7xl text-[#59493b] mb-12 tracking-tight"
                        style={{
                            fontFamily: "'Beautifully Delicious', sans-serif",
                        }}
                    >
                        Contact Us
                    </h2>

                    <div className="space-y-10">
                        {/* Kontakt bloklari - Higuen */}
                        <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-16">
                            <h3
                                className="text-xl text-[#59493b] min-w-[150px] opacity-60"
                                style={{ fontFamily: "'Higuen', serif" }}
                            >
                                Mailing Address
                            </h3>
                            <p
                                className="text-[#59493b] text-lg md:text-xl font-light whitespace-pre-line"
                                style={{ fontFamily: "'Higuen', serif" }}
                            >
                                {data.address}
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-16">
                            <h3
                                className="text-xl text-[#59493b] min-w-[150px] opacity-60"
                                style={{ fontFamily: "'Higuen', serif" }}
                            >
                                Email Address
                            </h3>
                            <p
                                className="text-[#59493b] text-lg md:text-xl font-light"
                                style={{ fontFamily: "'Higuen', serif" }}
                            >
                                {data.email}
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-16">
                            <h3
                                className="text-xl text-[#59493b] min-w-[150px] opacity-60"
                                style={{ fontFamily: "'Higuen', serif" }}
                            >
                                Phone Number
                            </h3>
                            <p
                                className="text-[#59493b] text-lg md:text-xl font-light"
                                style={{ fontFamily: "'Higuen', serif" }}
                            >
                                {data.phone}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
