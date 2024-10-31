document.addEventListener('DOMContentLoaded', function () {
    function ajustarRuta(url) {
        // Si la URL no comienza con "./" o "../", asume que es relativa al nivel de carpeta actual
        if (!url.startsWith("./") && !url.startsWith("../")) {
            return url;
        }
        
        // Ajusta la URL en base a la ubicación actual
        if (window.location.pathname.includes('/html/')) {
            return `../${url.replace('../', '')}`; // Remueve un nivel si ya estamos en /html/
        } else {
            return url.replace('./', ''); // Usamos la ruta tal cual si estamos en la raíz
        }
    }
    

function mostrarFavoritos() {
    const favoritosContainer = document.querySelector('#favoritos-items');
    favoritosContainer.innerHTML = ""; 

    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    if (favoritos.length === 0) {
        favoritosContainer.innerHTML = "<p>No tienes productos en favoritos.</p>";
        return;
    }

    favoritos.forEach(producto => {
        const estrellas = Array.from({ length: 5 }, (_, i) => i < producto.valoracion ? '★' : '☆').join('');

        // Ajustamos las URLs para la imagen y el enlace del producto
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
