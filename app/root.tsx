import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import NavbarComponent from "./components/navbar-component";
import FooterComponent from "./components/footer-component";
import { AuthProvider } from "./contexts/auth-context";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap",
  },
  { rel: "preload", href: "/brunobianchi.png", as: "image" },
];

// Função meta padrão para a root
export const meta: Route.MetaFunction = () => {
  return [
    { title: "Bruno Bianchi - Desenvolvedor FullStack" },
    { name: "description", content: "Bruno Bianchi - Desenvolvedor FullStack especializado em React, Node.js e soluções escaláveis. Experiência em Engenharia de Dados e Machine Learning." },
    { name: "keywords", content: "desenvolvedor fullstack, react, nodejs, engenharia de dados, machine learning, bruno bianchi, portfolio" },
    { name: "author", content: "Bruno Bianchi" },
    { name: "robots", content: "index, follow" },
    
    // Open Graph
    { property: "og:title", content: "Bruno Bianchi - Desenvolvedor FullStack" },
    { property: "og:description", content: "Desenvolvedor FullStack focado em criar soluções digitais eficientes e escaláveis." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://brunobianchi.dev" },
    { property: "og:image", content: "https://brunobianchi.dev/brunobianchi.png" },
    { property: "og:locale", content: "pt_BR" },
    
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Bruno Bianchi - Desenvolvedor FullStack" },
    { name: "twitter:description", content: "Desenvolvedor FullStack focado em criar soluções digitais eficientes e escaláveis." },
    { name: "twitter:image", content: "https://brunobianchi.dev/brunobianchi.png" },
    
    // Canonical
    { rel: "canonical", href: "https://brunobianchi.dev" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Bruno Bianchi",
              jobTitle: "Desenvolvedor FullStack",
              description: "Desenvolvedor FullStack especializado em React, Node.js e soluções escaláveis",
              url: "https://brunobianchi.dev",
              image: "https://brunobianchi.dev/brunobianchi.png",
              sameAs: [
                "https://linkedin.com/in/brunobianchi",
                "https://github.com/BrunoBianchi"
              ],
              worksFor: {
                "@type": "Organization",
                name: "UNIFEI - Universidade Federal de Itajubá"
              }
            })
          }}
        />
        
        <Meta />
        <Links />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <NavbarComponent />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <FooterComponent />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="pt-br">
      <head>
        <title>Erro | Bruno Bianchi</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <NavbarComponent />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
              <p className="text-gray-600">Algo deu errado. Tente novamente mais tarde.</p>
            </div>
          </main>
          <FooterComponent />
        </div>
        <Scripts />
      </body>
    </html>
  );
}
