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

const STORAGE_KEY = 'cfw500_user_accounts_v2';
const ADMIN_EMAIL = 'gildongledson@gmail.com';
const CLOUD_BIN_ID = 'cfw500-gaflink-auth-sync';

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

export const fetchCloudUsers = async (): Promise<UserAccount[]> => {
  try {
    const res = await fetch(`https://api.restful-api.dev/objects?id=${CLOUD_BIN_ID}`, {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json[0]?.data?.users) {
        const cloudUsers: UserAccount[] = json[0].data.users;
        const localUsers = getStoredUsers();

        const userMap = new Map<string, UserAccount>();
        localUsers.forEach((u) => userMap.set(u.username.toLowerCase(), u));
        cloudUsers.forEach((u) => {
          if (!userMap.has(u.username.toLowerCase())) {
            userMap.set(u.username.toLowerCase(), u);
          } else {
            const existing = userMap.get(u.username.toLowerCase())!;
            if (u.status !== existing.status) {
              userMap.set(u.username.toLowerCase(), { ...existing, status: u.status });
            }
          }
        });

        const merged = Array.from(userMap.values());
        saveUsers(merged);
        return merged;
      }
    }
  } catch (err) {
    console.warn('Sincronização em nuvem offline, usando dados locais:', err);
  }
  return getStoredUsers();
};

export const pushCloudUsers = async (users: UserAccount[]) => {
  try {
    await fetch('https://api.restful-api.dev/objects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: CLOUD_BIN_ID,
        name: 'CFW500_AUTH_ACCOUNTS',
        data: { users },
      }),
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
  const users = getStoredUsers();

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

  users.push(userRecord);
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
    console.warn('Erro ao notificar via e-mail:', err);
  }

  return {
    success: true,
    message: 'Solicitação enviada com sucesso! O instrutor avaliará seu pedido.',
  };
};

export const updateUserStatus = (userId: string, newStatus: 'APPROVED' | 'REJECTED') => {
  const users = getStoredUsers();
  const updated = users.map((u: UserAccount) => (u.id === userId ? { ...u, status: newStatus } : u));
  saveUsers(updated);
  pushCloudUsers(updated);
};

export const deleteUser = (userId: string) => {
  const users = getStoredUsers();
  const filtered = users.filter((u: UserAccount) => u.id !== userId);
  saveUsers(filtered);
  pushCloudUsers(filtered);
};