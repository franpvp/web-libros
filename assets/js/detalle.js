// Función para obtener los parámetros de la URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Cargar los detalles del libro seleccionado
fetch('/template/libros.json')
    .then(response => response.json())
    .then(data => {
        const libroId = getQueryParam('id');
        const libro = data[libroId];

        if (libro) {
            document.getElementById('detalle-titulo').textContent = libro.titulo;
            document.getElementById('detalle-autor').textContent = libro.autor;
            document.getElementById('detalle-precio').textContent = libro.precio;
            document.getElementById('detalle-imagen').src = libro.imagen;
        } else {
            document.getElementById('detalle-libro').textContent = 'Detalles no encontrados.';
        }
    });

function verDetalles(id) {
    window.location.href = `/template/detalles-libro.html?id=${id}`;
}