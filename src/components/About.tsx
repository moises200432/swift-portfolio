import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Smartphone, Globe } from "lucide-react";

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

  return (
    <section id="about" className="relative" ref={ref}>
      <div className="section-container">
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

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Soy un desarrollador apasionado por crear experiencias digitales 
              que combinen diseño elegante con funcionalidad impecable. Con más 
              de 5 años de experiencia en desarrollo web y móvil, me especializo 
              en transformar ideas en productos que los usuarios aman.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Mi enfoque está en la calidad del código, la experiencia del usuario 
              y entregar resultados que superen las expectativas. Trabajo tanto 
              en frontend como en backend, lo que me permite entender proyectos 
              de principio a fin.
            </p>
            <p className="text-muted-foreground/70">
              Siempre estoy aprendiendo nuevas tecnologías y mejorando mis 
              habilidades para ofrecer las mejores soluciones.
            </p>
          </motion.div>

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
      </div>
    </section>
  );
};

export default About;
