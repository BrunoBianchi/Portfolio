import { useState } from "react";
import { usePosts } from "~/hooks/usePosts";

// Ícone de busca (pode ser substituído por um da sua biblioteca de ícones)
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

// Ícone de seta para os posts
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-primary"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const filterTags = [
  "Todos",
  "Node.js",
  "React",
  "Frontend",
  "Backend",
  "DevOps",
];

export default function BlogPage() {
  const { posts, loading, error } = usePosts();
  const [visiblePosts, setVisiblePosts] = useState(6); // Controla quantos posts mostrar
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const loadMorePosts = () => {
    setVisiblePosts((prev) => prev + 6);
  };

  // Filtrar posts baseado no filtro ativo e termo de busca
  const filteredPosts = posts.filter(post => {
    const matchesFilter = activeFilter === "Todos" ||
      (post.tags && post.tags.some((tag: string) => tag.toLowerCase().includes(activeFilter.toLowerCase())));

    const matchesSearch = searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Reset visible posts when filter changes
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setVisiblePosts(6);
  };

  return (
    <div className="bg-background text-white py-6 sm:py-10 md:py-16 lg:py-20">
      <div className="w-full">
        <header className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 sm:mb-4 leading-tight">
            Blog de Desenvolvimento
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-2 leading-relaxed font-light">
            Artigos, tutoriais e insights sobre desenvolvimento fullstack,
            tecnologias modernas e melhores práticas.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div className="relative flex-grow w-full max-w-2xl">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Buscar artigos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-card/50 text-white placeholder-gray-400 border border-card/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-card rounded-lg py-3 sm:py-4 pl-12 pr-4 text-sm sm:text-base transition-all duration-300 backdrop-blur-sm"
            />
          </div>
          <div className="text-xs text-gray-500 w-full lg:w-auto text-center lg:text-right">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'artigo' : 'artigos'}
          </div>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6 sm:mb-8">
          {filterTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => handleFilterChange(tag)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-all duration-200 whitespace-nowrap ${
                tag === activeFilter
                  ? "bg-primary text-black"
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-16 sm:py-20 lg:py-24">
            <div className="inline-flex items-center gap-3 text-gray-400">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <p className="text-base sm:text-lg">Carregando posts...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-16 sm:py-20 lg:py-24">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 sm:p-8 max-w-md mx-auto">
              <p className="text-red-400 text-base sm:text-lg">Erro ao carregar posts: {error}</p>
            </div>
          </div>
        )}

        <main className="space-y-4 sm:space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="border border-gray-800 rounded-lg p-6 sm:p-8 max-w-md mx-auto">
                <p className="text-gray-400 text-sm mb-4">
                  {searchTerm || activeFilter !== "Todos"
                    ? "Nenhum post encontrado com os filtros aplicados."
                    : "Nenhum post disponível no momento."
                  }
                </p>
                {(searchTerm || activeFilter !== "Todos") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setActiveFilter("Todos");
                      setVisiblePosts(6);
                    }}
                    className="px-4 py-2 bg-primary text-black font-medium rounded hover:bg-amber-400 transition-colors duration-200 text-sm"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>
            </div>
          ) : (
            filteredPosts.slice(0, visiblePosts).map((post, index) => (
              <a href={post.link} key={post._id} className="block group">
                <article className="border border-gray-800/50 hover:border-gray-700 rounded-lg p-4 sm:p-5 transition-all duration-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex-grow">
                      <h2 className="text-sm sm:text-base font-semibold text-white group-hover:text-primary transition-colors duration-200 leading-tight mb-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-2">{post.description}</p>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <time>{post.date}</time>
                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 mt-2 sm:mt-0 sm:ml-4 transform group-hover:translate-x-1 transition-transform duration-200 self-start sm:self-center">
                      <ArrowRightIcon />
                    </div>
                  </div>
                </article>
              </a>
            ))
          )}
        </main>

        {visiblePosts < filteredPosts.length && (
          <div className="text-center mt-8 sm:mt-12">
            <button
              onClick={loadMorePosts}
              className="bg-primary text-black font-medium py-2.5 px-6 rounded hover:bg-amber-400 transition-colors duration-200 text-sm"
            >
              Carregar mais
            </button>
            <p className="text-xs text-gray-500 mt-2">
              {visiblePosts} de {filteredPosts.length} artigos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
