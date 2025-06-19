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

// Mudança na importação do Helmet
import pkg from 'react-helmet-async';
const { HelmetProvider } = pkg;

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

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Metatags padrão - serão sobrescritas pelo Helmet quando necessário */}
        <meta name="description" content="Bruno Bianchi - Desenvolvedor FullStack especializado em React, Node.js e soluções escaláveis. Experiência em Engenharia de Dados e Machine Learning." />
        <meta name="keywords" content="desenvolvedor fullstack, react, nodejs, engenharia de dados, machine learning, bruno bianchi, portfolio" />
        <meta name="author" content="Bruno Bianchi" />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content="Bruno Bianchi - Desenvolvedor FullStack" />
        <meta property="og:description" content="Desenvolvedor FullStack focado em criar soluções digitais eficientes e escaláveis." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brunobianchi.dev" />
        <meta property="og:image" content="https://brunobianchi.dev/brunobianchi.png" />
        <meta property="og:locale" content="pt_BR" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bruno Bianchi - Desenvolvedor FullStack" />
        <meta name="twitter:description" content="Desenvolvedor FullStack focado em criar soluções digitais eficientes e escaláveis." />
        <meta name="twitter:image" content="https://brunobianchi.dev/brunobianchi.png" />
        
        <link rel="canonical" href="https://brunobianchi.dev" />
        
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
        <HelmetProvider>
          <main className="w-[60%] mx-auto">
            <NavbarComponent />
            {children}
            <FooterComponent />
            <ScrollRestoration />
            <Scripts />
          </main>
        </HelmetProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
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
        <main className="w-[60%] mx-auto">
          <NavbarComponent />
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
              <p className="text-gray-600">Algo deu errado. Tente novamente mais tarde.</p>
            </div>
          </div>
          <FooterComponent />
          <Scripts />
        </main>
      </body>
    </html>
  );
}
