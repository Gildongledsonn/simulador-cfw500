import React, { useState } from 'react';
import { authenticateUser, requestRegistration } from '../services/authService';

interface LoginScreenProps {
  onLoginSuccess: (user: { name: string; role: string; username: string }) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setIsLoading(true);

    const result = await authenticateUser(loginUsername, loginPassword);
    setIsLoading(false);

    if (result.success && result.user) {
      const sessionUser = {
        name: result.user.name,
        role: result.user.role,
        username: result.user.username,
      };

      localStorage.setItem('cfw500_auth_user', JSON.stringify(sessionUser));
      onLoginSuccess(sessionUser);
    } else {
      setFeedback({
        type: 'error',
        text: result.message || 'Credenciais inválidas.',
      });
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setIsLoading(true);

    const result = await requestRegistration({
      name: regName,
      email: regEmail,
      username: regUsername,
      password: regPassword,
    });

    setIsLoading(false);

    if (result.success) {
      setFeedback({ type: 'success', text: result.message });
      setRegName('');
      setRegEmail('');
      setRegUsername('');
      setRegPassword('');
      setTimeout(() => setIsRegisterMode(false), 3500);
    } else {
      setFeedback({ type: 'error', text: result.message });
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={badgeIconStyle}>⚡</div>
          <h2 style={{ fontSize: '18px', color: '#fff', margin: '8px 0 2px 0' }}>
            Portal de Treinamento CFW500
          </h2>
          <span style={{ fontSize: '11px', color: '#90a4ae' }}>
            GafLink Automação • Plataforma de Capacitação Técnica
          </span>
        </div>

        {feedback && (
          <div
            style={{
              ...feedbackBannerStyle,
              background: feedback.type === 'error' ? 'rgba(211, 47, 47, 0.15)' : 'rgba(0, 230, 118, 0.15)',
              borderColor: feedback.type === 'error' ? '#d32f2f' : '#00e676',
              color: feedback.type === 'error' ? '#ff8a80' : '#b9f6ca',
            }}
          >
            <span>{feedback.type === 'error' ? '⚠️' : '✅'} {feedback.text}</span>
          </div>
        )}

        {!isRegisterMode && (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Usuário:</label>
              <input
                type="text"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="Digite seu usuário"
                style={inputStyle}
                autoFocus
              />
            </div>

            <div>
              <label style={labelStyle}>Senha:</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...btnSubmitStyle,
                background: isLoading ? '#01579b' : '#0288d1',
                cursor: isLoading ? 'not-allowed' : 'pointer',
              }}
            >
              {isLoading ? 'Verificando...' : 'Acessar Plataforma ➔'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '6px' }}>
              <span style={{ fontSize: '11px', color: '#90a4ae' }}>Ainda não possui acesso? </span>
              <button
                type="button"
                onClick={() => {
                  setFeedback(null);
                  setIsRegisterMode(true);
                }}
                style={linkButtonStyle}
              >
                Solicitar Cadastro
              </button>
            </div>
          </form>
        )}

        {isRegisterMode && (
          <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={labelStyle}>Nome Completo:</label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Ex: Carlos Silva"
                style={inputStyle}
                autoFocus
              />
            </div>

            <div>
              <label style={labelStyle}>E-mail:</label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="carlos@exemplo.com"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Usuário Desejado:</label>
              <input
                type="text"
                required
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                placeholder="carlos.silva"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Senha:</label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="••••••••"
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...btnSubmitStyle,
                background: isLoading ? '#004d40' : '#00897b',
                cursor: isLoading ? 'not-allowed' : 'pointer',
              }}
            >
              {isLoading ? 'Enviando Pedido...' : 'Enviar Solicitação de Cadastro 📩'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '4px' }}>
              <button
                type="button"
                onClick={() => {
                  setFeedback(null);
                  setIsRegisterMode(false);
                }}
                style={linkButtonStyle}
              >
                ← Voltar para o Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const overlayStyle: React.CSSProperties = {
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'radial-gradient(circle at center, #1b222d 0%, #0c0f13 100%)',
  padding: '16px',
  boxSizing: 'border-box',
};

const cardStyle: React.CSSProperties = {
  background: '#14181f',
  border: '1px solid #2d3748',
  borderRadius: '16px',
  padding: '24px',
  maxWidth: '400px',
  width: '100%',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 15px rgba(2, 136, 209, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};

const badgeIconStyle: React.CSSProperties = {
  width: '44px',
  height: '44px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #0288d1 0%, #00e676 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  color: '#fff',
  boxShadow: '0 4px 12px rgba(2, 136, 209, 0.4)',
};

const feedbackBannerStyle: React.CSSProperties = {
  border: '1px solid',
  borderRadius: '8px',
  padding: '8px 12px',
  fontSize: '11px',
  textAlign: 'center',
};

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#cfd8dc',
  fontWeight: 600,
  marginBottom: '4px',
  display: 'block',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#0d1014',
  border: '1px solid #374151',
  borderRadius: '8px',
  padding: '9px 12px',
  color: '#fff',
  fontSize: '12px',
  outline: 'none',
  boxSizing: 'border-box',
};

const btnSubmitStyle: React.CSSProperties = {
  padding: '11px',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontSize: '12px',
  fontWeight: 'bold',
  letterSpacing: '0.5px',
  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
  transition: 'all 0.2s ease',
  marginTop: '4px',
};

const linkButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#64b5f6',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
  textDecoration: 'underline',
};