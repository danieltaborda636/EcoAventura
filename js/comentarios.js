const formulario = document.getElementById("comentario-form");
const nombreInput = document.getElementById("nombre");
const textarea = document.getElementById("comentario");
const comentariosContainer = document.getElementById("comentarios-container");

// Carga y muestra comentarios guardados (cada uno es {id, nombre, texto, estrellas})
window.addEventListener("DOMContentLoaded", () => {
  const comentariosGuardados = JSON.parse(localStorage.getItem("comentarios")) || [];
  comentariosGuardados.forEach(c => mostrarComentario(c));
});

function mostrarComentario({ id, nombre, texto, estrellas }) {
  const comentarioDiv = document.createElement("div");
  comentarioDiv.classList.add("comentario");
  comentarioDiv.dataset.id = id;

  // Nombre en negrita
  const nombreElem = document.createElement("strong");
  nombreElem.textContent = nombre;
  comentarioDiv.appendChild(nombreElem);

  // Texto del comentario
  const comentarioP = document.createElement("p");
  comentarioP.textContent = texto;
  comentarioDiv.appendChild(comentarioP);

  // Mostrar estrellas actuales
  const estrellasSpan = document.createElement("span");
  actualizarEstrellas(estrellasSpan, estrellas);
  comentarioDiv.appendChild(estrellasSpan);

  // Botón de calificar
  const btnCalificar = document.createElement("button");
  btnCalificar.textContent = "⭐ Calificar";
  btnCalificar.type = "button";
  btnCalificar.addEventListener("click", () => {
    if (estrellas < 5) {
      estrellas++;
      actualizarEstrellas(estrellasSpan, estrellas);
      actualizarStorage(id, { estrellas });
    }
  });
  comentarioDiv.appendChild(btnCalificar);

  // Botón de eliminar
  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "🗑️ Eliminar";
  btnEliminar.type = "button";
  btnEliminar.addEventListener("click", () => {
    comentarioDiv.remove();
    borrarDeStorage(id);
  });
  comentarioDiv.appendChild(btnEliminar);

  comentariosContainer.appendChild(comentarioDiv);
}

// Pinta estrellas llenas y vacías
function actualizarEstrellas(span, count) {
  span.textContent = " " + "★".repeat(count) + "☆".repeat(5 - count) + " ";
}

// Al enviar el formulario, crea un nuevo comentario con nombre, texto y 0 estrellas
formulario.addEventListener("submit", function(event) {
  event.preventDefault();
  const nombre = nombreInput.value.trim();
  const texto = textarea.value.trim();
  if (!nombre || !texto) return;

  const nuevoComentario = {
    id: Date.now().toString(),
    nombre,
    texto,
    estrellas: 0
  };

  // Guarda en localStorage
  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
  comentarios.push(nuevoComentario);
  localStorage.setItem("comentarios", JSON.stringify(comentarios));

  // Muestra en pantalla
  mostrarComentario(nuevoComentario);

  // Limpia los campos
  nombreInput.value = "";
  textarea.value = "";
});

// Actualiza solo los campos especificados de un comentario en storage
function actualizarStorage(id, cambios) {
  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
  const actualizado = comentarios.map(c =>
    c.id === id ? { ...c, ...cambios } : c
  );
  localStorage.setItem("comentarios", JSON.stringify(actualizado));
}

// Elimina un comentario de storage por su id
function borrarDeStorage(id) {
  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
  const filtrados = comentarios.filter(c => c.id !== id);
  localStorage.setItem("comentarios", JSON.stringify(filtrados));
}