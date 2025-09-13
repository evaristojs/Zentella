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
    'hero.haz_que': 'Impulsa',
    'hero.con_zentella': 'con Zentella. Hazlo más grande',
    'hero.comenzar': 'Comenzar',
    'hero.portfolio': 'Portfolio',
    'hero.fotografia': 'Fotografía',
    'hero.diseno': 'Diseño', 
    'hero.video': 'Video',
    'hero.animacion': 'Animación',
    // Hero phrases
    'hero.phrase.tu_marca': 'tu marca personal',
    'hero.phrase.tu_negocio': 'tu negocio digital',
    'hero.phrase.tu_exito': 'tu éxito empresarial',
    'hero.phrase.tu_historia': 'tu historia única',
    'hero.phrase.tus_ventas': 'tus ventas online',
    'hero.phrase.tus_redes': 'tus redes sociales',
    'hero.phrase.tu_contenido': 'tu contenido creativo',
    'hero.phrase.tu_comunidad': 'tu comunidad digital',
    'hero.phrase.tu_presencia': 'tu presencia online',
    'hero.phrase.tu_crecimiento': 'tu crecimiento exponencial',
    'hero.phrase.tu_impacto': 'tu impacto visual',
    'hero.phrase.tu_alcance': 'tu alcance digital',
    'hero.phrase.tu_audiencia': 'tu audiencia objetivo',
    'hero.phrase.tu_estrategia': 'tu estrategia digital',
    'hero.phrase.tu_vision': 'tu visión creativa',

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
    'faq.q1.answer': 'Los costos pueden variar enormemente, desde el 0 al infinito, dependiendo de los objetivos y recursos, así como de la fase del proyecto y la exposición de la marca. Factores como la industria, la competencia, la ubicación geográfica, el alcance y los objetivos del proyecto, la reputación y experiencia de la agencia, y la personalización de los servicios influyen en el precio.',
    'faq.q1.detail1': 'Publicidad PPC: $1,500-$10,000/mes',
    'faq.q1.detail2': 'SEO: $1,000-$7,500/mes',
    'faq.q1.detail3': 'Marketing en redes sociales: $1,000-$3,500/mes',
    'faq.q1.detail4': 'Marketing de contenido: $1,800-$12,000/mes',
    'faq.q1.detail5': 'Email marketing: $1,500-$7,500/mes',
    'faq.q1.detail6': 'Videos corporativos: entre $20,000-$100,000 MXN',

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
    'contact.faq.q1.answer': 'Los costos varían según objetivos, recursos y complejidad del proyecto. Factores como industria, competencia, alcance y personalización influyen en el precio.',
    'contact.faq.q1.detail1': 'Publicidad PPC: $1,500-$10,000/mes',
    'contact.faq.q1.detail2': 'SEO: $1,000-$7,500/mes',
    'contact.faq.q1.detail3': 'Marketing en redes sociales: $1,000-$3,500/mes',
    'contact.faq.q1.detail4': 'Videos corporativos: $20,000-$100,000 MXN',

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


    'contact.seleccionar_servicio': 'Seleccionar servicio',
    'contact.seleccionar_rango': 'Seleccionar rango',
    'contact.success_message': '¡Gracias por contactarnos! Te responderemos dentro de 24 horas.',

    // Testimonials
    'testimonials.badge': 'Testimonios',
    'testimonials.titulo': 'Lo que dicen nuestros clientes',
    'testimonials.subtitulo': 'La confianza de nuestros clientes es nuestro mayor logro.',

    'testimonials.maria.name': 'María González',
    'testimonials.maria.role': 'CEO, TechStart',
    'testimonials.maria.company': 'TechStart Solutions',
    'testimonials.maria.text': 'Zentella transformó completamente nuestra presencia digital. Su equipo no solo entendió nuestra visión, sino que la llevó al siguiente nivel. Los resultados fueron excepcionales.',

    'testimonials.carlos.name': 'Carlos Mendoza',
    'testimonials.carlos.role': 'Director de Marketing',
    'testimonials.carlos.company': 'Innovate Corp',
    'testimonials.carlos.text': 'La estrategia de branding que desarrolló Zentella para nosotros fue extraordinaria. Nuestro reconocimiento de marca aumentó un 300% en solo 6 meses.',

    'testimonials.ana.name': 'Ana Rodríguez',
    'testimonials.ana.role': 'Fundadora',
    'testimonials.ana.company': 'Creative Studio',
    'testimonials.ana.text': 'Profesionalismo, creatividad y resultados. Zentella es el partner perfecto para cualquier empresa que busque destacar en el mundo digital.',
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
    'hero.con_zentella': 'grow with Zentella',
    'hero.comenzar': 'Get Started',
    'hero.portfolio': 'Portfolio',
    'hero.fotografia': 'Photography',
    'hero.diseno': 'Design',
    'hero.video': 'Video',
    'hero.animacion': 'Animation',
    // Hero phrases
    'hero.phrase.tu_marca': 'your personal brand',
    'hero.phrase.tu_negocio': 'your digital business',
    'hero.phrase.tu_exito': 'your business success',
    'hero.phrase.tu_historia': 'your unique story',
    'hero.phrase.tus_ventas': 'your online sales',
    'hero.phrase.tus_redes': 'your social media',
    'hero.phrase.tu_contenido': 'your creative content',
    'hero.phrase.tu_comunidad': 'your digital community',
    'hero.phrase.tu_presencia': 'your online presence',
    'hero.phrase.tu_crecimiento': 'your exponential growth',
    'hero.phrase.tu_impacto': 'your visual impact',
    'hero.phrase.tu_alcance': 'your digital reach',
    'hero.phrase.tu_audiencia': 'your target audience',
    'hero.phrase.tu_estrategia': 'your digital strategy',
    'hero.phrase.tu_vision': 'your creative vision',

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
    'faq.q1.answer': 'Costs can vary enormously, from 0 to infinity, depending on objectives and resources, as well as the project phase and brand exposure. Factors such as industry, competition, geographic location, scope and project objectives, agency reputation and experience, and service customization influence pricing.',
    'faq.q1.detail1': 'PPC Advertising: $1,500-$10,000/month',
    'faq.q1.detail2': 'SEO: $1,000-$7,500/month',
    'faq.q1.detail3': 'Social media marketing: $1,000-$3,500/month',
    'faq.q1.detail4': 'Content marketing: $1,800-$12,000/month',
    'faq.q1.detail5': 'Email marketing: $1,500-$7,500/month',
    'faq.q1.detail6': 'Corporate videos: between $20,000-$100,000 MXN',

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
    'contact.faq.q1.answer': 'Costs vary according to objectives, resources and project complexity. Factors such as industry, competition, scope and customization influence pricing.',
    'contact.faq.q1.detail1': 'PPC Advertising: $1,500-$10,000/month',
    'contact.faq.q1.detail2': 'SEO: $1,000-$7,500/month',
    'contact.faq.q1.detail3': 'Social media marketing: $1,000-$3,500/month',
    'contact.faq.q1.detail4': 'Corporate videos: $20,000-$100,000 MXN',

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


    'contact.seleccionar_servicio': 'Select service',
    'contact.seleccionar_rango': 'Select range',
    'contact.success_message': 'Thank you for contacting us! We will respond within 24 hours.',

    // Testimonials
    'testimonials.badge': 'Testimonials',
    'testimonials.titulo': 'What our clients say',
    'testimonials.subtitulo': 'Our clients\' trust is our greatest achievement.',

    'testimonials.maria.name': 'María González',
    'testimonials.maria.role': 'CEO, TechStart',
    'testimonials.maria.company': 'TechStart Solutions',
    'testimonials.maria.text': 'Zentella completely transformed our digital presence. Their team not only understood our vision, but took it to the next level. The results were exceptional.',

    'testimonials.carlos.name': 'Carlos Mendoza',
    'testimonials.carlos.role': 'Marketing Director',
    'testimonials.carlos.company': 'Innovate Corp',
    'testimonials.carlos.text': 'The branding strategy that Zentella developed for us was extraordinary. Our brand recognition increased by 300% in just 6 meses.',

    'testimonials.ana.name': 'Ana Rodríguez',
    'testimonials.ana.role': 'Founder',
    'testimonials.ana.company': 'Creative Studio',
    'testimonials.ana.text': 'Professionalism, creativity and results. Zentella is the perfect partner for any company looking to stand out in the digital world.',
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