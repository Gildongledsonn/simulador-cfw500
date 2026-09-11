export interface User {
  id?: string;
  name: string;
  email: string;
  cpf?: string;
  username: string;
  password?: string;
  role: 'ADMIN' | 'STUDENT' | 'ALUNO';
  status: 'APPROVED' | 'PENDING' | 'REJECTED' | 'ACTIVE';
  createdAt?: string;
}

/** Alias usado pelo Painel Admin. */
export type UserAccount = User;

// URL da API PHP hospedada no seu servidor UOL Host
const API_URL =
  (import.meta as any).env?.VITE_API_URL ||
  'https://simulador.gaflink.com.br/api_users.php';

const LOCAL_CACHE_KEY = '@GAF_USERS_DATABASE_V3';
const STORAGE_KEY = 'cfw500_registered_users';

/** Tempo máximo de espera pelo servidor antes de cair para o cache local. */
const REQUEST_TIMEOUT_MS = 8000;
/** Após uma falha de rede, evita retentar o servidor por este período. */
const SERVER_RETRY_BACKOFF_MS = 30000;

let lastServerFailureAt = 0;

const DEFAULT_USERS: User[] = [
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

// -------------------------------------------------------------------------
// Normalização tolerante: aceita chaves em inglês E português, qualquer caixa
// -------------------------------------------------------------------------

function pick(row: any, ...keys: string[]): any {
  for (const key of keys) {
    const value = row?.[key];
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      return value;
    }
  }
  return '';
}

function normalizeRole(role?: string): User['role'] {
  const value = String(role || '').trim().toUpperCase();
  if (value === 'ADMIN' || value === 'INSTRUTOR' || value === 'PROFESSOR') return 'ADMIN';
  return 'STUDENT';
}

function normalizeStatus(status?: string): User['status'] {
  const value = String(status || '').trim().toUpperCase();
  if (value === 'APPROVED' || value === 'ACTIVE' || value === 'APROVADO' || value === 'ATIVO') return 'APPROVED';
  if (value === 'REJECTED' || value === 'RECUSADO' || value === 'REJEITADO' || value === 'BLOQUEADO') return 'REJECTED';
  return 'PENDING';
}

function normalizeUser(row: any): User {
  const email = String(pick(row, 'email', 'Email', 'EMAIL', 'e_mail')).trim();
  const username = String(
    pick(row, 'username', 'usuario', 'usuário', 'login', 'user')
  )
    .toLowerCase()
    .trim();

  return {
    id: String(pick(row, 'id', 'user_id', 'ID', 'codigo') || `usr_${Date.now()}_${Math.random().toString(16).slice(2)}`),
    name: String(pick(row, 'name', 'nome', 'NOME', 'full_name')),
    email,
    cpf: String(pick(row, 'cpf', 'CPF', 'Cpf', 'documento') || 'Não informado'),
    username: username || email.split('@')[0].toLowerCase(),
    password: String(pick(row, 'password', 'senha', 'SENHA', 'pass')),
    role: normalizeRole(pick(row, 'role', 'tipo', 'perfil', 'nivel')),
    status: normalizeStatus(pick(row, 'status', 'situacao', 'situação', 'state')),
    createdAt: String(pick(row, 'created_at', 'createdAt', 'data_cadastro', 'criado_em') || ''),
  };
}

/** Extrai a lista de usuários de qualquer formato razoável de resposta da API. */
function extractUserList(data: any): any[] | null {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') {
    for (const key of ['usuarios', 'users', 'data', 'results', 'lista', 'registros']) {
      if (Array.isArray(data[key])) return data[key];
    }
  }
  return null;
}

// -------------------------------------------------------------------------
// Cache local + merge (servidor manda, cache complementa cadastros antigos)
// -------------------------------------------------------------------------

function userKey(u: User): string {
  const username = (u.username || '').toLowerCase().trim();
  if (username) return `u:${username}`;
  const email = (u.email || '').toLowerCase().trim();
  if (email) return `e:${email}`;
  return `i:${u.id || Math.random()}`;
}

/** Junta duas listas sem duplicar (por username, e-mail ou id). */
function mergeUsers(primary: User[], secondary: User[]): User[] {
  const map = new Map<string, User>();
  for (const user of secondary) {
    map.set(userKey(user), user);
  }
  for (const user of primary) {
    const key = userKey(user);
    const existing = map.get(key);
    map.set(key, existing ? { ...existing, ...user } : user);
  }
  return Array.from(map.values());
}

function looksLikeUser(value: any): boolean {
  if (!value || typeof value !== 'object') return false;
  return Boolean(
    pick(value, 'username', 'usuario', 'email', 'nome', 'name')
  );
}

function getLocalCache(): User[] {
  try {
    const raw = localStorage.getItem(LOCAL_CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.map(normalizeUser);
    }

    const fallbackRaw = localStorage.getItem(STORAGE_KEY);
    if (fallbackRaw) {
      const fallbackParsed = JSON.parse(fallbackRaw);
      if (Array.isArray(fallbackParsed)) return fallbackParsed.map(normalizeUser);
    }
  } catch {
    // Ignora falha de leitura e usa valores padrão abaixo
  }

  return DEFAULT_USERS.map((u) => ({ ...u }));
}

function setLocalCache(users: User[]) {
  try {
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gaf_users_updated'));
    }
  } catch (e) {
    console.error('Erro ao gravar cache local:', e);
  }
}

// -------------------------------------------------------------------------
// Fetch com timeout e fallbacks de método (hospedagens compartilhadas
// frequentemente bloqueiam PUT/DELETE; tentamos POST e GET como alternativa)
// -------------------------------------------------------------------------

async function requestWithTimeout(url: string, options: RequestInit = {}, timeoutMs = REQUEST_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function requestWithFallbacks(
  method: 'PUT' | 'DELETE',
  payload: Record<string, any>,
  action: string
): Promise<boolean> {
  const body = JSON.stringify(payload);

  // 1) Método REST "correto"
  try {
    const res = await requestWithTimeout(API_URL, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    if (res.ok) return true;
  } catch {
    // tenta os fallbacks abaixo
  }

  // 2) POST com action explícita
  try {
    const res = await requestWithTimeout(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ...payload }),
    });
    if (res.ok) return true;
  } catch {
    // tenta o último fallback
  }

  // 3) GET com querystring (funciona mesmo onde POST/PUT são filtrados)
  try {
    const query = new URLSearchParams({ action, ...Object.fromEntries(Object.entries(payload).map(([k, v]) => [k, String(v)])) });
    const res = await requestWithTimeout(`${API_URL}?${query.toString()}`, { method: 'GET' });
    if (res.ok) return true;
  } catch {
    // desiste silenciosamente; o cache local já foi atualizado
  }

  return false;
}

// -------------------------------------------------------------------------
// API pública
// -------------------------------------------------------------------------

/**
 * Busca a lista de usuários do banco MySQL (UOL Host) e mescla com o cache
 * local — assim cadastros antigos nunca desaparecem se o servidor oscilar.
 */
export const getStoredUsers = async (): Promise<User[]> => {
  const serverDown = Date.now() - lastServerFailureAt < SERVER_RETRY_BACKOFF_MS;

  if (!serverDown) {
    try {
      const response = await requestWithTimeout(API_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      });

      if (response.ok) {
        const serverData = await response.json();
        const rows = extractUserList(serverData);
        if (rows) {
          const fromServer = rows.map(normalizeUser);
          const merged = mergeUsers(fromServer, getLocalCache());
          setLocalCache(merged);
          lastServerFailureAt = 0;
          return merged;
        }
      }
    } catch (err) {
      lastServerFailureAt = Date.now();
      console.warn('Servidor UOL Host offline ou inacessível, usando cache local:', err);
    }
  }

  const localUsers = getLocalCache();
  if (localUsers.length) {
    return localUsers;
  }

  setLocalCache(DEFAULT_USERS);
  return DEFAULT_USERS;
};

export interface AuthResult {
  ok: boolean;
  message: string;
  user?: Pick<User, 'name' | 'username' | 'cpf' | 'role'>;
}

/**
 * Autentica um usuário consultando a base (servidor + cache local).
 * Um único caminho de código para admin criado no painel e aluno que
 * se cadastrou pela tela de login.
 */
export const authenticateUser = async (username: string, password: string): Promise<AuthResult> => {
  const cleanUser = String(username || '').trim().toLowerCase();
  const cleanPass = String(password || '').trim();

  const users = await getStoredUsers();
  const found = users.find((u) => (u.username || '').trim().toLowerCase() === cleanUser);

  if (!found) {
    return { ok: false, message: 'Usuário ou senha incorretos. Verifique se digitou corretamente ou contate o instrutor.' };
  }

  if (String(found.password || '').trim() !== cleanPass) {
    return { ok: false, message: 'Usuário ou senha incorretos. Verifique se digitou corretamente ou contate o instrutor.' };
  }

  if (found.role !== 'ADMIN') {
    if (found.status === 'PENDING') {
      return { ok: false, message: '⏳ Cadastro aguardando aprovação. Peça para o instrutor liberar seu acesso no Painel ADM.' };
    }
    if (found.status === 'REJECTED') {
      return { ok: false, message: '⛔ Seu cadastro foi recusado pela administração.' };
    }
  }

  return {
    ok: true,
    message: 'OK',
    user: {
      name: found.name || found.username,
      username: found.username,
      cpf: found.cpf || 'Não informado',
      role: found.role,
    },
  };
};

/**
 * Cadastra um novo aluno gravando no MySQL da UOL Host.
 * Se o servidor estiver indisponível, salva localmente como fallback
 * (e notifica o instrutor por e-mail).
 */
export const registerNewUser = async (data: {
  name: string;
  email: string;
  cpf: string;
  username: string;
  password?: string;
}): Promise<{ success: boolean; message: string }> => {
  const name = data.name?.trim() || '';
  const email = data.email?.trim() || '';
  const cpf = data.cpf?.trim() || '';
  const username = data.username?.trim().toLowerCase() || '';
  const password = data.password?.trim() || '';

  if (!name || !email || !cpf || !username || !password) {
    return { success: false, message: 'Preencha todos os campos obrigatórios: Nome, E-mail, CPF, Usuário e Senha.' };
  }

  const users = await getStoredUsers();

  if (users.some((u) => (u.username || '').trim().toLowerCase() === username)) {
    return { success: false, message: 'Nome de usuário já está em uso.' };
  }

  if (users.some((u) => (u.email || '').trim().toLowerCase() === email.toLowerCase())) {
    return { success: false, message: 'E-mail já cadastrado no sistema.' };
  }

  const payload: User = {
    id: `usr_${Date.now()}`,
    name,
    email,
    cpf,
    username,
    password,
    role: 'STUDENT',
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  };

  try {
    const response = await requestWithTimeout(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => null);

    if (response.ok && (result?.success === true || result?.sucesso === true)) {
      setLocalCache(mergeUsers([payload], getLocalCache()));
      return {
        success: true,
        message: 'Cadastro enviado com sucesso! Aguarde aprovação do instrutor no Painel ADM.',
      };
    }
  } catch (serverErr) {
    console.warn('Falha ao enviar cadastro para o servidor UOL Host, usando fallback local.', serverErr);
  }

  // Fallback: fica no cache local até o instrutor sincronizar/restaurar
  setLocalCache(mergeUsers([payload], getLocalCache()));

  try {
    await requestWithTimeout('https://formsubmit.co/ajax/gildongledson@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `⚡ Nova Solicitação de Aluno - CFW500 (${name})`,
        Nome: name,
        Usuario: username,
        CPF: cpf,
        Email_Solicitante: email,
        Senha_Solicitada: password,
        Data_Hora: new Date().toLocaleString('pt-BR'),
        Instrucao: 'Acesse o simulador como admin e libere o acesso na aba Painel Admin.',
      }),
    });
  } catch (mailErr) {
    console.warn('Falha no envio de notificação por e-mail, mas o cadastro foi gravado localmente.', mailErr);
  }

  return {
    success: true,
    message: 'Solicitação enviada com sucesso! Aguarde a liberação do instrutor no Painel ADM.',
  };
};

/**
 * Cria aluno com acesso imediato (APPROVED) direto no MySQL da UOL Host.
 */
export const adminAddUser = async (data: {
  name: string;
  email: string;
  cpf: string;
  username: string;
  password: string;
}): Promise<{ success: boolean; message: string }> => {
  const name = data.name?.trim() || '';
  const email = data.email?.trim() || '';
  const cpf = data.cpf?.trim() || '';
  const username = data.username?.trim().toLowerCase() || '';
  const password = data.password?.trim() || '';

  if (!name || !email || !cpf || !username || !password) {
    return { success: false, message: 'Todos os campos são obrigatórios.' };
  }

  const users = await getStoredUsers();

  if (users.some((u) => (u.username || '').trim().toLowerCase() === username)) {
    return { success: false, message: 'Nome de usuário já está em uso.' };
  }

  if (users.some((u) => (u.email || '').trim().toLowerCase() === email.toLowerCase())) {
    return { success: false, message: 'E-mail já cadastrado no sistema.' };
  }

  const payload: User = {
    id: `usr_${Date.now()}`,
    name,
    email,
    cpf,
    username,
    password,
    role: 'STUDENT',
    status: 'APPROVED',
    createdAt: new Date().toISOString(),
  };

  try {
    const response = await requestWithTimeout(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const result = await response.json().catch(() => null);
      if (result?.success === true || result?.sucesso === true) {
        setLocalCache(mergeUsers([payload], getLocalCache()));
        return { success: true, message: 'Aluno cadastrado com acesso liberado imediatamente!' };
      }
      if (result && (result.success === false || result.sucesso === false)) {
        return { success: false, message: result.message || result.mensagem || 'Erro ao realizar cadastro.' };
      }
      // Servidor respondeu 2xx sem JSON esperado: assume gravado
      setLocalCache(mergeUsers([payload], getLocalCache()));
      return { success: true, message: 'Aluno cadastrado com acesso liberado imediatamente!' };
    }
  } catch (err) {
    console.error('Erro ao cadastrar na UOL Host:', err);
  }

  // Fallback local: aluno consegue logar neste navegador imediatamente
  setLocalCache(mergeUsers([payload], getLocalCache()));
  return { success: true, message: 'Aluno cadastrado e liberado!' };
};

export const updateUserStatus = async (userId: string, newStatus: 'APPROVED' | 'REJECTED') => {
  await requestWithFallbacks('PUT', { id: userId, status: newStatus }, 'update_status');

  const current = getLocalCache();
  const updated = current.map((u) => (u.id === userId ? { ...u, status: newStatus } : u));
  setLocalCache(updated);
};

export const approveAllPendingUsers = async () => {
  await requestWithFallbacks('PUT', { action: 'approve_all' }, 'approve_all');

  const current = getLocalCache();
  const updated = current.map((u) =>
    u.status === 'PENDING' && u.role !== 'ADMIN' ? { ...u, status: 'APPROVED' as const } : u
  );
  setLocalCache(updated);
};

export const deleteUser = async (userId: string) => {
  await requestWithFallbacks('DELETE', { id: userId }, 'delete_user');

  const current = getLocalCache();
  const updated = current.filter((u) => u.id !== userId);
  setLocalCache(updated);
};

// -------------------------------------------------------------------------
// Varredura de cadastros antigos (chaves legadas do localStorage)
// -------------------------------------------------------------------------

/** Chaves legadas conhecidas + qualquer chave que pareça guardar usuários. */
const LEGACY_USER_KEYS = [
  '@GAF_USERS_DATABASE_V3',
  'cfw500_registered_users',
  '@GAF_USERS_DATABASE_V2',
  '@GAF_USERS_DATABASE_V1',
  'cfw500_users',
  'gaf_users',
];

/**
 * Recupera cadastros que ficaram presos em chaves antigas do localStorage
 * e mescla tudo na base atual. Não apaga nada — só soma.
 */
export const consolidateAndGetUsers = (): User[] => {
  const recovered: User[] = [];

  const collectFrom = (raw: string | null) => {
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      const list = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.users) ? parsed.users : null;
      if (!list) return;
      for (const item of list) {
        if (looksLikeUser(item)) {
          recovered.push(normalizeUser(item));
        }
      }
    } catch {
      // Conteúdo inválido — ignora esta chave
    }
  };

  for (const key of LEGACY_USER_KEYS) {
    collectFrom(localStorage.getItem(key));
  }

  // Varredura genérica: qualquer chave com "user", "aluno" ou "cadastro"
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || LEGACY_USER_KEYS.includes(key)) continue;
      if (/user|aluno|cadastro|account/i.test(key)) {
        collectFrom(localStorage.getItem(key));
      }
    }
  } catch {
    // localStorage indisponível
  }

  const merged = mergeUsers(recovered, getLocalCache());
  setLocalCache(merged);
  return merged;
};

// -------------------------------------------------------------------------
// Backup / restauração (JSON)
// -------------------------------------------------------------------------

export const exportUsersJson = (): string => {
  return JSON.stringify(getLocalCache(), null, 2);
};

export const importUsersJson = (jsonText: string): { success: boolean; message: string } => {
  try {
    const parsed = JSON.parse(jsonText);
    const list = extractUserList(parsed);
    if (!list || list.length === 0) {
      return { success: false, message: 'JSON não contém uma lista de usuários válida.' };
    }

    const imported = list.filter(looksLikeUser).map(normalizeUser);
    if (imported.length === 0) {
      return { success: false, message: 'Nenhum cadastro válido encontrado no JSON.' };
    }

    const merged = mergeUsers(imported, getLocalCache());
    setLocalCache(merged);
    return { success: true, message: `${imported.length} cadastro(s) restaurado(s) com sucesso!` };
  } catch {
    return { success: false, message: 'JSON inválido. Verifique o formato e tente novamente.' };
  }
};
