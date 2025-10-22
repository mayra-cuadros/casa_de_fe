document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservaForm");
  const mensaje = document.getElementById("mensajeConfirmacion");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simula envío (puedes conectar con backend más adelante)
    setTimeout(() => {
      mensaje.style.display = "block";
      form.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 500);
  });
});
