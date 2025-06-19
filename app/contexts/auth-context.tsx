// contexts/auth-context.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType, AuthState, GitHubUser } from '~/types';
import { AuthService } from '~/services/auth-service';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Inicializar estado da autenticação
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      // Verificar se há token e usuário salvos
      if (AuthService.isAuthenticated()) {
        const savedUser = AuthService.getUser();
        if (savedUser) {
          // Tentar atualizar dados do usuário
          try {
            const updatedUser = await AuthService.refreshUser();
            setState({
              user: updatedUser,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            // Se falhar ao atualizar, usar dados salvos
            setState({
              user: savedUser,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          }
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Authentication error',
      });
    }
  };

  const login = async (): Promise<void> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Verificar se estamos no callback do GitHub
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      if (code && state) {
        // Processar callback
        const user = await AuthService.handleGitHubCallback(code, state);
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        // Limpar URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        // Iniciar fluxo OAuth
        AuthService.initiateGitHubLogin();
      }
    } catch (error) {
      console.error('Login error:', error);
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      });
    }
  };

  const logout = (): void => {
    AuthService.logout();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const refreshUser = async (): Promise<void> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const updatedUser = await AuthService.refreshUser();
      setState(prev => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error refreshing user:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to refresh user',
      }));
    }
  };

  // Função para reinicializar após callback
  const reinitializeAuth = async (): Promise<void> => {
    await initializeAuth();
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    logout,
    refreshUser,
    reinitializeAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
