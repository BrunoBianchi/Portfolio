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
    className="h-5 w-5 text-primary"
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
  const [visiblePosts, setVisiblePosts] = useState(6);
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
    <div className="bg-background text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <header className="text-center mb-20">
          <h1 className="text-4xl lg:text-5xl font-light text-white mb-6">
            Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Artigos sobre desenvolvimento, tecnologias modernas e insights práticos
          </p>
        </header>

        <div className="mb-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-8">
            <div className="relative flex-grow max-w-lg">
              <span className="absolute inset-y-0 left-0 flex items-center pl-6">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 border border-gray-700/50 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white/10 rounded-2xl py-5 pl-16 pr-6 text-lg transition-all duration-300 hover:bg-white/8"
              />
            </div>
            <div className="flex items-center gap-6 text-gray-400">
              <span className="text-sm">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'artigo' : 'artigos'}
              </span>
              {(searchTerm || activeFilter !== "Todos") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveFilter("Todos");
                    setVisiblePosts(6);
                  }}
                  className="text-sm text-primary hover:text-amber-400 transition-colors duration-200 font-medium"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {filterTags.map((tag, index) => (
              <button
                key={index}
                onClick={() => handleFilterChange(tag)}
                className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
                  tag === activeFilter
                    ? "bg-primary text-black"
                    : "bg-white/5 backdrop-blur-sm text-gray-300 hover:bg-white/10 hover:text-white border border-gray-700/30 hover:border-gray-600/50"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando posts...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 max-w-md mx-auto">
              <p className="text-red-400">Erro ao carregar posts: {error}</p>
            </div>
          </div>
        )}

        <main>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-white/5 backdrop-blur-sm border border-gray-700/30 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-4">Nenhum artigo encontrado</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                {searchTerm || activeFilter !== "Todos"
                  ? "Tente ajustar os filtros ou buscar por outros termos."
                  : "Novos artigos serão publicados em breve."
                }
              </p>
            </div>
          ) : (
            <div className="grid gap-8">
              {filteredPosts.slice(0, visiblePosts).map((post, index) => (
                <a href={post.link} key={post._id} className="block group">
                  <article className="bg-white/5 backdrop-blur-sm hover:bg-white/10 rounded-3xl p-8 lg:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-black/20 border border-gray-700/20 hover:border-gray-600/30">
                    <div className="flex items-start justify-between gap-8">
                      <div className="flex-grow">
                        <h2 className="text-2xl lg:text-3xl font-light text-white group-hover:text-primary transition-colors duration-300 mb-4 leading-tight">
                          {post.title}
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed mb-6 font-light">{post.description}</p>
                        <div className="flex items-center gap-8 text-gray-400">
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <time className="font-light">{post.date}</time>
                          </div>
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-light">{post.readingTime} min de leitura</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300">
                        <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                          <ArrowRightIcon />
                        </div>
                      </div>
                    </div>
                  </article>
                </a>
              ))}
            </div>
          )}
        </main>

        {visiblePosts < filteredPosts.length && (
          <div className="text-center mt-20">
            <button
              onClick={loadMorePosts}
              className="btn btn-lg btn-outline group"
            >
              <span>Carregar mais artigos</span>
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            <p className="text-gray-500 mt-6 font-light">
              Mostrando {visiblePosts} de {filteredPosts.length} artigos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
