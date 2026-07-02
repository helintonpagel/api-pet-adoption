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
