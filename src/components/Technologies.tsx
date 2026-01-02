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
  { 
    name: "Supabase", 
    icon: "data:image/jpeg;base64,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",
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
