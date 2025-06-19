// types/comments.ts
import type { ReactionSummary } from './reactions';

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: {
    id: number;
    login: string;
    name: string;
    avatar_url: string;
  };
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
  parentId?: string;
  reactions?: ReactionSummary;
}

export interface CreateCommentRequest {
  postId: string;
  content: string;
  parentId?: string;
}

export interface CommentsResponse {
  comments: Comment[];
  total: number;
  page: number;
  limit: number;
}

export interface CommentFormData {
  content: string;
}
