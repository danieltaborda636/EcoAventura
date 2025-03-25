// Selecciona los elementos del DOM
const carouselWrapper = document.querySelector('.carousel-wrapper');
const cardGroup = document.querySelector('.card-group');
const cards = document.querySelectorAll('.card');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

// Duplicar las primeras y últimas imágenes para el efecto de carrusel infinito
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

// Agregar clones al DOM
cardGroup.appendChild(firstClone);
cardGroup.insertBefore(lastClone, cards[0]);

// Actualizar la lista de tarjetas con los nuevos clones
const updatedCards = document.querySelectorAll('.card');
let currentIndex = 1; // Iniciamos en la primera imagen "real"
let cardWidth = carouselWrapper.offsetWidth; // Ancho dinámico

// Posicionar el carrusel en la primera imagen real
cardGroup.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

// Función para actualizar el carrusel con efecto de transición
function updateCarousel(transition = true) {
    if (transition) {
        cardGroup.style.transition = 'transform 0.5s ease-in-out';
    } else {
        cardGroup.style.transition = 'none';
    }
    cardGroup.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

// Función para actualizar el ancho dinámicamente
function updateCardWidth() {
    cardWidth = carouselWrapper.offsetWidth;
    updateCarousel(false);
}

// Evento para el botón "Siguiente"
nextButton.addEventListener('click', () => {
    if (currentIndex >= updatedCards.length - 1) return;
    currentIndex++;
    updateCarousel();

    // Si llega a la última imagen (clone), salta instantáneamente a la primera imagen real
    setTimeout(() => {
        if (currentIndex === updatedCards.length - 1) {
            currentIndex = 1;
            updateCarousel(false);
        }
    }, 500);
});

// Evento para el botón "Anterior"
prevButton.addEventListener('click', () => {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateCarousel();

    // Si llega a la primera imagen (clone), salta instantáneamente a la última imagen real
    setTimeout(() => {
        if (currentIndex === 0) {
            currentIndex = updatedCards.length - 2;
            updateCarousel(false);
        }
    }, 500);
});

// Actualiza el ancho de la tarjeta si la ventana cambia de tamaño
window.addEventListener('resize', updateCardWidth);
