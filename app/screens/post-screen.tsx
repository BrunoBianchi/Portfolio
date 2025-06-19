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
            <div className="bg-white dark:bg-background flex flex-col min-h-screen">
                <main className="flex-grow container mx-auto px-4 text-center py-16">
                    <div className="animate-pulse h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mx-auto"></div>
                </main>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="bg-white dark:bg-background flex flex-col min-h-screen">
                <main className="flex-grow container mx-auto px-4 text-center py-16">
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Post não encontrado</p>
                </main>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-background flex flex-col min-h-screen text-gray-900 dark:text-gray-100">
            <main className="flex-grow pt-2 sm:pt-4 md:pt-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 relative">
                    <Roadmap headings={headings} />
                    
                    <article>
                        {/* Breadcrumb */}
                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">
                            <a href="https://blog.brunobianchi.dev/" className="hover:text-primary transition-colors whitespace-nowrap">
                                Blog
                            </a>
                            <ChevronRightIcon />
                            <span className="text-gray-700 dark:text-gray-300 truncate">{cleanMarkdown(post.title)}</span>
                        </div>

                        {/* Header do Post */}
                        <header className="mb-12">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                                {cleanMarkdown(post.title)}
                            </h1>
                            
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-600 dark:text-gray-400 text-sm">
                                <div className="flex items-center">
                                    <img 
                                        src="/brunobianchi.png" 
                                        alt="Avatar de Bruno Bianchi" 
                                        className="w-8 h-8 rounded-full mr-2" 
                                    />
                                    <span className="font-medium text-gray-800 dark:text-gray-200">Bruno Bianchi</span>
                                </div>
                                <span className="hidden sm:inline text-gray-400 dark:text-gray-600">•</span>
                                <div className="flex items-center">
                                    <CalendarIcon />
                                    <span>{post.date}</span>
                                </div>
                                <span className="hidden sm:inline text-gray-400 dark:text-gray-600">•</span>
                                <div className="flex items-center">
                                    <ClockIcon />
                                    <span>{post.readingTime} min de leitura</span>
                                </div>
                            </div>

                            {post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {post.tags.map((tag: string, index: number) => (
                                        <span 
                                            key={index} 
                                            className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </header>

                        <hr className="border-gray-200 dark:border-gray-800 mb-8" />

                        {/* Reações do Post */}
                        <div className="mb-8">
                            <Reactions
                                targetId={id as string}
                                targetType="post"
                                reactions={reactions}
                                onReact={react}
                                className="justify-center sm:justify-start"
                            />
                        </div>

                        {/* Conteúdo Markdown */}
                        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none dark:prose-invert prose-headings:scroll-mt-20">
                            {/* Debug: Mostrar conteúdo bruto */}

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
                        <CommentsSection postId={post.id} />
                    </article>
                </div>
            </main>
        </div>
    );
}