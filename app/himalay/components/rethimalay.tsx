import React from "react";

const RetHimalay: React.FC = () => {
    const features = [
        "Daily yoga, meditation, and breathwork",
        "Ayurvedic consultations and therapeutic treatments",
        "Sacred river ceremonies and spiritual teachings",
        "Guided nature walks, waterfalls, and Himalayan vistas",
        "A balance of structure and spacious free time",
        "A serene mountain retreat to integrate and reflect",
    ];

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center bg-[#f9f8f6] p-6 md:p-12 overflow-hidden text-[#2d2d2d]">
            {/* Orqa fondagi akvarel effekti (Soft Background Blobs) */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-stone-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />

            <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                {/* Chap tomon: Ro'yxat */}
                <div className="md:col-span-7 space-y-4">
                    <ul className="space-y-3">
                        {features.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-3 text-lg font-light tracking-wide italic"
                            >
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    {/* Asosiy matn qismi */}
                    <div className="mt-12 space-y-6">
                        <p className="text-xl leading-relaxed font-light">
                            Escape the noise and rediscover yourself in
                            Rishikesh, the world's yoga capital.
                        </p>
                        <p className="text-lg leading-relaxed font-light opacity-90">
                            This 9-day immersive retreat blends daily yoga,
                            meditation, Ayurveda, and mindful living to restore
                            balance, clarity, and energy—at your own pace.
                            Suitable for all levels, it's a holistic reset for
                            body and mind.
                        </p>
                        <p className="text-lg font-medium tracking-tight">
                            Slow down. Breathe deeply. Reconnect with what truly
                            matters.
                            <br />
                            Arrive as you are—leave grounded, refreshed, and
                            inspired.
                        </p>
                    </div>
                </div>

                {/* O'ng tomon: Qisqa xulosa qismi */}
                <div className="md:col-span-5 border-l border-gray-200 pl-8 hidden md:block">
                    <ul className="space-y-6">
                        <li className="flex items-start gap-3 text-xl font-light italic">
                            <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                            <div>
                                Daily yoga,
                                <br />
                                meditation, and
                                <br />
                                breathwork
                            </div>
                        </li>
                        <li className="flex items-start gap-3 text-xl font-light italic">
                            <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                            <div>
                                mountain
                                <br />
                                retreat to
                                <br />
                                integrate and
                                <br />
                                reflect
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default RetHimalay;
