import React from "react";

interface ChallengeItem {
    emoji: string;
    title: string;
    description: string;
}

interface CulturalTipsProps {
    mainTitle?: string;
    introText?: string;
    tipsList?: string[];
    challengesTitle?: string;
    challenges?: ChallengeItem[];
}

const CulturalTips: React.FC<CulturalTipsProps> = ({
    mainTitle,
    introText,
    tipsList,
    challengesTitle,
    challenges,
}) => {
    const displayTitle = mainTitle || "Cultural Etiquette in India";
    const displayIntro =
        introText ||
        "Respecting local traditions will make your trip much smoother:";
    const displayTips = tipsList && tipsList.length > 0 ? tipsList : [];
    const displayChallengesTitle =
        challengesTitle || "Common Travel Challenges";
    const displayChallenges =
        challenges && challenges.length > 0 ? challenges : [];

    return (
        <section className="bg-white text-black py-10">
            <div className="max-w-[1000px] mx-auto px-6 md:px-10">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">🧭</span>
                    <h2 className="text-2xl md:text-3xl font-bold">
                        {displayTitle}
                    </h2>
                </div>

                <div className="text-[1.15rem] md:text-[1.25rem] leading-relaxed">
                    <p className="mb-6">{displayIntro}</p>

                    {displayTips.length > 0 && (
                        <ul className="list-disc pl-8 space-y-1 mb-10">
                            {displayTips.map((tip, index) => (
                                <li key={index}>{tip}</li>
                            ))}
                        </ul>
                    )}

                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-xl">😵‍💫</span>
                        <h3 className="text-xl md:text-2xl font-semibold">
                            {displayChallengesTitle}
                        </h3>
                    </div>

                    <div className="space-y-7">
                        {displayChallenges.map((item, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">
                                        {item.emoji}
                                    </span>
                                    <h4 className="text-xl md:text-2xl font-medium">
                                        {item.title}
                                    </h4>
                                </div>
                                <p className="opacity-80">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CulturalTips;
