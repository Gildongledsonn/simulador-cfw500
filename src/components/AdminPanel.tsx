import React, { useState, useEffect, useCallback } from 'react';
import { getStoredUsers, updateUserStatus, deleteUser, fetchCloudUsers, UserAccount } from '../services/authService';

export const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<UserAccount[]>(getStoredUsers());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    setIsRefreshing(true);
    const updated = await fetchCloudUsers();
    setUsers(updated);
    setIsRefreshing(false);
  }, []);

  // Recarrega dados na montagem e ouve eventos de storage locais
  useEffect(() => {
    loadData();

    const handleLocalUpdate = () => {
      setUsers(getStoredUsers());
    };

    window.addEventListener('auth_users_updated', handleLocalUpdate);
    window.addEventListener('storage', handleLocalUpdate);

    // Auto-polling a cada 10 segundos para buscar novas solicitações
    const interval = setInterval(loadData, 10000);

    return () => {
      window.removeEventListener('auth_users_updated', handleLocalUpdate);
      window.removeEventListener('storage', handleLocalUpdate);
      clearInterval(interval);
    };
  }, [loadData]);

  const handleApprove = (userId: string) => {
    updateUserStatus(userId, 'APPROVED');
    setUsers(getStoredUsers());
  };

  const handleReject = (userId: string) => {
    updateUserStatus(userId, 'REJECTED');
    setUsers(getStoredUsers());
  };

  const handleDelete = (userId: string) => {
    if (window.confirm('Deseja realmente remover este cadastro?')) {
      deleteUser(userId);
      setUsers(getStoredUsers());
    }
  };

  const pendingCount = users.filter((u) => u.status === 'PENDING').length;

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h3 style={{ fontSize: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <span>🛡️</span> Gestão de Acessos & Aprovação de Alunos
          </h3>
          <span style={{ fontSize: '11px', color: '#90a4ae' }}>
            Notificações sincronizadas com: <strong style={{ color: '#81d4fa' }}>gildongledson@gmail.com</strong>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {pendingCount > 0 && (
            <span style={pendingBadgeStyle}>
              ⚠️ {pendingCount} {pendingCount === 1 ? 'pendente' : 'pendentes'}
            </span>
          )}

          <button
            onClick={loadData}
            disabled={isRefreshing}
            style={{
              ...refreshBtnStyle,
              opacity: isRefreshing ? 0.6 : 1,
              cursor: isRefreshing ? 'wait' : 'pointer',
            }}
            title="Recarregar cadastros mais recentes"
          >
            {isRefreshing ? '⏳ Sincronizando...' : '🔄 Atualizar Lista'}
          </button>
        </div>
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

const refreshBtnStyle: React.CSSProperties = {
  background: '#0288d1',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '6px 12px',
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