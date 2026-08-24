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
    console.warn('Erro ao conectar ao UOLHost:', err);
  }
  return [];
};

export const authenticateUser = async (
  usernameInput: string,
  passwordInput: string
): Promise<{ success: boolean; user?: UserAccount; message?: string }> => {
  try {
    const res = await fetch(`${API_URL}?action=login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: usernameInput.trim(),
        password: passwordInput.trim(),
      }),
    });

    const data = await res.json();
    return data;
  } catch {
    return {
      success: false,
      message: 'Erro ao conectar ao servidor de autenticação no UOLHost.',
    };
  }
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

    const data = await res.json();
    return data;
  } catch {
    return {
      success: false,
      message: 'Erro ao enviar cadastro para o servidor.',
    };
  }
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

    const data = await res.json();
    return data;
  } catch {
    return {
      success: false,
      message: 'Erro ao salvar aluno no UOLHost.',
    };
  }
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