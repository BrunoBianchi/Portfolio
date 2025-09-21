import { useState, useCallback } from 'react';
import ClientSitemapManager from '~/services/client-sitemap-service';

interface UseSitemapManagerReturn {
  isLoading: boolean;
  error: string | null;
  success: string | null;
  regenerateSitemap: () => Promise<void>;
  addPostToSitemap: (postId: string, title: string) => Promise<void>;
  downloadSitemap: () => Promise<void>;
  clearMessages: () => void;
}

export function useSitemapManager(): UseSitemapManagerReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const sitemapManager = ClientSitemapManager.getInstance();

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  const regenerateSitemap = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const newSitemap = await sitemapManager.generateCompleteSitemap();
      
      // Download the regenerated sitemap
      sitemapManager.downloadSitemap(newSitemap, 'sitemap-regenerated.xml');
      
      // Copy to clipboard for easy use
      const copied = await sitemapManager.copyToClipboard(newSitemap);
      
      setSuccess(
        `Sitemap regenerado com sucesso! ${
          copied ? 'Conteúdo copiado para área de transferência.' : ''
        } Arquivo baixado como 'sitemap-regenerated.xml'.`
      );
    } catch (err) {
      setError('Erro ao regenerar sitemap: ' + (err instanceof Error ? err.message : 'Erro desconhecido'));
    } finally {
      setIsLoading(false);
    }
  }, [sitemapManager]);

  const addPostToSitemap = useCallback(async (postId: string, title: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const updatedSitemap = await sitemapManager.addPostToSitemap(postId, title);
      
      // Download the updated sitemap
      sitemapManager.downloadSitemap(updatedSitemap, `sitemap-with-${postId}.xml`);
      
      // Copy to clipboard
      const copied = await sitemapManager.copyToClipboard(updatedSitemap);
      
      setSuccess(
        `Post "${title}" adicionado ao sitemap! ${
          copied ? 'Sitemap atualizado copiado para área de transferência.' : ''
        } Arquivo baixado como 'sitemap-with-${postId}.xml'.`
      );
    } catch (err) {
      setError('Erro ao adicionar post ao sitemap: ' + (err instanceof Error ? err.message : 'Erro desconhecido'));
    } finally {
      setIsLoading(false);
    }
  }, [sitemapManager]);

  const downloadSitemap = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const currentSitemap = await sitemapManager.getCurrentSitemap();
      sitemapManager.downloadSitemap(currentSitemap, 'current-sitemap.xml');
      
      setSuccess('Sitemap atual baixado com sucesso!');
    } catch (err) {
      setError('Erro ao baixar sitemap: ' + (err instanceof Error ? err.message : 'Erro desconhecido'));
    } finally {
      setIsLoading(false);
    }
  }, [sitemapManager]);

  return {
    isLoading,
    error,
    success,
    regenerateSitemap,
    addPostToSitemap,
    downloadSitemap,
    clearMessages
  };
}