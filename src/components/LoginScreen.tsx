import React, { useState } from 'react';
import {
  authenticateUser,
  registerNewUser,
} from '../services/authService';

interface LoginScreenProps {
  onLoginSuccess: (user: { name: string; role: string; username: string; cpf?: string }) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCpf, setRegCpf] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // -------------------------------------------------------------
  // AUTENTICAÇÃO — caminho único via authService (servidor + cache local)
  // -------------------------------------------------------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setIsLoading(true);

    try {
      const result = await authenticateUser(usernameInput, passwordInput);

      if (result.ok && result.user) {
        const authData = {
          name: result.user.name,
          role: result.user.role,
          username: result.user.username,
          cpf: result.user.cpf,
        };

        localStorage.setItem('cfw500_auth_user', JSON.stringify(authData));
        onLoginSuccess(authData);
        return;
      }

      setFeedback({ type: 'error', text: result.message });
    } catch (err) {
      console.error('Erro na autenticação:', err);
      setFeedback({
        type: 'error',
        text: 'Erro ao autenticar. Verifique sua conexão e tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------------------------------------------
  // CADASTRO DE NOVO USUÁRIO via authService
  // -------------------------------------------------------------
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!regName.trim() || !regEmail.trim() || !regCpf.trim() || !regUsername.trim() || !regPassword.trim()) {
      setFeedback({
        type: 'error',
        text: 'Preencha todos os campos obrigatórios: Nome, E-mail, CPF, Usuário e Senha.',
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await registerNewUser({
        name: regName,
        email: regEmail,
        cpf: regCpf,
        username: regUsername,
        password: regPassword,
      });

      if (result.success) {
        setFeedback({ type: 'success', text: result.message });
        setRegName('');
        setRegEmail('');
        setRegCpf('');
        setRegUsername('');
        setRegPassword('');
        setTimeout(() => setIsRegistering(false), 2500);
      } else {
        setFeedback({ type: 'error', text: result.message });
      }
    } catch (err) {
      console.error('Erro no cadastro:', err);
      setFeedback({
        type: 'error',
        text: 'Erro ao conectar ao servidor para cadastrar. Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={screenContainerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={logoBadgeStyle}>G</div>
          <h2 style={{ fontSize: '20px', color: '#fff', margin: '8px 0 2px 0' }}>GAF TREINAMENTOS</h2>
          <span style={{ fontSize: '11px', color: '#81d4fa' }}>Plataforma Oficial de Automação & Inversores</span>
        </div>

        {feedback && (
          <div
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '11px',
              marginBottom: '14px',
              background: feedback.type === 'error' ? 'rgba(211,47,47,0.2)' : 'rgba(0,230,118,0.2)',
              color: feedback.type === 'error' ? '#ff8a80' : '#b9f6ca',
              border: `1px solid ${feedback.type === 'error' ? '#d32f2f' : '#00e676'}`,
            }}
          >
            {feedback.text}
          </div>
        )}

        {!isRegistering ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Nome de Usuário:</label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Ex: fabio ou usuario criado"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Senha:</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••"
                style={inputStyle}
              />
            </div>

            <button type="submit" disabled={isLoading} style={btnPrimaryStyle}>
              {isLoading ? 'Entrando...' : 'Entrar no Sistema'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <span style={{ fontSize: '11px', color: '#90a4ae' }}>Novo aluno? </span>
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(true);
                  setFeedback(null);
                }}
                style={linkBtnStyle}
              >
                Cadastre-se aqui
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={labelStyle}>Nome Completo *</label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Ex: Carlos Silva de Souza"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>E-mail *</label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="carlos@gmail.com"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>CPF *</label>
              <input
                type="text"
                required
                value={regCpf}
                onChange={(e) => setRegCpf(e.target.value)}
                placeholder="000.000.000-00"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Nome de Usuário para Acesso *</label>
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
              <label style={labelStyle}>Senha *</label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="••••••"
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{ ...btnPrimaryStyle, background: '#00e676', color: '#000', marginTop: '4px' }}
            >
              {isLoading ? 'Cadastrando...' : 'Concluir Cadastro'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '6px' }}>
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(false);
                  setFeedback(null);
                }}
                style={linkBtnStyle}
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

const screenContainerStyle: React.CSSProperties = {
  background: '#0a0d11',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
};

const cardStyle: React.CSSProperties = {
  background: '#14181f',
  border: '1px solid #283344',
  borderRadius: '12px',
  padding: '24px',
  width: '100%',
  maxWidth: '400px',
  boxShadow: '0 15px 35px rgba(0,0,0,0.7)',
};

const logoBadgeStyle: React.CSSProperties = {
  width: '42px',
  height: '42px',
  borderRadius: '50%',
  background: '#0288d1',
  color: '#fff',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '900',
  fontSize: '20px',
  border: '2px solid #fff',
};

const labelStyle: React.CSSProperties = {
  fontSize: '10.5px',
  color: '#cfd8dc',
  fontWeight: 'bold',
  display: 'block',
  marginBottom: '3px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#1b222c',
  border: '1px solid #30363d',
  borderRadius: '6px',
  padding: '8px 10px',
  color: '#fff',
  fontSize: '11px',
  boxSizing: 'border-box',
};

const btnPrimaryStyle: React.CSSProperties = {
  background: '#0288d1',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '9px 14px',
  fontSize: '12px',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '100%',
};

const linkBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#81d4fa',
  fontSize: '11px',
  cursor: 'pointer',
  textDecoration: 'underline',
};
