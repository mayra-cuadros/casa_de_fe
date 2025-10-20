document.querySelectorAll('.arrow').forEach(button => {
  button.addEventListener('click', () => {
    const target = button.dataset.target;
    const carousel = document.querySelector(`#${target} .carousel-track`);
    const cards = carousel.querySelectorAll('.basic-card');
    const style = getComputedStyle(carousel);
    const matrix = new WebKitCSSMatrix(style.transform);
    const current = Math.abs(matrix.m41);
    const width = carousel.clientWidth;
    const total = (cards.length - 1) * width;

    if (button.classList.contains('right')) {
      carousel.style.transform = current < total ? `translateX(-${current + width}px)` : 'translateX(0)';
    } else {
      carousel.style.transform = current > 0 ? `translateX(-${current - width}px)` : `translateX(-${total}px)`;
    }

    carousel.style.transition = 'transform 0.6s ease-in-out';
  });
});
