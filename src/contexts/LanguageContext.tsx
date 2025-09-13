import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export type Language = 'es' | 'en'

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// Translation keys and values
const translations = {
  es: {
    // Navigation
    'nav.inicio': 'Inicio',
    'nav.servicios': 'Servicios', 
    'nav.portafolio': 'Portafolio',
    'nav.nosotros': 'Nosotros',
    'nav.contacto': 'Contacto',
    'nav.trabajemos': 'Trabajemos juntos',
    'nav.cambiar_tema': 'Cambiar tema',
    'nav.abrir_menu': 'Abrir menú',
    'nav.cambiar_idioma': 'Cambiar idioma',

    // Hero
    'hero.bienvenido': 'Bienvenido a',
    'hero.haz_que': 'Haz que',
    'hero.con_zentella': 'con Zentella',
    'hero.comenzar': 'Comenzar',
    'hero.portfolio': 'Portfolio',
    'hero.fotografia': 'Fotografía',
    'hero.diseno': 'Diseño', 
    'hero.video': 'Video',
    'hero.animacion': 'Animación',
    // Hero phrases
    'hero.phrase.brilles_mas': 'brilles más',
    'hero.phrase.crezcas_hoy': 'crezcas hoy',
    'hero.phrase.todo_cuente': 'todo cuente',
    'hero.phrase.impactes_ya': 'impactes ya',
    'hero.phrase.vivas_libre': 'vivas libre',
    'hero.phrase.funcione_bien': 'funcione bien',
    'hero.phrase.vendas_mas': 'vendas más',
    'hero.phrase.destaques_ya': 'destaques ya',
    'hero.phrase.triunfes_hoy': 'triunfes hoy',
    'hero.phrase.seas_unico': 'seas único',

    // Services
    'services.badge': 'Servicios',
    'services.titulo': 'Nuestros Servicios',
    'services.subtitulo': 'Soluciones creativas que impulsan tu éxito',
    'services.diseno.titulo': 'Diseño & Branding',
    'services.diseno.descripcion': 'Identidades visuales únicas que conectan con tu audiencia y destacan en el mercado.',
    'services.marketing.titulo': 'Marketing Digital',
    'services.marketing.descripcion': 'Estrategias integrales para hacer crecer tu negocio en el mundo online.',
    'services.fotografia.titulo': 'Fotografía',
    'services.fotografia.descripcion': 'Capturamos la esencia de tu marca con fotografías profesionales.',
    'services.video.titulo': 'Video & Animación',
    'services.video.descripcion': 'Contenido audiovisual que conecta emocionalmente con tu audiencia.',

    // Portfolio
    'portfolio.badge': 'Portafolio',
    'portfolio.titulo': 'Nuestro Trabajo',
    'portfolio.titulo_destacados': 'Trabajos Destacados',
    'portfolio.subtitulo': 'Casos de éxito que hablan por sí solos',
    'portfolio.descripcion': 'Una selección de nuestros proyectos más impactantes.',
    'portfolio.todos': 'Todos',
    'portfolio.fotografia': 'Fotografía',
    'portfolio.diseno': 'Diseño',
    'portfolio.video': 'Video',
    'portfolio.animacion': 'Animación',
    'portfolio.ver_mas': 'Ver más trabajos',
    'portfolio.ver_menos': 'Ver menos',
    'portfolio.proyecto_anterior': 'Proyecto anterior',
    'portfolio.siguiente_proyecto': 'Siguiente proyecto',
    'portfolio.cerrar': 'Cerrar',
    'portfolio.galeria': 'Galería',
    
    // Portfolio items
    'portfolio.ajf_panaderia.titulo': 'AJF Panadería - Fotografía de Producto',
    'portfolio.ajf_panaderia.descripcion': 'Fotografía especializada de productos de panadería artesanal, destacando la calidad y frescura de cada producto',
    'portfolio.ajf_panaderia.cliente': 'AJF Panadería',
    'portfolio.ajf_panaderia.tags': 'Producto, Food Photography, Artesanal, Comercial',
    
    'portfolio.el_cayuco.titulo': 'El Cayuco Restaurante - Fotografía Gastronómica',
    'portfolio.el_cayuco.descripcion': 'Sesión fotográfica completa para restaurante, capturando la esencia culinaria y ambiente único',
    'portfolio.el_cayuco.cliente': 'El Cayuco Restaurante',
    'portfolio.el_cayuco.tags': 'Gastronomía, Ambiente, Restaurante, Lifestyle',
    
    'portfolio.esvi_hair.titulo': 'Esvi Hair Studio - Fotografía de Servicios',
    'portfolio.esvi_hair.descripcion': 'Fotografía profesional de servicios de belleza, mostrando técnicas y resultados de alta calidad',
    'portfolio.esvi_hair.cliente': 'Esvi Hair Studio',
    'portfolio.esvi_hair.tags': 'Belleza, Servicios, Profesional, Lifestyle',
    
    'portfolio.better_health.titulo': 'Better Health Nevada - Identidad Corporativa',
    'portfolio.better_health.descripcion': 'Desarrollo completo de identidad visual para centro de salud, transmitiendo confianza y profesionalismo',
    'portfolio.better_health.cliente': 'Better Health Nevada',
    'portfolio.better_health.tags': 'Branding, Healthcare, Identidad Visual, Corporativo',
    
    'portfolio.kaccao.titulo': 'Kaccao Kitchen - Desarrollo de Marca',
    'portfolio.kaccao.descripcion': 'Creación integral de marca para restaurante gourmet, desde logo hasta aplicaciones',
    'portfolio.kaccao.cliente': 'Kaccao Kitchen',
    'portfolio.kaccao.tags': 'Branding, Restaurante, Gourmet, Diseño',

    // About
    'about.titulo': 'Sobre Zentella',
    'about.subtitulo': 'Creatividad, innovación y resultados',
    'about.nuestro_equipo': 'Nuestro Equipo',
    'about.conoce_creadores': 'Conoce a los Creadores',
    'about.descripcion': 'Somos un equipo de creativos apasionados por transformar ideas en experiencias visuales impactantes',
    'about.descripcion_equipo': 'Nuestro equipo combina estrategia, diseño y pasión para crear un impacto poderoso y duradero',
    'about.nicole.nombre': 'Nicole Pattinson',
    'about.nicole.rol': 'Directora de Operaciones',
    'about.patrick.nombre': 'Patrick Beckham',
    'about.patrick.rol': 'CEO - Fundador',
    'about.johan.nombre': 'Johan Cruyff',
    'about.johan.rol': 'Director de Marketing',

    // Footer
    'footer.enlaces_rapidos': 'Enlaces Rápidos',
    'footer.servicios': 'Servicios',
    'footer.siguenos': 'Síguenos',
    'footer.derechos': 'Todos los derechos reservados.',
    'footer.servicios.marketing': 'Marketing Digital',
    'footer.servicios.fotografia': 'Fotografía',
    'footer.servicios.diseno': 'Diseño Gráfico',
    'footer.servicios.video': 'Videografía',
    'footer.servicios.animacion': 'Animación',

    // Contact Form
    'contact.badge': 'Contacto',
    'contact.titulo': 'Contáctanos',
    'contact.subtitulo': '¿Dudas? Hablemos',
    'contact.titulo_principal': 'Resolvamos tus dudas y comencemos',
    'contact.descripcion': 'Consulta nuestras preguntas frecuentes o contáctanos directamente. Estamos listos para hacer crecer tu negocio.',
    'contact.faq_titulo': 'Preguntas Frecuentes',
    'contact.form_titulo': 'Cuéntanos sobre tu proyecto',
    'contact.nombre': 'NOMBRE',
    'contact.email': 'EMAIL', 
    'contact.telefono': 'TELÉFONO',
    'contact.empresa': 'EMPRESA',
    'contact.servicio': 'SERVICIO DE INTERÉS',
    'contact.presupuesto': 'PRESUPUESTO ESTIMADO',
    'contact.mensaje': 'MENSAJE',
    'contact.terminos': 'Acepto los términos y condiciones',
    'contact.enviar': 'Enviar ahora',
    'contact.enviando': 'Enviando...',
    'contact.enviado': '¡Mensaje enviado!',
    
    // Services options
    'contact.selecciona_servicio': 'Selecciona un servicio',
    'contact.servicio_branding': 'Diseño & Branding',
    'contact.servicio_marketing': 'Marketing Digital',
    'contact.servicio_fotografia': 'Fotografía',
    'contact.servicio_video': 'Video & Animación',
    
    // Budget options
    'contact.selecciona_presupuesto': 'Selecciona tu presupuesto',
    'contact.presupuesto_5k_15k': 'RD$25,000 - RD$75,000',
    'contact.presupuesto_15k_30k': 'RD$75,000 - RD$150,000',
    'contact.presupuesto_30k_50k': 'RD$150,000 - RD$250,000',
    'contact.presupuesto_50k_mas': 'Más de RD$250,000',

    // Placeholders
    'placeholder.nombre': 'Juan Pérez',
    'placeholder.email': 'hola@agenciazentella.com',
    'placeholder.telefono': '+1 (809) 676-2429',
    'placeholder.mensaje': 'Me encantaría conocer más sobre sus servicios',

    // Error messages
    'error.nombre_requerido': 'El nombre es requerido',
    'error.email_requerido': 'El email es requerido',
    'error.email_invalido': 'Email inválido',
    'error.servicio_requerido': 'Selecciona un servicio',
    'error.mensaje_requerido': 'El mensaje es requerido',

    // Loading Screen
    'loading.bienvenido': 'Bienvenido a',

    // Error Boundary
    'error.titulo': '¡Oops! Algo salió mal',
    'error.descripcion': 'Se ha producido un error inesperado. No te preocupes, nuestro equipo ha sido notificado.',
    'error.intentar': 'Intentar de nuevo',
    'error.recargar': 'Recargar página',
    'error.detalles': 'Detalles del error (solo en desarrollo)',
  },
  en: {
    // Navigation
    'nav.inicio': 'Home',
    'nav.servicios': 'Services',
    'nav.portafolio': 'Portfolio',
    'nav.nosotros': 'About',
    'nav.contacto': 'Contact',
    'nav.trabajemos': 'Let\'s work together',
    'nav.cambiar_tema': 'Toggle theme',
    'nav.abrir_menu': 'Open menu',
    'nav.cambiar_idioma': 'Change language',

    // Hero
    'hero.bienvenido': 'Welcome to',
    'hero.haz_que': 'Make',
    'hero.con_zentella': 'with Zentella',
    'hero.comenzar': 'Get Started',
    'hero.portfolio': 'Portfolio',
    'hero.fotografia': 'Photography',
    'hero.diseno': 'Design',
    'hero.video': 'Video',
    'hero.animacion': 'Animation',
    // Hero phrases
    'hero.phrase.brilles_mas': 'shine brighter',
    'hero.phrase.crezcas_hoy': 'grow today',
    'hero.phrase.todo_cuente': 'everything count',
    'hero.phrase.impactes_ya': 'impact now',
    'hero.phrase.vivas_libre': 'live free',
    'hero.phrase.funcione_bien': 'work well',
    'hero.phrase.vendas_mas': 'sell more',
    'hero.phrase.destaques_ya': 'stand out now',
    'hero.phrase.triunfes_hoy': 'triumph today',
    'hero.phrase.seas_unico': 'be unique',

    // Services
    'services.badge': 'Services',
    'services.titulo': 'Our Services',
    'services.subtitulo': 'Creative solutions that drive your success',
    'services.diseno.titulo': 'Design & Branding',
    'services.diseno.descripcion': 'Unique visual identities that connect with your audience and stand out in the market.',
    'services.marketing.titulo': 'Digital Marketing',
    'services.marketing.descripcion': 'Comprehensive strategies to grow your business in the online world.',
    'services.fotografia.titulo': 'Photography',
    'services.fotografia.descripcion': 'We capture the essence of your brand with professional photography.',
    'services.video.titulo': 'Video & Animation',
    'services.video.descripcion': 'Audiovisual content that emotionally connects with your audience.',

    // Portfolio
    'portfolio.badge': 'Portfolio',
    'portfolio.titulo': 'Our Work',
    'portfolio.titulo_destacados': 'Featured Work',
    'portfolio.subtitulo': 'Success stories that speak for themselves',
    'portfolio.descripcion': 'A selection of our most impactful projects.',
    'portfolio.todos': 'All',
    'portfolio.fotografia': 'Photography',
    'portfolio.diseno': 'Design',
    'portfolio.video': 'Video',
    'portfolio.animacion': 'Animation',
    'portfolio.ver_mas': 'View more projects',
    'portfolio.ver_menos': 'View less',
    'portfolio.proyecto_anterior': 'Previous project',
    'portfolio.siguiente_proyecto': 'Next project',
    'portfolio.cerrar': 'Close',
    'portfolio.galeria': 'Gallery',
    
    // Portfolio items
    'portfolio.ajf_panaderia.titulo': 'AJF Bakery - Product Photography',
    'portfolio.ajf_panaderia.descripcion': 'Specialized photography of artisanal bakery products, highlighting the quality and freshness of each product',
    'portfolio.ajf_panaderia.cliente': 'AJF Bakery',
    'portfolio.ajf_panaderia.tags': 'Product, Food Photography, Artisanal, Commercial',
    
    'portfolio.el_cayuco.titulo': 'El Cayuco Restaurant - Gastronomic Photography',
    'portfolio.el_cayuco.descripcion': 'Complete photographic session for restaurant, capturing the culinary essence and unique atmosphere',
    'portfolio.el_cayuco.cliente': 'El Cayuco Restaurant',
    'portfolio.el_cayuco.tags': 'Gastronomy, Atmosphere, Restaurant, Lifestyle',
    
    'portfolio.esvi_hair.titulo': 'Esvi Hair Studio - Service Photography',
    'portfolio.esvi_hair.descripcion': 'Professional photography of beauty services, showcasing high-quality techniques and results',
    'portfolio.esvi_hair.cliente': 'Esvi Hair Studio',
    'portfolio.esvi_hair.tags': 'Beauty, Services, Professional, Lifestyle',
    
    'portfolio.better_health.titulo': 'Better Health Nevada - Corporate Identity',
    'portfolio.better_health.descripcion': 'Complete visual identity development for health center, conveying trust and professionalism',
    'portfolio.better_health.cliente': 'Better Health Nevada',
    'portfolio.better_health.tags': 'Branding, Healthcare, Visual Identity, Corporate',
    
    'portfolio.kaccao.titulo': 'Kaccao Kitchen - Brand Development',
    'portfolio.kaccao.descripcion': 'Comprehensive brand creation for gourmet restaurant, from logo to applications',
    'portfolio.kaccao.cliente': 'Kaccao Kitchen',
    'portfolio.kaccao.tags': 'Branding, Restaurant, Gourmet, Design',

    // About
    'about.titulo': 'About Zentella',
    'about.subtitulo': 'Creativity, innovation and results',
    'about.nuestro_equipo': 'Our Team',
    'about.conoce_creadores': 'Meet the Creators',
    'about.descripcion': 'We are a team of creatives passionate about transforming ideas into impactful visual experiences',
    'about.descripcion_equipo': 'Our team blends strategy, design, and passion to create powerful, lasting impact',
    'about.nicole.nombre': 'Nicole Pattinson',
    'about.nicole.rol': 'Operations Director',
    'about.patrick.nombre': 'Patrick Beckham',
    'about.patrick.rol': 'CEO - Founder',
    'about.johan.nombre': 'Johan Cruyff',
    'about.johan.rol': 'Marketing Director',

    // Footer
    'footer.enlaces_rapidos': 'Quick Links',
    'footer.servicios': 'Services',
    'footer.siguenos': 'Follow Us',
    'footer.derechos': 'All rights reserved.',
    'footer.servicios.marketing': 'Digital Marketing',
    'footer.servicios.fotografia': 'Photography',
    'footer.servicios.diseno': 'Graphic Design',
    'footer.servicios.video': 'Videography',
    'footer.servicios.animacion': 'Animation',

    // Contact Form  
    'contact.badge': 'Contact',
    'contact.titulo': 'Contact us',
    'contact.subtitulo': 'Questions? Let\'s talk',
    'contact.titulo_principal': 'Let\'s solve your doubts and get started',
    'contact.descripcion': 'Check our frequently asked questions or contact us directly. We\'re ready to grow your business.',
    'contact.faq_titulo': 'Frequently Asked Questions',
    'contact.form_titulo': 'Tell us about your project',
    'contact.nombre': 'NAME',
    'contact.email': 'EMAIL',
    'contact.telefono': 'PHONE',
    'contact.empresa': 'COMPANY',
    'contact.servicio': 'SERVICE OF INTEREST',
    'contact.presupuesto': 'ESTIMATED BUDGET',
    'contact.mensaje': 'MESSAGE',
    'contact.terminos': 'I agree to the Terms and Conditions',
    'contact.enviar': 'Send now',
    'contact.enviando': 'Sending...',
    'contact.enviado': 'Message sent!',
    
    // Services options
    'contact.selecciona_servicio': 'Select a service',
    'contact.servicio_branding': 'Design & Branding',
    'contact.servicio_marketing': 'Digital Marketing',
    'contact.servicio_fotografia': 'Photography',
    'contact.servicio_video': 'Video & Animation',
    
    // Budget options
    'contact.selecciona_presupuesto': 'Select your budget',
    'contact.presupuesto_5k_15k': 'RD$25,000 - RD$75,000',
    'contact.presupuesto_15k_30k': 'RD$75,000 - RD$150,000',
    'contact.presupuesto_30k_50k': 'RD$150,000 - RD$250,000',
    'contact.presupuesto_50k_mas': 'More than RD$250,000',

    // Placeholders
    'placeholder.nombre': 'John Doe',
    'placeholder.email': 'hello@agenciazentella.com',
    'placeholder.telefono': '+1 (809) 676-2429',
    'placeholder.mensaje': 'I\'d love to learn more about your services',

    // Error messages
    'error.nombre_requerido': 'Name is required',
    'error.email_requerido': 'Email is required', 
    'error.email_invalido': 'Invalid email',
    'error.servicio_requerido': 'Select a service',
    'error.mensaje_requerido': 'Message is required',

    // Loading Screen
    'loading.bienvenido': 'Welcome to',

    // Error Boundary
    'error.titulo': 'Oops! Something went wrong',
    'error.descripcion': 'An unexpected error has occurred. Don\'t worry, our team has been notified.',
    'error.intentar': 'Try again',
    'error.recargar': 'Reload page',
    'error.detalles': 'Error details (development only)',
  }
}

const LANGUAGE_STORAGE_KEY = 'zentella-language'

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Initialize with Spanish as default, or load from localStorage
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language
      if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
        return savedLanguage
      }
    }
    return 'es' // Default to Spanish
  })

  // Update localStorage when language changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage)
      // Update HTML lang attribute
      document.documentElement.lang = currentLanguage
    }
  }, [currentLanguage])

  // Translation function
  const t = useCallback((key: string): string => {
    const translation = translations[currentLanguage]?.[key as keyof typeof translations[typeof currentLanguage]]
    if (!translation) {
      console.warn(`Translation missing for key: ${key} in language: ${currentLanguage}`)
      return key // Return the key as fallback
    }
    return translation
  }, [currentLanguage])

  // Language setter function
  const setLanguage = useCallback((lang: Language) => {
    setCurrentLanguage(lang)
  }, [])

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}