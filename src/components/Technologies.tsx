import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const technologies = [
  { 
    name: "React", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Frontend"
  },
  { 
    name: "Flutter", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    category: "Mobile"
  },
  { 
    name: "Swift", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
    category: "Mobile"
  },
  { 
    name: "Node.js", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "Backend"
  },
  { 
    name: "TypeScript", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    category: "Language"
  },
  { 
    name: "MongoDB", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    category: "Database"
  },
  { 
    name: "MySQL", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    category: "Database"
  },
  { 
    name: "Figma", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    category: "Design"
  },
  { 
    name: "Git", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "Tools"
  },
  { 
    name: "Docker", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    category: "DevOps"
  },
  { 
    name: "AWS", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    category: "Cloud"
  },
  { 
    name: "Firebase", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    category: "Backend"
  },
];

const Technologies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Tecnologías</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Herramientas y tecnologías que utilizo
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-card p-4 flex flex-col items-center gap-3 hover-glow group"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-xs text-muted-foreground text-center">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
