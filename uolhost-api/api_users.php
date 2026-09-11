<?php
/**
 * API de usuários — publique este arquivo fora de qualquer diretório público
 * de backup. Configure as credenciais reais em config.php (não versionar).
 */
declare(strict_types=1);

require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
header('X-Frame-Options: DENY');
header('Referrer-Policy: no-referrer');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && in_array($origin, ALLOWED_ORIGINS, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
}
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

function respond(int $status, array $payload): void { http_response_code($status); echo json_encode($payload, JSON_UNESCAPED_UNICODE); exit; }
function input(): array {
    $raw = file_get_contents('php://input');
    $json = $raw ? json_decode($raw, true) : [];
    if (!is_array($json) || json_last_error() !== JSON_ERROR_NONE) respond(400, ['success'=>false, 'message'=>'JSON inválido.']); return $json;
}
function clean(string $value): string { return trim($value); }
function publicUser(array $u): array {
    return ['id'=>(string)$u['id'], 'name'=>$u['name'], 'email'=>$u['email'], 'cpf'=>$u['cpf'], 'username'=>$u['username'], 'role'=>$u['role'], 'status'=>$u['status'], 'createdAt'=>$u['created_at']];
}
function tokenFor(array $user): string {
    $body = rtrim(strtr(base64_encode(json_encode(['id'=>(int)$user['id'], 'role'=>$user['role'], 'exp'=>time()+TOKEN_TTL])), '+/', '-_'), '=');
    $signature = hash_hmac('sha256', $body, APP_TOKEN_SECRET, true);
    return $body . '.' . rtrim(strtr(base64_encode($signature), '+/', '-_'), '=');
}
function currentUser(PDO $db): array {
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (!preg_match('/^Bearer\s+(.+)$/i', $header, $m)) respond(401, ['success'=>false, 'message'=>'Autenticação obrigatória.']);
    [$body, $signature] = array_pad(explode('.', $m[1], 2), 2, '');
    $expected = rtrim(strtr(base64_encode(hash_hmac('sha256', $body, APP_TOKEN_SECRET, true)), '+/', '-_'), '=');
    $payload = json_decode(base64_decode(strtr($body, '-_', '+/')), true);
    if (!$body || !hash_equals($expected, $signature) || !is_array($payload) || ($payload['exp'] ?? 0) <= time()) respond(401, ['success'=>false, 'message'=>'Sessão inválida ou expirada.']);
    $q = $db->prepare('SELECT * FROM users WHERE id = ?'); $q->execute([(int)$payload['id']]);
    $user = $q->fetch();
    if (!$user) respond(401, ['success'=>false, 'message'=>'Usuário não encontrado.']);
    if ($user['status'] !== 'APPROVED') respond(401, ['success'=>false, 'message'=>'Seu acesso não está liberado.']);
    return $user;
}
function requireAdmin(PDO $db): array { $u = currentUser($db); if ($u['role'] !== 'ADMIN') respond(403, ['success'=>false, 'message'=>'Acesso restrito ao administrador.']); return $u; }
function passwordOk(string $p): bool { return strlen($p) >= 8 && strlen($p) <= 72; }
function validateRegistration(array $data): void {
    foreach (['name','email','cpf','username','password'] as $field) {
        if (!isset($data[$field]) || !is_string($data[$field])) respond(422, ['success'=>false, 'message'=>'Preencha todos os campos corretamente.']);
    }
    if (strlen(trim($data['name'])) > 150 || strlen(trim($data['email'])) > 190 || strlen(trim($data['cpf'])) > 20 || !passwordOk($data['password']) || strpos($data['password'], "\0") !== false) respond(422, ['success'=>false, 'message'=>'Verifique os dados. A senha deve ter entre 8 e 72 bytes.']);
}
function targetStudent(PDO $db, array $data): int {
    $id = filter_var($data['id'] ?? null, FILTER_VALIDATE_INT, ['options'=>['min_range'=>1]]);
    if (!$id) respond(422, ['success'=>false, 'message'=>'Identificador inválido.']);
    $q = $db->prepare('SELECT role FROM users WHERE id = ?'); $q->execute([$id]); $user = $q->fetch();
    if (!$user) respond(404, ['success'=>false, 'message'=>'Usuário não encontrado.']);
    if ($user['role'] === 'ADMIN') respond(403, ['success'=>false, 'message'=>'Esta operação não pode alterar administradores.']);
    return $id;
}

try {
    $db = new PDO(DB_DSN, DB_USER, DB_PASSWORD, [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES=>false]);
    $method = $_SERVER['REQUEST_METHOD']; $data = input(); $action = $data['action'] ?? ($_GET['action'] ?? '');

    if ($method === 'POST' && $action === 'login') {
        $username = strtolower(clean((string)($data['username'] ?? ''))); $password = (string)($data['password'] ?? '');
        $q = $db->prepare('SELECT * FROM users WHERE username = ? LIMIT 1'); $q->execute([$username]); $user = $q->fetch();
        if (!$user || !password_verify($password, $user['password_hash'])) respond(401, ['success'=>false, 'message'=>'Usuário ou senha incorretos.']);
        if ($user['status'] !== 'APPROVED') respond(403, ['success'=>false, 'message'=>'Seu cadastro ainda não está liberado.']);
        respond(200, ['success'=>true, 'user'=>publicUser($user), 'token'=>tokenFor($user)]);
    }

    if ($method === 'POST' && ($action === 'register' || $action === '')) {
        validateRegistration($data);
        $name=clean((string)($data['name'] ?? '')); $email=filter_var(clean((string)($data['email'] ?? '')), FILTER_VALIDATE_EMAIL);
        $cpf=clean((string)($data['cpf'] ?? '')); $username=strtolower(clean((string)($data['username'] ?? ''))); $password=(string)($data['password'] ?? '');
        if (!$name || !$email || !$cpf || !preg_match('/^[a-z0-9._-]{3,60}$/', $username) || !passwordOk($password)) respond(422, ['success'=>false, 'message'=>'Dados inválidos. A senha deve ter pelo menos 8 caracteres.']);
        $q=$db->prepare('INSERT INTO users (name,email,cpf,username,password_hash,role,status) VALUES (?,?,?,?,?,"STUDENT","PENDING")');
        $q->execute([$name,$email,$cpf,$username,password_hash($password, PASSWORD_DEFAULT)]);
        respond(201, ['success'=>true, 'message'=>'Cadastro enviado. Aguarde a aprovação.']);
    }

    if ($method === 'GET' && $action === 'me') respond(200, ['success'=>true, 'user'=>publicUser(currentUser($db))]);
    if ($method === 'GET' && in_array($action, ['', 'list'], true)) {
        requireAdmin($db); $rows=$db->query('SELECT id,name,email,cpf,username,role,status,created_at FROM users ORDER BY created_at DESC')->fetchAll();
        respond(200, ['success'=>true, 'users'=>array_map('publicUser', $rows)]);
    }

    if ($method === 'POST' && $action === 'admin_create') {
        requireAdmin($db); $data['action']='register'; $data['status']='APPROVED';
        validateRegistration($data);
        $name=clean((string)($data['name'] ?? '')); $email=filter_var(clean((string)($data['email'] ?? '')), FILTER_VALIDATE_EMAIL); $cpf=clean((string)($data['cpf'] ?? '')); $username=strtolower(clean((string)($data['username'] ?? ''))); $password=(string)($data['password'] ?? '');
        if (!$name || !$email || !$cpf || !preg_match('/^[a-z0-9._-]{3,60}$/', $username) || !passwordOk($password)) respond(422, ['success'=>false,'message'=>'Dados inválidos.']);
        $q=$db->prepare('INSERT INTO users (name,email,cpf,username,password_hash,role,status) VALUES (?,?,?,?,?,"STUDENT","APPROVED")'); $q->execute([$name,$email,$cpf,$username,password_hash($password,PASSWORD_DEFAULT)]); respond(201,['success'=>true]);
    }

    if (($method === 'PUT' || $method === 'POST') && in_array($action, ['update_status','approve_all'], true)) {
        requireAdmin($db);
        if ($action === 'update_status') $data['id'] = targetStudent($db, $data);
        if ($action === 'approve_all') { $db->exec("UPDATE users SET status='APPROVED' WHERE status='PENDING' AND role <> 'ADMIN'"); }
        else { $status=strtoupper((string)($data['status'] ?? '')); if (!in_array($status,['APPROVED','REJECTED'],true)) respond(422,['success'=>false,'message'=>'Status inválido.']); $q=$db->prepare('UPDATE users SET status=? WHERE id=? AND role <> "ADMIN"'); $q->execute([$status,(int)($data['id'] ?? 0)]); }
        respond(200,['success'=>true]);
    }
    if (($method === 'DELETE' || $method === 'POST') && $action === 'delete_user') { requireAdmin($db); $id = targetStudent($db, $data); $q=$db->prepare('DELETE FROM users WHERE id=? AND role <> "ADMIN"'); $q->execute([$id]); respond(200,['success'=>true]); }
    respond(405, ['success'=>false, 'message'=>'Operação não permitida.']);
} catch (PDOException $e) {
    if ($e->getCode() === '23000') respond(409, ['success'=>false, 'message'=>'Usuário ou e-mail já cadastrado.']);
    error_log('api_users database error: '.$e->getMessage()); respond(500, ['success'=>false, 'message'=>'Erro interno no servidor.']);
} catch (Throwable $e) {
    error_log('api_users error: '.$e->getMessage()); respond(500, ['success'=>false, 'message'=>'Erro interno no servidor.']);
}
