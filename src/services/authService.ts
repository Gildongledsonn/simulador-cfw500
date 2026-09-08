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

const USERS_STORAGE_KEY = '@GAF_USERS_DATABASE_V3';

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

export const getStoredUsers = async (): Promise<UserAccount[]> => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      const initial = getInitialUsers();
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
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
  if (!data.name || !data.email || !data.cpf || !data.username || !data.password) {
    return { success: false, message: 'Preenchimento obrigatório: Nome completo, E-mail, CPF, Usuário e Senha são exigidos.' };
  }

  const users = await getStoredUsers();
  const cleanUsername = data.username.toLowerCase().trim();

  if (users.some((u) => u.username.toLowerCase() === cleanUsername)) {
    return { success: false, message: 'Este nome de usuário já está em uso.' };
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

  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  return { success: true, message: 'Cadastro realizado com sucesso! Aguarde a aprovação do instrutor para acessar.' };
};

export const adminAddUser = async (data: {
  name: string;
  email: string;
  cpf: string;
  username: string;
  password: string;
}): Promise<{ success: boolean; message: string }> => {
  if (!data.name || !data.email || !data.cpf || !data.username || !data.password) {
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

  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  return { success: true, message: 'Aluno cadastrado com acesso liberado!' };
};

export const updateUserStatus = async (userId: string, newStatus: 'APPROVED' | 'REJECTED') => {
  const users = await getStoredUsers();
  const updated = users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u));
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updated));
};

export const deleteUser = async (userId: string) => {
  const users = await getStoredUsers();
  const updated = users.filter((u) => u.id !== userId);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updated));
};