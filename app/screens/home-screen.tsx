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
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 flex items-center justify-center" aria-label="Apresentação pessoal">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          <header className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-3 sm:mb-4">
              Olá, eu sou <br className="hidden sm:block" />
              <span className="text-primary font-semibold">Bruno Bianchi</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-lg mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed font-light">
              Desenvolvedor <span className="text-gray-300 font-normal">FullStack</span> focado em criar
              soluções digitais eficientes e escaláveis.
            </p>
            <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start" aria-label="Ações principais">
               <a href="#experience" className="px-6 py-3 bg-primary text-black font-medium rounded-md hover:bg-amber-400 transition-all duration-200 text-center text-base" aria-label="Ver experiências">
                  Ver Experiências
               </a>
               <a href="mailto:contato@brunobianchi.dev" className="px-6 py-3 border border-gray-600 text-gray-300 font-medium rounded-md hover:border-gray-500 hover:text-white transition-all duration-200 text-center text-base" aria-label="Entrar em contato">
                  Contato
               </a>
            </nav>
          </header>
          <aside className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              <img
                src="/brunobianchi.png"
                alt="Foto de Bruno Bianchi, desenvolvedor FullStack"
                className="rounded-lg w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-cover border border-gray-700 shadow-lg transition-all duration-200 hover:shadow-xl"
                loading="eager"
              />
            </div>
          </aside>
        </div>
      </section>

      <hr className="max-w-6xl mx-auto border-primary/20" />

      <section id="experience" className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16" aria-labelledby="experience-heading">
         <div className="max-w-6xl mx-auto">
            <h2 id="experience-heading" className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6 sm:mb-8 text-center lg:text-left text-gray-200">Experiência Profissional</h2>
            <div className="space-y-6 sm:space-y-8 relative">
                {/* Enhanced Timeline Line with Multiple Layers */}
                <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/60 to-transparent hidden md:block animate-timeline-draw" aria-hidden="true"></div>

                {/* Animated Background Glow with Pulsing Effect */}
                <div className="absolute left-5 top-6 w-2 h-full bg-gradient-to-b from-primary/20 via-primary/10 to-transparent blur-sm rounded-full hidden md:block animate-pulse" aria-hidden="true"></div>

                {/* Additional Glow Layer */}
                <div className="absolute left-5.5 top-6 w-1 h-full bg-gradient-to-b from-primary/30 to-transparent blur-xs rounded-full hidden md:block" aria-hidden="true"></div>



                {experiences.map((exp, index) => (
                  <article
                    key={index}
                    className="md:pl-16 relative group animate-fade-in-up"
                    style={{
                      animationDelay: `${index * 200}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                     {/* Timeline Dot - Only current (first) item pulses */}
                     <div className={`absolute left-4 top-4 w-4 h-4 rounded-full border-4 border-background shadow-lg hidden md:block experience-dot ${index === 0 ? 'bg-gradient-to-r from-primary to-amber-400 animate-glow-pulse' : 'bg-gray-600'}`} aria-hidden="true">
                       {index === 0 && (
                         <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30"></div>
                       )}
                     </div>

                     {/* Simple Experience Card */}
                     <div className="md:pl-0">
                       {/* Period Badge Simple */}
                       <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-2">
                         <time className="text-sm font-medium text-primary" dateTime={exp.period}>{exp.period}</time>
                       </div>

                       {/* Role and Company */}
                       <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">{exp.role}</h3>
                       <p className="font-medium text-gray-400 mb-3 text-base">{exp.company}</p>

                       {/* Description */}
                       <p className="text-gray-500 text-base leading-relaxed mb-3">{exp.description}</p>

                       {/* Simple Tags */}
                       <div className="flex flex-wrap gap-2" role="list" aria-label="Tecnologias utilizadas">
                         {exp.tags.map((tag) => (
                             <span
                               key={tag}
                               className="px-2 py-1 bg-gray-800/50 rounded text-sm text-gray-400 whitespace-nowrap"
                               role="listitem"
                             >
                               {tag}
                             </span>
                         ))}
                       </div>
                     </div>
                  </article>
                ))}
            </div>
         </div>
      </section>

      <hr className="max-w-6xl mx-auto border-primary/20" />

      {/* Contact Section */}
      <section id="contact" className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16" aria-labelledby="contact-heading">
        <div className="max-w-6xl mx-auto text-center">
          <h2 id="contact-heading" className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 text-gray-200">Vamos Conversar?</h2>
          <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed font-light">
            Interessado em colaborar ou tem alguma pergunta? Entre em contato comigo!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
            <a
              href="mailto:contato@brunobianchi.dev"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-medium rounded-md hover:bg-amber-400 transition-all duration-200 w-full sm:w-auto justify-center text-base"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>Email</span>
            </a>

            <a
              href="https://linkedin.com/in/brunobianchi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-gray-600 text-gray-300 font-medium rounded-md hover:border-gray-500 hover:text-white transition-all duration-200 w-full sm:w-auto justify-center text-base"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}