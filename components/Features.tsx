import React from 'react';
import type { Page } from '../types';

interface FeaturesProps {
    onNavigate: (page: Page) => void;
    content: {
        title: string;
        subtitle: string;
        cards: {
            video_generator: { title: string; description: string };
            text_to_audio: { title: string; description: string };
            remover: { title: string; description: string };
            image_to_prompt: { title: string; description: string };
            style_transfer: { title: string; description: string };
            upscaler: { title: string; description: string };
        }
    }
}

const FeatureCard: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => {
  return (
    <div className="bg-[#1c162d]/50 border border-white/10 rounded-2xl p-6 flex flex-col h-full">
      <div className="relative aspect-video mb-6 overflow-hidden rounded-xl bg-gray-900">
        {children}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm flex-grow">{description}</p>
    </div>
  );
};


const Features: React.FC<FeaturesProps> = ({ onNavigate, content }) => {
  return (
    <section id="feature" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{content.title}</h2>
          <p className="text-gray-400 mt-4">
            {content.subtitle}
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div onClick={() => onNavigate('video-generator')} className="cursor-pointer transform hover:scale-105 transition-transform duration-300">
                <FeatureCard title={content.cards.video_generator.title} description={content.cards.video_generator.description}>
                    <div className="w-full h-full flex items-center justify-center">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </div>
                </FeatureCard>
            </div>
            <div onClick={() => onNavigate('text-to-audio')} className="cursor-pointer transform hover:scale-105 transition-transform duration-300">
                <FeatureCard title={content.cards.text_to_audio.title} description={content.cards.text_to_audio.description}>
                     <div className="w-full h-full flex items-center justify-center">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                    </div>
                </FeatureCard>
            </div>
            <div onClick={() => onNavigate('background-remover')} className="cursor-pointer transform hover:scale-105 transition-transform duration-300">
                <FeatureCard title={content.cards.remover.title} description={content.cards.remover.description}>
                    <img src="https://picsum.photos/seed/cat-nobg/600/400" alt="Cat with background" className="absolute inset-0 w-full h-full object-cover"/>
                    <div className="absolute inset-0 w-1/2 h-full bg-cover bg-no-repeat bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/cat-bg/600/400')"}}></div>
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white">
                    <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-mono">&lt;&gt;</div>
                    </div>
                </FeatureCard>
            </div>
             <div onClick={() => onNavigate('image-to-prompt')} className="cursor-pointer transform hover:scale-105 transition-transform duration-300">
                <FeatureCard title={content.cards.image_to_prompt.title} description={content.cards.image_to_prompt.description}>
                     <div className="w-full h-full bg-black/20 flex items-center justify-center p-4 gap-2">
                        <div className="w-2/5 h-full">
                            <img src="https://picsum.photos/seed/art-for-prompt/300/400" alt="Artwork to generate prompt from" className="w-full h-full object-cover rounded-lg"/>
                        </div>
                        <div className="text-white text-3xl px-1">→</div>
                        <div className="w-3/5 h-full bg-gray-900/70 rounded-lg p-3 text-xs text-gray-400 font-mono overflow-y-auto">
                            "A highly detailed, photorealistic portrait of an old fisherman with deep wrinkles, a weathered face, and a thick white beard. He wears a yellow raincoat..."
                        </div>
                    </div>
                </FeatureCard>
            </div>
            <div onClick={() => onNavigate('ai-image-editor')} className="cursor-pointer transform hover:scale-105 transition-transform duration-300">
                <FeatureCard title={content.cards.style_transfer.title} description={content.cards.style_transfer.description}>
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center gap-2 bg-gray-900">
                        <img src="https://picsum.photos/seed/style-before/300/400" alt="Before style transfer" className="w-1/2 h-4/5 object-cover rounded-lg"/>
                        <img src="https://picsum.photos/seed/style-after/300/400" alt="After style transfer" className="w-1/2 h-4/5 object-cover rounded-lg"/>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xl">&rarr;</div>
                    </div>
                </FeatureCard>
            </div>
            <div onClick={() => onNavigate('creative-upscaler')} className="cursor-pointer transform hover:scale-105 transition-transform duration-300">
                <FeatureCard title={content.cards.upscaler.title} description={content.cards.upscaler.description}>
                    <img src="https://picsum.photos/seed/rainbow-landscape/600/400" alt="Upscaled landscape" className="absolute inset-0 w-full h-full object-cover"/>
                    <div className="absolute inset-0 w-1/2 h-full bg-cover bg-center backdrop-blur-md" style={{backgroundImage: "url('https://picsum.photos/seed/rainbow-landscape/600/400')"}}></div>
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white">
                        <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-mono">&lt;&gt;</div>
                    </div>
                    <div className="absolute top-2 left-4 text-white bg-black/50 px-2 py-1 rounded text-xs">Before</div>
                    <div className="absolute top-2 right-4 text-white bg-black/50 px-2 py-1 rounded text-xs">After</div>
                </FeatureCard>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Features;