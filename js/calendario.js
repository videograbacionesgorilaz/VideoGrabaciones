/* =============================================
   GORILAZ — calendario.js
   =============================================

   *** AQUÍ AGREGAS LAS FECHAS OCUPADAS ***
   Formato: 'YYYY-MM-DD'
   Ejemplo: '2025-12-25'
*/
const FECHAS_OCUPADAS = [
  '2025-08-02',
  '2025-08-16',
  '2025-09-06',
  '2025-10-04',
  '2025-10-18',
  '2025-12-20',
  '2025-12-26',
  '2026-07-31',
  // Agrega aquí más fechas según tus eventos confirmados
];

const MESES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
];

let viewYear, viewMonth;

function initCalendario() {
  const calGrid = document.getElementById('calGrid');
  if (!calGrid) return;

  const hoy  = new Date();
  viewYear   = hoy.getFullYear();
  viewMonth  = hoy.getMonth();

  renderCalendario();

  document.getElementById('prevMes').addEventListener('click', () => {
    viewMonth--;
    if (viewMonth < 0) { viewMonth = 11; viewYear--; }
    renderCalendario();
  });
  document.getElementById('nextMes').addEventListener('click', () => {
    viewMonth++;
    if (viewMonth > 11) { viewMonth = 0; viewYear++; }
    renderCalendario();
  });

  document.getElementById('popupClose').addEventListener('click', cerrarPopup);
  document.getElementById('calOverlay').addEventListener('click', cerrarPopup);
}

function renderCalendario() {
  const calGrid   = document.getElementById('calGrid');
  const calTitulo = document.getElementById('calTitulo');
  calGrid.innerHTML = '';
  calTitulo.textContent = `${MESES[viewMonth]} ${viewYear}`;

  const hoy       = new Date();
  const hoyStr    = fmt(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  const primerDia = new Date(viewYear, viewMonth, 1).getDay();
  const diasEnMes = new Date(viewYear, viewMonth + 1, 0).getDate();

  for (let i = 0; i < primerDia; i++) {
    const v = document.createElement('div');
    v.className = 'cal-dia vacio';
    calGrid.appendChild(v);
  }

  for (let d = 1; d <= diasEnMes; d++) {
    const fechaStr  = fmt(viewYear, viewMonth, d);
    const esHoy     = fechaStr === hoyStr;
    const esPasado  = fechaStr < hoyStr;
    const esOcupado = FECHAS_OCUPADAS.includes(fechaStr);

    const div = document.createElement('div');
    div.textContent = d;
    div.className   = 'cal-dia';

    if (esPasado && !esHoy) {
      div.classList.add('pasado');
    } else if (esOcupado) {
      div.classList.add('ocupado');
      div.title = 'Fecha no disponible';
    } else {
      div.classList.add('libre');
      if (esHoy) div.classList.add('hoy');
      div.addEventListener('click', () => abrirPopup(fechaStr, d));
    }

    calGrid.appendChild(div);
  }
}

function fmt(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

function abrirPopup(fechaStr, dia) {
  const [y, m] = fechaStr.split('-');
  const fechaLegible = `${dia} de ${MESES[parseInt(m) - 1]} de ${y}`;
  const msg = encodeURIComponent(`Hola, me gustaría apartar el ${fechaLegible} para mi evento con Video Grabaciones Gorilaz. ¿Está disponible?`);

  document.getElementById('popupFecha').textContent = fechaLegible;
  document.getElementById('popupWA1').href = `https://wa.me/525545101765?text=${msg}`;
  document.getElementById('popupWA2').href = `https://wa.me/527121015758?text=${msg}`;

  document.getElementById('calPopup').classList.add('active');
  document.getElementById('calOverlay').classList.add('active');
}

function cerrarPopup() {
  document.getElementById('calPopup').classList.remove('active');
  document.getElementById('calOverlay').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', initCalendario);