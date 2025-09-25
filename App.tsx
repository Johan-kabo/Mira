import React, { useState, useEffect } from 'react';
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


export type Page = 'home' | 'background-remover' | 'image-to-prompt' | 'ai-image-editor' | 'creative-upscaler';
export type Theme = 'dark' | 'light';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);


  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
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
        case 'home':
        default:
            return (
                <main>
                    <Hero />
                    <ImageGallery />
                    <Features onNavigate={handleNavigate} />
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent my-10"></div>
                    <UseCases />
                    <Testimonials />
                    <Pricing />
                    <FAQ />
                </main>
            );
    }
  };


  return (
    <div className="bg-gray-50 dark:bg-[#0d0b14] text-gray-900 dark:text-white font-sans min-h-screen">
      <style>{`
        :root { color-scheme: light; }
        .dark { color-scheme: dark; }
        @keyframes scroll {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @keyframes scroll-reverse {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }
        .animate-\\[scroll_20s_linear_infinite\\] {
          animation: scroll 20s linear infinite;
        }
        .animate-\\[scroll-reverse_20s_linear_infinite\\] {
          animation: scroll-reverse 20s linear infinite;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-\\[marquee_40s_linear_infinite\\] {
            animation: marquee 40s linear infinite;
        }
      `}</style>
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/50 rounded-full blur-[150px] -z-0"></div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header onNavigate={handleNavigate} theme={theme} setTheme={setTheme} />
          <div className="flex-grow">
            {renderPage()}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;