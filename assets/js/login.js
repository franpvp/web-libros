// Función para cargar los detalles del usuario desde usuarios.json
async function verificarCredenciales(username, password) {
    try {
        // Cargar el archivo usuarios.json
        const response = await fetch('/template/data/usuarios.json'); // Asegúrate de poner la ruta correcta
        const data = await response.json();

        // Buscar si el usuario existe en la lista
        const usuarioEncontrado = data.usuarios.find(usuario => 
            usuario.username === username && usuario.contrasena === password
        );

        // Retornar el usuario encontrado o null si no existe
        return usuarioEncontrado || null;
    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        alert('Ocurrió un problema al verificar los datos de usuario.');
        return null;
    }
}

// Evento de envío del formulario de login
document.querySelector(".formulario-login").addEventListener("submit", (event) => {
    event.preventDefault();

    // Capturar el nombre de usuario y la contraseña ingresados
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("contraseña1").value;

    // Verificar las credenciales y el rol
    verificarCredenciales(username, password).then(usuario => {
        if (usuario) {
            // Guardar el nombre de usuario en localStorage
            localStorage.setItem('usuarioLogueado', usuario.username);

            // Redirigir según el rol
            if (usuario.rol === "admin") {
                // Redirigir a la vista específica para 'admin'
                window.location.href = "/template/administrador/admin-home.html";
            } else {
                // Redirigir a la vista para 'cliente'
                window.location.href = "/template/home.html";
            }
        } else {
            // Mostrar mensaje de error si las credenciales son incorrectas
            alert("Usuario o contraseña incorrectos.");
        }
    });
});