import React from "react";

interface SafetyTipsProps {
    title?: string;
    subtitle?: string;
    tips?: string[];
}

const SafetyTips: React.FC<SafetyTipsProps> = ({
    title = "Safety Tips for First-Time Travelers in India",
    subtitle = "India is generally safe, but awareness is key.",
    tips = [
        "Avoid isolated areas at night",
        "Keep valuables secure",
        "Use trusted transport apps",
        "Stay alert in crowded places",
    ],
}) => {
    return (
        <section className="bg-white text-black py-10">
            <div className="max-w-250 mx-auto px-6 md:px-10">
                <hr className="border-t-[3px] border-black mb-10" />

                <div className="flex items-center gap-3">
                    <span className="text-2xl">⚠️</span>
                    <h2 className="text-2xl md:text-3xl">{title}</h2>
                </div>

                <div className="text-[1.15rem] md:text-[1.25rem] leading-relaxed">
                    <h2 className="text-2xl md:text-3xl mb-5">{subtitle}</h2>
                    <ul className="list-disc pl-8 space-y-1 mb-5">
                        {tips.map((tip, index) => (
                            <li key={index} className="pl-2">
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
                <hr className="border-t-[3px] border-black mt-2" />
            </div>
        </section>
    );
};

export default SafetyTips;
