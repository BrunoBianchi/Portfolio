export default function FooterComponent() {
  return (
      <footer className="px-6 py-8 text-white border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
               Feito com <span className="text-red-500">❤</span> usando React.
              </p>
              <a
                href="mailto:contato@brunobianchi.dev"
                className="flex items-center gap-2 text-sm text-primary hover:text-amber-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                contato@brunobianchi.dev
              </a>
            </div>
            <p className="text-sm text-primary">
              © 2025 BrunoBianchi.
            </p>
          </div>
        </div>
      </footer>
  );
}