
import React from 'react';

const FeatureCard: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => {
  return (
    <div className="bg-[#1c162d]/50 border border-white/10 rounded-2xl p-6 flex flex-col">
      <div className="relative aspect-video mb-6 overflow-hidden rounded-xl">
        {children}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <section id="feature" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Explore the powerful features behind our text-to-image generator</h2>
          <p className="text-gray-400 mt-4">
            Our text-to-image generator is built with cutting-edge technology to deliver exceptional results. Whether you're a designer, content creator, or business owner, these features will elevate your creative process to the next level.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <FeatureCard title="Background Remover" description="Effortlessly remove image backgrounds in seconds with our advanced AI technology. Perfect for creating stunning visuals, professional presentations, or e-commerce product photos.">
            <img src="https://picsum.photos/seed/cat-bg/600/400" alt="Cat with background" className="absolute inset-0 w-full h-full object-cover"/>
            <div className="absolute inset-0 w-1/2 h-full bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/cat-nobg/600/400')"}}></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white cursor-ew-resize">
              <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-mono">&lt;&gt;</div>
            </div>
          </FeatureCard>
          <FeatureCard title="Image to Prompt" description="Have an image but don't know how to describe it? Upload your image and our AI will generate a detailed text prompt that you can use to create similar visuals.">
            <div className="w-full h-full bg-[#0d0b14] flex items-center justify-center p-4">
                <div className="flex items-center gap-4">
                    <img src="https://picsum.photos/seed/api-img/200/200" className="rounded-lg w-24 h-24 object-cover" />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    <div className="bg-gray-800 p-2 rounded-md text-xs text-gray-300 w-40">"A golden retriever sitting in a lush green forest, sun filtering through the leaves..."</div>
                </div>
            </div>
          </FeatureCard>
          <FeatureCard title="AI Image Editor" description="Reimagine your images with our AI editor. Extend image boundaries seamlessly, add or remove objects, or change styles with simple text prompts.">
             <img src="https://picsum.photos/seed/uncrop-dog/600/400" alt="Dog uncrop" className="w-full h-full object-cover" />
             <div className="absolute inset-8 border-2 border-dashed border-white/50"></div>
          </FeatureCard>
          <FeatureCard title="Creative Upscaler" description="From Blurry to Beautiful: Our AI Upscaler enhances your images, instantly transforming them into crisp, high-definition masterpieces.">
            <img src="https://picsum.photos/seed/upscale-after/600/400" alt="Upscaled landscape" className="absolute inset-0 w-full h-full object-cover"/>
            <div className="absolute inset-0 w-1/2 h-full bg-cover bg-center backdrop-blur-sm" style={{backgroundImage: "url('https://picsum.photos/seed/upscale-before/600/400')"}}></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white cursor-ew-resize">
              <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-mono">&lt;&gt;</div>
            </div>
            <div className="absolute top-2 left-4 text-white bg-black/50 px-2 py-1 rounded">Before</div>
            <div className="absolute top-2 right-4 text-white bg-black/50 px-2 py-1 rounded">After</div>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};

export default Features;
