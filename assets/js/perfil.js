const nombres = document.getElementById('nombres-usuario');
const apellidos = document.getElementById('apellidos-usuario');

fetch('/template/data/usuarios.json')
    .then(response => response.json())
    .then(data => {
        const usernameBuscado = "jperez";
        const usuario = data.usuarios.find(u => u.username === usernameBuscado);

        if (usuario) {
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