let sliders = {};

document.querySelectorAll('.card-slider').forEach(slider => {
    const sliderId = slider.id;
    const totalCards = slider.querySelectorAll('.card').length;
    sliders[sliderId] = {
        currentIndex: 0,
        totalCards: totalCards,
        cardsToShow: 4,  // Puedes cambiarlo dinámicamente dependiendo del tamaño de pantalla
        cardWidth: 250
    };
});

function moveSlider(sliderId, n) {
    const slider = document.getElementById(sliderId);
    const { totalCards, cardsToShow, cardWidth } = sliders[sliderId];
    const maxIndex = totalCards - cardsToShow;

    // Actualiza el índice actual
    sliders[sliderId].currentIndex += n;

    // Si el índice es menor a 0, vuelve al final
    if (sliders[sliderId].currentIndex < 0) {
        sliders[sliderId].currentIndex = maxIndex;
    }

    // Si el índice es mayor al máximo, vuelve al principio
    if (sliders[sliderId].currentIndex > maxIndex) {
        sliders[sliderId].currentIndex = 0;
    }

    // Desliza las cards
    slider.style.transform = `translateX(${-sliders[sliderId].currentIndex * cardWidth}px)`;
}

// Manejo de iconos favoritos (funcional para todos los sliders)
const favoriteIcons = document.querySelectorAll('.favorite-icon');

favoriteIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        this.classList.toggle('active');
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
