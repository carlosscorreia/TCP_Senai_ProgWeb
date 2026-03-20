# 🍔 Burguer Lanchonete - Sistema de Pedidos Online

Trabalho Final de Curso - Programador Web · SENAI

🔗 **Site:** [https://burguerlanchonete.vercel.app](https://burguerlanchonete.vercel.app)  
🔗 **API:** [https://lanchonete-backend-qs4d.onrender.com](https://lanchonete-backend-qs4d.onrender.com)

---

## 📋 Sobre o Projeto

Sistema completo de pedidos online para uma lanchonete, desenvolvido como trabalho final do curso de Programador Web no SENAI. O sistema permite que clientes visualizem o cardápio, adicionem itens ao carrinho, finalizem pedidos com entrega ou retirada e acompanhem o status em tempo real. O administrador pode gerenciar produtos, acompanhar pedidos, abrir/fechar a loja e visualizar o painel de controle com faturamento do dia.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- HTML5, CSS3, JavaScript
- Bootstrap 5.3.x
- Fonte: Google Fonts: Poppins
- API ViaCEP (busca automática de endereço por CEP)
- QRCode.js (geração de QR Code para confirmação via WhatsApp)
- Hospedado no **Vercel**

### Backend
- Node.js
- Express.js
- JWT (jsonwebtoken) - autenticação
- bcryptjs - criptografia de senhas
- mysql2 - conexão com banco de dados
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
│   ├── index.html             # Página inicial - cardápio
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

## 🗄 Banco de Dados - Tabelas

| Tabela | Descrição |
|---|---|
| `usuarios` | Clientes cadastrados |
| `administradores` | Usuários com acesso ao painel |
| `produtos` | Itens do cardápio |
| `pedidos` | Pedidos realizados pelos clientes |
| `itens_pedido` | Itens de cada pedido |

---

## 📡 Rotas da API
 
### Usuários
| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/api/users/register` | — | Cadastrar usuário |
| POST | `/api/users/login` | — | Login do cliente |
| GET | `/api/users/profile` | Usuário | Perfil do usuário logado |
 
### Produtos
| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/api/products` | — | Listar produtos |
| POST | `/api/products` | Admin | Criar produto |
| PUT | `/api/products/:id` | Admin | Editar produto |
| DELETE | `/api/products/:id` | Admin | Remover produto |
 
### Pedidos
| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/api/orders` | Usuário | Criar pedido |
| GET | `/api/orders/my` | Usuário | Meus pedidos |
| GET | `/api/orders/my/:id` | Usuário | Itens de um pedido |
| GET | `/api/orders` | Admin | Todos os pedidos |
| PUT | `/api/orders/:id/status` | Admin | Atualizar status do pedido |
 
### Admin
| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/api/admin/login` | — | Login do admin |
| GET | `/api/admin/dashboard` | Admin | Dados do dashboard |
| GET | `/api/admin/loja-status` | — | Status da loja |
| PUT | `/api/admin/loja-status` | Admin | Abrir/fechar loja |
 
---
 
## ✨ Funcionalidades
 
### Área do Cliente
- ✅ Cardápio com filtro por categoria
- ✅ Carrinho de compras com localStorage
- ✅ Cadastro com busca automática de CEP (ViaCEP)
- ✅ Login com JWT
- ✅ Checkout com seleção de endereço cadastrado
- ✅ Adicionar múltiplos endereços com apelido (Casa, Trabalho...)
- ✅ Escolha entre entrega (taxa R$ 5,00) ou retirada na loja
- ✅ Pagamento em cartão débito/crédito ou dinheiro
- ✅ Opção de troco para pagamento em dinheiro
- ✅ Confirmação via WhatsApp com QR Code
- ✅ Histórico de pedidos com status
- ✅ Acompanhamento do pedido com barra de progresso
- ✅ Pedir novamente com os mesmos itens
- ✅ Aviso de loja fechada
 
### Painel Administrativo
- ✅ Login seguro com JWT
- ✅ Dashboard com pedidos e faturamento do dia
- ✅ Tabela de vendas dos últimos 7 dias
- ✅ CRUD completo de produtos
- ✅ Gestão de pedidos com atualização de status
- ✅ Filtro de pedidos por status
- ✅ Botão de abrir/fechar loja em tempo real
 
---
 
## 📦 Deploy
 
| Serviço | Plataforma | Observação |
|---|---|---|
| Frontend | Vercel | Pasta `frontend/` como root |
| Backend | Render | Pasta `backend/` como root, variáveis no painel |
| Banco | Railway | MySQL na nuvem |

> 🖼️ As imagens dos produtos são inseridas por URL.

---

## 👨‍💻 Desenvolvido por

Beatriz Souza Gonçalves - SENAI · Curso de Programador Web · 2026

Carlos Eduardo Silva Correia - SENAI · Curso de Programador Web · 2026

Carlos Henrique Silva Barreto - SENAI · Curso de Programador Web · 2026 

Elin Almeida da Fonseca - SENAI · Curso de Programador Web · 2026
