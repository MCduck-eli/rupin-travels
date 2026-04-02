import React from "react";

interface IntroSectionProps {
    question?: string;
    description1?: string;
    description2?: string;
    highlightText?: string;
}

const IntroSection: React.FC<IntroSectionProps> = ({
    question = "Is India Good for First-Time Travelers?",
    description1,
    description2,
    highlightText,
}) => {
    return (
        <section className="bg-white text-black py-10">
            <div className="max-w-250 mx-auto px-6 md:px-10">
                <div className="flex items-start gap-4 mb-10">
                    <span className="text-[#d93025] text-4xl md:text-5xl font-serif font-bold leading-none translate-y-1">
                        ?
                    </span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium leading-tight tracking-tight">
                        {question}
                    </h2>
                </div>
                <div className="font-serif text-[#1a1a1a] text-[1.15rem] md:text-[1.3rem] leading-[1.8] tracking-normal">
                    {description1 && <p>{description1}</p>}
                    {description2 && <p>{description2}</p>}
                    {highlightText && (
                        <p className=" text-[1.25rem] md:text-[1.45rem] leading-snug  border-t pt-5 border-transparent">
                            {highlightText}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default IntroSection;
