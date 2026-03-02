import React from "react";

const Hero: React.FC = () => {
    return (
        <section className="relative h-150 w-full flex flex-col items-center justify-center text-white overflow-hidden">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2000')`,
                    filter: "brightness(0.8) contrast(1.1)",
                }}
            />

            <div className="relative z-10 flex flex-col items-center text-center px-4">
                <h1
                    className="text-5xl md:text-7xl font-bold tracking-[0.15em] uppercase mb-4 drop-shadow-lg"
                    style={{ fontFamily: "Georgia, serif" }}
                >
                    HIMALAYAN STILLNESS
                </h1>

                <p className="text-lg md:text-xl font-light tracking-wide mb-10 opacity-90">
                    Journeys that transform you
                </p>

                <button className="px-16 py-3 border border-white text-white text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white hover:text-black">
                    CONTACT US
                </button>
            </div>
        </section>
    );
};

export default Hero;
