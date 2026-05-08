const datosImagenes = [
    { src: 'img/dibujos/img1.png', cat: 'dibujo' },
    { src: 'img/dibujos/img2.png', cat: 'dibujo' },
    { src: 'img/dibujos/img3.png', cat: 'dibujo' },
    { src: 'img/dibujos/img4.png', cat: 'dibujo' },
    { src: 'img/dibujos/img5.gif', cat: 'dibujo' },
    { src: 'img/dibujos/img6.png', cat: 'dibujo' },
    { src: 'img/dibujos/img7.png', cat: 'dibujo' },
    { src: 'img/dibujos/img8.png', cat: 'dibujo' },
    { src: 'img/dibujos/img9.png', cat: 'dibujo' },
    { src: 'img/dibujos/img10.png', cat: 'dibujo' },
    { src: 'img/dibujos/img11.png', cat: 'dibujo' },
    { src: 'img/dibujos/img12.png', cat: 'dibujo' },
    { src: 'img/paisajes/imagen13.jpg', cat: 'paisaje' },
    { src: 'img/paisajes/imagen14.jpg', cat: 'paisaje' },
    { src: 'img/paisajes/imagen15.jpg', cat: 'paisaje' },
    { src: 'img/paisajes/imagen16.jpg', cat: 'paisaje' },
    { src: 'img/paisajes/imagen17.png', cat: 'paisaje' }
];

const contenedorGaleria = document.getElementById('galeria');
const botonesFiltro = document.querySelectorAll('.boton-filtro');
let indiceActivo = -1;
let escalaActual = 1;

// 1. Cargar imágenes en el DOM
function cargarGaleria(filtro = 'all') {
    contenedorGaleria.innerHTML = ''; 
    
    const imagenesFiltradas = filtro === 'all' 
        ? datosImagenes 
        : datosImagenes.filter(img => img.cat === filtro);

    imagenesFiltradas.forEach((imgData, index) => {
        const img = document.createElement('img');
        img.src = imgData.src;
        img.classList.add('item');
        // El dataset.index debe corresponder al índice del array filtrado actual
        img.dataset.index = index; 

        img.addEventListener('click', () => seleccionarImagen(index));
        contenedorGaleria.appendChild(img);
    });
    
    // Al filtrar, reseteamos la selección para evitar confusiones
    indiceActivo = -1; 
}

// 2. Manejar la selección y el resaltado
function seleccionarImagen(index) {
    const items = document.querySelectorAll('.item');
    if (items.length === 0) return;

    // Limpiar estados previos
    items.forEach(img => {
        img.classList.remove('activo');
        img.style.transform = 'scale(1)'; 
        img.style.zIndex = "1";
    });
    
    // Validar que el índice sea correcto
    if(index >= 0 && index < items.length) {
        indiceActivo = index;
        escalaActual = 1.5; // Escala inicial de resaltado
        
        const imgSeleccionada = items[index];
        imgSeleccionada.classList.add('activo');
        imgSeleccionada.style.transform = `scale(${escalaActual})`;
        imgSeleccionada.style.zIndex = "10";
        
        // Desplazamiento suave hacia la imagen
        imgSeleccionada.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}  

// 3. Zoom con la rueda del ratón
contenedorGaleria.addEventListener('wheel', (e) => {
    if (indiceActivo !== -1) {
        e.preventDefault(); 

        const items = document.querySelectorAll('.item');
        const imgActiva = items[indiceActivo];

        // Sensibilidad del zoom
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        escalaActual = Math.min(Math.max(1, escalaActual + delta), 4);

        imgActiva.style.transform = `scale(${escalaActual})`;
        // Si hay zoom, la imagen debe estar por encima de todo
        imgActiva.style.zIndex = escalaActual > 1 ? "100" : "10";
    }
}, { passive: false });

// 4. Listeners para los botones de Filtro
botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
        const categoria = boton.getAttribute('data-filtro');
        cargarGaleria(categoria);
    });
});

// 5. Lógica de Navegación (Siguiente)
document.getElementById('btnSiguiente').addEventListener('click', () => {
    const items = document.querySelectorAll('.item');
    if (items.length === 0) return;

    let siguiente;
    if (indiceActivo === -1) {
        siguiente = 0; // Empieza por la primera si no hay nada seleccionado
    } else {
        siguiente = (indiceActivo + 1) % items.length; // Ciclo infinito
    }
    seleccionarImagen(siguiente);
});

// 6. Lógica de Navegación (Anterior)
document.getElementById('btnAnterior').addEventListener('click', () => {
    const items = document.querySelectorAll('.item');
    if (items.length === 0) return;

    let anterior;
    if (indiceActivo === -1) {
        anterior = items.length - 1; // Empieza por la última si no hay nada seleccionado
    } else {
        anterior = (indiceActivo - 1 + items.length) % items.length; // Ciclo infinito
    }
    seleccionarImagen(anterior);
});

// Inicialización
cargarGaleria();