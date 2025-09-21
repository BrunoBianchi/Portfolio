// components/comments-section.tsx
import React, { useState } from 'react';
import { useAuth } from '~/contexts/auth-context';
import { useComments } from '~/hooks/useComments';
import { CommentForm } from './comment-form';
import { CommentItem } from './comment-item';
import { LoginPrompt } from './login-prompt';

interface CommentsSectionProps {
  postId: string;
}

export function CommentsSection({ postId }: CommentsSectionProps) {
  const { isAuthenticated, user } = useAuth();
  const {
    comments,
    loading,
    error,
    hasMore,
    total,
    createComment,
    updateComment,
    deleteComment,
    loadMore,
    refresh,
  } = useComments({ postId });

  const [showForm, setShowForm] = useState(false);

  const handleCommentSubmit = async (content: string) => {
    try {
      await createComment(content);
      setShowForm(false);
    } catch (error) {
      // Error is handled by the hook
      console.error('Failed to submit comment:', error);
    }
  };

  const handleCommentUpdate = async (commentId: string, content: string) => {
    try {
      await updateComment(commentId, content);
    } catch (error) {
      console.error('Failed to update comment:', error);
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este comentário?')) {
      try {
        await deleteComment(commentId);
      } catch (error) {
        console.error('Failed to delete comment:', error);
      }
    }
  };

  const handleReply = async (parentId: string, content: string) => {
    try {
      await createComment(content, parentId);
    } catch (error) {
      console.error('Failed to reply to comment:', error);
    }
  };

  return (
    <section className="mt-12 sm:mt-16 pt-8 sm:pt-12">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
          Comentários
        </h2>
        <p className="text-gray-400 text-sm">
          {total === 0
            ? 'Seja o primeiro a comentar!'
            : `${total} comentário${total !== 1 ? 's' : ''}`
          }
        </p>
      </div>

      {/* Formulário de comentário ou prompt de login */}
      {isAuthenticated ? (
        <div className="mb-6 sm:mb-8">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full p-3 sm:p-4 text-left hover:bg-gray-800/20 transition-colors rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar_url}
                  alt={user?.name || user?.login}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                />
                <span className="text-gray-400 text-sm sm:text-base">
                  Escreva um comentário...
                </span>
              </div>
            </button>
          ) : (
            <CommentForm
              onSubmit={handleCommentSubmit}
              onCancel={() => setShowForm(false)}
              placeholder="Escreva seu comentário..."
              submitText="Comentar"
            />
          )}
        </div>
      ) : (
        <LoginPrompt />
      )}

      {/* Lista de comentários */}
      {error && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-900/20 border border-red-800 rounded-lg">
          <p className="text-red-400 text-sm">
            {error}
          </p>
          <button
            onClick={refresh}
            className="mt-2 text-red-400 hover:text-red-300 text-sm underline"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {loading && comments.length === 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 sm:h-4 bg-gray-700 rounded w-1/4"></div>
                  <div className="h-3 sm:h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 sm:h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUser={user}
              onUpdate={handleCommentUpdate}
              onDelete={handleCommentDelete}
              onReply={handleReply}
            />
          ))}

          {hasMore && (
            <div className="text-center pt-4 sm:pt-6">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-4 sm:px-6 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
              >
                {loading ? 'Carregando...' : 'Carregar mais comentários'}
              </button>
            </div>
          )}

          {comments.length === 0 && !loading && (
            <div className="text-center py-8 sm:py-12">
              <div className="text-gray-600 text-4xl sm:text-6xl mb-3 sm:mb-4">💬</div>
              <p className="text-gray-400 text-sm sm:text-base">
                Nenhum comentário ainda. Seja o primeiro a comentar!
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
