'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  video?: string;
  client: string;
  year: number;
  tags: string[];
}

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'Todos', icon: '🎯' },
    { id: 'marketing', label: 'Marketing', icon: '📈' },
    { id: 'photography', label: 'Fotografía', icon: '📸' },
    { id: 'design', label: 'Diseño', icon: '🎨' },
    { id: 'video', label: 'Video', icon: '🎬' },
    { id: 'animation', label: 'Animación', icon: '✨' },
  ];

  useEffect(() => {
    // Portfolio real de Zentella
    const realPortfolio: PortfolioItem[] = [
      // FOTOGRAFÍA
      {
        id: 1,
        title: 'AJF Panadería - Fotografía de Producto',
        category: 'photography',
        description: 'Fotografía especializada de productos de panadería artesanal, destacando la calidad y frescura de cada producto',
        image: '/images/portfolio/photography/ajf-panaderia/ajf-panaderia-1.jpg',
        client: 'AJF Panadería',
        year: 2024,
        tags: ['Producto', 'Food Photography', 'Artesanal', 'Comercial']
      },
      {
        id: 2,
        title: 'El Cayuco Restaurante - Fotografía Gastronómica',
        category: 'photography',
        description: 'Sesión fotográfica completa para restaurante, capturando la esencia culinaria y ambiente único',
        image: '/images/portfolio/photography/el-cayuco/el-cayuco-1.jpg',
        client: 'El Cayuco Restaurante',
        year: 2024,
        tags: ['Gastronomía', 'Ambiente', 'Restaurante', 'Lifestyle']
      },
      {
        id: 3,
        title: 'Esvi Hair Studio - Fotografía de Servicios',
        category: 'photography',
        description: 'Fotografía profesional de servicios de belleza, mostrando técnicas y resultados de alta calidad',
        image: '/images/portfolio/photography/esvi-hair-studio/esvi-hair-studio-1.jpg',
        client: 'Esvi Hair Studio',
        year: 2024,
        tags: ['Belleza', 'Servicios', 'Profesional', 'Lifestyle']
      },
      {
        id: 4,
        title: 'Revel Bar & Kitchen - Fotografía Gastronómica',
        category: 'photography',
        description: 'Sesión fotográfica profesional para restaurante de alta cocina, destacando presentación y calidad',
        image: '/images/portfolio/photography/revel-bar/revel-bar-1.jpg',
        client: 'Revel Bar & Kitchen',
        year: 2024,
        tags: ['Gastronomía', 'Alta Cocina', 'Comercial', 'Premium']
      },
      {
        id: 5,
        title: 'Widook Optic - Fotografía de Producto',
        category: 'photography',
        description: 'Fotografía comercial de productos ópticos, resaltando diseño y funcionalidad de monturas',
        image: '/images/portfolio/photography/widook-optic/widook-optic-1.jpg',
        client: 'Widook Optic',
        year: 2024,
        tags: ['Producto', 'Óptica', 'Comercial', 'Diseño']
      },

      // IDENTIDAD VISUAL & BRANDING
      {
        id: 6,
        title: 'Better Health Nevada - Identidad Corporativa',
        category: 'design',
        description: 'Desarrollo completo de identidad visual para centro de salud, transmitiendo confianza y profesionalismo',
        image: '/images/portfolio/branding/better-health-nevada/better-health-nevada-1.jpg',
        client: 'Better Health Nevada',
        year: 2024,
        tags: ['Branding', 'Healthcare', 'Identidad Visual', 'Corporativo']
      },
      {
        id: 7,
        title: 'Kaccao Kitchen - Desarrollo de Marca',
        category: 'design',
        description: 'Creación de identidad visual completa para cocina gourmet, enfocada en calidad y sofisticación',
        image: '/images/portfolio/branding/kaccao-kitchen/kaccao-kitchen-1.jpg',
        client: 'Kaccao Kitchen',
        year: 2024,
        tags: ['Branding', 'Gourmet', 'Logo Design', 'Gastronomía']
      },
      {
        id: 8,
        title: 'Nevada Care Pharmacy - Identidad Corporativa',
        category: 'design',
        description: 'Desarrollo completo de identidad visual para farmacia especializada, enfocada en cuidado y confianza',
        image: '/images/portfolio/branding/nevada-care-pharmacy/nevada-care-pharmacy-1.jpg',
        client: 'Nevada Care Pharmacy',
        year: 2024,
        tags: ['Branding', 'Healthcare', 'Farmacia', 'Corporativo']
      },
      {
        id: 9,
        title: 'Palo Studio - Desarrollo de Marca',
        category: 'design',
        description: 'Creación de identidad visual completa para estudio creativo, reflejando innovación y profesionalismo',
        image: '/images/portfolio/branding/palo-studio/palo-studio-1.png',
        client: 'Palo Studio',
        year: 2023,
        tags: ['Branding', 'Creative Studio', 'Logo Design', 'Innovación']
      },

      // ANIMACIÓN
      {
        id: 10,
        title: 'Chavalines RP - Animación 3D Logo',
        category: 'animation',
        description: 'Animación 3D profesional para entrada de logo corporativo, creando impacto visual memorable',
        image: '/images/portfolio/animation/chavalines-rp/chavalines-rp-3d-logo-entrada.gif',
        client: 'Chavalines RP',
        year: 2024,
        tags: ['3D Animation', 'Logo Animation', 'Corporate', 'Motion Graphics']
      },
      {
        id: 11,
        title: 'Nevada Care Pharmacy - Animación Vertical',
        category: 'animation',
        description: 'Animación promocional vertical para redes sociales, optimizada para engagement móvil',
        image: '/images/portfolio/animation/chavalines-rp/chavalines-rp-3d-visual-logo.gif',
        video: '/videos/portfolio/animation/nevada-care-pharmacy-animation.mp4',
        client: 'Nevada Care Pharmacy',
        year: 2024,
        tags: ['Motion Graphics', 'Social Media', 'Healthcare', 'Vertical Video']
      },

      // VIDEOGRAFÍA
      {
        id: 12,
        title: 'Ambiente Chic - Grand Opening',
        category: 'video',
        description: 'Producción audiovisual completa para evento de inauguración, capturando la elegancia del momento',
        image: '/images/services/video-preview.jpg',
        video: '/videos/portfolio/videography/ambiente-chic-grand-opening.mp4',
        client: 'Ambiente Chic',
        year: 2024,
        tags: ['Evento', 'Grand Opening', 'Producción', 'Corporativo']
      }
    ];
    
    setPortfolioItems(realPortfolio);
  }, []);

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="portfolio" className="py-24 bg-dark-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary-400/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Nuestro <span className="gradient-text">Portafolio</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Algunos de nuestros trabajos más destacados que demuestran nuestra experiencia y creatividad
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              className={`group inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-dark-800 text-gray-400 hover:bg-dark-700 hover:text-white border border-dark-700 hover:border-primary-500/50'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.label}</span>
              {selectedCategory === category.id && (
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                  {category.id === 'all' ? portfolioItems.length : filteredItems.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="group cursor-pointer"
              onClick={() => openModal(item)}
            >
              <div className="card card-hover overflow-hidden">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center space-x-1 bg-primary-500/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                      <span>{categories.find(cat => cat.id === item.category)?.icon}</span>
                      <span className="capitalize">{item.category}</span>
                    </span>
                  </div>

                  {/* Play Button for Videos */}
                  {item.video && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Hover Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-400 text-sm font-medium">
                        {item.client}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {item.year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{item.client}</span>
                    <span>{item.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredItems.length > 9 && (
          <div className="text-center mt-12">
            <button className="btn-secondary">
              Ver Más Proyectos
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className="relative bg-dark-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-dark-700">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-dark-900/80 backdrop-blur-sm hover:bg-primary-500 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Media */}
            <div className="relative aspect-video rounded-t-2xl overflow-hidden">
              {selectedItem.video ? (
                <video 
                  controls 
                  autoPlay 
                  muted
                  className="w-full h-full object-cover"
                >
                  <source src={selectedItem.video} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              )}
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-primary-500 text-white text-sm font-medium px-3 py-1 rounded-full capitalize">
                  {selectedItem.category}
                </span>
                <span className="text-gray-400 text-sm">
                  {selectedItem.year}
                </span>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">
                {selectedItem.title}
              </h3>

              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {selectedItem.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">Cliente</h4>
                  <p className="text-gray-400">{selectedItem.client}</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Año</h4>
                  <p className="text-gray-400">{selectedItem.year}</p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-dark-700 text-gray-300 text-sm px-3 py-1 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;