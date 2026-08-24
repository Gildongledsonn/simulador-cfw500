export interface UserAccount {
  id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'STUDENT';
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  requestedAt: string;
}

const STORAGE_KEY = 'cfw500_user_accounts_v5';
const ADMIN_EMAIL = 'gildongledson@gmail.com';

// Endpoint em nuvem público e persistente
const CLOUD_API_URL = 'https://api.jsonstorage.net/v1/json/00000000-0000-0000-0000-000000000000/cfw500_gaflink_auth_db';

const INITIAL_USERS: UserAccount[] = [
  {
    id: 'admin_1',
    username: 'admin',
    name: 'Gildon Gledson (Instrutor)',
    email: 'gildongledson@gmail.com',
    password: '123',
    role: 'ADMIN',
    status: 'APPROVED',
    requestedAt: new Date().toLocaleDateString('pt-BR'),
  },
  {
    id: 'student_demo',
    username: 'aluno',
    name: 'Aluno Demonstração',
    email: 'aluno@gaflink.com.br',
    password: '123',
    role: 'STUDENT',
    status: 'APPROVED',
    requestedAt: new Date().toLocaleDateString('pt-BR'),
  },
];

export const getStoredUsers = (): UserAccount[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_USERS;
  }
};

export const saveUsers = (users: UserAccount[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  window.dispatchEvent(new Event('auth_users_updated'));
};

// Sincroniza e busca cadastros atualizados na nuvem
export const fetchCloudUsers = async (): Promise<UserAccount[]> => {
  try {
    const res = await fetch(CLOUD_API_URL, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      const cloudData = await res.json();
      const cloudUsers: UserAccount[] = Array.isArray(cloudData)
        ? cloudData
        : cloudData?.users || [];

      if (cloudUsers.length > 0) {
        const localUsers = getStoredUsers();
        const map = new Map<string, UserAccount>();

        localUsers.forEach((u) => map.set(u.username.toLowerCase(), u));

        // Dados da nuvem atualizados pelo Admin sobrepõem o estado local
        cloudUsers.forEach((u) => {
          map.set(u.username.toLowerCase(), u);
        });

        const merged = Array.from(map.values());
        saveUsers(merged);
        return merged;
      }
    }
  } catch (err) {
    console.warn('Sincronização offline, utilizando registros locais:', err);
  }
  return getStoredUsers();
};

export const pushCloudUsers = async (users: UserAccount[]): Promise<void> => {
  try {
    await fetch(CLOUD_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ users }),
    });
  } catch (err) {
    console.warn('Erro ao sincronizar com nuvem:', err);
  }
};

// Autenticação direta com consulta em nuvem em tempo real
export const authenticateUser = async (
  usernameInput: string,
  passwordInput: string
): Promise<{ success: boolean; user?: UserAccount; message?: string }> => {
  // 1. Busca sempre a lista atualizada com as aprovações mais recentes do Admin
  const users = await fetchCloudUsers();

  const user = users.find(
    (u) =>
      u.username.toLowerCase() === usernameInput.trim().toLowerCase() &&
      u.password === passwordInput
  );

  if (!user) {
    return { success: false, message: 'Usuário ou senha inválidos. Verifique suas credenciais.' };
  }

  if (user.status === 'PENDING') {
    return {
      success: false,
      message: 'Seu cadastro está aguardando autorização do instrutor. Tente novamente em instantes.',
    };
  }

  if (user.status === 'REJECTED') {
    return {
      success: false,
      message: 'Sua solicitação de acesso não foi aprovada pelo instrutor.',
    };
  }

  return { success: true, user };
};

// Cadastro manual feito pelo Admin no painel
export const adminAddUser = async (user: {
  name: string;
  username: string;
  email: string;
  password: string;
}): Promise<{ success: boolean; message: string }> => {
  const users = await fetchCloudUsers();

  const exists = users.some(
    (u) => u.username.toLowerCase() === user.username.trim().toLowerCase()
  );
  if (exists) {
    return { success: false, message: 'Este nome de usuário já está cadastrado.' };
  }

  const newUser: UserAccount = {
    id: `admin_user_${Date.now()}`,
    name: user.name.trim(),
    username: user.username.trim().toLowerCase(),
    email: user.email.trim().toLowerCase(),
    password: user.password,
    role: 'STUDENT',
    status: 'APPROVED',
    requestedAt: new Date().toLocaleDateString('pt-BR'),
  };

  const updated = [...users, newUser];
  saveUsers(updated);
  await pushCloudUsers(updated);

  return { success: true, message: 'Aluno cadastrado e liberado com sucesso!' };
};

// Solicitação de cadastro pelo aluno na tela de login
export const requestRegistration = async (newUser: {
  username: string;
  name: string;
  email: string;
  password: string;
}): Promise<{ success: boolean; message: string }> => {
  const users = await fetchCloudUsers();

  const userExists = users.some(
    (u) => u.username.toLowerCase() === newUser.username.trim().toLowerCase()
  );
  if (userExists) {
    return { success: false, message: 'Este nome de usuário já está em uso.' };
  }

  const userRecord: UserAccount = {
    id: `user_${Date.now()}`,
    username: newUser.username.trim().toLowerCase(),
    name: newUser.name.trim(),
    email: newUser.email.trim().toLowerCase(),
    password: newUser.password,
    role: 'STUDENT',
    status: 'PENDING',
    requestedAt: new Date().toLocaleString('pt-BR'),
  };

  const updated = [...users, userRecord];
  saveUsers(updated);
  await pushCloudUsers(updated);

  // Disparo de notificação por e-mail para o instrutor
  try {
    fetch('https://formsubmit.co/ajax/' + ADMIN_EMAIL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `⚡ Nova Solicitação de Aluno - CFW500 (${userRecord.name})`,
        Nome: userRecord.name,
        Usuario: userRecord.username,
        Email_Solicitante: userRecord.email,
        Senha_Solicitada: userRecord.password,
        Data_Hora: userRecord.requestedAt,
        Painel: 'https://simulador.gaflink.com.br',
      }),
    }).catch(() => {});
  } catch (err) {
    console.warn('Erro ao enviar e-mail:', err);
  }

  return {
    success: true,
    message: 'Solicitação cadastrada! O instrutor foi notificado para aprovação.',
  };
};

export const updateUserStatus = async (userId: string, newStatus: 'APPROVED' | 'REJECTED') => {
  const users = getStoredUsers();
  const updated = users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u));
  saveUsers(updated);
  await pushCloudUsers(updated);
};

export const deleteUser = async (userId: string) => {
  const users = getStoredUsers();
  const filtered = users.filter((u) => u.id !== userId);
  saveUsers(filtered);
  await pushCloudUsers(filtered);
};