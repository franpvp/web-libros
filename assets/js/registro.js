const fs = require('fs');

// Función para leer el archivo JSON existente y agregar un nuevo usuario
function registrarUsuario(nuevoUsuario) {
    fs.readFile('usuarios.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error al leer el archivo:", err);
            return;
        }
        let jsonData = JSON.parse(data);

        // Agregar el nuevo usuario al array "usuarios"
        jsonData.usuarios.push(nuevoUsuario);

        // Escribir el archivo actualizado
        fs.writeFile('usuarios.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error("Error al escribir el archivo:", err);
                return;
            }
            console.log("Nuevo usuario registrado con éxito.");
        });
    });
}

document.querySelector(".formulario-registro").addEventListener("submit", (event) => {
    event.preventDefault();  // Evitar que el formulario se envíe

    // Capturar los datos del formulario
    const nuevoUsuario = {
        username: document.getElementById("username").value,
        contrasena: document.getElementById("contrasena1").value,
        nombres: document.getElementById("nombres").value,
        apellidos: document.getElementById("apellidos").value,
        correo: document.getElementById("correo").value,
        fecha_nacimiento: document.getElementById("fecha-nacimiento").value,
        domicilio: document.getElementById("domicilio").value
    };

    // Registrar el nuevo usuario
    registrarUsuario(nuevoUsuario);
});
