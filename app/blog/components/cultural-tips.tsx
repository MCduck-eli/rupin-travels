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
    mainTitle = "Cultural Tips You Should Know Before Visiting India",
    introText = "Understanding Indian culture will improve your experience:",
    tipsList = [
        "Dress modestly in public places",
        "Remove shoes in temples",
        "Use your right hand for giving/receiving",
        "Respect local customs and traditions",
    ],
    challengesTitle = "Common Challenges (and How to Handle Them)",
    challenges = [
        {
            emoji: "🚦",
            title: "Traffic & Crowds",
            description: "Stay patient and plan extra travel time",
        },
        {
            emoji: "🔊",
            title: "Noise & Chaos",
            description: "It's normal—don't let it overwhelm you",
        },
        {
            emoji: "🤯",
            title: "Culture Shock",
            description: "Take it slow and stay open-minded",
        },
    ],
}) => {
    return (
        <section className="bg-white text-black ">
            <div className="max-w-250 mx-auto px-6 md:px-10">
                <div className="flex items-center gap-3 ">
                    <span className="text-2xl">🧭</span>
                    <h2 className="text-2xl md:text-3xl">{mainTitle}</h2>
                </div>

                <div className="text-[1.15rem] md:text-[1.25rem] leading-relaxed">
                    <p className="mb-6">{introText}</p>
                    <ul className="list-disc pl-8 space-y-1 mb-5">
                        {tipsList.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-2 mb-5">
                        <span className="text-xl">😵‍💫</span>
                        <h3 className="text-xl md:text-2xl font-normal">
                            {challengesTitle}
                        </h3>
                    </div>
                    <div className="space-y-7">
                        {challenges.map((item, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">
                                        {item.emoji}
                                    </span>
                                    <h4 className="text-xl md:text-2xl font-normal">
                                        {item.title}
                                    </h4>
                                </div>
                                <p className="opacity-90">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CulturalTips;
