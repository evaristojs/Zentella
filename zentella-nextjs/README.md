# Zentella - Agencia Creativa Integral

## 🚀 Proyecto migrado a Next.js con Tailwind CSS y HyperUI

Website moderno y elegante para Zentella, una agencia creativa integral especializada en marketing, fotografía, diseño gráfico, videografía y animación.

### 🎨 Características

- **Next.js 15** con App Router
- **Tailwind CSS 4** para estilos modernos
- **TypeScript** para desarrollo robusto
- **Diseño responsive** optimizado para todos los dispositivos
- **SEO optimizado** con metadatos completos
- **Animaciones suaves** y efectos visuales modernos
- **Componentes HyperUI** para una experiencia premium
- **Paleta de colores personalizada** basada en la identidad Zentella

### 🛠️ Tecnologías

- **Next.js 15** - Framework React con SSG
- **Tailwind CSS 4** - Framework CSS utility-first
- **TypeScript** - Tipado estático
- **Framer Motion** - Animaciones
- **React Hook Form** - Manejo de formularios

### 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css         # Estilos globales y configuración Tailwind
│   ├── layout.tsx          # Layout principal con metadatos SEO
│   └── page.tsx            # Página principal
├── components/
│   ├── Navigation.tsx      # Navegación responsive con overlay
│   ├── Hero.tsx           # Sección hero con slideshow
│   ├── Services.tsx       # Servicios interactivos
│   ├── Portfolio.tsx      # Portafolio con modal y filtros
│   ├── About.tsx          # Información de la empresa
│   ├── Contact.tsx        # Formulario de contacto
│   └── Footer.tsx         # Footer con newsletter
public/
├── images/                # Imágenes del proyecto
└── videos/                # Videos del portafolio
```

### 🚀 Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run start
```

### 📦 Despliegue en Netlify

El proyecto está configurado para deployment automático en Netlify:

1. **Configuración automática** con `netlify.toml`
2. **Static export** con Next.js
3. **Optimización de assets** con cache headers
4. **Redirects** configurados para SPA

#### Para desplegar:
1. Conecta tu repositorio a Netlify
2. Netlify detectará automáticamente la configuración
3. El sitio se construirá y desplegará automáticamente

### 🎨 Paleta de Colores

```css
/* Colores principales */
--primary-500: #8502bb    /* Zentella Purple */
--dark-950: #0a0a0a       /* Background oscuro */

/* Gradientes personalizados */
.gradient-text            /* Gradiente púrpura para títulos */
.bg-zentella-primary      /* Fondo gradiente principal */
```

### 🎯 Características Principales

#### Hero Section
- Slideshow automático de imágenes de fondo
- Animaciones de entrada progresivas
- CTAs prominentes
- Estadísticas de la empresa

#### Portafolio
- Sistema de filtros por categoría
- Modal para vista detallada de proyectos
- Soporte para imágenes y videos
- 18 proyectos reales organizados

#### Contacto
- Formulario completo con validación
- Información de contacto
- Enlaces a redes sociales
- Estados de carga y confirmación

---

© 2024 Zentella - Agencia Creativa Integral

Desarrollado con ❤️ usando Next.js, Tailwind CSS y componentes HyperUI
