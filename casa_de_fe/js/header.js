document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav a");
  const body = document.body;

  // Nombre del archivo actual
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage.includes(currentPage)) {
      link.classList.add("active");

      if (currentPage === "casa_de_fe.html" || currentPage === "" || currentPage === "index.html") {
        body.className = "theme-blue"; // Inicio
      } else if (currentPage.includes("cursos")) {
        body.className = "theme-red"; // Cursos
      } else if (currentPage.includes("evento")) {
        body.className = "theme-green"; // Eventos
      } else if (currentPage.includes("ofrenda")) {
        body.className = "theme-blue"; // Ofrenda
      } else if (currentPage.includes("contacto")) {
        body.className = "theme-blue"; // Contacto también en azul
      }
    }
  });
});
