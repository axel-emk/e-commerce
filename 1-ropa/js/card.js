let currentIndex = 0;
const cardsToShow = 4;  // Cambiar dependiendo del número de cards a mostrar según el tamaño de la pantalla
const cardWidth = 250;
const totalCards = document.querySelectorAll('.card').length;

function moveSlider(n) {
    const slider = document.querySelector('.card-slider');
    const maxIndex = totalCards - cardsToShow;

    // Actualiza el índice actual
    currentIndex += n;

    // Si el índice es menor a 0, vuelve al principio
    if (currentIndex < 0) {
        currentIndex = maxIndex;
    }

    // Si el índice es mayor al máximo, vuelve al inicio
    if (currentIndex > maxIndex) {
        currentIndex = 0;
    }

    // Desliza las cards
    slider.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
}


// Seleccionar todos los iconos de favoritos dentro de las cards
const favoriteIcons = document.querySelectorAll('.favorite-icon');

// Agregar evento click a cada ícono de favorito
favoriteIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        this.classList.toggle('active'); // Cambiar el estado activo

        // Alternar el ícono entre corazón vacío y relleno
        const heartIcon = this.querySelector('i');
        if (heartIcon.classList.contains('far')) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
        } else {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
        }
    });
});
