// Funciones para cifrar contraseñas usando la API crypto del navegador

// Función para convertir texto a array de bytes
function textoABytes(texto) {
    return new TextEncoder().encode(texto);
}

// Función para convertir array de bytes a texto hexadecimal
function bytesAHex(bytes) {
    return Array.from(bytes)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

// Función principal para cifrar una contraseña
export async function cifrarContraseña(contraseñaTextoPlano) {
    try {
        // Convertir la contraseña a bytes
        const datosContraseña = textoABytes(contraseñaTextoPlano);
        
        // Usar SHA-256 para crear un hash de la contraseña
        const hashBuffer = await crypto.subtle.digest('SHA-256', datosContraseña);
        
        // Convertir el hash a formato hexadecimal legible
        const hashArray = new Uint8Array(hashBuffer);
        const contraseñaCifrada = bytesAHex(hashArray);
        
        return contraseñaCifrada;
    } catch (error) {
        console.error('Error al cifrar la contraseña:', error);
        return null;
    }
}

// Función para verificar si una contraseña coincide con la cifrada
export async function verificarContraseña(contraseñaTextoPlano, contraseñaCifrada) {
    try {
        // Cifrar la contraseña introducida
        const contraseñaNuevaCifrada = await cifrarContraseña(contraseñaTextoPlano);
        
        // Comparar con la contraseña cifrada guardada
        return contraseñaNuevaCifrada === contraseñaCifrada;
    } catch (error) {
        console.error('Error al verificar la contraseña:', error);
        return false;
    }
}