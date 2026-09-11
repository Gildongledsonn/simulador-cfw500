CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  cpf VARCHAR(20) NOT NULL,
  username VARCHAR(60) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('ADMIN','STUDENT') NOT NULL DEFAULT 'STUDENT',
  status ENUM('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_users_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Crie o primeiro administrador no phpMyAdmin gerando antes o hash com:
-- php -r "echo password_hash('uma-senha-forte', PASSWORD_DEFAULT), PHP_EOL;"
-- INSERT INTO users (name,email,cpf,username,password_hash,role,status)
-- VALUES ('Administrador','admin@seudominio.com','00000000000','admin','COLE_O_HASH','ADMIN','APPROVED');
