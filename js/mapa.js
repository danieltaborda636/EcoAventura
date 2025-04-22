const map = L.map('map').setView([4.8143, -75.6946], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const lugares = [
  {
    nombre: "Termales de Santa Rosa de Cabal",
    coords: [4.8686, -75.6210],
    descripcion: "Termales Santa Rosa de Cabal, un lugar lleno de paz y tranquilidad donde podrás disfrutar con tu familia y amigos rodeados de la hermosa vegetación del eje cafetero, ven y conoce este maravilloso balneario, ¡No te arrepentirás!",
    imagen: "/img/sr_termales_santaRosa.png",
    enlace: "/html/info_termales_starosa.html"
  },
  {
    nombre: "Parque Tatamá",
    coords: [5.1000, -76.0000],
    descripcion: "Reserva de biodiversidad y senderismo.",
    imagen: "/img/Prico_parqueTatama_pueblorico.png ",

  },
  {
    nombre: "Santuario de Flora y Fauna Otún",
    coords: [4.72951512909032, -75.5787625037393],
    descripcion: "El Santuario de Fauna y Flora Otún Quimbaya tiene jurisdicción en el municipio de Pereira, departamento de Risaralda, ubicado en el corazón del eje cafetero. Nos encontramos a tan solo 15 kilómetros de la ciudad de Pereira, en el corregimiento de La Florida, Vereda La Suiza, en la cuenca alta del río Otún. En esta área protegida predomina un clima húmedo de montaña, ya que se encuentra entre los 1.750 y 2.276 metros. Somos un Parque con vocación ecoturística, que ofrece como atractivo tres senderos ecoturísticos: El Humedal, Bejucos y El río.",
    imagen: "/img/santuario-de-fauna-quinballa.jpg",
    enlace: "/html/info_santuario.html"
  },
  {
    nombre: "La pastora",
    coords: [4.708451482029201, -75.48699932951135],
    descripcion: "El Parque Regional Natural Ucumarí con una extensión aproximada de 3.900 hectáreas está ubicado en la cuenca del río Otún (1.850 -2600 m.s.n.m) en la zona amortiguadora del Parque Nacional Natural Nevados, y tiene como objetivo principal contribuir a la conservación de la cuenca del río Otún que abastece de agua a las cabeceras urbanas de  Pereira y Dosquebradas. Fue declarado en 1984.",
    imagen: "/img/p_laPastora.png",
    enlace: "/html/info_pastora.html"
  }
];

// Mostrar los lugares turísticos
lugares.forEach(lugar => {
  const marker = L.marker(lugar.coords).addTo(map);


const popupContent = `
  <div class="popup-custom">
    <strong>${lugar.nombre}</strong><br>
    <em>${lugar.descripcion}</em><br>
    <img src="${lugar.imagen}" alt="${lugar.nombre}" /><br>
    <a href="${lugar.enlace}" target="_blank">Ver más detalles</a>
  </div>
`;

  const popup = L.popup({
    closeButton: true, // Permitimos el botón de cerrar
    autoClose: false,  // Desactivamos el cierre automático
    closeOnClick: false // Desactivamos el cierre cuando se hace clic fuera del popup
  }).setContent(popupContent);

  // Evitar que el popup se cierre al hacer clic en el enlace
  const link = document.getElementById(`popup-link-${lugar.nombre.replace(/\s+/g, '').toLowerCase()}`);
  if (link) {
    link.addEventListener('click', (e) => {
      e.stopPropagation();  // Prevenir que el evento de clic cierre el popup
    });
  }

  // Abrir el popup al hacer clic en el marcador
  marker.on("click", () => marker.bindPopup(popup).openPopup());

  // Si quieres cerrar el popup al hacer clic fuera, puedes dejarlo así:
  map.on("click", () => {
    map.closePopup();
  });
});
   // Ícono personalizado rojo
   const iconoRojo = L.icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
    // Geolocalización del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const marcadorUsuario = L.marker([lat, lon], { icon: iconoRojo })
          .addTo(map)
          .bindPopup("📍 Estás aquí")
          .openPopup();

        map.setView([lat, lon], 12); // Centrar el mapa en el usuario
      }, () => {
        alert("No pudimos obtener tu ubicación 🧭");
      });
    } else {
      alert("Tu navegador no soporta geolocalización");
    }
