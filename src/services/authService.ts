export interface User {
 id?: string; name: string; email: string; cpf?: string; username: string;
 role: 'ADMIN' | 'STUDENT' | 'ALUNO'; status: 'APPROVED' | 'PENDING' | 'REJECTED' | 'ACTIVE'; createdAt?: string;
}
export type UserAccount = User;
const API_URL = (import.meta as any).env?.VITE_API_URL || 'https://api.gaflink.com.br/api_users.php';
let snapshot: User[] = [];
export function clearSession() {
 localStorage.removeItem('gaf_auth_token');
 localStorage.removeItem('cfw500_auth_user');
 snapshot = [];
 window.dispatchEvent(new Event('gaf_session_ended'));
}
async function request(action: string, data?: Record<string, unknown>, authenticated = true) {
 const controller = new AbortController();
 const timer = setTimeout(() => controller.abort(), 10000);
 try {
  const token = localStorage.getItem('gaf_auth_token');
  const response = await fetch(data ? API_URL : API_URL + '?action=' + action, {
   method: data ? 'POST' : 'GET', cache: 'no-store', signal: controller.signal,
   headers: { 'Content-Type': 'application/json', ...(authenticated && token ? { Authorization: 'Bearer ' + token } : {}) },
   body: data ? JSON.stringify({ ...data, action }) : undefined,
  });
  const result = await response.json().catch(() => null);
  if (response.status === 401 && authenticated) clearSession();
  if (!response.ok || result?.success !== true) throw new Error(result?.message || 'O servidor não confirmou a operação. Tente novamente.');
  return result;
 } catch (error) {
  if (error instanceof TypeError || (error instanceof Error && error.name === 'AbortError')) throw new Error('Não foi possível acessar o servidor. Verifique sua conexão.');
  throw error;
 } finally { clearTimeout(timer); }
}
export async function getSessionUser(): Promise<User | null> {
 if (!localStorage.getItem('gaf_auth_token')) return null;
 return (await request('me')).user;
}
export async function getStoredUsers(): Promise<User[]> {
 const result = await request('list');
 if (!Array.isArray(result.users)) throw new Error('Lista de usuários inválida.');
 snapshot = result.users;
 return snapshot;
}
export interface AuthResult { ok: boolean; message: string; user?: User }
export async function authenticateUser(username: string, password: string): Promise<AuthResult> {
 clearSession();
 try {
  const result = await request('login', { username: username.trim().toLowerCase(), password }, false);
  if (!result.token || !result.user) throw new Error('Resposta de autenticação inválida.');
  localStorage.setItem('gaf_auth_token', result.token);
  return { ok: true, message: 'OK', user: result.user };
 } catch (error) { return { ok: false, message: (error as Error).message }; }
}
type Registration = { name: string; email: string; cpf: string; username: string; password?: string };
async function register(data: Registration, admin: boolean) {
 try {
  const result = await request(admin ? 'admin_create' : 'register', { ...data, name: data.name.trim(), email: data.email.trim().toLowerCase(), username: data.username.trim().toLowerCase() }, admin);
  return { success: true, message: result.message || (admin ? 'Aluno cadastrado com acesso liberado!' : 'Cadastro enviado. Aguarde aprovação do instrutor.') };
 } catch (error) { return { success: false, message: (error as Error).message }; }
}
export const registerNewUser = (data: Registration) => register(data, false);
export const adminAddUser = (data: Registration) => register(data, true);
export const updateUserStatus = (id: string, status: 'APPROVED' | 'REJECTED') => request('update_status', { id, status });
export const approveAllPendingUsers = () => request('approve_all', {});
export const deleteUser = (id: string) => request('delete_user', { id });
export const consolidateAndGetUsers = getStoredUsers;
export const exportUsersJson = () => JSON.stringify(snapshot, null, 2);
export const importUsersJson = (_text: string) => ({ success: false, message: 'Exportação para consulta. Para restaurar contas e senhas, restaure o backup MySQL no servidor.' });
