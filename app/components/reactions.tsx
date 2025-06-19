// components/reactions.tsx
import React, { useState, useRef, useEffect } from 'react';
import { AVAILABLE_REACTIONS, type ReactionSummary, type ReactionEmoji } from '~/types/reactions';

interface ReactionsProps {
  targetId: string;
  targetType: 'post' | 'comment';
  reactions: ReactionSummary;
  onReact: (emoji: ReactionEmoji) => Promise<void>;
  className?: string;
}

export const Reactions: React.FC<ReactionsProps> = ({
  targetId,
  targetType,
  reactions,
  onReact,
  className = ''
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Fechar picker ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPicker]);

  const handleReaction = async (emoji: ReactionEmoji) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await onReact(emoji);
      setShowPicker(false);
    } catch (error) {
      console.error('Error reacting:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calcular total de reações
  const totalReactions = Object.values(reactions).reduce((sum, reaction) => sum + reaction.count, 0);

  // Obter reações com contagem > 0
  const activeReactions = Object.entries(reactions).filter(([_, reaction]) => reaction.count > 0);

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {/* Reações existentes */}
      <div className="flex flex-wrap items-center gap-1.5">
        {activeReactions.map(([emoji, reaction]) => (
          <button
            key={emoji}
            onClick={() => handleReaction(emoji as ReactionEmoji)}
            disabled={isLoading}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 min-w-0
              ${reaction.userReacted
                ? 'bg-yellow-400/15 text-yellow-400 border border-yellow-400/30 shadow-sm'
                : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50 hover:border-gray-600/50'
              }
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
            `}
            title={`${reaction.count} ${reaction.count === 1 ? 'pessoa reagiu' : 'pessoas reagiram'} com ${emoji}`}
          >
            <span className="text-base leading-none">{emoji}</span>
            <span className="text-xs font-semibold min-w-[1ch]">{reaction.count}</span>
          </button>
        ))}
      </div>

      {/* Botão para adicionar reação */}
      <div className="relative" ref={pickerRef}>
        <button
          onClick={() => setShowPicker(!showPicker)}
          disabled={isLoading}
          className={`
            flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 border
            ${showPicker
              ? 'bg-yellow-400/15 text-yellow-400 border-yellow-400/30 shadow-sm'
              : 'bg-gray-800/30 text-gray-400 border-gray-700/50 hover:bg-gray-700/40 hover:text-gray-300 hover:border-gray-600/50'
            }
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'}
          `}
          title="Adicionar reação"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          )}
        </button>

        {/* Picker de emojis */}
        {showPicker && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 p-3 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl z-50 min-w-max">
            <div className="grid grid-cols-4 gap-2">
              {AVAILABLE_REACTIONS.map(({ emoji, label }) => (
                <button
                  key={emoji}
                  onClick={() => handleReaction(emoji)}
                  disabled={isLoading}
                  className="p-2.5 text-xl hover:bg-gray-800/50 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                  title={label}
                >
                  {emoji}
                </button>
              ))}
            </div>
            {/* Seta do tooltip */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-700/50"></div>
          </div>
        )}
      </div>

      {/* Contador total - mais compacto */}
      {totalReactions > 0 && (
        <span className="text-xs text-gray-500 ml-1 hidden sm:inline">
          {totalReactions} {totalReactions === 1 ? 'reação' : 'reações'}
        </span>
      )}
    </div>
  );
};
