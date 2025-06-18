import { useParams } from "react-router";
import React, { useState, useEffect, type ReactNode } from "react";
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
    activeId?: string;
}

interface HeadingRendererProps {
    level: number;
    children?: ReactNode;
}

// Função para criar um ID a partir do texto do título
const slugify = (text: string): string =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

// COMPONENTE ROADMAP MELHORADO
const Roadmap: React.FC<RoadmapProps> = ({ headings, activeId }) => {
    if (!headings || headings.length === 0) {
        return null;
    }

    // Agrupa headings em uma estrutura hierárquica
    const buildHierarchy = () => {
        const hierarchy: any[] = [];
        const stack: any[] = [];

        headings.forEach(heading => {
            const item = { ...heading, children: [] };

            // Remove items do stack até encontrar um pai adequado
            while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
                stack.pop();
            }

            // Se há um pai no stack, adiciona como filho
            if (stack.length > 0) {
                stack[stack.length - 1].children.push(item);
            } else {
                hierarchy.push(item);
            }

            stack.push(item);
        });

        return hierarchy;
    };

    const renderHeading = (heading: any) => {
        const isActive = activeId === heading.id;
        const hasChildren = heading.children && heading.children.length > 0;
        
        return (
            <li key={heading.id} className="relative">
                <a
                    href={`#${heading.id}`}
                    className={`
                        block py-1 px-2 text-xs rounded transition-all duration-200
                        hover:bg-gray-100 dark:hover:bg-gray-800/30
                        ${isActive 
                            ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800/20 font-medium' 
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }
                    `}
                >
                    <span className="truncate block">{heading.text}</span>
                </a>
                {hasChildren && (
                    <ul className="ml-3 mt-1 border-l border-gray-200 dark:border-gray-800">
                        {heading.children.map((child: any) => renderHeading(child))}
                    </ul>
                )}
            </li>
        );
    };

    const hierarchy = buildHierarchy();

    return (
        <aside className="w-full lg:w-48 xl:w-56 lg:sticky lg:top-24 self-start">
            <nav className="rounded-lg p-3">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Neste artigo
                </h3>
                <ul className="space-y-0.5">
                    {hierarchy.map(heading => renderHeading(heading))}
                </ul>
            </nav>
        </aside>
    );
};

// Renderizador de headings com IDs
const HeadingRenderer: React.FC<HeadingRendererProps> = ({ level, children }) => {
    const text = React.Children.toArray(children).map(child => 
        typeof child === 'string' ? child : ''
    ).join('');
    
    const id = slugify(text);
    const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    
    return React.createElement(Tag, { 
        id, 
        className: "scroll-mt-24" 
    }, children);
};

// Ícones melhorados
const ChevronRightIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const CalendarIcon = () => (
    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const ClockIcon = () => (
    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default function PostScreen() {
    const { id } = useParams();
    const { post, loading } = usePost(id as string);
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeHeadingId, setActiveHeadingId] = useState<string>("");

    // Extrai headings do markdown
    useEffect(() => {
        if (post?.markdownContent) {
            const headingLines = post.markdownContent.match(/^#{1,6}\s.*$/gm) || [];
            const extractedHeadings: Heading[] = headingLines.map(line => {
                const match = line.match(/^(#{1,6})/);
                const level = match ? match[0].length : 1;
                const text = line.replace(/^#{1,6}\s*/, '').trim();
                const id = slugify(text);
                return { id, text, level };
            });
            setHeadings(extractedHeadings);
        }
    }, [post?.markdownContent]);

    // Detecta o heading ativo baseado no scroll
    useEffect(() => {
        const handleScroll = () => {
            const headingElements = headings.map(h => document.getElementById(h.id));
            const scrollPosition = window.scrollY + 100;

            let activeId = "";
            for (let i = headingElements.length - 1; i >= 0; i--) {
                const element = headingElements[i];
                if (element && element.offsetTop <= scrollPosition) {
                    activeId = headings[i].id;
                    break;
                }
            }
            setActiveHeadingId(activeId);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [headings]);

    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-950 flex flex-col min-h-screen">
                <main className="flex-grow pt-16 sm:pt-20">
                    <div className="max-w-6xl mx-auto px-4 text-center py-16">
                        <div className="animate-pulse">
                            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-32 mx-auto"></div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="bg-white dark:bg-gray-950 flex flex-col min-h-screen">
                <main className="flex-grow pt-16 sm:pt-20">
                    <div className="max-w-6xl mx-auto px-4 text-center py-16">
                        <p className="text-gray-600 dark:text-gray-400 text-lg">Post não encontrado</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-950 flex flex-col min-h-screen text-gray-900 dark:text-gray-100">
            <main className="flex-grow pt-16 sm:pt-20">
                <div className="container max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 px-4 py-8">
                    
                    {/* Roadmap Lateral - Menor */}
                    <Roadmap headings={headings} activeId={activeHeadingId} />

                    {/* Conteúdo do Post - Maior */}
                    <article className="w-full lg:max-w-5xl">
                        {/* Breadcrumb */}
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-500 mb-8">
                            <a href="https://blog.brunobianchi.dev/" className="hover:text-primary transition-colors">
                                Blog
                            </a>
                            <ChevronRightIcon />
                            <span className="text-gray-900 dark:text-gray-300 truncate">{post.title}</span>
                        </div>

                        {/* Header do Post */}
                        <header className="mb-12">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-8">
                                {post.title}
                            </h1>
                            
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-gray-600 dark:text-gray-400">
                                <div className="flex items-center">
                                    <img 
                                        src="/brunobianchi.png" 
                                        alt="Avatar de Bruno Bianchi" 
                                        className="w-10 h-10 rounded-full mr-3 ring-2 ring-gray-200 dark:ring-gray-800" 
                                    />
                                    <span className="font-medium text-gray-900 dark:text-gray-200">Bruno Bianchi</span>
                                </div>
                                
                                <div className="flex items-center text-sm">
                                    <CalendarIcon />
                                    <span>{post.date}</span>
                                </div>
                                
                                <div className="flex items-center text-sm">
                                    <ClockIcon />
                                    <span>{post.readingTime} min de leitura</span>
                                </div>
                            </div>

                            {/* Tags */}
                            {post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-6">
                                    {post.tags.map((tag: string, index: number) => (
                                        <span 
                                            key={index} 
                                            className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </header>

                        {/* Conteúdo Markdown */}
                        <div className="prose prose-lg max-w-none">
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                remarkPlugins={[remarkGfm]}
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