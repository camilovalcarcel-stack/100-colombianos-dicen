// ELEMENTOS
const btnInicio = document.getElementById("btnInicio");
const intro = document.getElementById("intro");
const juego = document.getElementById("juego");
const final = document.getElementById("final");
const video = document.getElementById("videoIntro");
const btnRespuesta = document.getElementById("btnRespuesta");
const btnSiguiente = document.getElementById("btnSiguiente");
const tablero = document.getElementById("tablero");
const textoPregunta = document.getElementById("pregunta");
const btnPantalla = document.getElementById("btnPantalla");

// AUDIO
const musica = document.getElementById("musicaFondo");
const sonidoAcierto = document.getElementById("sonidoAcierto");
musica.volume = 0.35;
sonidoAcierto.volume = 0.7;

let musicaIniciada = false;

// BANCO DE PREGUNTAS (4)
let tiempo = 60;
let intervalo = null;

const preguntas = [
  {
    pregunta: "¿Qué expresan las danzas tradicionales?",
    respuestas: [
      { texto: "Identidad cultural", puntos: 40 },
      { texto: "Tradiciones", puntos: 25 },
      { texto: "Emociones", puntos: 15 },
      { texto: "Historia", puntos: 10 },
      { texto: "Celebración", puntos: 6 },
      { texto: "Espiritualidad", puntos: 4 }
    ]
  },
  {
    pregunta: "¿Qué valores fomenta el baile en grupo?",
    respuestas: [
      { texto: "Trabajo en equipo", puntos: 35 },
      { texto: "Disciplina", puntos: 25 },
      { texto: "Respeto", puntos: 15 },
      { texto: "Comunicación", puntos: 12 },
      { texto: "Responsabilidad", puntos: 8 },
      { texto: "Solidaridad", puntos: 5 }
    ]
  },
  {
    pregunta: "¿Qué se necesita para una buena presentación?",
    respuestas: [
      { texto: "Ensayo", puntos: 30 },
      { texto: "Coordinación", puntos: 25 },
      { texto: "Expresión", puntos: 18 },
      { texto: "Vestuario", puntos: 12 },
      { texto: "Actitud", puntos: 10 },
      { texto: "Confianza", puntos: 5 }
    ]
  },
  {
    pregunta: "¿Qué transmite el arte a la sociedad?",
    respuestas: [
      { texto: "Cultura", puntos: 28 },
      { texto: "Identidad", puntos: 22 },
      { texto: "Mensajes", puntos: 18 },
      { texto: "Emociones", puntos: 14 },
      { texto: "Historia", puntos: 10 },
      { texto: "Crítica social", puntos: 8 }
    ]
  }
];

let preguntaActual = 0;
let indiceRespuesta = 0;

// FUNCIONES
function cargarPregunta() {
  textoPregunta.textContent = preguntas[preguntaActual].pregunta;
  tablero.innerHTML = "";
  indiceRespuesta = 0;

  iniciarTemporizador(); // ⏱️ AQUÍ VA
}
function iniciarTemporizador() {
  clearInterval(intervalo);
  tiempo = 60;

  const reloj = document.getElementById("temporizador");
  reloj.textContent = "⏱️ 01:00";

  intervalo = setInterval(() => {
    tiempo--;

    let segundos = tiempo < 10 ? "0" + tiempo : tiempo;
    reloj.textContent = `⏱️ 00:${segundos}`;

    if (tiempo <= 10) {
      reloj.style.color = "yellow";
      reloj.style.boxShadow = "0 0 20px yellow";
    }

    if (tiempo <= 0) {
      clearInterval(intervalo);
      reloj.textContent = "⛔ TIEMPO!";
      bloquearRespuestas();
    }
  }, 1000);
}
function bloquearRespuestas() {
  document.querySelectorAll(".respuesta").forEach(r => {
    r.style.pointerEvents = "none";
    r.style.opacity = "0.5";
  });
}

// INICIO
btnInicio.addEventListener("click", () => {
  intro.style.display = "none";
  juego.style.display = "block";

  video.pause();
  video.muted = true;

  if (!musicaIniciada) {
    musica.play();
    musicaIniciada = true;
  }

  cargarPregunta();
});

// MOSTRAR RESPUESTA
btnRespuesta.addEventListener("click", () => {
  const respuestas = preguntas[preguntaActual].respuestas;
  if (indiceRespuesta >= respuestas.length) return;

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">Respuesta ${indiceRespuesta + 1}</div>
      <div class="card-back">
        <div>${respuestas[indiceRespuesta].texto}</div>
        <div class="puntos">${respuestas[indiceRespuesta].puntos} pts</div>
      </div>
    </div>
  `;

  tablero.appendChild(card);

  setTimeout(() => {
    card.classList.add("flipped");
    sonidoAcierto.currentTime = 0;
    sonidoAcierto.play();
  }, 300);

  indiceRespuesta++;
});

// SIGUIENTE PREGUNTA
btnSiguiente.addEventListener("click", () => {
  if (preguntaActual < preguntas.length - 1) {
    preguntaActual++;
    cargarPregunta();
  } else {
    juego.style.display = "none";
    final.style.display = "block";
  }
});
// PANTALLA COMPLETA (VERSIÓN ROBUSTA)
btnPantalla.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.body.requestFullscreen().then(() => {
      btnPantalla.textContent = "⛶ Salir de pantalla completa";
    }).catch(err => {
      alert("Tu navegador bloqueó la pantalla completa");
      console.error(err);
    });
  } else {
    document.exitFullscreen();
    btnPantalla.textContent = "⛶ Pantalla completa";
  }
});
