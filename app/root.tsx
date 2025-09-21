import {
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
  { rel: "manifest", href: "/site.webmanifest" },
  { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
  { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
];

// Função meta padrão para a root
export const meta: Route.MetaFunction = () => {
  return [
    { title: "Bruno Bianchi - Desenvolvedor FullStack | React, Node.js, Engenharia de Dados" },
    { name: "description", content: "Bruno Bianchi - Desenvolvedor FullStack especializado em React, Node.js, TypeScript e soluções escaláveis. Experiência em Engenharia de Dados, Machine Learning e desenvolvimento web moderno. Portfolio com projetos inovadores." },
    { name: "keywords", content: "bruno bianchi, desenvolvedor fullstack, react, nodejs, typescript, engenharia de dados, machine learning, portfolio, web developer, frontend, backend, itajubá, unifei, javascript, python" },
    { name: "author", content: "Bruno Bianchi" },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
    { name: "googlebot", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
    { name: "bingbot", content: "index, follow" },
    { name: "theme-color", content: "#f59e0b" },
    { name: "msapplication-TileColor", content: "#f59e0b" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "apple-mobile-web-app-title", content: "Bruno Bianchi" },
    { name: "application-name", content: "Bruno Bianchi Portfolio" },
    { name: "format-detection", content: "telephone=no" },
    { name: "HandheldFriendly", content: "True" },
    { name: "MobileOptimized", content: "320" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0, shrink-to-fit=no" },
    
    // Open Graph
    { property: "og:title", content: "Bruno Bianchi - Desenvolvedor FullStack | React, Node.js, Engenharia de Dados" },
    { property: "og:description", content: "Desenvolvedor FullStack focado em criar soluções digitais eficientes e escaláveis. Especialista em React, Node.js, TypeScript e Engenharia de Dados." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://brunobianchi.dev" },
    { property: "og:image", content: "https://brunobianchi.dev/brunobianchi.png" },
    { property: "og:image:alt", content: "Bruno Bianchi - Desenvolvedor FullStack" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:site_name", content: "Bruno Bianchi Portfolio" },
    
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@brunobianchi" },
    { name: "twitter:creator", content: "@brunobianchi" },
    { name: "twitter:title", content: "Bruno Bianchi - Desenvolvedor FullStack" },
    { name: "twitter:description", content: "Desenvolvedor FullStack especializado em React, Node.js e soluções escaláveis." },
    { name: "twitter:image", content: "https://brunobianchi.dev/brunobianchi.png" },
    { name: "twitter:image:alt", content: "Bruno Bianchi - Desenvolvedor FullStack" },
    
    // LinkedIn
    { property: "article:author", content: "https://www.linkedin.com/in/bruno-bianchi-65a442268/" },
    
    // Canonical
    { rel: "canonical", href: "https://brunobianchi.dev" },
    
    // DNS Prefetch e Preconnect para performance
    { rel: "dns-prefetch", href: "//fonts.googleapis.com" },
    { rel: "dns-prefetch", href: "//api.brunobianchi.dev" },
    { rel: "dns-prefetch", href: "//blog.brunobianchi.dev" },
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
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://brunobianchi.dev/#person",
                  name: "Bruno Bianchi",
                  givenName: "Bruno",
                  familyName: "Bianchi",
                  jobTitle: "Desenvolvedor FullStack",
                  description: "Desenvolvedor FullStack especializado em React, Node.js, TypeScript e soluções escaláveis. Experiência em Engenharia de Dados e Machine Learning.",
                  url: "https://brunobianchi.dev",
                  image: {
                    "@type": "ImageObject",
                    url: "https://brunobianchi.dev/brunobianchi.png",
                    width: 400,
                    height: 400
                  },
                  sameAs: [
                    "https://www.linkedin.com/in/bruno-bianchi-65a442268/",
                    "https://github.com/BrunoBianchi",
                    "https://blog.brunobianchi.dev"
                  ],
                  worksFor: {
                    "@type": "EducationalOrganization",
                    name: "UNIFEI - Universidade Federal de Itajubá",
                    url: "https://unifei.edu.br"
                  },
                  knowsAbout: [
                    "React",
                    "Node.js",
                    "TypeScript",
                    "JavaScript",
                    "Python",
                    "Engenharia de Dados",
                    "Machine Learning",
                    "Web Development",
                    "Frontend Development",
                    "Backend Development"
                  ],
                  alumniOf: {
                    "@type": "EducationalOrganization",
                    name: "UNIFEI - Universidade Federal de Itajubá"
                  },
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Itajubá",
                    addressRegion: "MG",
                    addressCountry: "BR"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://brunobianchi.dev/#website",
                  url: "https://brunobianchi.dev",
                  name: "Bruno Bianchi - Portfolio",
                  description: "Portfolio profissional de Bruno Bianchi, Desenvolvedor FullStack",
                  publisher: {
                    "@id": "https://brunobianchi.dev/#person"
                  },
                  inLanguage: "pt-BR",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://brunobianchi.dev/blog?search={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "WebPage",
                  "@id": "https://brunobianchi.dev/#webpage",
                  url: "https://brunobianchi.dev",
                  name: "Bruno Bianchi - Desenvolvedor FullStack",
                  isPartOf: {
                    "@id": "https://brunobianchi.dev/#website"
                  },
                  about: {
                    "@id": "https://brunobianchi.dev/#person"
                  },
                  description: "Portfolio profissional de Bruno Bianchi, Desenvolvedor FullStack especializado em React, Node.js e soluções escaláveis.",
                  inLanguage: "pt-BR"
                }
              ]
            })
          }}
        />

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11077489768"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-11077489768');
            `
          }}
        />

        <Meta />
        <Links />
      </head>
      <body>
        <AuthProvider>
          <main className="w-[60%] mx-auto">
            <NavbarComponent />
            {children}
            <FooterComponent />
            <ScrollRestoration />
            <Scripts />
          </main>
        </AuthProvider>
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
        <AuthProvider>
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
        </AuthProvider>
      </body>
    </html>
  );
}
