'use client';

import Image from 'next/image';

const About = () => {
  const values = [
    {
      icon: '🎯',
      title: 'Precisión',
      description: 'Cada detalle cuenta. Trabajamos con precisión milimétrica para entregar resultados excepcionales.'
    },
    {
      icon: '💡',
      title: 'Innovación',
      description: 'Constantemente exploramos nuevas técnicas y tecnologías para mantenernos a la vanguardia.'
    },
    {
      icon: '🤝',
      title: 'Colaboración',
      description: 'Creemos en el poder de la colaboración. Tu visión combinada con nuestra experiencia.'
    },
    {
      icon: '⚡',
      title: 'Eficiencia',
      description: 'Procesos optimizados que garantizan entregas puntuales sin comprometer la calidad.'
    }
  ];

  const stats = [
    { number: '50+', label: 'Proyectos Completados' },
    { number: '3+', label: 'Años de Experiencia' },
    { number: '100%', label: 'Clientes Satisfechos' },
    { number: '5', label: 'Servicios Especializados' }
  ];

  return (
    <section id="about" className="py-24 bg-dark-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-primary-400/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Sobre <span className="gradient-text">Zentella</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Somos una agencia creativa integral especializada en transformar ideas en experiencias visuales impactantes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-6">
              Transformamos visiones en realidades creativas
            </h3>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              En Zentella, combinamos creatividad, tecnología y estrategia para crear soluciones visuales 
              que no solo captan la atención, sino que generan conexiones emocionales duraderas con tu audiencia.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              Nuestro equipo multidisciplinario trabaja de forma colaborativa para garantizar que cada proyecto 
              refleje la esencia única de tu marca, manteniéndose siempre a la vanguardia de las tendencias 
              y tecnologías del diseño.
            </p>

            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-primary-500/20 to-transparent border-l-4 border-primary-500 p-6 rounded-r-lg">
              <h4 className="text-xl font-semibold text-white mb-2">Nuestra Misión</h4>
              <p className="text-gray-300">
                Empoderar a las marcas a través de soluciones creativas innovadoras que impulsen 
                su crecimiento y fortalezcan su presencia en el mercado.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <button className="btn-primary">
                Conoce Nuestro Proceso
              </button>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-dark-800">
                  <Image
                    src="/images/team/team-1.jpg"
                    alt="Equipo Zentella"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">3+</div>
                  <div className="text-primary-100 text-sm">Años de Experiencia</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-dark-800 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-primary-400 mb-2">50+</div>
                  <div className="text-gray-400 text-sm">Proyectos Completados</div>
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-dark-800">
                  <Image
                    src="/images/team/team-2.jpg"
                    alt="Trabajo en equipo"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>

            {/* Floating Element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full opacity-20 blur-xl float-animation" />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Nuestros Valores
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card text-center p-8 group hover:bg-primary-500/10">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors">
                  {value.title}
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-dark-800 to-dark-700 rounded-3xl p-8 md:p-12 border border-dark-600">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Resultados que Hablan por Sí Solos
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;