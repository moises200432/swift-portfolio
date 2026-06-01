import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Search, X, Sun, Moon, Command, ExternalLink } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre mí", href: "#about" },
  { label: "Proyectos", href: "#projects" },
  { label: "Educación", href: "#education" },
  { label: "Habilidades", href: "#skills" },
  { label: "Contacto", href: "#contact" },
];

const searchSections = [
  { label: "Inicio", href: "#hero", keywords: ["inicio", "hero", "home"], icon: "🏠" },
  { label: "Sobre mí", href: "#about", keywords: ["sobre", "mí", "about", "perfil", "biografía"], icon: "👤" },
  { label: "Proyectos", href: "#projects", keywords: ["proyecto", "proyectos", "work", "portfolio"], icon: "💼" },
  { label: "Educación", href: "#education", keywords: ["educación", "educacion", "estudio", "formación"], icon: "🎓" },
  { label: "Habilidades", href: "#skills", keywords: ["habilidad", "habilidades", "skills", "tecnologías"], icon: "⚡" },
  { label: "Contacto", href: "#contact", keywords: ["contacto", "contact", "email", "comunicación"], icon: "✉️" },
];

const projects = [
  {
    id: "ecommerce",
    title: "E-Commerce App",
    description: "Una aplicación móvil de comercio electrónico desarrollada con Flutter. Incluye funcionalidades de navegación de productos, carrito de compras y una interfaz de usuario moderna.",
    technologies: ["Flutter", "Dart"],
    github: "https://github.com/Ameri50/proyectofinal1",
    demo: "https://github.com/Ameri50/proyectofinal1",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "taskmanager",
    title: "Task Manager App",
    description: "Aplicación de gestión de tareas que permite a los usuarios organizar sus pendientes. Desarrollada como una de las primeras aplicaciones interactivas utilizando React.",
    technologies: ["React", "JavaScript", "CSS3"],
    github: "https://github.com/Ameri50/primera-aplicaciond-de-10",
    demo: "https://micodigo.onrender.com/",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "logistics",
    title: "Peru Logistics Express",
    description: "Plataforma logística diseñada para el seguimiento y gestión de envíos en Perú. Optimiza la visualización de rutas y estados de entrega para operadores.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/Ameri50/peru-logistics-express",
    demo: "https://peru-logistics-express-lima06.onrender.com/",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "dashboard",
    title: "Mi Código Dashboard",
    description: "Panel de administración y gestión de datos. Enfocado en la visualización estructurada de información y control de usuarios para aplicaciones web.",
    technologies: ["JavaScript", "HTML5", "Tailwind CSS"],
    github: "https://github.com/DukoMaster2004/micodigo",
    demo: "https://micodigo.onrender.com/",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "hackathon",
    title: "Proyecto Hackathon",
    description: "Proyecto web desarrollado para un hackathon, construido con HTML, CSS y JavaScript vanilla. Presenta una interfaz moderna con múltiples iteraciones de mejora y 19 deployments en producción vía Vercel.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/Ameri50/proyecto-hackathon",
    demo: "https://proyecto-hackathon-x7kz.vercel.app",
    color: "from-yellow-500 to-orange-500",
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [navResults, setNavResults] = useState(searchSections);
  const [projectResults, setProjectResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeNav, setActiveNav] = useState("#hero");
  const inputRef = useRef(null);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) { root.classList.add("dark"); localStorage.setItem("theme", "dark"); }
    else { root.classList.remove("dark"); localStorage.setItem("theme", "light"); }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setIsSearchOpen((p) => !p); }
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isSearchOpen) setTimeout(() => inputRef.current?.focus(), 100);
    else { setSearchQuery(""); setNavResults(searchSections); setProjectResults([]); }
  }, [isSearchOpen]);

  // Búsqueda global: secciones + proyectos por cualquier palabra
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();

    if (!q) {
      setNavResults(searchSections);
      setProjectResults([]);
      setActiveIndex(0);
      return;
    }

    // Secciones nav
    const filteredNav = searchSections.filter((s) =>
      s.label.toLowerCase().includes(q) ||
      s.keywords.some((k) => k.includes(q) || q.includes(k))
    );

    // Proyectos: busca en título, descripción Y cada tecnología
    const filteredProjects = projects.filter((p) => {
      const haystack = [
        p.title,
        p.description,
        ...p.technologies,
      ].join(" ").toLowerCase();
      return haystack.includes(q);
    });

    setNavResults(filteredNav);
    setProjectResults(filteredProjects);
    setActiveIndex(0);
  }, [searchQuery]);

  const allResults = [
    ...navResults.map((r) => ({ ...r, _type: "nav" })),
    ...projectResults.map((r) => ({ ...r, _type: "project", href: "#projects" })),
  ];

  const handleSelect = (item) => {
    const el = document.querySelector(item.href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveNav(item.href);
    setIsSearchOpen(false);
  };

  const handleKeyNav = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, allResults.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && allResults[activeIndex]) handleSelect(allResults[activeIndex]);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/80 backdrop-blur-2xl border-b border-border/40 shadow-lg shadow-black/5 py-3" : "py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a href="#hero" className="flex items-center gap-2 group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <img
              src="/assets/logo.png"
              alt="Logo Portfolio"
              className="h-10 w-10 object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.8)]"
            />
          </motion.a>

          {/* Nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setActiveNav(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                    ${activeNav === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {activeNav === item.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-lg"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Search trigger */}
            <motion.button
              onClick={() => setIsSearchOpen(true)}
              className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/60 hover:bg-secondary border border-border/50 hover:border-border text-muted-foreground hover:text-foreground transition-all duration-200 text-sm"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">Buscar</span>
              <span className="hidden sm:flex items-center gap-0.5 ml-1 px-1.5 py-0.5 rounded-md bg-background/80 border border-border/50 text-[10px] font-mono text-muted-foreground/70">
                <Command className="w-2.5 h-2.5" />K
              </span>
            </motion.button>

            {/* Dark/light toggle */}
            <motion.button
              onClick={() => setIsDark(!isDark)}
              aria-label="Cambiar modo"
              className="relative p-2.5 rounded-xl border border-border/50 hover:border-border bg-secondary/60 hover:bg-secondary transition-all duration-200 overflow-hidden"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div key="sun" initial={{ rotate: -90, scale: 0, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} exit={{ rotate: 90, scale: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeOut" }}>
                    <Sun className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, scale: 0, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} exit={{ rotate: -90, scale: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeOut" }}>
                    <Moon className="w-4 h-4 text-slate-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Contact */}
            <motion.a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:brightness-110"
              whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.96 }}
            >
              Contactar
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={() => setIsSearchOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[12%] left-1/2 -translate-x-1/2 z-[70] w-full max-w-lg px-4"
            >
              <div className="bg-background/95 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl shadow-black/30 overflow-hidden">

                {/* Input */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/60">
                  <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Buscar sección, proyecto, tecnología..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyNav}
                    className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none"
                  />
                  <div className="flex items-center gap-2">
                    {searchQuery && (
                      <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={() => setSearchQuery("")}
                        className="p-1 rounded-md hover:bg-secondary text-muted-foreground transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </motion.button>
                    )}
                    <kbd className="px-2 py-1 rounded-lg bg-secondary border border-border text-[10px] font-mono text-muted-foreground">ESC</kbd>
                  </div>
                </div>

                {/* Results */}
                <div className="p-2 max-h-80 overflow-y-auto">

                  {/* Nav sections */}
                  {navResults.length > 0 && (
                    <div className="mb-2">
                      <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                        {searchQuery ? "Secciones" : "Navegar a"}
                      </p>
                      {navResults.map((result, i) => {
                        const gi = i;
                        return (
                          <motion.button
                            key={result.href}
                            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                            onClick={() => handleSelect({ ...result, _type: "nav" })}
                            onMouseEnter={() => setActiveIndex(gi)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${
                              activeIndex === gi ? "bg-primary/10 border border-primary/20" : "hover:bg-secondary/70 border border-transparent"
                            }`}
                          >
                            <span className="text-lg leading-none">{result.icon}</span>
                            <span className={`text-sm font-medium flex-1 ${activeIndex === gi ? "text-primary" : "text-foreground"}`}>
                              {result.label}
                            </span>
                            {activeIndex === gi && <span className="text-[10px] text-primary/70 font-mono">↵</span>}
                          </motion.button>
                        );
                      })}
                    </div>
                  )}

                  {/* Project results */}
                  {projectResults.length > 0 && (
                    <div>
                      <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                        Proyectos encontrados
                      </p>
                      {projectResults.map((project, i) => {
                        const gi = navResults.length + i;
                        return (
                          <motion.button
                            key={project.id}
                            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                            onClick={() => handleSelect({ ...project, _type: "project", href: "#projects" })}
                            onMouseEnter={() => setActiveIndex(gi)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${
                              activeIndex === gi ? "bg-primary/10 border border-primary/20" : "hover:bg-secondary/70 border border-transparent"
                            }`}
                          >
                            {/* Color avatar */}
                            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${project.color} flex-shrink-0 flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
                              {project.title.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium truncate ${activeIndex === gi ? "text-primary" : "text-foreground"}`}>
                                {project.title}
                              </p>
                              <p className="text-[11px] text-muted-foreground truncate">
                                {project.technologies.join(" · ")}
                              </p>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 flex-shrink-0" />
                          </motion.button>
                        );
                      })}
                    </div>
                  )}

                  {/* No results */}
                  {allResults.length === 0 && searchQuery && (
                    <div className="py-10 text-center">
                      <p className="text-2xl mb-2">🔍</p>
                      <p className="text-sm text-muted-foreground">
                        Sin resultados para <span className="text-foreground font-medium">"{searchQuery}"</span>
                      </p>
                      <p className="text-xs text-muted-foreground/50 mt-1">
                        Prueba con tecnología, nombre o descripción
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-2.5 border-t border-border/60 flex items-center gap-4 text-[10px] text-muted-foreground/50 font-mono">
                  <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border">↑↓</kbd> navegar</span>
                  <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border">↵</kbd> ir</span>
                  <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border">ESC</kbd> cerrar</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;