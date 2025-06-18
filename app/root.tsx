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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <Links />
      </head>
      <body>
        <main className="w-[60%] mx-auto">
          <NavbarComponent />
          {children}
          <FooterComponent />
          <ScrollRestoration />
          <Scripts />
        </main>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
