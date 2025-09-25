import React, { useState } from 'react';
import type { Language } from '../App';

interface HeaderProps {
  onNavigate?: (page: 'home') => void;
  navLinks: string[];
  signInText: string;
  setLanguage: (lang: Language) => void;
  currentLanguage: Language;
}

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const GlobeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.704 4.318l1.262 1.262m5.859 5.859l1.262 1.262M5.636 18.364l1.262-1.262m5.859-5.859l1.262-1.262M12 22a10 10 0 110-20 10 10 0 010 20z" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ onNavigate, navLinks, signInText, setLanguage, currentLanguage }) => {
  const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('home');
    }
  };

  const navLinksMap = [
      { name: navLinks[0], href: '#feature', icon: <SparklesIcon /> },
      { name: navLinks[1], href: '#use-case' },
      { name: navLinks[2], href: '#testimonial' },
      { name: navLinks[3], href: '#pricing' },
      { name: navLinks[4], href: '#faq' }
  ];

  return (
    <header className="sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" onClick={handleHomeClick} className="flex items-center space-x-2 cursor-pointer">
          <div className="w-8 h-8 bg-white flex items-center justify-center rounded-md text-black font-bold text-xl">
            A
          </div>
          <span className="text-white text-2xl font-bold">Aiyaiya</span>
        </a>
        <nav className="hidden md:flex items-center space-x-8">
            {navLinksMap.map(link => (
                <a key={link.name} href={link.href} className="flex items-center text-gray-300 hover:text-white transition-colors">
                    {link.icon}
                    {link.name}
                </a>
            ))}
        </nav>
        <div className="flex items-center space-x-4">
            <div className="relative">
                <button onClick={() => setLangDropdownOpen(!isLangDropdownOpen)} className="text-gray-300 hover:text-white">
                    <GlobeIcon />
                </button>
                {isLangDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-36 bg-[#1c162d] border border-white/10 rounded-lg shadow-lg">
                        <button onClick={() => { setLanguage('fr'); setLangDropdownOpen(false); }} 
                                className={`block w-full text-left px-4 py-2 text-sm ${currentLanguage === 'fr' ? 'text-white' : 'text-gray-400'} hover:bg-white/10`}>
                            Français
                        </button>
                        <button onClick={() => { setLanguage('en'); setLangDropdownOpen(false); }} 
                                className={`block w-full text-left px-4 py-2 text-sm ${currentLanguage === 'en' ? 'text-white' : 'text-gray-400'} hover:bg-white/10`}>
                            English
                        </button>
                    </div>
                )}
            </div>
            <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors border border-gray-600">
                {signInText}
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;