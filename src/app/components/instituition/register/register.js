document.addEventListener('DOMContentLoaded', function () {
  const cnpjInput = document.getElementById('cnpj');

  if (!cnpjInput) {
    console.error("Campo de CNPJ não encontrado!");
    return;
  }

  cnpjInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 14) {
      value = value.slice(0, 14);
    }

    value = value.replace(/^(\d{2})(\d)/, '$1.$2');
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
    value = value.replace(/(\d{4})(\d)/, '$1-$2');

    e.target.value = value;
  });

  // Botões
  document.getElementById('btn-next')?.addEventListener('click', function () {
    document.getElementById('form-cnpj').style.display = 'none';
    document.getElementById('form-docs').style.display = 'block';
  });

  document.getElementById('btn-submit')?.addEventListener('click', function () {
    alert('Documentos enviados com sucesso!');
  });
});
