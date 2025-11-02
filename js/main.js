// Archivo principal que coordina toda la aplicación

// Importar las funciones que necesitamos
import { guardarConsentimientoCookies, yaSeAceptaronCookies } from './utils/cookies.js';
import { validarCampoAlSalir } from './utils/validation.js';

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
                // Limpiar el campo de edad si se oculta
                const campoEdad = document.getElementById('edad-registro');
                if (campoEdad) {
                    campoEdad.value = '';
                }
            }
        });
    }
}

// Función para verificar si todos los campos son válidos
function verificarFormularioCompleto() {
    const campos = [
        'usuario-registro',
        'contraseña-registro', 
        'telefono-registro',
        'codigo-postal-registro'
    ];
    
    let todosValidos = true;
    
    // Verificar cada campo
    campos.forEach(idCampo => {
        const campo = document.getElementById(idCampo);
        if (campo && campo.classList.contains('error')) {
            todosValidos = false;
        }
        if (campo && campo.value.trim() === '') {
            todosValidos = false;
        }
    });
    
    // Verificar el campo edad si está visible
    const grupoEdad = document.getElementById('grupo-edad');
    if (grupoEdad && grupoEdad.style.display !== 'none') {
        const campoEdad = document.getElementById('edad-registro');
        if (campoEdad && (campoEdad.value === '' || campoEdad.classList.contains('error'))) {
            todosValidos = false;
        }
    }
    
    // Habilitar o deshabilitar el botón
    const botonCrearCuenta = document.getElementById('boton-crear-cuenta');
    if (botonCrearCuenta) {
        botonCrearCuenta.disabled = !todosValidos;
    }
}

// Función para gestionar el banner de cookies
function configurarBannerCookies() {
    const bannerCookies = document.getElementById('aviso-cookies');
    
    // Si ya se aceptaron antes, no mostrar el banner
    if (yaSeAceptaronCookies()) {
        bannerCookies.classList.add('oculto');
    } else {
        bannerCookies.classList.remove('oculto');
    }
    
    // Cuando hace clic en aceptar
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
    // Validar usuario cuando sale del campo
    const campoUsuario = document.getElementById('usuario-registro');
    if (campoUsuario) {
        campoUsuario.addEventListener('blur', function() {
            validarCampoAlSalir('usuario-registro', this.value, 'usuario');
            verificarFormularioCompleto();
        });
        campoUsuario.addEventListener('input', verificarFormularioCompleto);
    }
    
    // Validar contraseña cuando sale del campo
    const campoContraseña = document.getElementById('contraseña-registro');
    if (campoContraseña) {
        campoContraseña.addEventListener('blur', function() {
            validarCampoAlSalir('contraseña-registro', this.value, 'contraseña');
            verificarFormularioCompleto();
        });
        campoContraseña.addEventListener('input', verificarFormularioCompleto);
    }
    
    // Validar teléfono cuando sale del campo
    const campoTelefono = document.getElementById('telefono-registro');
    if (campoTelefono) {
        campoTelefono.addEventListener('blur', function() {
            validarCampoAlSalir('telefono-registro', this.value, 'telefono');
            verificarFormularioCompleto();
        });
        campoTelefono.addEventListener('input', verificarFormularioCompleto);
    }
    
    // Validar código postal cuando sale del campo
    const campoCodigoPostal = document.getElementById('codigo-postal-registro');
    if (campoCodigoPostal) {
        campoCodigoPostal.addEventListener('blur', function() {
            validarCampoAlSalir('codigo-postal-registro', this.value, 'codigo-postal');
            verificarFormularioCompleto();
        });
        campoCodigoPostal.addEventListener('input', verificarFormularioCompleto);
    }
    
    // Validar edad cuando sale del campo (solo si está visible)
    const campoEdad = document.getElementById('edad-registro');
    if (campoEdad) {
        campoEdad.addEventListener('blur', function() {
            if (this.style.display !== 'none' && this.value !== '') {
                validarCampoAlSalir('edad-registro', this.value, 'edad');
            }
            verificarFormularioCompleto();
        });
        campoEdad.addEventListener('input', verificarFormularioCompleto);
    }
}

// Función que se ejecuta cuando se carga la página
function inicializarApp() {
    // Configurar el banner de cookies
    configurarBannerCookies();
    
    // Configurar mostrar/ocultar contraseña
    configurarMostrarContraseña();
    
    // Configurar el campo de edad
    configurarCampoEdad();
    
    // Configurar la validación del formulario
    configurarValidacionRegistro();
    
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