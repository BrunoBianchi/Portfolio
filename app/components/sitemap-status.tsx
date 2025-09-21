// components/sitemap-status.tsx
import React from 'react';
import { useSitemap } from '~/hooks/useSitemap';

interface SitemapStatusProps {
  className?: string;
}

export function SitemapStatus({ className = '' }: SitemapStatusProps) {
  const { regenerate, isLoading, error, clearError } = useSitemap();

  const handleRegenerate = async () => {
    clearError();
    const success = await regenerate();
    if (success) {
      alert('✅ Sitemap regenerado com sucesso!');
    }
  };

  return (
    <div className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-white mb-2">Status do Sitemap</h3>
          <p className="text-gray-400 text-sm">
            Gerencie o sitemap do blog para melhor indexação pelos motores de busca.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm font-medium">Ativo</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-600/30 rounded-lg">
          <p className="text-red-400 text-sm">❌ {error}</p>
          <button
            onClick={clearError}
            className="text-red-300 hover:text-red-200 text-xs mt-1 underline"
          >
            Limpar erro
          </button>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="text-gray-400 mb-1">URL Principal</div>
            <div className="text-white font-mono text-xs">brunobianchi.dev/blog/*</div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="text-gray-400 mb-1">URL Subdomínio</div>
            <div className="text-white font-mono text-xs">blog.brunobianchi.dev/post/*</div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-700/30">
          <button
            onClick={handleRegenerate}
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-2 bg-primary text-black rounded-lg hover:bg-amber-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                Regenerando...
              </span>
            ) : (
              '🔄 Regenerar Sitemap'
            )}
          </button>
          
          <p className="text-gray-500 text-xs mt-2">
            Use esta opção se houver problemas com a indexação dos posts.
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700/30">
        <h4 className="text-sm font-medium text-white mb-2">Funcionalidades Automáticas</h4>
        <ul className="space-y-1 text-xs text-gray-400">
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            Adição automática ao criar posts
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            URLs duplas (principal + subdomínio)
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            Atualização de datas modificadas
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            Prioridades otimizadas para SEO
          </li>
        </ul>
      </div>
    </div>
  );
}