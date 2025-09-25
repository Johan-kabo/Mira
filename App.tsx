
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ImageGallery from './components/ImageGallery';
import Features from './components/Features';
import UseCases from './components/UseCases';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[#0d0b14] text-white font-sans">
      <style>{`
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
        <div className="relative z-10">
          <Header />
          <main>
            <Hero />
            <ImageGallery />
            <Features />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent my-10"></div>
            <UseCases />
            <Testimonials />
            <Pricing />
            <FAQ />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
