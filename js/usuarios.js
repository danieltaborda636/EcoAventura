function mostrarSeccion(id) {
    const secciones = ['cuenta', 'contrasena', 'seguridad', 'favoritos', 'operadores'];
    secciones.forEach(sec => {
      document.getElementById(sec).style.display = (sec === id) ? 'block' : 'none';
    });

    document.querySelectorAll('.sidebar ul li').forEach(li => li.classList.remove('active'));
    const botones = document.querySelectorAll('.sidebar ul li');
    botones.forEach(btn => {
      if (btn.textContent.toLowerCase().includes(id)) {
        btn.classList.add('active');
      }
    });
  }

  function mostrarVistaPrevia(input) {
    const preview = document.getElementById('preview-img');
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      preview.src = '';
      preview.style.display = 'none';
    }
  }

  
  
  function toggleFavorite(element) {
    element.classList.toggle("active");
  }
