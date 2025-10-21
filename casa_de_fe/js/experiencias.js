
document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('experiencias-grid');
  if (!grid) return;

  // Ajusta la ruta si esta página está dentro de /paginas/
  const res = await fetch('./data/experiencias.json').catch(() => null);
  const items = res && res.ok ? await res.json() : [];

  if (!items || !items.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:#6c7a92">
      Pronto compartiremos nuevas experiencias
    </div>`;
    return;
  }

  grid.innerHTML = items.map(card => {
    const isVideo = card.tipo === 'video';
    const media = isVideo
      ? `<video controls preload="metadata" poster="${card.poster || ''}">
           <source src="${card.mediaUrl}" type="video/mp4">
         </video>`
      : `<img src="${card.thumbnail || card.mediaUrl}" alt="${card.titulo}" loading="lazy" decoding="async" data-full="${card.mediaUrl}">`;

    return `
      <article class="experiencia-card">
        <div class="media">${media}</div>
        <div class="info">
          <h3>${card.titulo}</h3>
          <time datetime="${card.fecha}">${new Date(card.fecha).toLocaleDateString('es-PE')}</time>
          <p>${card.descripcion}</p>
          ${isVideo ? '' : `<button class="btn-ver" data-id="${card.id}">Ver más</button>`}
        </div>
      </article>`;
  }).join('');

  // Lightbox básico para imágenes
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbClose = document.getElementById('lightbox-close');
  const openLB = (src, alt='Imagen ampliada') => { lbImg.src = src; lbImg.alt = alt; lb.hidden = false; document.body.style.overflow='hidden'; };
  const closeLB = () => { lb.hidden = true; lbImg.src=''; document.body.style.overflow=''; };
  lbClose?.addEventListener('click', closeLB);
  lb?.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', e => { if (!lb.hidden && e.key === 'Escape') closeLB(); });

  grid.addEventListener('click', e => {
    const img = e.target.closest('img');
    const btn = e.target.closest('.btn-ver');
    if (img && img.dataset.full) openLB(img.dataset.full, img.alt);
    if (btn) {
      const card = btn.closest('.experiencia-card');
      const full = card?.querySelector('img')?.dataset.full;
      const alt = card?.querySelector('img')?.alt;
      if (full) openLB(full, alt);
    }
  });
});



/* 1) Inyectar el lightbox si no existe */
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('lightbox')) {
    const wrap = document.createElement('div');
    wrap.id = 'lightbox';
    wrap.hidden = true;
    wrap.innerHTML = `
      <img id="lightbox-img" alt="Imagen ampliada" />
      <button id="lightbox-close" aria-label="Cerrar">&times;</button>
    `;
    document.body.appendChild(wrap);
  }
});

/* 2) Fallback de datos si el fetch inicial no trajo nada
      (ej. por estar en /paginas/ y faltan ../ en la ruta) */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('experiencias-grid');
  if (!grid) return;

  const PLACEHOLDER = 'Pronto compartiremos nuevas experiencias';

  const needsFallback = () =>
    grid.children.length === 0 ||
    grid.textContent.trim().includes(PLACEHOLDER);

  // Mismo render que usas arriba (copiado para no tocar tu bloque)
  const renderCards = (items) => {
    grid.innerHTML = items.map(card => {
      const isVideo = card.tipo === 'video';
      const media = isVideo
        ? `<video controls preload="metadata" poster="${card.poster || ''}">
             <source src="${card.mediaUrl}" type="video/mp4">
           </video>`
        : `<img src="${card.thumbnail || card.mediaUrl}" alt="${card.titulo}" loading="lazy" decoding="async" data-full="${card.mediaUrl}">`;

      return `
        <article class="experiencia-card">
          <div class="media">${media}</div>
          <div class="info">
            <h3>${card.titulo}</h3>
            <time datetime="${card.fecha}">${new Date(card.fecha).toLocaleDateString('es-PE')}</time>
            <p>${card.descripcion}</p>
            ${isVideo ? '' : `<button class="btn-ver" data-id="${card.id}">Ver más</button>`}
          </div>
        </article>`;
    }).join('');
  };

  // Reusar el mismo lightbox si se vuelve a renderizar
  const wireLightbox = () => {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbClose = document.getElementById('lightbox-close');
    const openLB = (src, alt='Imagen ampliada') => { lbImg.src = src; lbImg.alt = alt; lb.hidden = false; document.body.style.overflow='hidden'; };
    const closeLB = () => { lb.hidden = true; lbImg.src=''; document.body.style.overflow=''; };

    lbClose?.addEventListener('click', closeLB);
    lb?.addEventListener('click', e => { if (e.target === lb) closeLB(); });
    document.addEventListener('keydown', e => { if (!lb.hidden && e.key === 'Escape') closeLB(); });

    grid.addEventListener('click', e => {
      const img = e.target.closest('img');
      const btn = e.target.closest('.btn-ver');
      if (img && img.dataset.full) openLB(img.dataset.full, img.alt);
      if (btn) {
        const card = btn.closest('.experiencia-card');
        const full = card?.querySelector('img')?.dataset.full;
        const alt = card?.querySelector('img')?.alt;
        if (full) openLB(full, alt);
      }
    });
  };

  // Espera a que tu primer loader pinte algo; si no, intenta fallback
  setTimeout(async () => {
    if (!needsFallback()) return;

    try {
      const res = await fetch('../data/experiencias.json');
      if (!res.ok) return;
      const items = await res.json();
      if (!items || !items.length) return;

      renderCards(items);
      wireLightbox();
    } catch { /* silencio */ }
  }, 350);
});
