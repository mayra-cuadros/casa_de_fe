const versiculos = [
  {
    texto: "Ya te lo he ordenado: ¡Sé fuerte y valiente! ¡No tengas miedo ni te desanimes! Porque el Señor tu Dios te acompañará dondequiera que vayas.",
    cita: "Josué 1:9"
  },
  {
    texto: "El Señor es mi pastor, nada me faltará.",
    cita: "Salmos 23:1"
  },
  {
    texto: "Todo lo puedo en Cristo que me fortalece.",
    cita: "Filipenses 4:13"
  },
  {
    texto: "Ahora bien, sabemos que Dios dispone todas las cosas para el bien de quienes lo aman, los que han sido llamados de acuerdo con su propósito.",
    cita: "Romanos 8:28"
  },
  {
    texto: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios.",
    cita: "Isaías 41:10"
  },
  {
    texto: "Porque tanto amó Dios al mundo que dio a su Hijo unigénito, para que todo el que cree en él no se pierda, sino que tenga vida eterna.",
    cita: "Juan 3:16"
  },
  {
    texto: "El Señor te bendiga y te guarde; el Señor te mire con agrado y te extienda su amor; el Señor te muestre su favor y te conceda la paz.",
    cita: "Números 6:24-26"
  }
];

let ultimoIndice = -1;

function mostrarVersiculo() {
  let indice;
  do {
    indice = Math.floor(Math.random() * versiculos.length);
  } while (indice === ultimoIndice && versiculos.length > 1);

  ultimoIndice = indice;

  const { texto, cita } = versiculos[indice];

  const textoElemento = document.getElementById("versiculo-texto");
  const citaElemento = document.getElementById("versiculo-datos");

  textoElemento.style.opacity = 0;
  citaElemento.style.opacity = 0;

  setTimeout(() => {
    textoElemento.textContent = `"${texto}"`;
    citaElemento.textContent = cita;
    textoElemento.style.opacity = 1;
    citaElemento.style.opacity = 1;
  }, 150);
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarVersiculo();
  document.getElementById("nuevo-versiculo").addEventListener("click", mostrarVersiculo);
});
