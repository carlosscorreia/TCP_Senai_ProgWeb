function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('nomeUsuario');
  window.location.href = 'login.html';
}

function atualizarNav() {
  const token = localStorage.getItem('token');
  const navLogin    = document.getElementById('nav-login');
  const navCadastro = document.getElementById('nav-cadastro');
  const navLogout   = document.getElementById('nav-logout');

  if (token) {
    if (navLogin)    navLogin.style.display    = 'none';
    if (navCadastro) navCadastro.style.display = 'none';
    if (navLogout)   navLogout.style.display   = 'inline';
  }
}

document.addEventListener('DOMContentLoaded', atualizarNav);