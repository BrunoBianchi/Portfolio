import { ExternalLink, Globe, Code, Database } from "lucide-react";
import type { Route } from "../+types/root";
import SitemapManager from "~/components/sitemap-manager";
import { useAuth } from "~/contexts/auth-context";
import { PostsService } from "~/services/posts-service";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Serviços & Valores - Bruno Bianchi | Desenvolvimento Web, Mobile e IA" },
    { name: "description", content: "Confira meus serviços de desenvolvimento web, mobile, engenharia de dados e IA. Landing pages, e-commerce, apps, dashboards e soluções personalizadas com preços transparentes." },
    { name: "keywords", content: "serviços desenvolvimento web, preços landing page, desenvolvimento mobile, e-commerce, dashboard analytics, chatbot IA, React, Node.js, Bruno Bianchi" },
    { name: "robots", content: "index, follow" },
    
    // Open Graph
    { property: "og:title", content: "Serviços & Valores - Bruno Bianchi | Desenvolvimento Web, Mobile e IA" },
    { property: "og:description", content: "Transformo suas ideias em soluções digitais profissionais. Desenvolvimento web, mobile, engenharia de dados e IA sob medida para seu negócio." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://brunobianchi.dev/servicos" },
    { property: "og:image", content: "https://brunobianchi.dev/brunobianchi.png" },
    
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Serviços & Valores - Bruno Bianchi" },
    { name: "twitter:description", content: "Desenvolvimento web, mobile, engenharia de dados e IA com preços transparentes." },
    { name: "twitter:image", content: "https://brunobianchi.dev/brunobianchi.png" },
    
    // Canonical
    { rel: "canonical", href: "https://brunobianchi.dev/servicos" },
  ];
};

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  price: string;
  deliveryTime: string;
  features: string[];
  demoUrl?: string;
  complexity: 'basic' | 'intermediate' | 'advanced';
}

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  services: ServiceCard[];
}

const services: ServiceCategory[] = [
  {
    id: 'landing-sites',
    title: 'Landing Pages & Sites Institucionais',
    description: 'Sites profissionais para apresentar sua empresa e converter visitantes',
    icon: Globe,
    services: [
      {
        id: 'landing-page',
        title: 'Landing Page Profissional',
        description: 'Página única focada em conversão com design moderno e otimizada para vendas',
        image: '/projects/landing-page.jpg',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
        price: 'A partir de R$ 1.200',
        deliveryTime: '5-10 dias',
        features: [
          'Design responsivo',
          'Otimização SEO completa',
          'Google Analytics integrado',
          'Formulário de contato',
          'Hospedagem inclusa (1 ano)',
          'Certificado SSL',
          'Velocidade otimizada'
        ],
        demoUrl: 'https://demo-landing.brunobianchi.dev',
        complexity: 'basic'
      },
      {
        id: 'site-institucional',
        title: 'Site Institucional Completo',
        description: 'Site corporativo com múltiplas páginas e seções para apresentar sua empresa',
        image: '/projects/institutional.jpg',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
        price: 'A partir de R$ 2.500',
        deliveryTime: '10-15 dias',
        features: [
          'Até 8 páginas (Home, Sobre, Serviços, etc)',
          'Blog integrado',
          'Galeria de imagens',
          'Múltiplos formulários',
          'Painel administrativo básico',
          'SEO avançado',
          'Integração com redes sociais'
        ],
        demoUrl: 'https://demo-institutional.brunobianchi.dev',
        complexity: 'intermediate'
      },
      {
        id: 'portfolio',
        title: 'Portfolio Profissional',
        description: 'Site personalizado para profissionais e criativos mostrarem seus trabalhos',
        image: '/projects/portfolio.jpg',
        technologies: ['React', 'TypeScript', 'Framer Motion', 'Next.js'],
        price: 'A partir de R$ 1.800',
        deliveryTime: '7-12 dias',
        features: [
          'Design único e personalizado',
          'Galeria de projetos interativa',
          'Animações modernas',
          'Currículo integrado',
          'Formulário de contato avançado',
          'Blog pessoal opcional',
          'Otimização de performance'
        ],
        complexity: 'intermediate'
      }
    ]
  },
  {
    id: 'ecommerce',
    title: 'E-commerce & Lojas Virtuais',
    description: 'Soluções completas para vendas online com sistemas de pagamento',
    icon: Code,
    services: [
      {
        id: 'loja-basica',
        title: 'Loja Virtual Básica',
        description: 'E-commerce simples para pequenos negócios com funcionalidades essenciais',
        image: '/projects/basic-store.jpg',
        technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
        price: 'A partir de R$ 3.500',
        deliveryTime: '15-25 dias',
        features: [
          'Catálogo de até 50 produtos',
          'Carrinho de compras',
          'Integração Stripe/PagSeguro',
          'Painel administrativo',
          'Controle de estoque básico',
          'Relatórios de vendas',
          'Suporte por email'
        ],
        demoUrl: 'https://demo-basic-store.brunobianchi.dev',
        complexity: 'intermediate'
      },
      {
        id: 'ecommerce-completo',
        title: 'E-commerce Completo',
        description: 'Loja virtual avançada com todas as funcionalidades para grandes operações',
        image: '/projects/full-ecommerce.jpg',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
        price: 'A partir de R$ 8.000',
        deliveryTime: '30-45 dias',
        features: [
          'Produtos ilimitados',
          'Múltiplos métodos de pagamento',
          'Sistema de cupons e promoções',
          'Gestão de clientes avançada',
          'Relatórios detalhados',
          'Integração com correios',
          'App mobile opcional (+R$ 3.000)',
          'Suporte técnico 3 meses'
        ],
        demoUrl: 'https://demo-full-store.brunobianchi.dev',
        complexity: 'advanced'
      }
    ]
  },
  {
    id: 'sistemas',
    title: 'Sistemas & Aplicações Web',
    description: 'Sistemas personalizados para automatizar processos do seu negócio',
    icon: Database,
    services: [
      {
        id: 'sistema-gestao',
        title: 'Sistema de Gestão (CRM/ERP)',
        description: 'Sistema completo para gerenciar clientes, vendas e processos internos',
        image: '/projects/management-system.jpg',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
        price: 'A partir de R$ 6.000',
        deliveryTime: '25-40 dias',
        features: [
          'Gestão de clientes e leads',
          'Controle financeiro',
          'Relatórios e dashboards',
          'Sistema de usuários e permissões',
          'Backup automático',
          'API para integrações',
          'Treinamento da equipe incluído'
        ],
        complexity: 'advanced'
      },
      {
        id: 'plataforma-cursos',
        title: 'Plataforma de Cursos Online',
        description: 'Sistema completo para venda e gestão de cursos digitais',
        image: '/projects/course-platform.jpg',
        technologies: ['React', 'Node.js', 'MongoDB', 'Cloudinary'],
        price: 'A partir de R$ 5.500',
        deliveryTime: '20-35 dias',
        features: [
          'Upload de vídeos e materiais',
          'Sistema de progresso dos alunos',
          'Certificados automáticos',
          'Pagamentos recorrentes',
          'Área do professor',
          'Fórum de discussões',
          'App mobile básico incluído'
        ],
        complexity: 'advanced'
      },
      {
        id: 'dashboard-analytics',
        title: 'Dashboard & Analytics',
        description: 'Painéis interativos para visualização de dados e métricas do negócio',
        image: '/projects/dashboard.jpg',
        technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
        price: 'A partir de R$ 4.000',
        deliveryTime: '15-25 dias',
        features: [
          'Gráficos interativos personalizados',
          'Filtros dinâmicos',
          'Exportação de relatórios (PDF/Excel)',
          'Atualizações em tempo real',
          'Múltiplas fontes de dados',
          'Alertas automáticos',
          'Versão mobile otimizada'
        ],
        complexity: 'intermediate'
      }
    ]
  }
];

export default function ServicesScreen() {
  // Verificar se é admin para mostrar ferramentas de SEO
  let canManageSitemap = false;
  try {
    const { isAuthenticated } = useAuth();
    canManageSitemap = isAuthenticated && PostsService.canCreatePosts();
  } catch (error) {
    // Se useAuth falhar, continuar sem acesso admin
  }

  return (
    <div className="min-h-screen py-16 lg:py-20">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
          Desenvolvimento <span className="text-amber-400">Web</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Transformo suas ideias em soluções web profissionais e modernas. 
          Sites institucionais, e-commerce, sistemas personalizados e muito mais.
        </p>
      </section>

      {/* Services Categories */}
      <div className="space-y-20">
        {services.map((category) => {
          const IconComponent = category.icon;
          return (
            <section key={category.id} className="space-y-8">
              {/* Category Header */}
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                    <IconComponent className="w-8 h-8 text-amber-400" />
                  </div>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white">
                  {category.title}
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {category.services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 group flex flex-col h-full"
                  >
                    {/* Service Image */}
                    <div className="relative h-48 bg-gradient-to-br from-amber-400/20 to-amber-600/20 flex items-center justify-center flex-shrink-0">
                      <Code className="w-16 h-16 text-amber-400/60" />
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-amber-400 text-black text-xs font-semibold px-2 py-1 rounded-full">
                          {service.complexity === 'basic' ? 'BÁSICO' : service.complexity === 'intermediate' ? 'INTERMEDIÁRIO' : 'AVANÇADO'}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4 flex flex-col flex-grow">
                      {/* Title and Description */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="bg-white/10 text-white text-xs px-2 py-1 rounded-full border border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Price and Delivery */}
                      <div className="flex justify-between items-center py-2 border-y border-white/10">
                        <div>
                          <p className="text-amber-400 font-bold text-lg">
                            {service.price}
                          </p>
                          <p className="text-gray-400 text-xs">
                            Entrega: {service.deliveryTime}
                          </p>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex-grow">
                        <h4 className="text-white font-semibold mb-2 text-sm">
                          O que está incluso:
                        </h4>
                        <ul className="space-y-1">
                          {service.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="text-gray-300 text-xs flex items-center">
                              <div className="w-1 h-1 bg-amber-400 rounded-full mr-2 flex-shrink-0"></div>
                              {feature}
                            </li>
                          ))}
                          {service.features.length > 3 && (
                            <li className="text-amber-400 text-xs">
                              +{service.features.length - 3} outros recursos
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Actions - Always at bottom */}
                      <div className="flex gap-2 pt-4 mt-auto">
                        {service.demoUrl && (
                          <a
                            href={service.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-white/10 hover:bg-white/20 text-white text-center py-2.5 px-4 rounded-lg border border-white/20 transition-all duration-200 text-sm font-medium group"
                          >
                            <div className="flex items-center justify-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              Demo
                            </div>
                          </a>
                        )}
                        <button
                          onClick={() => {
                            // Integração com Google Ads tracking
                            if (typeof window !== 'undefined' && (window as any).gtagSendEvent) {
                              (window as any).gtagSendEvent(`mailto:contato@brunobianchi.dev?subject=Interesse em ${service.title}&body=Olá! Tenho interesse no serviço "${service.title}". Gostaria de mais informações.`);
                            } else {
                              window.location.href = `mailto:contato@brunobianchi.dev?subject=Interesse em ${service.title}&body=Olá! Tenho interesse no serviço "${service.title}". Gostaria de mais informações.`;
                            }
                          }}
                          className="flex-1 bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 text-sm"
                        >
                          Contratar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Por que me contratar Section */}
      <section className="mt-20 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Por que me <span className="text-amber-400">contratar?</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Experiência comprovada com projetos reais no mercado. 
            Confira alguns sites que desenvolvi e estão no ar atualmente.
          </p>
        </div>

        {/* Projetos Reais */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300">
            <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
              <Globe className="w-16 h-16 text-blue-400/60" />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-4 right-4">
                <span className="bg-green-400 text-black text-xs font-semibold px-2 py-1 rounded-full">
                  NO AR
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">EstágioAI</h3>
              <p className="text-gray-300 text-sm mb-4">
                Plataforma de inteligência artificial para estágios e capacitação profissional
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-full">React</span>
                <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-full">Node.js</span>
                <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-full">IA</span>
              </div>
              <a
                href="https://estagioai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Visitar Site
              </a>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300">
            <div className="relative h-48 bg-gradient-to-br from-pink-500/20 to-rose-600/20 flex items-center justify-center">
              <Globe className="w-16 h-16 text-pink-400/60" />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-4 right-4">
                <span className="bg-green-400 text-black text-xs font-semibold px-2 py-1 rounded-full">
                  NO AR
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Dra. Mariana Bianchi</h3>
              <p className="text-gray-300 text-sm mb-4">
                Site profissional para médica especialista com agendamento online
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-full">Next.js</span>
                <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-full">TypeScript</span>
                <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-full">SEO</span>
              </div>
              <a
                href="https://dramarianabianchi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Visitar Site
              </a>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300">
            <div className="relative h-48 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 flex items-center justify-center">
              <Globe className="w-16 h-16 text-emerald-400/60" />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-4 right-4">
                <span className="bg-green-400 text-black text-xs font-semibold px-2 py-1 rounded-full">
                  NO AR
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Arq. Julia Soares</h3>
              <p className="text-gray-300 text-sm mb-4">
                Portfolio profissional para arquiteta com galeria de projetos
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-full">React</span>
                <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-full">Tailwind</span>
                <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-full">Portfolio</span>
              </div>
              <a
                href="https://arquitetajuliasoares.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Visitar Site
              </a>
            </div>
          </div>
        </div>

        {/* Informações Profissionais */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                Experiência & <span className="text-amber-400">Qualidade</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">+3 anos de experiência</h4>
                    <p className="text-gray-300 text-sm">Desenvolvendo soluções web modernas e responsivas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Formação UNIFEI</h4>
                    <p className="text-gray-300 text-sm">Estudante de Engenharia de Computação na UNIFEI</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Tecnologias Modernas</h4>
                    <p className="text-gray-300 text-sm">React, TypeScript, Node.js, Next.js e muito mais</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Projetos no Ar</h4>
                    <p className="text-gray-300 text-sm">Sites funcionais e otimizados sendo utilizados por clientes reais</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Suporte Contínuo</h4>
                    <p className="text-gray-300 text-sm">Manutenção e atualizações incluídas nos primeiros meses</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <h4 className="text-white font-bold text-lg mb-4 text-center">Resultados Comprovados</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-amber-400">15+</div>
                  <div className="text-gray-300 text-sm">Projetos Entregues</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">100%</div>
                  <div className="text-gray-300 text-sm">Clientes Satisfeitos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">3+</div>
                  <div className="text-gray-300 text-sm">Anos Experiência</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">24h</div>
                  <div className="text-gray-300 text-sm">Resposta Média</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Section - SEO Tools */}
      {canManageSitemap && (
        <section className="mt-20 mb-20">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                🔧 Ferramentas <span className="text-amber-400">SEO</span>
              </h2>
              <p className="text-gray-300">
                Gerenciar sitemap e otimizações para mecanismos de busca
              </p>
            </div>
            
            <SitemapManager 
              className="max-w-3xl mx-auto"
              showDownloadButton={true}
              autoHideMessages={5000}
            />
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="mt-20 text-center">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 lg:p-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Projeto Web Personalizado?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Não encontrou exatamente o que precisa? Vamos conversar sobre seu projeto web específico 
            e criar uma solução sob medida para suas necessidades digitais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtagSendEvent) {
                  (window as any).gtagSendEvent('mailto:contato@brunobianchi.dev?subject=Projeto Web Personalizado&body=Olá! Gostaria de discutir um projeto web personalizado.');
                } else {
                  window.location.href = 'mailto:contato@brunobianchi.dev?subject=Projeto Web Personalizado&body=Olá! Gostaria de discutir um projeto web personalizado.';
                }
              }}
              className="bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-8 rounded-lg transition-all duration-200"
            >
              Falar por E-mail
            </button>
            <a
              href="https://wa.me/5535999123456"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-lg border border-white/20 transition-all duration-200"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}