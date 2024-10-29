document.addEventListener('DOMContentLoaded', function () {
    let jsonFile = 'productos.json';
    if (window.location.pathname.includes('/html/')) {
        jsonFile = '../productos.json';
    }

    function ajustarRuta(url) {
        return window.location.pathname.includes('/html/') ? `../${url}` : url;
    }

    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('.card-slider').forEach(slider => {
                const categoria = slider.getAttribute('data-categoria');
                const productosFiltrados = data.filter(producto => producto.categoria === categoria);

                if (productosFiltrados.length === 0) return;

                productosFiltrados.forEach(producto => {
                    const cardHTML = `
                    <div class="card" data-id="${producto.id}">
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
                                <button class="price-button">$${Number(producto.precioFinal).toLocaleString('es-CL')}</button>
                                <p class="discount-label">${producto.descuento}% OFF</p>
                            </div>
                            <p class="installments">${producto.cuotas}</p>
                        </div>
                    </div>`;

                    slider.insertAdjacentHTML('beforeend', cardHTML);
                });

                initializeSlider(slider.id);
                initializeFavoriteIcons(slider, data);
            });
        })
        .catch(error => console.error('Error cargando productos:', error));

    function renderStars(rating) {
        return Array.from({ length: 5 }, (_, i) => i < rating ? '★' : '☆').join('');
    }

    function initializeSlider(sliderId) {
        let sliders = {};
        document.querySelectorAll('.card-slider').forEach(slider => {
            const totalCards = slider.querySelectorAll('.card').length;
            sliders[slider.id] = {
                currentIndex: 0,
                totalCards: totalCards,
                cardsToShow: 4,
                cardWidth: 250
            };
        });

        window.moveSlider = function (sliderId, n) {
            const slider = document.getElementById(sliderId);
            const { totalCards, cardsToShow, cardWidth } = sliders[sliderId];
            const maxIndex = totalCards - cardsToShow;
            sliders[sliderId].currentIndex += n;
            if (sliders[sliderId].currentIndex < 0) sliders[sliderId].currentIndex = maxIndex;
            if (sliders[sliderId].currentIndex > maxIndex) sliders[sliderId].currentIndex = 0;
            slider.style.transform = `translateX(${-sliders[sliderId].currentIndex * cardWidth}px)`;
        };
    }

    function initializeFavoriteIcons(slider, data) {
        const favoriteIcons = slider.querySelectorAll('.favorite-icon');
        favoriteIcons.forEach(icon => {
            icon.addEventListener('click', function () {
                const card = this.closest('.card');
                const productId = card.getAttribute('data-id');
                const producto = data.find(p => p.id === productId);

                this.classList.toggle('active');
                const heartIcon = this.querySelector('i');
                heartIcon.classList.toggle('fas');
                heartIcon.classList.toggle('far');

                toggleFavorite(producto);
            });
        });
    }

    // Función para agregar o eliminar un producto de favoritos en localStorage
    function toggleFavorite(producto) {
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        const productoIndex = favoritos.findIndex(item => item.id === producto.id);

        if (productoIndex === -1) {
            favoritos.push(producto);
            alert("Producto agregado a favoritos");
        } else {
            favoritos.splice(productoIndex, 1);
            alert("Producto eliminado de favoritos");
        }

        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }
});
