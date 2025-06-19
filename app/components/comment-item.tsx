// components/comment-item.tsx
import React, { useState } from 'react';
import type { Comment, GitHubUser } from '~/types';
import { CommentForm } from './comment-form';
import { useAuth } from '~/contexts/auth-context';
import { Reactions } from './reactions';
import { useReactions } from '~/hooks/useReactions';

interface CommentItemProps {
  comment: Comment;
  currentUser: GitHubUser | null;
  onUpdate: (commentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
  onReply: (parentId: string, content: string) => Promise<void>;
  isReply?: boolean;
}

export function CommentItem({
  comment,
  currentUser,
  onUpdate,
  onDelete,
  onReply,
  isReply = false,
}: CommentItemProps) {
  const { isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Hook para reações do comentário
  const { reactions, react } = useReactions({
    targetId: comment.id,
    targetType: 'comment',
    initialReactions: comment.reactions || {}
  });

  const isOwner = currentUser?.id === comment.author.id;
  const formattedDate = new Date(comment.createdAt).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleEdit = async (content: string) => {
    try {
      await onUpdate(comment.id, content);
      setIsEditing(false);
    } catch (error) {
      // Error handling is done in parent component
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(comment.id);
    } catch (error) {
      setIsDeleting(false);
      // Error handling is done in parent component
    }
  };

  const handleReply = async (content: string) => {
    try {
      await onReply(comment.id, content);
      setShowReplyForm(false);
    } catch (error) {
      // Error handling is done in parent component
    }
  };

  return (
    <div className={`${isReply ? 'ml-12' : ''}`}>
      <div className="flex space-x-3">
        <img
          src={comment.author.avatar_url}
          alt={comment.author.name || comment.author.login}
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          {/* Header do comentário */}
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="font-medium text-gray-900 dark:text-white">
              {comment.author.name || comment.author.login}
            </h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              @{comment.author.login}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {formattedDate}
            </time>
            {comment.updatedAt !== comment.createdAt && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                (editado)
              </span>
            )}
          </div>

          {/* Conteúdo do comentário */}
          {isEditing ? (
            <CommentForm
              onSubmit={handleEdit}
              onCancel={() => setIsEditing(false)}
              placeholder="Edite seu comentário..."
              submitText="Salvar"
              initialValue={comment.content}
              autoFocus
            />
          ) : (
            <div className="prose prose-sm max-w-none dark:prose-invert mb-3">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          )}

          {/* Reações do comentário */}
          {!isEditing && (
            <div className="mb-3">
              <Reactions
                targetId={comment.id}
                targetType="comment"
                reactions={reactions}
                onReact={react}
                className="justify-start"
              />
            </div>
          )}

          {/* Ações do comentário */}
          {!isEditing && (
            <div className="flex items-center space-x-4 text-sm">
              {isAuthenticated && !isReply && (
                <button
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Responder
                </button>
              )}

              {isOwner && (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-50 transition-colors"
                  >
                    {isDeleting ? 'Excluindo...' : 'Excluir'}
                  </button>
                </>
              )}
            </div>
          )}

          {/* Formulário de resposta */}
          {showReplyForm && (
            <div className="mt-4">
              <CommentForm
                onSubmit={handleReply}
                onCancel={() => setShowReplyForm(false)}
                placeholder="Escreva sua resposta..."
                submitText="Responder"
                autoFocus
              />
            </div>
          )}

          {/* Respostas */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-6 space-y-4">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  currentUser={currentUser}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onReply={onReply}
                  isReply={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
