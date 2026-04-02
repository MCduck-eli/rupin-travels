import React from "react";

interface ExpectationSectionProps {
    title?: string;
    subtitle?: string;
    items?: string[];
    proTip?: string;
}

const ExpectationSection: React.FC<ExpectationSectionProps> = ({
    title = "What to Expect on Your First Visit to India",
    subtitle = "India is intense, colorful, and full of life. Expect:",
    items = [
        "Busy streets and vibrant markets",
        "Rich history and iconic landmarks",
        "Diverse languages and traditions",
        "Friendly and helpful locals",
    ],
    proTip = "Embrace the chaos—it's part of the experience.",
}) => {
    return (
        <section className="bg-white text-black py-10">
            <div className="max-w-250 mx-auto px-6">
                <hr className="border-t-[3px] border-black mb-10" />

                <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🌍</span>
                    <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
                </div>

                <div className="text-[1.15rem] md:text-[1.25rem] leading-relaxed">
                    <h3 className="text-xl md:text-2xl mb-4 font-semibold">
                        {subtitle}
                    </h3>

                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        {items && items.length > 0
                            ? items.map((item, index) => (
                                  <li key={index} className="pl-2">
                                      {item}
                                  </li>
                              ))
                            : null}
                    </ul>

                    {proTip && (
                        <div className="flex items-start gap-2 bg-gray-50 p-4 rounded-xl border-l-4 border-yellow-400">
                            <span className="text-xl">💡</span>
                            <p>
                                <strong className="font-bold">Pro Tip:</strong>{" "}
                                {proTip}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ExpectationSection;
