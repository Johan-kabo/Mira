import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import type { Page, Language, NavLink } from '../types';

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const GlobeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.704 4.318l1.262 1.262m5.859 5.859l1.262 1.262M5.636 18.364l1.262-1.262m5.859-5.859l1.262-1.262M12 22a10 10 0 110-20 10 10 0 010 20z" />
    </svg>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
  toolNavLinks: NavLink[];
  onNavigate: (page: Page) => void;
  currentPage: Page;
  setLanguage: (lang: Language) => void;
  currentLanguage: Language;
  signInText: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  toolNavLinks,
  onNavigate,
  currentPage,
  setLanguage,
  currentLanguage,
  signInText,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);

   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-[#0d0b14] text-white font-sans">
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black/60 z-30 transition-opacity lg:hidden ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onNavigate={(page) => {
          onNavigate(page);
          if (window.innerWidth < 1024) {
             setIsSidebarOpen(false);
          }
        }}
        currentPage={currentPage}
        toolNavLinks={toolNavLinks}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-[#110e1b]/80 backdrop-blur-lg border-b border-white/10 flex items-center justify-between px-4 sm:px-6 h-16 flex-shrink-0 z-20">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-300 hover:text-white"
            title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            <MenuIcon />
          </button>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button onClick={() => setLangDropdownOpen(!isLangDropdownOpen)} className="text-gray-300 hover:text-white">
                <GlobeIcon />
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1c162d] border border-white/10 rounded-lg shadow-lg z-10">
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
            <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors border border-gray-600 text-sm font-medium">
              {signInText}
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;