import React from 'react';
import type { Page, NavLink } from '../types';
import { TOOL_ICONS } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  onNavigate: (page: Page) => void;
  currentPage: Page;
  toolNavLinks: NavLink[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onNavigate, currentPage, toolNavLinks }) => {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 flex flex-col bg-[#110e1b] text-white
        transition-transform duration-300 ease-in-out 
        lg:relative lg:translate-x-0 lg:transition-all
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isOpen ? 'w-64' : 'lg:w-20'}
      `}
    >
      {/* Logo */}
      <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} 
         className={`flex items-center justify-center h-16 border-b border-white/10 flex-shrink-0
                    ${isOpen ? 'px-6' : 'px-4'}`}>
        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center rounded-md text-white font-bold text-xl flex-shrink-0">
            M
        </div>
        <span className={`text-xl font-bold ml-3 whitespace-nowrap overflow-hidden transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            Mira
        </span>
      </a>
      
      {/* Navigation */}
      <nav className="flex-grow p-2 space-y-2 mt-4 overflow-y-auto">
        {toolNavLinks.map(link => (
          <a
            key={link.page}
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate(link.page); }}
            className={`flex items-center p-3 rounded-lg transition-colors group
                        ${currentPage === link.page 
                            ? 'bg-purple-600 text-white' 
                            : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
            title={isOpen ? '' : link.name}
          >
            <span className="w-6 h-6 flex-shrink-0">{TOOL_ICONS[link.page]}</span>
            <span 
              className={`
                ml-4 text-sm font-medium whitespace-nowrap overflow-hidden 
                transition-opacity duration-200 
                ${isOpen ? 'opacity-100' : 'opacity-0'}
              `}
            >
                {link.name}
            </span>
          </a>
        ))}
      </nav>
      
      {/* Footer/User section (placeholder) */}
      <div className="p-4 border-t border-white/10 mt-auto flex-shrink-0">
        {/* Future user profile section */}
      </div>
    </aside>
  );
};

export default Sidebar;