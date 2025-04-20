// Menú hamburguesa toggle
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Dropdown perfil toggle (móviles)
const profileIcon = document.getElementById('profileIcon');
const profileDropdown = document.getElementById('profileDropdown');

profileIcon.addEventListener('click', (e) => {
  e.stopPropagation(); // Evita que se cierre al hacer clic
  profileDropdown.classList.toggle('show-dropdown');
});

// Cierra dropdown si se hace clic fuera
document.addEventListener('click', (e) => {
  if (!profileDropdown.contains(e.target) && !profileIcon.contains(e.target)) {
    profileDropdown.classList.remove('show-dropdown');
  }
});