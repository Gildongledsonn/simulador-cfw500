# Publicação na UOL Host

## Situação verificada em 11/09/2026

O endereço https://simulador.gaflink.com.br/api_users.php responde 404 do GitHub Pages. É necessário disponibilizar um domínio/subdomínio atendido pela UOL Host com PHP e configurar VITE_API_URL com esse endereço. Publicar os arquivos PHP no GitHub Pages não executa a API.

O frontend agora exige a API para validar a sessão (GET action=me), listar usuários e confirmar alterações. Publique primeiro a API atualizada e depois o frontend. Aprovações e exclusões não são simuladas no navegador. Exportações JSON são para consulta; a restauração de contas e hashes deve usar backup MySQL.

Validação após publicar: cadastrar aluno, testar duplicidade, negar login pendente, aprovar pelo administrador, fazer login do aluno, bloquear e verificar a sessão, excluir e conferir que a conta não reaparece. Conferir também que alunos recebem 403 ao listar/alterar usuários e que pedidos sem token recebem 401. Verificar CORS a partir da origem real do frontend.

1. No **phpMyAdmin** da UOL Host, crie um banco MySQL e execute `schema.sql`.
2. Copie `config.php.example` para `config.php` e preencha DSN, usuário, senha do MySQL e uma chave aleatória longa. Não envie esse arquivo ao Git.
3. Envie `api_users.php`, `config.php` e `.htaccess` para a raiz pública que atende `https://simulador.gaflink.com.br/`.
4. Cadastre o primeiro administrador conforme o comentário em `schema.sql`.
5. Confirme que `VITE_API_URL` aponta para `https://simulador.gaflink.com.br/api_users.php` e faça novo build do frontend.

As credenciais do painel UOL Host servem apenas para entrar no painel: elas não são credenciais do banco e não devem ser copiadas para `config.php` nem para o código do site.

Subdomínio escolhido: https://api.gaflink.com.br/api_users.php. Frontend configurado. O endpoint responde PHP/8.3 e HTTP 500 com mensagem genérica; consultar error_log na UOL Host antes de validar os fluxos reais. Build, teste automatizado do serviço frontend e lint PHP passaram localmente.
