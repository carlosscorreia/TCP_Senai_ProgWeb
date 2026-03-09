const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db');

const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

// Rota de teste
app.get('/health', (req, res) => {
  res.json({ status: 'Servidor funcionando!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});