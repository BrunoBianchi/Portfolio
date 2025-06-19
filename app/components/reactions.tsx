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
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Reações existentes */}
      <div className="flex items-center gap-1">
        {activeReactions.map(([emoji, reaction]) => (
          <button
            key={emoji}
            onClick={() => handleReaction(emoji as ReactionEmoji)}
            disabled={isLoading}
            className={`
              flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-200
              ${reaction.userReacted 
                ? 'bg-primary/20 text-primary border border-primary/30' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
            `}
            title={`${reaction.count} ${reaction.count === 1 ? 'pessoa reagiu' : 'pessoas reagiram'} com ${emoji}`}
          >
            <span className="text-sm">{emoji}</span>
            <span>{reaction.count}</span>
          </button>
        ))}
      </div>

      {/* Botão para adicionar reação */}
      <div className="relative" ref={pickerRef}>
        <button
          onClick={() => setShowPicker(!showPicker)}
          disabled={isLoading}
          className={`
            flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200
            ${showPicker 
              ? 'bg-primary/20 text-primary' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
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
          <div className="absolute bottom-full left-0 mb-2 p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
            <div className="grid grid-cols-4 gap-1">
              {AVAILABLE_REACTIONS.map(({ emoji, label }) => (
                <button
                  key={emoji}
                  onClick={() => handleReaction(emoji)}
                  disabled={isLoading}
                  className="p-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                  title={label}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contador total (opcional) */}
      {totalReactions > 0 && (
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
          {totalReactions} {totalReactions === 1 ? 'reação' : 'reações'}
        </span>
      )}
    </div>
  );
};
