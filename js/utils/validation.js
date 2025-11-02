// Funciones para validar los campos del formulario

// Función para validar nombre de usuario (mínimo 3 caracteres)
export function validarUsuario(nombreUsuario) {
    if (nombreUsuario.trim().length < 3) {
        return 'El nombre de usuario debe tener al menos 3 caracteres';
    }
    return null; // null = sin error
}

// Función para validar contraseña (8 caracteres, 1 mayúscula, 1 minúscula)
export function validarContraseña(contraseña) {
    // Expresión regular: busca al menos una minúscula, una mayúscula y mínimo 8 caracteres
    const patron = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    
    if (!patron.test(contraseña)) {
        return 'La contraseña debe tener al menos 8 caracteres, una mayúscula y una minúscula';
    }
    return null;
}

// Función para validar teléfono (exactamente 9 dígitos)
export function validarTelefono(telefono) {
    // Expresión regular: solo acepta exactamente 9 números
    const patron = /^\d{9}$/;
    
    if (!patron.test(telefono)) {
        return 'El teléfono debe tener exactamente 9 dígitos';
    }
    return null;
}

// Función para validar código postal (exactamente 5 dígitos)
export function validarCodigoPostal(codigoPostal) {
    // Expresión regular: solo acepta exactamente 5 números
    const patron = /^\d{5}$/;
    
    if (!patron.test(codigoPostal)) {
        return 'El código postal debe tener exactamente 5 dígitos';
    }
    return null;
}

// Función para validar edad (entre 18 y 99)
export function validarEdad(edad) {
    const edadNumerica = parseInt(edad);
    
    if (isNaN(edadNumerica) || edadNumerica < 18 || edadNumerica > 99) {
        return 'La edad debe ser un número entre 18 y 99';
    }
    return null;
}

// Función para mostrar un mensaje de error en la pantalla
export function mostrarError(idCampo, mensajeError) {
    const campoInput = document.getElementById(idCampo);
    const elementoError = document.getElementById(`error-${idCampo}`);
    
    if (campoInput && elementoError) {
        if (mensajeError) {
            // Hay error: mostrar mensaje y poner el campo en rojo
            elementoError.textContent = mensajeError;
            elementoError.style.display = 'block';
            campoInput.classList.add('error');
        } else {
            // No hay error: ocultar mensaje y quitar el rojo
            elementoError.style.display = 'none';
            campoInput.classList.remove('error');
        }
    }
}

// Función para validar un campo específico cuando pierde el foco
export function validarCampoAlSalir(idCampo, valor, tipoValidacion) {
    let mensajeError = null;
    
    // Decidir qué validación usar según el tipo
    switch (tipoValidacion) {
        case 'usuario':
            mensajeError = validarUsuario(valor);
            break;
        case 'contraseña':
            mensajeError = validarContraseña(valor);
            break;
        case 'telefono':
            mensajeError = validarTelefono(valor);
            break;
        case 'codigo-postal':
            mensajeError = validarCodigoPostal(valor);
            break;
        case 'edad':
            mensajeError = validarEdad(valor);
            break;
    }
    
    // Mostrar o quitar el error
    mostrarError(idCampo, mensajeError);
    
    // Devolver true si no hay error, false si hay error
    return mensajeError === null;
}