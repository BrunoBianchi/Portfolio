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
            block w-full text-left py-1.5 px-2 rounded transition-all duration-200 text-xs
            ${isActive
              ? 'text-yellow-400 bg-yellow-400/5 border-l-2 border-yellow-400 font-medium'
              : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/20'
            }
            ${isSubheading ? 'ml-3 py-1 text-[11px]' : ''}
          `}
        >
          <span className="block leading-snug line-clamp-2">
            {heading.text}
          </span>
        </button>
      </li>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed top-24 xl:top-32 left-2 lg:left-4 xl:left-8 w-52 lg:w-56 xl:w-64 z-30 pointer-events-none">
        <div className="pointer-events-auto">
        <nav className="bg-gray-900/20 backdrop-blur-sm rounded-lg p-3 lg:p-4 border border-gray-800/30 shadow-lg max-h-[calc(100vh-8rem)] overflow-hidden">
          <h3 className="text-xs font-medium text-gray-300 mb-2 lg:mb-3 tracking-wide uppercase">
            Neste post
          </h3>
          <ol className="space-y-0.5 text-xs overflow-y-auto aside-scrollbar scroll-smooth max-h-[calc(100vh-12rem)]">
            {filteredHeadings.map(renderHeading)}
          </ol>
        </nav>
        </div>
      </aside>

      {/* Mobile Floating Button */}
      <div className="lg:hidden fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-primary text-black p-2.5 sm:p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-200 flex items-center justify-center"
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
          <div className="lg:hidden fixed bottom-16 sm:bottom-20 right-3 left-3 sm:right-6 sm:left-6 z-50 max-h-[70vh]">
            <nav className="bg-gray-900/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-800/50 shadow-2xl">
              <h3 className="font-medium text-gray-200 text-sm mb-2 sm:mb-3 tracking-wide uppercase">
                Neste post
              </h3>
              <ol className="space-y-0.5 text-sm max-h-[50vh] overflow-y-auto aside-scrollbar">
                {filteredHeadings.map(renderHeading)}
              </ol>
            </nav>
          </div>
        </>
      )}
    </>
  );
};
