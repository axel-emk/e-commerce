let slideIndex = 1;
showSlides(slideIndex);

// Controles siguientes/anteriores
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Controles de imágenes en miniatura
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// Cambia de slide cada 5 segundos
setInterval(() => {
  plusSlides(1); // Avanza al siguiente slide
}, 5000); // Cambia cada 3 segundos
