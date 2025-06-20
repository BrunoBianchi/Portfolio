import { useState } from "react";
import { FaLinkedin } from "react-icons/fa";

// Ícones do menu hambúrguer
const MenuIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function NavbarComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="text-white border-b border-white/10 px-3 sm:px-6 py-4 relative">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="wave-emoji font-mono text-xl sm:text-2xl font-semibold">
            👋
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center space-x-4 lg:space-x-6">
          <a href="/#about" className="text-xs sm:text-sm hover:text-primary transition-colors duration-200 whitespace-nowrap">
            Sobre
          </a>
          <a href="/#experience" className="text-xs sm:text-sm hover:text-primary transition-colors duration-200 whitespace-nowrap">
            Experiências
          </a>
          <a href="/#projects" className="text-xs sm:text-sm hover:text-primary transition-colors duration-200 whitespace-nowrap">
            Projetos
          </a>
          <a href="/blog" className="text-xs sm:text-sm hover:text-primary transition-colors duration-200 whitespace-nowrap">
            Blog
          </a>
          <a
            href="https://www.linkedin.com/in/bruno-bianchi-65a442268/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs sm:text-sm space-x-1 hover:text-primary transition-colors duration-200 whitespace-nowrap"
          >
            <FaLinkedin className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden lg:inline">LinkedIn</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="sm:hidden p-1 text-gray-300 hover:text-white"
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-background border-b border-white/10 shadow-lg z-50">
          <div className="px-3 py-2 space-y-1">
            <a
              href="/#about"
              className="block py-2 text-sm hover:text-primary transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Sobre
            </a>
            <a
              href="/#experience"
              className="block py-2 text-sm hover:text-primary transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Experiências
            </a>
            <a
              href="/#projects"
              className="block py-2 text-sm hover:text-primary transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Projetos
            </a>
            <a
              href="/blog"
              className="block py-2 text-sm hover:text-primary transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Blog
            </a>
            <a
              href="https://www.linkedin.com/in/bruno-bianchi-65a442268/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center py-2 text-sm space-x-2 hover:text-primary transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              <FaLinkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
