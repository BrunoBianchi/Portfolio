// components/roadmap.tsx
import React, { useState } from 'react';
import { useActiveSection } from '~/hooks/useActiveSection';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface RoadmapProps {
  headings: Heading[];
}

const SubheadingArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="w-3 h-3 mr-1.5 text-gray-500 flex-shrink-0 mt-0.5">
    <path d="M4 5.5V8.5C4 9.05228 4.44772 9.5 5 9.5H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M10 7.5L12 9.5L10 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const Roadmap: React.FC<RoadmapProps> = ({ headings }) => {
  const { activeId, scrollToSection } = useActiveSection(headings);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!headings || headings.length === 0) {
    return null;
  }

  const filteredHeadings = headings.filter(h => h.level > 1);

  const renderHeading = (heading: Heading) => {
    const isActive = activeId === heading.id;
    const isSubheading = heading.level > 2;
    
    return (
      <li key={heading.id}>
        <button
          onClick={() => {
            scrollToSection(heading.id);
            setIsMobileMenuOpen(false); // Fechar menu mobile após clique
          }}
          className={`
            flex items-start w-full text-left px-2 py-1.5 rounded-md transition-all duration-200 group
            ${isActive
              ? 'bg-primary/10 text-primary border-l-2 border-primary'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50'
            }
            ${isSubheading ? 'ml-3 text-xs' : 'text-sm font-medium'}
          `}
        >
          {isSubheading && <SubheadingArrowIcon />}
          <span className="leading-snug line-clamp-2">
            {heading.text}
          </span>
        </button>
      </li>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden xl:block fixed top-32 left-4 w-56 z-30">
        <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 border border-gray-200 dark:border-gray-700 shadow-lg">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-3 px-2">
            Neste post
          </h3>
          <ul className="space-y-0.5 max-h-[70vh] overflow-y-auto pr-1 aside-scrollbar">
            {filteredHeadings.map(renderHeading)}
          </ul>
        </nav>
      </aside>

      {/* Mobile Floating Button */}
      <div className="xl:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-primary text-black p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-200 flex items-center justify-center"
          aria-label="Abrir índice do post"
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="xl:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu */}
          <div className="xl:hidden fixed bottom-20 right-6 left-6 z-50 max-h-[70vh]">
            <nav className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-2xl">
              <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg mb-4 px-2">
                Neste post
              </h3>
              <ul className="space-y-1 max-h-[50vh] overflow-y-auto pr-1 aside-scrollbar">
                {filteredHeadings.map(renderHeading)}
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
};
