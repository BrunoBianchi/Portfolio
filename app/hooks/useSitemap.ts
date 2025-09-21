// hooks/useSitemap.ts
import { useState } from 'react';
import { SitemapService } from '~/services/sitemap-service';
import type { Post } from '~/services/sitemap-service';

interface UseSitemapReturn {
  isLoading: boolean;
  error: string | null;
  addPost: (post: Post) => Promise<boolean>;
  removePost: (postId: string) => Promise<boolean>;
  updatePost: (post: Post) => Promise<boolean>;
  regenerate: () => Promise<boolean>;
  clearError: () => void;
}

export function useSitemap(): UseSitemapReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const addPost = async (post: Post): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await SitemapService.addPostToSitemap(post);
      
      if (!success) {
        setError('Falha ao adicionar post ao sitemap');
      }
      
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao adicionar post ao sitemap: ${errorMessage}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removePost = async (postId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await SitemapService.removePostFromSitemap(postId);
      
      if (!success) {
        setError('Falha ao remover post do sitemap');
      }
      
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao remover post do sitemap: ${errorMessage}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePost = async (post: Post): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await SitemapService.updatePostInSitemap(post);
      
      if (!success) {
        setError('Falha ao atualizar post no sitemap');
      }
      
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao atualizar post no sitemap: ${errorMessage}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const regenerate = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await SitemapService.regenerateSitemap();
      
      if (!success) {
        setError('Falha ao regenerar sitemap');
      }
      
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao regenerar sitemap: ${errorMessage}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    addPost,
    removePost,
    updatePost,
    regenerate,
    clearError
  };
}