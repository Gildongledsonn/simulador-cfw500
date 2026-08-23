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

const STORAGE_KEY = 'cfw500_user_accounts_v3';
const ADMIN_EMAIL = 'gildongledson@gmail.com';
const BACKUP_KV_URL = 'https://kvstore.p1k.org/cfw500_gaflink_users';

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

// Sincroniza e busca cadastros feitos em outros celulares/computadores
export const fetchCloudUsers = async (): Promise<UserAccount[]> => {
  try {
    const res = await fetch(BACKUP_KV_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const cloudUsers: UserAccount[] = await res.json();
      if (Array.isArray(cloudUsers) && cloudUsers.length > 0) {
        const localUsers = getStoredUsers();

        const map = new Map<string, UserAccount>();
        localUsers.forEach((u) => map.set(u.username.toLowerCase(), u));

        cloudUsers.forEach((u) => {
          const existing = map.get(u.username.toLowerCase());
          if (!existing) {
            map.set(u.username.toLowerCase(), u);
          } else {
            map.set(u.username.toLowerCase(), { ...existing, status: u.status });
          }
        });

        const merged = Array.from(map.values());
        saveUsers(merged);
        return merged;
      }
    }
  } catch (err) {
    console.warn('Falha na sincronização online, mantendo dados em cache:', err);
  }
  return getStoredUsers();
};

export const pushCloudUsers = async (users: UserAccount[]): Promise<void> => {
  try {
    await fetch(BACKUP_KV_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(users),
    });
  } catch (err) {
    console.warn('Erro ao salvar em nuvem:', err);
  }
};

export const requestRegistration = async (newUser: {
  username: string;
  name: string;
  email: string;
  password: string;
}): Promise<{ success: boolean; message: string }> => {
  let users = await fetchCloudUsers();

  const userExists = users.some(
    (u: UserAccount) => u.username.toLowerCase() === newUser.username.trim().toLowerCase()
  );
  if (userExists) {
    return { success: false, message: 'Este nome de usuário já está cadastrado.' };
  }

  const emailExists = users.some(
    (u: UserAccount) => u.email.toLowerCase() === newUser.email.trim().toLowerCase()
  );
  if (emailExists) {
    return { success: false, message: 'Este e-mail já possui uma solicitação de cadastro.' };
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

  users = [...users, userRecord];
  saveUsers(users);
  await pushCloudUsers(users);

  try {
    fetch('https://formsubmit.co/ajax/' + ADMIN_EMAIL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `⚡ Nova Solicitação de Acesso - Simulador CFW500 (${userRecord.name})`,
        Nome: userRecord.name,
        Usuario: userRecord.username,
        Email_Solicitante: userRecord.email,
        Data_Hora: userRecord.requestedAt,
        Painel_Admin: 'https://simulador.gaflink.com.br',
      }),
    }).catch(() => {});
  } catch (err) {
    console.warn('Erro ao disparar email:', err);
  }

  return {
    success: true,
    message: 'Solicitação enviada com sucesso! O instrutor avaliará seu pedido.',
  };
};

export const updateUserStatus = async (userId: string, newStatus: 'APPROVED' | 'REJECTED') => {
  const users = getStoredUsers();
  const updated = users.map((u: UserAccount) => (u.id === userId ? { ...u, status: newStatus } : u));
  saveUsers(updated);
  await pushCloudUsers(updated);
};

export const deleteUser = async (userId: string) => {
  const users = getStoredUsers();
  const filtered = users.filter((u: UserAccount) => u.id !== userId);
  saveUsers(filtered);
  await pushCloudUsers(filtered);
};