// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto agregado al carrito');
}

// Función para calcular y mostrar el total del carrito
function calcularTotales(carrito) {
    let subtotal = 0;
    let totalTarjeta = 0;
    let totalGeneral = 0;

    carrito.forEach(producto => {
        console.log(producto);
        subtotal += producto.precioFinal * (producto.cantidad || 1);
        const cantidad = parseInt(producto.cantidad, 10) || 1;  // Definir cantidad en 1 si es inválido
        const precio = parseFloat(producto.precioFinal) || 0;  // Definir precio en 0 si es inválido
    
        if (isNaN(precio) || isNaN(cantidad)) {
            console.error(`Error en el producto: Precio o cantidad inválido en producto ID ${producto.id}`);
        }
    
        subtotal += precio * cantidad;
        totalTarjeta += (precio * 0.95) * cantidad;
        totalGeneral += precio * cantidad;
        //console.log(carrito);   Verificar que cada producto tiene los campos precioFinal y cantidad

    });
    

    // Actualizar los valores en el resumen de compra
    if (document.getElementById('subtotal')) {
        document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString()}`;
    }
    if (document.getElementById('total-tarjeta')) {
        document.getElementById('total-tarjeta').textContent = `$${totalTarjeta.toLocaleString()}`;
    }
    if (document.getElementById('total-general')) {
        document.getElementById('total-general').textContent = `$${totalGeneral.toLocaleString()}`;
    }
}


// Función para renderizar los productos en carrito.html
function renderCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carrito-items');
    const carritoHeader = document.getElementById('carrito-header');

    if (!carritoContainer || !carritoHeader) {
        console.error('Elementos del carrito no encontrados en el DOM.');
        return;
    }

    carritoContainer.innerHTML = '';  // Limpiar el contenido anterior

    // Actualizar la cantidad de productos en el carrito
    carritoHeader.textContent = `Tu Carro (${carrito.length} producto${carrito.length !== 1 ? 's' : ''})`;

    carrito.forEach((producto, index) => {
        const item = document.createElement('div');
        item.classList.add('producto-carrito');

        item.innerHTML = `
        <img src="${producto.imagen[1]}" alt="${producto.titulo}" class="imagen-carrito">
            <h2 class="title-carrito">${producto.titulo}</h2>
            
            <div class="carrito-item-cantidad">
              <label for="cantidad">Cantidad:</label>
              <input type="number" class="cantidad" name="cantidad" value="${producto.cantidad || 1}" min="1" data-index="${index}">
            </div>
      
            <p>Precio Final: ${producto.precioFinal.toLocaleString()}</p>
            
            <div class="acciones-producto">
              <button class="eliminar-item" data-id="${producto.id}">Eliminar</button>
            </div>
        `;
        carritoContainer.appendChild(item);
    });

    // Asignar eventos a los inputs de cantidad y botones de eliminar
    document.querySelectorAll('.cantidad').forEach(input => {
        input.addEventListener('change', (e) => {
            const index = e.target.dataset.index;
            actualizarCantidad(index, e.target.value);
        });
    });

    document.querySelectorAll('.eliminar-item').forEach(button => {
        button.addEventListener('click', (e) => {
            eliminarProducto(e.target.dataset.id);
        });
    });

    // Calcular totales después de renderizar
    calcularTotales(carrito);
}

// Función para actualizar la cantidad de un producto en el carrito
function actualizarCantidad(index, nuevaCantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito[index]) {
        carrito[index].cantidad = parseInt(nuevaCantidad, 10);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderCarrito();  // Volver a renderizar el carrito con los cambios
    } else {
        console.error("Producto no encontrado en el carrito.");
    }
}

// Función para eliminar productos del carrito
function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(producto => producto.id !== id);  // Filtrar el producto eliminado
    localStorage.setItem('carrito', JSON.stringify(carrito));  // Guardar el carrito actualizado
    renderCarrito();  // Volver a renderizar el carrito
}

// Cargar el carrito cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", renderCarrito);

