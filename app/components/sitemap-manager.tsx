import { RefreshCw, Download, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useSitemapManager } from '~/hooks/useSitemapManager';
import { useEffect } from 'react';

interface SitemapManagerProps {
  className?: string;
  showDownloadButton?: boolean;
  autoHideMessages?: number; // milliseconds to auto-hide messages
}

export default function SitemapManager({ 
  className = '', 
  showDownloadButton = true,
  autoHideMessages = 5000 
}: SitemapManagerProps) {
  const { 
    isLoading, 
    error, 
    success, 
    regenerateSitemap, 
    downloadSitemap, 
    clearMessages 
  } = useSitemapManager();

  // Auto-hide messages after specified time
  useEffect(() => {
    if ((error || success) && autoHideMessages > 0) {
      const timer = setTimeout(() => {
        clearMessages();
      }, autoHideMessages);

      return () => clearTimeout(timer);
    }
  }, [error, success, autoHideMessages, clearMessages]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={regenerateSitemap}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-400/50 text-black font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 text-sm"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          {isLoading ? 'Regenerando...' : 'Regenerar Sitemap'}
        </button>

        {showDownloadButton && (
          <button
            onClick={downloadSitemap}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 disabled:bg-white/5 text-white font-semibold py-2.5 px-4 rounded-lg border border-white/20 transition-all duration-200 text-sm"
          >
            <Download className="w-4 h-4" />
            Baixar Atual
          </button>
        )}
      </div>

      {/* Status Messages */}
      {(error || success) && (
        <div className="space-y-2">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-red-400 font-semibold text-sm mb-1">Erro</h4>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
                <button
                  onClick={clearMessages}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-green-400 font-semibold text-sm mb-1">Sucesso</h4>
                  <p className="text-green-300 text-sm">{success}</p>
                </div>
                <button
                  onClick={clearMessages}
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Help Text */}
      <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-4">
        <h4 className="text-white font-semibold text-sm mb-2">Como funciona:</h4>
        <ul className="text-gray-300 text-xs space-y-1">
          <li className="flex items-start gap-2">
            <div className="w-1 h-1 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
            <span><strong>Regenerar:</strong> Cria um novo sitemap com todas as páginas e posts atuais</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1 h-1 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
            <span><strong>Download:</strong> Baixa o arquivo XML para substituir manualmente no servidor</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1 h-1 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
            <span><strong>Auto-copy:</strong> Conteúdo é copiado automaticamente para área de transferência</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1 h-1 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
            <span><strong>Posts novos:</strong> Automaticamente incluídos no sitemap quando criados</span>
          </li>
        </ul>
      </div>
    </div>
  );
}