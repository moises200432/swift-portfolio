import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre mí", href: "#about" },
  { label: "Proyectos", href: "#projects" },
  { label: "Educación", href: "#education" },
  { label: "Habilidades", href: "#skills" },
  { label: "Contacto", href: "#contact" },
];

const searchSections = [
  { label: "Inicio", href: "#hero", keywords: ["inicio", "hero", "home"] },
  { label: "Sobre mí", href: "#about", keywords: ["sobre", "mí", "about", "perfil", "biografía"] },
  { label: "Proyectos", href: "#projects", keywords: ["proyecto", "proyectos", "work", "portfolio"] },
  { label: "Educación", href: "#education", keywords: ["educación", "educacion", "estudio", "formación"] },
  { label: "Habilidades", href: "#skills", keywords: ["habilidad", "habilidades", "skills", "tecnologías"] },
  { label: "Contacto", href: "#contact", keywords: ["contacto", "contact", "email", "comunicación"] },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = searchSections.filter((section) =>
      section.keywords.some((keyword) => keyword.includes(query) || query.includes(keyword))
    );

    setSearchResults(results);
  }, [searchQuery]);

  const handleSelectResult = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const handleSearch = () => {
    if (searchResults.length > 0) {
      handleSelectResult(searchResults[0].href);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-card py-3" : "py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo más grande */}
        <a href="#hero" className="flex items-center gap-2">
          <img
            src="/assets/logo.png"
            alt="Logo Portfolio"
            className="h-12 w-12 object-contain hover:scale-110 transition-transform"
          />
        </a>

        {/* Navigation Items */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Search and Contact */}
        <div className="flex items-center gap-4">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Buscar"
          >
            {isSearchOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>

          {/* Contact Button */}
          <a
            href="#contact"
            className="hidden md:inline-flex px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Contactar
          </a>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="border-t border-border/50 mt-3 pt-3"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar en el portfolio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                autoFocus
              />
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-10"
                >
                  {searchResults.map((result) => (
                    <button
                      key={result.href}
                      onClick={() => handleSelectResult(result.href)}
                      className="w-full px-4 py-3 text-left text-foreground hover:bg-primary/10 transition-colors flex items-center gap-3 border-b border-border/50 last:border-b-0"
                    >
                      <Search className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm font-medium">{result.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}

              {/* No results message */}
              {searchQuery.trim() !== "" && searchResults.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg p-4 z-10"
                >
                  <p className="text-sm text-muted-foreground text-center">
                    No se encontraron resultados para "{searchQuery}"
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;