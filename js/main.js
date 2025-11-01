// Archivo principal que coordina toda la aplicación

// Función para mostrar solo una pantalla y ocultar las demás
function mostrarPantalla(nombrePantalla) {
    // Ocultar todas las pantallas
    const todasLasPantallas = document.querySelectorAll('.pantalla');
    todasLasPantallas.forEach(pantalla => {
        pantalla.classList.remove('activa');
    });
    
    // Mostrar solo la pantalla solicitada
    const pantallaAMostrar = document.getElementById(nombrePantalla);
    if (pantallaAMostrar) {
        pantallaAMostrar.classList.add('activa');
    }
}

// Función que se ejecuta cuando se carga la página
function inicializarApp() {
    // Mostrar el banner de cookies (quitar la clase 'oculto')
    const bannerCookies = document.getElementById('aviso-cookies');
    if (bannerCookies) {
        bannerCookies.classList.remove('oculto');
    }
    
    // Botón para ir al registro desde login
    const botonIrARegistro = document.getElementById('ir-a-registro');
    if (botonIrARegistro) {
        botonIrARegistro.addEventListener('click', function(evento) {
            evento.preventDefault(); // Evitar que recargue la página
            mostrarPantalla('pantalla-registro');
        });
    }
    
    // Botón para ir al login desde registro
    const botonIrALogin = document.getElementById('ir-a-login');
    if (botonIrALogin) {
        botonIrALogin.addEventListener('click', function(evento) {
            evento.preventDefault(); // Evitar que recargue la página
            mostrarPantalla('pantalla-login');
        });
    }
    
    // Botón para aceptar cookies
    const botonAceptarCookies = document.getElementById('aceptar-cookies');
    if (botonAceptarCookies) {
        botonAceptarCookies.addEventListener('click', function() {
            // Ocultar el banner de cookies
            bannerCookies.classList.add('oculto');
        });
    }
}

// Ejecutar cuando se carga la página
document.addEventListener('DOMContentLoaded', inicializarApp);