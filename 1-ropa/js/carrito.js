// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];  // Obtener el carrito desde localStorage
    carrito.push(producto);  // Agregar el nuevo producto
    localStorage.setItem('carrito', JSON.stringify(carrito));  // Guardar el carrito actualizado
    alert('Producto agregado al carrito');
}

// Función para renderizar los productos en carrito.html
function renderCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carrito-items');

    carritoContainer.innerHTML = '';  // Limpiar el contenido anterior

    carrito.forEach(producto => {
        const item = document.createElement('div');
        item.classList.add('producto-carrito');

        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <div class="info">
                <h2>${producto.titulo}</h2>
                <p>Precio: $${producto.precioFinal}</p>
                <p>Cantidad: 1</p>
            </div>
        `;
        carritoContainer.appendChild(item);
    });
}

// Cargar el carrito cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", renderCarrito);
