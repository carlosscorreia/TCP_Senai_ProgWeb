# 🍔 Burguer Lanchonete — Sistema de Pedidos Online

Trabalho Final de Curso — Programador Web · SENAI

🔗 **Site:** [https://burguerlanchonete.vercel.app](https://burguerlanchonete.vercel.app)  
🔗 **API:** [https://lanchonete-backend-qs4d.onrender.com](https://lanchonete-backend-qs4d.onrender.com)

---

## 📋 Sobre o Projeto

Sistema completo de pedidos online para uma lanchonete, desenvolvido como trabalho final do curso de Programador Web no SENAI. O sistema permite que clientes visualizem o cardápio, adicionem itens ao carrinho e finalizem pedidos. O administrador pode gerenciar produtos, acompanhar pedidos e visualizar o painel de controle.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- HTML5, CSS3, JavaScript
- Hospedado no **Vercel**

### Backend
- Node.js
- Express.js
- JWT (jsonwebtoken) — autenticação
- bcryptjs — criptografia de senhas
- dotenv, cors
- Hospedado no **Render**

### Banco de Dados
- MySQL
- Hospedado no **Railway**

---

## 🗂 Estrutura de Pastas

```
TCP_Senai_ProgWeb/
├── frontend/
│   ├── index.html             # Página inicial — cardápio
│   ├── login.html             # Tela de login
│   ├── cadastro.html          # Tela de cadastro
│   ├── carrinho.html          # Carrinho de compras
│   ├── pedido.html            # Finalizar pedido + QR Code
│   ├── meus-pedidos.html      # Histórico de pedidos do cliente
│   ├── admin/
│   │   ├── login.html         # Login do administrador
│   │   ├── index.html         # Dashboard administrativo
│   │   ├── produtos.html      # Gerenciar produtos
│   │   └── pedidos.html       # Gerenciar pedidos
│   ├── css/
│   │   └── style.css          # Estilos globais
│   └── js/
│       ├── api.js             # URL base da API
│       ├── auth.js            # Login e sessão do usuário
│       ├── carrinho.js        # Lógica do carrinho (localStorage)
│       └── cep.js             # Integração ViaCEP
│
├── backend/
│   ├── server.js              # Ponto de entrada do servidor
│   ├── config/db.js           # Conexão com MySQL
│   ├── models/                # Consultas ao banco
│   ├── controllers/           # Lógica das rotas
│   ├── routes/                # Endpoints da API
│   ├── middleware/auth.js     # Proteção de rotas JWT
│   └── .env.example           # Exemplo de variáveis de ambiente
│
├── database/
│   └── schema.sql             # Script de criação do banco
│
└── README.md
```

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos
- Node.js instalado
- MySQL local ou conta no Railway

### 1. Clone o repositório
```bash
git clone https://github.com/carlosscorreia/TCP_Senai_ProgWeb.git
cd TCP_Senai_ProgWeb
```

### 2. Configure o backend
```bash
cd backend
npm install
```

Crie o arquivo `.env` com base no `.env.example`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=railway
DB_PORT=3306
PORT=3000
JWT_SECRET=seu_segredo
```

### 3. Crie o banco de dados
Execute o script no seu MySQL:
```bash
mysql -u root -p < ../database/schema.sql
```

### 4. Inicie o servidor
```bash
node server.js
```

### 5. Abra o frontend
Abra o arquivo `frontend/index.html` diretamente no navegador, ou use a extensão **Live Server** no VS Code.

> ⚠️ Lembre-se de atualizar a URL base em `frontend/js/api.js` para `http://localhost:3000` ao rodar localmente.

---

## 🔐 Acesso ao Painel Administrativo

URL: [https://burguerlanchonete.vercel.app/admin/login.html](https://burguerlanchonete.vercel.app/admin/login.html)

| Campo | Valor |
|---|---|
| E-mail | admin@lanchonete.com |
| Senha | admin123 |

---

## 🗄 Banco de Dados — Tabelas

| Tabela | Descrição |
|---|---|
| `usuarios` | Clientes cadastrados |
| `administradores` | Usuários com acesso ao painel |
| `produtos` | Itens do cardápio |
| `pedidos` | Pedidos realizados pelos clientes |
| `itens_pedido` | Itens de cada pedido |

---

## 📡 Rotas da API

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | /api/users/register | — | Cadastrar usuário |
| POST | /api/users/login | — | Login do cliente |
| GET | /api/products | — | Listar produtos |
| POST | /api/orders | Usuário | Criar pedido |
| GET | /api/orders/my | Usuário | Meus pedidos |
| POST | /api/admin/login | — | Login do admin |
| GET | /api/admin/dashboard | Admin | Dados do dashboard |
| POST | /api/products | Admin | Criar produto |
| PUT | /api/products/:id | Admin | Editar produto |
| DELETE | /api/products/:id | Admin | Remover produto |
| PUT | /api/orders/:id/status | Admin | Atualizar status do pedido |

---

## 👨‍💻 Desenvolvido por

Beatriz Gonçalves — SENAI · Curso de Programador Web · 2026

Carlos Eduardo Silva Correia — SENAI · Curso de Programador Web · 2026

Carlos Henrique Silva Barreto — SENAI · Curso de Programador Web · 2026 

Elin Almeida da Fonseca — SENAI · Curso de Programador Web · 2026