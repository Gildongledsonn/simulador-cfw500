import React, { useState } from 'react';
import { getStoredUsers, updateUserStatus, deleteUser, UserAccount } from '../services/authService';

export const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<UserAccount[]>(getStoredUsers());

  const handleApprove = (userId: string) => {
    updateUserStatus(userId, 'APPROVED');
    setUsers(getStoredUsers());
  };

  const handleReject = (userId: string) => {
    updateUserStatus(userId, 'REJECTED');
    setUsers(getStoredUsers());
  };

  const handleDelete = (userId: string) => {
    if (window.confirm('Deseja realmente excluir este usuário?')) {
      deleteUser(userId);
      setUsers(getStoredUsers());
    }
  };

  const pendingCount = users.filter((u) => u.status === 'PENDING').length;

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h3 style={{ fontSize: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🛡️</span> Gestão de Acessos & Aprovação de Alunos
          </h3>
          <span style={{ fontSize: '11px', color: '#90a4ae' }}>
            Notificações sincronizadas com: <strong style={{ color: '#81d4fa' }}>gildongledson@gmail.com</strong>
          </span>
        </div>

        {pendingCount > 0 && (
          <span style={pendingBadgeStyle}>
            ⚠️ {pendingCount} {pendingCount === 1 ? 'solicitação pendente' : 'solicitações pendentes'}
          </span>
        )}
      </div>

      {/* TABELA DE USUÁRIOS */}
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr style={{ color: '#90a4ae', borderBottom: '1px solid #2a313d', textAlign: 'left', fontSize: '11px' }}>
              <th style={{ padding: '8px' }}>NOME</th>
              <th style={{ padding: '8px' }}>USUÁRIO</th>
              <th style={{ padding: '8px' }}>E-MAIL</th>
              <th style={{ padding: '8px' }}>SOLICITADO EM</th>
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
                      <button onClick={() => handleDelete(u.id)} style={{ ...actionBtnStyle, background: '#37474f' }} title="Remover Cadastro">
                        🗑️
                      </button>
                    </div>
                  ) : (
                    <span style={{ fontSize: '10px', color: '#90a4ae' }}>Administrador Principal</span>
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