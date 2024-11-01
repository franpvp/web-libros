// Función para obtener los parámetros de la URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Cargar los detalles del libro seleccionado
fetch('/template/libros.json')
    .then(response => response.json())
    .then(data => {
        const libroId = parseInt(getQueryParam('id'), 10); // Convierte el ID a número
        const libro = data.libros.find(libro => libro.id === libroId); // Busca el libro por ID

        if (libro) {
            document.getElementById('libro-seleccionado').textContent = libro.titulo;
            document.getElementById('detalle-titulo').textContent = libro.titulo;
            document.getElementById('detalle-autor').textContent = libro.autor;
            document.getElementById('detalle-precio').textContent = libro.precio;
            document.getElementById('detalle-imagen').src = libro.imagen;
            document.getElementById('detalle-resena').textContent = libro.resena;
            document.getElementById('detalle-categoria').textContent = libro.especificaciones.categoria;
            document.getElementById('detalle-sub-categoria').textContent = libro.especificaciones["sub-categoria"];
            document.getElementById('detalle-idioma').textContent = libro.especificaciones.idioma;
            document.getElementById('detalle-formato').textContent = libro.especificaciones.formato;
            document.getElementById('detalle-paginas').textContent = libro.especificaciones.paginas;
            document.getElementById('detalle-stock').textContent = libro.stock;
        } else {
            document.getElementById('detalle-libro').textContent = 'Detalles no encontrados.';
        }
    })
    .catch(error => console.error("Error al cargar los detalles del libro:", error));

function verDetalles(id) {
    window.location.href = `/template/detalles-libro.html?id=${id}`;
}