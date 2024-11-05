const nombres = document.getElementById('nombres-usuario');
const apellidos = document.getElementById('apellidos-usuario');

// Obtener el nombre de usuario almacenado en localStorage
const usernameLogueado = localStorage.getItem('usuarioLogueado');

if (usernameLogueado) {
    fetch('/template/data/usuarios.json')
        .then(response => response.json())
        .then(data => {
            // Buscar el usuario usando el nombre de usuario logueado
            const usuario = data.usuarios.find(u => u.username === usernameLogueado);

            if (usuario) {
                // Mostrar los datos del usuario en el HTML
                document.getElementById('username').textContent = usuario.username;
                document.getElementById('nombres-usuario').textContent = usuario.nombres;
                document.getElementById('apellidos-usuario').textContent = usuario.apellidos;
                document.getElementById('correo').textContent = usuario.correo;
                document.getElementById('fecha-nacimiento').textContent = usuario.fecha_nacimiento;
                document.getElementById('domicilio').textContent = usuario.domicilio || '---';
            } else {
                document.getElementById('nombres-usuario').textContent = 'Datos de perfil no encontrados.';
            }
        })
        .catch(error => console.error("Error al cargar los datos del usuario:", error));
} else {
    // Si no hay un usuario logueado en localStorage
    document.getElementById('nombres-usuario').textContent = 'No has iniciado sesión.';
}