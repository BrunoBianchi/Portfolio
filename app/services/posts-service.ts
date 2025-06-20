// services/posts-service.ts
import { AuthService } from './auth-service';

export interface CreatePostRequest {
  title: string;
  content: string;
  tags?: string[];
}

export interface CreatePostResponse {
  success: boolean;
  data?: {
    post: {
      _id: string;
      id: string;
      title: string;
      content: string;
      tags: string[];
      createdAt: string;
    };
  };
  message?: string;
  error?: string;
  details?: any[];
}

export class PostsService {
  private static readonly API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

  /**
   * Criar um novo post (apenas para brunoBianchi)
   */
  static async createPost(postData: CreatePostRequest): Promise<CreatePostResponse> {
    try {
      const token = AuthService.getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${this.API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create post');
      }

      return data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  /**
   * Verificar se o usuário atual pode criar posts
   */
  static canCreatePosts(): boolean {
    const user = AuthService.getUser();
    if (!user) return false;

    const allowedEmail = 'bruno.raiadobian@gmail.com';
    const allowedLogin = 'BrunoBianchi'; // Corrigido para maiúsculo

    return user.email === allowedEmail || user.login === allowedLogin;
  }
}
