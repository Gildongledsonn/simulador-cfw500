export interface User {
  id?: string;
  name: string;
  email: string;
  cpf?: string;
  username: string;
  password?: string;
  role: 'ADMIN' | 'STUDENT' | 'ALUNO';
  status: 'APPROVED' | 'PENDING' | 'REJECTED' | 'ACTIVE';
  createdAt?: string;
}

// URL da API PHP hospedada no seu servidor UOL Host
// Se não usar variável de ambiente, coloque a URL do seu site diretamente:
const API_URL =
  (import.meta as any).env?.VITE_API_URL ||
  'https://simulador.gaflink.com.br/api_users.php';

const LOCAL_CACHE_KEY = '@GAF_USERS_DATABASE_V3';
const STORAGE_KEY = 'cfw500_registered_users';

const DEFAULT_USERS: User[] = [
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

function normalizeRole(role?: string): User['role'] {
  if (role === 'ADMIN') return 'ADMIN';
  if (role === 'ALUNO') return 'ALUNO';
  return 'STUDENT';
}

function normalizeStatus(status?: string): User['status'] {
  if (status === 'APPROVED') return 'APPROVED';
  if (status === 'REJECTED') return 'REJECTED';
  if (status === 'ACTIVE') return 'ACTIVE';
  return 'PENDING';
}

function normalizeUser(row: any): User {
  return {
    id: String(row.id || `usr_${Date.now()}_${Math.random().toString(16).slice(2)}`),
    name: String(row.name || ''),
    email: String(row.email || ''),
    cpf: String(row.cpf || 'Não informado'),
    username: String(row.username || '').toLowerCase().trim(),
    password: String(row.password || ''),
    role: normalizeRole(row.role),
    status: normalizeStatus(row.status),
    createdAt: row.created_at || row.createdAt,
  };
}

function getLocalCache(): User[] {
  try {
    const raw = localStorage.getItem(LOCAL_CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }

    const fallbackRaw = localStorage.getItem(STORAGE_KEY);
    if (fallbackRaw) {
      const fallbackParsed = JSON.parse(fallbackRaw);
      if (Array.isArray(fallbackParsed)) return fallbackParsed;
    }
  } catch {
    // Ignora falha de leitura e usa valores padrão abaixo
  }

  return DEFAULT_USERS;
}

function setLocalCache(users: User[]) {
  try {
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gaf_users_updated'));
    }
  } catch (e) {
    console.error('Erro ao gravar cache local:', e);
  }
}

/**
 * Busca a lista de usuários diretamente do banco MySQL da UOL Host.
 * Se o servidor estiver indisponível, usa o cache local / dados nativos.
 */
export const getStoredUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const serverData = await response.json();
      if (Array.isArray(serverData)) {
        const mapped: User[] = serverData.map((row: any) => normalizeUser(row));
        setLocalCache(mapped);
        return mapped;
      }
    }
  } catch (err) {
    console.warn('Servidor UOL Host offline ou inacessível no momento, usando cache local:', err);
  }

  const localUsers = getLocalCache();
  if (localUsers.length) {
    return localUsers;
  }

  setLocalCache(DEFAULT_USERS);
  return DEFAULT_USERS;
};

/**
 * Cadastra um novo aluno gravando diretamente no MySQL da UOL Host.
 * Se o servidor estiver indisponível, salva localmente como fallback.
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

  try {
    const users = await getStoredUsers();

    if (users.some((u) => u.username.trim().toLowerCase() === username)) {
      return { success: false, message: 'Nome de usuário já está em uso.' };
    }

    if (users.some((u) => u.email.trim().toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'E-mail já cadastrado no sistema.' };
    }

    const payload: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      cpf,
      username,
      password,
      role: 'STUDENT',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const current = getLocalCache();
        setLocalCache([payload, ...current]);
        return {
          success: true,
          message: 'Cadastro enviado com sucesso! Aguarde aprovação do instrutor no Painel ADM.',
        };
      }
    } catch (serverErr) {
      console.warn('Falha ao enviar cadastro para o servidor UOL Host, usando fallback local.', serverErr);
    }

    const current = getLocalCache();
    const updated = [payload, ...current];
    setLocalCache(updated);

    try {
      await fetch('https://formsubmit.co/ajax/gildongledson@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `⚡ Nova Solicitação de Aluno - CFW500 (${name})`,
          Nome: name,
          Usuario: username,
          CPF: cpf,
          Email_Solicitante: email,
          Senha_Solicitada: password,
          Data_Hora: new Date().toLocaleString('pt-BR'),
          Instrucao: 'Acesse o simulador como admin e libere o acesso na aba Painel Admin.',
        }),
      });
    } catch (mailErr) {
      console.warn('Falha no envio de notificação por e-mail, mas o cadastro foi gravado localmente.', mailErr);
    }

    return {
      success: true,
      message: 'Solicitação enviada com sucesso! Aguarde a liberação do instrutor no Painel ADM.',
    };
  } catch (err) {
    return { success: false, message: 'Erro ao salvar cadastro do aluno.' };
  }
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

  const payload: User = {
    id: `usr_${Date.now()}`,
    name,
    email,
    cpf,
    username,
    password,
    role: 'STUDENT',
    status: 'APPROVED',
    createdAt: new Date().toISOString(),
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
      return { success: false, message: result.message || 'Erro ao realizar cadastro.' };
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
  const updated = current.map((u) =>
    u.status === 'PENDING' && u.role !== 'ADMIN' ? { ...u, status: 'APPROVED' as const } : u
  );
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
