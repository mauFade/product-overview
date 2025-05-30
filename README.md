# Product Overview

Este projeto consiste em uma aplicação full-stack com backend em Node.js (Express) e frontend em Next.js.

## Sobre o Sistema

Este é um aplicativo de gerenciamento de produtos com as seguintes funcionalidades:

- **Autenticação**: Sistema completo de login e cadastro de usuários
- **Dashboard**: Área administrativa para gerenciamento do sistema
- **Produtos**: Módulo para gerenciamento de produtos
- **Reviews**: Sistema de avaliações para os produtos

### Tecnologias Utilizadas

- **Frontend**:

  - Next.js
  - Tailwind CSS
  - shadcn/ui para componentes
  - Interface moderna com tema escuro por padrão

- **Backend**:
  - Node.js com Express
  - Arquitetura em camadas (domain, infra)
  - PostgreSQL como banco de dados

## Requisitos

- Node.js
- Docker e Docker Compose
- npm ou yarn

## Configuração e Execução

### Backend

1. Entre na pasta do backend:

```bash
cd backend
```

2. Copie o arquivo de variáveis de ambiente:

```bash
cp .env.example .env
```

3. Inicie os serviços do Docker (em um terminal):

```bash
docker compose up
```

4. Em outro terminal, na pasta backend, instale as dependências e inicie o servidor:

```bash
# Usando npm
npm install
npm run dev

# OU usando yarn
yarn install
yarn dev
```

O backend estará rodando na porta 8081 (ou na porta definida no arquivo .env).

### Frontend

1. Em um novo terminal, entre na pasta do frontend:

```bash
cd frontend
```

2. Copie o arquivo de variáveis de ambiente:

```bash
cp .env.local.example .env.local
```

3. Instale as dependências e inicie o servidor:

```bash
# Usando npm
npm install
npm run dev

# OU usando yarn
yarn install
yarn dev
```

O frontend estará rodando na porta 3000.

## Acessando a Aplicação

- Frontend: http://localhost:3000
- Backend API: http://localhost:8081

## Observações

- Certifique-se de que o Docker está rodando antes de iniciar o backend
- Mantenha os terminais do backend (Docker e servidor) e frontend abertos enquanto estiver rodando o app
- As variáveis de ambiente podem ser configuradas nos arquivos `.env` (backend) e `.env.local` (frontend)
