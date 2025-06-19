// hooks/useReactions.ts
import { useState, useEffect, useCallback } from 'react';
import { ReactionsService } from '~/services/reactions-service';
import type { ReactionSummary, ReactionEmoji } from '~/types/reactions';

interface UseReactionsOptions {
  targetId: string;
  targetType: 'post' | 'comment';
  initialReactions?: ReactionSummary;
}

interface UseReactionsReturn {
  reactions: ReactionSummary;
  loading: boolean;
  error: string | null;
  react: (emoji: ReactionEmoji) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useReactions({ 
  targetId, 
  targetType, 
  initialReactions = {} 
}: UseReactionsOptions): UseReactionsReturn {
  const [reactions, setReactions] = useState<ReactionSummary>(initialReactions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar reações
  const loadReactions = useCallback(async () => {
    if (!targetId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const data = await ReactionsService.getReactions(targetId, targetType);
      setReactions(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load reactions';
      setError(errorMessage);
      console.error('Error loading reactions:', err);
    } finally {
      setLoading(false);
    }
  }, [targetId, targetType]);

  // Reagir com emoji
  const react = useCallback(async (emoji: ReactionEmoji) => {
    if (!targetId) return;
    
    try {
      setError(null);
      
      // Atualização otimista
      setReactions(prev => {
        const current = prev[emoji] || { count: 0, userReacted: false, users: [] };
        const newReactions = { ...prev };
        
        if (current.userReacted) {
          // Remover reação
          newReactions[emoji] = {
            ...current,
            count: Math.max(0, current.count - 1),
            userReacted: false,
            users: current.users.filter(user => user.id !== getCurrentUserId())
          };
          
          // Remover emoji se count for 0
          if (newReactions[emoji].count === 0) {
            delete newReactions[emoji];
          }
        } else {
          // Adicionar reação
          newReactions[emoji] = {
            ...current,
            count: current.count + 1,
            userReacted: true,
            users: [...current.users, getCurrentUser()]
          };
        }
        
        return newReactions;
      });
      
      // Fazer requisição real
      const updatedReactions = await ReactionsService.toggleReaction(targetId, targetType, emoji);
      setReactions(updatedReactions);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to react';
      setError(errorMessage);
      console.error('Error reacting:', err);
      
      // Reverter atualização otimista em caso de erro
      await loadReactions();
    }
  }, [targetId, targetType, loadReactions]);

  // Refresh manual
  const refresh = useCallback(async () => {
    await loadReactions();
  }, [loadReactions]);

  // Carregar reações na inicialização
  useEffect(() => {
    loadReactions();
  }, [loadReactions]);

  return {
    reactions,
    loading,
    error,
    react,
    refresh
  };
}

// Funções auxiliares para obter dados do usuário atual
function getCurrentUserId(): number {
  try {
    const userStr = localStorage.getItem('github_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.id;
    }
  } catch (error) {
    console.error('Error getting current user ID:', error);
  }
  return 0;
}

function getCurrentUser(): { id: number; name: string; avatar_url: string } {
  try {
    const userStr = localStorage.getItem('github_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return {
        id: user.id,
        name: user.name || user.login,
        avatar_url: user.avatar_url
      };
    }
  } catch (error) {
    console.error('Error getting current user:', error);
  }
  
  return {
    id: 0,
    name: 'Usuário Anônimo',
    avatar_url: ''
  };
}
