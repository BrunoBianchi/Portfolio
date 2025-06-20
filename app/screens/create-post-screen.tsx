// screens/create-post-screen.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '~/contexts/auth-context';
import { PostsService, type CreatePostRequest } from '~/services/posts-service';
import { MarkdownPreview } from '~/components/markdown-preview';

export default function CreatePostScreen() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth();
  
  const [formData, setFormData] = useState<CreatePostRequest>({
    title: '',
    content: '',
    tags: []
  });
  
  const [tagsInput, setTagsInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Verificar autorização
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !PostsService.canCreatePosts()) {
        navigate('/');
        return;
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  // Se não autorizado, não renderizar nada (será redirecionado)
  if (!isAuthenticated || !PostsService.canCreatePosts()) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Título e conteúdo são obrigatórios');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const postData: CreatePostRequest = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        tags: tagsInput.trim() ? tagsInput.split(',').map(tag => tag.trim()).filter(Boolean) : []
      };

      await PostsService.createPost(postData);
      
      setSuccess(true);
      setFormData({ title: '', content: '', tags: [] });
      setTagsInput('');
      
      // Redirecionar após sucesso
      setTimeout(() => {
        navigate('/blog');
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, title: e.target.value }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, content: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Criar Novo Post</h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Olá, {user?.name || user?.login}! Crie um novo post para o blog.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-600 rounded-lg">
            <p className="text-green-400">✅ Post criado com sucesso! Redirecionando...</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-600 rounded-lg">
            <p className="text-red-400">❌ {error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Título *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Digite o título do post..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Tags Input */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
              Tags (separadas por vírgula)
            </label>
            <input
              type="text"
              id="tags"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="react, typescript, tutorial..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              disabled={isSubmitting}
            />
          </div>

          {/* Content Editor with Preview Toggle */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="content" className="block text-sm font-medium text-gray-300">
                Conteúdo (Markdown) *
              </label>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
                disabled={isSubmitting}
              >
                {showPreview ? 'Editar' : 'Preview'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Editor */}
              <div className={showPreview ? 'hidden lg:block' : ''}>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={handleContentChange}
                  placeholder="Digite o conteúdo em Markdown...

Exemplos:
# Título
## Subtítulo
**Negrito** *Itálico*
- Lista
- Item

```javascript
console.log('Código');
```

[Link](https://exemplo.com)"
                  rows={20}
                  className="w-full px-3 sm:px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none font-mono text-xs sm:text-sm leading-relaxed"
                  required
                  disabled={isSubmitting}
                />
                <div className="mt-2 text-xs text-gray-500">
                  Suporte completo para Markdown, incluindo código, tabelas e links.
                </div>
              </div>

              {/* Preview */}
              <div className={`${showPreview ? '' : 'hidden lg:block'} bg-gray-800 border border-gray-600 rounded-lg p-3 sm:p-4 overflow-auto`} style={{ maxHeight: '520px' }}>
                <div className="text-xs text-gray-400 mb-3 border-b border-gray-700 pb-2">
                  Preview em tempo real
                </div>
                <MarkdownPreview content={formData.content} />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={() => navigate('/blog')}
              className="px-4 sm:px-6 py-3 text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
              className="px-4 sm:px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Criando...
                </span>
              ) : (
                'Criar Post'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
