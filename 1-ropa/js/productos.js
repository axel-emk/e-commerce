// Función para obtener parámetros de la URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Función para detectar si estamos en el index o una página interna
function isInnerPage() {
    const currentUrl = window.location.href;
    return currentUrl.includes("/html/");
}

// Función para obtener la ruta correcta para productos.json
function getJsonPath() {
    if (isInnerPage()) {
        return '../productos.json';  // Para páginas internas como niños.html
    }
    return './productos.json'; // Para la página principal (index.html)
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
    document.querySelector('.price-button').textContent = `$${Number(producto.precioFinal).toLocaleString('es-CL')}`;


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
    const jsonPath = getJsonPath(); // Obtenemos la ruta correcta para el archivo JSON

    fetch(jsonPath)
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


// Función para agregar producto a favoritos
function agregarAFavoritos(producto) {
    // Obtener productos favoritos guardados en localStorage (si existen)
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    // Agregar el producto actual a los favoritos
    favoritos.push(producto);
    
    // Guardar de nuevo en localStorage
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    
    alert("Producto agregado a favoritos");
}

// Asignar el evento al botón de "Agregar a Favoritos"
document.querySelector('.boton-favoritos').addEventListener('click', function() {
    const productoId = getQueryParam('id');
    fetch(getJsonPath())
        .then(response => response.json())
        .then(data => {
            const producto = data.find(p => p.id === productoId);
            if (producto) {
                agregarAFavoritos(producto);
            }
        });
});

// Obtener datos del producto actual
function obtenerProducto() {
    const jsonPath = getJsonPath(); 

    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            const productoId = getQueryParam('id');
            const producto = data.find(p => p.id === productoId);

            if (producto) {
                renderProducto(producto);

                // Añadir evento al botón de "Agregar al Carrito"
                document.querySelector('.boton-carrito').addEventListener('click', function() {
                    agregarAlCarrito(producto);
                });
            } else {
                console.error("Producto no encontrado.");
            }
        })
        .catch(error => console.error('Error al obtener el producto:', error));
}
