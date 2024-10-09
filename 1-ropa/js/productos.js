// Función para renderizar el producto en el HTML
function renderProducto(producto) {
    // Imagen principal del producto
    document.querySelector('.imagen-principal img').src = producto.miniaturas[0];


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
}

// Función para obtener los datos del producto
function obtenerProducto() {
    fetch('../productos.json')
        .then(response => response.json())
        .then(data => {
            // Aquí suponiendo que tienes un array de productos en tu JSON
            const producto = data.find(p => p.titulo === "Run Falcon 2.0"); // Puedes cambiar esta condición
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
