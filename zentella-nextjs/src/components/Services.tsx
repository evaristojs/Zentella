'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Service {
  id: string;
  title: string;
  description: string;
  preview: string;
  icon: string;
  features: string[];
  color: string;
}

const Services = () => {
  const [activeService, setActiveService] = useState<string>('marketing');

  const services: Service[] = [
    {
      id: 'marketing',
      title: 'Marketing Digital',
      description: 'Estrategias integrales para potenciar tu presencia digital y alcanzar tus objetivos comerciales.',
      preview: '/images/services/marketing-preview.jpg',
      icon: '📈',
      features: [
        'Estrategia de contenido',
        'Gestión de redes sociales',
        'Publicidad digital',
        'Analytics y reportes'
      ],
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'photography',
      title: 'Fotografía Profesional',
      description: 'Capturamos la esencia de tu marca con fotografía comercial, de producto y corporativa de alta calidad.',
      preview: '/images/services/photography-preview.jpg',
      icon: '📸',
      features: [
        'Fotografía de producto',
        'Fotografía gastronómica',
        'Sesiones corporativas',
        'Fotografía de eventos'
      ],
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 'design',
      title: 'Diseño Gráfico',
      description: 'Creamos identidades visuales memorables que conectan con tu audiencia y fortalecen tu marca.',
      preview: '/images/services/design-preview.jpg',
      icon: '🎨',
      features: [
        'Identidad corporativa',
        'Diseño de logotipos',
        'Material publicitario',
        'Packaging y etiquetas'
      ],
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 'video',
      title: 'Videografía',
      description: 'Producción audiovisual completa desde la conceptualización hasta la post-producción profesional.',
      preview: '/images/services/video-preview.jpg',
      icon: '🎬',
      features: [
        'Videos promocionales',
        'Documentales corporativos',
        'Cobertura de eventos',
        'Videos para redes sociales'
      ],
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'animation',
      title: 'Animación',
      description: 'Animaciones 2D y 3D que dan vida a tus ideas con motion graphics y efectos visuales impactantes.',
      preview: '/images/services/animation-preview.gif',
      icon: '✨',
      features: [
        'Motion graphics',
        'Animación 3D',
        'Logo animations',
        'Efectos visuales'
      ],
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  const activeServiceData = services.find(service => service.id === activeService) || services[0];

  return (
    <section id="services" className="py-24 bg-dark-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary-400/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Nuestros <span className="gradient-text">Servicios</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ofrecemos soluciones creativas integrales para impulsar tu marca al siguiente nivel
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Services List */}
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className={`group cursor-pointer transition-all duration-300 ${
                  activeService === service.id
                    ? 'bg-gradient-to-r from-primary-500/20 to-transparent border-l-4 border-primary-500'
                    : 'hover:bg-white/5 border-l-4 border-transparent hover:border-primary-500/50'
                }`}
                onClick={() => setActiveService(service.id)}
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`text-3xl bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-2 transition-colors ${
                        activeService === service.id ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {service.title}
                      </h3>
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {service.description}
                      </p>
                      
                      {activeService === service.id && (
                        <div className="space-y-2 animate-fade-in-up">
                          {service.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Arrow Indicator */}
                    <div className={`transition-transform duration-300 ${
                      activeService === service.id ? 'rotate-90' : 'group-hover:translate-x-1'
                    }`}>
                      <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Service Preview */}
          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-dark-800 border border-dark-700">
              {/* Preview Image */}
              <div className="absolute inset-0">
                <Image
                  src={activeServiceData.preview}
                  alt={activeServiceData.title}
                  fill
                  className="object-cover transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
              </div>

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`text-2xl bg-gradient-to-r ${activeServiceData.color} bg-clip-text text-transparent`}>
                    {activeServiceData.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {activeServiceData.title}
                  </h3>
                </div>
                <p className="text-gray-300 mb-6">
                  {activeServiceData.description}
                </p>
                <button className="inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  <span>Ver Proyectos</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r ${activeServiceData.color} rounded-full opacity-20 blur-xl transition-all duration-500`} />
            <div className={`absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r ${activeServiceData.color} rounded-full opacity-10 blur-lg transition-all duration-500`} />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-dark-800 border border-dark-700 rounded-2xl p-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">
                ¿Listo para comenzar tu proyecto?
              </h3>
              <p className="text-gray-400">
                Hablemos sobre cómo podemos ayudarte a alcanzar tus objetivos
              </p>
            </div>
            <button className="btn-primary whitespace-nowrap">
              Contactar Ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;