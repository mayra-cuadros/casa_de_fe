// Mostrar cursos solo si elige "inscripción"
const tipoSelect = document.getElementById('tipo');
const cursoContainer = document.getElementById('curso-container');

tipoSelect.addEventListener('change', function () {
  if (this.value === 'inscripcion') {
    cursoContainer.style.display = 'block';
  } else {
    cursoContainer.style.display = 'none';
  }
});
