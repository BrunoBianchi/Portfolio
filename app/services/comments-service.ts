// services/comments-service.ts
import type { Comment, CreateCommentRequest, CommentsResponse, ApiResponse } from '~/types';
import { AuthService } from './auth-service';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export class CommentsService {
  /**
   * Busca comentários de um post
   */
  static async getComments(postId: string, page = 1, limit = 20): Promise<CommentsResponse> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch comments: ${response.statusText}`);
      }

      const data: ApiResponse<CommentsResponse> = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch comments');
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }

  /**
   * Cria um novo comentário
   */
  static async createComment(commentData: CreateCommentRequest): Promise<Comment> {
    const token = AuthService.getToken();
    
    if (!token) {
      throw new Error('Authentication required to post comments');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/posts/${commentData.postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: commentData.content,
          parentId: commentData.parentId,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          AuthService.logout();
          throw new Error('Authentication expired. Please login again.');
        }
        throw new Error(`Failed to create comment: ${response.statusText}`);
      }

      const data: ApiResponse<Comment> = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to create comment');
      }

      return data.data;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }

  /**
   * Atualiza um comentário existente
   */
  static async updateComment(commentId: string, content: string): Promise<Comment> {
    const token = AuthService.getToken();
    
    if (!token) {
      throw new Error('Authentication required to update comments');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          AuthService.logout();
          throw new Error('Authentication expired. Please login again.');
        }
        if (response.status === 403) {
          throw new Error('You can only edit your own comments');
        }
        throw new Error(`Failed to update comment: ${response.statusText}`);
      }

      const data: ApiResponse<Comment> = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to update comment');
      }

      return data.data;
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  }

  /**
   * Deleta um comentário
   */
  static async deleteComment(commentId: string): Promise<void> {
    const token = AuthService.getToken();
    
    if (!token) {
      throw new Error('Authentication required to delete comments');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          AuthService.logout();
          throw new Error('Authentication expired. Please login again.');
        }
        if (response.status === 403) {
          throw new Error('You can only delete your own comments');
        }
        throw new Error(`Failed to delete comment: ${response.statusText}`);
      }

      const data: ApiResponse<null> = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }

  /**
   * Busca um comentário específico
   */
  static async getComment(commentId: string): Promise<Comment> {
    try {
      const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch comment: ${response.statusText}`);
      }

      const data: ApiResponse<Comment> = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch comment');
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching comment:', error);
      throw error;
    }
  }
}
