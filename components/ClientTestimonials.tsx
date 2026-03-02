import React from "react";

interface Testimonial {
    id: number;
    text: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        text: "I thoroughly enjoyed the experience with Rupin Travels - Monica",
    },
    { id: 2, text: "The trip was amazing - John" },
    {
        id: 3,
        text: "Add a short description of the speakers. Establish their credibility and expertise here. - Monica",
    },
];

const PinkVan = () => (
    <svg
        viewBox="0 0 220 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
    >
        <rect x="10" y="45" width="190" height="75" rx="14" fill="#E8899A" />
        <rect x="30" y="25" width="140" height="30" rx="10" fill="#E8899A" />
        <rect
            x="35"
            y="28"
            width="60"
            height="38"
            rx="6"
            fill="#F5F0C0"
            opacity="0.9"
        />
        <rect
            x="105"
            y="50"
            width="40"
            height="28"
            rx="5"
            fill="#F5F0C0"
            opacity="0.9"
        />
        <rect
            x="150"
            y="50"
            width="35"
            height="28"
            rx="5"
            fill="#F5F0C0"
            opacity="0.9"
        />
        <line
            x1="98"
            y1="48"
            x2="98"
            y2="118"
            stroke="#c97080"
            strokeWidth="2"
        />
        <ellipse cx="22" cy="78" rx="8" ry="6" fill="#f5e0a0" opacity="0.8" />
        <circle cx="55" cy="115" r="18" fill="#5a5a7a" />
        <circle cx="55" cy="115" r="10" fill="#888aaa" />
        <circle cx="155" cy="115" r="18" fill="#5a5a7a" />
        <circle cx="155" cy="115" r="10" fill="#888aaa" />
    </svg>
);

const GreyVan = () => (
    <svg
        viewBox="0 0 260 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
    >
        <rect x="60" y="8" width="50" height="22" rx="4" fill="#8B6914" />
        <rect x="118" y="12" width="35" height="18" rx="4" fill="#c49a3c" />
        <rect x="158" y="8" width="45" height="22" rx="4" fill="#6B4F10" />
        <rect x="15" y="48" width="225" height="85" rx="12" fill="#9BAAB8" />
        <circle cx="38" cy="68" r="9" fill="#c8956c" />
        <circle cx="65" cy="65" r="9" fill="#b07850" />
        <circle cx="109" cy="63" r="7" fill="#b07850" />
        <circle cx="153" cy="62" r="7" fill="#9a6040" />
        <circle cx="197" cy="63" r="7" fill="#c8956c" />
        <circle cx="65" cy="128" r="22" fill="#444" />
        <circle cx="65" cy="128" r="12" fill="#888" />
        <circle cx="185" cy="128" r="22" fill="#444" />
        <circle cx="185" cy="128" r="12" fill="#888" />
    </svg>
);

const Leaf = ({ rotate, color, className, style }: any) => (
    <svg
        viewBox="0 0 40 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
        <path
            d="M20 55 C20 55 2 35 5 18 C8 5 20 2 20 2 C20 2 32 5 35 18 C38 35 20 55 20 55Z"
            fill={color}
        />
    </svg>
);

const ClientTestimonials: React.FC = () => {
    return (
        <section
            className="relative w-full overflow-hidden flex flex-row px-4 md:px-20 py-8 md:py-16"
            style={{ backgroundColor: "#FDF6E9" }}
        >
            <div className="flex flex-col justify-start z-10 w-3/5">
                <h2
                    className="text-2xl md:text-5xl font-normal mb-6 md:mb-10"
                    style={{ color: "#6F4E37", fontFamily: "Georgia, serif" }}
                >
                    Client Testimonials
                </h2>

                <ul className="flex flex-col gap-4 md:gap-8 list-none p-0 m-0">
                    {TESTIMONIALS.map((t) => (
                        <li key={t.id}>
                            <p
                                className="text-[10px] md:text-lg leading-tight inline"
                                style={{
                                    color: "#6F4E37",
                                    fontFamily: "'Courier New', monospace",
                                    borderBottom: "1px solid #6F4E37",
                                }}
                            >
                                {t.text}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="relative w-2/5 flex items-center justify-center">
                <div className="absolute top-0 left-0 w-[60%] md:w-[55%] z-20">
                    <PinkVan />
                </div>
                <div className="absolute bottom-4 right-0 w-[85%] md:w-[82%] z-10">
                    <GreyVan />
                </div>

                <Leaf
                    rotate={20}
                    color="#5C7C3C"
                    className="absolute top-[10%] right-[5%] w-3 md:w-7 h-auto z-30"
                />
                <Leaf
                    rotate={-10}
                    color="#9CC474"
                    className="absolute top-[30%] right-[12%] w-2 md:w-5 h-auto z-30"
                    opacity={0.6}
                />
                <Leaf
                    rotate={35}
                    color="#CDE4A8"
                    className="absolute top-[50%] right-[2%] w-2 md:w-4 h-auto z-30"
                    opacity={0.4}
                />
            </div>
        </section>
    );
};

export default ClientTestimonials;
