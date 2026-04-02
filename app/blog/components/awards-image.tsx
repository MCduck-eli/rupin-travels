import React from "react";

interface AwardsImageProps {
    imageUrl: string;
    imageAlt?: string;
    awardsText?: string;
}

const AwardsImage: React.FC<AwardsImageProps> = ({
    imageUrl,
    imageAlt = "Awards photography submission",
    awardsText,
}) => {
    const finalImageUrl =
        imageUrl && imageUrl.trim() !== ""
            ? imageUrl
            : "/images/default-awards-photo.jpg";

    return (
        <section className="bg-white text-black py-10 md:py-16">
            <div className="max-w-300 mx-auto px-6 md:px-10">
                {" "}
                <div className="w-full h-auto aspect-21/9 bg-[#f0f0f0] mb-8 border border-transparent">
                    <img
                        src={finalImageUrl}
                        alt={imageAlt}
                        className="w-full h-full object-cover rounded-[3px]"
                    />
                </div>
                {awardsText && (
                    <div className="text-center font-serif">
                        <p className="text-lg md:text-xl lg:text-2xl text-black leading-tight tracking-wider uppercase opacity-90">
                            {awardsText}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AwardsImage;
