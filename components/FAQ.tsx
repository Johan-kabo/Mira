
import React, { useState } from 'react';
import { FAQ_ITEMS } from '../constants';
import type { FaqItem } from '../types';

const AccordionItem: React.FC<{ item: FaqItem; isOpen: boolean; onClick: () => void }> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-white/10">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-6"
            >
                <span className="text-lg text-white font-medium">{item.question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <p className="text-gray-400 pb-6 pr-8">
                    {item.answer}
                </p>
            </div>
        </div>
    );
};

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 px-4">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">Have questions?</h2>
                    <p className="text-gray-400 mt-4">
                        Have questions about how our Text-to-Image AI works? Find the answers to the most common inquiries below. If you don't see your question, feel free to reach out!
                    </p>
                    <button className="mt-8 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                        View all questions
                    </button>
                </div>
                <div className="lg:col-span-2">
                    {FAQ_ITEMS.map((item, index) => (
                        <AccordionItem
                            key={index}
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
