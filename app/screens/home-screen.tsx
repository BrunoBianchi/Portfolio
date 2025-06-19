import { usePosts } from "~/hooks/usePosts";

export const meta = () => [
  { title: "Bruno Bianchi - Desenvolvedor FullStack | Home" },
  { name: "description", content: "Página inicial do portfolio de Bruno Bianchi, desenvolvedor FullStack com experiência em React, Node.js, Engenharia de Dados e Machine Learning." }
];

export default function Home() {
  const { posts, loading, error } = usePosts();

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



  return (
    <div className="min-h-screen bg-background text-white font-sans">
      <section className="px-4 sm:px-6 py-16 sm:py-20 md:py-24 flex items-center justify-center" aria-label="Apresentação pessoal">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <header className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Olá, eu sou <br />
              <span className="text-primary">Bruno Bianchi</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-md mx-auto md:mx-0 mb-6 sm:mb-8">
              Desenvolvedor <strong>FullStack</strong> focado em criar
              soluções digitais eficientes e escaláveis.
            </p>
            <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start" aria-label="Ações principais">
               <a href="#projects" className="px-6 py-3 bg-primary text-black font-bold rounded-lg hover:bg-amber-400 transition-colors text-center" aria-label="Ver meus projetos">
                  Ver Projetos
               </a>
               <a href="mailto:bruno@example.com" className="px-6 py-3 bg-card text-white font-bold rounded-lg hover:bg-gray-700 transition-colors text-center" aria-label="Entrar em contato">
                  Contato
               </a>
            </nav>
          </header>
          <aside className="flex justify-center md:justify-end order-first md:order-last">
            <img
              src="/brunobianchi.png"
              alt="Foto de Bruno Bianchi, desenvolvedor FullStack"
              className="rounded-xl w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover border-2 border-secondary shadow-lg"
              loading="eager"
            />
          </aside>
        </div>
      </section>

      <hr className="max-w-6xl mx-auto" />

      <section id="experience" className="px-4 sm:px-6 py-12 sm:py-16" aria-labelledby="experience-heading">
         <div className="max-w-4xl mx-auto">
            <h2 id="experience-heading" className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center sm:text-left">Experiência Profissional</h2>
            <div className="space-y-6 sm:space-y-8 relative">
                <div className="absolute left-3 top-2 h-full w-0.5 bg-card hidden sm:block" aria-hidden="true"></div>

                {experiences.map((exp, index) => (
                  <article key={index} className="sm:pl-10 relative bg-card/20 sm:bg-transparent p-4 sm:p-0 rounded-lg sm:rounded-none">
                     <div className="absolute left-1 top-2 w-4 h-4 bg-primary rounded-full border-4 border-background hidden sm:block" aria-hidden="true"></div>
                     <time className="text-xs sm:text-sm text-gray-400 mb-1 block" dateTime={exp.period}>{exp.period}</time>
                     <h3 className="text-lg sm:text-xl font-semibold text-primary">{exp.role}</h3>
                     <p className="font-medium text-gray-300 mb-2 sm:mb-3 text-sm sm:text-base">{exp.company}</p>
                     <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{exp.description}</p>
                     <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2" role="list" aria-label="Tecnologias utilizadas">
                       {exp.tags.map((tag) => (
                           <span
                             key={tag}
                             className="px-2 py-1 bg-card rounded-md text-xs text-gray-300 whitespace-nowrap"
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
      <section id="blog" className="px-4 sm:px-6 py-12 sm:py-16" aria-labelledby="blog-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="blog-heading" className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center sm:text-left">Posts Recentes</h2>

          {loading && (
            <div className="text-center py-8">
              <p className="text-gray-400">Carregando posts...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-400">Erro ao carregar posts: {error}</p>
            </div>
          )}

          <div className="space-y-6 sm:space-y-8">
            {posts.slice(0, 3).map((post) => ( // Mostra apenas os 3 primeiros
              <article key={post._id} className="group cursor-pointer bg-card/20 p-4 rounded-lg hover:bg-card/30 transition-colors">
                <a href={post.link} className="block">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-3 text-sm sm:text-base leading-relaxed">{post.description}</p>
                  <div className="flex items-center text-xs sm:text-sm text-gray-500 flex-wrap gap-1">
                    <span>{post.date}</span>
                    <span className="mx-1 sm:mx-2">•</span>
                    <span>{post.readingTime}</span>
                  </div>
                </a>
              </article>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <a
              href="https://blog.brunobianchi.dev"
              className="inline-block px-6 py-3 bg-primary text-black font-bold rounded-lg hover:bg-amber-400 transition-colors"
            >
              Ver todos os posts
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}