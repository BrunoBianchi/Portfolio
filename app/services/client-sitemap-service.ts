/**
 * Client-side sitemap management utilities
 * Handles local sitemap.xml modifications without server requests
 */

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

class ClientSitemapManager {
  private static instance: ClientSitemapManager;
  
  static getInstance(): ClientSitemapManager {
    if (!ClientSitemapManager.instance) {
      ClientSitemapManager.instance = new ClientSitemapManager();
    }
    return ClientSitemapManager.instance;
  }

  /**
   * Fetches current sitemap.xml content
   */
  async getCurrentSitemap(): Promise<string> {
    try {
      const response = await fetch('/sitemap.xml');
      if (response.ok) {
        return await response.text();
      }
      throw new Error('Failed to fetch sitemap');
    } catch (error) {
      console.error('Error fetching sitemap:', error);
      return this.getDefaultSitemap();
    }
  }

  /**
   * Generates default sitemap structure
   */
  private getDefaultSitemap(): string {
    const currentDate = new Date().toISOString().split('T')[0];
    
    const staticPages: SitemapEntry[] = [
      {
        url: 'https://brunobianchi.dev/',
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 1.0
      },
      {
        url: 'https://brunobianchi.dev/#sobre',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.9
      },
      {
        url: 'https://brunobianchi.dev/#experiencias',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        url: 'https://brunobianchi.dev/servicos',
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        url: 'https://brunobianchi.dev/#contato',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        url: 'https://brunobianchi.dev/blog',
        lastmod: currentDate,
        changefreq: 'daily',
        priority: 0.9
      },
      {
        url: 'https://blog.brunobianchi.dev/',
        lastmod: currentDate,
        changefreq: 'daily',
        priority: 0.8
      }
    ];

    return this.generateSitemapXML(staticPages);
  }

  /**
   * Generates complete sitemap XML with blog posts
   */
  async generateCompleteSitemap(): Promise<string> {
    try {
      // Get static pages
      const currentDate = new Date().toISOString().split('T')[0];
      
      const staticPages: SitemapEntry[] = [
        {
          url: 'https://brunobianchi.dev/',
          lastmod: currentDate,
          changefreq: 'weekly',
          priority: 1.0
        },
        {
          url: 'https://brunobianchi.dev/#sobre',
          lastmod: currentDate,
          changefreq: 'monthly',
          priority: 0.9
        },
        {
          url: 'https://brunobianchi.dev/#experiencias',
          lastmod: currentDate,
          changefreq: 'monthly',
          priority: 0.8
        },
        {
          url: 'https://brunobianchi.dev/servicos',
          lastmod: currentDate,
          changefreq: 'weekly',
          priority: 0.9
        },
        {
          url: 'https://brunobianchi.dev/#contato',
          lastmod: currentDate,
          changefreq: 'monthly',
          priority: 0.7
        },
        {
          url: 'https://brunobianchi.dev/blog',
          lastmod: currentDate,
          changefreq: 'daily',
          priority: 0.9
        },
        {
          url: 'https://blog.brunobianchi.dev/',
          lastmod: currentDate,
          changefreq: 'daily',
          priority: 0.8
        }
      ];

      // Fetch blog posts dynamically
      try {
        const postsResponse = await fetch('https://api.brunobianchi.dev/posts');
        if (postsResponse.ok) {
          const posts = await postsResponse.json();
          
          // Add blog post URLs
          posts.forEach((post: any) => {
            const postDate = new Date(post.createdAt).toISOString().split('T')[0];
            
            // Add both domain versions
            staticPages.push({
              url: `https://brunobianchi.dev/blog/${post.id}`,
              lastmod: postDate,
              changefreq: 'weekly',
              priority: 0.8
            });
            
            staticPages.push({
              url: `https://blog.brunobianchi.dev/post/${post.id}`,
              lastmod: postDate,
              changefreq: 'weekly',
              priority: 0.7
            });
          });
        }
      } catch (error) {
        console.warn('Could not fetch blog posts for sitemap:', error);
      }

      return this.generateSitemapXML(staticPages);
    } catch (error) {
      console.error('Error generating complete sitemap:', error);
      return this.getDefaultSitemap();
    }
  }

  /**
   * Adds a new blog post to the sitemap
   */
  async addPostToSitemap(postId: string, title: string): Promise<string> {
    try {
      const currentSitemap = await this.getCurrentSitemap();
      const currentDate = new Date().toISOString().split('T')[0];
      
      // Parse current sitemap to get existing URLs
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(currentSitemap, 'text/xml');
      const urlElements = xmlDoc.querySelectorAll('url');
      
      const existingUrls = new Set();
      urlElements.forEach(urlElement => {
        const locElement = urlElement.querySelector('loc');
        if (locElement) {
          existingUrls.add(locElement.textContent);
        }
      });

      // Create new blog post entries
      const newPostUrls = [
        `https://brunobianchi.dev/blog/${postId}`,
        `https://blog.brunobianchi.dev/post/${postId}`
      ];

      // Check if URLs already exist
      const urlsToAdd = newPostUrls.filter(url => !existingUrls.has(url));
      
      if (urlsToAdd.length === 0) {
        console.log('Post URLs already exist in sitemap');
        return currentSitemap;
      }

      // Generate new entries XML
      const newEntries = urlsToAdd.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.includes('brunobianchi.dev/blog') ? '0.8' : '0.7'}</priority>
  </url>`).join('');

      // Insert new entries before closing </urlset>
      const updatedSitemap = currentSitemap.replace(
        '</urlset>',
        `${newEntries}
</urlset>`
      );

      return updatedSitemap;
    } catch (error) {
      console.error('Error adding post to sitemap:', error);
      return await this.getCurrentSitemap();
    }
  }

  /**
   * Downloads sitemap as file
   */
  downloadSitemap(content: string, filename: string = 'sitemap.xml'): void {
    try {
      const blob = new Blob([content], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading sitemap:', error);
    }
  }

  /**
   * Copies sitemap content to clipboard
   */
  async copyToClipboard(content: string): Promise<boolean> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(content);
        return true;
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = content;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      return false;
    }
  }

  /**
   * Generates XML sitemap from entries
   */
  private generateSitemapXML(entries: SitemapEntry[]): string {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">';
    
    const urlEntries = entries.map(entry => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('');
    
    const urlsetClose = '\n</urlset>';
    
    return `${xmlHeader}\n${urlsetOpen}${urlEntries}${urlsetClose}`;
  }
}

export default ClientSitemapManager;