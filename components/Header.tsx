
import React from 'react';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white flex items-center justify-center rounded-md text-black font-bold text-xl">
            A
          </div>
          <span className="text-white text-2xl font-bold">Aiyaiya</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-gray-300 hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </nav>
        <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
