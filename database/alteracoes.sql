ALTER TABLE pedidos 
ADD COLUMN modalidade ENUM('entrega','retirada') DEFAULT 'entrega',
ADD COLUMN frete DECIMAL(10,2) DEFAULT 0.00,
ADD COLUMN pagamento VARCHAR(50) NULL,
ADD COLUMN troco DECIMAL(10,2) NULL;