function mostrarSeccion(id) {
  const secciones = ['cuenta', 'contrasena', 'seguridad', 'favoritos', 'operadores'];

  // Mostrar la sección seleccionada
  secciones.forEach(sec => {
    document.getElementById(sec).style.display = (sec === id) ? 'block' : 'none';
  });

  // Cambiar clase activa en el menú
  document.querySelectorAll('.sidebar ul li').forEach(li => {
    li.classList.toggle('active', li.dataset.section === id);
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

  const flagSelect = document.getElementById('flag-select');
  const flagImage = document.getElementById('flag');

  flagSelect.addEventListener('change', () => {
    const countryCode = flagSelect.value;
    flagImage.src = `https://flagcdn.com/w80/${countryCode}.png`;
    flagImage.alt = `Bandera de ${flagSelect.options[flagSelect.selectedIndex].text}`;
  });