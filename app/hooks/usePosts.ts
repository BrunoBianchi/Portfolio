import { useState, useEffect } from 'react';

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
}

export function usePosts() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.brunobianchi.dev/posts');
        
        if (!response.ok) {
          throw new Error(`Erro ao buscar posts: ${response.status}`);
        }
        
        const data: Post[] = await response.json();
        
        // Transforma os dados da API para o formato esperado pelo frontend
        const transformedPosts: PostSummary[] = data.map(post => ({
          _id: post._id,
          id: post.id,
          title: post.title,
          description: post.content.slice(0, 150) + '...', // Primeiros 150 caracteres como descrição
          date: new Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }).format(new Date(post.createdAt)),
          readingTime: `${Math.ceil(post.content.split(' ').length / 200)} min de leitura`, // Estimativa de tempo de leitura
          link: `/post/${post.id}`
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