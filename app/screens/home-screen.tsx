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
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 flex items-center justify-center" aria-label="Apresentação pessoal">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <header className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-4 sm:mb-6">
              Olá, eu sou <br className="hidden sm:block" />
              <span className="text-primary">Bruno Bianchi</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 max-w-lg mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed">
              Desenvolvedor <strong className="text-white">FullStack</strong> focado em criar
              soluções digitais eficientes e escaláveis.
            </p>
            <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start" aria-label="Ações principais">
               <a href="#experience" className="px-6 py-3 sm:px-8 sm:py-4 bg-primary text-black font-bold rounded-lg hover:bg-amber-400 transition-all duration-300 text-center text-sm sm:text-base transform hover:scale-105" aria-label="Ver experiências">
                  Ver Experiências
               </a>
               <a href="mailto:contato@brunobianchi.dev" className="px-6 py-3 sm:px-8 sm:py-4 bg-card text-white font-bold rounded-lg hover:bg-gray-700 transition-all duration-300 text-center text-sm sm:text-base transform hover:scale-105" aria-label="Entrar em contato">
                  Contato
               </a>
            </nav>
          </header>
          <aside className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              <img
                src="/brunobianchi.png"
                alt="Foto de Bruno Bianchi, desenvolvedor FullStack"
                className="rounded-xl w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-cover border-2 border-secondary shadow-2xl transition-transform duration-300 hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none"></div>
            </div>
          </aside>
        </div>
      </section>

      <hr className="max-w-6xl mx-auto border-primary/20" />

      <section id="experience" className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20" aria-labelledby="experience-heading">
         <div className="max-w-6xl mx-auto">
            <h2 id="experience-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 lg:mb-16 text-center lg:text-left">Experiência Profissional</h2>
            <div className="space-y-8 sm:space-y-10 lg:space-y-12 relative">
                <div className="absolute left-4 top-2 h-full w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" aria-hidden="true"></div>

                {experiences.map((exp, index) => (
                  <article key={index} className="md:pl-12 relative bg-card/10 md:bg-transparent p-4 sm:p-6 md:p-0 rounded-xl md:rounded-none border border-card/20 md:border-none hover:bg-card/20 md:hover:bg-transparent transition-all duration-300">
                     <div className="absolute left-2 top-4 w-5 h-5 bg-primary rounded-full border-4 border-background shadow-lg hidden md:block animate-pulse" aria-hidden="true"></div>
                     <time className="text-xs sm:text-sm lg:text-base text-primary font-medium mb-2 block uppercase tracking-wide" dateTime={exp.period}>{exp.period}</time>
                     <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">{exp.role}</h3>
                     <p className="font-semibold text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg">{exp.company}</p>
                     <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-4">{exp.description}</p>
                     <div className="flex flex-wrap gap-2 sm:gap-3" role="list" aria-label="Tecnologias utilizadas">
                       {exp.tags.map((tag) => (
                           <span
                             key={tag}
                             className="px-3 py-1.5 bg-gradient-to-r from-card to-card/80 rounded-full text-xs sm:text-sm text-gray-300 whitespace-nowrap border border-primary/20 hover:border-primary/40 transition-all duration-300"
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

      <hr className="max-w-6xl mx-auto border-primary/20" />

      {/* Contact Section */}
      <section id="contact" className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20" aria-labelledby="contact-heading">
        <div className="max-w-6xl mx-auto text-center">
          <h2 id="contact-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12">Vamos Conversar?</h2>
          <p className="text-gray-300 text-base sm:text-lg lg:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
            Interessado em colaborar ou tem alguma pergunta? Entre em contato comigo!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-2xl mx-auto">
            <a
              href="mailto:contato@brunobianchi.dev"
              className="flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-primary text-black font-bold rounded-lg hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="text-sm sm:text-base">contato@brunobianchi.dev</span>
            </a>

            <a
              href="https://linkedin.com/in/brunobianchi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-card text-white font-bold rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm sm:text-base">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}