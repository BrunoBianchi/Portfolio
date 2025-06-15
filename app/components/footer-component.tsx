export default function FooterComponent() {
  return (
      <footer className="px-6 py-8 text-white border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
           Feito com <span className="text-red-500">❤</span> usando React.
          </p>
          <p className="text-sm text-primary mt-2 md:mt-0">
            © 2025 BrunoBianchi.
          </p>
        </div>
      </footer>
  );
}