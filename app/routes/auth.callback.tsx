// routes/auth.callback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '~/contexts/auth-context';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // O AuthProvider já vai processar o callback automaticamente
        await login();
        
        // Redirecionar de volta para onde o usuário estava
        const returnTo = sessionStorage.getItem('auth_return_to') || '/';
        sessionStorage.removeItem('auth_return_to');
        navigate(returnTo);
      } catch (error) {
        console.error('Callback error:', error);
        navigate('/?auth_error=true');
      }
    };

    handleCallback();
  }, [login, navigate]);

  return (
    <div className="bg-white dark:bg-background flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 text-center py-16">
        <div className="animate-pulse">
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Processando login...
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            Aguarde enquanto confirmamos sua autenticação.
          </div>
        </div>
      </main>
    </div>
  );
}
