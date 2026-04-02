const FaqsPage = () => {
    const faqs = [
        {
            question: "Is India safe for solo travelers?",
            answer: "Yes, especially in major cities, if you follow basic safety precautions.",
        },
        {
            question: "What should I avoid in India?",
            answer: "Avoid unsafe street food, unofficial taxis, and isolated areas at night.",
        },
        {
            question: "Do I need cash in India?",
            answer: "Yes, but digital payments are widely accepted in cities.",
        },
    ];

    return (
        <main className="min-h-screen bg-white py-20 px-5 flex justify-center">
            <div className="w-full max-w-225">
                <div className="flex items-center gap-3 mb-10">
                    <span className="text-[#d93025] text-2xl font-bold">?</span>
                    <h1 className="text-3xl font-semibold text-black">
                        FAQs About First Time Travel to India
                    </h1>
                </div>
                <div className="space-y-9">
                    {faqs.map((faq, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <strong className="text-lg font-medium text-black">
                                {faq.question}
                            </strong>
                            <p className="text-base leading-relaxed text-black">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
                <hr className="mt-12 border-t border-black w-full" />
                <div className="mt-10">
                    <div className="flex items-center gap-2.5 mb-4">
                        <span className="text-xl">🔍</span>
                        <h2 className="text-2xl font-semibold text-black">
                            Final Thoughts: First Time in India
                        </h2>
                    </div>
                    <p className="text-base leading-relaxed text-black">
                        Your first time in India will be exciting, intense, and
                        deeply memorable. With the right preparation and
                        mindset, it can easily become one of the best travel
                        experiences of your life.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default FaqsPage;
