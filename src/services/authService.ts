export interface UserAccount {
  id: string;
  name: string;
  email: string;
  cpf: string;
  username: string;
  password?: string;
  role: 'STUDENT' | 'ADMIN';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

const PRIMARY_KEY = '@GAF_USERS_DATABASE_V3';

const getInitialUsers = (): UserAccount[] => {
  return [
    {
      id: 'usr_admin',
      name: 'Gildongledson Alves Fernandes',
      email: 'gildongledson@gmail.com',
      cpf: '075.840.954-02',
      username: 'gildongledson',
      password: '123',
      role: 'ADMIN',
      status: 'APPROVED',
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
    },
  ];
};

function saveToStorage(users: UserAccount[]) {
  try {
    const serialized = JSON.stringify(users);
    localStorage.setItem(PRIMARY_KEY, serialized);
    // Espelho de compatibilidade para garantir que nunca mais se perca
    localStorage.setItem('@GAF_USERS_DATABASE_V2', serialized);
    localStorage.setItem('@GAF_USERS_DATABASE', serialized);
    localStorage.setItem('cfw500_users_database', serialized);
  } catch (e) {
    console.error('Erro ao salvar usuários no localStorage:', e);
  }
}

function notifyUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('gaf_users_updated'));
  }
}

/**
 * Realiza uma varredura completa em todas as chaves do localStorage do navegador
 * para resgatar qualquer cadastro de aluno de versões anteriores.
 */
export const restoreLegacyUsers = async (): Promise<{ count: number; users: UserAccount[] }> => {
  const userMap = new Map<string, UserAccount>();

  // 1. Carrega os usuários padrão
  getInitialUsers().forEach((u) => userMap.set(u.username.toLowerCase(), u));

  // 2. Varre todas as chaves existentes no localStorage do navegador
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      // Ignora chaves que não sejam de dados de usuários
      if (
        key === 'cfw500_auth_user' ||
        key.includes('progress') ||
        key.includes('audio') ||
        key.includes('scenario')
      ) {
        continue;
      }

      const raw = localStorage.getItem(key);
      if (!raw) continue;

      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          parsed.forEach((item: any) => {
            if (item && typeof item === 'object') {
              const uname = item.username || item.login || item.user;
              if (uname && typeof uname === 'string') {
                const cleanUname = uname.toLowerCase().trim();
                const existing = userMap.get(cleanUname);

                userMap.set(cleanUname, {
                  id: String(item.id || existing?.id || `usr_${Date.now()}_${Math.random()}`),
                  name: String(item.name || item.nome || existing?.name || cleanUname),
                  email: String(item.email || existing?.email || ''),
                  cpf: String(item.cpf || existing?.cpf || '000.000.000-00'),
                  username: cleanUname,
                  password: String(item.password || item.senha || existing?.password || '123'),
                  role: item.role === 'ADMIN' ? 'ADMIN' : (existing?.role || 'STUDENT'),
                  status: item.status === 'APPROVED' ? 'APPROVED' : item.status === 'REJECTED' ? 'REJECTED' : (existing?.status || 'PENDING'),
                });
              }
            }
          });
        }
      } catch {
        // Ignora valores que não são JSON
      }
    }
  } catch (err) {
    console.warn('Erro durante a varredura do storage:', err);
  }

  const consolidated = Array.from(userMap.values());
  saveToStorage(consolidated);
  notifyUpdate();

  return { count: consolidated.length, users: consolidated };
};

export const getStoredUsers = async (): Promise<UserAccount[]> => {
  try {
    const raw = localStorage.getItem(PRIMARY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    // Se o banco primário ainda não estiver populado, faz a recuperação automática
    const recovered = await restoreLegacyUsers();
    return recovered.users;
  } catch {
    return getInitialUsers();
  }
};

export const registerNewUser = async (data: {
  name: string;
  email: string;
  cpf: string;
  username: string;
  password?: string;
}): Promise<{ success: boolean; message: string }> => {
  if (!data.name?.trim() || !data.email?.trim() || !data.cpf?.trim() || !data.username?.trim() || !data.password?.trim()) {
    return { success: false, message: 'Preenchimento obrigatório: Nome completo, E-mail, CPF, Usuário e Senha são exigidos.' };
  }

  const users = await getStoredUsers();
  const cleanUsername = data.username.toLowerCase().trim();

  if (users.some((u) => u.username.toLowerCase() === cleanUsername)) {
    return { success: false, message: 'Este nome de usuário já está em uso. Escolha outro.' };
  }

  const newUser: UserAccount = {
    id: `usr_${Date.now()}`,
    name: data.name.trim(),
    email: data.email.trim(),
    cpf: data.cpf.trim(),
    username: cleanUsername,
    password: data.password,
    role: 'STUDENT',
    status: 'PENDING',
  };

  // Coloca o novo aluno na primeira posição para aparecer no topo da tabela
  const updatedList = [newUser, ...users];
  saveToStorage(updatedList);
  notifyUpdate();

  return { success: true, message: 'Cadastro realizado com sucesso! Aguarde a aprovação do instrutor no painel ADM.' };
};

export const adminAddUser = async (data: {
  name: string;
  email: string;
  cpf: string;
  username: string;
  password: string;
}): Promise<{ success: boolean; message: string }> => {
  if (!data.name?.trim() || !data.email?.trim() || !data.cpf?.trim() || !data.username?.trim() || !data.password?.trim()) {
    return { success: false, message: 'Todos os campos (Nome, E-mail, CPF, Usuário e Senha) são obrigatórios.' };
  }

  const users = await getStoredUsers();
  const cleanUsername = data.username.toLowerCase().trim();

  if (users.some((u) => u.username.toLowerCase() === cleanUsername)) {
    return { success: false, message: 'Nome de usuário já cadastrado.' };
  }

  const newUser: UserAccount = {
    id: `usr_${Date.now()}`,
    name: data.name.trim(),
    email: data.email.trim(),
    cpf: data.cpf.trim(),
    username: cleanUsername,
    password: data.password,
    role: 'STUDENT',
    status: 'APPROVED',
  };

  const updatedList = [newUser, ...users];
  saveToStorage(updatedList);
  notifyUpdate();

  return { success: true, message: 'Aluno cadastrado com acesso liberado!' };
};

export const updateUserStatus = async (userId: string, newStatus: 'APPROVED' | 'REJECTED') => {
  const users = await getStoredUsers();
  const updated = users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u));
  saveToStorage(updated);
  notifyUpdate();
};

export const approveAllPendingUsers = async () => {
  const users = await getStoredUsers();
  const updated = users.map((u) => (u.status === 'PENDING' && u.role !== 'ADMIN' ? { ...u, status: 'APPROVED' as const } : u));
  saveToStorage(updated);
  notifyUpdate();
};

export const deleteUser = async (userId: string) => {
  const users = await getStoredUsers();
  const updated = users.filter((u) => u.id !== userId);
  saveToStorage(updated);
  notifyUpdate();
};
