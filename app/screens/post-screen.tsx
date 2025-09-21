// PostScreen.tsx
import { useParams, useLoaderData } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import React, { useState, useEffect, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { usePost } from "../hooks/usePost";
import { CommentsSection } from "../components/comments-section";
import { Roadmap } from "../components/roadmap";
import { Reactions } from "../components/reactions";
import { useReactions } from "../hooks/useReactions";

import { stripMarkdown } from '~/services/stripMarkdownService';

// Define types for the heading data
interface Heading {
    id: string;
    text: string;
    level: number;
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

// Função para remover formatação markdown básica
const cleanMarkdown = (text: string): string => {
    return text
        .replace(/\*\*/g, '') // Remove bold **
        .replace(/\*/g, '')   // Remove italic *
        .replace(/__/g, '')   // Remove bold __
        .replace(/_/g, '');   // Remove italic _
};









// Renderizador de headings com IDs
const HeadingRenderer: React.FC<HeadingRendererProps> = ({ level, children }) => {
    const text = React.Children.toArray(children).map(child => 
        typeof child === 'string' ? child : ''
    ).join('');
    
    const cleanedText = cleanMarkdown(text);
    const id = slugify(cleanedText);
    const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    
    return React.createElement(Tag, { 
        id, 
        className: "scroll-mt-24"
    }, children);
};

// Ícones do post
const ChevronRightIcon = () => (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);
const CalendarIcon = () => (
    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);
const ClockIcon = () => (
    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// Loader para buscar dados do post
export const loader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const response = await fetch(`https://api.brunobianchi.dev/post/${params.id}`);
    
    if (!response.ok) {
      throw new Response("Post não encontrado", { status: 404 });
    }
    
    const post = await response.json();
    
    return {
      post: {
        ...post,
        description: stripMarkdown(post.content).slice(0, 160) + '...',
        url: `https://blog.brunobianchi.dev/post/${post.id}`,
        image: ""
      }
    };
  } catch (error) {
    throw new Response("Post não encontrado", { status: 404 });
  }
};

// Função meta para SEO dinâmico
export const meta: MetaFunction = ({ data }: any) => {
  if (!data?.post) {
    return [
      { title: "Post não encontrado | Bruno Bianchi Blog" },
      { name: "description", content: "Post não encontrado" },
      { name: "robots", content: "noindex, nofollow" },
    ];
  }

  const { post } = data;
  const postTitle = `${post.title} | Bruno Bianchi Blog`;
  
  return [
    { title: postTitle },
    { name: "description", content: post.description },
    { name: "keywords", content: post.tags?.join(', ') || '' },
    { name: "author", content: "Bruno Bianchi" },
    { name: "robots", content: "index, follow" },
    
    // Open Graph
    { property: "og:title", content: postTitle },
    { property: "og:description", content: post.description },
    { property: "og:type", content: "article" },
    { property: "og:url", content: post.url },
    { property: "og:image", content: post.image },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:site_name", content: "Bruno Bianchi Blog" },
    
    // Article específicas
    { property: "article:author", content: "Bruno Bianchi" },
    { property: "article:published_time", content: post.createdAt },
    { property: "article:section", content: "Tecnologia" },
    { property: "article:tag", content: post.tags?.join(', ') || '' },
    
    // Twitter Cards
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: postTitle },
    { name: "twitter:description", content: post.description },
    { name: "twitter:image", content: post.image },
    { name: "twitter:creator", content: "@brunobianchi" },
    
    // Canonical
    { rel: "canonical", href: post.url },
  ];
};

export default function PostScreen() {
    const { id } = useParams();
    const loaderData = useLoaderData<typeof loader>();
    const { post: hookPost, loading, error } = usePost(id as string);

    // Use dados do loader se disponível, senão use o hook
    // Temporariamente forçando o uso do hook para debug
    const post = hookPost || loaderData?.post;

    // Hook para reações do post
    const { reactions, react } = useReactions({
        targetId: id as string,
        targetType: 'post'
    });

    // Debug logs
    console.log('PostScreen Debug:', {
        id,
        loaderData,
        hookPost,
        loading,
        error,
        finalPost: post
    });
    const [headings, setHeadings] = useState<Heading[]>([]);


    // Extrai headings do markdown
    useEffect(() => {
        if (post?.markdownContent) {
            const headingLines = post.markdownContent.match(/^#{1,6}\s.*$/gm) || [];
            const extractedHeadings: Heading[] = headingLines.map((line: string) => {
                const match = line.match(/^(#{1,6})/);
                const level = match ? match[0].length : 1;
                const text = line.replace(/^#{1,6}\s*/, '').trim();
                const cleanedText = cleanMarkdown(text);
                const id = slugify(cleanedText);
                return { id, text: cleanedText, level };
            });
            setHeadings(extractedHeadings);
        }
    }, [post?.markdownContent]);




    if (loading && !loaderData) {
        return (
            <div className="bg-background flex flex-col min-h-screen">
                <main className="flex-grow container mx-auto px-4 text-center py-8 sm:py-16">
                    <div className="animate-pulse h-8 sm:h-10 bg-gray-800 rounded w-3/4 sm:w-1/2 mx-auto"></div>
                </main>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="bg-background flex flex-col min-h-screen">
                <main className="flex-grow container mx-auto px-4 text-center py-8 sm:py-16">
                    <p className="text-gray-400 text-base sm:text-lg">Post não encontrado</p>
                </main>
            </div>
        );
    }

    return (
        <div className="bg-background flex flex-col min-h-screen text-white">
            <main className="flex-grow pt-8 sm:pt-12">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12 relative">
                    <Roadmap headings={headings} />

                    <article className="max-w-5xl mx-auto">
                        {/* Breadcrumb */}
                        <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-12" aria-label="Breadcrumb">
                            <a href="https://blog.brunobianchi.dev/" className="hover:text-primary transition-colors duration-300 whitespace-nowrap font-medium">
                                Blog
                            </a>
                            <ChevronRightIcon />
                            <span className="text-gray-300 truncate font-medium">{cleanMarkdown(post.title)}</span>
                        </nav>

                        {/* Header do Post */}
                        <header className="mb-16 pb-12 border-b border-gray-700/30">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-tight mb-12">
                                {cleanMarkdown(post.title)}
                            </h1>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 mb-12">
                                <div className="flex items-center gap-6">
                                    <img
                                        src="/brunobianchi.png"
                                        alt="Avatar de Bruno Bianchi"
                                        className="w-16 h-16 rounded-full border-2 border-gray-600/50"
                                    />
                                    <div>
                                        <div className="font-medium text-white">Bruno Bianchi</div>
                                        <div className="text-sm text-gray-400 font-light mt-1">Desenvolvedor Full Stack</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8 text-gray-400">
                                    <div className="flex items-center gap-3">
                                        <CalendarIcon />
                                        <span className="font-light">{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <ClockIcon />
                                        <span className="font-light">{post.readingTime} min de leitura</span>
                                    </div>
                                </div>
                            </div>

                            {post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-4">
                                    {post.tags.map((tag: string, index: number) => (
                                        <span
                                            key={index}
                                            className="px-5 py-3 text-sm bg-primary/10 text-primary border border-primary/20 rounded-full font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </header>

                        {/* Reações do Post */}
                        <div className="mb-16 py-8">
                            <Reactions
                                targetId={id as string}
                                targetType="post"
                                reactions={reactions}
                                onReact={react}
                                className="justify-center"
                            />
                        </div>

                        {/* Conteúdo Markdown */}
                        <div className="prose max-w-none prose-headings:scroll-mt-20 mb-16 p-12 lg:p-16">
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: (props) => <HeadingRenderer level={1} {...props} />,
                                    h2: (props) => <HeadingRenderer level={2} {...props} />,
                                    h3: (props) => <HeadingRenderer level={3} {...props} />,
                                    h4: (props) => <HeadingRenderer level={4} {...props} />,
                                    h5: (props) => <HeadingRenderer level={5} {...props} />,
                                    h6: (props) => <HeadingRenderer level={6} {...props} />,
                                }}
                            >
                                {post.markdownContent || post.content || 'Conteúdo não encontrado'}
                            </ReactMarkdown>
                        </div>

                        {/* Seção de Comentários */}
                        <div className="pt-16 mt-20 p-12 lg:p-16">
                            <CommentsSection postId={post.id} />
                        </div>
                    </article>
                </div>
            </main>
        </div>
    );
}