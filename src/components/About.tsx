import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const About = () => {
  const { elementRef, isVisible } = useIntersectionObserver()

  const teamMembers = [
    {
      name: "Stephanía García",
      role: "Directora de Marketing", 
      description: "Especialista en estrategias digitales con más de 5 años de experiencia. Lidera campañas creativas que generan impacto y resultados medibles.",
      image: "/images/team/Stephanía-García-Directora-de-Marketing.jpg",
      linkedin: "https://www.linkedin.com/in/stephania-garcia-450b211b2/",
      instagram: "https://www.instagram.com/stephaniagarciar/",
      twitter: "https://twitter.com/stepgarciar"
    },
    {
      name: "Ángel Reyes", 
      role: "Director Creativo",
      description: "Fotógrafo y diseñador visual con un ojo único para capturar momentos auténticos. Transforma ideas en experiencias visuales memorables.",
      image: "/images/team/Ángel-Reyes-Director-Creativo.jpg",
      linkedin: "https://www.linkedin.com/in/%C3%A1ngel-reyes-1b72b2207/",
      instagram: "https://www.instagram.com/vektorphotos/",
      twitter: "https://twitter.com/vektorcreativo"
    },
    {
      name: "Ana García",
      role: "Community Manager", 
      description: "Experta en gestión de comunidades digitales y creación de contenido. Conecta marcas con audiencias a través de estrategias de comunicación efectivas.",
      image: "/images/team/Ana-García-Community-Manager.jpg",
      linkedin: "https://www.linkedin.com/in/ana-maria-garc%C3%ADa-romero-44200216a/", 
      instagram: "https://www.instagram.com/agarciaromeroo/"
    }
  ]

  return (
    <section 
      id="about"
      ref={elementRef}
      className="min-h-screen py-24 md:py-32 bg-bg-base-light dark:bg-bg-base-dark text-text-primary-light dark:text-text-primary-dark relative"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Our Team Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-8"
          >
            <span className="px-4 py-2 bg-color-primary/10 dark:bg-color-primary/20 text-color-primary text-sm font-medium rounded-full border border-color-primary/20 dark:border-color-primary/30">
              Nuestro Equipo
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl lg:text-6xl xl:text-7xl font-black mb-8 leading-tight font-display bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent"
          >
            Conócenos
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto"
          >
            Profesionales apasionados por crear experiencias digitales excepcionales.
          </motion.p>
        </motion.div>

        {/* Team Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Card Container - Image takes full space */}
              <div className="relative overflow-hidden rounded-3xl aspect-[3/4] shadow-2xl shadow-black/30 hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02]">
                {/* Background Image */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Default Content - Always Visible */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 transform group-hover:translate-y-[-10px] transition-transform duration-500">
                    {member.name}
                  </h3>
                  <div className="transform group-hover:translate-y-[-5px] transition-transform duration-500 delay-75">
                    <span className="px-3 py-1 bg-color-primary/90 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Hover Content - Description */}
                <div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0">
                  <div className="text-center max-w-xs">
                    <p className="text-sm leading-relaxed mb-6 backdrop-blur-sm bg-black/20 p-4 rounded-xl">
                      {member.description}
                    </p>
                    
                    {/* Social Icons */}
                    <div className="flex justify-center space-x-3">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-color-primary hover:scale-110 transition-all duration-300"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                      {member.instagram && (
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-color-primary hover:scale-110 transition-all duration-300"
                          aria-label={`${member.name} Instagram`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-color-primary hover:scale-110 transition-all duration-300"
                          aria-label={`${member.name} X (Twitter)`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
      </div>
    </section>
  )
}

export default About