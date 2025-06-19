// types/reactions.ts
export interface Reaction {
  id: string;
  emoji: string;
  count: number;
  userReacted: boolean;
  users: {
    id: number;
    name: string;
    avatar_url: string;
  }[];
}

export interface ReactionSummary {
  [emoji: string]: {
    count: number;
    userReacted: boolean;
    users: {
      id: number;
      name: string;
      avatar_url: string;
    }[];
  };
}

export interface CreateReactionRequest {
  targetId: string;
  targetType: 'post' | 'comment';
  emoji: string;
}

export interface ReactionResponse {
  success: boolean;
  data?: ReactionSummary;
  message?: string;
}

// Emojis disponíveis para reação
export const AVAILABLE_REACTIONS = [
  { emoji: '👍', label: 'Curtir' },
  { emoji: '❤️', label: 'Amar' },
  { emoji: '😂', label: 'Engraçado' },
  { emoji: '😮', label: 'Impressionante' },
  { emoji: '😢', label: 'Triste' },
  { emoji: '😡', label: 'Raiva' },
  { emoji: '🎉', label: 'Celebrar' },
  { emoji: '🤔', label: 'Pensativo' },
] as const;

export type ReactionEmoji = typeof AVAILABLE_REACTIONS[number]['emoji'];
