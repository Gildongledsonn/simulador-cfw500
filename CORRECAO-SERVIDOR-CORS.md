# Correção do Acesso de Alunos (CORS no servidor UOL Host)

## Diagnóstico

O painel e o login falham para usuários **novos e antigos** porque o front-end
(hospedado no GitHub Pages / outro domínio) chama a API em
`https://simulador.gaflink.com.br/api_users.php` em outro domínio, e o
**servidor PHP não envia os cabeçalhos CORS**. O navegador bloqueia todas as
requisições (`No 'Access-Control-Allow-Origin' header`), então:

- Cadastros feitos por alunos **nunca chegam ao banco MySQL** — ficam presos
  no localStorage do navegador do aluno (o instrutor nunca os vê no painel);
- Alunos criados pelo instrutor no painel ficam presos no localStorage do
  instrutor — **o aluno não consegue logar no computador dele**;
- Cada navegador acaba com uma base de usuários diferente.

> Prova: ao testar o app, o console mostra
> `Access to fetch at 'https://simulador.gaflink.com.br/api_users.php' from origin ... has been blocked by CORS policy`.

## Correção definitiva (no arquivo `api_users.php` da UOL Host)

Adicione isto **no topo** do `api_users.php`, antes de qualquer `echo`:

```php
<?php
// ===== CORS: permitir acesso de qualquer origem =====
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

// Responder pré-verificação (preflight) do navegador
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ... resto do código existente (conexão MySQL, GET/POST/PUT/DELETE) ...
```

Observações:

- `*` libera qualquer origem. Se preferir restringir, troque pela URL exata do
  app (ex.: `https://SEUUSUARIO.github.io`) — mas aí precisa cobrir todos os
  domínios onde o app está publicado.
- Os métodos `PUT` e `DELETE` só funcionam se o PHP responder o preflight
  `OPTIONS` como acima. Sem isso, aprovar/recusar/excluir alunos falha.
  (O front-end novo já tenta `POST` e `GET` como alternativa, mas o ideal é
  liberar no servidor.)

## O que já foi corrigido no front-end (não precisa mexer)

1. **Login unificado** (`LoginScreen.tsx`): agora usa `authenticateUser()` do
   `authService` — um único caminho para admin e alunos. O placeholder
   `https://SEUDOMINIO.com.br/api` que quebrava tudo foi removido.
2. **Normalização tolerante** (`authService.ts`): aceita chaves em inglês e
   português (`name/nome`, `usuario/username`, `status/situacao`), qualquer
   caixa, e formatos de resposta variados (array direto ou
   `{usuarios: [...]}`).
3. **Mescla servidor + cache local**: cadastros antigos que existiam só no
   localStorage continuam visíveis/logáveis mesmo se o servidor oscilar; quando
   o servidor responde, os dados são unidos sem duplicar.
4. **Timeout de 8s + backoff de 30s**: se o servidor não responder, o app não
   trava mais na tela "Entrando..."; usa o cache local na hora.
5. **Fallback PUT/DELETE → POST → GET**: aprovar/recusar/excluir funciona
   mesmo em hospedagens que bloqueiam métodos REST.
6. **Funções que faltavam** e quebravam o Painel Admin
   (`consolidateAndGetUsers`, `exportUsersJson`, `importUsersJson`,
   `UserAccount`): reimplementadas — o botão "🔍 Restaurar Cadastros Antigos"
   recupera cadastros de chaves antigas do localStorage, e o
   "💾 Backup / Restaurar" exporta/importa JSON.
7. **Sintaxe corrompida** no fim do `LoginScreen.tsx` (duplicação de
   `btnPrimaryStyle`) corrigida — o app não compilava/rodava direito antes.

## Enquanto o CORS não for corrigido no servidor

O sistema funciona **por navegador** (cache local): cadastre os alunos no
mesmo navegador em que vão usar, ou use 💾 Backup/Restaurar para copiar a
lista de um navegador para outro. Assim que o PHP acima for publicado, tudo
passa a sincronizar pelo MySQL automaticamente.
