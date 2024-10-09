// Header
function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.transform = 'translateX(0)';
}

function closeSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.transform = 'translateX(100%)';
}


// ----------------------SEARCH---------------------------------

// Detectar la página actual y ajustar la ruta del JSON
let jsonPath = './productos.json';  // Por defecto, si estamos en index.html

if (window.location.pathname.includes('/html/')) {
    jsonPath = '../productos.json';  // Si estamos en las páginas dentro de la carpeta /html
}

// Usamos fetch para cargar el archivo productos.json
let productos = [];

fetch(jsonPath)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar productos.json');
        }
        return response.json();
    })
    .then(data => {
        productos = data; // Guardar los productos en una variable global
    })
    .catch(error => console.error('Error al cargar productos:', error));

// Función para filtrar los productos
function buscarProductos(query) {
    return productos.filter(producto => {
        const titulo = producto.titulo.toLowerCase();
        const categoria = producto.categoria.toLowerCase();
        return titulo.includes(query.toLowerCase()) || categoria.includes(query.toLowerCase());
    });
}

// Función para mostrar los resultados de búsqueda con imagen
function mostrarResultados(resultados) {
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = ""; // Limpiar resultados previos
  
  if (resultados.length === 0) {
      searchResults.classList.add('hidden'); // Si no hay resultados, ocultar el div
  } else {
      const ul = document.createElement('ul');
      resultados.forEach(producto => {
          const li = document.createElement('li');
          li.classList.add('search-result-item'); // Agregar clase para estilos

          // Crear un div para mostrar imagen y detalles del producto
          const resultItem = `
              <img src="${producto.imagen}" alt="${producto.titulo}" class="search-result-image">
              <div class="search-result-details">
                  <span class="search-result-title">${producto.titulo}</span>
                  <span class="search-result-price">${producto.precioFinal}</span>
              </div>
          `;
          li.innerHTML = resultItem;

          li.addEventListener('click', () => {
              // Redirigir a la página del producto
              window.location.href = producto.url;
          });

          ul.appendChild(li);
      });
      searchResults.appendChild(ul);
      searchResults.classList.remove('hidden'); // Mostrar el div si hay resultados
  }
}

// Event listener para la búsqueda en tiempo real
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  if (query.length > 0) {
      const resultados = buscarProductos(query);
      mostrarResultados(resultados);
  } else {
      document.getElementById('search-results').classList.add('hidden'); // Si el campo de búsqueda está vacío, ocultar los resultados
  }
});
