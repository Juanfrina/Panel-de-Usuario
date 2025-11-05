// Módulo para manejar el panel de usuario

import { cerrarSesionUsuario, obtenerUsuarioSesion, guardarTema, obtenerTema } from '../utils/cookies.js';

// Función para cambiar a la pantalla de login
function irAPantallaLogin() {
    // Ocultar todas las pantallas
    const todasLasPantallas = document.querySelectorAll('.pantalla');
    todasLasPantallas.forEach(pantalla => {
        pantalla.classList.remove('activa');
    });
    
    // Mostrar la pantalla de login
    const pantallaLogin = document.getElementById('pantalla-login');
    if (pantallaLogin) {
        pantallaLogin.classList.add('activa');
    }
}

// Función para mostrar un mensaje temporal
function mostrarMensaje(texto, esExito = true) {
    const tipoMensaje = esExito ? 'mensaje-exito' : 'mensaje-error-global';
    const elementoMensaje = document.getElementById(tipoMensaje);
    const textoElemento = elementoMensaje.querySelector('.texto-mensaje');
    const botonCerrar = elementoMensaje.querySelector('.cerrar-mensaje');
    
    textoElemento.textContent = texto;
    elementoMensaje.classList.remove('oculto');
    
    botonCerrar.onclick = function() {
        elementoMensaje.classList.add('oculto');
    };
    
    setTimeout(() => {
        elementoMensaje.classList.add('oculto');
    }, 3000);
}

// Función para cerrar sesión
function manejarCerrarSesion() {
    // Borrar la cookie de sesión
    cerrarSesionUsuario();
    
    // Mostrar mensaje
    mostrarMensaje('Sesión cerrada correctamente', true);
    
    // Limpiar formularios
    const camposLogin = ['usuario-login', 'contraseña-login'];
    camposLogin.forEach(idCampo => {
        const campo = document.getElementById(idCampo);
        if (campo) {
            campo.value = '';
        }
    });
    
    // Volver a la pantalla de login después de 1 segundo
    setTimeout(() => {
        irAPantallaLogin();
    }, 1000);
}

// Función para aplicar un tema
function aplicarTema(nombreTema) {
    const body = document.body;
    
    if (nombreTema === 'oscuro') {
        body.classList.add('tema-oscuro');
    } else {
        body.classList.remove('tema-oscuro');
    }
}

// Función para cambiar entre tema claro y oscuro
function manejarCambioTema() {
    const temaActual = obtenerTema();
    const nuevoTema = temaActual === 'claro' ? 'oscuro' : 'claro';
    
    // Guardar el nuevo tema en cookie
    guardarTema(nuevoTema);
    
    // Aplicar el nuevo tema
    aplicarTema(nuevoTema);
    
    // Mostrar mensaje
    const mensajeTema = nuevoTema === 'oscuro' ? 'Tema oscuro activado' : 'Tema claro activado';
    mostrarMensaje(mensajeTema, true);
}

// Función para verificar si hay una sesión activa al cargar la página
export function verificarSesionExistente() {
    const usuarioSesion = obtenerUsuarioSesion();
    
    if (usuarioSesion) {
        // Hay una sesión activa, mostrar el panel directamente
        const mensajeBienvenida = document.getElementById('mensaje-bienvenida');
        if (mensajeBienvenida) {
            mensajeBienvenida.textContent = `Bienvenido, ${usuarioSesion}`;
        }
        
        // Mostrar el panel de usuario
        const todasLasPantallas = document.querySelectorAll('.pantalla');
        todasLasPantallas.forEach(pantalla => {
            pantalla.classList.remove('activa');
        });
        
        const panelUsuario = document.getElementById('panel-usuario');
        if (panelUsuario) {
            panelUsuario.classList.add('activa');
        }
    }
}

// Función para aplicar el tema guardado al cargar la página
export function aplicarTemaGuardado() {
    const temaGuardado = obtenerTema();
    aplicarTema(temaGuardado);
}

// Función para inicializar el módulo del panel de usuario
export function inicializarPanelUsuario() {
    // Configurar botón de cerrar sesión
    const botonCerrarSesion = document.getElementById('cerrar-sesion');
    if (botonCerrarSesion) {
        botonCerrarSesion.addEventListener('click', manejarCerrarSesion);
    }
    
    // Configurar botón de cambiar tema
    const botonCambiarTema = document.getElementById('cambiar-tema');
    if (botonCambiarTema) {
        botonCambiarTema.addEventListener('click', manejarCambioTema);
    }
}