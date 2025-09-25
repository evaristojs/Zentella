import { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo } from 'react'

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
    'hero.haz_que': 'Impulsa',
    'hero.con_zentella': 'con Zentella',
    'hero.comenzar': 'Comenzar',
    'hero.portfolio': 'Portfolio',
    'hero.fotografia': 'Fotografía',
    'hero.diseno': 'Diseño', 
    'hero.video': 'Video',
    'hero.animacion': 'Animación',
    // Hero phrases
    'hero.phrase.tu_marca': 'tu marca',
    'hero.phrase.tu_negocio': 'tu negocio',
    'hero.phrase.tu_exito': 'tu éxito',
    'hero.phrase.tu_historia': 'tu historia',
    'hero.phrase.tus_ventas': 'tus ventas',
    'hero.phrase.tus_redes': 'tus redes',
    'hero.phrase.tu_contenido': 'tu mensaje',
    'hero.phrase.tu_comunidad': 'tu público',
    'hero.phrase.tu_presencia': 'tu imagen',
    'hero.phrase.tu_crecimiento': 'tu avance',
    'hero.phrase.tu_impacto': 'tu impacto',
    'hero.phrase.tu_alcance': 'tu alcance',
    'hero.phrase.tu_audiencia': 'tu gente',
    'hero.phrase.tu_estrategia': 'tu plan',
    'hero.phrase.tu_vision': 'tu visión',

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

    // Estadísticas
    'services.stats.proyectos': '50+',
    'services.stats.proyectos_label': 'Proyectos completados',
    'services.stats.satisfaccion': '98%',
    'services.stats.satisfaccion_label': 'Satisfacción del cliente',
    'services.stats.experiencia': '5+',
    'services.stats.experiencia_label': 'Años de experiencia',

    // Características de servicios
    'services.diseno.features': ['Logotipo y variaciones', 'Manual de marca completo', 'Tipografías corporativas', '3 revisiones incluidas'],
    'services.marketing.features': ['Estrategia personalizada', 'Análisis de competencia', 'Gestión de campañas', 'Reportes mensuales', 'Optimización continua'],
    'services.fotografia.features': ['Sesión ilimitada', 'Edición profesional', 'Galería digital', 'Imágenes en alta resolución', 'Derechos de uso comercial'],
    'services.video.features': ['Guión incluido', 'Música libre de derechos', 'Animaciones 2D/3D', 'Formatos múltiples', 'Revisiones incluidas'],

    'services.delivery_time': 'Tiempo de entrega: ',
    'services.diseno.delivery': '7-10 días',
    'services.marketing.delivery': '15-20 días',
    'services.fotografia.delivery': '3-5 días',
    'services.video.delivery': '10-15 días',

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
    'portfolio.cargar_mas': 'Cargar más proyectos',
    'portfolio.mostrar_menos': 'Mostrar menos',
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
    
    'portfolio.revel_bar.titulo': 'Revel Bar - Fotografía de Ambiente',
    'portfolio.revel_bar.descripcion': 'Sesión fotográfica profesional para bar, capturando la atmósfera única y ambiente nocturno',
    'portfolio.revel_bar.cliente': 'Revel Bar',
    'portfolio.revel_bar.tags': 'Bar, Ambiente, Nocturno, Lifestyle',
    
    'portfolio.widook_optic.titulo': 'Widook Optic - Fotografía de Producto',
    'portfolio.widook_optic.descripcion': 'Fotografía especializada de productos ópticos, destacando calidad y diseño de monturas',
    'portfolio.widook_optic.cliente': 'Widook Optic',
    'portfolio.widook_optic.tags': 'Producto, Óptica, Monturas, Comercial',
    
    'portfolio.los_hotdogs.titulo': 'Los Hotdogs SDQ - Identidad de Marca',
    'portfolio.los_hotdogs.descripcion': 'Desarrollo completo de identidad visual para cadena de hotdogs, con enfoque juvenil y fresco',
    'portfolio.los_hotdogs.cliente': 'Los Hotdogs SDQ',
    'portfolio.los_hotdogs.tags': 'Branding, Food, Identidad Visual, Juvenil',
    
    'portfolio.nevada_care.titulo': 'Nevada Care Pharmacy - Branding Farmacéutico',
    'portfolio.nevada_care.descripcion': 'Identidad visual para farmacia, transmitiendo confianza y profesionalismo en el sector salud',
    'portfolio.nevada_care.cliente': 'Nevada Care Pharmacy',
    'portfolio.nevada_care.tags': 'Farmacia, Healthcare, Branding, Confianza',
    
    'portfolio.palo_studio.titulo': 'Palo Studio - Desarrollo de Marca',
    'portfolio.palo_studio.descripcion': 'Creación de identidad visual completa para estudio creativo, con enfoque moderno y minimalista',
    'portfolio.palo_studio.cliente': 'Palo Studio',
    'portfolio.palo_studio.tags': 'Estudio, Creativo, Minimalista, Branding',
    
    'portfolio.premeditest.titulo': 'Premeditest - Identidad Educativa',
    'portfolio.premeditest.descripcion': 'Desarrollo de marca para plataforma educativa de medicina, con enfoque académico y profesional',
    'portfolio.premeditest.cliente': 'Premeditest',
    'portfolio.premeditest.tags': 'Educación, Medicina, Academia, Profesional',
    
    'portfolio.th_oasis.titulo': 'TH Oasis - Branding Hotelero',
    'portfolio.th_oasis.descripcion': 'Identidad visual para complejo hotelero, evocando relajación y experiencias únicas',
    'portfolio.th_oasis.cliente': 'TH Oasis',
    'portfolio.th_oasis.tags': 'Hotel, Turismo, Relajación, Experiencia',
    
    'portfolio.chavalines.titulo': 'Chavalines RP - Animación 3D',
    'portfolio.chavalines.descripcion': 'Animaciones 3D y motion graphics para servidor de roleplay, con identidad gaming vibrante',
    'portfolio.chavalines.cliente': 'Chavalines RP',
    'portfolio.chavalines.tags': 'Gaming, Animación 3D, Roleplay, Motion Graphics',
    
    'portfolio.ambiente_chic.titulo': 'Ambiente Chic - Video Corporativo',
    'portfolio.ambiente_chic.descripcion': 'Producción audiovisual para inauguración de boutique, capturando elegancia y estilo',
    'portfolio.ambiente_chic.cliente': 'Ambiente Chic',
    'portfolio.ambiente_chic.tags': 'Video, Inauguración, Boutique, Elegancia',
    
    'portfolio.beeroclock.titulo': 'Beer O\'Clock - Video Navideño',
    'portfolio.beeroclock.descripcion': 'Producción de video promocional navideño para bar, con ambiente festivo y celebración',
    'portfolio.beeroclock.cliente': 'Beer O\'Clock',
    'portfolio.beeroclock.tags': 'Video, Navidad, Bar, Promocional',
    
    'portfolio.time_homes.titulo': 'Time Homes - Video Inmobiliario',
    'portfolio.time_homes.descripcion': 'Video promocional para condominios residenciales, destacando calidad y ubicación privilegiada',
    'portfolio.time_homes.cliente': 'Time Homes',
    'portfolio.time_homes.tags': 'Inmobiliario, Condominios, Promocional, Residencial',

    // Portfolio modal translations
    'portfolio.cliente': 'Cliente:',
    'portfolio.ano': 'Año:',
    'portfolio.tags': 'Tags:',
    'portfolio.slideshow': 'Slideshow',
    'portfolio.archivo': 'archivo',
    'portfolio.cat_diseno_grafico': 'Diseño Gráfico',
    'portfolio.categoria': 'Categoría:',
    'portfolio.cat_fotografia_profesional': 'Fotografía Profesional',
    'portfolio.cat_motion_graphics': 'Motion Graphics',
    'portfolio.cat_produccion_audiovisual': 'Producción Audiovisual',
    'portfolio.compartir': 'Compartir',
    'portfolio.compartir_proyecto': 'Compartir proyecto',
    'portfolio.desliza_cambiar': 'Desliza para cambiar',
    'portfolio.detalles_proyecto': 'Detalles del Proyecto',
    'portfolio.escape_cerrar': 'Escape para cerrar',
    'portfolio.espacio_pantalla_completa': 'Espacio para pantalla completa',
    'portfolio.flechas_cambiar': 'Flechas ← → para cambiar imagen',
    'portfolio.imagenes': 'Imágenes:',
    'portfolio.navegacion': 'Navegación',
    'portfolio.pausar': 'Pausar',
    'portfolio.pellizca_zoom': 'Pellizca para zoom',
    'portfolio.slideshow_title': 'Reproducción automática (S)',
    'portfolio.s_slideshow': 'S para slideshow',

    // Portfolio items that need translations
    'portfolio.esvi_hair_video.titulo': 'Esvi Hair Studio - Video Promocional',
    'portfolio.esvi_hair_video.descripcion': 'Producción audiovisual mostrando servicios premium y ambiente exclusivo del salón',
    'portfolio.esvi_hair_video.cliente': 'Esvi Hair Studio',

    'portfolio.heles_decorations.titulo': 'Heles Decorations - Video Evento',
    'portfolio.heles_decorations.descripcion': 'Video showcase de decoración profesional para eventos, destacando creatividad y elegancia',
    'portfolio.heles_decorations.cliente': 'Heles Decorations',

    'portfolio.iea_autos.titulo': 'IEA Autos - Video Comercial',
    'portfolio.iea_autos.descripcion': 'Producción audiovisual automotriz destacando calidad y excelencia en servicios',
    'portfolio.iea_autos.cliente': 'IEA Autos',

    'portfolio.servi_sec.titulo': 'Servi-Sec - Animación Corporativa',
    'portfolio.servi_sec.descripcion': 'Motion graphics y animación promocional para empresa líder en servicios de lavandería',
    'portfolio.servi_sec.cliente': 'Servi-Sec',

    'portfolio.servisec_video.titulo': 'ServiSec - Video Corporativo',
    'portfolio.servisec_video.descripcion': 'Video corporativo para empresa de servicios de seguridad y lavandería',
    'portfolio.servisec_video.cliente': 'ServiSec',

    // Dynamic CTAs
    'cta.solicitar_cotizacion': 'Solicitar Cotización',
    'cta.ver_proceso': 'Ver Proceso',
    'cta.contactar_ahora': 'Contactar Ahora',
    'cta.reservar_sesion': 'Reservar Sesión',
    'cta.ver_paquetes': 'Ver Paquetes',
    'cta.contactar_fotografo': 'Contactar Fotógrafo',
    'cta.solicitar_video': 'Solicitar Video',
    'cta.ver_demo_reel': 'Ver Demo Reel',
    'cta.empezar_proyecto': 'Empezar Proyecto',
    'cta.crear_animacion': 'Crear Animación',
    'cta.ver_ejemplos': 'Ver Ejemplos',
    'cta.consulta_gratis': 'Consulta Gratis',
    'cta.titulo_principal': '¿Listo para el siguiente nivel?',
    'cta.descripcion': 'Transforma tu negocio con soluciones creativas que generan resultados reales. Comencemos tu proyecto hoy.',
    'cta.ver_servicios': 'Ver Servicios',
    'cta.ver_proyecto': 'Ver Proyecto',

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
    'footer.marcas_que_confian': 'Marcas que confían en nosotros',
    'footer.servicios.marketing': 'Marketing Digital',
    'footer.servicios.fotografia': 'Fotografía',
    'footer.servicios.diseno': 'Diseño Gráfico',
    'footer.servicios.video': 'Videografía',
    'footer.servicios.animacion': 'Animación',

    // Contact Form
    'contact.badge': 'Contacto',
    'contact.titulo': 'Contáctanos',
    'contact.subtitulo': '¿Dudas? Hablemos',
    'contact.titulo_principal': 'Resolvamos tus dudas',
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
    
    // Budget options
    'contact.selecciona_presupuesto': 'Selecciona tu presupuesto',

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

    // FAQ
    'faq.badge': 'FAQ',
    'faq.titulo': 'Preguntas Frecuentes',
    'faq.subtitulo': 'Resolvemos las dudas más comunes sobre nuestros servicios de marketing digital, diseño y producción audiovisual',
    'faq.detalles_especificos': 'Detalles específicos:',
    'faq.no_respuesta': '¿No encontraste la respuesta que buscabas? Contáctanos directamente y resolveremos todas tus dudas.',
    'faq.contactar_ahora': 'Contactar ahora',

    // FAQ Questions and Answers
    'faq.q1.question': '¿Cuánto cuesta el servicio/proyecto o cuál es el presupuesto necesario?',
    'faq.q1.answer': 'Cada proyecto es único y tiene necesidades específicas. Por eso, creamos propuestas personalizadas que se adapten perfectamente a tu presupuesto y objetivos. ¡La cotización es completamente gratuita y sin compromiso! Contáctanos para recibir una propuesta detallada en menos de 24 horas.',
    'faq.q1.detail1': '✨ Cotización 100% gratuita y personalizada',
    'faq.q1.detail2': '🚀 Propuesta lista en menos de 24 horas',
    'faq.q1.detail3': '💡 Estrategia adaptada a tu presupuesto',
    'faq.q1.detail4': '🎯 Sin compromiso ni costos ocultos',
    'faq.q1.detail5': '📊 Análisis detallado de tu proyecto',
    'faq.q1.detail6': '🤝 Asesoría inicial completamente gratis',

    'faq.q2.question': '¿Qué servicios ofrecen y cómo pueden ayudar a mi negocio?',
    'faq.q2.answer': 'Ofrecemos una amplia gama de servicios para mejorar la visibilidad, relevancia y posicionamiento de tu negocio. Nuestros servicios incluyen posicionamiento SEO, campañas SEM, diseño y desarrollo web, estrategias de contenido, diseño gráfico, fotografía, videografía, animación y gestión de redes sociales.',
    'faq.q2.detail1': 'Posicionamiento SEO y campañas SEM',
    'faq.q2.detail2': 'Diseño y desarrollo web (WordPress, Woocommerce)',
    'faq.q2.detail3': 'Estrategias de contenido y marketing digital',
    'faq.q2.detail4': 'Diseño gráfico e identidad visual',
    'faq.q2.detail5': 'Fotografía comercial y de producto',
    'faq.q2.detail6': 'Videografía y animación 2D/3D',
    'faq.q2.detail7': 'Gestión de redes sociales',

    'faq.q3.question': '¿Qué resultados puedo esperar y cómo se mide el éxito?',
    'faq.q3.answer': 'Puedes esperar un aumento en el tráfico web, mayor visibilidad en los motores de búsqueda y un incremento en las conversiones. Utilizamos métricas específicas y objetivos SMART para medir el éxito de nuestras estrategias.',
    'faq.q3.detail1': 'Análisis de datos de SEO y SEM',
    'faq.q3.detail2': 'Seguimiento de conversiones y ROI',
    'faq.q3.detail3': 'Métricas de engagement en redes sociales',
    'faq.q3.detail4': 'Informes regulares de rendimiento',
    'faq.q3.detail5': 'Objetivos SMART (Específicos, Medibles, Alcanzables, Relevantes, Temporales)',

    'faq.q4.question': '¿Cuánto tiempo tomará el proyecto o cuáles son los plazos de entrega?',
    'faq.q4.answer': 'La duración es variable y depende de la información proporcionada por el cliente y la complejidad del proyecto. Los proyectos se dividen en fases, y cada fase incluye un "entregable" que requiere tu aprobación.',
    'faq.q4.detail1': 'Los tiempos dependen de la información inicial proporcionada',
    'faq.q4.detail2': 'Cada fase requiere aprobación del cliente',
    'faq.q4.detail3': 'Los retrasos en feedback pueden afectar tiempos',
    'faq.q4.detail4': 'Proporcionamos cronograma detallado antes de iniciar',

    'faq.q5.question': '¿Cómo manejan las modificaciones y los cambios en el alcance del proyecto?',
    'faq.q5.answer': 'Ofrecemos hasta dos modificaciones incluidas en el proyecto inicial. Si se necesitan más cambios, se aplicará una tarifa preferencial. Los aumentos de alcance se reevalúan en tiempo y costos, formalizándose en una enmienda al contrato.',
    'faq.q5.detail1': 'Máximo dos modificaciones incluidas',
    'faq.q5.detail2': 'Cambios adicionales con tarifa preferencial',
    'faq.q5.detail3': 'Reevaluación de tiempo y costos para cambios de alcance',
    'faq.q5.detail4': 'Comunicación transparente sobre impactos en el proyecto',

    'faq.q6.question': '¿Es necesario que mi empresa esté presente en redes sociales?',
    'faq.q6.answer': 'Sí, es prácticamente imprescindible estar presente en redes sociales, independientemente del tamaño de la empresa. Las redes sociales permiten conseguir nuevos clientes, demostrar modernidad y ofrecer múltiples canales de contacto.',
    'faq.q6.detail1': 'Conseguir nuevos clientes y leads',
    'faq.q6.detail2': 'Demostrar modernidad y relevancia',
    'faq.q6.detail3': 'Múltiples canales de contacto',
    'faq.q6.detail4': 'Interacción bidireccional con audiencia',
    'faq.q6.detail5': 'Ventaja competitiva en el mercado',

    'faq.q7.question': '¿Cómo es el proceso de colaboración y comunicación durante el proyecto?',
    'faq.q7.answer': 'El proceso se construye mediante el aporte constante de ambas partes: tu visión de negocio y nuestra experiencia en diseño, comunicación y tecnología. Comenzamos con una consultoría inicial y mantenemos comunicación regular durante todo el proyecto.',
    'faq.q7.detail1': 'Consultoría inicial para definir objetivos',
    'faq.q7.detail2': 'Seguimiento constante con informes regulares',
    'faq.q7.detail3': 'Comunicación clara y transparente',
    'faq.q7.detail4': 'Colaboración estrecha cliente-agencia',
    'faq.q7.detail5': 'Adaptación de estrategias según necesidades',

    // ContactFAQ specific
    'contact.faq.q1.question': '¿Cuánto cuesta el servicio/proyecto?',
    'contact.faq.q1.answer': 'Cada proyecto es único y tiene necesidades específicas. Por eso, creamos propuestas personalizadas que se adapten perfectamente a tu presupuesto y objetivos. ¡La cotización es completamente gratuita y sin compromiso! Contáctanos para recibir una propuesta detallada en menos de 24 horas.',
    'contact.faq.q1.detail1': '✨ Cotización 100% gratuita y personalizada',
    'contact.faq.q1.detail2': '🚀 Propuesta lista en menos de 24 horas',
    'contact.faq.q1.detail3': '💡 Estrategia adaptada a tu presupuesto',
    'contact.faq.q1.detail4': '🎯 Sin compromiso ni costos ocultos',

    'contact.faq.q2.question': '¿Qué servicios ofrecen?',
    'contact.faq.q2.answer': 'Ofrecemos servicios completos de marketing digital, diseño gráfico, fotografía, videografía, animación y desarrollo web para mejorar la presencia digital de tu negocio.',
    'contact.faq.q2.detail1': 'Posicionamiento SEO y campañas SEM',
    'contact.faq.q2.detail2': 'Diseño y desarrollo web',
    'contact.faq.q2.detail3': 'Fotografía comercial y de producto',
    'contact.faq.q2.detail4': 'Videografía y animación 2D/3D',
    'contact.faq.q2.detail5': 'Gestión de redes sociales',

    'contact.faq.q3.question': '¿Cuánto tiempo toma un proyecto?',
    'contact.faq.q3.answer': 'La duración depende de la complejidad del proyecto y la información proporcionada. Los proyectos se dividen en fases con entregables que requieren tu aprobación.',
    'contact.faq.q3.detail1': 'Tiempos según información inicial',
    'contact.faq.q3.detail2': 'Cada fase requiere aprobación',
    'contact.faq.q3.detail3': 'Cronograma detallado antes de iniciar',

    'contact.faq.q4.question': '¿Cómo manejan las modificaciones?',
    'contact.faq.q4.answer': 'Incluimos hasta dos modificaciones. Cambios adicionales tienen tarifa preferencial. Los aumentos de alcance se reevalúan en tiempo y costos.',
    'contact.faq.q4.detail1': 'Máximo dos modificaciones incluidas',
    'contact.faq.q4.detail2': 'Cambios adicionales con tarifa preferencial',
    'contact.faq.q4.detail3': 'Comunicación transparente sobre impactos',

    // Ubicación y contacto
    'contact.ubicacion.direccion_titulo': 'Nuestra Oficina',
    'contact.ubicacion.direccion_linea1': 'Calle Principal #123',
    'contact.ubicacion.direccion_linea2': 'Zona Colonial, Santo Domingo',
    'contact.ubicacion.direccion_linea3': 'República Dominicana, 10210',
    'contact.ubicacion.horarios_titulo': 'Horarios de Atención',
    'contact.ubicacion.contacto_titulo': 'Contacto',
    'contact.ubicacion.lun_vie': 'Lun - Vie',
    'contact.ubicacion.horario_semana': '9:00 AM - 6:00 PM',
    'contact.ubicacion.sabados': 'Sábados',
    'contact.ubicacion.horario_sabado': '9:00 AM - 2:00 PM',
    'contact.ubicacion.domingos': 'Domingos',
    'contact.ubicacion.cerrado': 'Cerrado',
    'contact.ubicacion.telefono': 'Teléfono',
    'contact.ubicacion.numero_telefono': '+1 (809) 555-0123',
    'contact.ubicacion.email': 'Email',
    'contact.ubicacion.direccion_email': 'hola@zentella.com',
    'contact.ubicacion.whatsapp': 'WhatsApp',
    'contact.ubicacion.numero_whatsapp': '+1 (809) 555-0123',


    'contact.seleccionar_servicio': 'Seleccionar servicio',
    'contact.seleccionar_rango': 'Seleccionar rango',
    'contact.success_message': '¡Gracias por contactarnos! Te responderemos dentro de 24 horas.',

    // Contact form service options
    'contact.servicio_marketing_digital': 'Marketing Digital',
    'contact.servicio_diseno_grafico': 'Diseño Gráfico',
    'contact.servicio_fotografia': 'Fotografía',
    'contact.servicio_videografia': 'Videografía',
    'contact.servicio_animacion': 'Animación',
    'contact.servicio_desarrollo_web': 'Desarrollo Web',
    'contact.servicio_consultoria': 'Consultoría',
    'contact.servicio_otro': 'Otro',

    // Contact form budget options
    'contact.presupuesto_menos_10k': 'Menos de DOP 10,000',
    'contact.presupuesto_10k_25k': 'DOP 10,000 - DOP 25,000',
    'contact.presupuesto_25k_50k': 'DOP 25,000 - DOP 50,000',
    'contact.presupuesto_50k_100k': 'DOP 50,000 - DOP 100,000',
    'contact.presupuesto_mas_100k': 'Más de DOP 100,000',
    'contact.presupuesto_por_definir': 'Por definir',

    // Footer
    'footer.mantente_al_dia': 'Mantente al día',
    'footer.suscribirse_desc': 'Suscríbete para recibir noticias sobre nuestros últimos proyectos y tendencias creativas.',
    'footer.email_placeholder': 'tu@email.com',
    'footer.suscribirse': 'Suscribirse',
    'footer.derechos_completos': 'Todos los derechos reservados.',
    'footer.politica_privacidad': 'Política de Privacidad',
    'footer.terminos_servicio': 'Términos de Servicio',
    'footer.navegacion': 'Navegación',
    'footer.descripcion_empresa': 'Agencia creativa integral especializada en marketing, fotografía, diseño gráfico, videografía y animación. Creamos experiencias visuales que conectan marcas con sus audiencias.',

    // About/Team  
    'about.profesionales_desc': 'Profesionales apasionados por crear experiencias digitales excepcionales.',
    'about.conócenos': 'Conócenos',
    'about.stephania.desc': 'Especialista en estrategias digitales con más de 5 años de experiencia. Lidera campañas creativas que generan impacto y resultados medibles.',
    'about.stephania.rol': 'Directora de Marketing',
    'about.angel.desc': 'Fotógrafo y diseñador visual con un ojo único para capturar momentos auténticos. Transforma ideas en experiencias visuales memorables.',
    'about.angel.rol': 'Director Creativo',
    'about.ana.desc': 'Licenciada en Marketing Digital con experiencia especializada en gestión de comunidades digitales y creación de contenido. Conecta marcas con audiencias a través de estrategias de comunicación efectivas y datos estratégicos.',
    'about.ana.rol': 'Community Manager',

    // Testimonials
    'testimonials.badge': 'Testimonios',
    'testimonials.titulo': 'Lo que dicen nuestros clientes',
    'testimonials.subtitulo': 'La confianza de nuestros clientes es nuestro mayor logro.',

    'testimonials.maria.name': 'Better Health Nevada',
    'testimonials.maria.role': 'Farmacia & Servicios de Salud',
    'testimonials.maria.company': 'Nevada, USA',
    'testimonials.maria.text': 'Zentella transformó completamente nuestra identidad visual. El nuevo branding refleja la confianza y profesionalismo que nuestros pacientes merecen. Las ventas aumentaron 40% desde el rediseño.',

    'testimonials.carlos.name': 'Kaccao Kitchen',
    'testimonials.carlos.role': 'Restaurante de Cocina Artesanal',
    'testimonials.carlos.company': 'República Dominicana',
    'testimonials.carlos.text': 'La estrategia de branding que desarrolló Zentella para nosotros fue extraordinaria. Capturaron perfectamente la esencia de nuestra cocina artesanal. Nuestras reservas se duplicaron en solo 3 meses.',

    'testimonials.ana.name': 'Revel Bar',
    'testimonials.ana.role': 'Bar & Entretenimiento',
    'testimonials.ana.company': 'República Dominicana',
    'testimonials.ana.text': 'Las fotografías que tomó Zentella para nuestro bar son impresionantes. Profesionalismo, creatividad y un ojo excepcional para capturar la atmósfera única de nuestro local. Definitivamente el partner perfecto.',
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
    'hero.haz_que': 'Boost',
    'hero.con_zentella': 'with Zentella',
    'hero.comenzar': 'Get Started',
    'hero.portfolio': 'Portfolio',
    'hero.fotografia': 'Photography',
    'hero.diseno': 'Design',
    'hero.video': 'Video',
    'hero.animacion': 'Animation',
    // Hero phrases
    'hero.phrase.tu_marca': 'your brand',
    'hero.phrase.tu_negocio': 'your business',
    'hero.phrase.tu_exito': 'your success',
    'hero.phrase.tu_historia': 'your story',
    'hero.phrase.tus_ventas': 'your sales',
    'hero.phrase.tus_redes': 'your network',
    'hero.phrase.tu_contenido': 'your content',
    'hero.phrase.tu_comunidad': 'your audience',
    'hero.phrase.tu_presencia': 'your image',
    'hero.phrase.tu_crecimiento': 'your growth',
    'hero.phrase.tu_impacto': 'your impact',
    'hero.phrase.tu_alcance': 'your reach',
    'hero.phrase.tu_audiencia': 'your crowd',
    'hero.phrase.tu_estrategia': 'your strategy',
    'hero.phrase.tu_vision': 'your vision',

    // Services
    'services.badge': 'Services',
    'services.titulo': 'Our Services',
    'services.subtitulo': 'Creative solutions that drive your success',
    'services.diseno.titulo': 'Design & Branding',
    'services.diseno.descripcion': 'We create unique and cohesive visual identities that reflect your brand personality, connect emotionally with your audience and strategically stand out in the competitive market.',
    'services.marketing.titulo': 'Digital Marketing',
    'services.marketing.descripcion': 'We develop comprehensive and personalized digital strategies to boost your business growth, increase your online presence and maximize return on investment.',
    'services.fotografia.titulo': 'Photography',
    'services.fotografia.descripcion': 'We capture the authentic essence of your brand through high-quality professional photography that tells your story and transmits your business values in an impactful way.',
    'services.video.titulo': 'Video & Animation',
    'services.video.descripcion': 'We produce cinematic audiovisual content and dynamic animations that emotionally connect with your audience, communicate your message memorably and generate engagement.',

    // Statistics
    'services.stats.proyectos': '50+',
    'services.stats.proyectos_label': 'Completed projects',
    'services.stats.satisfaccion': '98%',
    'services.stats.satisfaccion_label': 'Client satisfaction',
    'services.stats.experiencia': '5+',
    'services.stats.experiencia_label': 'Years of experience',

    // Service features
    'services.diseno.features': ['Logo and variations', 'Complete brand manual', 'Color palette', 'Corporate typography', '3 revisions included'],
    'services.marketing.features': ['Custom strategy', 'Competitor analysis', 'Campaign management', 'Monthly reports', 'Continuous optimization'],
    'services.fotografia.features': ['Unlimited session', 'Professional editing', 'Digital gallery', 'High resolution images', 'Commercial usage rights'],
    'services.video.features': ['Script included', 'Royalty-free music', '2D/3D animations', 'Multiple formats', 'Revisions included'],

    'services.delivery_time': 'Delivery time: ',
    'services.diseno.delivery': '7-10 days',
    'services.marketing.delivery': '15-20 days',
    'services.fotografia.delivery': '3-5 days',
    'services.video.delivery': '10-15 days',

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
    'portfolio.cargar_mas': 'Load more projects',
    'portfolio.mostrar_menos': 'Show less',
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
    
    'portfolio.revel_bar.titulo': 'Revel Bar - Atmosphere Photography',
    'portfolio.revel_bar.descripcion': 'Professional photography session for bar, capturing unique atmosphere and nightlife ambiance',
    'portfolio.revel_bar.cliente': 'Revel Bar',
    'portfolio.revel_bar.tags': 'Bar, Atmosphere, Nightlife, Lifestyle',
    
    'portfolio.widook_optic.titulo': 'Widook Optic - Product Photography',
    'portfolio.widook_optic.descripcion': 'Specialized photography of optical products, highlighting quality and design of frames',
    'portfolio.widook_optic.cliente': 'Widook Optic',
    'portfolio.widook_optic.tags': 'Product, Optics, Frames, Commercial',
    
    'portfolio.los_hotdogs.titulo': 'Los Hotdogs SDQ - Brand Identity',
    'portfolio.los_hotdogs.descripcion': 'Complete visual identity development for hotdog chain, with youthful and fresh approach',
    'portfolio.los_hotdogs.cliente': 'Los Hotdogs SDQ',
    'portfolio.los_hotdogs.tags': 'Branding, Food, Visual Identity, Youthful',
    
    'portfolio.nevada_care.titulo': 'Nevada Care Pharmacy - Pharmaceutical Branding',
    'portfolio.nevada_care.descripcion': 'Visual identity for pharmacy, conveying trust and professionalism in the healthcare sector',
    'portfolio.nevada_care.cliente': 'Nevada Care Pharmacy',
    'portfolio.nevada_care.tags': 'Pharmacy, Healthcare, Branding, Trust',
    
    'portfolio.palo_studio.titulo': 'Palo Studio - Brand Development',
    'portfolio.palo_studio.descripcion': 'Complete visual identity creation for creative studio, with modern and minimalist approach',
    'portfolio.palo_studio.cliente': 'Palo Studio',
    'portfolio.palo_studio.tags': 'Studio, Creative, Minimalist, Branding',
    
    'portfolio.premeditest.titulo': 'Premeditest - Educational Identity',
    'portfolio.premeditest.descripcion': 'Brand development for medical education platform, with academic and professional focus',
    'portfolio.premeditest.cliente': 'Premeditest',
    'portfolio.premeditest.tags': 'Education, Medicine, Academic, Professional',
    
    'portfolio.th_oasis.titulo': 'TH Oasis - Hotel Branding',
    'portfolio.th_oasis.descripcion': 'Visual identity for hotel complex, evoking relaxation and unique experiences',
    'portfolio.th_oasis.cliente': 'TH Oasis',
    'portfolio.th_oasis.tags': 'Hotel, Tourism, Relaxation, Experience',
    
    'portfolio.chavalines.titulo': 'Chavalines RP - 3D Animation',
    'portfolio.chavalines.descripcion': '3D animations and motion graphics for roleplay server, with vibrant gaming identity',
    'portfolio.chavalines.cliente': 'Chavalines RP',
    'portfolio.chavalines.tags': 'Gaming, 3D Animation, Roleplay, Motion Graphics',
    
    'portfolio.ambiente_chic.titulo': 'Ambiente Chic - Corporate Video',
    'portfolio.ambiente_chic.descripcion': 'Audiovisual production for boutique opening, capturing elegance and style',
    'portfolio.ambiente_chic.cliente': 'Ambiente Chic',
    'portfolio.ambiente_chic.tags': 'Video, Opening, Boutique, Elegance',
    
    'portfolio.beeroclock.titulo': 'Beer O\'Clock - Christmas Video',
    'portfolio.beeroclock.descripcion': 'Christmas promotional video production for bar, with festive atmosphere and celebration',
    'portfolio.beeroclock.cliente': 'Beer O\'Clock',
    'portfolio.beeroclock.tags': 'Video, Christmas, Bar, Promotional',
    
    'portfolio.time_homes.titulo': 'Time Homes - Real Estate Video',
    'portfolio.time_homes.descripcion': 'Promotional video for residential condominiums, highlighting quality and privileged location',
    'portfolio.time_homes.cliente': 'Time Homes',
    'portfolio.time_homes.tags': 'Real Estate, Condominiums, Promotional, Residential',

    // Portfolio modal translations
    'portfolio.cliente': 'Client:',
    'portfolio.ano': 'Year:',
    'portfolio.tags': 'Tags:',
    'portfolio.slideshow': 'Slideshow',
    'portfolio.archivo': 'file',
    'portfolio.cat_diseno_grafico': 'Graphic Design',
    'portfolio.categoria': 'Category:',
    'portfolio.cat_fotografia_profesional': 'Professional Photography',
    'portfolio.cat_motion_graphics': 'Motion Graphics',
    'portfolio.cat_produccion_audiovisual': 'Audiovisual Production',
    'portfolio.compartir': 'Share',
    'portfolio.compartir_proyecto': 'Share project',
    'portfolio.desliza_cambiar': 'Swipe to change',
    'portfolio.detalles_proyecto': 'Project Details',
    'portfolio.escape_cerrar': 'Escape to close',
    'portfolio.espacio_pantalla_completa': 'Space for fullscreen',
    'portfolio.flechas_cambiar': 'Arrows ← → to change image',
    'portfolio.imagenes': 'Images:',
    'portfolio.navegacion': 'Navigation',
    'portfolio.pausar': 'Pause',
    'portfolio.pellizca_zoom': 'Pinch to zoom',
    'portfolio.slideshow_title': 'Autoplay (S)',
    'portfolio.s_slideshow': 'S for slideshow',

    // Portfolio items that need translations
    'portfolio.esvi_hair_video.titulo': 'Esvi Hair Studio - Promotional Video',
    'portfolio.esvi_hair_video.descripcion': 'Audiovisual production showcasing premium services and exclusive salon atmosphere',
    'portfolio.esvi_hair_video.cliente': 'Esvi Hair Studio',

    'portfolio.heles_decorations.titulo': 'Heles Decorations - Event Video',
    'portfolio.heles_decorations.descripcion': 'Video showcase of professional event decoration, highlighting creativity and elegance',
    'portfolio.heles_decorations.cliente': 'Heles Decorations',

    'portfolio.iea_autos.titulo': 'IEA Autos - Commercial Video',
    'portfolio.iea_autos.descripcion': 'Automotive audiovisual production highlighting quality and excellence in services',
    'portfolio.iea_autos.cliente': 'IEA Autos',

    'portfolio.servi_sec.titulo': 'Servi-Sec - Corporate Animation',
    'portfolio.servi_sec.descripcion': 'Motion graphics and promotional animation for leading laundry services company',
    'portfolio.servi_sec.cliente': 'Servi-Sec',

    'portfolio.servisec_video.titulo': 'ServiSec - Corporate Video',
    'portfolio.servisec_video.descripcion': 'Corporate video for security and laundry services company',
    'portfolio.servisec_video.cliente': 'ServiSec',

    // Dynamic CTAs
    'cta.solicitar_cotizacion': 'Get Quote',
    'cta.ver_proceso': 'View Process',
    'cta.contactar_ahora': 'Contact Now',
    'cta.reservar_sesion': 'Book Session',
    'cta.ver_paquetes': 'View Packages',
    'cta.contactar_fotografo': 'Contact Photographer',
    'cta.solicitar_video': 'Request Video',
    'cta.ver_demo_reel': 'View Demo Reel',
    'cta.empezar_proyecto': 'Start Project',
    'cta.crear_animacion': 'Create Animation',
    'cta.ver_ejemplos': 'View Examples',
    'cta.consulta_gratis': 'Free Consultation',
    'cta.titulo_principal': 'Ready for the next level?',
    'cta.descripcion': 'Transform your business with creative solutions that generate real results. Let\'s start your project today.',
    'cta.ver_servicios': 'View Services',
    'cta.ver_proyecto': 'View Project',

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
    'footer.marcas_que_confian': 'Brands that trust us',
    'footer.servicios.marketing': 'Digital Marketing',
    'footer.servicios.fotografia': 'Photography',
    'footer.servicios.diseno': 'Graphic Design',
    'footer.servicios.video': 'Videography',
    'footer.servicios.animacion': 'Animation',

    // Contact Form  
    'contact.badge': 'Contact',
    'contact.titulo': 'Contact us',
    'contact.subtitulo': 'Questions? Let\'s talk',
    'contact.titulo_principal': 'Let\'s solve your doubts',
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
    
    // Budget options
    'contact.selecciona_presupuesto': 'Select your budget',

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

    // FAQ
    'faq.badge': 'FAQ',
    'faq.titulo': 'Frequently Asked Questions',
    'faq.subtitulo': 'We resolve the most common questions about our digital marketing, design and audiovisual production services',
    'faq.detalles_especificos': 'Specific details:',
    'faq.no_respuesta': 'Didn\'t find the answer you were looking for? Contact us directly and we\'ll resolve all your questions.',
    'faq.contactar_ahora': 'Contact now',

    // FAQ Questions and Answers
    'faq.q1.question': 'How much does the service/project cost or what budget is needed?',
    'faq.q1.answer': 'Every project is unique with specific needs. That\'s why we create personalized proposals that perfectly adapt to your budget and objectives. The quote is completely free and without commitment! Contact us to receive a detailed proposal in less than 24 hours.',
    'faq.q1.detail1': '✨ 100% free and personalized quote',
    'faq.q1.detail2': '🚀 Proposal ready in less than 24 hours',
    'faq.q1.detail3': '💡 Strategy adapted to your budget',
    'faq.q1.detail4': '🎯 No commitment or hidden costs',
    'faq.q1.detail5': '📊 Detailed analysis of your project',
    'faq.q1.detail6': '🤝 Initial consultation completely free',

    'faq.q2.question': 'What services do you offer and how can they help my business?',
    'faq.q2.answer': 'We offer a wide range of services to improve your business\'s visibility, relevance and positioning. Our services include SEO positioning, SEM campaigns, web design and development, content strategies, graphic design, photography, videography, animation and social media management.',
    'faq.q2.detail1': 'SEO positioning and SEM campaigns',
    'faq.q2.detail2': 'Web design and development (WordPress, Woocommerce)',
    'faq.q2.detail3': 'Content strategies and digital marketing',
    'faq.q2.detail4': 'Graphic design and visual identity',
    'faq.q2.detail5': 'Commercial and product photography',
    'faq.q2.detail6': '2D/3D videography and animation',
    'faq.q2.detail7': 'Social media management',

    'faq.q3.question': 'What results can I expect and how is success measured?',
    'faq.q3.answer': 'You can expect an increase in web traffic, greater visibility in search engines and an increase in conversions. We use specific metrics and SMART objectives to measure the success of our strategies.',
    'faq.q3.detail1': 'SEO and SEM data analysis',
    'faq.q3.detail2': 'Conversion and ROI tracking',
    'faq.q3.detail3': 'Social media engagement metrics',
    'faq.q3.detail4': 'Regular performance reports',
    'faq.q3.detail5': 'SMART objectives (Specific, Measurable, Achievable, Relevant, Time-bound)',

    'faq.q4.question': 'How long will the project take or what are the delivery times?',
    'faq.q4.answer': 'Duration is variable and depends on the information provided by the client and project complexity. Projects are divided into phases, and each phase includes a "deliverable" that requires your approval.',
    'faq.q4.detail1': 'Times depend on initial information provided',
    'faq.q4.detail2': 'Each phase requires client approval',
    'faq.q4.detail3': 'Feedback delays may affect timelines',
    'faq.q4.detail4': 'We provide detailed timeline before starting',

    'faq.q5.question': 'How do you handle modifications and changes in project scope?',
    'faq.q5.answer': 'We offer up to two modifications included in the initial project. If more changes are needed, a preferential rate will apply. Scope increases are re-evaluated in time and costs, formalized in a contract amendment.',
    'faq.q5.detail1': 'Maximum two modifications included',
    'faq.q5.detail2': 'Additional changes with preferential rate',
    'faq.q5.detail3': 'Re-evaluation of time and costs for scope changes',
    'faq.q5.detail4': 'Transparent communication about project impacts',

    'faq.q6.question': 'Is it necessary for my company to be present on social media?',
    'faq.q6.answer': 'Yes, it is practically essential to be present on social media, regardless of company size. Social media allows getting new customers, demonstrating modernity and offering multiple contact channels.',
    'faq.q6.detail1': 'Get new customers and leads',
    'faq.q6.detail2': 'Demonstrate modernity and relevance',
    'faq.q6.detail3': 'Multiple contact channels',
    'faq.q6.detail4': 'Bidirectional interaction with audience',
    'faq.q6.detail5': 'Competitive advantage in the market',

    'faq.q7.question': 'What is the collaboration and communication process during the project?',
    'faq.q7.answer': 'The process is built through constant input from both parties: your business vision and our experience in design, communication and technology. We start with an initial consultation and maintain regular communication throughout the project.',
    'faq.q7.detail1': 'Initial consultation to define objectives',
    'faq.q7.detail2': 'Constant follow-up with regular reports',
    'faq.q7.detail3': 'Clear and transparent communication',
    'faq.q7.detail4': 'Close client-agency collaboration',
    'faq.q7.detail5': 'Strategy adaptation according to needs',

    // ContactFAQ specific
    'contact.faq.q1.question': 'How much does the service/project cost?',
    'contact.faq.q1.answer': 'Every project is unique with specific needs. That\'s why we create personalized proposals that perfectly adapt to your budget and objectives. The quote is completely free and without commitment! Contact us to receive a detailed proposal in less than 24 hours.',
    'contact.faq.q1.detail1': '✨ 100% free and personalized quote',
    'contact.faq.q1.detail2': '🚀 Proposal ready in less than 24 hours',
    'contact.faq.q1.detail3': '💡 Strategy adapted to your budget',
    'contact.faq.q1.detail4': '🎯 No commitment or hidden costs',

    'contact.faq.q2.question': 'What services do you offer?',
    'contact.faq.q2.answer': 'We offer complete digital marketing, graphic design, photography, videography, animation and web development services to improve your business\'s digital presence.',
    'contact.faq.q2.detail1': 'SEO positioning and SEM campaigns',
    'contact.faq.q2.detail2': 'Web design and development',
    'contact.faq.q2.detail3': 'Commercial and product photography',
    'contact.faq.q2.detail4': '2D/3D videography and animation',
    'contact.faq.q2.detail5': 'Social media management',

    'contact.faq.q3.question': 'How long does a project take?',
    'contact.faq.q3.answer': 'Duration depends on project complexity and information provided. Projects are divided into phases with deliverables that require your approval.',
    'contact.faq.q3.detail1': 'Times according to initial information',
    'contact.faq.q3.detail2': 'Each phase requires approval',
    'contact.faq.q3.detail3': 'Detailed timeline before starting',

    'contact.faq.q4.question': 'How do you handle modifications?',
    'contact.faq.q4.answer': 'We include up to two modifications. Additional changes have preferential rates. Scope increases are re-evaluated in time and costs.',
    'contact.faq.q4.detail1': 'Maximum two modifications included',
    'contact.faq.q4.detail2': 'Additional changes with preferential rate',
    'contact.faq.q4.detail3': 'Transparent communication about impacts',

    // Location and contact
    'contact.ubicacion.direccion_titulo': 'Our Office',
    'contact.ubicacion.direccion_linea1': 'Main Street #123',
    'contact.ubicacion.direccion_linea2': 'Colonial Zone, Santo Domingo',
    'contact.ubicacion.direccion_linea3': 'Dominican Republic, 10210',
    'contact.ubicacion.horarios_titulo': 'Business Hours',
    'contact.ubicacion.contacto_titulo': 'Contact',
    'contact.ubicacion.lun_vie': 'Mon - Fri',
    'contact.ubicacion.horario_semana': '9:00 AM - 6:00 PM',
    'contact.ubicacion.sabados': 'Saturdays',
    'contact.ubicacion.horario_sabado': '9:00 AM - 2:00 PM',
    'contact.ubicacion.domingos': 'Sundays',
    'contact.ubicacion.cerrado': 'Closed',
    'contact.ubicacion.telefono': 'Phone',
    'contact.ubicacion.numero_telefono': '+1 (809) 555-0123',
    'contact.ubicacion.email': 'Email',
    'contact.ubicacion.direccion_email': 'hello@zentella.com',
    'contact.ubicacion.whatsapp': 'WhatsApp',
    'contact.ubicacion.numero_whatsapp': '+1 (809) 555-0123',

    'contact.seleccionar_servicio': 'Select service',
    'contact.seleccionar_rango': 'Select range',
    'contact.success_message': 'Thank you for contacting us! We will respond within 24 hours.',

    // Contact form service options
    'contact.servicio_marketing_digital': 'Digital Marketing',
    'contact.servicio_diseno_grafico': 'Graphic Design',
    'contact.servicio_fotografia': 'Photography',
    'contact.servicio_videografia': 'Videography',
    'contact.servicio_animacion': 'Animation',
    'contact.servicio_desarrollo_web': 'Web Development',
    'contact.servicio_consultoria': 'Consulting',
    'contact.servicio_otro': 'Other',

    // Contact form budget options
    'contact.presupuesto_menos_10k': 'Less than DOP 10,000',
    'contact.presupuesto_10k_25k': 'DOP 10,000 - DOP 25,000',
    'contact.presupuesto_25k_50k': 'DOP 25,000 - DOP 50,000',
    'contact.presupuesto_50k_100k': 'DOP 50,000 - DOP 100,000',
    'contact.presupuesto_mas_100k': 'More than DOP 100,000',
    'contact.presupuesto_por_definir': 'To be defined',

    // Footer
    'footer.mantente_al_dia': 'Stay updated',
    'footer.suscribirse_desc': 'Subscribe to receive news about our latest projects and creative trends.',
    'footer.email_placeholder': 'your@email.com',
    'footer.suscribirse': 'Subscribe',
    'footer.derechos_completos': 'All rights reserved.',
    'footer.politica_privacidad': 'Privacy Policy',
    'footer.terminos_servicio': 'Terms of Service',
    'footer.navegacion': 'Navigation',
    'footer.descripcion_empresa': 'Comprehensive creative agency specialized in marketing, photography, graphic design, videography and animation. We create visual experiences that connect brands with their audiences.',

    // About/Team
    'about.profesionales_desc': 'Professionals passionate about creating exceptional digital experiences.',
    'about.conócenos': 'Get to know us',
    'about.stephania.desc': 'Digital strategies specialist with over 5 years of experience. Leads creative campaigns that generate impact and measurable results.',
    'about.stephania.rol': 'Marketing Director',
    'about.angel.desc': 'Photographer and visual designer with a unique eye for capturing authentic moments. Transforms ideas into memorable visual experiences.',
    'about.angel.rol': 'Creative Director',
    'about.ana.desc': 'Digital Marketing graduate with specialized experience in digital community management and content creation. Connects brands with audiences through effective communication strategies and strategic data insights.',
    'about.ana.rol': 'Community Manager',

    // Testimonials
    'testimonials.badge': 'Testimonials',
    'testimonials.titulo': 'What our clients say',
    'testimonials.subtitulo': 'Our clients\' trust is our greatest achievement.',

    'testimonials.maria.name': 'Better Health Nevada',
    'testimonials.maria.role': 'Pharmacy & Health Services',
    'testimonials.maria.company': 'Nevada, USA',
    'testimonials.maria.text': 'Zentella completely transformed our visual identity. The new branding reflects the trust and professionalism our patients deserve. Sales increased 40% since the redesign.',

    'testimonials.carlos.name': 'Kaccao Kitchen',
    'testimonials.carlos.role': 'Artisanal Cuisine Restaurant',
    'testimonials.carlos.company': 'Dominican Republic',
    'testimonials.carlos.text': 'The branding strategy that Zentella developed for us was extraordinary. They perfectly captured the essence of our artisanal cuisine. Our reservations doubled in just 3 months.',

    'testimonials.ana.name': 'Revel Bar',
    'testimonials.ana.role': 'Bar & Entertainment',
    'testimonials.ana.company': 'Dominican Republic',
    'testimonials.ana.text': 'The photographs that Zentella took for our bar are stunning. Professionalism, creativity and an exceptional eye for capturing the unique atmosphere of our venue. Definitely the perfect partner.',
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
  const t = useCallback((key: string): any => {
    const languageTranslations = translations[currentLanguage] as Record<string, any>
    const translation = languageTranslations?.[key]
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

  const value = useMemo(() => ({
    currentLanguage,
    setLanguage,
    t
  }), [currentLanguage, setLanguage, t])

  return (
    <LanguageContext.Provider value={value}>
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