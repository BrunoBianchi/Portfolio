// services/auth-service.ts
import type { GitHubUser, ApiResponse } from '~/types';

// Configurações do GitHub OAuth - você precisará configurar essas variáveis
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || 'your_github_client_id';
const GITHUB_REDIRECT_URI = typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '';
const GITHUB_SCOPE = 'user:email';

export class AuthService {
  private static readonly TOKEN_KEY = 'github_access_token';
  private static readonly USER_KEY = 'github_user';

  /**
   * Inicia o fluxo de autenticação OAuth do GitHub
   */
  static initiateGitHubLogin(): void {
    if (typeof window === 'undefined') {
      throw new Error('GitHub login can only be initiated in the browser');
    }

    // Salvar página atual para retornar após login
    sessionStorage.setItem('auth_return_to', window.location.pathname + window.location.search);

    const state = this.generateState();
    const params = new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      redirect_uri: GITHUB_REDIRECT_URI,
      scope: GITHUB_SCOPE,
      state,
    });

    console.log('Iniciando GitHub OAuth:', {
      client_id: GITHUB_CLIENT_ID,
      redirect_uri: GITHUB_REDIRECT_URI,
      state
    });

    const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
    window.location.href = authUrl;
  }

  /**
   * Processa o callback do GitHub OAuth
   */
  static async handleGitHubCallback(code: string, state: string): Promise<GitHubUser> {
    // Verificar state para segurança
    const savedState = typeof window !== 'undefined' ? sessionStorage.getItem('oauth_state') : null;
    if (state !== savedState) {
      throw new Error('Invalid state parameter');
    }

    try {
      // Trocar código por token de acesso
      const tokenResponse = await fetch('/api/auth/github/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, state }),
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to exchange code for token');
      }

      const { access_token } = await tokenResponse.json();
      
      // Buscar dados do usuário
      const user = await this.fetchGitHubUser(access_token);
      
      // Salvar token e usuário
      this.setToken(access_token);
      this.setUser(user);
      
      return user;
    } catch (error) {
      console.error('GitHub authentication error:', error);
      throw error;
    }
  }

  /**
   * Busca dados do usuário autenticado do GitHub
   */
  static async fetchGitHubUser(token?: string): Promise<GitHubUser> {
    const accessToken = token || this.getToken();
    
    if (!accessToken) {
      throw new Error('No access token available');
    }

    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.logout();
          throw new Error('Token expired or invalid');
        }
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      return userData as GitHubUser;
    } catch (error) {
      console.error('Error fetching GitHub user:', error);
      throw error;
    }
  }

  /**
   * Faz logout do usuário
   */
  static logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem('oauth_state');
  }

  /**
   * Verifica se o usuário está autenticado
   */
  static isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getUser();
  }

  /**
   * Obtém o token de acesso armazenado
   */
  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Armazena o token de acesso
   */
  static setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Obtém os dados do usuário armazenados
   */
  static getUser(): GitHubUser | null {
    if (typeof window === 'undefined') return null;
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Armazena os dados do usuário
   */
  static setUser(user: GitHubUser): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   * Gera um state aleatório para OAuth
   */
  private static generateState(): string {
    const state = Math.random().toString(36).substring(2, 15) +
                  Math.random().toString(36).substring(2, 15);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('oauth_state', state);
    }
    return state;
  }

  /**
   * Atualiza os dados do usuário
   */
  static async refreshUser(): Promise<GitHubUser> {
    const user = await this.fetchGitHubUser();
    this.setUser(user);
    return user;
  }
}
