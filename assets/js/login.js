// Función para cargar los detalles del usuario desde usuarios.json
function verificarCredenciales(username, password) {
    // Cargar el archivo JSON de usuarios
    return fetch('/template/data/usuarios.json') // Cambia '/path/to/' por la ruta correcta a tu archivo
        .then(response => response.json())
        .then(data => {
            // Buscar el usuario en el JSON
            const usuario = data.usuarios.find(user => user.username === username && user.contrasena === password);
            return usuario;  // Devuelve el usuario encontrado (o undefined si no se encontró)
        })
        .catch(error => {
            console.error("Error al cargar el archivo JSON:", error);
            return null;
        });
}

// Asignar el evento de submit al formulario de login
document.querySelector(".formulario-login").addEventListener("submit", (event) => {
    event.preventDefault();

    // Capturar el nombre de usuario y la contraseña ingresados
    const username = document.getElementById("username").value;
    const password = document.getElementById("contraseña1").value;

    // Verificar las credenciales y el rol
    verificarCredenciales(username, password).then(usuario => {
        if (usuario) {
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