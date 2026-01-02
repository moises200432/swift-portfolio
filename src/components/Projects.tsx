import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce App",
    description:
      "Aplicación móvil de comercio electrónico con carrito, pagos integrados y gestión de pedidos en tiempo real.",
    technologies: ["Flutter", "Firebase", "Stripe"],
    github: "#",
    demo: "#",
  },
  {
    title: "Task Manager Pro",
    description:
      "Herramienta de productividad para equipos con tableros Kanban, asignación de tareas y reportes.",
    technologies: ["React", "Node.js", "MongoDB"],
    github: "#",
    demo: "#",
  },
  {
    title: "Fitness Tracker",
    description:
      "App de seguimiento de ejercicios con estadísticas, rutinas personalizadas y sincronización con wearables.",
    technologies: ["Swift", "HealthKit", "CoreData"],
    github: "#",
    demo: "#",
  },
  {
    title: "Restaurant Dashboard",
    description:
      "Panel de administración para restaurantes con gestión de menús, pedidos y análisis de ventas.",
    technologies: ["React", "Express", "MySQL"],
    github: "#",
    demo: "#",
  },
  {
    title: "Social Media App",
    description:
      "Red social móvil con publicaciones, stories, mensajería en tiempo real y notificaciones push.",
    technologies: ["React Native", "GraphQL", "AWS"],
    github: "#",
    demo: "#",
  },
  {
    title: "Portfolio Generator",
    description:
      "Plataforma web para crear portafolios profesionales con plantillas personalizables.",
    technologies: ["Next.js", "Tailwind", "Prisma"],
    github: "#",
    demo: "#",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Proyectos</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Una selección de proyectos en los que he trabajado
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 hover-glow group"
            >
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Código
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
