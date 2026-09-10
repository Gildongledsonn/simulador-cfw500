import React, { useState, useEffect, useCallback } from 'react';
import {
  getStoredUsers,
  updateUserStatus,
  approveAllPendingUsers,
  deleteUser,
  adminAddUser,
  UserAccount,
} from '../services/authService';

export interface StudentTask {
  id: string;
  studentUsername: string;
  taskTitle: string;
  status: 'PENDENTE' | 'CONCLUIDA';
  date: string;
}

export const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [tasks, setTasks] = useState<StudentTask[]>(() => {
    try {
      const saved = localStorage.getItem('@GAF_ADMIN_TASKS_V1');
      return saved ? JSON.parse(saved) : [
        { id: 't1', studentUsername: 'carlos.silva', taskTitle: 'Comissionamento do Inversor CFW500 (Partida e Rampa)', status: 'PENDENTE', date: '2026-06-01' },
        { id: 't2', studentUsername: 'carlos.silva', taskTitle: 'Montagem de Comandos Elétricos (Partida Direta com Selo)', status: 'CONCLUIDA', date: '2026-06-02' },
      ];
    } catch {
      return [];
    }
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'USERS' | 'TASKS'>('USERS');
  const [userStatusFilter, setUserStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newCpf, setNewCpf] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [formFeedback, setFormFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskStudent, setNewTaskStudent] = useState('');

  const loadData = useCallback(async () => {
    setIsRefreshing(true);
    const list = await getStoredUsers();
    setUsers(list);
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    loadData();

    // Sincronização em tempo real quando novo aluno se cadastra na mesma ou em outra aba
    const handleSync = () => {
      loadData();
    };

    window.addEventListener('gaf_users_updated', handleSync);
    window.addEventListener('storage', handleSync);

    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel('gaf_auth_sync_channel');
      channel.onmessage = () => {
        loadData();
      };
    } catch {
      // ignore
    }

    const interval = setInterval(loadData, 4000);

    return () => {
      window.removeEventListener('gaf_users_updated', handleSync);
      window.removeEventListener('storage', handleSync);
      if (channel) channel.close();
      clearInterval(interval);
    };
  }, [loadData]);

  useEffect(() => {
    localStorage.setItem('@GAF_ADMIN_TASKS_V1', JSON.stringify(tasks));
  }, [tasks]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormFeedback(null);
    setIsRefreshing(true);

    const res = await adminAddUser({
      name: newName,
      email: newEmail,
      cpf: newCpf,
      username: newUsername,
      password: newPassword,
    });

    if (res.success) {
      setFormFeedback({ type: 'success', text: res.message });
      setNewName('');
      setNewEmail('');
      setNewCpf('');
      setNewUsername('');
      setNewPassword('');
      await loadData();
      setTimeout(() => {
        setShowAddModal(false);
        setFormFeedback(null);
      }, 1500);
    } else {
      setFormFeedback({ type: 'error', text: res.message });
      setIsRefreshing(false);
    }
  };

  const handleApprove = async (userId: string) => {
    setIsRefreshing(true);
    await updateUserStatus(userId, 'APPROVED');
    await loadData();
  };

  const handleApproveAll = async () => {
    if (window.confirm('Deseja aprovar o acesso de todos os alunos pendentes de uma vez?')) {
      setIsRefreshing(true);
      await approveAllPendingUsers();
      await loadData();
    }
  };

  const handleReject = async (userId: string) => {
    setIsRefreshing(true);
    await updateUserStatus(userId, 'REJECTED');
    await loadData();
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm('Deseja realmente remover este cadastro?')) {
      setIsRefreshing(true);
      await deleteUser(userId);
      await loadData();
    }
  };

  const handleToggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextStatus = t.status === 'PENDENTE' ? 'CONCLUIDA' : 'PENDENTE';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: StudentTask = {
      id: `task_${Date.now()}`,
      studentUsername: newTaskStudent || 'geral',
      taskTitle: newTaskTitle.trim(),
      status: 'PENDENTE',
      date: new Date().toISOString().split('T')[0],
    };

    setTasks((prev) => [newTask, ...prev]);
    setNewTaskTitle('');
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const pendingCount = users.filter((u) => u.status === 'PENDING').length;
  const approvedCount = users.filter((u) => u.status === 'APPROVED' && u.role !== 'ADMIN').length;
  const rejectedCount = users.filter((u) => u.status === 'REJECTED').length;
  const pendingTasksCount = tasks.filter((t) => t.status === 'PENDENTE').length;

  const filteredUsers = users.filter((u) => {
    if (userStatusFilter === 'PENDING') return u.status === 'PENDING';
    if (userStatusFilter === 'APPROVED') return u.status === 'APPROVED';
    if (userStatusFilter === 'REJECTED') return u.status === 'REJECTED';
    return true;
  });

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h3 style={{ fontSize: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <span>🛡️</span> Painel de Gestão & Aprovação de Alunos
          </h3>
          <span style={{ fontSize: '11px', color: '#90a4ae' }}>
            Servidor GAF Treinamentos • <strong style={{ color: '#81d4fa' }}>gildongledson@gmail.com</strong>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {pendingCount > 0 && (
            <span style={pendingBadgeStyle}>
              ⚠️ {pendingCount} {pendingCount === 1 ? 'pendente para aprovar' : 'pendentes para aprovar'}
            </span>
          )}

          <button
            onClick={loadData}
            disabled={isRefreshing}
            style={{
              ...refreshBtnStyle,
              opacity: isRefreshing ? 0.6 : 1,
            }}
          >
            {isRefreshing ? '⏳ Sincronizando...' : '🔄 Atualizar Lista'}
          </button>

          <button
            onClick={() => {
              setShowAddModal(!showAddModal);
              setFormFeedback(null);
            }}
            style={btnAddStyle}
          >
            {showAddModal ? '✕ Fechar' : '➕ Novo Aluno'}
          </button>
        </div>
      </div>

      {/* BANNER DE ALERTA DE ALUNOS PENDENTES */}
      {pendingCount > 0 && (
        <div style={pendingAlertBannerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>🔔</span>
            <div>
              <strong style={{ fontSize: '12px', color: '#fff' }}>
                Existem {pendingCount} novo(s) cadastro(s) aguardando aprovação!
              </strong>
              <span style={{ fontSize: '10px', color: '#ffe082', display: 'block' }}>
                Clique no botão ao lado para liberar todos ou aprove individualmente na tabela abaixo.
              </span>
            </div>
          </div>
          <button onClick={handleApproveAll} style={btnApproveAllStyle}>
            ✅ Aprovar Todos ({pendingCount})
          </button>
        </div>
      )}

      {/* ABAS INTERNAS DO PAINEL ADMIN */}
      <div style={subTabsRowStyle}>
        <button
          onClick={() => setActiveSubTab('USERS')}
          style={{
            ...subTabBtnStyle,
            background: activeSubTab === 'USERS' ? '#0288d1' : '#161b22',
            color: activeSubTab === 'USERS' ? '#fff' : '#90a4ae',
            borderColor: activeSubTab === 'USERS' ? '#29b6f6' : '#30363d',
          }}
        >
          👥 Gestão de Alunos ({users.length})
        </button>

        <button
          onClick={() => setActiveSubTab('TASKS')}
          style={{
            ...subTabBtnStyle,
            background: activeSubTab === 'TASKS' ? '#00897b' : '#161b22',
            color: activeSubTab === 'TASKS' ? '#fff' : '#80cbc4',
            borderColor: activeSubTab === 'TASKS' ? '#00e676' : '#30363d',
          }}
        >
          ✅ Controle & Conclusão de Tarefas {pendingTasksCount > 0 && `(${pendingTasksCount})`}
        </button>
      </div>

      {showAddModal && (
        <div style={addCardStyle}>
          <strong style={{ fontSize: '12px', color: '#00e676', display: 'block', marginBottom: '8px' }}>
            ➕ Cadastrar Aluno Manualmente (Acesso Imediato)
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
                placeholder="Ex: Carlos Silva"
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
                placeholder="carlos@gmail.com"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>CPF:</label>
              <input
                type="text"
                required
                value={newCpf}
                onChange={(e) => setNewCpf(e.target.value)}
                placeholder="000.000.000-00"
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
                placeholder="carlos.silva"
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
              <button type="submit" disabled={isRefreshing} style={btnSubmitAddStyle}>
                💾 Salvar e Liberar Acesso
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CONTEÚDO DA ABA DE ALUNOS COM FILTRO */}
      {activeSubTab === 'USERS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={filterButtonsRowStyle}>
            <span style={{ fontSize: '11px', color: '#90a4ae', fontWeight: 'bold' }}>Filtrar Status:</span>
            <button
              onClick={() => setUserStatusFilter('ALL')}
              style={{
                ...btnFilterStyle,
                background: userStatusFilter === 'ALL' ? '#0288d1' : '#1e293b',
                color: userStatusFilter === 'ALL' ? '#fff' : '#cbd5e1',
              }}
            >
              Todos ({users.length})
            </button>
            <button
              onClick={() => setUserStatusFilter('PENDING')}
              style={{
                ...btnFilterStyle,
                background: userStatusFilter === 'PENDING' ? '#ff8f00' : '#1e293b',
                color: userStatusFilter === 'PENDING' ? '#000' : '#ffe082',
                fontWeight: 'bold',
              }}
            >
              ⏳ Pendentes ({pendingCount})
            </button>
            <button
              onClick={() => setUserStatusFilter('APPROVED')}
              style={{
                ...btnFilterStyle,
                background: userStatusFilter === 'APPROVED' ? '#2e7d32' : '#1e293b',
                color: userStatusFilter === 'APPROVED' ? '#fff' : '#a5d6a7',
              }}
            >
              ✅ Aprovados ({approvedCount})
            </button>
            <button
              onClick={() => setUserStatusFilter('REJECTED')}
              style={{
                ...btnFilterStyle,
                background: userStatusFilter === 'REJECTED' ? '#c62828' : '#1e293b',
                color: userStatusFilter === 'REJECTED' ? '#fff' : '#ef9a9a',
              }}
            >
              ⛔ Recusados ({rejectedCount})
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ color: '#90a4ae', borderBottom: '1px solid #2a313d', textAlign: 'left', fontSize: '11px' }}>
                  <th style={{ padding: '8px' }}>NOME</th>
                  <th style={{ padding: '8px' }}>CPF</th>
                  <th style={{ padding: '8px' }}>USUÁRIO</th>
                  <th style={{ padding: '8px' }}>SENHA</th>
                  <th style={{ padding: '8px' }}>STATUS</th>
                  <th style={{ padding: '8px', textAlign: 'center' }}>AÇÕES DE CONTROLE</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '20px', color: '#90a4ae', fontSize: '11px' }}>
                      Nenhum usuário encontrado neste filtro.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      style={{
                        borderBottom: '1px solid #1a1f26',
                        fontSize: '11px',
                        background: u.status === 'PENDING' ? 'rgba(255, 143, 0, 0.06)' : 'transparent',
                      }}
                    >
                      <td style={{ padding: '8px', color: '#fff', fontWeight: 'bold' }}>{u.name}</td>
                      <td style={{ padding: '8px', color: '#cbd5e1' }}>{u.cpf}</td>
                      <td style={{ padding: '8px', color: '#81d4fa', fontFamily: 'monospace' }}>@{u.username}</td>
                      <td style={{ padding: '8px', color: '#ffd54f', fontFamily: 'monospace' }}>{u.password}</td>
                      <td style={{ padding: '8px' }}>
                        <span
                          style={{
                            ...statusBadgeStyle,
                            background:
                              u.status === 'APPROVED' ? 'rgba(0, 230, 118, 0.15)' : u.status === 'PENDING' ? 'rgba(255, 179, 0, 0.2)' : 'rgba(211, 47, 47, 0.15)',
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
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'center' }}>
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CONTEÚDO DA ABA DE TAREFAS */}
      {activeSubTab === 'TASKS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={addTaskBoxStyle}>
            <strong style={{ fontSize: '11px', color: '#80cbc4', display: 'block', marginBottom: '6px' }}>
              ➕ Atribuir Nova Tarefa / Prática para Alunos
            </strong>
            <form onSubmit={handleCreateTask} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <input
                type="text"
                required
                placeholder="Título da Tarefa (Ex: Montagem da Partida Estrela-Triângulo)"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                style={{ ...inputStyle, flex: 2, minWidth: '220px' }}
              />
              <select
                value={newTaskStudent}
                onChange={(e) => setNewTaskStudent(e.target.value)}
                style={{ ...inputStyle, flex: 1, minWidth: '130px', background: '#161b22', color: '#fff' }}
              >
                <option value="">Todos os Alunos (Geral)</option>
                {users.filter((u) => u.role !== 'ADMIN').map((u) => (
                  <option key={u.id} value={u.username}>@{u.username} ({u.name})</option>
                ))}
              </select>
              <button type="submit" style={btnSubmitAddStyle}>
                Atribuir Tarefa
              </button>
            </form>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ color: '#90a4ae', borderBottom: '1px solid #2a313d', textAlign: 'left', fontSize: '11px' }}>
                  <th style={{ padding: '8px' }}>ALUNO / DESTINO</th>
                  <th style={{ padding: '8px' }}>TEMA / TAREFA PRÁTICA</th>
                  <th style={{ padding: '8px' }}>DATA</th>
                  <th style={{ padding: '8px' }}>STATUS</th>
                  <th style={{ padding: '8px', textAlign: 'center' }}>CONCLUIR / GERENCIAR</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '20px', color: '#90a4ae', fontSize: '11px' }}>
                      Nenhuma tarefa cadastrada.
                    </td>
                  </tr>
                ) : (
                  tasks.map((t) => (
                    <tr key={t.id} style={{ borderBottom: '1px solid #1a1f26', fontSize: '11px' }}>
                      <td style={{ padding: '8px', color: '#81d4fa', fontWeight: 'bold' }}>@{t.studentUsername}</td>
                      <td style={{ padding: '8px', color: '#fff' }}>{t.taskTitle}</td>
                      <td style={{ padding: '8px', color: '#90a4ae' }}>{t.date}</td>
                      <td style={{ padding: '8px' }}>
                        <span
                          style={{
                            ...statusBadgeStyle,
                            background: t.status === 'CONCLUIDA' ? 'rgba(0, 230, 118, 0.15)' : 'rgba(255, 179, 0, 0.15)',
                            color: t.status === 'CONCLUIDA' ? '#00e676' : '#ffb300',
                            borderColor: t.status === 'CONCLUIDA' ? '#00e676' : '#ffb300',
                          }}
                        >
                          {t.status === 'CONCLUIDA' ? '✓ CONCLUÍDA' : '⏳ PENDENTE'}
                        </span>
                      </td>
                      <td style={{ padding: '8px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'center' }}>
                          <button
                            onClick={() => handleToggleTaskStatus(t.id)}
                            style={{
                              ...actionBtnStyle,
                              background: t.status === 'CONCLUIDA' ? '#c62828' : '#2e7d32',
                            }}
                            title={t.status === 'CONCLUIDA' ? 'Marcar como Pendente' : 'Concluir Tarefa'}
                          >
                            {t.status === 'CONCLUIDA' ? '↺ Reabrir' : '✓ Concluir'}
                          </button>
                          <button onClick={() => handleDeleteTask(t.id)} style={{ ...actionBtnStyle, background: '#37474f' }} title="Excluir Tarefa">
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
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

const pendingAlertBannerStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #b45309 0%, #78350f 100%)',
  border: '1px solid #f59e0b',
  borderRadius: '8px',
  padding: '10px 14px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '10px',
  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
};

const btnApproveAllStyle: React.CSSProperties = {
  background: '#00e676',
  color: '#000',
  border: 'none',
  borderRadius: '6px',
  padding: '6px 14px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const filterButtonsRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
  margin: '4px 0',
};

const btnFilterStyle: React.CSSProperties = {
  border: '1px solid #334155',
  borderRadius: '6px',
  padding: '4px 10px',
  fontSize: '10px',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
};

const subTabsRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  marginTop: '4px',
};

const subTabBtnStyle: React.CSSProperties = {
  border: '1px solid',
  borderRadius: '6px',
  padding: '6px 12px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
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
  cursor: 'pointer',
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

const addTaskBoxStyle: React.CSSProperties = {
  background: '#0d1117',
  border: '1px solid #233544',
  borderRadius: '8px',
  padding: '10px 12px',
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
