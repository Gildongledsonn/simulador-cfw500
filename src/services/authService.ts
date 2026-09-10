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

const PRIMARY_KEY = '@GAF_USERS_DATABASE_V3';
const KNOWN_KEYS = [
  '@GAF_USERS_DATABASE_V3',
  '@GAF_USERS_DATABASE_V2',
  '@GAF_USERS_DATABASE_V1',
  '@GAF_USERS_DATABASE',
  'cfw500_users_database',
  'cfw500_auth_users',
  'cfw500_users',
  'users_db',
  'users',
];

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
};

/**
 * Salva a lista de usuários em múltiplas chaves para nunca mais perder cadastros.
 */
function persistUsers(users: UserAccount[]) {
  try {
    const serialized = JSON.stringify(users);
    localStorage.setItem(PRIMARY_KEY, serialized);
    localStorage.setItem('@GAF_USERS_DATABASE_V2', serialized);
    localStorage.setItem('@GAF_USERS_DATABASE', serialized);
    localStorage.setItem('cfw500_users_database', serialized);
  } catch (e) {
    console.error('Erro ao persistir usuários:', e);
  }
}

function notifyChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('gaf_users_updated'));
  }
}

/**
 * Faz uma busca profunda em todo o localStorage do navegador,
 * resgatando qualquer usuário cadastrado no passado e fundindo com os atuais.
 */
export const consolidateAndGetUsers = (): UserAccount[] => {
  const userMap = new Map<string, UserAccount>();

  // 1. Carrega os usuários padrão fundamentais
  getInitialUsers().forEach((u) => {
    userMap.set(u.username.toLowerCase().trim(), u);
  });

  try {
    // 2. Varre chaves conhecidas
    const keysToCheck = new Set<string>(KNOWN_KEYS);

    // 3. Adiciona qualquer outra chave do localStorage que possa conter usuários
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.includes('user') || k.includes('GAF') || k.includes('aluno'))) {
        keysToCheck.add(k);
      }
    }

    keysToCheck.forEach((key) => {
      // Ignora chave de sessão do usuário logado
      if (key === 'cfw500_auth_user') return;

      const raw = localStorage.getItem(key);
      if (!raw) return;

      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          parsed.forEach((item: any) => {
            if (item && typeof item === 'object') {
              const rawUsername = item.username || item.login || item.user;
              if (rawUsername && typeof rawUsername === 'string') {
                const cleanUname = rawUsername.toLowerCase().trim();
                const existing = userMap.get(cleanUname);

                // Sanitização completa: garante que nenhum campo seja undefined
                userMap.set(cleanUname, {
                  id: String(item.id || existing?.id || `usr_${Date.now()}_${Math.random()}`),
                  name: String(item.name || item.nome || existing?.name || cleanUname),
                  email: String(item.email || existing?.email || ''),
                  cpf: String(item.cpf || existing?.cpf || 'Não informado'),
                  username: cleanUname,
                  password: String(item.password || item.senha || existing?.password || '123'),
                  role: item.role === 'ADMIN' ? 'ADMIN' : (existing?.role || 'STUDENT'),
                  status:
                    item.status === 'APPROVED'
                      ? 'APPROVED'
                      : item.status === 'REJECTED'
                      ? 'REJECTED'
                      : (existing?.status || 'PENDING'),
                  createdAt: String(item.createdAt || existing?.createdAt || new Date().toISOString().split('T')[0]),
                });
              }
            }
          });
        }
      } catch {
        // Ignora valores não-JSON
      }
    });
  } catch (err) {
    console.warn('Falha durante a consolidação de usuários:', err);
  }

  const allUsers = Array.from(userMap.values());

  // Ordena: Alunos PENDENTES primeiro, depois os mais novos
  allUsers.sort((a, b) => {
    if (a.status === 'PENDING' && b.status !== 'PENDING') return -1;
    if (b.status === 'PENDING' && a.status !== 'PENDING') return 1;
    return 0;
  });

  persistUsers(allUsers);
  return allUsers;
};

export const getStoredUsers = async (): Promise<UserAccount[]> => {
  return consolidateAndGetUsers();
};

export const registerNewUser = async (data: {
  name: string;
  email: string;
  cpf: string;
  username: string;
  password?: string;
}): Promise<{ success: boolean; message: string }> => {
  if (
    !data.name?.trim() ||
    !data.email?.trim() ||
    !data.cpf?.trim() ||
    !data.username?.trim() ||
    !data.password?.trim()
  ) {
    return {
      success: false,
      message: 'Todos os campos são obrigatórios: Nome completo, E-mail, CPF, Usuário e Senha.',
    };
  }

  // Consolida o banco antes de registrar
  const currentUsers = consolidateAndGetUsers();
  const cleanUsername = data.username.toLowerCase().trim();

  if (currentUsers.some((u) => u.username.toLowerCase().trim() === cleanUsername)) {
    return { success: false, message: 'Este nome de usuário já está cadastrado. Escolha outro.' };
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
    createdAt: new Date().toISOString().split('T')[0],
  };

  // Insere imediatamente no topo
  const updatedList = [newUser, ...currentUsers];
  persistUsers(updatedList);
  notifyChange();

  return {
    success: true,
    message: 'Cadastro realizado com sucesso! Aguarde a aprovação do instrutor para acessar o simulador.',
  };
};

export const adminAddUser = async (data: {
  name: string;
  email: string;
  cpf: string;
  username: string;
  password: string;
}): Promise<{ success: boolean; message: string }> => {
  if (
    !data.name?.trim() ||
    !data.email?.trim() ||
    !data.cpf?.trim() ||
    !data.username?.trim() ||
    !data.password?.trim()
  ) {
    return { success: false, message: 'Todos os campos são obrigatórios.' };
  }

  const currentUsers = consolidateAndGetUsers();
  const cleanUsername = data.username.toLowerCase().trim();

  if (currentUsers.some((u) => u.username.toLowerCase().trim() === cleanUsername)) {
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
    createdAt: new Date().toISOString().split('T')[0],
  };

  const updatedList = [newUser, ...currentUsers];
  persistUsers(updatedList);
  notifyChange();

  return { success: true, message: 'Aluno cadastrado com acesso liberado imediatamente!' };
};

export const updateUserStatus = async (userId: string, newStatus: 'APPROVED' | 'REJECTED') => {
  const currentUsers = consolidateAndGetUsers();
  const updated = currentUsers.map((u) => (u.id === userId ? { ...u, status: newStatus } : u));
  persistUsers(updated);
  notifyChange();
};

export const approveAllPendingUsers = async () => {
  const currentUsers = consolidateAndGetUsers();
  const updated = currentUsers.map((u) =>
    u.status === 'PENDING' && u.role !== 'ADMIN' ? { ...u, status: 'APPROVED' as const } : u
  );
  persistUsers(updated);
  notifyChange();
};

export const deleteUser = async (userId: string) => {
  const currentUsers = consolidateAndGetUsers();
  const updated = currentUsers.filter((u) => u.id !== userId);
  persistUsers(updated);
  notifyChange();
};

/**
 * Exporta a lista de usuários em formato JSON para backup.
 */
export const exportUsersJson = (): string => {
  const users = consolidateAndGetUsers();
  return JSON.stringify(users, null, 2);
};

/**
 * Importa uma lista de usuários em formato JSON restaurando cadastros.
 */
export const importUsersJson = (jsonString: string): { success: boolean; count: number; message: string } => {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      return { success: false, count: 0, message: 'O arquivo informado não contém uma lista válida de alunos.' };
    }

    const currentUsers = consolidateAndGetUsers();
    const map = new Map<string, UserAccount>();

    currentUsers.forEach((u) => map.set(u.username.toLowerCase().trim(), u));

    let importedCount = 0;
    parsed.forEach((item: any) => {
      if (item && item.username) {
        const uName = String(item.username).toLowerCase().trim();
        map.set(uName, {
          id: String(item.id || `usr_${Date.now()}_${Math.random()}`),
          name: String(item.name || item.nome || uName),
          email: String(item.email || ''),
          cpf: String(item.cpf || 'Não informado'),
          username: uName,
          password: String(item.password || item.senha || '123'),
          role: item.role === 'ADMIN' ? 'ADMIN' : 'STUDENT',
          status: item.status === 'REJECTED' ? 'REJECTED' : item.status === 'PENDING' ? 'PENDING' : 'APPROVED',
          createdAt: String(item.createdAt || new Date().toISOString().split('T')[0]),
        });
        importedCount++;
      }
    });

    const merged = Array.from(map.values());
    persistUsers(merged);
    notifyChange();

    return { success: true, count: importedCount, message: `${importedCount} alunos importados com sucesso!` };
  } catch (err) {
    return { success: false, count: 0, message: 'Erro ao interpretar JSON de alunos.' };
  }
};
