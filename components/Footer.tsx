import React from 'react';
import type { Page } from '../types';

const SocialIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-colors">
        {children}
    </a>
);

interface FooterProps {
    onNavigate: (page: Page) => void;
    content: {
        description: string;
        about: string;
        aboutLinks: { name: string; page: Page }[];
        contact: string;
        copyright: string;
    }
}

const Footer: React.FC<FooterProps> = ({ onNavigate, content }) => {
  return (
    <footer className="bg-[#110e1b] text-gray-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center rounded-md text-white font-bold text-xl">
                M
              </div>
              <span className="text-white text-2xl font-bold">Mira</span>
            </div>
            <p className="max-w-md">{content.description}</p>
            <div className="flex space-x-4 mt-6">
              <SocialIcon>X</SocialIcon>
              <SocialIcon>F</SocialIcon>
              <SocialIcon>IG</SocialIcon>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">{content.about}</h4>
            <ul className="space-y-2">
              {content.aboutLinks.map(link => (
                  <li key={link.name}>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(link.page); }} className="hover:text-white cursor-pointer">
                      {link.name}
                    </a>
                  </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">{content.contact}</h4>
            <ul className="space-y-2 flex flex-col items-center md:items-start">
              <li className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                <span>kabojohan@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 006.256 6.256l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                <span>+237 674 671 243</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm">
          <p>{content.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;