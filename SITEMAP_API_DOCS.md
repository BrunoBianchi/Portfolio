# API Sitemap Integration

Este documento descreve como integrar o sistema de sitemap com sua API backend.

## Endpoints Necessários

### POST /sitemap
Adiciona novos posts ao sitemap

**Request Body:**
```json
{
  "action": "add_post",
  "entries": [
    {
      "loc": "https://brunobianchi.dev/blog/post-id",
      "lastmod": "2025-09-21",
      "changefreq": "monthly",
      "priority": "0.7"
    },
    {
      "loc": "https://blog.brunobianchi.dev/post/post-id",
      "lastmod": "2025-09-21", 
      "changefreq": "monthly",
      "priority": "0.8"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Post adicionado ao sitemap com sucesso",
  "updated_urls": 2
}
```

### PUT /sitemap
Atualiza posts existentes no sitemap

**Request Body:**
```json
{
  "action": "update_post",
  "postId": "post-id",
  "entries": [
    {
      "loc": "https://brunobianchi.dev/blog/post-id",
      "lastmod": "2025-09-21",
      "changefreq": "monthly", 
      "priority": "0.7"
    }
  ]
}
```

### DELETE /sitemap
Remove posts do sitemap

**Request Body:**
```json
{
  "action": "remove_post",
  "postId": "post-id"
}
```

### POST /sitemap (regenerate)
Regenera todo o sitemap

**Request Body:**
```json
{
  "action": "regenerate"
}
```

## Implementação Backend (Node.js/Express exemplo)

```javascript
// routes/sitemap.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

// Função para ler sitemap atual
async function readSitemap() {
  try {
    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    const content = await fs.readFile(sitemapPath, 'utf-8');
    return content;
  } catch (error) {
    throw new Error('Erro ao ler sitemap');
  }
}

// Função para escrever sitemap
async function writeSitemap(content) {
  try {
    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    await fs.writeFile(sitemapPath, content, 'utf-8');
  } catch (error) {
    throw new Error('Erro ao escrever sitemap');
  }
}

// Função para adicionar URLs ao sitemap
function addUrlsToSitemap(sitemapContent, entries) {
  const urlEntries = entries.map(entry => `
  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('');

  return sitemapContent.replace('</urlset>', `${urlEntries}\n</urlset>`);
}

// POST /sitemap - Adicionar ou regenerar
router.post('/', async (req, res) => {
  try {
    const { action, entries } = req.body;

    if (action === 'add_post') {
      const sitemapContent = await readSitemap();
      const updatedSitemap = addUrlsToSitemap(sitemapContent, entries);
      await writeSitemap(updatedSitemap);

      res.json({
        success: true,
        message: 'Post adicionado ao sitemap com sucesso',
        updated_urls: entries.length
      });
    } else if (action === 'regenerate') {
      // Regenerar todo o sitemap consultando todos os posts
      const posts = await getAllPosts(); // Implementar esta função
      const newSitemap = generateFullSitemap(posts);
      await writeSitemap(newSitemap);

      res.json({
        success: true,
        message: 'Sitemap regenerado com sucesso'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PUT /sitemap - Atualizar post
router.put('/', async (req, res) => {
  try {
    const { postId, entries } = req.body;
    
    // Remover URLs antigas do post
    let sitemapContent = await readSitemap();
    sitemapContent = removePostFromSitemap(sitemapContent, postId);
    
    // Adicionar URLs atualizadas
    const updatedSitemap = addUrlsToSitemap(sitemapContent, entries);
    await writeSitemap(updatedSitemap);

    res.json({
      success: true,
      message: 'Post atualizado no sitemap com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE /sitemap - Remover post
router.delete('/', async (req, res) => {
  try {
    const { postId } = req.body;
    
    const sitemapContent = await readSitemap();
    const updatedSitemap = removePostFromSitemap(sitemapContent, postId);
    await writeSitemap(updatedSitemap);

    res.json({
      success: true,
      message: 'Post removido do sitemap com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
```

## Como Funciona

1. **Criação de Post**: Quando um post é criado no frontend, automaticamente chama o sitemap service
2. **URLs Duplas**: Cada post gera 2 URLs no sitemap (principal + subdomínio)
3. **Atualização Automática**: O sitemap é atualizado em tempo real
4. **Fallback**: Se falhar, o post ainda é criado (sitemap não bloqueia a criação)
5. **Regeneração**: Opção manual para regenerar todo o sitemap se necessário

## Benefícios SEO

- **Indexação Rápida**: Novos posts são descobertos imediatamente pelos crawlers
- **URLs Múltiplas**: Melhora a presença em diferentes domínios  
- **Datas Precisas**: lastmod ajuda crawlers a priorizar conteúdo atualizado
- **Prioridades**: Posts do blog têm prioridade alta (0.7-0.8)
- **Automação**: Zero intervenção manual necessária