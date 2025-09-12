import { useState, useEffect, useCallback } from 'react'

export type Language = 'es' | 'en'

interface LanguageState {
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

    // Contact Form
    'contact.titulo': 'Contáctanos',
    'contact.nombre': 'NOMBRE',
    'contact.email': 'EMAIL', 
    'contact.telefono': 'TELÉFONO',
    'contact.servicio': 'SERVICIO DE INTERÉS',
    'contact.presupuesto': 'PRESUPUESTO ESTIMADO',
    'contact.mensaje': 'MENSAJE',
    'contact.terminos': 'Acepto los términos y condiciones',
    'contact.enviar': 'Enviar ahora',
    'contact.enviando': 'Enviando...',
    'contact.enviado': '¡Mensaje enviado!',

    // Placeholders
    'placeholder.nombre': 'Juan Pérez',
    'placeholder.email': 'hola@tuempresa.com',
    'placeholder.telefono': '+52 999 123 4567',
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

    // Contact Form  
    'contact.titulo': 'Contact us',
    'contact.nombre': 'NAME',
    'contact.email': 'EMAIL',
    'contact.telefono': 'PHONE',
    'contact.servicio': 'SERVICE OF INTEREST',
    'contact.presupuesto': 'ESTIMATED BUDGET',
    'contact.mensaje': 'MESSAGE',
    'contact.terminos': 'I agree to the Terms and Conditions',
    'contact.enviar': 'Send now',
    'contact.enviando': 'Sending...',
    'contact.enviado': 'Message sent!',

    // Placeholders
    'placeholder.nombre': 'John Doe',
    'placeholder.email': 'hello@company.com',
    'placeholder.telefono': '+1 555 123 4567',
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

export const useLanguage = (): LanguageState => {
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

  return {
    currentLanguage,
    setLanguage,
    t
  }
}