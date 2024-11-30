// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    showNotification('Producto agregado al carrito');
}

// Función para calcular y mostrar el total del carrito
function calcularTotales(carrito) {
    let subtotal = 0;
    let totalConEnvio = 0;
    let totalTarjeta = 0;
    const costoEnvio = 9990;  // Costo fijo del envío

    carrito.forEach(producto => {
        const cantidad = parseInt(producto.cantidad, 10) || 1;
        const precio = parseFloat(producto.precioFinal.replace('$', '').replace(',', '')) || 0;

        subtotal += precio * cantidad;
    });

    totalConEnvio = subtotal + costoEnvio;
    totalTarjeta = totalConEnvio * 0.95;

    // Actualizar los valores en el resumen de compra
    document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString()}`;
    document.getElementById('total-con-envio').textContent = `$${totalConEnvio.toLocaleString()}`;
    document.getElementById('total-tarjeta').textContent = `$${totalTarjeta.toLocaleString()}`;
}

// Función para renderizar los productos en carrito.html
function renderCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carrito-items');
    const carritoHeader = document.getElementById('carrito-header');

    carritoContainer.innerHTML = '';
    carritoHeader.textContent = `Tu Carro (${carrito.length} producto${carrito.length !== 1 ? 's' : ''})`;

    // carrito.forEach((producto, index) => {
    //     const item = document.createElement('div');
    //     item.classList.add('producto-carrito');
    //     item.innerHTML = `
    //         <img src="${producto.imagen[1]}" alt="${producto.titulo}" class="imagen-carrito">
    //         <h2 class="title-carrito">${producto.titulo}</h2>
    //         <div class="carrito-item-cantidad">
    //           <label for="cantidad">Cantidad:</label>
    //           <input type="number" class="cantidad" name="cantidad" value="${producto.cantidad || 1}" min="1" data-index="${index}">
    //         </div>
    //         <p>Precio Final: $${Number(producto.precioFinal).toLocaleString('es-CL')}</p>

    //         <div class="acciones-producto">
    //           <button class="eliminar-item" data-id="${producto.id}">Eliminar</button>
    //         </div>
    //     `;
    //     carritoContainer.appendChild(item);
    // });

    carrito.forEach(producto => {
        const item = document.createElement('div');
        item.classList.add('producto-carrito'); // Usamos la clase de diseño definida en el CSS
        item.innerHTML = `
            <div class="imagen-container">
                <a href="${producto.url}">
                    <img src="${producto.imagen[1]}" alt="${producto.titulo}" class="imagen-carrito"
                    onerror="this.onerror=null; this.src='${ajustarRuta(producto.imagen[1])}';">
                </a>
            </div>
            <div class="info">
                <h2 class="title-carrito">${producto.titulo}</h2>
                <p class="title-marca">Marca: ${producto.marca}</p>
                <div class="carrito-item-cantidad">
                    <label for="cantidad-${producto.id}">Cantidad:</label>
                    <input type="number" class="cantidad" id="cantidad-${producto.id}" name="cantidad" 
                    value="${producto.cantidad || 1}" min="1" data-id="${producto.id}">
                </div>
                <p class="precio-carrito">Precio Final: $${Number(producto.precioFinal).toLocaleString('es-CL')}</p>
                <div class="acciones-producto">
                    <button class="btn-agregar-favoritos" data-id="${producto.id}">Agregar a Favoritos</button>
                    <button class="eliminar-item" data-id="${producto.id}">Eliminar</button>
                </div>
            </div>
        `;
        carritoContainer.appendChild(item);
    });
    
    

    document.querySelectorAll('.cantidad').forEach(input => {
        input.addEventListener('change', (e) => {
            const index = e.target.dataset.index;
            actualizarCantidad(index, e.target.value);
        });
    });

    document.querySelectorAll('.btn-agregar-favoritos').forEach(button => {
        button.addEventListener('click', (e) => {
            const productoId = e.target.dataset.id;
            const producto = carrito.find(p => p.id === productoId);
    
            if (producto) {
                let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
                const yaEnFavoritos = favoritos.some(fav => fav.id === producto.id);
    
                if (!yaEnFavoritos) {
                    favoritos.push(producto);
                    localStorage.setItem('favoritos', JSON.stringify(favoritos));
                    showNotification("Producto agregado a favoritos."); // Usamos la función de notificación
                } else {
                    showNotification("El producto ya está en favoritos."); // Mensaje de duplicado
                }
            }
        });
    });
    
    

    document.querySelectorAll('.eliminar-item').forEach(button => {
        button.addEventListener('click', (e) => {
            eliminarProducto(e.target.dataset.id);
        });
    });

    calcularTotales(carrito);
}

// Función para actualizar la cantidad de un producto en el carrito
function actualizarCantidad(index, nuevaCantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito[index]) {
        carrito[index].cantidad = parseInt(nuevaCantidad, 10);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderCarrito();
    }
}

// Función para eliminar productos del carrito
function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(producto => producto.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
}

document.addEventListener("DOMContentLoaded", renderCarrito);
