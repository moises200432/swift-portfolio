import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Smartphone, Globe, CheckCircle2 } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Smartphone,
      title: "Apps Móviles",
      description: "Flutter, Swift y React Native para iOS y Android",
    },
    {
      icon: Globe,
      title: "Desarrollo Web",
      description: "React, Node.js y arquitecturas modernas",
    },
    {
      icon: Code2,
      title: "Código Limpio",
      description: "Buenas prácticas y documentación clara",
    },
  ];

  const services = [
    "Desarrollo aplicaciones móviles rápidas y funcionales (Android / iOS)",
    "Creo páginas web modernas que generan confianza y ventas",
    "Diseño interfaces claras, intuitivas y fáciles de usar",
    "Acompaño tu proyecto desde la idea hasta su lanzamiento",
  ];

  const results = [
    "Aplicaciones web completas listas para producción",
    "Sistemas optimizados y escalables",
    "Integración de bases de datos seguras",
    "Experiencia de usuario fluida y profesional",
    "Proyectos entregados a tiempo y con comunicación constante",
  ];

  return (
    <section id="about" className="relative" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Sobre mí</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Conóceme un poco más
          </p>
        </motion.div>

        {/* Sección principal - Descripción + Features */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Texto descriptivo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted-foreground/70">
              Siempre estoy aprendiendo nuevas tecnologías y mejorando mis
              habilidades para ofrecer las mejores soluciones.
            </p>
          </motion.div>

          {/* Features con iconos */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="glass-card p-6 hover-glow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Sección de servicios y resultados */}
        <div className="space-y-16">
          {/* ¿Cómo puedo ayudarte? */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">
              ¿Cómo puedo ayudarte?
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="glass-card p-4 flex items-start gap-3 hover-glow"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">{service}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Resultados que entrego */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">
              Resultados que entrego
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="glass-card p-4 flex items-start gap-3 hover-glow"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">{result}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;