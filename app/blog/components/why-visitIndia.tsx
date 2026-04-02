import React from "react";

interface WhyVisitIndiaProps {
    title?: string;
    subtitle?: string;
    reasons?: string[];
    closingText?: string;
}

const WhyVisitIndia: React.FC<WhyVisitIndiaProps> = ({
    title = "Why Visit India at Least Once?",
    subtitle = "India offers experiences you won't find anywhere else:",
    reasons = [
        "Spiritual journeys",
        "Diverse food culture",
        "Historic landmarks",
        "Unique traditions",
    ],
    closingText = "Your first trip may challenge you—but it will also change your perspective.",
}) => {
    return (
        <section className="bg-white text-black py-10">
            <div className="max-w-250 mx-auto px-6 md:px-10">
                <hr className="border-t-[3px] border-black mb-10" />
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">✨</span>
                    <h2 className="text-2xl md:text-3xl">{title}</h2>
                </div>

                <div className="text-[1.15rem] md:text-[1.25rem] leading-relaxed">
                    <p className="mb-6">{subtitle}</p>
                    <ul className="list-disc pl-8 space-y-1 mb-5">
                        {reasons.map((reason, index) => (
                            <li key={index} className="pl-2">
                                {reason}
                            </li>
                        ))}
                    </ul>
                    {closingText && <p className="mt-10">{closingText}</p>}
                </div>
            </div>
        </section>
    );
};

export default WhyVisitIndia;
