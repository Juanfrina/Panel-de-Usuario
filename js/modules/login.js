// Módulo para manejar el inicio de sesión de usuarios

import { verificarContraseña } from '../utils/crypto.js';
import { guardarSesionUsuario } from '../utils/cookies.js';

// Función para obtener un usuario del LocalStorage
function obtenerUsuario(nombreUsuario) {
    const usuariosGuardados = localStorage.getItem('usuarios');
    
    if (!usuariosGuardados) {
        return null; // No hay usuarios guardados
    }
    
    const listaUsuarios = JSON.parse(usuariosGuardados);
    return listaUsuarios[nombreUsuario.toLowerCase()] || null;
}

// Función para mostrar un mensaje temporal en pantalla
function mostrarMensaje(texto, esExito = true) {
    const tipoMensaje = esExito ? 'mensaje-exito' : 'mensaje-error-global';
    const elementoMensaje = document.getElementById(tipoMensaje);
    const textoElemento = elementoMensaje.querySelector('.texto-mensaje');
    const botonCerrar = elementoMensaje.querySelector('.cerrar-mensaje');
    
    // Mostrar el mensaje
    textoElemento.textContent = texto;
    elementoMensaje.classList.remove('oculto');
    
    // Configurar botón para cerrar
    botonCerrar.onclick = function() {
        elementoMensaje.classList.add('oculto');
    };
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        elementoMensaje.classList.add('oculto');
    }, 5000);
}

// Función para limpiar mensajes de error del login
function limpiarErroresLogin() {
    const mensajesError = [
        'error-usuario-login',
        'error-contraseña-login'
    ];
    
    mensajesError.forEach(idError => {
        const elementoError = document.getElementById(idError);
        if (elementoError) {
            elementoError.style.display = 'none';
        }
    });
    
    // Quitar clases de error de los campos
    const campos = [
        'usuario-login',
        'contraseña-login'
    ];
    
    campos.forEach(idCampo => {
        const campo = document.getElementById(idCampo);
        if (campo) {
            campo.classList.remove('error');
        }
    });
}

// Función para mostrar error en un campo específico del login
function mostrarErrorLogin(idCampo, mensajeError) {
    const campo = document.getElementById(idCampo);
    const elementoError = document.getElementById(`error-${idCampo}`);
    
    if (campo && elementoError) {
        elementoError.textContent = mensajeError;
        elementoError.style.display = 'block';
        campo.classList.add('error');
    }
}

// Función para cambiar a la pantalla del panel de usuario
function irAPanelUsuario() {
    // Ocultar todas las pantallas
    const todasLasPantallas = document.querySelectorAll('.pantalla');
    todasLasPantallas.forEach(pantalla => {
        pantalla.classList.remove('activa');
    });
    
    // Mostrar el panel de usuario
    const panelUsuario = document.getElementById('panel-usuario');
    if (panelUsuario) {
        panelUsuario.classList.add('activa');
    }
}

// Función para actualizar el mensaje de bienvenida en el panel
function actualizarMensajeBienvenida(nombreUsuario) {
    const mensajeBienvenida = document.getElementById('mensaje-bienvenida');
    if (mensajeBienvenida) {
        mensajeBienvenida.textContent = `Bienvenido, ${nombreUsuario}`;
    }
}

// Función principal para procesar el login
export async function procesarLogin(evento) {
    evento.preventDefault(); // Evitar que se recargue la página
    
    // Limpiar errores anteriores
    limpiarErroresLogin();
    
    // Obtener datos del formulario
    const nombreUsuario = document.getElementById('usuario-login').value.trim();
    const contraseña = document.getElementById('contraseña-login').value;
    
    // Validaciones básicas
    if (nombreUsuario === '') {
        mostrarErrorLogin('usuario-login', 'El nombre de usuario es obligatorio');
        return;
    }
    
    if (contraseña === '') {
        mostrarErrorLogin('contraseña-login', 'La contraseña es obligatoria');
        return;
    }
    
    // Buscar el usuario en LocalStorage
    const usuarioEncontrado = obtenerUsuario(nombreUsuario);
    
    if (!usuarioEncontrado) {
        mostrarMensaje('Usuario no encontrado. Verifica tus datos o regístrate.', false);
        return;
    }
    
    // Verificar la contraseña
    const contraseñaCorrecta = await verificarContraseña(contraseña, usuarioEncontrado.contraseña);
    
    if (!contraseñaCorrecta) {
        mostrarMensaje('Contraseña incorrecta. Inténtalo de nuevo.', false);
        return;
    }
    
    // Login exitoso
    // Guardar la sesión en una cookie
    guardarSesionUsuario(usuarioEncontrado.nombreUsuario);
    
    // Mostrar mensaje de éxito
    mostrarMensaje(`¡Bienvenido de vuelta, ${usuarioEncontrado.nombreUsuario}!`, true);
    
    // Actualizar el mensaje de bienvenida en el panel
    actualizarMensajeBienvenida(usuarioEncontrado.nombreUsuario);
    
    // Limpiar el formulario
    document.getElementById('usuario-login').value = '';
    document.getElementById('contraseña-login').value = '';
    
    // Ir al panel de usuario después de 1 segundo
    setTimeout(() => {
        irAPanelUsuario();
    }, 1000);
}

// Función para inicializar el módulo de login
export function inicializarLogin() {
    const formularioLogin = document.getElementById('formulario-login');
    if (formularioLogin) {
        formularioLogin.addEventListener('submit', procesarLogin);
    }
}