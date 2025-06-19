// services/reactions-service.ts
import type { ReactionSummary, CreateReactionRequest, ReactionResponse, ReactionEmoji } from '~/types/reactions';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export class ReactionsService {
  /**
   * Busca reações para um post ou comentário
   */
  static async getReactions(targetId: string, targetType: 'post' | 'comment'): Promise<ReactionSummary> {
    try {
      const response = await fetch(`${API_BASE_URL}/reactions/${targetType}/${targetId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return {}; // Nenhuma reação encontrada
        }
        throw new Error(`Failed to fetch reactions: ${response.status}`);
      }

      const data = await response.json();
      return data.success ? data.data : {};
    } catch (error) {
      console.error('Error fetching reactions:', error);
      return {};
    }
  }

  /**
   * Adiciona ou remove uma reação
   */
  static async toggleReaction(
    targetId: string, 
    targetType: 'post' | 'comment', 
    emoji: ReactionEmoji
  ): Promise<ReactionSummary> {
    try {
      const token = localStorage.getItem('github_access_token');
      
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/reactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          targetId,
          targetType,
          emoji,
        } as CreateReactionRequest),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication required');
        }
        throw new Error(`Failed to toggle reaction: ${response.status}`);
      }

      const data: ReactionResponse = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to toggle reaction');
      }

      return data.data || {};
    } catch (error) {
      console.error('Error toggling reaction:', error);
      throw error;
    }
  }

  /**
   * Remove uma reação específica
   */
  static async removeReaction(
    targetId: string, 
    targetType: 'post' | 'comment', 
    emoji: ReactionEmoji
  ): Promise<ReactionSummary> {
    try {
      const token = localStorage.getItem('github_access_token');
      
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/reactions/${targetType}/${targetId}/${emoji}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication required');
        }
        throw new Error(`Failed to remove reaction: ${response.status}`);
      }

      const data: ReactionResponse = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to remove reaction');
      }

      return data.data || {};
    } catch (error) {
      console.error('Error removing reaction:', error);
      throw error;
    }
  }
}
