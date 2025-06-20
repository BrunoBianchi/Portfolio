import { useState } from "react";
import { FaLinkedin } from "react-icons/fa";

// Ícones do menu hambúrguer
const MenuIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <nav className="text-white border-b border-gray-800/50 px-4 sm:px-6 py-3 sm:py-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <span className="wave-emoji font-mono text-lg sm:text-xl font-semibold">
            👋
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <a
            href="https://brunobianchi.dev/#sobre"
            className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
          >
            Sobre
          </a>
          <a
            href="https://brunobianchi.dev/#experiencias"
            className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
          >
            Experiências
          </a>
          <a
            href="https://blog.brunobianchi.dev/"
            className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
            rel="noopener noreferrer"
          >
            Blog
          </a>
          <a
            href="https://www.linkedin.com/in/bruno-bianchi-65a442268/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm space-x-1.5 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <FaLinkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={closeMobileMenu}
          />

          {/* Menu Panel */}
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-gray-800/50 shadow-lg z-50">
            <div className="px-4 py-3 space-y-3">
              <a
                href="https://brunobianchi.dev/#sobre"
                className="block py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Sobre
              </a>
              <a
                href="https://brunobianchi.dev/#experiencias"
                className="block py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Experiências
              </a>
              <a
                href="https://blog.brunobianchi.dev/"
                className="block py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
              >
                Blog
              </a>
              <a
                href="https://www.linkedin.com/in/bruno-bianchi-65a442268/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center py-2 text-sm space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                <FaLinkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
