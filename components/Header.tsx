import React, { useState } from 'react';
import type { Language, Page, NavLink } from '../types';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  navLinks: NavLink[];
  signInText: string;
  setLanguage: (lang: Language) => void;
  currentLanguage: Language;
}

const GlobeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.704 4.318l1.262 1.262m5.859 5.859l1.262 1.262M5.636 18.364l1.262-1.262m5.859-5.859l1.262-1.262M12 22a10 10 0 110-20 10 10 0 010 20z" />
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ onNavigate, navLinks, signInText, setLanguage, currentLanguage }) => {
  const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
    setMobileMenuOpen(false);
  };

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" onClick={handleHomeClick} className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center rounded-md text-white font-bold text-xl">
              M
            </div>
            <span className="text-white text-2xl font-bold">Mira</span>
          </a>
          <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                  <a key={link.name} href="#" onClick={(e) => { e.preventDefault(); handleNavClick(link.page); }} className="text-gray-300 hover:text-white transition-colors">
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
                      <div className="absolute right-0 mt-2 w-48 bg-[#1c162d] border border-white/10 rounded-lg shadow-lg">
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
              <button className="hidden sm:block bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors border border-gray-600">
                  {signInText}
              </button>
              <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
                  <MenuIcon />
              </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/90 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex justify-end p-4">
              <button className="text-white" onClick={() => setMobileMenuOpen(false)}>
                  <CloseIcon />
              </button>
          </div>
          <nav className="flex flex-col items-center justify-center h-full -mt-16 space-y-8">
              {navLinks.map(link => (
                  <a key={link.name} href="#" onClick={(e) => { e.preventDefault(); handleNavClick(link.page); }} className="text-gray-300 hover:text-white transition-colors text-2xl font-bold">
                      {link.name}
                  </a>
              ))}
              <button className="sm:hidden bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors border border-gray-600">
                {signInText}
              </button>
          </nav>
      </div>
    </>
  );
};

export default Header;