const nombres = document.getElementById('nombres-usuario');
const apellidos = document.getElementById('apellidos-usuario');

fetch('/template/usuarios.json')
    .then(response => response.json())
    .then(data => {
        const usernameBuscado = "jperez";
        const usuario = data.usuarios.find(u => u.username === usernameBuscado);

        if (usuario) {
            document.getElementById('nombres-usuario').textContent = usuario.nombres;
            document.getElementById('apellidos-usuario').textContent = usuario.apellidos;
        } else {
            document.getElementById('nombres-usuario').textContent = 'Datos de perfil no encontrados.';
        }
    })
    .catch(error => console.error("Error al cargar los datos del usuario:", error));