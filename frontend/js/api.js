const API_URL = 'https://lanchonete-backend-qs4d.onrender.com';

async function apiFetch(rota, opcoes = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...opcoes.headers,
  };

  const response = await fetch(`${API_URL}${rota}`, {
    ...opcoes,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || 'Erro na requisição');
  }

  return data;
}