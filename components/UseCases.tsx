
import React from 'react';
import { USE_CASES } from '../constants';

const UseCases: React.FC = () => {
  return (
    <section id="use-case" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Endless possibilities with AI art</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {USE_CASES.map((useCase) => (
            <div key={useCase.title} className="bg-[#1c162d]/50 border border-white/10 rounded-2xl p-8">
              <div className="w-12 h-12 bg-purple-600/20 text-purple-400 rounded-lg flex items-center justify-center mb-4">
                {useCase.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
              <p className="text-gray-400">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
