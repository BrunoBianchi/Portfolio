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
    <div className="bg-background text-white min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-amber-400/20 rounded-xl flex items-center justify-center border border-primary/20">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            Blog de Desenvolvimento
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Artigos, tutoriais e insights sobre desenvolvimento fullstack,
            tecnologias modernas e melhores práticas.
          </p>
        </header>

        <div className="bg-gray-900/30 border border-gray-800/50 rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative flex-grow w-full max-w-lg">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800/50 text-white placeholder-gray-400 border border-gray-700/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl py-3 pl-12 pr-4 text-base transition-all duration-200"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-400 whitespace-nowrap">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'artigo' : 'artigos'}
              </div>
              {(searchTerm || activeFilter !== "Todos") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveFilter("Todos");
                    setVisiblePosts(6);
                  }}
                  className="text-xs text-primary hover:text-amber-400 transition-colors duration-200 font-medium"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-10">
          {filterTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => handleFilterChange(tag)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap ${
                tag === activeFilter
                  ? "bg-primary text-black shadow-lg shadow-primary/25"
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300 border border-gray-700/50 hover:border-gray-600/50"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 text-gray-400">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              <p className="text-sm">Carregando posts...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-red-400 text-sm">Erro ao carregar posts: {error}</p>
            </div>
          </div>
        )}

        <main className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-900/30 border border-gray-800/50 rounded-2xl p-8 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-base mb-6">
                  {searchTerm || activeFilter !== "Todos"
                    ? "Nenhum post encontrado com os filtros aplicados."
                    : "Nenhum post disponível no momento."
                  }
                </p>
              </div>
            </div>
          ) : (
            filteredPosts.slice(0, visiblePosts).map((post, index) => (
              <a href={post.link} key={post._id} className="block group">
                <article className="bg-gray-900/20 border border-gray-800/30 hover:border-gray-700/50 rounded-2xl p-6 transition-all duration-300 hover:bg-gray-900/40 hover:shadow-lg hover:shadow-black/20">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-grow min-w-0">
                      <h2 className="text-lg font-semibold text-white group-hover:text-primary transition-colors duration-200 leading-tight mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-400 text-base leading-relaxed mb-4 line-clamp-2">{post.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <time>{post.date}</time>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{post.readingTime} min</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-200 mt-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                        <ArrowRightIcon />
                      </div>
                    </div>
                  </div>
                </article>
              </a>
            ))
          )}
        </main>

        {visiblePosts < filteredPosts.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMorePosts}
              className="bg-primary text-black font-semibold py-3 px-8 rounded-xl hover:bg-amber-400 transition-all duration-200 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105"
            >
              Carregar mais artigos
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Mostrando {visiblePosts} de {filteredPosts.length} artigos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
