document.addEventListener('DOMContentLoaded', function () {
    function ajustarRuta(url) {
        if (!url.startsWith("./") && !url.startsWith("../")) {
            return url;
        }
        return window.location.pathname.includes('/html/') ? `../${url.replace('../', '')}` : url.replace('./', '');
    }

    function actualizarHeaderFavoritos() {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        const favoritosHeader = document.getElementById('favoritos-header');
        favoritosHeader.textContent = `Tus Favoritos (${favoritos.length} producto${favoritos.length !== 1 ? 's' : ''})`;
    }

    function mostrarFavoritos() {
        const favoritosContainer = document.querySelector('#favoritos-items');
        favoritosContainer.innerHTML = ""; 

        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        actualizarHeaderFavoritos();

        if (favoritos.length === 0) {
            favoritosContainer.innerHTML = "<p>No tienes productos en favoritos.</p>";
            return;
        }

        favoritos.forEach(producto => {
            const estrellas = Array.from({ length: 5 }, (_, i) => i < producto.valoracion ? '★' : '☆').join('');
            const imagenURL = ajustarRuta(producto.miniaturas[0]);
            const productoURL = ajustarRuta(producto.url);

            const itemHTML = `
                <div class="favoritos-item">
                    <a href="${productoURL}">
                        <img src="${imagenURL}" alt="${producto.titulo}" onerror="this.onerror=null; this.src='${ajustarRuta(producto.imagen[1])}';">
                    </a>
                    <div class="info">
                        <a href="${productoURL}">
                            <h2>${producto.titulo}</h2>
                        </a>
                        <p>Marca: ${producto.marca}</p>
                        <p class="rating">${estrellas}</p>
                        <p>Precio: $${Number(producto.precioFinal).toLocaleString('es-CL')}</p>
                        <p>${producto.cuotas}</p>
                        <button class="btn-carrito" data-id="${producto.id}">Agregar al carrito</button>
                        <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
                    </div>
                </div>
            `;
            favoritosContainer.insertAdjacentHTML('beforeend', itemHTML);
        });

        document.querySelectorAll('.btn-eliminar').forEach(button => {
            button.addEventListener('click', (e) => {
                eliminarFavorito(e.target.dataset.id);
            });
        });

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

    function eliminarFavorito(id) {
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        favoritos = favoritos.filter(producto => producto.id !== id);
        localStorage.setItem('favoritos', JSON.stringify(favoritos)); 
        mostrarFavoritos();
    }

    mostrarFavoritos();
});
