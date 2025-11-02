// Funciones para manejar cookies del navegador

// Función para crear una cookie
export function crearCookie(nombreCookie, valorCookie, diasExpiracion) {
    const fechaExpiracion = new Date();
    fechaExpiracion.setTime(fechaExpiracion.getTime() + (diasExpiracion * 24 * 60 * 60 * 1000));
    
    const textoExpiracion = `expires=${fechaExpiracion.toUTCString()}`;
    document.cookie = `${nombreCookie}=${valorCookie};${textoExpiracion};path=/`;
}

// Función para leer una cookie
export function leerCookie(nombreCookie) {
    const nombreConIgual = nombreCookie + "=";
    const todasLasCookies = document.cookie.split(';');
    
    for (let i = 0; i < todasLasCookies.length; i++) {
        let cookie = todasLasCookies[i];
        
        // Quitar espacios del principio
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        
        // Si encontramos nuestra cookie, devolver su valor
        if (cookie.indexOf(nombreConIgual) === 0) {
            return cookie.substring(nombreConIgual.length, cookie.length);
        }
    }
    
    return null; // Cookie no encontrada
}

// Función para borrar una cookie
export function borrarCookie(nombreCookie) {
    document.cookie = `${nombreCookie}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

// Función para verificar si existe una cookie
export function existeCookie(nombreCookie) {
    return leerCookie(nombreCookie) !== null;
}

// Funciones específicas para nuestra aplicación:

// Guardar que el usuario ha aceptado las cookies
export function guardarConsentimientoCookies() {
    crearCookie('cookies-aceptadas', 'true', 365); // Por 1 año
}

// Verificar si ya se aceptaron las cookies
export function yaSeAceptaronCookies() {
    return existeCookie('cookies-aceptadas');
}

// Guardar la sesión del usuario (cuando hace login)
export function guardarSesionUsuario(nombreUsuario) {
    crearCookie('sesion-usuario', nombreUsuario, 1); // Por 1 día
}

// Obtener el usuario que tiene la sesión activa
export function obtenerUsuarioSesion() {
    return leerCookie('sesion-usuario');
}

// Cerrar la sesión del usuario
export function cerrarSesionUsuario() {
    borrarCookie('sesion-usuario');
}

// Guardar el tema elegido (claro u oscuro)
export function guardarTema(nombreTema) {
    crearCookie('tema-elegido', nombreTema, 365); // Por 1 año
}

// Obtener el tema guardado
export function obtenerTema() {
    return leerCookie('tema-elegido') || 'claro'; // Si no hay tema guardado, usar claro
}