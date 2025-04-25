const starsContainer = document.getElementById('stars');
    const commentList = document.getElementById('commentList');
    const form = document.getElementById('commentForm');
    const commentText = document.getElementById('commentText');
    let rating = 0;

    // Generar estrellas
    for (let i = 1; i <= 5; i++) {
      const star = document.importNode(document.getElementById('star-template').content, true).children[0];
      star.dataset.value = i;
      star.addEventListener('click', () => {
        rating = i;
        updateStars();
      });
      starsContainer.appendChild(star);
    }

    function updateStars() {
      const stars = starsContainer.querySelectorAll('svg');
      stars.forEach((star, index) => {
        star.classList.toggle('text-yellow-400', index < rating);
        star.classList.toggle('text-gray-400', index >= rating);
      });
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      const text = commentText.value.trim();
      if (!text || rating === 0) return alert('Por favor, escribe un comentario y selecciona una calificación.');

      const li = document.createElement('li');
      li.className = 'bg-green-50 p-3 rounded flex justify-between items-start border border-green-200';
      li.innerHTML = `
        <div>
          <div class="text-yellow-500">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
          <p>${text}</p>
        </div>
        <button class="text-red-600 hover:underline">Eliminar</button>
      `;
      li.querySelector('button').addEventListener('click', () => li.remove());

      commentList.appendChild(li);
      commentText.value = '';
      rating = 0;
      updateStars();
    });