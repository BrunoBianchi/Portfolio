import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { usePost } from "../hooks/usePost";


const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 inline text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 inline text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);

let meta = () => [
  { title: "Bruno Bianchi - Desenvolvedor FullStack | Home" },
  { name: "description", content: "Página inicial do portfolio de Bruno Bianchi, desenvolvedor FullStack com experiência em React, Node.js, Engenharia de Dados e Machine Learning." }
];


export default function PostPage() {
  const { id } = useParams();
  const { post, loading, error } = usePost(id as string);

  if (loading) {
    return (
      <div className="bg-background flex flex-col min-h-screen">
        <main className="flex-grow pt-16 sm:pt-20">
          <div className="max-w-4xl mx-auto px-4 text-center py-16">
            <p className="text-gray-400 text-lg">Carregando post...</p>
          </div>
        </main>
      </div>
    );
  }
  meta =()=>[
    { title: `Bruno Bianchi - ${post!.title}` },
    { name: "description", content: post!.content.substring(0, 150) + "..." }
  ]
  if (error || !post) {
    return (
      <div className="bg-background flex flex-col min-h-screen">
        <main className="flex-grow pt-16 sm:pt-20">
          <div className="max-w-4xl mx-auto px-4 text-center py-16">
            <p className="text-red-400 text-lg">
              {error || "Post não encontrado"}
            </p>
            <a href="/blog" className="text-primary hover:underline mt-4 inline-block">
              Voltar ao blog
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background flex flex-col min-h-screen">
      <main className="flex-grow pt-16 sm:pt-20">
        <article className="max-w-4xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
            <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
            <ChevronRightIcon />
            <span className="text-white truncate">{post.title}</span>
          </div>

          <header className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-400">
              <div className="flex items-center">
                <img src="/brunobianchi.png" alt={`Avatar de Bruno Bianchi`} className="w-10 h-10 rounded-full mr-3" />
                <span className="font-semibold text-white">Bruno Bianchi</span>
              </div>
              <span className="text-gray-600 hidden md:inline">•</span>
              <div className="flex items-center">
                <CalendarIcon />
                <span>{post.date}</span>
              </div>
              <span className="text-gray-600 hidden md:inline">•</span>
              <div className="flex items-center">
                <ClockIcon />
                <span>{post.readingTime} minutos de leitura</span>
              </div>
            </div>
            
            {/* Tags do post */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-card rounded-md text-sm text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="prose max-w-none">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
            >
              {post.markdownContent}
            </ReactMarkdown>
          </div>
        </article>
      </main>
    </div>
  );
}
export {meta};