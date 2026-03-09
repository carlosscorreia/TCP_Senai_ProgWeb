function getCarrinho() {
  return JSON.parse(localStorage.getItem('carrinho')) || [];
}

function salvarCarrinho(carrinho) {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarContadorCarrinho();
}

function adicionarAoCarrinho(produto) {
  let carrinho = getCarrinho();
  const index = carrinho.findIndex(item => item.id === produto.id);

  if (index !== -1) {
    carrinho[index].quantidade++;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }

  salvarCarrinho(carrinho);

  // Feedback visual
  const btn = event.target;
  btn.textContent = '✓ Adicionado!';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '+ Adicionar';
    btn.disabled = false;
  }, 1500);
}

function removerDoCarrinho(id) {
  let carrinho = getCarrinho().filter(item => item.id !== id);
  salvarCarrinho(carrinho);
}

function alterarQuantidade(id, quantidade) {
  let carrinho = getCarrinho();
  const index = carrinho.findIndex(item => item.id === id);
  if (index !== -1) {
    if (quantidade <= 0) {
      carrinho.splice(index, 1);
    } else {
      carrinho[index].quantidade = quantidade;
    }
  }
  salvarCarrinho(carrinho);
}

function calcularTotal() {
  return getCarrinho()
    .reduce((total, item) => {
      const preco = item.preco_promocional || item.preco;
      return total + parseFloat(preco) * item.quantidade;
    }, 0)
    .toFixed(2);
}

function limparCarrinho() {
  localStorage.removeItem('carrinho');
  atualizarContadorCarrinho();
}

function atualizarContadorCarrinho() {
  const contador = document.getElementById('contador-carrinho');
  if (contador) {
    const total = getCarrinho().reduce((sum, item) => sum + item.quantidade, 0);
    contador.textContent = total;
  }
}

document.addEventListener('DOMContentLoaded', atualizarContadorCarrinho);