// Función para obtener parámetros de la URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Función para renderizar el producto en el HTML
function renderProducto(producto) {
    // Imagen principal del producto
    document.querySelector('.imagen-principal img').src = producto.miniaturas[0];
    document.querySelector('.imagen-principal img').onerror = function() {
        this.onerror = null;
        this.src = producto.imagen[1];
    };

    // Renderizar miniaturas
    const miniaturasContainer = document.querySelector('.miniaturas');
    miniaturasContainer.innerHTML = ""; // Limpiar las miniaturas anteriores
    producto.miniaturas.forEach((miniatura) => {
        const imgElement = document.createElement('img');
        imgElement.src = miniatura;
        imgElement.alt = "Miniatura del producto";
        miniaturasContainer.appendChild(imgElement);

        // Cambiar la imagen principal al hacer clic en una miniatura
        imgElement.addEventListener('click', () => {
            document.querySelector('.imagen-principal img').src = miniatura;
        });
    });

    // Título del producto
    document.querySelector('.producto-titulo').textContent = producto.titulo;

    // Marca del producto
    document.querySelector('.card-brand2').textContent = producto.marca;

    // Precio anterior
    document.querySelector('.old-price span').textContent = producto.precioAnterior;

    // Precio final
    document.querySelector('.price-button').textContent = producto.precioFinal;

    // Descuento
    document.querySelector('.discount-label').textContent = producto.descuento + "% OFF";

    // Cuotas
    document.querySelector('.installments2').textContent = producto.cuotas;

    // Descripción
    document.querySelector('.producto-descripcion').textContent = producto.descripcion;

    // Valoración (estrellas)
    const ratingContainer = document.querySelector('.rating');
    ratingContainer.innerHTML = ""; // Limpiar las estrellas anteriores
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        star.textContent = i < producto.valoracion ? '★' : '☆';
        ratingContainer.appendChild(star);
    }

    // Opciones de talla
    const tallaSelect = document.getElementById('talla');
    tallaSelect.innerHTML = ""; // Limpiar opciones anteriores
    producto.tallas.forEach(talla => {
        const option = document.createElement('option');
        option.value = talla;
        option.textContent = talla;
        tallaSelect.appendChild(option);
    });

    // Opciones de color
    const colorSelect = document.getElementById('color');
    colorSelect.innerHTML = ""; // Limpiar opciones anteriores
    producto.colores.forEach(color => {
        const option = document.createElement('option');
        option.value = color;
        option.textContent = color;
        colorSelect.appendChild(option);
    });
}

// Función para obtener los datos del producto
function obtenerProducto() {
    fetch('../productos.json')
        .then(response => response.json())
        .then(data => {
            // Obtener el ID del producto desde la URL
            const productoId = getQueryParam('id');

            // Buscar el producto en el JSON usando el ID
            const producto = data.find(p => p.id === productoId);

            if (producto) {
                renderProducto(producto);
            } else {
                console.error("Producto no encontrado.");
            }
        })
        .catch(error => console.error('Error al obtener el producto:', error));
}

// Llamar a la función de renderizado cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", obtenerProducto);
