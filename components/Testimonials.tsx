import React from 'react';
import { Testimonial } from '../types';

interface TestimonialsProps {
    content: {
        title: string;
        subtitle: string;
        quotes: Testimonial[];
    }
}

const Testimonials: React.FC<TestimonialsProps> = ({ content }) => {
  return (
    <section id="testimonial" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiPjxwYXRoIGQ9Ik0wIC41SDMyIi8+PHBhdGggZD0iTS41IDBWMzIiLz48L3N2Zz4=')]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{content.title}</h2>
                <p className="text-gray-400 mt-4">
                    {content.subtitle}
                </p>
            </div>
            <div className="mt-16 relative">
                 <div className="flex gap-8 animate-[marquee_40s_linear_infinite]">
                    {[...content.quotes, ...content.quotes].map((testimonial, index) => (
                        <div key={index} className="bg-[#1c162d]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex-shrink-0 w-[80vw] max-w-[320px] md:w-96">
                            <div className="flex items-center mb-4">
                                <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                                <div>
                                <p className="font-bold text-white">{testimonial.name}</p>
                                <p className="text-sm text-gray-400">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-300">"{testimonial.quote}"</p>
                        </div>
                    ))}
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b14] via-transparent to-[#0d0b14]"></div>
            </div>
        </div>
    </section>
  );
};

export default Testimonials;