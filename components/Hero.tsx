
import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';

const MagicWandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
);

const Hero: React.FC = () => {
  const [prompt, setPrompt] = useState('a cyberpunk dystopia with a sprawling, rain-soaked cityscape');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    setLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const imageUrl = await generateImage(prompt);
      setGeneratedImageUrl(imageUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section className="text-center py-20 px-4">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#1c162d] to-[#0d0b14] -z-10"></div>
      
      <div className="inline-flex items-center bg-white/10 text-white py-1 px-4 rounded-full text-sm mb-6">
        Speech to speech release! <span className="mx-2">•</span> Get early acces <span className="ml-2">→</span>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
        Turn Your Words into <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Stunning Visuals</span>
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto mt-6">
        Whether you need concept art, marketing materials, or personal projects, our text-to-image
        generator brings your imagination to life.
      </p>

      <div className="mt-10 max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGenerateImage()}
            placeholder="Describe the image you want to create..."
            className="w-full pl-6 pr-44 py-4 bg-white/10 text-white rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={loading}
          />
          <button
            onClick={handleGenerateImage}
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MagicWandIcon />
            <span>Create image</span>
          </button>
        </div>
      </div>
      
      <div className="mt-12 min-h-[512px] flex items-center justify-center">
        {loading && <LoadingSpinner />}
        {error && <p className="text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</p>}
        {generatedImageUrl && (
          <div className="relative group">
            <img src={generatedImageUrl} alt={prompt} className="rounded-2xl max-w-lg w-full h-auto shadow-2xl shadow-purple-900/50" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
              <a href={generatedImageUrl} download={`ai-image-${Date.now()}.png`} className="bg-white text-black px-4 py-2 rounded-lg">Download</a>
            </div>
          </div>
        )}
      </div>

    </section>
  );
};

export default Hero;
