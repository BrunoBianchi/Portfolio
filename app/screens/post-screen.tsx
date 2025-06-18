import { useParams } from "react-router";
import React, { useState, useEffect, type ReactNode } from "react"; // Importe useState e useEffect
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { usePost } from "../hooks/usePost";

// Define types for the heading data
interface Heading {
    id: string;
    text: string;
    level: number;
}

interface RoadmapProps {
    headings: Heading[];
}

interface HeadingRendererProps {
    level: number;
    children?: ReactNode;
}

// --- NOVA FUNÇÃO AUXILIAR ---
// Função para criar um ID a partir do texto do título
const slugify = (text: string): string =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Substitui espaços por -
    .replace(/[^\w\-]+/g, '')   // Remove caracteres especiais
    .replace(/\-\-+/g, '-');      // Remove hífens duplicados

// --- NOVO COMPONENTE: ROADMAP ---
const Roadmap: React.FC<RoadmapProps> = ({ headings }) => {
    if (!headings || headings.length === 0) {
        return null;
    }

    // Para habilitar a rolagem suave com CSS
    // Adicione isso ao seu arquivo CSS global:
    // html { scroll-behavior: smooth; }
    // Ou use um estilo inline no componente principal se preferir.

    return (
        <aside className="w-full lg:w-64 xl:w-72 lg:sticky lg:top-24 self-start">
            <nav>
                <h3 className="text-lg font-semibold text-white mb-4">Navegação</h3>
                <ul className="space-y-2">
                    {headings.map((heading: Heading) => (
                        <li key={heading.id}>
                            <a
                                href={`#${heading.id}`}
                                className="text-gray-400 hover:text-primary transition-colors"
                                // Adiciona indentação baseada no nível do título (h2, h3, etc.)
                                style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
                            >
                                {heading.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

// NOVO RENDERIZADOR para adicionar IDs aos títulos
const HeadingRenderer: React.FC<HeadingRendererProps> = ({ level, children }) => {
    const text = React.Children.toArray(children).map(child => 
        typeof child === 'string' ? child : ''
    ).join('');
    
    const id = slugify(text);
    const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    
    // Adiciona um pouco de margem acima dos títulos para que a rolagem não os esconda atrás do header
    return React.createElement(Tag, { id, className: "scroll-mt-24" }, children);
};

// Declare missing icons (add these to your icon imports or define them)
const ChevronRightIcon = () => <span>›</span>;
const CalendarIcon = () => <span>📅</span>;
const ClockIcon = () => <span>🕒</span>;

export default function PostScreen() {
    const { id } = useParams();
    const { post, loading } = usePost(id as string);
    // NOVO ESTADO para armazenar os títulos extraídos
    const [headings, setHeadings] = useState<Heading[]>([]);

    // NOVO EFEITO para extrair títulos do markdown quando o post for carregado
    useEffect(() => {
        if (post?.markdownContent) {
            // Usa regex para encontrar todas as linhas que começam com #, ##, etc.
            const headingLines = post.markdownContent.match(/^#+\s.*$/gm) || [];
            const extractedHeadings: Heading[] = headingLines.map(line => {
                const match = line.match(/^#+/);
                const level = match ? match[0].length : 1;
                const text = line.replace(/^#+\s*/, '').trim();
                const id = slugify(text);
                return { id, text, level };
            });
            setHeadings(extractedHeadings);
        }
    }, [post?.markdownContent]); // Roda sempre que o conteúdo do post mudar

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

    if (!post) {
        return (
            <div className="bg-background flex flex-col min-h-screen">
                <main className="flex-grow pt-16 sm:pt-20">
                    <div className="max-w-4xl mx-auto px-4 text-center py-16">
                        <p className="text-gray-400 text-lg">Post não encontrado</p>
                    </div>
                </main>
            </div>
        );
    }


    return (
        <div className="bg-background flex flex-col min-h-screen">
            {/* Adiciona um estilo para rolagem suave */}
            <style>{`html { scroll-behavior: smooth; }`}</style>
            
            <main className="flex-grow pt-16 sm:pt-20">
                {/* MUDANÇA NO LAYOUT: Container flex para o roadmap e o artigo */}
                <div className="container mx-auto flex flex-col lg:flex-row gap-12 px-4">
                    
                    {/* Coluna Esquerda: Roadmap */}
                    <Roadmap headings={headings} />

                    {/* Coluna Direita: Conteúdo do Post */}
                    <article className="w-full lg:max-w-4xl">
                        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
                            <a href="https://blog.brunobianchi.dev/" className="hover:text-primary transition-colors">Blog</a>
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

                            {post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {post.tags.map((tag: string, index: number) => (
                                        <span key={index} className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full">
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
                                // ATUALIZADO: Adiciona a prop 'components' para customizar a renderização
                                components={{
                                    h1: (props: any) => <HeadingRenderer level={1} {...props} />,
                                    h2: (props: any) => <HeadingRenderer level={2} {...props} />,
                                    h3: (props: any) => <HeadingRenderer level={3} {...props} />,
                                    h4: (props: any) => <HeadingRenderer level={4} {...props} />,
                                    h5: (props: any) => <HeadingRenderer level={5} {...props} />,
                                    h6: (props: any) => <HeadingRenderer level={6} {...props} />,
                                }}
                            >
                                {post.markdownContent}
                            </ReactMarkdown>
                        </div>
                    </article>
                </div>
            </main>
        </div>
    );
}

export const meta = () => [
    { title: "Bruno Bianchi - Blog Post" },
    { name: "description", content: "Blog post content" }
];