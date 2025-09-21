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

// Removido - não precisamos mais do ícone

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

  const renderHeading = (heading: Heading, index: number) => {
    const isActive = activeId === heading.id;
    const isSubheading = heading.level > 2;

    return (
      <li key={heading.id} className="relative">
        <button
          onClick={() => {
            scrollToSection(heading.id);
            setIsMobileMenuOpen(false);
          }}
          className={`
            block w-full text-left py-2 px-3 rounded-lg transition-all duration-300 text-xs font-light relative
            ${isActive
              ? 'text-primary bg-primary/15 border border-primary/30 font-medium shadow-lg shadow-primary/10'
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }
            ${isSubheading ? 'ml-3 py-1.5 text-[11px]' : ''}
          `}
        >
          {isActive && (
            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"></span>
          )}
          <span className={`block leading-relaxed truncate ${isActive ? 'pl-3' : ''}`}>
            {heading.text}
          </span>
        </button>
      </li>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed top-24 xl:top-32 left-2 lg:left-4 xl:left-8 w-44 lg:w-48 xl:w-52 z-30 pointer-events-none">
        <div className="pointer-events-auto">
        <nav className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/30 shadow-2xl max-h-[calc(100vh-8rem)] overflow-hidden">
          <h3 className="text-xs font-medium text-white mb-4 tracking-wide">
            Neste Post
          </h3>
          <ol className="space-y-1.5 max-h-[calc(100vh-12rem)]">
            {filteredHeadings.slice(0, 8).map(renderHeading)}
            {filteredHeadings.length > 8 && (
              <li className="text-xs text-gray-500 italic px-4 py-2">
                +{filteredHeadings.length - 8} seções...
              </li>
            )}
          </ol>
        </nav>
        </div>
      </aside>

      {/* Mobile Floating Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-primary text-black p-4 rounded-2xl shadow-2xl hover:bg-amber-400 transition-all duration-300 flex items-center justify-center hover:scale-105"
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
            className="lg:hidden fixed inset-0 bg-black/60 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu */}
          <div className="lg:hidden fixed bottom-24 right-4 left-4 z-50 max-h-[70vh]">
            <nav className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 shadow-2xl">
              <h3 className="font-medium text-white text-base mb-6 tracking-wide">
                Neste Post
              </h3>
              <ol className="space-y-2 max-h-[50vh] overflow-y-auto aside-scrollbar">
                {filteredHeadings.map(renderHeading)}
              </ol>
            </nav>
          </div>
        </>
      )}
    </>
  );
};
