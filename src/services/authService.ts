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

const STORAGE_KEY = 'cfw500_user_accounts_v1';
const ADMIN_EMAIL = 'gildongledson@gmail.com';

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
    return { success: false, message: 'Este nome de usuário já está em uso.' };
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
};

export const deleteUser = (userId: string) => {
  const users = getStoredUsers();
  const filtered = users.filter((u: UserAccount) => u.id !== userId);
  saveUsers(filtered);
};