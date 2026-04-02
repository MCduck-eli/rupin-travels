import React from "react";

interface BlogHeroProps {
    title: string;
    imageUrl: string;
    imageAlt: string;
}

const BlogHero: React.FC<BlogHeroProps> = ({ title, imageUrl, imageAlt }) => {
    return (
        <section className="bg-white pt-16 md:pt-10 pb-5 px-2 w-full flex justify-center">
            <div className="w-full max-w-5xl flex flex-col items-center">
                <h2 className="text-4xl font-600 text-black text-center mb-12 md:mb-10 leading-tight max-w-4xl">
                    {title}
                </h2>
                <div className="w-full aspect-video md:aspect-21/9 overflow-hidden rounded-sm shadow-lg mb-4">
                    <img
                        src={imageUrl}
                        alt={imageAlt}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-101"
                    />
                </div>
            </div>
        </section>
    );
};

export default BlogHero;
