# Publicação na UOL Host

1. No **phpMyAdmin** da UOL Host, crie um banco MySQL e execute `schema.sql`.
2. Copie `config.php.example` para `config.php` e preencha DSN, usuário, senha do MySQL e uma chave aleatória longa. Não envie esse arquivo ao Git.
3. Envie `api_users.php`, `config.php` e `.htaccess` para a raiz pública que atende `https://simulador.gaflink.com.br/`.
4. Cadastre o primeiro administrador conforme o comentário em `schema.sql`.
5. Confirme que `VITE_API_URL` aponta para `https://simulador.gaflink.com.br/api_users.php` e faça novo build do frontend.

As credenciais do painel UOL Host servem apenas para entrar no painel: elas não são credenciais do banco e não devem ser copiadas para `config.php` nem para o código do site.
