// Función para obtener los parámetros de la URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Cargar los detalles del libro seleccionado
fetch('/template/data/libros.json')
    .then(response => response.json())
    .then(data => {
        const libroId = parseInt(getQueryParam('id'), 10); // Convierte el ID a número
        const libro = data.libros.find(libro => libro.id === libroId); // Busca el libro por ID

        if (libro) {
            document.getElementById('libro-seleccionado').textContent = libro.titulo;
            document.getElementById('categoria-libro').textContent = libro.especificaciones.categoria;
            // Añadir el enlace dinámico a la categoría
            document.getElementById('categoria-libro').href = libro.link_categoria;
            document.getElementById('detalle-titulo').textContent = libro.titulo;
            document.getElementById('detalle-autor').textContent = libro.autor;
            document.getElementById('detalle-precio').textContent = `Precio: $${libro.precio.toLocaleString()}`;
            document.getElementById('detalle-imagen').src = libro.imagen;
            document.getElementById('detalle-resena').textContent = libro.resena;
            document.getElementById('detalle-categoria').textContent = 'Categoría: ' + libro.especificaciones.categoria;
            document.getElementById('detalle-sub-categoria').textContent = 'Subcategoría: ' + libro.especificaciones["sub-categoria"];
            document.getElementById('detalle-idioma').textContent = 'Idioma: ' + libro.especificaciones.idioma;
            document.getElementById('detalle-formato').textContent = 'Formato: ' + libro.especificaciones.formato;
            document.getElementById('detalle-paginas').textContent = 'Páginas: ' + libro.especificaciones.paginas;
            document.getElementById('detalle-stock').textContent = 'Stock: ' + libro.stock;

            // Asignar datos al botón de "Agregar al carrito"
            const addToCartButton = document.querySelector('.add-to-cart-btn');
            addToCartButton.setAttribute('data-titulo', libro.titulo);
            addToCartButton.setAttribute('data-precio', libro.precio);
            addToCartButton.setAttribute('data-imagen', libro.imagen);

        } else {
            document.getElementById('detalle-libro').textContent = 'Detalles no encontrados.';
        }
    })
    .catch(error => console.error("Error al cargar los detalles del libro:", error));

function verDetalles(id) {
    window.location.href = `/template/detalles-libro.html?id=${id}`;
}

// Arreglo para almacenar los productos del carrito
let productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar producto al carrito
function agregarProductoAlCarrito(titulo, precio, imagen) {
    // Buscar si el producto ya existe en el carrito
    const productoExistente = productosEnCarrito.find(producto => producto.titulo === titulo);
    
    if (productoExistente) {
        // Aumentar la cantidad si el producto ya existe
        productoExistente.cantidad += 1;
    } else {
        // Agregar el nuevo producto con cantidad inicial de 1
        productosEnCarrito.push({ titulo, precio, imagen, cantidad: 1 });
    }

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));

    // Actualizar el dropdown del carrito
    actualizarCarrito();
}

function actualizarCarrito() {
    // Obtener todos los elementos con la clase 'carrito-items'
    const carritoItemsList = document.querySelectorAll('.carrito-items');
    const total = productosEnCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

    // Guardar el total en el localStorage
    localStorage.setItem('carritoTotal', total);

    // Limpiar el contenido actual en cada carrito
    carritoItemsList.forEach(carritoItems => {
        carritoItems.innerHTML = ''; 

        // Agregar cada producto al carrito
        productosEnCarrito.forEach(producto => {
            const itemHTML = `
                <li style="display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 10px;">
                    <div><img src="${producto.imagen}" alt="${producto.titulo}" width="30" height="30" style="margin-right: 10px;"></div>
                    <div>${producto.titulo}</div>
                    <div>$${producto.precio.toLocaleString()} (Cantidad: ${producto.cantidad})</div>
                </li>
                <hr style="border: 1px solid black; margin: 10px 0;">`; // Aquí se agrega el hr
            carritoItems.insertAdjacentHTML('beforeend', itemHTML);
        });
    });

    // Actualizar el total en el primer carrito encontrado
    if (carritoItemsList.length > 0) {
        document.querySelector('.carrito-total').textContent = `Total: $${total.toLocaleString()}`;
    }
}

// Inicializa el carrito al cargar la página
document.addEventListener('DOMContentLoaded', actualizarCarrito);

// Añadir el evento click a los botones de "Agregar al Carrito"
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart-btn')) {
        const imagen = event.target.getAttribute('data-imagen');
        const titulo = event.target.getAttribute('data-titulo');
        const precio = parseFloat(event.target.getAttribute('data-precio'));
        agregarProductoAlCarrito(titulo, precio, imagen);
    }
});