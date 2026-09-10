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

const STORAGE_KEY = '@GAF_USERS_DATABASE_V3';

const defaultUsers: UserAccount[] = [
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

/**
 * Lê diretamente os usuários salvos no localStorage.
 * Se estiver vazio, inicializa com os usuários padrão sem sobrescrever o que já existe.
 */
export const getStoredUsers = async (): Promise<UserAccount[]> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    // Inicialização segura
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  } catch (err) {
    console.error('Erro ao ler usuários do storage:', err);
    return defaultUsers;
  }
};

function saveUsers(users: UserAccount[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gaf_users_updated'));
    }
  } catch (err) {
    console.error('Erro ao salvar usuários:', err);
  }
}

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
    return {
      success: false,
      message: 'Todos os campos são obrigatórios: Nome, E-mail, CPF, Usuário e Senha.',
    };
  }

  const users = await getStoredUsers();

  if (users.some((u) => u.username.toLowerCase().trim() === username)) {
    return { success: false, message: 'Este nome de usuário já está em uso. Escolha outro.' };
  }

  const newUser: UserAccount = {
    id: `usr_${Date.now()}`,
    name,
    email,
    cpf,
    username,
    password,
    role: 'STUDENT',
    status: 'PENDING',
    createdAt: new Date().toISOString().split('T')[0],
  };

  const updated = [newUser, ...users];
  saveUsers(updated);

  return {
    success: true,
    message: 'Cadastro realizado com sucesso! Aguarde a aprovação do instrutor no painel ADM.',
  };
};

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
    return { success: false, message: 'Preencha todos os campos obrigatórios.' };
  }

  const users = await getStoredUsers();

  if (users.some((u) => u.username.toLowerCase().trim() === username)) {
    return { success: false, message: 'Nome de usuário já cadastrado.' };
  }

  const newUser: UserAccount = {
    id: `usr_${Date.now()}`,
    name,
    email,
    cpf,
    username,
    password,
    role: 'STUDENT',
    status: 'APPROVED', // Criado pelo admin já entra 100% aprovado para logar imediatamente
    createdAt: new Date().toISOString().split('T')[0],
  };

  const updated = [newUser, ...users];
  saveUsers(updated);

  return { success: true, message: 'Aluno cadastrado e liberado com sucesso para login!' };
};

export const updateUserStatus = async (userId: string, newStatus: 'APPROVED' | 'REJECTED') => {
  const users = await getStoredUsers();
  const updated = users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u));
  saveUsers(updated);
};

export const approveAllPendingUsers = async () => {
  const users = await getStoredUsers();
  const updated = users.map((u) =>
    u.status === 'PENDING' && u.role !== 'ADMIN' ? { ...u, status: 'APPROVED' as const } : u
  );
  saveUsers(updated);
};

export const deleteUser = async (userId: string) => {
  const users = await getStoredUsers();
  const updated = users.filter((u) => u.id !== userId);
  saveUsers(updated);
};

export const restoreLegacyUsers = async (): Promise<{ count: number; users: UserAccount[] }> => {
  const current = await getStoredUsers();
  const map = new Map<string, UserAccount>();

  // Guarda os atuais
  current.forEach((u) => map.set(u.username.toLowerCase().trim(), u));

  // Varre chaves anteriores que possam ter cadastros antigos
  const legacyKeys = [
    '@GAF_USERS_DATABASE_V2',
    '@GAF_USERS_DATABASE',
    '@GAF_USERS_DATABASE_V1',
    'cfw500_users_database',
    'cfw500_auth_users',
    'cfw500_users',
  ];

  legacyKeys.forEach((k) => {
    const raw = localStorage.getItem(k);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        parsed.forEach((item: any) => {
          if (item && item.username) {
            const uname = String(item.username).toLowerCase().trim();
            if (!map.has(uname)) {
              map.set(uname, {
                id: item.id || `usr_${Date.now()}_${Math.random()}`,
                name: item.name || uname,
                email: item.email || '',
                cpf: item.cpf || 'Não informado',
                username: uname,
                password: String(item.password || '123'),
                role: item.role === 'ADMIN' ? 'ADMIN' : 'STUDENT',
                status: item.status === 'REJECTED' ? 'REJECTED' : 'APPROVED',
                createdAt: item.createdAt || '2026-01-01',
              });
            }
          }
        });
      }
    } catch {
      // ignore
    }
  });

  const merged = Array.from(map.values());
  saveUsers(merged);
  return { count: merged.length, users: merged };
};

export const exportUsersJson = async (): Promise<string> => {
  const users = await getStoredUsers();
  return JSON.stringify(users, null, 2);
};

export const importUsersJson = async (jsonString: string): Promise<{ success: boolean; message: string }> => {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      return { success: false, message: 'JSON inválido: deve ser uma lista de alunos.' };
    }
    const current = await getStoredUsers();
    const map = new Map<string, UserAccount>();
    current.forEach((u) => map.set(u.username.toLowerCase().trim(), u));

    parsed.forEach((item: any) => {
      if (item && item.username) {
        const uname = String(item.username).toLowerCase().trim();
        map.set(uname, {
          id: item.id || `usr_${Date.now()}_${Math.random()}`,
          name: item.name || uname,
          email: item.email || '',
          cpf: item.cpf || 'Não informado',
          username: uname,
          password: String(item.password || '123'),
          role: item.role === 'ADMIN' ? 'ADMIN' : 'STUDENT',
          status: item.status || 'APPROVED',
          createdAt: item.createdAt || new Date().toISOString().split('T')[0],
        });
      }
    });

    const merged = Array.from(map.values());
    saveUsers(merged);
    return { success: true, message: `${merged.length} usuários sincronizados com sucesso!` };
  } catch (err) {
    return { success: false, message: 'Erro ao processar arquivo JSON.' };
  }
};
