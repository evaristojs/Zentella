# Zentella - Agencia Creativa Website

Website moderno y elegante para Zentella, una agencia creativa integral especializada en marketing, fotografía, diseño gráfico, videografía y animación.

## 🎨 Características

- **Diseño inspirado en Bloom Paris**: Estética oscura y sofisticada
- **Paleta de colores basada en el logo**: Color principal #8502bb (morado)
- **Navegación con overlay**: Menú inmersivo tipo Bloom Paris
- **Hero section con video/imágenes**: Slideshow automático con reproducción de reel
- **Portafolio administrable**: Sistema dinámico para gestionar proyectos
- **Formularios validados**: Validación completa del lado cliente
- **Animaciones fluidas**: Efectos con Framer Motion
- **Responsive design**: Optimizado para todos los dispositivos

## 🛠️ Tecnologías

- **React 18** con TypeScript
- **Vite** como bundler
- **Framer Motion** para animaciones
- **CSS Custom Properties** para variables de diseño
- **Hooks personalizados** para animaciones de scroll

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Navigation.tsx/css    # Navegación con overlay
│   ├── Hero.tsx/css         # Sección principal con video
│   ├── Services.tsx/css     # Servicios con preview interactivo
│   ├── Portfolio.tsx/css    # Portafolio con modal y filtros
│   ├── About.tsx/css        # Información del equipo y valores
│   ├── Contact.tsx/css      # Formulario de contacto validado
│   └── Footer.tsx/css       # Footer con newsletter
├── hooks/
│   └── useScrollAnimation.ts # Hook para animaciones de scroll
├── App.tsx/css              # Componente principal
├── main.tsx                 # Punto de entrada
└── index.css                # Estilos globales y variables CSS
```

## 🎯 Secciones

### Hero
- Slideshow automático de imágenes
- Reproducción de video reel
- Animaciones escalonadas de entrada
- Coordenadas geográficas de ubicación

### Servicios
- 5 servicios principales con preview
- Animaciones al hacer hover
- Visualización interactiva de cada servicio

### Portafolio
- Sistema de filtros por categoría
- Modal para vista detallada
- Soporte para imágenes y videos
- Información completa de cada proyecto

### Contacto
- Formulario con validación completa
- Campos: nombre, email, teléfono, empresa, servicio, presupuesto, mensaje
- Estados de carga y confirmación
- Información de contacto y redes sociales

## 🎨 Paleta de Colores

- **Primary Purple**: #8502bb (color del logo)
- **Dark Background**: #0a0a0a
- **Secondary Dark**: #111111
- **White**: #ffffff
- **Light Gray**: #f5f5f5

## 📱 Responsive Design

- **Desktop**: Diseño completo con todas las características
- **Tablet**: Grid adaptativo y navegación optimizada
- **Mobile**: Layout vertical y controles táctiles

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación
```bash
# Clonar el proyecto
git clone [repo]
cd zentella-website

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

### Configuración de Assets

1. **Logos**: Colocar en `public/Zentella Logo Web/`
2. **Imágenes del Hero**: `public/images/hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`
3. **Videos**: `public/videos/zentella-reel-2025.mp4`
4. **Portafolio**: `public/images/portfolio/` y `public/videos/portfolio/`

## 🔧 Personalización

### Cambiar Colores
Editar variables CSS en `src/index.css`:
```css
:root {
  --primary-purple: #8502bb;
  --dark-bg: #0a0a0a;
  /* ... más variables */
}
```

### Agregar Servicios
Modificar array `services` en `src/components/Services.tsx`

### Gestionar Portafolio
Actualizar array `mockPortfolio` en `src/components/Portfolio.tsx`

## 📧 Configuración de Formularios

El formulario de contacto está preparado para integración con:
- EmailJS
- Netlify Forms
- Backend personalizado

Actualizar la función `handleSubmit` en `Contact.tsx` según el servicio elegido.

## 🎭 Animaciones

- **Entrada del Hero**: Animaciones escalonadas con delays
- **Scroll Animations**: Elementos aparecen al entrar en viewport
- **Hover Effects**: Transformaciones suaves en servicios y portafolio
- **Loading States**: Spinners y transiciones de estado

## 📄 Licencia

© 2024 Zentella. Todos los derechos reservados.

---

Desarrollado con ❤️ para Zentella - Agencia Creativa Integral