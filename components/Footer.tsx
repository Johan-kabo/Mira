
import React from 'react';

const SocialIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-colors">
        {children}
    </a>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#110e1b] text-gray-400 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white flex items-center justify-center rounded-md text-black font-bold text-xl">
                A
              </div>
              <span className="text-white text-2xl font-bold">Aiyaiya</span>
            </div>
            <p className="max-w-md">Streamline Operations, Boost Productivity, and Drive Innovation with Our All-in-One Platform</p>
            <div className="flex space-x-4 mt-6">
              <SocialIcon>X</SocialIcon>
              <SocialIcon>F</SocialIcon>
              <SocialIcon>IG</SocialIcon>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#feature" className="hover:text-white">Feature</a></li>
              <li><a href="#testimonial" className="hover:text-white">Testimonial</a></li>
              <li><a href="#faq" className="hover:text-white">FAQ</a></li>
              <li><a href="#use-case" className="hover:text-white">Use Case</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                <span>hi@aiyaiya.ai</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 006.256 6.256l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                <span>+812 - 0193 - 6778 - 4</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm">
          <p>&copy; 2024 Aiyaiya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
