import { useState } from "react";
import { FaLinkedin, FaPlus } from "react-icons/fa";
import { useAuth } from "~/contexts/auth-context";
import { PostsService } from "~/services/posts-service";

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
  const { isAuthenticated } = useAuth();
  const canCreatePosts = isAuthenticated && PostsService.canCreatePosts();

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
          <a href="https://brunobianchi.dev/#about" className="text-xs sm:text-sm hover:underline whitespace-nowrap">
            Sobre
          </a>
          <a href="https://brunobianchi.dev/#experience" className="text-xs sm:text-sm hover:underline whitespace-nowrap">
            Experiências
          </a>
          <a href="https://blog.brunobianchi.dev/" className="text-xs sm:text-sm hover:underline whitespace-nowrap" rel="noopener noreferrer">
            Blog
          </a>
          {canCreatePosts && (
            <a href="/admin/create-post" className="flex items-center text-xs sm:text-sm space-x-1 hover:underline whitespace-nowrap text-primary">
              <FaPlus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden lg:inline">Novo Post</span>
            </a>
          )}
          <a
            href="https://www.linkedin.com/in/bruno-bianchi-65a442268/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs sm:text-sm space-x-1 hover:underline whitespace-nowrap"
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
              href="https://brunobianchi.dev/#about"
              className="block py-2 text-sm hover:text-primary"
              onClick={closeMobileMenu}
            >
              Sobre
            </a>
            <a
              href="https://brunobianchi.dev/#experience"
              className="block py-2 text-sm hover:text-primary"
              onClick={closeMobileMenu}
            >
              Experiências
            </a>
            <a
              href="https://blog.brunobianchi.dev/"
              className="block py-2 text-sm hover:text-primary"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
            >
              Blog
            </a>
            {canCreatePosts && (
              <a
                href="/admin/create-post"
                className="flex items-center py-2 text-sm space-x-2 hover:text-primary text-primary"
                onClick={closeMobileMenu}
              >
                <FaPlus className="w-4 h-4" />
                <span>Novo Post</span>
              </a>
            )}
            <a
              href="https://www.linkedin.com/in/bruno-bianchi-65a442268/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center py-2 text-sm space-x-2 hover:text-primary"
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
