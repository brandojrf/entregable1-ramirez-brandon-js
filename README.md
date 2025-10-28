# Sistema de Gestión de Inventario y Productos

Este proyecto es una aplicación web que permite gestionar un inventario de productos con funcionalidades de visualización, agregación y gestión de productos.

## 🚀 Características

- Visualización de productos desde una API externa (FakeStore API)
- Gestión de inventario con persistencia local
- Cálculo automático de IVA y totales
- Interfaz de usuario interactiva y responsiva
- Notificaciones y confirmaciones mediante SweetAlert
- Formateo de moneda en formato argentino (ARS)

## 📁 Estructura del Proyecto

```
proyecto-js-coder/
├── index.html              # Página principal
├── styles/
│   └── styles.css         # Estilos de la aplicación
├── js/
│   ├── app.js            # Punto de entrada de la aplicación
│   ├── productos.js      # Gestión y visualización de productos
│   ├── inventario.js     # Lógica del inventario
│   └── notificaciones.js # Sistema de notificaciones
└── SweetAlert/           # Dependencia para notificaciones
    └── package.json
```

## 🛠️ Arquitectura

El proyecto está estructurado en módulos JavaScript independientes:

- **app.js**: Inicializa la aplicación y maneja los eventos principales
- **productos.js**: Gestiona la obtención y visualización de productos desde la API
- **inventario.js**: Maneja la lógica del inventario, incluyendo:
  - Cálculos de IVA (21%)
  - Gestión de cantidades
  - Persistencia en localStorage
  - Cálculo de totales
- **notificaciones.js**: Sistema de notificaciones y confirmaciones

## 💡 Funcionalidades Principales

### Gestión de Productos
- Carga de productos desde FakeStore API
- Visualización de productos en tarjetas
- Información detallada de cada producto (imagen, título, descripción, precio)

### Sistema de Inventario
- Agregar productos al inventario
- Especificar cantidades
- Eliminar productos
- Vaciar inventario completo
- Cálculo automático de subtotales y totales con IVA
- Persistencia de datos en localStorage

### Interfaz de Usuario
- Diseño responsivo
- Notificaciones interactivas
- Confirmaciones de acciones importantes
- Formateo de moneda en pesos argentinos

## 🔧 Tecnologías Utilizadas

- JavaScript ES6+
- Módulos ES6
- HTML5
- CSS3
- SweetAlert para notificaciones
- API Fetch para peticiones HTTP
- localStorage para persistencia de datos

## 🌟 Características Destacadas

1. **Modularidad**: Código organizado en módulos independientes
2. **Persistencia**: Datos del inventario guardados en localStorage
3. **Interactividad**: Sistema de notificaciones y confirmaciones
4. **Gestión de Estado**: Manejo eficiente del estado del inventario
5. **Formateo**: Presentación profesional de datos monetarios

## 💻 Uso

1. Navega por el catálogo de productos
2. Agrega productos al inventario especificando cantidades
3. Gestiona el inventario:
   - Visualiza totales
   - Elimina productos individuales
   - Vacía el inventario completo
4. Los datos persisten entre sesiones

---

Proyecto desarrollado por Brandon Ramirez para el curso de JavaScript en Coderhouse.
