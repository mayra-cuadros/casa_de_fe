document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('donation-form');
  const mensajeConfirmacion = document.getElementById('mensaje-confirmacion');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validación simple (HTML5 required ya cubre lo básico)
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Aquí podrías integrar con pasarela de pago o backend

    // Mostrar mensaje de confirmación y ocultar formulario
    form.classList.add('oculto');
    mensajeConfirmacion.classList.remove('oculto');
  });
});