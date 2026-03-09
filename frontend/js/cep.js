async function buscarCep(cep) {
  cep = cep.replace(/[^0-9]/g, '');

  if (cep.length !== 8) return;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      alert('CEP não encontrado!');
      return;
    }

    document.getElementById('rua').value    = data.logradouro;
    document.getElementById('bairro').value = data.bairro;
    document.getElementById('cidade').value = data.localidade;
    document.getElementById('estado').value = data.uf;
    document.getElementById('numero').focus();

  } catch (error) {
    alert('Erro ao buscar CEP. Verifique sua conexão.');
  }
}