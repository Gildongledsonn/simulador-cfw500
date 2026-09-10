export interface UserAccount {
  id: string;
  name: string;
  email: string;
  cpf: string;
  username: string;
  password?: string;
  role: 'STUDENT' | 'ADMIN';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt?: string;
}

// URL da API PHP hospedada no seu servidor UOL Host
// Se não usar variável de ambiente, coloque a URL do seu site diretamente:
const API_URL =
  (import.meta as any).env?.VITE_API_URL ||
  'https://seudominio.com.br/api_users.php'; // Altere para o seu domínio real da UOL Host

const LOCAL_CACHE_KEY = '@GAF_USERS_DATABASE_V3';

const DEFAULT_USERS: UserAccount[] = [
  {
    id: 'usr_admin',
    name: 'Gildongledson Alves Fernandes',
    email: 'gildongledson@gmail.com',
    cpf: '075.840.954-02',
    username: 'gildongledson',
    password: '123',
    role: 'ADMIN',
    status: 'APPROVED',
    createdAt: '2026-01-01',
  },
  {
    id: 'usr_student1',
    name: 'Fabio Dantas de Assis Batista',
    email: 'fabio.dantas@gmail.com',
    cpf: '046.405.824-47',
    username: 'fabio',
    password: '123',
    role: 'STUDENT',
    status: 'APPROVED',
    createdAt: '2026-01-02',
  },
];

function getLocalCache(): UserAccount[] {
  try {
    const raw = localStorage.getItem(LOCAL_CACHE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_USERS;
  } catch {
    return DEFAULT_USERS;
  }
}

function setLocalCache(users: UserAccount[]) {
  try {
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(users));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gaf_users_updated'));
    }
  } catch (e) {
    console.error('Erro ao gravar cache local:', e);
  }
}

/**
 * Busca a lista de usuários diretamente do banco MySQL da UOL Host.
 */
export const getStoredUsers = async (): Promise<UserAccount[]> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const serverData = await response.json();
      if (Array.isArray(serverData)) {
        const mapped: UserAccount[] = serverData.map((row: any) => ({
          id: String(row.id),
          name: String(row.name || ''),
          email: String(row.email || ''),
          cpf: String(row.cpf || 'Não informado'),
          username: String(row.username || '').toLowerCase().trim(),
          password: String(row.password || ''),
          role: row.role === 'ADMIN' ? 'ADMIN' : 'STUDENT',
          status: row.status === 'APPROVED' ? 'APPROVED' : row.status === 'REJECTED' ? 'REJECTED' : 'PENDING',
          createdAt: row.created_at || row.createdAt,
        }));

        setLocalCache(mapped);
        return mapped;
      }
    }
  } catch (err) {
    console.warn('Servidor UOL Host offline ou inacessível no momento, usando cache local:', err);
  }

  return getLocalCache();
};

/**
 * Cadastra um novo aluno gravando diretamente no MySQL da UOL Host.
 */
export const registerNewUser = async (data: {
  name: string;
  email: string;
  cpf: string;
  username: string;
  password?: string;
}): Promise<{ success: boolean; message: string }> => {
  const name = data.name?.trim() || '';
  const email = data.email?.trim() || '';
  const cpf = data.cpf?.trim() || '';
  const username = data.username?.trim().toLowerCase() || '';
  const password = data.password?.trim() || '';

  if (!name || !email || !cpf || !username || !password) {
    return { success: false, message: 'Preencha todos os campos obrigatórios: Nome, E-mail, CPF, Usuário e Senha.' };
  }

  const payload = {
    id: `usr_${Date.now()}`,
    name,
    email,
    cpf,
    username,
    password,
    role: 'STUDENT',
    status: 'PENDING',
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        // Atualiza cache local
        const current = getLocalCache();
        setLocalCache([payload, ...current]);
        return { success: true, message: 'Cadastro enviado com sucesso! Aguarde aprovação do instrutor no Painel ADM.' };
      } else {
        return { success: false, message: result.message || 'Erro ao realizar cadastro.' };
      }
    }
  } catch (err) {
    console.error('Falha de rede com servidor UOL Host:', err);
  }

  // Fallback caso esteja sem conexão momentânea com o servidor
  const current = getLocalCache();
  if (current.some((u) => u.username === username)) {
    return { success: false, message: 'Nome de usuário já cadastrado.' };
  }
  setLocalCache([payload, ...current]);
  return { success: true, message: 'Cadastro registrado! Aguardando sincronização com o servidor.' };
};

/**
 * Cria aluno com acesso imediato (APPROVED) direto no MySQL da UOL Host.
 */
export const adminAddUser = async (data: {
  name: string;
  email: string;
  cpf: string;
  username: string;
  password: string;
}): Promise<{ success: boolean; message: string }> => {
  const name = data.name?.trim() || '';
  const email = data.email?.trim() || '';
  const cpf = data.cpf?.trim() || '';
  const username = data.username?.trim().toLowerCase() || '';
  const password = data.password?.trim() || '';

  if (!name || !email || !cpf || !username || !password) {
    return { success: false, message: 'Todos os campos são obrigatórios.' };
  }

  const payload = {
    id: `usr_${Date.now()}`,
    name,
    email,
    cpf,
    username,
    password,
    role: 'STUDENT',
    status: 'APPROVED',
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        const current = getLocalCache();
        setLocalCache([payload, ...current]);
        return { success: true, message: 'Aluno cadastrado com acesso liberado imediatamente!' };
      }
      return { success: false, message: result.message };
    }
  } catch (err) {
    console.error('Erro ao cadastrar na UOL Host:', err);
  }

  const current = getLocalCache();
  setLocalCache([payload, ...current]);
  return { success: true, message: 'Aluno cadastrado e liberado!' };
};

export const updateUserStatus = async (userId: string, newStatus: 'APPROVED' | 'REJECTED') => {
  try {
    await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: userId, status: newStatus }),
    });
  } catch (e) {
    console.warn('Erro ao atualizar status na UOL Host:', e);
  }

  const current = getLocalCache();
  const updated = current.map((u) => (u.id === userId ? { ...u, status: newStatus } : u));
  setLocalCache(updated);
};

export const approveAllPendingUsers = async () => {
  try {
    await fetch(`${API_URL}?action=approve_all`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.warn('Erro ao aprovar todos na UOL Host:', e);
  }

  const current = getLocalCache();
  const updated = current.map((u) => (u.status === 'PENDING' && u.role !== 'ADMIN' ? { ...u, status: 'APPROVED' as const } : u));
  setLocalCache(updated);
};

export const deleteUser = async (userId: string) => {
  try {
    await fetch(`${API_URL}?id=${encodeURIComponent(userId)}`, {
      method: 'DELETE',
    });
  } catch (e) {
    console.warn('Erro ao deletar na UOL Host:', e);
  }

  const current = getLocalCache();
  const updated = current.filter((u) => u.id !== userId);
  setLocalCache(updated);
};
