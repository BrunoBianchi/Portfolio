import { useState, useEffect } from 'react';
import { stripMarkdown } from '~/services/stripMarkdownService';
export interface Post {
  _id: string;
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}

export interface PostSummary {
  _id: string;
  id: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  link: string;
  tags: string[];
}

export function usePosts() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        // Detectar se estamos no subdomínio blog
        const isSubdomain = typeof window !== 'undefined' && window.location.hostname.includes('blog.');
        const apiUrl = isSubdomain
          ? 'https://api.brunobianchi.dev/posts'
          : 'https://api.brunobianchi.dev/posts';

        console.log('Fetching from:', apiUrl, 'Subdomain:', isSubdomain);

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          mode: 'cors'
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar posts: ${response.status} - ${response.statusText}`);
        }
        const data: Post[] = await response.json();

        const transformedPosts: PostSummary[] = data.map(post => ({
          _id: post._id,
          id: post.id,
          title: post.title,
          description: stripMarkdown(post.content).slice(0, 150) + '...',
          date: new Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }).format(new Date(post.createdAt)),
          readingTime: `${Math.ceil(post.content.split(' ').length / 200)} min de leitura`,
          link: `/post/${post.id}`,
          tags: post.tags || []
        }));

        setPosts(transformedPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error, refetch: () => window.location.reload() };
}