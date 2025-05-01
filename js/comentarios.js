const form = document.getElementById('formComentario');
const lista = document.getElementById('listaComentarios');

let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  if (nombre && mensaje) {
    const nuevoComentario = {
      id: Date.now(),
      nombre,
      mensaje,
      likes: 0,
      dislikes: 0,
      calificado: false
    };
    comentarios.unshift(nuevoComentario);
    guardarComentarios();
    renderComentarios();
    form.reset();
  }
});

function guardarComentarios() {
  localStorage.setItem('comentarios', JSON.stringify(comentarios));
}

function renderComentarios() {
  lista.innerHTML = '';
  comentarios.forEach(comentario => {
    const div = document.createElement('div');
    div.className = 'comentario';
    div.innerHTML = `
      <strong>${comentario.nombre}</strong>
      <p class="texto-comentario">${comentario.mensaje}</p>
      <div class="comentario-actions">
        <button class="like-btn">👍 <span class="likes">${comentario.likes}</span></button>
        <button class="dislike-btn">👎 <span class="dislikes">${comentario.dislikes}</span></button>
        <button class="editar-btn">Editar</button>
        <button class="eliminar-btn">Eliminar</button>
      </div>
    `;

    const likeBtn = div.querySelector('.like-btn');
    const dislikeBtn = div.querySelector('.dislike-btn');
    const editarBtn = div.querySelector('.editar-btn');
    const eliminarBtn = div.querySelector('.eliminar-btn');
    const texto = div.querySelector('.texto-comentario');

    if (comentario.calificado) {
      likeBtn.disabled = true;
      dislikeBtn.disabled = true;
    }

    likeBtn.addEventListener('click', () => {
      if (!comentario.calificado) {
        comentario.likes++;
        comentario.calificado = true;
        guardarComentarios();
        renderComentarios();
      }
    });

    dislikeBtn.addEventListener('click', () => {
      if (!comentario.calificado) {
        comentario.dislikes++;
        comentario.calificado = true;
        guardarComentarios();
        renderComentarios();
      }
    });

    editarBtn.addEventListener('click', () => {
      const nuevoTexto = prompt('Edita tu comentario:', comentario.mensaje);
      if (nuevoTexto !== null) {
        comentario.mensaje = nuevoTexto;
        guardarComentarios();
        renderComentarios();
      }
    });

    eliminarBtn.addEventListener('click', () => {
      if (confirm('¿Estás seguro de eliminar este comentario?')) {
        comentarios = comentarios.filter(c => c.id !== comentario.id);
        guardarComentarios();
        renderComentarios();
      }
    });

    lista.appendChild(div);
  });
}

// Mostrar comentarios al cargar la página
renderComentarios();






document.querySelectorAll('.rating-box').forEach(box => {
    const estrellasContainer = box.querySelector('.estrellas');
    const total = parseInt(box.dataset.estrellas) || 5;
    const calificacion = parseInt(box.dataset.calificacion) || 0;
    const corazon = box.querySelector('.corazon');
  
    // Crear estrellas según cantidad
    for (let i = 1; i <= total; i++) {
      const estrella = document.createElement('span');
      estrella.textContent = '★';
      if (i <= calificacion) estrella.classList.add('activa');
      estrellasContainer.appendChild(estrella);
    }
  
    // Toggle corazón
    corazon.addEventListener('click', () => {
      corazon.classList.toggle('activo');
    });
  });
  
  