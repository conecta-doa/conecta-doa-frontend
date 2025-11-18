const pages = document.querySelectorAll('.pagina');
const buttons = document.querySelectorAll('.page-btn');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    pages.forEach(p => p.classList.remove('active'));
    buttons.forEach(b => b.classList.remove('active'));
    const pageNum = btn.getAttribute('data-page');
    document.querySelector(`.pagina:nth-child(${pageNum})`).classList.add('active');
    btn.classList.add('active');
  });
});

// ===== COMPARTILHAR =====
const shareButtons = document.querySelectorAll('.share-btn');

shareButtons.forEach(button => {
  button.addEventListener('click', async () => {
    const story = button.closest('.historia');
    const title = story.querySelector('h3').innerText;
    const text = story.querySelector('p').innerText;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
      } catch (err) {
        console.error('Erro ao compartilhar:', err);
      }
    } else {
      alert('O compartilhamento nativo não é suportado neste navegador.');
    }
  });
});
