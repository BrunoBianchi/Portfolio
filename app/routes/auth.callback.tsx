import { useEffect, useState } from 'react';
import { useAuth } from '~/contexts/auth-context';

export default function AuthCallback() {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processando callback do GitHub...');
  const { reinitializeAuth } = useAuth();

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Obter parâmetros da URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');

        console.log('Callback params:', { code, state, url: window.location.href });

        if (!code || !state) {
          throw new Error('Parâmetros de callback ausentes');
        }

        setMessage('Trocando código por token...');

        // Fazer requisição para o backend para trocar código por token
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'}/auth/github/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, state }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
        }

        const authData = await response.json();
        console.log('Auth response:', authData);

        if (!authData.success || !authData.data) {
          throw new Error('Resposta de autenticação inválida');
        }

        // Salvar token e dados do usuário
        localStorage.setItem('github_access_token', authData.data.access_token);
        localStorage.setItem('github_user', JSON.stringify(authData.data.user));

        // Reinicializar contexto de autenticação
        await reinitializeAuth();

        setStatus('success');
        setMessage('Login realizado com sucesso! Redirecionando...');

        // Redirecionar após 1 segundo
        setTimeout(() => {
          const returnTo = sessionStorage.getItem('auth_return_to') || '/';
          sessionStorage.removeItem('auth_return_to');
          window.location.href = returnTo;
        }, 1000);

      } catch (error) {
        console.error('Callback error:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Erro no processo de login');

        // Redirecionar para home após 3 segundos
        setTimeout(() => {
          window.location.href = '/?auth_error=true';
        }, 3000);
      }
    };

    processCallback();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%'
      }}>
        {status === 'processing' && (
          <>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #e5e7eb',
              borderTop: '4px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}></div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1f2937' }}>
              Processando Login
            </h1>
            <p style={{ color: '#6b7280' }}>
              {message}
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              margin: '0 auto 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem'
            }}>
              ✓
            </div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#10b981' }}>
              Login Realizado!
            </h1>
            <p style={{ color: '#6b7280' }}>
              {message}
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#ef4444',
              borderRadius: '50%',
              margin: '0 auto 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem'
            }}>
              ✕
            </div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ef4444' }}>
              Erro no Login
            </h1>
            <p style={{ color: '#6b7280' }}>
              {message}
            </p>
          </>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }} />
    </div>
  );
}


