
import React from 'react';
import { GALLERY_IMAGES_TOP, GALLERY_IMAGES_BOTTOM } from '../constants';

const ImageColumn: React.FC<{ images: string[], className?: string }> = ({ images, className }) => (
    <div className={`flex flex-col gap-4 ${className}`}>
        {images.map((src, index) => (
            <img key={index} src={src} alt={`Gallery image ${index + 1}`} className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300" />
        ))}
    </div>
);

const ImageGallery: React.FC = () => {
    const cols = 4;
    const images = [
        "https://picsum.photos/seed/cat1/500/700",
        "https://picsum.photos/seed/bridge2/500/350",
        "https://picsum.photos/seed/frog1/500/500",
        "https://picsum.photos/seed/dogs1/500/600",
        "https://picsum.photos/seed/train2/500/400",
        "https://picsum.photos/seed/robot1/500/800",
        "https://picsum.photos/seed/soldier1/500/750",
        "https://picsum.photos/seed/castle2/500/450",
    ];

    const columns: string[][] = Array.from({ length: cols }, () => []);
    images.forEach((image, i) => {
        columns[i % cols].push(image);
    });

    return (
        <section className="py-20 overflow-hidden">
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 h-[500px] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                    {columns.map((colImages, i) => (
                         <ImageColumn key={i} images={colImages} className={i % 2 === 0 ? "animate-[scroll_20s_linear_infinite]" : "animate-[scroll-reverse_20s_linear_infinite]"} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImageGallery;

