import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const About = () => {
  const { elementRef, isVisible } = useIntersectionObserver()

  const teamMembers = [
    {
      name: "Stephanía García",
      role: "Directora de Marketing", 
      image: "/images/team/Stephanía-García-Directora-de-Marketing.jpg",
      linkedin: "https://www.linkedin.com/in/stephania-garcia-450b211b2/",
      instagram: "https://www.instagram.com/stephaniagarciar/",
      twitter: "https://twitter.com/stepgarciar"
    },
    {
      name: "Ángel Reyes", 
      role: "Director Creativo",
      image: "/images/team/Ángel-Reyes-Director-Creativo.jpg",
      linkedin: "https://www.linkedin.com/in/%C3%A1ngel-reyes-1b72b2207/",
      instagram: "https://www.instagram.com/vektorphotos/",
      twitter: "https://twitter.com/vektorcreativo"
    },
    {
      name: "Ana García",
      role: "Community Manager", 
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
            Conoce a los creadores
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
              className="group"
            >
              {/* Card Container */}
              <div className="p-8 md:p-12 rounded-3xl bg-bg-secondary-light dark:bg-bg-secondary-dark border border-gray-200/30 dark:border-gray-800/30 shadow-2xl shadow-black/30 hover:shadow-3xl transition-all duration-300">
                {/* Image Container */}
                <div className="relative overflow-hidden h-80 rounded-2xl mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Social Icons */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        className="w-9 h-9 bg-color-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-color-primary transition-all duration-300 hover:scale-110"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    {member.instagram && (
                      <a
                        href={member.instagram}
                        className="w-9 h-9 bg-color-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-color-primary transition-all duration-300 hover:scale-110"
                        aria-label={`${member.name} Instagram`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        className="w-9 h-9 bg-color-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-color-primary transition-all duration-300 hover:scale-110"
                        aria-label={`${member.name} X (Twitter)`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2 group-hover:text-color-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  <div className="inline-block">
                    <span className="px-4 py-2 bg-color-primary/10 dark:bg-color-primary/20 text-color-primary text-sm font-medium rounded-full border border-color-primary/20 dark:border-color-primary/30">
                      {member.role}
                    </span>
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