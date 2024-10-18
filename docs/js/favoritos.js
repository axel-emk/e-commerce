document.addEventListener('DOMContentLoaded', function () {
    // Función para mostrar los productos favoritos
    function mostrarFavoritos() {
        const favoritosContainer = document.querySelector('.favoritos-container');
        favoritosContainer.innerHTML = "";  // Limpiar contenedor

        // Obtener los productos favoritos desde localStorage
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

        if (favoritos.length === 0) {
            favoritosContainer.innerHTML = "<p>No tienes productos en favoritos.</p>";
            return;
        }

        // Recorrer los productos favoritos y renderizarlos
        favoritos.forEach(producto => {
            const favoritoHTML = `
                <div class="card">
                    <img src="${producto.miniaturas[0]}" alt="${producto.titulo}" class="card-img">
                    <div class="contenido">
                        <p class="card-brand">${producto.marca}</p>
                        <h2 class="card-title">${producto.titulo}</h2>
                        <p class="price-button">$${Number(producto.precioFinal).toLocaleString('es-CL')}</p>
                        <p class="installments">${producto.cuotas}</p>
                    </div>
                </div>
            `;
            favoritosContainer.insertAdjacentHTML('beforeend', favoritoHTML);
        });
    }

    mostrarFavoritos();
});
