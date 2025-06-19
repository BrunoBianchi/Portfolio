// hooks/useComments.ts
import { useState, useEffect, useCallback } from 'react';
import type { Comment, CreateCommentRequest, CommentsResponse } from '~/types';
import { CommentsService } from '~/services/comments-service';

interface UseCommentsOptions {
  postId: string;
  initialPage?: number;
  limit?: number;
}

interface UseCommentsReturn {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  total: number;
  currentPage: number;
  createComment: (content: string, parentId?: string) => Promise<void>;
  updateComment: (commentId: string, content: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useComments({ 
  postId, 
  initialPage = 1, 
  limit = 20 
}: UseCommentsOptions): UseCommentsReturn {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Carrega comentários
  const loadComments = useCallback(async (page: number, append = false) => {
    try {
      setLoading(true);
      setError(null);

      const response: CommentsResponse = await CommentsService.getComments(postId, page, limit);
      
      setComments(prev => append ? [...prev, ...response.comments] : response.comments);
      setTotal(response.total);
      setCurrentPage(response.page);
      setHasMore(response.comments.length === limit && response.comments.length < response.total);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load comments';
      setError(errorMessage);
      console.error('Error loading comments:', err);
    } finally {
      setLoading(false);
    }
  }, [postId, limit]);

  // Carrega comentários iniciais
  useEffect(() => {
    if (postId) {
      loadComments(initialPage);
    }
  }, [postId, initialPage, loadComments]);

  // Cria novo comentário
  const createComment = useCallback(async (content: string, parentId?: string) => {
    try {
      setError(null);
      
      const commentData: CreateCommentRequest = {
        postId,
        content,
        parentId,
      };

      const newComment = await CommentsService.createComment(commentData);
      
      if (parentId) {
        // Se é uma resposta, adiciona à lista de replies do comentário pai
        setComments(prev => prev.map(comment => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newComment],
            };
          }
          return comment;
        }));
      } else {
        // Se é um comentário principal, adiciona no início da lista
        setComments(prev => [newComment, ...prev]);
        setTotal(prev => prev + 1);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create comment';
      setError(errorMessage);
      throw err;
    }
  }, [postId]);

  // Atualiza comentário
  const updateComment = useCallback(async (commentId: string, content: string) => {
    try {
      setError(null);
      
      const updatedComment = await CommentsService.updateComment(commentId, content);
      
      setComments(prev => prev.map(comment => {
        if (comment.id === commentId) {
          return updatedComment;
        }
        // Verificar se é uma resposta
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => 
              reply.id === commentId ? updatedComment : reply
            ),
          };
        }
        return comment;
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update comment';
      setError(errorMessage);
      throw err;
    }
  }, []);

  // Deleta comentário
  const deleteComment = useCallback(async (commentId: string) => {
    try {
      setError(null);
      
      await CommentsService.deleteComment(commentId);
      
      setComments(prev => {
        // Remover comentário principal
        const filtered = prev.filter(comment => comment.id !== commentId);
        
        // Remover das respostas se necessário
        return filtered.map(comment => ({
          ...comment,
          replies: comment.replies?.filter(reply => reply.id !== commentId) || [],
        }));
      });
      
      setTotal(prev => prev - 1);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete comment';
      setError(errorMessage);
      throw err;
    }
  }, []);

  // Carrega mais comentários
  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    
    await loadComments(currentPage + 1, true);
  }, [hasMore, loading, currentPage, loadComments]);

  // Recarrega comentários
  const refresh = useCallback(async () => {
    setCurrentPage(initialPage);
    await loadComments(initialPage);
  }, [initialPage, loadComments]);

  return {
    comments,
    loading,
    error,
    hasMore,
    total,
    currentPage,
    createComment,
    updateComment,
    deleteComment,
    loadMore,
    refresh,
  };
}
