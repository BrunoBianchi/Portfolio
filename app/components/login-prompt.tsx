// components/login-prompt.tsx
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { useAuth } from '~/contexts/auth-context';

export function LoginPrompt() {
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
      <div className="mb-4">
        <FaGithub className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Faça login para comentar
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Use sua conta do GitHub para participar da discussão
        </p>
      </div>
      
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <FaGithub className="w-4 h-4 mr-2" />
        {isLoading ? 'Conectando...' : 'Entrar com GitHub'}
      </button>
      
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Seus dados são usados apenas para identificação nos comentários
      </p>
    </div>
  );
}
