const carouselWrapper = document.querySelector('.carousel-wrapper');
const cardGroup = document.querySelector('.card-group');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

// Clonamos para efecto de bucle
const firstClone = cardGroup.children[0].cloneNode(true);
const lastClone = cardGroup.children[cardGroup.children.length - 1].cloneNode(true);
cardGroup.appendChild(firstClone);
cardGroup.insertBefore(lastClone, cardGroup.firstChild);

let updatedCards = document.querySelectorAll('.card');
let currentIndex = 1;

let updateCardWidth = () => {
    const card = updatedCards[0];
    const gap = 20; // mismo gap que en CSS
    const cardWidth = card.offsetWidth + gap;
    return cardWidth;
};

let cardWidth = updateCardWidth();

// Posición inicial
cardGroup.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

// Función para mover el carrusel
function updateCarousel(transition = true) {
    cardWidth = updateCardWidth();
    cardGroup.style.transition = transition ? 'transform 0.5s ease-in-out' : 'none';
    cardGroup.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

// Botón siguiente
nextButton.addEventListener('click', () => {
    if (currentIndex >= updatedCards.length - 1) return;
    currentIndex++;
    updateCarousel();

    setTimeout(() => {
        if (currentIndex === updatedCards.length - 1) {
            currentIndex = 1;
            updateCarousel(false);
        }
    }, 500);
});

// Botón anterior
prevButton.addEventListener('click', () => {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateCarousel();

    setTimeout(() => {
        if (currentIndex === 0) {
            currentIndex = updatedCards.length - 2;
            updateCarousel(false);
        }
    }, 500);
});

// Ajustar al redimensionar
window.addEventListener('resize', () => {
    cardWidth = updateCardWidth();
    updateCarousel(false);
});





// Actualiza el ancho de la tarjeta si la ventana cambia de tamaño
window.addEventListener('resize', updateCardWidth);


// Selecciona el contenedor donde se van a agregar las hojas efecto de caida de hojas para el acerca de 
const contenedor = document.querySelector(".contenedor-hojas");
function crearHoja() {
    // Crea un nuevo elemento <div> para representar una hoja
    const hoja = document.createElement("div");
  
    // Le añade la clase CSS "hoja" para que tenga el estilo definido en el CSS
    hoja.classList.add("hoja");
  
    // Posiciona la hoja horizontalmente en una posición aleatoria de la pantalla
    hoja.style.left = `${Math.random() * 100}%`;
  
    // Asigna una duración de animación aleatoria entre 4 y 9 segundos
    hoja.style.animationDuration = `${4 + Math.random() * 5}s`;
  
    // Le da una opacidad aleatoria para que no todas las hojas se vean iguales
    hoja.style.opacity = Math.random();
  
    // Agrega la hoja al contenedor
    contenedor.appendChild(hoja);
  
    // Después de 10 segundos, la hoja se elimina del DOM para no saturar la página
    setTimeout(() => {
      hoja.remove();
    }, 10000);
  }
// Ejecuta la función crearHoja cada 500 milisegundos (0.5 segundos)
setInterval(crearHoja, 500);
  
