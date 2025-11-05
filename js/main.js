// Archivo principal que coordina toda la aplicación

// Importar las funciones que necesitamos
import { guardarConsentimientoCookies, yaSeAceptaronCookies } from './utils/cookies.js';
import { validarCampoAlSalir } from './utils/validation.js';
import { inicializarRegistro } from './modules/register.js';
import { inicializarLogin } from './modules/login.js';
import { inicializarPanelUsuario, verificarSesionExistente, aplicarTemaGuardado } from './modules/userPanel.js';

// Función para mostrar solo una pantalla y ocultar las demás
function mostrarPantalla(nombrePantalla) {
    const todasLasPantallas = document.querySelectorAll('.pantalla');
    todasLasPantallas.forEach(pantalla => {
        pantalla.classList.remove('activa');
    });
    
    const pantallaAMostrar = document.getElementById(nombrePantalla);
    if (pantallaAMostrar) {
        pantallaAMostrar.classList.add('activa');
    }
}

// Función para mostrar u ocultar contraseña
function configurarMostrarContraseña() {
    // Para el login
    const botonLoginContraseña = document.getElementById('mostrar-contraseña-login');
    const campoLoginContraseña = document.getElementById('contraseña-login');
    
    if (botonLoginContraseña && campoLoginContraseña) {
        botonLoginContraseña.addEventListener('click', function() {
            if (campoLoginContraseña.type === 'password') {
                campoLoginContraseña.type = 'text';
                this.textContent = '🙈';
            } else {
                campoLoginContraseña.type = 'password';
                this.textContent = '👁️';
            }
        });
    }
    
    // Para el registro
    const botonRegistroContraseña = document.getElementById('mostrar-contraseña-registro');
    const campoRegistroContraseña = document.getElementById('contraseña-registro');
    
    if (botonRegistroContraseña && campoRegistroContraseña) {
        botonRegistroContraseña.addEventListener('click', function() {
            if (campoRegistroContraseña.type === 'password') {
                campoRegistroContraseña.type = 'text';
                this.textContent = '🙈';
            } else {
                campoRegistroContraseña.type = 'password';
                this.textContent = '👁️';
            }
        });
    }
}

// Función para mostrar/ocultar el campo de edad
function configurarCampoEdad() {
    const checkboxMayorEdad = document.getElementById('mayor-edad-registro');
    const grupoEdad = document.getElementById('grupo-edad');
    
    if (checkboxMayorEdad && grupoEdad) {
        checkboxMayorEdad.addEventListener('change', function() {
            if (this.checked) {
                grupoEdad.style.display = 'block';
            } else {
                grupoEdad.style.display = 'none';
                const campoEdad = document.getElementById('edad-registro');
                if (campoEdad) {
                    campoEdad.value = '';
                }
            }
            verificarFormularioCompleto();
        });
    }
}

// Función para verificar si todos los campos son válidos
function verificarFormularioCompleto() {
    const campos = ['usuario-registro', 'contraseña-registro', 'telefono-registro', 'codigo-postal-registro'];
    let todosValidos = true;
    
    campos.forEach(idCampo => {
        const campo = document.getElementById(idCampo);
        if (campo && (campo.classList.contains('error') || campo.value.trim() === '')) {
            todosValidos = false;
        }
    });
    
    const grupoEdad = document.getElementById('grupo-edad');
    if (grupoEdad && grupoEdad.style.display !== 'none') {
        const campoEdad = document.getElementById('edad-registro');
        if (campoEdad && (campoEdad.value === '' || campoEdad.classList.contains('error'))) {
            todosValidos = false;
        }
    }
    
    const botonCrearCuenta = document.getElementById('boton-crear-cuenta');
    if (botonCrearCuenta) {
        botonCrearCuenta.disabled = !todosValidos;
    }
}

// Función para gestionar el banner de cookies
function configurarBannerCookies() {
    const bannerCookies = document.getElementById('aviso-cookies');
    
    if (yaSeAceptaronCookies()) {
        bannerCookies.classList.add('oculto');
    } else {
        bannerCookies.classList.remove('oculto');
    }
    
    const botonAceptar = document.getElementById('aceptar-cookies');
    if (botonAceptar) {
        botonAceptar.addEventListener('click', function() {
            guardarConsentimientoCookies();
            bannerCookies.classList.add('oculto');
        });
    }
}

// Función para configurar la validación del formulario de registro
function configurarValidacionRegistro() {
    const configurarValidacionCampo = (idCampo, tipoValidacion) => {
        const campo = document.getElementById(idCampo);
        if (campo) {
            campo.addEventListener('blur', function() {
                validarCampoAlSalir(idCampo, this.value, tipoValidacion);
                verificarFormularioCompleto();
            });
            campo.addEventListener('input', verificarFormularioCompleto);
        }
    };
    
    configurarValidacionCampo('usuario-registro', 'usuario');
    configurarValidacionCampo('contraseña-registro', 'contraseña');
    configurarValidacionCampo('telefono-registro', 'telefono');
    configurarValidacionCampo('codigo-postal-registro', 'codigo-postal');
    
    const campoEdad = document.getElementById('edad-registro');
    if (campoEdad) {
        campoEdad.addEventListener('blur', function() {
            const grupoEdad = document.getElementById('grupo-edad');
            if (grupoEdad && grupoEdad.style.display !== 'none' && this.value !== '') {
                validarCampoAlSalir('edad-registro', this.value, 'edad');
            }
            verificarFormularioCompleto();
        });
        campoEdad.addEventListener('input', verificarFormularioCompleto);
    }
}

// Función que se ejecuta cuando se carga la página
function inicializarApp() {
    // Aplicar el tema guardado
    aplicarTemaGuardado();
    
    // Verificar si hay una sesión activa
    verificarSesionExistente();
    
    // Configurar el banner de cookies
    configurarBannerCookies();
    
    // Configurar mostrar/ocultar contraseña
    configurarMostrarContraseña();
    
    // Configurar el campo de edad
    configurarCampoEdad();
    
    // Configurar la validación del formulario
    configurarValidacionRegistro();
    
    // Inicializar todos los módulos
    inicializarRegistro();
    inicializarLogin();
    inicializarPanelUsuario();
    
    // Navegación entre pantallas
    const botonIrARegistro = document.getElementById('ir-a-registro');
    if (botonIrARegistro) {
        botonIrARegistro.addEventListener('click', function(evento) {
            evento.preventDefault();
            mostrarPantalla('pantalla-registro');
        });
    }
    
    const botonIrALogin = document.getElementById('ir-a-login');
    if (botonIrALogin) {
        botonIrALogin.addEventListener('click', function(evento) {
            evento.preventDefault();
            mostrarPantalla('pantalla-login');
        });
    }
}

// Ejecutar cuando se carga la página
document.addEventListener('DOMContentLoaded', inicializarApp);