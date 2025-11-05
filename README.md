# 🎯 Panel de Usuario - Aplicación Web Completa

Una aplicación web moderna desarrollada con **HTML, CSS y JavaScript puro** que permite registro, inicio de sesión y gestión de preferencias de usuario usando **ES Modules**.

## 📋 Características Principales

- ✅ **3 Pantallas principales**: Login, Registro y Panel de Usuario
- ✅ **Validación en tiempo real** con expresiones regulares
- ✅ **Cifrado de contraseñas** usando la API Crypto del navegador
- ✅ **Gestión de cookies** para sesiones y preferencias
- ✅ **Tema claro/oscuro** persistente
- ✅ **Banner de cookies** con consentimiento
- ✅ **Almacenamiento local** para usuarios registrados
- ✅ **Diseño responsivo** con variables CSS
- ✅ **Arquitectura modular** con ES6 Modules

## 🚀 Cómo Usar la Aplicación

### 1️⃣ **Primera Visita**
- Al abrir `index.html` verás la pantalla de **Login**
- En la parte inferior aparece el **banner de cookies** (solo la primera vez)
- Haz clic en **"Aceptar"** para continuar

### 2️⃣ **Registrar un Usuario**
- Haz clic en **"Registrarse"** 
- Completa todos los campos:
  - **Usuario**: Mínimo 3 caracteres
  - **Contraseña**: Mínimo 8 caracteres, 1 mayúscula y 1 minúscula
  - **Teléfono**: Exactamente 9 dígitos
  - **Código Postal**: Exactamente 5 dígitos
  - **Checkbox "Soy mayor de edad"**: Si lo marcas, aparece el campo edad
  - **Edad**: Solo si marcaste el checkbox (18-99 años)
- Los campos se validan automáticamente al salir de ellos
- El botón **"Crear cuenta"** se habilita solo cuando todo es válido
- Al registrarte, te lleva automáticamente al login

### 3️⃣ **Iniciar Sesión**
- Introduce tu **usuario y contraseña**
- Si son correctos, te lleva al **Panel de Usuario**
- Tu sesión se guarda en una cookie por 24 horas

### 4️⃣ **Panel de Usuario**
- Ves un mensaje personalizado: **"Bienvenido, [tu_nombre]"**
- **Botón "Cambiar tema"**: Alterna entre tema claro y oscuro
- **Botón "Cerrar sesión"**: Borra la cookie y vuelve al login
- El tema elegido se recuerda para futuras visitas

## 🏗️ Estructura del Proyecto

```
Panel de Usuario/
├── index.html              # Página principal con las 3 pantallas
├── README.md               # Este archivo de documentación
├── css/
│   └── styles.css          # Estilos CSS con variables y temas
└── js/
    ├── main.js             # Coordinador principal de la aplicación
    ├── modules/            # Módulos específicos de funcionalidad
    │   ├── cookieBanner.js # Gestión del banner de cookies (vacío)
    │   ├── login.js        # Módulo de inicio de sesión
    │   ├── register.js     # Módulo de registro de usuarios
    │   ├── theme.js        # Gestión de temas (vacío)
    │   └── userPanel.js    # Módulo del panel de usuario
    └── utils/              # Utilidades reutilizables
        ├── cookies.js      # Funciones para manejar cookies
        ├── crypto.js       # Funciones de cifrado de contraseñas
        └── validation.js   # Funciones de validación con regex
```

## 📁 Descripción Detallada de Archivos

### 🎨 **Frontend (HTML/CSS)**

#### `index.html`
- **3 secciones principales** con clase `pantalla`:
  - `#pantalla-login`: Formulario de inicio de sesión
  - `#pantalla-registro`: Formulario de registro completo
  - `#panel-usuario`: Panel del usuario autenticado
- **Sistema de navegación**: Solo una pantalla visible a la vez
- **Banner de cookies** fijo en la parte inferior
- **Mensajes temporales** para éxito y errores
- **Campos con validación**: Cada input tiene su `mensaje-error` asociado

#### `css/styles.css`
- **Variables CSS** organizadas en `:root` para fácil mantenimiento
- **Tema oscuro**: Redefinición de variables en `body.tema-oscuro`
- **Diseño responsivo** con media queries
- **Componentes reutilizables**: botones, formularios, mensajes
- **Transiciones suaves** para cambios de estado

### ⚙️ **Backend (JavaScript Modules)**

#### `js/main.js` - Coordinador Principal
```javascript
// Funciones principales:
- inicializarApp()              // Punto de entrada
- mostrarPantalla()             // Cambio entre pantallas  
- configurarMostrarContraseña() // Botones de mostrar/ocultar
- configurarCampoEdad()         // Mostrar/ocultar campo edad
- verificarFormularioCompleto() // Habilitar/deshabilitar botones
- configurarBannerCookies()     // Gestión del banner
- configurarValidacionRegistro() // Eventos de validación
```

#### `js/utils/validation.js` - Validaciones
```javascript
// Expresiones regulares para validar:
- validarUsuario()      // Mínimo 3 caracteres
- validarContraseña()   // 8 chars, 1 mayúscula, 1 minúscula
- validarTelefono()     // Exactamente 9 dígitos
- validarCodigoPostal() // Exactamente 5 dígitos  
- validarEdad()         // Entre 18 y 99 años
- mostrarError()        // Mostrar/ocultar mensajes de error
- validarCampoAlSalir() // Validar cuando pierde el foco
```

#### `js/utils/cookies.js` - Gestión de Cookies
```javascript
// Funciones básicas:
- crearCookie()               // Crear cookie con expiración
- leerCookie()                // Leer valor de cookie
- borrarCookie()              // Eliminar cookie
- existeCookie()              // Verificar si existe

// Funciones específicas de la app:
- guardarConsentimientoCookies() // Consentimiento por 1 año
- yaSeAceptaronCookies()         // Verificar consentimiento
- guardarSesionUsuario()         // Sesión por 1 día
- obtenerUsuarioSesion()         // Usuario logueado
- cerrarSesionUsuario()          // Borrar sesión
- guardarTema() / obtenerTema()  // Tema por 1 año
```

#### `js/utils/crypto.js` - Cifrado de Contraseñas
```javascript
// Usando la API Crypto del navegador:
- cifrarContraseña()     // SHA-256 de texto plano a hash hex
- verificarContraseña()  // Comparar texto plano con hash
- textoABytes()          // Convertir string a Uint8Array
- bytesAHex()            // Convertir bytes a hexadecimal
```

#### `js/modules/register.js` - Registro de Usuarios
```javascript
// Funcionalidades:
- usuarioYaExiste()      // Verificar duplicados en LocalStorage
- guardarUsuario()       // Guardar usuario con contraseña cifrada
- procesarRegistro()     // Manejar envío del formulario
- mostrarMensaje()       // Mensajes de éxito/error
- limpiarFormularioRegistro() // Reset del formulario
- inicializarRegistro()  // Configurar event listeners
```

#### `js/modules/login.js` - Inicio de Sesión
```javascript
// Funcionalidades:
- obtenerUsuario()       // Buscar usuario en LocalStorage
- procesarLogin()        // Verificar credenciales
- mostrarErrorLogin()    // Errores específicos del login
- limpiarErroresLogin()  // Limpiar errores anteriores
- irAPanelUsuario()      // Cambiar a panel tras login exitoso
- actualizarMensajeBienvenida() // Personalizar saludo
- inicializarLogin()     // Configurar event listeners
```

#### `js/modules/userPanel.js` - Panel de Usuario
```javascript
// Funcionalidades:
- verificarSesionExistente()  // Auto-login si hay sesión activa
- aplicarTemaGuardado()       // Cargar tema al iniciar
- manejarCerrarSesion()       // Logout y limpieza
- manejarCambioTema()         // Alternar claro/oscuro
- aplicarTema()               // Aplicar clase CSS del tema
- irAPantallaLogin()          // Volver al login
- inicializarPanelUsuario()   // Configurar event listeners
```

## 🔧 Tecnologías Utilizadas

### **HTML5**
- Formularios semánticos con validación HTML5
- Inputs específicos (`type="tel"`, `type="number"`)
- Estructura accesible con labels y ARIA

### **CSS3**
- **Variables CSS** para mantenimiento fácil
- **Flexbox** para layouts responsivos
- **Transiciones CSS** para interacciones suaves
- **Media queries** para diseño móvil
- **Pseudo-selectores** para estados (:hover, :focus, :checked)

### **JavaScript ES6+**
- **ES Modules** (import/export) para arquitectura modular
- **Async/await** para operaciones asíncronas
- **Arrow functions** para sintaxis moderna
- **Template literals** para strings dinámicos
- **Destructuring** y **spread operator**
- **LocalStorage API** para persistencia
- **Cookies API** para gestión de sesiones
- **Crypto API** para cifrado seguro
- **Regular Expressions** para validaciones

## 🎯 Flujo de Datos

### **1. Registro de Usuario**
```
Usuario completa formulario
    ↓
Validación en tiempo real (utils/validation.js)
    ↓
Al enviar: verificar que usuario no existe
    ↓
Cifrar contraseña (utils/crypto.js)
    ↓
Guardar en LocalStorage (modules/register.js)
    ↓
Mostrar mensaje de éxito y ir a login
```

### **2. Inicio de Sesión**
```
Usuario introduce credenciales
    ↓
Buscar usuario en LocalStorage
    ↓
Verificar contraseña cifrada (utils/crypto.js)
    ↓
Si es correcto: crear cookie de sesión (utils/cookies.js)
    ↓
Ir al panel de usuario (modules/login.js)
```

### **3. Gestión de Sesión**
```
Al cargar página: verificar cookie de sesión
    ↓
Si existe: mostrar panel automáticamente
    ↓
Si no existe: mostrar login
    ↓
Aplicar tema guardado en cookie
```

## 🔒 Seguridad Implementada

- **Cifrado SHA-256** para contraseñas (no se guardan en texto plano)
- **Validación tanto en cliente como en lógica**
- **Sanitización de inputs** (trim, validaciones estrictas)
- **Cookies con expiración** controlada
- **No exposición de datos sensibles** en consola

## 📱 Características Responsivas

- **Diseño mobile-first** con breakpoints en 480px
- **Formularios adaptables** que se reorganizan en móviles
- **Botones touch-friendly** con padding adecuado
- **Textos legibles** en todas las resoluciones

## 🚀 Próximas Mejoras Posibles

- [ ] Validación de email
- [ ] Recuperación de contraseña
- [ ] Perfil de usuario editable  
- [ ] Múltiples temas personalizables
- [ ] Exportar/importar datos de usuario
- [ ] Autenticación de dos factores
- [ ] Base de datos real (backend)

## 🛠️ Cómo Ejecutar

1. **Clonar o descargar** el proyecto
2. **Abrir `index.html`** en cualquier navegador moderno
3. **¡Ya está funcionando!** No necesita servidor web

### Requisitos
- Navegador moderno con soporte para:
  - ES6 Modules
  - API Crypto (SubtleCrypto)
  - LocalStorage
  - CSS Variables

## 📄 Licencia

Este proyecto es para fines educativos y de aprendizaje.

---

**Desarrollado por:** Juan Francisco  
**Fecha:** Noviembre 2025  
**Tecnologías:** HTML5, CSS3, JavaScript ES6+