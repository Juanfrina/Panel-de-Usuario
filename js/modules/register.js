// Módulo para manejar el registro de nuevos usuarios

import { cifrarContraseña } from '../utils/crypto.js';

// Función para verificar si un usuario ya existe
function usuarioYaExiste(nombreUsuario) {
    const usuariosGuardados = localStorage.getItem('usuarios');
    
    if (!usuariosGuardados) {
        return false; // No hay usuarios guardados
    }
    
    const listaUsuarios = JSON.parse(usuariosGuardados);
    return listaUsuarios.hasOwnProperty(nombreUsuario.toLowerCase());
}

// Función para guardar un nuevo usuario en LocalStorage
async function guardarUsuario(datosUsuario) {
    try {
        // Cifrar la contraseña antes de guardarla
        const contraseñaCifrada = await cifrarContraseña(datosUsuario.contraseña);
        
        if (!contraseñaCifrada) {
            throw new Error('No se pudo cifrar la contraseña');
        }
        
        // Crear el objeto del usuario con la contraseña cifrada
        const usuarioCompleto = {
            nombreUsuario: datosUsuario.nombreUsuario,
            contraseña: contraseñaCifrada,
            telefono: datosUsuario.telefono,
            codigoPostal: datosUsuario.codigoPostal,
            esMayorEdad: datosUsuario.esMayorEdad,
            edad: datosUsuario.edad || null,
            fechaRegistro: new Date().toISOString()
        };
        
        // Obtener usuarios existentes o crear objeto vacío
        const usuariosGuardados = localStorage.getItem('usuarios');
        const listaUsuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : {};
        
        // Agregar el nuevo usuario (usar nombre en minúsculas como clave)
        listaUsuarios[datosUsuario.nombreUsuario.toLowerCase()] = usuarioCompleto;
        
        // Guardar de vuelta en LocalStorage
        localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
        
        return true;
    } catch (error) {
        console.error('Error al guardar usuario:', error);
        return false;
    }
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

// Función para limpiar el formulario de registro
function limpiarFormularioRegistro() {
    const campos = [
        'usuario-registro',
        'contraseña-registro',
        'telefono-registro',
        'codigo-postal-registro',
        'edad-registro'
    ];
    
    campos.forEach(idCampo => {
        const campo = document.getElementById(idCampo);
        if (campo) {
            campo.value = '';
            campo.classList.remove('error');
        }
        
        // Ocultar mensajes de error
        const mensajeError = document.getElementById(`error-${idCampo}`);
        if (mensajeError) {
            mensajeError.style.display = 'none';
        }
    });
    
    // Desmarcar checkbox y ocultar campo edad
    const checkboxMayorEdad = document.getElementById('mayor-edad-registro');
    if (checkboxMayorEdad) {
        checkboxMayorEdad.checked = false;
    }
    
    const grupoEdad = document.getElementById('grupo-edad');
    if (grupoEdad) {
        grupoEdad.style.display = 'none';
    }
    
    // Deshabilitar botón de registro
    const botonCrearCuenta = document.getElementById('boton-crear-cuenta');
    if (botonCrearCuenta) {
        botonCrearCuenta.disabled = true;
    }
}

// Función principal para manejar el registro
export async function procesarRegistro(evento) {
    evento.preventDefault(); // Evitar que se recargue la página
    
    // Recopilar datos del formulario
    const nombreUsuario = document.getElementById('usuario-registro').value.trim();
    const contraseña = document.getElementById('contraseña-registro').value;
    const telefono = document.getElementById('telefono-registro').value.trim();
    const codigoPostal = document.getElementById('codigo-postal-registro').value.trim();
    const esMayorEdad = document.getElementById('mayor-edad-registro').checked;
    const edad = document.getElementById('edad-registro').value;
    
    // Verificar si el usuario ya existe
    if (usuarioYaExiste(nombreUsuario)) {
        mostrarMensaje('Este nombre de usuario ya está registrado. Elige otro.', false);
        return;
    }
    
    // Crear objeto con los datos del usuario
    const datosUsuario = {
        nombreUsuario: nombreUsuario,
        contraseña: contraseña,
        telefono: telefono,
        codigoPostal: codigoPostal,
        esMayorEdad: esMayorEdad,
        edad: esMayorEdad ? edad : null
    };
    
    // Intentar guardar el usuario
    const registroExitoso = await guardarUsuario(datosUsuario);
    
    if (registroExitoso) {
        mostrarMensaje(`¡Usuario ${nombreUsuario} registrado correctamente!`, true);
        limpiarFormularioRegistro();
        
        // Cambiar automáticamente a la pantalla de login después de 2 segundos
        setTimeout(() => {
            const evento = new Event('click');
            const botonIrALogin = document.getElementById('ir-a-login');
            if (botonIrALogin) {
                botonIrALogin.dispatchEvent(evento);
            }
        }, 2000);
    } else {
        mostrarMensaje('Error al registrar el usuario. Inténtalo de nuevo.', false);
    }
}

// Función para inicializar el módulo de registro
export function inicializarRegistro() {
    const formularioRegistro = document.getElementById('formulario-registro');
    if (formularioRegistro) {
        formularioRegistro.addEventListener('submit', procesarRegistro);
    }
}