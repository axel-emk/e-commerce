document.addEventListener('DOMContentLoaded', function () {
    // Detectar si estamos en el index o en una página dentro de /html para ajustar la ruta del JSON
    let jsonFile = 'productos.json';
    const urlPath = window.location.pathname;
    if (urlPath.includes('/html/')) {
        jsonFile = '../productos.json';  // Ajustamos la ruta si estamos dentro de una subcarpeta como /html
    }

    // Función para ajustar las URLs dependiendo de la página actual
function ajustarRuta(url) {
    if (window.location.pathname.includes('/html/')) {
        // Si estamos en una página dentro de /html/, ajustamos la ruta para las URLs
        return `../${url}`;
    }
    return url; // Si estamos en el index o en la raíz, no hacemos cambios
}


    
    // Cargar el archivo JSON con los productos
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            // Recorre todos los sliders y carga los productos adecuados
            document.querySelectorAll('.card-slider').forEach(slider => {
                const categoria = slider.getAttribute('data-categoria'); // Obtener la categoría del slider
                const productosFiltrados = data.filter(producto => producto.categoria === categoria); // Filtrar productos por categoría

                // Verificar si hay productos filtrados para la categoría
                if (productosFiltrados.length === 0) {
                    console.warn(`No se encontraron productos para la categoría: ${categoria}`);
                    return;
                }

                // Generar las cards dinámicamente
                productosFiltrados.forEach(producto => {
                    const cardHTML = `
                    <div class="card">
                        <div class="favorite-icon">
                            <i class="far fa-heart"></i>
                        </div>
                        <a href="${ajustarRuta(producto.url)}">
                            <img src="${ajustarRuta(producto.imagen[0])}" alt="${producto.titulo}" class="card-img" 
                            onerror="this.onerror=null; this.src='${ajustarRuta(producto.imagen[1])}';">
                        </a>
                        <div class="contenido">
                            <p class="card-brand">${producto.marca}</p>
                            <a href="${ajustarRuta(producto.url)}">
                                <h2 class="card-title">${producto.titulo}</h2>
                            </a>
                            <div class="rating">
                                ${renderStars(producto.valoracion)}
                            </div>
                            <p class="old-price">Antes: <span>${producto.precioAnterior}</span></p>
                            <div class="price-wrapper">
                                <button class="price-button">${producto.precioFinal}</button>
                                <p class="discount-label">${producto.descuento}% OFF</p>
                            </div>
                            <p class="installments">${producto.cuotas}</p>
                        </div>
                    </div>`;
                
                    
                    // Añadir la card al slider
                    slider.insertAdjacentHTML('beforeend', cardHTML);
                });

                // Inicializamos el slider después de generar las cards
                initializeSlider(slider.id);

                // Inicializar los íconos de favoritos en este slider después de que las tarjetas se generen
                initializeFavoriteIcons(slider);
            });
        })
        .catch(error => console.error('Error cargando productos:', error));

    // Función para renderizar las estrellas
    function renderStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += (i <= rating) ? '★' : '☆';
        }
        return stars;
    }

    // Inicializar el slider
    function initializeSlider(sliderId) {
        let sliders = {};

        // Configuración del slider
        document.querySelectorAll('.card-slider').forEach(slider => {
            const totalCards = slider.querySelectorAll('.card').length;
            sliders[slider.id] = {
                currentIndex: 0,
                totalCards: totalCards,
                cardsToShow: 4,  // Puedes cambiarlo dinámicamente dependiendo del tamaño de pantalla
                cardWidth: 250
            };
        });

        // Función para mover el slider
        window.moveSlider = function (sliderId, n) {
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
        };
    }

    // Función para inicializar los íconos de favoritos
    function initializeFavoriteIcons(slider) {
        // Solo selecciona los íconos de favoritos dentro del slider específico
        const favoriteIcons = slider.querySelectorAll('.favorite-icon');
        
        // Recorre cada ícono de favorito y añade el evento
        favoriteIcons.forEach(icon => {
            icon.addEventListener('click', function () {
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
    }
});

