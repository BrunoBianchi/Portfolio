import { useState, useEffect } from 'react';
import { type Post } from './usePosts';

export interface PostWithParsedContent {
  _id: string;
  id: string;
  title: string;
  content: string;
  markdownContent: string;
  tags: string[];
  createdAt: string;
  date: string;
  readingTime: string;
}

export function usePost(postId: string) {
  const [post, setPost] = useState<PostWithParsedContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.brunobianchi.dev/post/${postId}`);
        
        if (!response.ok) {
          throw new Error(`Erro ao buscar post: ${response.status}`);
        }
        
        const data: Post = await response.json();
       console.log("Resposta da API /posts:", data);

        const transformedPost: PostWithParsedContent = {
          _id: data._id,
          id: data.id,
          title: data.title,
          content: data.content,
          markdownContent: data.content, 
          tags: data.tags,
          createdAt: data.createdAt,
          date: new Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }).format(new Date(data.createdAt)),
          readingTime: `${Math.ceil(data.content.split(' ').length / 200)}` // Sem "min de leitura" aqui
        };
        
        setPost(transformedPost);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return { post, loading, error, refetch: () => window.location.reload() };
}