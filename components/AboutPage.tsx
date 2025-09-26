import React from 'react';
import type { Page } from '../types';

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

interface AboutPageProps {
    onNavigate: (page: Page) => void;
    content: {
        title: string;
        subtitle: string;
        missionTitle: string;
        missionText: string;
        teamTitle: string;
        teamText: string;
    }
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, content }) => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
            <button onClick={() => onNavigate('home')} className="flex items-center space-x-2 text-gray-300 hover:text-white mb-8 group">
                <BackArrowIcon />
                <span className="group-hover:underline">Back to Home</span>
            </button>

            <div className="space-y-12">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">{content.title}</h1>
                    <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                        {content.subtitle}
                    </p>
                </div>

                <div className="bg-[#1c162d]/50 border border-white/10 rounded-2xl p-8 sm:p-10">
                    <h2 className="text-3xl font-bold text-white mb-4">{content.missionTitle}</h2>
                    <p className="text-gray-400 leading-relaxed">
                        {content.missionText}
                    </p>
                </div>
                
                <div className="bg-[#1c162d]/50 border border-white/10 rounded-2xl p-8 sm:p-10">
                     <h2 className="text-3xl font-bold text-white mb-4">{content.teamTitle}</h2>
                    <p className="text-gray-400 leading-relaxed">
                        {content.teamText}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;