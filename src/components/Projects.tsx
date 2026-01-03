import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Image as ImageIcon } from "lucide-react";

const projects = [
  {
    title: "E-Commerce App",
    description:
      "Aplicación móvil de comercio electrónico con carrito, pagos integrados y gestión de pedidos en tiempo real.",
    technologies: ["Flutter", "Firebase", "Stripe"],
    github: "#",
    demo: "#",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Task Manager Pro",
    description:
      "Herramienta de productividad para equipos con tableros Kanban, asignación de tareas y reportes.",
    technologies: ["React", "Node.js", "MongoDB"],
    github: "#",
    demo: "#",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Fitness Tracker",
    description:
      "App de seguimiento de ejercicios con estadísticas, rutinas personalizadas y sincronización con wearables.",
    technologies: ["Swift", "HealthKit", "CoreData"],
    github: "#",
    demo: "#",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Restaurant Dashboard",
    description:
      "Panel de administración para restaurantes con gestión de menús, pedidos y análisis de ventas.",
    technologies: ["React", "Express", "MySQL"],
    github: "#",
    demo: "#",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Social Media App",
    description:
      "Red social móvil con publicaciones, stories, mensajería en tiempo real y notificaciones push.",
    technologies: ["React Native", "GraphQL", "AWS"],
    github: "#",
    demo: "#",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    color: "from-indigo-500 to-purple-500"
  },
  {
    title: "Portfolio Generator",
    description:
      "Plataforma web para crear portafolios profesionales con plantillas personalizables.",
    technologies: ["Next.js", "Tailwind", "Prisma"],
    github: "#",
    demo: "#",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    color: "from-teal-500 to-blue-500"
  },
];

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    setIsHovered(false);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div
        ref={cardRef}
        className="relative bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 ease-out h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Imagen de fondo con overlay */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60 mix-blend-multiply`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Badge flotante animado */}
          <motion.div
            className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs text-white font-medium border border-white/30"
            animate={isHovered ? { y: -5, scale: 1.05 } : { y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            ✨ Featured
          </motion.div>
        </div>

        {/* Contenido */}
        <div className="p-6 relative" style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
            {project.title}
          </h3>
          
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tags de tecnologías con animación */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                className="px-3 py-1 text-xs rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-sm"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                transition={{ duration: 0.2 }}
                style={{ 
                  transform: isHovered ? `translateZ(${30 + i * 5}px)` : "translateZ(0px)",
                  transition: "transform 0.3s ease-out"
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Botones con efecto hover mejorado */}
          <div className="flex gap-3 pt-4 border-t border-white/10">
            <motion.a
              href={project.github}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all duration-300 border border-white/10 hover:border-white/30"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{ transform: "translateZ(40px)" }}
            >
              <Github className="w-4 h-4" />
              Código
            </motion.a>
            <motion.a
              href={project.demo}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/50"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{ transform: "translateZ(40px)" }}
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </motion.a>
          </div>
        </div>

        {/* Brillo animado en hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1), transparent 70%)",
          }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        />
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative min-h-screen py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900" ref={ref}>
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full text-sm text-blue-400 border border-blue-500/30">
              💼 Mi Trabajo
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100">
            Proyectos Destacados
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Una selección de proyectos en los que he trabajado, combinando diseño y funcionalidad
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;