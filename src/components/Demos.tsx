import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Camera, ExternalLink, MonitorPlay, RotateCcw } from "lucide-react";
import { projects } from "./Projects";

const demos = projects.filter((project) => project.webDemo);

const screenshotList = (demo) =>
  demo.screenshots ?? [{ src: demo.image, label: demo.title }];

const DemoCard = ({ demo, index }) => {
  const shots = screenshotList(demo);
  const [activeShot, setActiveShot] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hostname = new URL(demo.demo).hostname;
  const featured = shots.length > 1;

  const openLive = () => {
    setIsLive(true);
    setIsLoaded(false);
    setIframeError(false);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group flex flex-col min-w-0 ${featured ? "md:col-span-2" : ""}`}
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
          <a
            href={demo.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background/70 border border-border/50 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Vercel
          </a>
        </div>

        {/* Vista previa: captura o página en vivo */}
        <div className="relative aspect-[16/10] bg-muted overflow-hidden">
          {isLive ? (
            iframeError ? (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground p-6 text-center">
                <div className="text-4xl">🚫</div>
                <p className="text-sm">Este sitio no permite incrustarse en un iframe</p>
                <a
                  href={demo.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Abrir en pestaña nueva
                </a>
              </div>
            ) : (
              <>
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm text-muted-foreground text-sm">
                    Cargando la página en vivo…
                  </div>
                )}
                <iframe
                  src={demo.demo}
                  title={`Demo en vivo de ${demo.title}`}
                  className="w-full h-full border-0"
                  onLoad={() => setIsLoaded(true)}
                  onError={() => setIframeError(true)}
                  allow="fullscreen"
                />
                <button
                  onClick={() => setIsLive(false)}
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-medium hover:bg-black/80 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Volver a las capturas
                </button>
              </>
            )
          ) : (
            <button
              onClick={openLive}
              className={`w-full h-full relative block text-left cursor-pointer ${
                shots[activeShot].portrait ? "bg-gradient-to-br from-slate-900 via-slate-950 to-black" : ""
              }`}
              aria-label={`Ver ${demo.title} en vivo dentro del portafolio`}
            >
              <img
                src={shots[activeShot].src}
                alt={`${demo.title} · ${shots[activeShot].label}`}
                className={
                  shots[activeShot].portrait
                    ? "mx-auto h-full w-auto max-w-full object-contain py-6 drop-shadow-2xl"
                    : "w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                }
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={isHovered ? { scale: 1.06 } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-sm font-semibold shadow-xl"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500">
                    <MonitorPlay className="w-4 h-4 text-white" />
                  </span>
                  Ver la página en vivo aquí
                </motion.div>
              </div>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] text-white/90 border border-white/20">
                  <Camera className="w-3 h-3" />
                  Captura · {shots[activeShot].label}
                </span>
                <span className="hidden sm:inline px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] text-white/80 border border-white/20">
                  Se abre dentro del portafolio
                </span>
              </div>
            </button>
          )}
        </div>

        {/* Miniaturas de capturas */}
        {featured && (
          <div className="flex gap-3 p-4 bg-secondary/30 border-t border-border overflow-x-auto min-w-0">
            {shots.map((shot, i) => (
              <button
                key={shot.src}
                onClick={() => {
                  setActiveShot(i);
                  setIsLive(false);
                }}
                aria-label={`Ver captura ${shot.label}`}
                className={`relative flex-none w-28 sm:w-36 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  !isLive && activeShot === i
                    ? "border-primary shadow-lg shadow-primary/25"
                    : "border-border/60 opacity-70 hover:opacity-100 hover:border-border"
                }`}
              >
                <img
                  src={shot.src}
                  alt={shot.label}
                  className="w-full h-20 sm:h-24 object-cover object-top"
                  loading="lazy"
                />
                <span className="absolute bottom-0 inset-x-0 bg-black/65 backdrop-blur-sm text-[10px] text-white/90 py-1 text-center truncate px-1">
                  {shot.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Información */}
      <div className="pt-5 px-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-xl font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
            {demo.title}
          </h3>
          <motion.a
            href={demo.demo}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-accent text-foreground text-xs font-medium border border-border hover:border-primary/50 transition-all duration-300"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Abrir en Vercel
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
            Páginas publicadas en Vercel, con sus capturas y la opción de abrirlas en vivo sin salir del portafolio
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {demos.map((demo, index) => (
            <DemoCard key={demo.title} demo={demo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Demos;
