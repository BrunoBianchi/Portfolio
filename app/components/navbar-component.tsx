import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function NavbarComponent() {
  return (
    <nav className=" text-white border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="wave-emoji font-mono text-2xl font-semibold">
            👋
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="https://brunobianchi.dev/#sobre" className="text-sm hover:underline">
            Sobre 
          </a>
          <a href="https://brunobianchi.dev/#experiencias" className="text-sm hover:underline">
            Experiências
          </a>

            <a href="https://blog.brunobianchi.dev/" className="text-sm hover:underline" rel="noopener noreferrer">
            Blog
            </a>

          <a
            href="https://www.linkedin.com/in/bruno-bianchi-65a442268/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm space-x-1 hover:underline"
          >
            <FaLinkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
