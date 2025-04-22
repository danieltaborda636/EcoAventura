// Lista de destinos (simulados)
const destinos = [
    {
      nombre: "Parque Nacional Tatamá",
      municipio: "Pueblo Rico",
      tipo: "montaña",
      coordenadas: [5.2, -76.1],
      desde: "2025-04-01",
      hasta: "2025-12-31"
    },
    {
      nombre: "Bosque de Nieblas",
      municipio: "Santa Rosa de Cabal",
      tipo: "bosque",
      coordenadas: [4.870, -75.600],
      desde: "2025-05-01",
      hasta: "2025-11-30"
    },
    {
      nombre: "Río Otún",
      municipio: "Pereira",
      tipo: "río",
      coordenadas: [4.814, -75.689],
      desde: "2025-06-01",
      hasta: "2025-10-30"
    },
    {
      nombre: "Pueblo de Marsella",
      municipio: "Marsella",
      tipo: "pueblo",
      coordenadas: [4.939, -75.768],
      desde: "2025-04-15",
      hasta: "2025-12-01"
    }
  ];
  
  // Inicializar el mapa
  const map = L.map('map').setView([4.813, -75.690], 9);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  
  let marcadores = [];
  
  // Mostrar destinos en el mapa
  function mostrarDestinos(filtrados) {
    marcadores.forEach(m => map.removeLayer(m));
    marcadores = [];
  
    filtrados.forEach(destino => {
      const marker = L.marker(destino.coordenadas)
        .addTo(map)
        .bindPopup(`<strong>${destino.nombre}</strong><br>${destino.municipio}<br>Tipo: ${destino.tipo}`);
      marcadores.push(marker);
    });
  
    if (filtrados.length > 0) {
      map.setView(filtrados[0].coordenadas, 10);
    }
  }
  
  // Filtros
  document.getElementById("buscarBtn").addEventListener("click", () => {
    const municipioInput = document.getElementById("municipio").value.toLowerCase();
    const tipo = document.getElementById("tipo").value;
    const inicio = document.getElementById("inicio").value;
    const fin = document.getElementById("fin").value;
  
    const filtrados = destinos.filter(destino => {
      const matchMunicipio = municipioInput === "" || destino.municipio.toLowerCase().includes(municipioInput);
      const matchTipo = tipo === "" || destino.tipo === tipo;
      const matchFecha =
        (!inicio || new Date(destino.desde) <= new Date(inicio)) &&
        (!fin || new Date(destino.hasta) >= new Date(fin));
      
      return matchMunicipio && matchTipo && matchFecha;
    });
  
    mostrarDestinos(filtrados);
  
    if (filtrados.length === 0) {
      alert("No se encontraron destinos que coincidan con los filtros.");
    }
  });
  
  // Mostrar todos los destinos al cargar
  mostrarDestinos(destinos);
  