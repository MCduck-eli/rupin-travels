"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
    return (
        <section className="bg-[#fff7f5] py-20 px-6 md:px-16 lg:px-24">
            <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
                {/* CHAP TOMON: Rasm (Illyustratsiya) */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/2 flex justify-center md:justify-start"
                >
                    <div className="relative max-w-[450px] w-full">
                        {/* Skrinshotdagi illyustratsiyaga o'xshash rasm */}
                        <img
                            src="https://img.freepik.com/free-vector/customer-support-flat-design-concept_23-2148290240.jpg"
                            alt="Contact Support Illustration"
                            className="w-full h-auto mix-blend-multiply opacity-90"
                        />
                    </div>
                </motion.div>

                {/* O'NG TOMON: Kontakt ma'lumotlari */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/2"
                >
                    {/* Sarlavha */}
                    <h2 className="font-serif text-5xl md:text-6xl text-[#59493b] mb-14 italic tracking-tight uppercase">
                        Contact Us
                    </h2>

                    {/* Ma'lumotlar ro'yxati */}
                    <div className="space-y-10">
                        {/* Mailing Address */}
                        <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-16">
                            <h3 className="font-serif text-xl italic text-[#59493b] underline min-w-[150px]">
                                Mailing Address
                            </h3>
                            <p className="text-[#59493b] text-lg font-medium">
                                123 Anywhere St.
                                <br />
                                Any City, ST 12345
                            </p>
                        </div>

                        {/* Email Address */}
                        <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-16">
                            <h3 className="font-serif text-xl italic text-[#59493b] underline min-w-37.5">
                                Email Address
                            </h3>
                            <p className="text-[#59493b] text-lg font-medium">
                                hello@reallygreatsite.com
                            </p>
                        </div>

                        {/* Phone Number */}
                        <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-16">
                            <h3 className="font-serif text-xl italic text-[#59493b] underline min-w-37.5">
                                Phone Number
                            </h3>
                            <p className="text-[#59493b] text-lg font-medium">
                                (123) 456-7890
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
