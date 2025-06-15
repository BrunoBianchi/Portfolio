import { useState } from "react";

export const meta = () => [
  { title: "Bruno Bianchi - Desenvolvedor FullStack | Home" },
  { name: "description", content: "Página inicial do portfolio de Bruno Bianchi, desenvolvedor FullStack com experiência em React, Node.js, Engenharia de Dados e Machine Learning." }
];

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState(null);

  const experiences = [
    {
      company: "UNIFEI - Universidade Federal de Itajubá",
      role: "P&D em Engenharia de Dados",
      period: "10/2024 - Presente",
      description:
        "Engenheiro de dados em projeto de P&D na Vertis, atuando desde a análise de dados de redes móveis até o desenvolvimento de soluções em machine learning para otimizar a performance da rede.",
      tags: ["Engenharia de Dados", "Machine Learning", "Análise de Dados", "Pesquisa & Desenvolvimento", "Otimização de Performance"],
    },
    {
      company: "Asimov Jr.",
      role: "Gerente de Projetos de Ciencia de Dados",
      period: "08/2024 - 01/2025",
      description:
        "Fui responsável por estruturar e liderar uma nova área de Ciência de Dados na empresa, com foco em análise de dados e inteligência artificial.",
      tags: ["Gestão de Projetos", "Liderança", "Ciência de Dados", "Inteligência Artificial", "Análise de Dados"],
    },
    {
      company: "Asimov Jr.",
      role: "Desenvolvedor FullStack",
      period: "11/2023 - 08/2024",
      description:
        "Atuei como desenvolvedor fullstack e gerente no projeto Aperam, focado na análise de dados de processos industriais em uma multinacional, liderando decisões arquiteturais e técnicas. Também contribuí no E-educa, plataforma de aprendizado para instituições de ensino, com foco em escalabilidade e performance.",
      tags: ["Desenvolvimento FullStack", "Gestão de Projetos", "Liderança Técnica", "Arquitetura de Software", "Análise de Dados"],
    },
  ];

  const projects = [
    {
      title: "E-commerce Platform",
      description:
        "Plataforma completa de e-commerce com dashboard administrativo",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      link: "#",
    },
    {
      title: "Task Management App",
      description:
        "Aplicativo de gestão de tarefas com colaboração em tempo real",
      tech: ["Next.js", "Socket.io", "MongoDB", "Tailwind"],
      link: "#",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Dashboard interativo para visualização de dados empresariais",
      tech: ["React", "D3.js", "Express", "Redis"],
      link: "#",
    },
  ];

  const posts = [
    {
      title: "Otimizando Performance em React Applications",
      date: "15 de Janeiro, 2025",
      readTime: "5 min de leitura",
      excerpt:
        "Técnicas avançadas para melhorar a performance de aplicações React em produção.",
    },
    {
      title: "Arquitetura de Microsserviços com Node.js",
      date: "8 de Janeiro, 2025",
      readTime: "8 min de leitura",
      excerpt:
        "Como estruturar e escalar aplicações usando arquitetura de microsserviços.",
    },
    {
      title: "O Futuro do Desenvolvimento Web em 2025",
      date: "2 de Janeiro, 2025",
      readTime: "6 min de leitura",
      excerpt:
        "Tendências e tecnologias que estão moldando o desenvolvimento web moderno.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-white font-sans">
      <section className="px-6 py-24 flex items-center justify-center" aria-label="Apresentação pessoal">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
          <header>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Olá, eu sou <br />
              <span className="text-primary">Bruno Bianchi</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-md mb-8">
              Desenvolvedor <strong>FullStack</strong> focado em criar
              soluções digitais eficientes e escaláveis.
            </p>
            <nav className="flex flex-wrap gap-4" aria-label="Ações principais">
               <a href="#projects" className="px-6 py-2 bg-primary text-black font-bold rounded-lg hover:bg-amber-400 transition-colors" aria-label="Ver meus projetos">
                  Ver Projetos
               </a>
               <a href="mailto:bruno@example.com" className="px-6 py-2 bg-card text-white font-bold rounded-lg hover:bg-gray-700 transition-colors" aria-label="Entrar em contato">
                  Contato
               </a>
            </nav>
          </header>
          <aside className="flex justify-center md:justify-end">
            <img
              src="/brunobianchi.png" 
              alt="Foto de Bruno Bianchi, desenvolvedor FullStack"
              className="rounded-xl w-64 h-64 md:w-80 md:h-80 object-cover border-2 border-secondary shadow-lg"
              loading="eager"
            />
          </aside>
        </div>
      </section>

      <hr className="max-w-6xl mx-auto" />

      <section id="experience" className="px-6 py-5" aria-labelledby="experience-heading">
         <div className="max-w-4xl mx-auto">
            <h2 id="experience-heading" className="text-3xl font-bold mb-12">Experiência Profissional</h2>
            <div className="space-y-8 relative">
                <div className="absolute left-3 top-2 h-full w-0.5 bg-card" aria-hidden="true"></div>
                
                {experiences.map((exp, index) => (
                  <article key={index} className="pl-10 relative">
                     <div className="absolute left-1 top-2 w-4 h-4 bg-primary rounded-full border-4 border-background" aria-hidden="true"></div>
                     <time className="text-sm text-gray-400 mb-1" dateTime={exp.period}>{exp.period}</time>
                     <h3 className="text-xl font-semibold text-primary">{exp.role}</h3>
                     <p className="font-medium text-gray-300 mb-3">{exp.company}</p>
                     <p className="text-gray-400">{exp.description}</p>
                     <div className="mt-3 flex flex-wrap gap-2" role="list" aria-label="Tecnologias utilizadas">
                       {exp.tags.map((tag) => (
                           <span
                             key={tag}
                             className="px-2 py-1 bg-card rounded-md text-xs text-gray-300"
                             role="listitem"
                           >
                             {tag}
                           </span>
                       ))}
                     </div>
                  </article>
                ))}
            </div>
         </div>
      </section>  

      <hr className="max-w-6xl mx-auto" />
      
      {/* Blog Section */}
      <section id="blog" className="px-6 py-5" aria-labelledby="blog-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="blog-heading" className="text-3xl font-bold mb-12">Posts Recentes</h2>
          <div className="space-y-8">
            {posts.map((post, index) => (
              <article key={index} className="group cursor-pointer">
                 <a href={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`} aria-label={`Ler post: ${post.title}`}> 
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="col-span-3">
                            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-200">
                                {post.title}
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">{post.excerpt}</p>
                             <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                                <time dateTime={post.date}>{post.date}</time>
                                <span aria-hidden="true">•</span>
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                        <div className="text-right" aria-hidden="true">
                           <span className="text-primary group-hover:translate-x-2 inline-block transition-transform duration-200 text-2xl">
                              →
                           </span>
                        </div>
                    </div>
                 </a>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <a
              href="/blog"
              className="text-primary inline-flex items-center gap-2 group font-semibold"
              aria-label="Ver todos os posts do blog"
            >
              <span className="hover:underline">Ver todos os posts</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}