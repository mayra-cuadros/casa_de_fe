document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día'
    },
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [
      {
        title: 'Reunión de Oración',
        start: '2025-09-02T19:00:00',
        description: 'Un tiempo de oración en comunidad para interceder.'
      },
      {
        title: 'Escuela Dominical',
        start: '2025-09-07T10:00:00',
        end: '2025-09-07T11:30:00',
        description: 'Clase especial para niños y adultos sobre la Palabra de Dios.'
      },
      {
        title: 'Concierto de Alabanza',
        start: '2025-09-15T18:30:00',
        description: 'Un concierto para adorar juntos con música en vivo.'
      }
    ],
    eventClick: function(info) {
      info.jsEvent.preventDefault();

      var modal = document.getElementById("modal");
      var cerrar = document.getElementById("cerrar");

      document.getElementById("modal-titulo").textContent = info.event.title;

      let fecha = new Date(info.event.start);
      let opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      document.getElementById("modal-fecha").textContent = fecha.toLocaleDateString('es-ES', opcionesFecha);

      let hora = fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      document.getElementById("modal-hora").textContent = hora;

      document.getElementById("modal-desc").textContent = info.event.extendedProps.description || 'Sin descripción';

      // mostrar modal
      modal.style.display = "block";

      // botón pedir información
      document.getElementById("btn-info").onclick = function() {
        // ejemplo: redirige a contacto.html
        window.location.href = "./contacto.html?evento=" + encodeURIComponent(info.event.title);
        // 👆 si prefieres WhatsApp: window.open("https://wa.me/51999999999?text=Quiero información sobre: " + encodeURIComponent(info.event.title));
        // 👆 o email: window.location.href = "mailto:info@tuchurch.com?subject=Info sobre " + encodeURIComponent(info.event.title);
      };

      // cerrar modal
      cerrar.onclick = function() {
        modal.style.display = "none";
      };
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    }
  });

  calendar.render();
});
