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
const LEGACY_STORAGE_KEYS = [
  '@GAF_USERS_DATABASE_V3',
  '@GAF_USERS_DATABASE_V2',
  '@GAF_USERS_DATABASE',
  '@GAF_USERS_DATABASE_V1',
  'cfw500_users_database',
  'cfw500_auth_users',
  'cfw500_users',
  'users',
];

const BROADCAST_CHANNEL_NAME = 'gaf_auth_sync_channel';

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
    // Mantém as chaves legadas sincronizadas para garantir compatibilidade
    localStorage.setItem('@GAF_USERS_DATABASE_V2', serialized);
    localStorage.setItem('@GAF_USERS_DATABASE', serialized);
  } catch (e) {
    console.error('Erro ao salvar no storage local', e);
  }
}

function notifyUsersUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('gaf_users_updated'));
    try {
      const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      channel.postMessage({ type: 'USERS_UPDATED' });
      channel.close();
    } catch {
      // BroadcastChannel não suportado em ambientes restritos
    }
  }
}

export const getStoredUsers = async (): Promise<UserAccount[]> => {
  try {
    const userMap = new Map<string, UserAccount>();

    // 1. Insere os usuários padrão
    getInitialUsers().forEach((u) => {
      userMap.set(u.username.toLowerCase(), u);
    });

    // 2. Varre todas as chaves anteriores do localStorage para recuperar cadastros antigos
    for (const key of LEGACY_STORAGE_KEYS) {
      const raw = localStorage.getItem(key);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            parsed.forEach((u: any) => {
              if (u && u.username) {
                const uname = String(u.username).toLowerCase().trim();
                const existing = userMap.get(uname);
                userMap.set(uname, {
                  id: u.id || existing?.id || `usr_${Date.now()}_${Math.random()}`,
                  name: u.name || existing?.name || 'Aluno',
                  email: u.email || existing?.email || '',
                  cpf: u.cpf || existing?.cpf || '000.000.000-00',
                  username: uname,
                  password: u.password || existing?.password || '123',
                  role: u.role === 'ADMIN' ? 'ADMIN' : (existing?.role || 'STUDENT'),
                  status: u.status || existing?.status || 'PENDING',
                });
              }
            });
          }
        } catch {
          // Ignora JSON mal formatado em chaves legadas
        }
      }
    }

    const consolidated = Array.from(userMap.values());
    saveToStorage(consolidated);
    return consolidated;
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

  // Adiciona o novo aluno no início da lista para aparecer de imediato no topo
  users.unshift(newUser);
  saveToStorage(users);
  notifyUsersUpdated();

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

  users.unshift(newUser);
  saveToStorage(users);
  notifyUsersUpdated();

  return { success: true, message: 'Aluno cadastrado com acesso liberado!' };
};

export const updateUserStatus = async (userId: string, newStatus: 'APPROVED' | 'REJECTED') => {
  const users = await getStoredUsers();
  const updated = users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u));
  saveToStorage(updated);
  notifyUsersUpdated();
};

export const approveAllPendingUsers = async () => {
  const users = await getStoredUsers();
  const updated = users.map((u) => (u.status === 'PENDING' && u.role !== 'ADMIN' ? { ...u, status: 'APPROVED' as const } : u));
  saveToStorage(updated);
  notifyUsersUpdated();
};

export const deleteUser = async (userId: string) => {
  const users = await getStoredUsers();
  const updated = users.filter((u) => u.id !== userId);
  saveToStorage(updated);
  notifyUsersUpdated();
};
