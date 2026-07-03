# API de Adoção de Pets 🐾

## Descrição do Projeto

Esta é uma API RESTful desenvolvida em Node.js para um sistema de adoção de animais de estimação. A aplicação permite o cadastro e gerenciamento de usuários e pets, além de viabilizar o processo de adoção. O sistema conta com autenticação e autorização baseadas em JSON Web Tokens (JWT), garantindo que apenas usuários autenticados possam adotar pets e que as regras de negócio sejam respeitadas.

## Tecnologias Utilizadas

- **Node.js** com **Express** (Framework web)
- **MySQL2** (Driver de comunicação com o banco de dados)
- **JSON Web Token (JWT)** (Autenticação e segurança)
- **Bcryptjs** (Criptografia de senhas)
- **Dotenv** (Gerenciamento de variáveis de ambiente)
- **Nodemon** (Restart automático no desenvolvimento)
- **ESLint & Prettier** (Padronização e formatação estática de código)

## Instruções de Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/helintonpagel/api-pet-adoption.git
   ```

2. **Acesse a pasta do projeto:**

   ```bash
   cd api-adocao-pets
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

4. **Configuração de Variáveis de Ambiente:**

   Crie um arquivo .env na raiz do projeto e configure as variáveis de conexão com seu banco de dados e a chave secreta do JWT:

   ```dotenv
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=password
    DB_NAME=pets_db
    SECRET_KEY=your_super_secret_random_string_here
   ```

5. **Inicie o servidor em modo de desenvolvimento:**

   ```bash
   npm run dev
   ```

O servidor iniciará, por padrão, na porta 3000 (ou na porta definida no arquivo `.env`).

## Estrutura do Banco de Dados

Abaixo está o script SQL para a criação das tabelas necessárias para o funcionamento da aplicação:

```sql
CREATE DATABASE IF NOT EXISTS pets_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pets_db;

SET NAMES utf8mb4;
SET default_storage_engine = InnoDB;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,

  UNIQUE KEY unique_email (email)
);

CREATE TABLE IF NOT EXISTS pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  birth_date DATE NOT NULL,
  gender ENUM('male', 'female') NOT NULL,
  species VARCHAR(255) NOT NULL,
  breed VARCHAR(255) NULL,
  color VARCHAR(255) NULL,
  size ENUM('small', 'medium', 'large', 'extra-large') NOT NULL,
  weight DECIMAL(5,2) NULL,
  status ENUM('available', 'adopted') NOT NULL DEFAULT 'available',
  description TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS adoptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  pet_id INT NOT NULL,
  adoption_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE ON UPDATE CASCADE
);
```
