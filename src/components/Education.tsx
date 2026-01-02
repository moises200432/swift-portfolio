import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, MapPin, Mail, Briefcase, ExternalLink } from "lucide-react";

const LinkedInProfile = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const linkedinUrl = "https://www.linkedin.com/in/moises-rojas-864b6a333/?trk=opento_sprofile_goalscard";

  return (
    <section id="linkedin" className="relative py-20" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Linkedin className="w-10 h-10 text-blue-600" />
            <h2 className="section-title">Mi Perfil Profesional</h2>
          </div>
          <p className="section-subtitle max-w-2xl mx-auto">
            Conéctate conmigo en LinkedIn para ver mi experiencia completa, proyectos y trayectoria profesional
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card overflow-hidden hover-glow"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Photo Section */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="relative h-full min-h-96 lg:min-h-full bg-transparent flex items-center justify-center overflow-hidden"
            >
              <motion.img
                src="assets/programar.png"
                alt="Moisés Rojas - Perfil LinkedIn"
                className="w-full h-full object-contain"
                initial={{ scale: 0.5, opacity: 0, y: 50 }}
                animate={isInView ? { 
                  scale: 1, 
                  opacity: 1,
                  y: 0,
                  x: [0, 30, -30, 20, -20, 0],
                  rotateZ: [0, 2, -2, 1, -1, 0]
                } : {}}
                transition={{ 
                  default: { duration: 0.8, delay: 0.4, ease: "easeOut" },
                  x: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  },
                  rotateZ: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }
                }}
              />
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-8 md:p-12 flex flex-col justify-between"
            >
              {/* Profile Header */}
              <div className="mb-8">
                <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  Moisés Rojas
                </h3>
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <Briefcase className="w-5 h-5" />
                  <p className="text-xl font-semibold">Desarrollador Full Stack</p>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Especialista en desarrollo web y móvil con tecnologías modernas. 
                  Comprometido con la calidad de código y la innovación tecnológica.
                </p>
              </div>

              {/* Location & Contact */}
              <div className="space-y-4 mb-10 pb-10 border-b border-white/10">
                <div className="flex items-center gap-3 text-muted-foreground group">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-foreground transition-colors">
                    Mocán, La Libertad • Perú
                  </span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground group">
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <a 
                    href="mailto:moises@example.com"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Contáctame
                  </a>
                </div>
              </div>

              {/* Skills Preview */}
              <div className="mb-10">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                  Habilidades clave
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "TypeScript", "Desarrollo Web", "Mobile"].map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                      className="px-4 py-2 rounded-full bg-blue-600/20 text-blue-400 text-sm font-medium border border-blue-600/30 hover:border-blue-600/60 hover:bg-blue-600/30 transition-all"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <motion.a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl w-full md:w-auto"
              >
                <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Ver Perfil en LinkedIn</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats or Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          <div className="glass-card p-6 text-center hover-glow">
            <p className="text-4xl font-bold text-blue-600 mb-2">500+</p>
            <p className="text-muted-foreground">Conexiones en LinkedIn</p>
          </div>
          <div className="glass-card p-6 text-center hover-glow">
            <p className="text-4xl font-bold text-blue-600 mb-2">+6</p>
            <p className="text-muted-foreground">Años de experiencia</p>
          </div>
          <div className="glass-card p-6 text-center hover-glow">
            <p className="text-4xl font-bold text-blue-600 mb-2">20+</p>
            <p className="text-muted-foreground">Proyectos completados</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LinkedInProfile;