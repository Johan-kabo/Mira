import React, { useState } from 'react';
import { NAV_LINKS } from '../constants';
import type { Theme } from '../App';

interface HeaderProps {
  onNavigate?: (page: 'home') => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const GlobeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293l.586-.586a2 2 0 012.828 0l2 2a2 2 0 010 2.828l-2 2a2 2 0 01-2.828 0l-.586-.586M12 22a10 10 0 110-20 10 10 0 010 20z" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ onNavigate, theme, setTheme }) => {
  const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('home');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-8 bg-white/80 dark:bg-black/30 backdrop-blur-lg border-b border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" onClick={handleHomeClick} className="flex items-center space-x-2 cursor-pointer">
          <div className="w-8 h-8 bg-gray-900 dark:bg-white flex items-center justify-center rounded-md text-white dark:text-black font-bold text-xl">
            A
          </div>
          <span className="text-gray-900 dark:text-white text-2xl font-bold">Aiyaiya</span>
        </a>
        <nav className="hidden md:flex items-center space-x-8">
          {onNavigate ? (
            <a href="/" onClick={handleHomeClick} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Home</a>
          ) : (
            NAV_LINKS.map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                {link}
              </a>
            ))
          )}
        </nav>
        <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white" aria-label="Toggle theme">
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <div className="relative">
                <button onClick={() => setLangDropdownOpen(!isLangDropdownOpen)} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white" aria-label="Select language">
                    <GlobeIcon />
                </button>
                {isLangDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setLangDropdownOpen(false)}>English</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setLangDropdownOpen(false)}>Français</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setLangDropdownOpen(false)}>Español</a>
                    </div>
                )}
            </div>
            <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                Sign In
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;