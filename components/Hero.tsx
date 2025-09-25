import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';

const CreateImageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2l4.47.65a1 1 0 01.554 1.705l-3.236 3.154.764 4.456a1 1 0 01-1.451 1.054L10 15.547l-3.994 2.098a1 1 0 01-1.451-1.054l.764-4.456-3.236-3.154a1 1 0 01.554-1.705l4.47-.65L9.033 2.744A1 1 0 0110 2h2z" clipRule="evenodd" />
    </svg>
)

const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
);


interface HeroProps {
  content: {
    speechRelease: string;
    getAccess: string;
    title: string;
    subtitle: string;
    button: string;
    placeholder: string;
  };
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleGenerateImage = async () => {
     if (!prompt.trim()) {
      setError('Veuillez entrer un prompt.');
      return;
    }
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const newImageUrl = await generateImage(prompt);
      setImageUrl(newImageUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Une erreur inconnue est survenue.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section className="text-center pt-10 pb-20 px-4">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#1c162d] to-[#0d0b14] -z-10"></div>
      
      <a href="#" className="inline-flex items-center bg-white/10 text-white py-1 px-4 rounded-full text-sm mb-6 hover:bg-white/20 transition-colors">
        {content.speechRelease} <span className="mx-2">•</span> {content.getAccess} <span className="ml-2">→</span>
      </a>

      <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight" dangerouslySetInnerHTML={{ __html: content.title }}></h1>
      <p className="text-gray-300 max-w-2xl mx-auto mt-6">
        {content.subtitle}
      </p>

      <div className="mt-10 max-w-2xl mx-auto">
         <form onSubmit={(e) => { e.preventDefault(); handleGenerateImage(); }} className="relative">
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={content.placeholder}
                className="w-full pl-6 pr-48 py-5 bg-white text-gray-900 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                disabled={loading}
            />
            <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <CreateImageIcon />
                <span>{content.button}</span>
            </button>
        </form>
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>
      
      <div className="mt-10 max-w-2xl mx-auto">
        {loading && (
          <div className="flex flex-col items-center justify-center p-8 bg-[#1c162d]/50 border border-white/10 rounded-2xl">
            <LoadingSpinner />
            <p className="text-gray-300 mt-4">Génération de votre chef-d'œuvre...</p>
          </div>
        )}
        {imageUrl && !loading && (
          <div className="bg-[#1c162d]/50 border border-white/10 rounded-2xl p-4">
            <h2 className="text-2xl font-bold text-white mb-4">Votre résultat</h2>
            <img src={imageUrl} alt={prompt} className="rounded-xl shadow-lg mx-auto max-w-full" />
          </div>
        )}
      </div>

    </section>
  );
};

export default Hero;