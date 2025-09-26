import React from 'react';

const ImageGallery: React.FC = () => {
    return (
        <section className="relative -mt-12 md:-mt-20 px-4 w-full">
            <div className="max-w-screen-xl mx-auto h-48 md:h-64 flex justify-center items-end gap-2 sm:gap-4 overflow-hidden">
                <img src="https://picsum.photos/seed/cat-on-desk/300/400" alt="Cat on a desk" className="rounded-xl sm:rounded-2xl shadow-lg h-full w-auto object-cover self-center" />
                <img src="https://picsum.photos/seed/suspension-bridge/400/300" alt="Suspension bridge" className="rounded-xl sm:rounded-2xl shadow-lg h-4/5 w-auto object-cover" />
                <img src="https://picsum.photos/seed/empty-station/400/300" alt="Train station" className="rounded-xl sm:rounded-2xl shadow-lg h-3/5 w-auto object-cover hidden md:block" />
                <img src="https://picsum.photos/seed/two-dogs/400/350" alt="Two dogs" className="rounded-xl sm:rounded-2xl shadow-lg h-full w-auto object-cover self-center" />
                <img src="https://picsum.photos/seed/cyber-robot/400/300" alt="Cyber robot" className="rounded-xl sm:rounded-2xl shadow-lg h-4/5 w-auto object-cover hidden lg:block" />
                <img src="https://picsum.photos/seed/spooky-castle/400/300" alt="Spooky castle" className="rounded-xl sm:rounded-2xl shadow-lg h-3/5 w-auto object-cover hidden xl:block" />
                <img src="https://picsum.photos/seed/proud-soldier/300/400" alt="Soldier" className="rounded-xl sm:rounded-2xl shadow-lg h-full w-auto object-cover self-center hidden sm:block" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0d0b14] via-[#0d0b14]/90 to-transparent"></div>
        </section>
    );
};

export default ImageGallery;