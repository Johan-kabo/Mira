import React from 'react';
import { ALL_GALLERY_IMAGES } from '../constants';

const ScrollingImageGallery: React.FC = () => {
    // Split images for two rows, then duplicate for seamless loop
    const midPoint = Math.ceil(ALL_GALLERY_IMAGES.length / 2);
    const row1 = [...ALL_GALLERY_IMAGES.slice(0, midPoint), ...ALL_GALLERY_IMAGES.slice(0, midPoint)];
    const row2 = [...ALL_GALLERY_IMAGES.slice(midPoint), ...ALL_GALLERY_IMAGES.slice(midPoint)];

    return (
        <section className="py-10 md:py-20 w-full overflow-hidden">
             <div className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
                <div className="flex flex-col gap-4">
                    {/* First Row */}
                    <div className="flex w-max animate-[marquee_120s_linear_infinite]">
                        {row1.map((src, index) => (
                            <img
                                key={`row1-${index}`}
                                src={src}
                                alt={`AI generated art example`}
                                className="h-40 md:h-48 w-auto rounded-2xl object-cover shadow-lg mx-2 flex-shrink-0"
                            />
                        ))}
                    </div>
                    {/* Second Row */}
                     <div className="flex w-max animate-[marquee_120s_linear_infinite_reverse]">
                        {row2.map((src, index) => (
                            <img
                                key={`row2-${index}`}
                                src={src}
                                alt={`AI generated art example`}
                                className="h-40 md:h-48 w-auto rounded-2xl object-cover shadow-lg mx-2 flex-shrink-0"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScrollingImageGallery;
