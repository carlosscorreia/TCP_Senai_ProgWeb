-- Criação do banco
CREATE DATABASE IF NOT EXISTS railway;
USE railway;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  telefone VARCHAR(20),
  cep VARCHAR(9),
  rua VARCHAR(200),
  numero VARCHAR(10),
  bairro VARCHAR(100),
  cidade VARCHAR(100),
  estado CHAR(2),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de administradores
CREATE TABLE IF NOT EXISTS administradores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2) NOT NULL,
  preco_promocional DECIMAL(10,2) NULL,
  categoria VARCHAR(50),
  imagem_url VARCHAR(255),
  disponivel TINYINT(1) DEFAULT 1,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status ENUM('pendente','confirmado','entregue','cancelado') DEFAULT 'pendente',
  endereco_entrega TEXT NOT NULL,
  observacao TEXT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabela de itens do pedido
CREATE TABLE IF NOT EXISTS itens_pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  produto_id INT NOT NULL,
  quantidade INT NOT NULL,
  preco_unitario DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (produto_id) REFERENCES produtos(id)
);