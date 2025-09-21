import { usePosts } from "~/hooks/usePosts";

export const meta = () => [
  { title: "Bruno Bianchi - Desenvolvedor FullStack | Home" },
  {
    name: "description",
    content:
      "Página inicial do portfolio de Bruno Bianchi, desenvolvedor FullStack com experiência em React, Node.js, Engenharia de Dados e Machine Learning.",
  },
];

export default function Home() {
  const { posts, loading, error } = usePosts();

  const experiences = [
    {
      company: "Tech4Humans",
      companyUrl: "https://www.tech4h.com.br",
      location: "São Paulo, SP - Remoto",
      role: "Desenvolvedor Pleno",
      period: "06/2025 - 08/2025",
      description:
        "Desenvolvedor FullStack na Tech4Humans, atuando em projetos para grandes empresas de seguro. Tive a chance de participar no desenvolvimento de novas features para o aplicativo principal, planejando tanto front quanto backend. Durante esse meu tempo na empresa, participei de projetos que incentivavam o desenvolvimento pessoal (soft skills), tais como inteligência emocional e empatia.",
      tags: [
        "FullStack Dev",
        "Soft Skills",
        "Hard Skills",
      ],
    },
    {
      company: "UNIFEI - Universidade Federal de Itajubá",
      companyUrl: "https://unifei.edu.br",
      location: "Itajubá, MG - Presencial",
      role: "P&D em Engenharia de Dados",
      period: "10/2024 - 08/2025",
      description:
        "Engenheiro de dados em projeto de P&D na Vertis, atuando desde a análise de dados de redes móveis até o desenvolvimento de soluções em machine learning para otimizar a performance da rede.",
      tags: [
        "Engenharia de Dados",
        "Machine Learning",
        "Análise de Dados",
        "Pesquisa & Desenvolvimento",
        "Otimização de Performance",
      ],
    },
    {
      company: "Asimov Jr.",
      companyUrl: "https://asimovjr.com",
      location: "Itajubá, MG - Híbrido",
      role: "Gerente de Projetos de Ciencia de Dados",
      period: "08/2024 - 01/2025",
      description:
        "Fui responsável por estruturar e liderar uma nova área de Ciência de Dados na empresa, com foco em análise de dados e inteligência artificial.",
      tags: [
        "Gestão de Projetos",
        "Liderança",
        "Ciência de Dados",
        "Inteligência Artificial",
        "Análise de Dados",
      ],
    },
    {
      company: "Asimov Jr.",
      companyUrl: "https://asimovjr.com",
      location: "Itajubá, MG - Híbrido",
      role: "Desenvolvedor FullStack",
      period: "11/2023 - 08/2024",
      description:
        "Atuei como desenvolvedor fullstack e gerente no projeto Aperam, focado na análise de dados de processos industriais em uma multinacional, liderando decisões arquiteturais e técnicas. Também contribuí no E-educa, plataforma de aprendizado para instituições de ensino, com foco em escalabilidade e performance.",
      tags: [
        "Desenvolvimento FullStack",
        "Gestão de Projetos",
        "Liderança Técnica",
        "Arquitetura de Software",
        "Análise de Dados",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-white font-sans">
      {/* Hero Section */}
      <section
        className="px-6 lg:px-8 py-20 lg:py-28 flex items-center justify-center"
        aria-label="Apresentação pessoal"
      >
        <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <header className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-3xl lg:text-5xl font-light leading-tight mb-6">
              Olá, eu sou<br />
              <span className="text-primary font-medium">Bruno Bianchi</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
              Desenvolvedor FullStack focado em criar soluções digitais eficientes e escaláveis.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-6 mb-10">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Disponível para projetos</span>
              </div>
              <div className="text-sm text-gray-500">Itajubá, MG</div>
            </div>
            <nav
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              aria-label="Ações principais"
            >
              <a
                href="#experience"
                className="btn btn-lg btn-primary"
                aria-label="Ver experiências"
              >
                Ver Experiências
              </a>
              <a
                href="mailto:contato@brunobianchi.dev"
                className="btn btn-lg btn-outline"
                aria-label="Entrar em contato"
              >
                Contato
              </a>
              <a
                href="https://drive.google.com/file/d/1kz2XFUjYYo0B5i_HwVjf2TQ60vWFDS17/view?usp=sharing"
                className="btn btn-lg btn-outline"
                aria-label="Acessar Resumo"
                target="_blank" rel="noopener noreferrer"
              >
                Currículo
              </a>
            </nav>
          </header>
          <aside className="flex justify-center lg:justify-end order-1 lg:order-2">
            <img
              src="/brunobianchi.png"
              alt="Foto de Bruno Bianchi, desenvolvedor FullStack"
              className="rounded-2xl w-56 h-56 lg:w-72 lg:h-72 object-cover"
              loading="eager"
            />
          </aside>
        </div>
      </section>

      <hr className="max-w-5xl mx-auto border-primary/10" />

      {/* About Section */}
      <section
        id="about"
        className="px-6 lg:px-8 py-20 lg:py-28"
        aria-labelledby="about-heading"
      >
        <div className="max-w-5xl mx-auto">
          <h2
            id="about-heading"
            className="text-2xl lg:text-3xl font-light mb-12 text-center text-white"
          >
            Sobre Mim
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-gray-400 leading-relaxed text-lg">
                Desenvolvedor apaixonado por tecnologia e inovação, com experiência sólida em desenvolvimento fullstack e engenharia de dados.
              </p>
              <p className="text-gray-400 leading-relaxed text-lg">
                Atualmente trabalho em projetos de P&D na área de machine learning, sempre buscando soluções eficientes e escaláveis.
              </p>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-white font-medium mb-4 text-lg">
                  Principais Tecnologias
                </h3>
                <div className="grid grid-cols-2 gap-y-3">
                  <span className="text-gray-400">React</span>
                  <span className="text-gray-400">Node.js</span>
                  <span className="text-gray-400">Angular</span>
                  <span className="text-gray-400">PostgreSQL</span>
                  <span className="text-gray-400">Next.js</span>
                  <span className="text-gray-400">TypeScript</span>
                  <span className="text-gray-400">Python</span>
                  <span className="text-gray-400">Machine Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="max-w-5xl mx-auto border-primary/10" />

      {/* Experience Section */}
      <section
        id="experience"
        className="px-6 lg:px-8 py-20 lg:py-28"
        aria-labelledby="experience-heading"
      >
        <div className="max-w-5xl mx-auto">
          <h2
            id="experience-heading"
            className="text-2xl lg:text-3xl font-light mb-12 text-center text-white"
          >
            Experiência Profissional
          </h2>
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <article key={index} className="relative">
                {/* Clean Period Badge */}
                <div className="mb-4">
                  <time
                    className="text-sm text-primary font-medium"
                    dateTime={exp.period}
                  >
                    {exp.period}
                  </time>
                </div>

                {/* Role and Company */}
                <h3 className="text-xl font-medium text-white mb-2">
                  {exp.role}
                </h3>
                <div className="mb-4">
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {exp.company} • {exp.location}
                  </a>
                </div>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs text-gray-400 bg-gray-800/30 rounded-full"
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

      <hr className="max-w-5xl mx-auto border-primary/10" />

      {/* Contact Section */}
      <section
        id="contact"
        className="px-6 lg:px-8 py-16 lg:py-20"
        aria-labelledby="contact-heading"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              id="contact-heading"
              className="text-2xl lg:text-3xl font-light mb-6 text-white"
            >
              Vamos Conversar?
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Interessado em colaborar ou tem alguma pergunta? Estou sempre aberto a novas oportunidades e conversas interessantes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-2">Email</h3>
              <p className="text-gray-400 text-sm">contato@brunobianchi.dev</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-2">LinkedIn</h3>
              <p className="text-gray-400 text-sm">bruno-bianchi-42b342258</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-2">Localização</h3>
              <p className="text-gray-400 text-sm">Itajubá, MG</p>
            </div>
          </div>

          <div className="text-center bg-gray-900/30 rounded-2xl p-6 lg:p-8">
            <h3 className="text-white font-medium mb-3 text-lg">Vamos trabalhar juntos!</h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Seja para projetos freelance, oportunidades de trabalho ou qualquer outra conversa sobre tecnologia, ficarei feliz em conversar com você.
            </p>
            <a
              href="mailto:contato@brunobianchi.dev"
              className="btn btn-lg btn-primary"
            >
              Enviar Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 mt-8">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 Bruno Bianchi. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a
                href="https://github.com/BrunoBianchi"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/bruno-bianchi-42b342258"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}