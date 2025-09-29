import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ImageGallery from './components/ImageGallery';
import Features from './components/Features';
import UseCases from './components/UseCases';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BackgroundRemoverPage from './components/features/BackgroundRemoverPage';
import ImageToPromptPage from './components/features/ImageToPromptPage';
import AIImageEditorPage from './components/features/AIImageEditorPage';
import CreativeUpscalerPage from './components/features/CreativeUpscalerPage';
import ScrollingImageGallery from './components/ScrollingImageGallery';
import AboutPage from './components/AboutPage';
import { translations } from './constants';
import type { Page, Language } from './types';
import './src/gemini'; // Ensures the AI client is initialized


function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [language, setLanguage] = useState<Language>('fr');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const content = translations[language];
  
  const renderPage = () => {
    switch (currentPage) {
        case 'background-remover':
            return <BackgroundRemoverPage onNavigate={handleNavigate} />;
        case 'image-to-prompt':
            return <ImageToPromptPage onNavigate={handleNavigate} />;
        case 'ai-image-editor':
            return <AIImageEditorPage onNavigate={handleNavigate} />;
        case 'creative-upscaler':
            return <CreativeUpscalerPage onNavigate={handleNavigate} />;
        case 'about':
            return <AboutPage onNavigate={handleNavigate} content={content.aboutPage} />;
        case 'home':
        default:
            return (
                <main>
                    <Hero content={content.hero} />
                    <ImageGallery />
                    <Features onNavigate={handleNavigate} content={content.features} />
                    <ScrollingImageGallery />
                    <UseCases content={content.useCases}/>
                    <Testimonials content={content.testimonials}/>
                    <Pricing content={content.pricing} />
                    <FAQ content={content.faq}/>
                </main>
            );
    }
  };


  return (
    <div className="dark bg-[#0d0b14] text-white font-sans min-h-screen">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .animate-\\[marquee_40s_linear_infinite\\] {
            animation: marquee 40s linear infinite;
        }
         .animate-\\[marquee_120s_linear_infinite\\] {
            animation: marquee 120s linear infinite;
        }
        .animate-\\[marquee_120s_linear_infinite_reverse\\] {
            animation: marquee-reverse 120s linear infinite;
        }
      `}</style>
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-purple-900/50 rounded-full blur-[200px] -z-0"></div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header 
            onNavigate={handleNavigate} 
            navLinks={content.headerNavLinks}
            signInText={content.signIn}
            setLanguage={setLanguage}
            currentLanguage={language}
          />
          <div className="flex-grow">
            {renderPage()}
          </div>
          <Footer onNavigate={handleNavigate} content={content.footer} />
        </div>
      </div>
    </div>
  );
}

export default App;