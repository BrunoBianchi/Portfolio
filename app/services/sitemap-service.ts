// services/sitemap-service.ts
export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export interface Post {
  id: string;
  title: string;
  slug?: string;
  createdAt: string;
  updatedAt?: string;
}

export class SitemapService {
  private static readonly SITEMAP_URL = 'https://api.brunobianchi.dev/sitemap';
  
  /**
   * Adiciona um novo post ao sitemap
   */
  static async addPostToSitemap(post: Post): Promise<boolean> {
    try {
      const sitemapEntries = this.generatePostSitemapEntries(post);
      
      const response = await fetch(this.SITEMAP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'add_post',
          entries: sitemapEntries
        })
      });

      if (!response.ok) {
        console.error('Erro ao adicionar post ao sitemap:', response.statusText);
        return false;
      }

      console.log('Post adicionado ao sitemap com sucesso:', post.id);
      return true;
    } catch (error) {
      console.error('Erro ao adicionar post ao sitemap:', error);
      return false;
    }
  }

  /**
   * Remove um post do sitemap
   */
  static async removePostFromSitemap(postId: string): Promise<boolean> {
    try {
      const response = await fetch(this.SITEMAP_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'remove_post',
          postId
        })
      });

      if (!response.ok) {
        console.error('Erro ao remover post do sitemap:', response.statusText);
        return false;
      }

      console.log('Post removido do sitemap com sucesso:', postId);
      return true;
    } catch (error) {
      console.error('Erro ao remover post do sitemap:', error);
      return false;
    }
  }

  /**
   * Atualiza um post existente no sitemap
   */
  static async updatePostInSitemap(post: Post): Promise<boolean> {
    try {
      const sitemapEntries = this.generatePostSitemapEntries(post);
      
      const response = await fetch(this.SITEMAP_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update_post',
          postId: post.id,
          entries: sitemapEntries
        })
      });

      if (!response.ok) {
        console.error('Erro ao atualizar post no sitemap:', response.statusText);
        return false;
      }

      console.log('Post atualizado no sitemap com sucesso:', post.id);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar post no sitemap:', error);
      return false;
    }
  }

  /**
   * Regenera todo o sitemap com todos os posts
   */
  static async regenerateSitemap(): Promise<boolean> {
    try {
      const response = await fetch(this.SITEMAP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'regenerate'
        })
      });

      if (!response.ok) {
        console.error('Erro ao regenerar sitemap:', response.statusText);
        return false;
      }

      console.log('Sitemap regenerado com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao regenerar sitemap:', error);
      return false;
    }
  }

  /**
   * Gera as entradas do sitemap para um post
   */
  private static generatePostSitemapEntries(post: Post): SitemapEntry[] {
    const slug = post.slug || this.generateSlug(post.title);
    const lastmod = post.updatedAt || post.createdAt;
    const formattedDate = new Date(lastmod).toISOString().split('T')[0];

    return [
      // URL do blog principal
      {
        loc: `https://brunobianchi.dev/blog/${post.id}`,
        lastmod: formattedDate,
        changefreq: 'monthly',
        priority: '0.7'
      },
      // URL do subdomínio do blog
      {
        loc: `https://blog.brunobianchi.dev/post/${post.id}`,
        lastmod: formattedDate,
        changefreq: 'monthly',
        priority: '0.8'
      }
    ];
  }

  /**
   * Gera um slug a partir do título
   */
  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
      .replace(/[\s_-]+/g, '-') // Substitui espaços e underscores por hífens
      .replace(/^-+|-+$/g, ''); // Remove hífens do início e fim
  }

  /**
   * Valida se uma URL de post é válida
   */
  static isValidPostUrl(url: string): boolean {
    const blogMainPattern = /^https:\/\/brunobianchi\.dev\/blog\/[a-zA-Z0-9-]+$/;
    const blogSubdomainPattern = /^https:\/\/blog\.brunobianchi\.dev\/post\/[a-zA-Z0-9-]+$/;
    
    return blogMainPattern.test(url) || blogSubdomainPattern.test(url);
  }

  /**
   * Extrai o ID do post de uma URL
   */
  static extractPostIdFromUrl(url: string): string | null {
    const mainMatch = url.match(/https:\/\/brunobianchi\.dev\/blog\/([a-zA-Z0-9-]+)$/);
    const subdomainMatch = url.match(/https:\/\/blog\.brunobianchi\.dev\/post\/([a-zA-Z0-9-]+)$/);
    
    return mainMatch?.[1] || subdomainMatch?.[1] || null;
  }
}