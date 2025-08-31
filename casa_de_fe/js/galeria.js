document.addEventListener('DOMContentLoaded', () => {
  const galeria = document.getElementById('galeria');
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbClose = document.getElementById('lightbox-close');

  if (!galeria) { console.warn('No existe #galeria en el HTML'); return; }
  if (!lb || !lbImg || !lbClose) { console.warn('Falta el lightbox en el HTML'); return; }

  const ALLOWED = /\.(jpe?g|png|webp)$/i; // formatos válidos

  [...galeria.querySelectorAll('img')].forEach(img => {
    if (!ALLOWED.test(img.src)) return;         // ignora si no es JPG/PNG/WEBP
    img.loading = 'lazy';
    img.decoding = 'async';
    img.style.maxWidth = '100%';                // por si no tienes estilos
    img.style.height = 'auto';
    img.style.cursor = 'zoom-in';

    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lbImg.alt = img.alt || 'Imagen ampliada';
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lb.hidden = true;
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  lbClose.addEventListener('click', closeLightbox);
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => { if (!lb.hidden && e.key === 'Escape') closeLightbox(); });
});