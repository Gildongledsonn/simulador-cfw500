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

const API_URL = 'https://gaflink.com.br/auth.php';

// Usuários locais de emergência (garantem que a plataforma sempre abra)
const LOCAL_FALLBACK_USERS: UserAccount[] = [
  {
    id: 'admin_master',
    username: 'admin',
    name: 'Gildon Gledson (Instrutor)',
    email: 'gildongledson@gmail.com',
    password: '123',
    role: 'ADMIN',
    status: 'APPROVED',
    requestedAt: 'Hoje',
  },
  {
    id: 'student_demo',
    username: 'aluno',
    name: 'Aluno Demonstração',
    email: 'aluno@gaflink.com.br',
    password: '123',
    role: 'STUDENT',
    status: 'APPROVED',
    requestedAt: 'Hoje',
  },
];

export const getStoredUsers = async (): Promise<UserAccount[]> => {
  try {
    const res = await fetch(`${API_URL}?action=list`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.users)) {
        return data.users;
      }
    }
  } catch (err) {
    console.warn('Servidor UOLHost offline ou sem resposta, usando fallback local:', err);
  }
  return LOCAL_FALLBACK_USERS;
};

export const authenticateUser = async (
  usernameInput: string,
  passwordInput: string
): Promise<{ success: boolean; user?: UserAccount; message?: string }> => {
  const u = usernameInput.trim().toLowerCase();
  const p = passwordInput.trim();

  // 1. Tenta autenticar diretamente no servidor UOLHost
  try {
    const res = await fetch(`${API_URL}?action=login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: u, password: p }),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('Falha na requisição ao UOLHost, tentando autenticação local:', err);
  }

  // 2. Fallback de Segurança Local (admin/123 e aluno/123)
  const localMatch = LOCAL_FALLBACK_USERS.find(
    (acc) => acc.username.toLowerCase() === u && acc.password === p
  );

  if (localMatch) {
    return { success: true, user: localMatch };
  }

  return {
    success: false,
    message: 'Usuário ou senha inválidos. Verifique suas credenciais.',
  };
};

export const requestRegistration = async (newUser: {
  username: string;
  name: string;
  email: string;
  password: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await fetch(`${API_URL}?action=register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: newUser.username.trim(),
        name: newUser.name.trim(),
        email: newUser.email.trim(),
        password: newUser.password.trim(),
      }),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Erro ao conectar ao UOLHost:', err);
  }

  return {
    success: false,
    message: 'Não foi possível conectar ao servidor. Tente novamente em instantes.',
  };
};

export const adminAddUser = async (user: {
  name: string;
  username: string;
  email: string;
  password: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await fetch(`${API_URL}?action=create_manual`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: user.name.trim(),
        username: user.username.trim(),
        email: user.email.trim(),
        password: user.password.trim(),
      }),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Erro ao salvar no UOLHost:', err);
  }

  return {
    success: false,
    message: 'Erro de comunicação com o servidor ao cadastrar aluno.',
  };
};

export const updateUserStatus = async (userId: string, newStatus: 'APPROVED' | 'REJECTED') => {
  try {
    await fetch(`${API_URL}?action=update_status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: userId, status: newStatus }),
    });
  } catch (err) {
    console.warn('Erro ao atualizar status:', err);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    await fetch(`${API_URL}?action=delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: userId }),
    });
  } catch (err) {
    console.warn('Erro ao excluir usuário:', err);
  }
};