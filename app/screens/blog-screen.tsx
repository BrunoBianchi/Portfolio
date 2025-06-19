import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
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

  const loadMorePosts = () => {
    setVisiblePosts((prev) => prev + 6);
  };

  return (
    <div className="bg-background text-white min-h-screen py-10 md:py-16">
      <div className="w-full max-w-4xl mx-auto px-4">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Blog de Desenvolvimento
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Artigos, tutoriais e insights sobre desenvolvimento fullstack,
            tecnologias modernas e melhores práticas.
          </p>
        </header>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative flex-grow w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Buscar artigos..."
              className="w-full bg-card text-white placeholder-gray-400 border border-transparent focus:border-primary focus:ring-0 rounded-md py-2.5 pl-10 pr-4"
            />
          </div>
          <button className="bg-card text-gray-300 font-medium py-2.5 px-4 rounded-md hover:bg-primary/20 hover:text-primary transition-colors w-full md:w-auto flex-shrink-0">
            Filtrar por Período
          </button>
        </div>

        <div className="flex flex-wrap justify-start gap-2 mb-12">
          {filterTags.map((tag, index) => (
            <button
              key={index}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                tag === "Todos"
                  ? "bg-primary text-background"
                  : "bg-card text-gray-300 hover:bg-primary/20 hover:text-primary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Carregando posts...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-red-400 text-lg">Erro ao carregar posts: {error}</p>
          </div>
        )}

        <main className="space-y-10">
          {posts.slice(0, visiblePosts).map((post, index) => (
            <a href={post.link} key={post._id} className="block group">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mt-2">{post.description}</p>
                  <div className="text-sm text-gray-500 mt-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 mt-4 sm:mt-0 sm:ml-6 transform group-hover:translate-x-2 transition-transform duration-300">
                  <ArrowRightIcon />
                </div>
              </div>
              {index < posts.slice(0, visiblePosts).length - 1 && (
                <hr className="border-t-2 border-primary/10 mt-10" />
              )}
            </a>
          ))}
        </main>

        {visiblePosts < posts.length && (
          <div className="text-center mt-12 md:mt-16">
            <button
              onClick={loadMorePosts}
              className="bg-primary text-background font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Carregar mais
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
