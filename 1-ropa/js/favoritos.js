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
            const estrellas = Array.from({ length: 5 }, (_, i) => i < producto.valoracion ? '★' : '☆').join('');

            const favoritoHTML = `
                <div class="card">
                    <img src="${producto.miniaturas[0]}" alt="${producto.titulo}" class="card-img">
                    <div class="contenido">
                        <p class="card-brand">${producto.marca}</p>
                        <h2 class="card-title">${producto.titulo}</h2>
                        <p class="rating">${estrellas}</p>
                        <p class="price-button">$${Number(producto.precioFinal).toLocaleString('es-CL')}</p>
                        <p class="installments">${producto.cuotas}</p>
                        <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
                        <button class="btn-carrito" data-id="${producto.id}">Agregar al carrito</button>
                    </div>
                </div>
            `;
            favoritosContainer.insertAdjacentHTML('beforeend', favoritoHTML);
        });

        // Asignar el evento de eliminar a los botones
        document.querySelectorAll('.btn-eliminar').forEach(button => {
            button.addEventListener('click', (e) => {
                eliminarFavorito(e.target.dataset.id);
            });
        });

        // Asignar el evento de agregar al carrito a los botones
        document.querySelectorAll('.btn-carrito').forEach(button => {
            button.addEventListener('click', (e) => {
                const productoId = e.target.dataset.id;
                const producto = favoritos.find(p => p.id === productoId);
                if (producto) {
                    agregarAlCarrito(producto);
                }
            });
        });
    }

    // Función para eliminar un producto de favoritos
    function eliminarFavorito(id) {
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        favoritos = favoritos.filter(producto => producto.id !== id);  // Filtrar el producto eliminado
        localStorage.setItem('favoritos', JSON.stringify(favoritos));  // Guardar favoritos actualizados
        mostrarFavoritos();  // Volver a renderizar los favoritos
    }

    // Función para agregar un producto al carrito
    function agregarAlCarrito(producto) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert('Producto agregado al carrito');
    }

    mostrarFavoritos();
});
