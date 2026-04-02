import React from "react";

interface FoodGuideProps {
    mainTitle?: string;
    introText?: string;
    listTitle?: string;
    foodItems?: string[];
    safetyTitle?: string;
    safetyTips?: string[];
}

const FoodGuide: React.FC<FoodGuideProps> = ({
    mainTitle = "Indian Food Guide for First-Time Visitor",
    introText,
    listTitle,
    foodItems = [],
    safetyTitle,
    safetyTips = [],
}) => {
    return (
        <section className="bg-white text-black py-5">
            <div className="max-w-250 mx-auto px-6 md:px-10">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">🍲</span>
                    <h2 className="text-2xl md:text-3xl">{mainTitle}</h2>
                </div>

                <div className="text-[1.15rem] md:text-[1.25rem] leading-relaxed">
                    {introText && <p className="mb-8">{introText}</p>}
                    {listTitle && (
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">🥘</span>
                                <h3 className="text-xl md:text-2xl font-normal">
                                    {listTitle}
                                </h3>
                            </div>
                            <ul className="list-disc pl-8 space-y-1">
                                {foodItems.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {(safetyTitle || safetyTips.length > 0) && (
                        <div className="mb-10">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">⚠️</span>
                                <h3 className="text-xl md:text-2xl font-normal">
                                    {safetyTitle}
                                </h3>
                            </div>
                            <ul className="list-disc pl-8 space-y-1">
                                {safetyTips.map((tip, index) => (
                                    <li key={index}>{tip}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FoodGuide;
