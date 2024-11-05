// Formulario de registro
document.getElementById('submit-btn').addEventListener('click', function(event) {
    // event.preventDefault();

});

// Botón para limpiar formulario
document.getElementById('clean-btn').addEventListener('click', function() {
    // Limpiar todo el formulario
    document.querySelector('.formulario-registro').reset();
});

// Función para validar campos nombres
function validarNombres() {
    const input = document.getElementById("nombres");
    const feedback = document.getElementById("invalid-nombres");
    
    // Expresión regular para solo letras y espacios (uno o dos nombres)
    const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)?$/;

    // Validación del patrón
    if (namePattern.test(input.value.trim())) {
        input.classList.remove("is-invalid");
        feedback.style.display = "none";
    } else {
        input.classList.add("is-invalid");
        feedback.style.display = "block";
    }
}
// Función validar campo apellidos
function validarApellidos() {
    const input = document.getElementById("apellidos");
    const mensaje = document.getElementById("invalid-apellidos");
    
    // Expresión regular para solo letras y espacios (uno o dos nombres)
    const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)?$/;

    // Validación del patrón
    if (namePattern.test(input.value.trim())) {
        input.classList.remove("is-invalid");
        mensaje.style.display = "none";
    } else {
        input.classList.add("is-invalid");
        mensaje.style.display = "block";
    }
}

function validarUsuario() {
    const input = document.getElementById("username");
    const mensaje = document.getElementById("invalid-username");
    
    if(input != '') {
        input.classList.remove("is-invalid");
        mensaje.style.display = "none";
    } else {
        input.classList.add("is-invalid");
        mensaje.style.display = "block";
    }
}

// Función validar fecha de nacimiento
function validarFechaNacimiento() {
    const fechaNacimiento = document.getElementById('fecha-nacimiento');
    const mensaje = document.getElementById("invalid-fecha");

    const fechaActual = new Date();
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const edad = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();
    const diferenciaMeses = fechaActual.getMonth() - fechaNacimientoDate.getMonth();
    
    if (edad < 13 || (edad === 13 && diferenciaMeses < 0)) {
        fechaNacimiento.classList.add("is-invalid");
        mensaje.style.display = "block";
    } else {
        fechaNacimiento.classList.remove("is-invalid");
        mensaje.style.display = "none";
    }

}
// Función validar correo
function validarCorreo() {
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl)$/;
    const correo = document.getElementById('correo').value;
    const input = document.getElementById('correo');
    const mensaje = document.getElementById("invalid-correo");

    if (!regexCorreo.test(correo)) {
        input.classList.add("is-invalid");
        mensaje.style.display = "block";
    } else {
        input.classList.remove("is-invalid");
        mensaje.style.display = "none";
    }
}
// Función validar contraseña
function validarContrasena() {
    const contrasena = document.getElementById('contrasena1').value;
    const input = document.getElementById('contrasena1');
    const mensajeLongitud = document.getElementById("invalid-contrasena2");
    const mensajeContenido = document.getElementById("invalid-contrasena1");

    // Expresión regular para al menos una letra mayúscula y un número
    const regexContenido = /^(?=.*[A-Z])(?=.*\d)/;

    // Verifica longitud
    if (contrasena.length >= 6 && contrasena.length <= 18) {
        mensajeLongitud.style.display = "none";
        input.classList.remove("is-invalid");
    } else {
        mensajeLongitud.style.display = "block";
        input.classList.add("is-invalid");
    }

    // Verifica contenido
    if (regexContenido.test(contrasena)) {
        mensajeContenido.style.display = "none";
        input.classList.remove("is-invalid");
    } else {
        mensajeContenido.style.display = "block";
        input.classList.add("is-invalid");
    }
}

function validarContrasenasIguales() {
    const contrasena1 = document.getElementById('contrasena1').value;
    const contrasena2 = document.getElementById('contrasena2').value;
    const input = document.getElementById('contrasena2');
    const mensajeCoinciden = document.getElementById("invalid-contrasena-coinciden");

    // Verifica que las contraseñas sean iguales
    if (contrasena1 === contrasena2 && contrasena2 !== "") {
        mensajeCoinciden.style.display = "none";
        input.classList.remove("is-invalid");
    } else {
        mensajeCoinciden.style.display = "block";
        input.classList.add("is-invalid");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const carritoBtn = document.querySelector(".nav-carrito");
    const dropdownContent = document.querySelector(".dropdown-content");

    carritoBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        dropdownContent.classList.toggle("show");
    });

    // Cierra el dropdown al hacer clic fuera
    document.addEventListener("click", () => {
        dropdownContent.classList.remove("show");
    });
});


// Función para limpiar el carrito
function limpiarCarrito() {
    // Vaciar el array de productos en el carrito
    productosEnCarrito = [];
    
    // Eliminar el carrito del localStorage
    localStorage.removeItem('carrito');
    localStorage.removeItem('carritoTotal');
    
    // Actualizar el carrito en la vista
    actualizarCarrito();
}

// Función para cerrar sesion y eliminar usuario logeado
function cerrarSesion() {
    // Eliminar el usuario logueado de localStorage
    localStorage.removeItem('usuarioLogueado');

    // Opcional: Redirigir a la página de inicio de sesión o página principal
    window.location.href = "/template/login.html";
}