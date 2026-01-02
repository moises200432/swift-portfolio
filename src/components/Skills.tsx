import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  MessageSquare, 
  Target, 
  Sparkles, 
  RefreshCw,
  Users,
  Lightbulb
} from "lucide-react";

const technicalSkills = [
  { name: "React / React Native", level: 95 },
  { name: "Flutter / Dart", level: 90 },
  { name: "Swift / iOS", level: 85 },
  { name: "Node.js / Express", level: 88 },
  { name: "TypeScript", level: 92 },
  { name: "MongoDB / MySQL", level: 85 },
];

const softSkills = [
  { 
    icon: MessageSquare, 
    name: "Comunicación", 
    description: "Clara y efectiva con equipos y clientes" 
  },
  { 
    icon: Target, 
    name: "Enfoque en resultados", 
    description: "Orientado a cumplir objetivos de negocio" 
  },
  { 
    icon: Sparkles, 
    name: "Calidad", 
    description: "Compromiso con código limpio y buenas prácticas" 
  },
  { 
    icon: RefreshCw, 
    name: "Adaptabilidad", 
    description: "Flexible ante cambios y nuevas tecnologías" 
  },
  { 
    icon: Users, 
    name: "Trabajo en equipo", 
    description: "Colaboración efectiva y mentoría" 
  },
  { 
    icon: Lightbulb, 
    name: "Resolución de problemas", 
    description: "Análisis y soluciones creativas" 
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Habilidades</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Competencias técnicas y habilidades blandas
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Habilidades Técnicas
            </h3>
            <div className="space-y-5">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-foreground">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-primary to-glow-secondary rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Habilidades Blandas
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="glass-card p-4 hover-glow"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <skill.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm mb-1">
                        {skill.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
