
import React from 'react';
import { PRICING_FEATURES } from '../constants';

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

const Pricing: React.FC = () => {
    return (
        <section id="pricing" className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">Affordable plans for every creator</h2>
                    <p className="text-gray-400 mt-4">
                        Choose a plan that fits your needs. Whether you're a creator just starting out or a business seeking advanced features, we have the perfect plan for you.
                    </p>
                </div>

                <div className="mt-16 bg-[#1c162d]/50 border border-white/10 rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-4">
                        {/* Header Row */}
                        <div className="p-6 border-b border-r border-white/10">
                            <h3 className="text-xl font-bold text-white">Compare plans</h3>
                            <p className="text-sm text-gray-400 mt-1">Choose your workspace plan according to your organisational plan</p>
                        </div>
                        <div className="p-6 text-center border-b border-r border-white/10">
                            <h3 className="text-xl font-bold text-white">Free Plan</h3>
                            <button className="mt-4 bg-purple-600 text-white w-full py-2 rounded-lg hover:bg-purple-700 transition-colors">Choose package</button>
                        </div>
                        <div className="p-6 text-center border-b border-r border-white/10 bg-purple-600/10">
                            <div className="flex justify-center items-center">
                                <h3 className="text-xl font-bold text-white">Pro Plan</h3>
                                <span className="ml-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">Popular</span>
                            </div>
                            <button className="mt-4 bg-purple-600 text-white w-full py-2 rounded-lg hover:bg-purple-700 transition-colors">Choose package</button>
                        </div>
                        <div className="p-6 text-center border-b border-white/10">
                            <h3 className="text-xl font-bold text-white">Enterprise Plan</h3>
                             <button className="mt-4 bg-purple-600 text-white w-full py-2 rounded-lg hover:bg-purple-700 transition-colors">Choose package</button>
                        </div>

                        {/* Feature Rows */}
                        {PRICING_FEATURES.map((feature, index) => (
                            <React.Fragment key={feature.name}>
                                <div className={`p-6 text-white border-r border-white/10 ${index < PRICING_FEATURES.length - 1 ? 'border-b' : ''}`}>{feature.name}</div>
                                <div className={`p-6 text-gray-300 text-center border-r border-white/10 ${index < PRICING_FEATURES.length - 1 ? 'border-b' : ''} flex justify-center items-center`}>
                                    {typeof feature.free === 'boolean' ? (feature.free ? <CheckIcon/> : <XIcon/>) : feature.free}
                                </div>
                                <div className={`p-6 text-gray-300 text-center border-r border-white/10 bg-purple-600/10 ${index < PRICING_FEATURES.length - 1 ? 'border-b' : ''} flex justify-center items-center`}>
                                    {typeof feature.pro === 'boolean' ? (feature.pro ? <CheckIcon/> : <XIcon/>) : feature.pro}
                                </div>
                                <div className={`p-6 text-gray-300 text-center ${index < PRICING_FEATURES.length - 1 ? 'border-b border-white/10' : ''} flex justify-center items-center`}>
                                    {typeof feature.enterprise === 'boolean' ? (feature.enterprise ? <CheckIcon/> : <XIcon/>) : feature.enterprise}
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
