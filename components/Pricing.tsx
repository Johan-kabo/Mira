import React, { useState } from 'react';
import { PlanFeature } from '../types';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

interface PricingProps {
    content: {
        title: string;
        subtitle: string;
        compare: string;
        compareSubtitle: string;
        freePlan: string;
        proPlan: string;
        enterprisePlan: string;
        choosePackage: string;
        popular: string;
        features: PlanFeature[];
    }
}

type Plan = 'free' | 'pro' | 'enterprise';

const Pricing: React.FC<PricingProps> = ({ content }) => {
    const [selectedPlan, setSelectedPlan] = useState<Plan>('pro');

    const renderFeatureValue = (feature: PlanFeature, plan: Plan) => {
        const value = feature[plan];
        if (typeof value === 'boolean') {
            return value ? <CheckIcon /> : <XIcon />;
        }
        return <span className="text-gray-300">{value}</span>;
    };

    return (
        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{content.title}</h2>
                    <p className="text-gray-400 mt-4">
                        {content.subtitle}
                    </p>
                </div>

                {/* Mobile View */}
                <div className="mt-12 lg:hidden">
                    <div className="flex justify-center bg-[#1c162d]/50 border border-white/10 rounded-full p-1">
                        <button onClick={() => setSelectedPlan('free')} className={`w-1/3 py-2 rounded-full text-sm font-bold transition-colors ${selectedPlan === 'free' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>{content.freePlan}</button>
                        <button onClick={() => setSelectedPlan('pro')} className={`w-1/3 py-2 rounded-full text-sm font-bold transition-colors relative ${selectedPlan === 'pro' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>{content.proPlan} <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">{content.popular}</span></button>
                        <button onClick={() => setSelectedPlan('enterprise')} className={`w-1/3 py-2 rounded-full text-sm font-bold transition-colors ${selectedPlan === 'enterprise' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>{content.enterprisePlan}</button>
                    </div>
                    <div className="mt-8 bg-[#1c162d]/50 border border-white/10 rounded-2xl p-6">
                        <ul className="space-y-4">
                            {content.features.map(feature => (
                                <li key={feature.name} className="flex justify-between items-center border-b border-white/10 pb-4 last:border-b-0">
                                    <span className="text-white">{feature.name}</span>
                                    {renderFeatureValue(feature, selectedPlan)}
                                </li>
                            ))}
                        </ul>
                         <button className="mt-8 bg-purple-600 text-white w-full py-3 rounded-lg hover:bg-purple-700 transition-colors font-bold">{content.choosePackage}</button>
                    </div>
                </div>

                {/* Desktop View */}
                <div className="mt-16 hidden lg:block bg-[#1c162d]/50 border border-white/10 rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-4">
                        {/* Header Row */}
                        <div className="p-6 border-b border-r border-white/10">
                            <h3 className="text-xl font-bold text-white">{content.compare}</h3>
                            <p className="text-sm text-gray-400 mt-1">{content.compareSubtitle}</p>
                        </div>
                        <div className="p-6 text-center border-b border-r border-white/10">
                            <h3 className="text-xl font-bold text-white">{content.freePlan}</h3>
                            <button className="mt-4 bg-purple-600 text-white w-full py-2 rounded-lg hover:bg-purple-700 transition-colors">{content.choosePackage}</button>
                        </div>
                        <div className="p-6 text-center border-b border-r border-white/10 bg-purple-600/10">
                            <div className="flex justify-center items-center">
                                <h3 className="text-xl font-bold text-white">{content.proPlan}</h3>
                                <span className="ml-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">{content.popular}</span>
                            </div>
                            <button className="mt-4 bg-purple-600 text-white w-full py-2 rounded-lg hover:bg-purple-700 transition-colors">{content.choosePackage}</button>
                        </div>
                        <div className="p-6 text-center border-b border-white/10">
                            <h3 className="text-xl font-bold text-white">{content.enterprisePlan}</h3>
                             <button className="mt-4 bg-purple-600 text-white w-full py-2 rounded-lg hover:bg-purple-700 transition-colors">{content.choosePackage}</button>
                        </div>

                        {/* Feature Rows */}
                        {content.features.map((feature, index) => (
                            <React.Fragment key={feature.name}>
                                <div className={`p-6 text-white border-r border-white/10 ${index < content.features.length - 1 ? 'border-b' : ''}`}>{feature.name}</div>
                                <div className={`p-6 text-gray-300 text-center border-r border-white/10 ${index < content.features.length - 1 ? 'border-b' : ''} flex justify-center items-center`}>
                                    {renderFeatureValue(feature, 'free')}
                                </div>
                                <div className={`p-6 text-gray-300 text-center border-r border-white/10 bg-purple-600/10 ${index < content.features.length - 1 ? 'border-b' : ''} flex justify-center items-center`}>
                                    {renderFeatureValue(feature, 'pro')}
                                </div>
                                <div className={`p-6 text-gray-300 text-center ${index < content.features.length - 1 ? 'border-b border-white/10' : ''} flex justify-center items-center`}>
                                    {renderFeatureValue(feature, 'enterprise')}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;