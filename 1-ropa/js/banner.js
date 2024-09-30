let slideIndex = 0;  // Cambié el valor inicial a 0
showSlides();  // Llamamos a showSlides sin argumento para que cargue la primera imagen de forma automática

// Función para mostrar las diapositivas
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (slideIndex >= slides.length) {slideIndex = 0}  // Reinicia el índice si supera el número de imágenes
  if (slideIndex < 0) {slideIndex = slides.length - 1}  // Si el índice es negativo, retrocede a la última imagen
  
  // Oculta todas las imágenes
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  // Muestra la imagen actual
  slides[slideIndex].style.display = "block";  

  // Incrementa el índice para que la siguiente imagen se muestre después del intervalo
  slideIndex++;
}

// Función para avanzar o retroceder en el slider manualmente
function plusSlides(n) {
  slideIndex += n - 1; // Ajusta el índice antes de llamar a showSlides
  showSlides();
}

// Cambia de slide automáticamente cada 5 segundos
setInterval(() => {
  showSlides(); // Llamamos a la función para avanzar al siguiente slide automáticamente
}, 5000);
