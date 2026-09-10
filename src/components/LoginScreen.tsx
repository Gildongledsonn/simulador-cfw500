import React, { useState } from 'react';

// =========================================================================
// CONFIGURAÇÃO DA API:
// Substitua pela URL onde você enviou os arquivos PHP na sua hospedagem UOL Host
// Exemplo: 'https://meusite.com.br/api' ou 'https://simulador.gaflink.com.br/api'
// =========================================================================
const API_URL = 'https://SEUDOMINIO.com.br/api';

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
  // AUTENTICAÇÃO / LOGIN VIA API (UOL HOST)
  // -------------------------------------------------------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setIsLoading(true);

    const cleanUser = usernameInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    try {
      const response = await fetch(`${API_URL}/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: cleanUser,
          senha: cleanPass,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.sucesso) {
        setFeedback({
          type: 'error',
          text: data.mensagem || 'Usuário ou senha incorretos.',
        });
        return;
      }

      const userData = data.usuario;

      // Verificação de status do usuário
      const statusUpper = String(userData.status || '').toUpperCase();
      const roleUpper = String(userData.tipo || userData.role || '').toUpperCase();

      if (statusUpper === 'PENDENTE' && roleUpper !== 'ADMIN') {
        setFeedback({
          type: 'error',
          text: '⏳ Cadastro aguardando aprovação. Peça para o instrutor liberar seu acesso no Painel ADM.',
        });
        return;
      }

      if (statusUpper === 'REJEITADO' || statusUpper === 'REJECTED') {
        setFeedback({
          type: 'error',
          text: '⛔ Seu cadastro foi recusado pela administração.',
        });
        return;
      }

      const authData = {
        name: userData.nome || userData.name,
        role: roleUpper || 'ALUNO',
        username: userData.usuario || userData.username,
        cpf: userData.cpf || 'Não informado',
      };

      // Salva no localStorage e libera o simulador
      localStorage.setItem('cfw500_auth_user', JSON.stringify(authData));
      onLoginSuccess(authData);
    } catch (err) {
      console.error('Erro na requisição de login:', err);
      setFeedback({
        type: 'error',
        text: 'Falha ao conectar com o servidor do banco de dados (UOL Host). Verifique sua conexão ou a URL da API.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------------------------------------------
  // CADASTRO DE NOVO USUÁRIO VIA API (UOL HOST)
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
      const response = await fetch(`${API_URL}/cadastro.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: regName.trim(),
          email: regEmail.trim(),
          cpf: regCpf.trim(),
          usuario: regUsername.trim().toLowerCase(),
          senha: regPassword.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.sucesso) {
        setFeedback({
          type: 'success',
          text: data.mensagem || 'Cadastro realizado com sucesso!',
        });
        setRegName('');
        setRegEmail('');
        setRegCpf('');
        setRegUsername('');
        setRegPassword('');
        // Retorna para a tela de login após 2.5 segundos
        setTimeout(() => setIsRegistering(false), 2500);
      } else {
        setFeedback({
          type: 'error',
          text: data.mensagem || 'Não foi possível concluir o cadastro.',
        });
      }
    } catch (err) {
      console.error('Erro no cadastro:', err);
      setFeedback({
        type: 'error',
        text: 'Erro ao conectar ao servidor da UOL Host para cadastrar.',
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

const btnPrimaryStyle: React11px',
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
