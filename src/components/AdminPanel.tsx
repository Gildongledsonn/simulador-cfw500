import React, { useState, useEffect } from 'react';
import { getStoredUsers, updateUserStatus, deleteUser, adminAddUser, UserAccount } from '../services/authService';

export const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<UserAccount[]>(getStoredUsers());

  // Estados para cadastro manual de alunos pelo Instrutor
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [formFeedback, setFormFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const refreshList = () => {
    setUsers(getStoredUsers());
  };

  useEffect(() => {
    const handleUpdate = () => {
      setUsers(getStoredUsers());
    };
    window.addEventListener('auth_users_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('auth_users_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setFormFeedback(null);

    const res = adminAddUser({
      name: newName,
      email: newEmail,
      username: newUsername,
      password: newPassword,
    });

    if (res.success) {
      setFormFeedback({ type: 'success', text: res.message });
      setNewName('');
      setNewEmail('');
      setNewUsername('');
      setNewPassword('');
      refreshList();
      setTimeout(() => {
        setShowAddModal(false);
        setFormFeedback(null);
      }, 1500);
    } else {
      setFormFeedback({ type: 'error', text: res.message });
    }
  };

  const handleApprove = (userId: string) => {
    updateUserStatus(userId, 'APPROVED');
    refreshList();
  };

  const handleReject = (userId: string) => {
    updateUserStatus(userId, 'REJECTED');
    refreshList();
  };

  const handleDelete = (userId: string) => {
    if (window.confirm('Deseja realmente remover este cadastro?')) {
      deleteUser(userId);
      refreshList();
    }
  };

  const pendingCount = users.filter((u) => u.status === 'PENDING').length;

  return (
    <div style={containerStyle}>
      {/* CABEÇALHO */}
      <div style={headerStyle}>
        <div>
          <h3 style={{ fontSize: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <span>🛡️</span> Painel de Gestão & Aprovação de Alunos
          </h3>
          <span style={{ fontSize: '11px', color: '#90a4ae' }}>
            Notificações vinculadas a: <strong style={{ color: '#81d4fa' }}>gildongledson@gmail.com</strong>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {pendingCount > 0 && (
            <span style={pendingBadgeStyle}>
              ⚠️ {pendingCount} {pendingCount === 1 ? 'pendente' : 'pendentes'}
            </span>
          )}

          <button
            onClick={() => {
              setShowAddModal(!showAddModal);
              setFormFeedback(null);
            }}
            style={btnAddStyle}
          >
            {showAddModal ? '✕ Fechar Cadastro' : '➕ Novo Aluno'}
          </button>
        </div>
      </div>

      {/* FORMULÁRIO DE CADASTRO MANUAL DE ALUNO */}
      {showAddModal && (
        <div style={addCardStyle}>
          <strong style={{ fontSize: '12px', color: '#00e676', display: 'block', marginBottom: '8px' }}>
            ➕ Cadastrar Aluno Manualmente (Acesso Direto Liberado)
          </strong>

          {formFeedback && (
            <div
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                marginBottom: '10px',
                background: formFeedback.type === 'error' ? 'rgba(211,47,47,0.2)' : 'rgba(0,230,118,0.2)',
                color: formFeedback.type === 'error' ? '#ff8a80' : '#b9f6ca',
                border: `1px solid ${formFeedback.type === 'error' ? '#d32f2f' : '#00e676'}`,
              }}
            >
              {formFeedback.text}
            </div>
          )}

          <form onSubmit={handleCreateUser} style={gridFormStyle}>
            <div>
              <label style={labelStyle}>Nome Completo:</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ex: João da Silva"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>E-mail:</label>
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="joao@gmail.com"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Usuário de Acesso:</label>
              <input
                type="text"
                required
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="joao.silva"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Senha:</label>
              <input
                type="text"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ex: 123456"
                style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
              <button type="submit" style={btnSubmitAddStyle}>
                💾 Salvar e Liberar Acesso
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABELA DE USUÁRIOS */}
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr style={{ color: '#90a4ae', borderBottom: '1px solid #2a313d', textAlign: 'left', fontSize: '11px' }}>
              <th style={{ padding: '8px' }}>NOME</th>
              <th style={{ padding: '8px' }}>USUÁRIO</th>
              <th style={{ padding: '8px' }}>E-MAIL</th>
              <th style={{ padding: '8px' }}>DATA</th>
              <th style={{ padding: '8px' }}>STATUS</th>
              <th style={{ padding: '8px', textAlign: 'center' }}>AÇÕES DE CONTROLE</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderBottom: '1px solid #1a1f26', fontSize: '11px' }}>
                <td style={{ padding: '8px', color: '#fff', fontWeight: 'bold' }}>{u.name}</td>
                <td style={{ padding: '8px', color: '#81d4fa', fontFamily: 'monospace' }}>@{u.username}</td>
                <td style={{ padding: '8px', color: '#cfd8dc' }}>{u.email}</td>
                <td style={{ padding: '8px', color: '#90a4ae' }}>{u.requestedAt}</td>
                <td style={{ padding: '8px' }}>
                  <span
                    style={{
                      ...statusBadgeStyle,
                      background:
                        u.status === 'APPROVED' ? 'rgba(0, 230, 118, 0.15)' : u.status === 'PENDING' ? 'rgba(255, 179, 0, 0.15)' : 'rgba(211, 47, 47, 0.15)',
                      color:
                        u.status === 'APPROVED' ? '#00e676' : u.status === 'PENDING' ? '#ffb300' : '#ff5252',
                      borderColor:
                        u.status === 'APPROVED' ? '#00e676' : u.status === 'PENDING' ? '#ffb300' : '#ff5252',
                    }}
                  >
                    {u.status === 'APPROVED' ? '✓ APROVADO' : u.status === 'PENDING' ? '⏳ PENDENTE' : '✕ RECUSADO'}
                  </span>
                </td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  {u.role !== 'ADMIN' ? (
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                      {u.status !== 'APPROVED' && (
                        <button onClick={() => handleApprove(u.id)} style={{ ...actionBtnStyle, background: '#2e7d32' }} title="Liberar Acesso">
                          ✅ Aprovar
                        </button>
                      )}
                      {u.status !== 'REJECTED' && (
                        <button onClick={() => handleReject(u.id)} style={{ ...actionBtnStyle, background: '#d32f2f' }} title="Recusar Acesso">
                          ⛔ Recusar
                        </button>
                      )}
                      <button onClick={() => handleDelete(u.id)} style={{ ...actionBtnStyle, background: '#37474f' }} title="Remover Aluno">
                        🗑️
                      </button>
                    </div>
                  ) : (
                    <span style={{ fontSize: '10px', color: '#90a4ae' }}>Administrador Master</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ESTILOS VISUAIS
const containerStyle: React.CSSProperties = {
  background: '#14181f',
  borderRadius: '12px',
  padding: '16px',
  border: '1px solid #283344',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
  boxSizing: 'border-box',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '10px',
  borderBottom: '1px solid #222a36',
  paddingBottom: '10px',
};

const pendingBadgeStyle: React.CSSProperties = {
  background: '#ff8f00',
  color: '#000',
  padding: '4px 10px',
  borderRadius: '6px',
  fontSize: '11px',
  fontWeight: 'bold',
};

const btnAddStyle: React.CSSProperties = {
  background: '#00897b',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '6px 12px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const addCardStyle: React.CSSProperties = {
  background: '#0d1117',
  border: '1px solid #30363d',
  borderRadius: '8px',
  padding: '14px',
};

const gridFormStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '10px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '10px',
  color: '#cfd8dc',
  fontWeight: 'bold',
  display: 'block',
  marginBottom: '4px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#161b22',
  border: '1px solid #30363d',
  borderRadius: '6px',
  padding: '8px 10px',
  color: '#fff',
  fontSize: '11px',
  boxSizing: 'border-box',
};

const btnSubmitAddStyle: React.CSSProperties = {
  background: '#00e676',
  color: '#000',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 14px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
};

const statusBadgeStyle: React.CSSProperties = {
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '10px',
  fontWeight: 'bold',
  border: '1px solid',
  display: 'inline-block',
};

const actionBtnStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '4px',
  color: '#fff',
  padding: '4px 8px',
  fontSize: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
};