import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Play, RotateCcw } from "lucide-react";

const webDemos = [
  {
    title: "Peru Logistics Express",
    description:
      "Plataforma logística para el seguimiento y gestión de envíos en Perú, con visualización de rutas y estados de entrega.",
    url: "https://peru-logistics-express-lima06.onrender.com/",
    image: "/assets/proyecto3.png",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Task Manager App",
    description:
      "Aplicación de gestión de tareas para organizar pendientes, desarrollada con React como una de las primeras apps interactivas.",
    url: "https://micodigo.onrender.com/",
    image: "/assets/proyecto2.png",
    technologies: ["React", "JavaScript", "CSS3"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Mi Código Dashboard",
    description:
      "Panel de administración y gestión de datos con visualización estructurada de información y control de usuarios.",
    url: "https://micodigo.onrender.com/",
    image: "/assets/proyecto4.png",
    technologies: ["JavaScript", "HTML5", "Tailwind CSS"],
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Proyecto Hackathon",
    description:
      "Proyecto web para un hackathon con HTML, CSS y JavaScript vanilla, con múltiples iteraciones y 19 deployments en Vercel.",
    url: "https://proyecto-hackathon-x7kz.vercel.app",
    image: "/assets/HACKATON.png",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    color: "from-yellow-500 to-orange-500"
  }
];

const DemoCard = ({ demo, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hostname = new URL(demo.url).hostname;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ventana de navegador */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="relative bg-card/60 backdrop-blur-lg rounded-2xl overflow-hidden border border-border shadow-lg shadow-black/5"
      >
        {/* Barra del navegador */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-secondary/60 border-b border-border">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded-md bg-background/70 border border-border/50 text-[11px] text-muted-foreground truncate">
            <span className="text-emerald-500">🔒</span>
            <span className="truncate">{hostname}</span>
          </div>
        </div>

        {/* Vista previa / iframe */}
        <div className="relative aspect-[16/10] bg-muted overflow-hidden">
          {!isLoaded ? (
            <button
              onClick={() => setIsLoaded(true)}
              className="w-full h-full relative block text-left cursor-pointer"
              aria-label={`Cargar demo en vivo de ${demo.title}`}
            >
              <img
                src={demo.image}
                alt={demo.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Botón play */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-sm font-semibold shadow-xl"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                    <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                  </span>
                  Ver demo en vivo
                </motion.div>
              </div>

              <div className="absolute bottom-3 left-4 right-4">
                <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] text-white/90 border border-white/20">
                  ▶ Click para cargar la vista previa
                </span>
              </div>
            </button>
          ) : iframeError ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground p-6 text-center">
              <div className="text-4xl">🚫</div>
              <p className="text-sm">Este sitio no permite incrustarse en un iframe</p>
              <a
                href={demo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Abrir demo en pestaña nueva
              </a>
            </div>
          ) : (
            <>
              <iframe
                src={demo.url}
                title={`Demo en vivo de ${demo.title}`}
                className="w-full h-full border-0"
                loading="lazy"
                onError={() => setIframeError(true)}
                allow="fullscreen"
              />
              <button
                onClick={() => setIsLoaded(false)}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-medium hover:bg-black/80 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reiniciar
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Información */}
      <div className="pt-5 px-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-xl font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
            {demo.title}
          </h3>
          <motion.a
            href={demo.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-accent text-foreground text-xs font-medium border border-border hover:border-primary/50 transition-all duration-300"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Abrir
          </motion.a>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {demo.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {demo.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full bg-secondary text-foreground border border-border"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

const Demos = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="demos" className="relative py-20 bg-background" ref={ref}>
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
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
            <span className="px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-sm text-primary border border-primary/30">
              🚀 Demos en vivo
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary/80 to-purple-500">
            Demo
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explora las aplicaciones web funcionando en tiempo real, directamente desde el navegador
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {webDemos.map((demo, index) => (
            <DemoCard key={demo.title} demo={demo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Demos;
