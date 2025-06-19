import { useEffect, useState } from 'react';

export default function AuthCallback() {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processando callback do GitHub...');

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

        setMessage('Código de autorização recebido!');

        // Simular processamento por 2 segundos
        await new Promise(resolve => setTimeout(resolve, 2000));

        setStatus('success');
        setMessage('Redirecionando...');

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


