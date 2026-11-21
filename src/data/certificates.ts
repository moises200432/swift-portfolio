export interface Certificate {
    id: number;
    type: "certificado" | "constancia";
    title: string;
    institution: string;
    date: string;
    description: string;
    skills?: string[];
    image: string;
    file?: string;
  }
  
  export const certificates: Certificate[] = [
    {
      id: 1,
      type: "constancia",
      title: "Constancia de Trabajo",
      institution: "TRAHESA S.A.C.",
      date: "Marzo 2026",
      description: "Prácticas profesionales en el área de informática, demostrando responsabilidad y eficiencia.",
      image: "/assets/constanciadetrabajo.png",
    },
    {
      id: 2,
      type: "certificado",
      title: "CODE 201 – Fundamentals Software Development",
      institution: "Enter Tech School",
      date: "Febrero 2025",
      description: "136 horas adquiriendo conocimientos en desarrollo de software.",
      skills: ["JavaScript", "HTML", "CSS", "Bootstrap", "jQuery", "Git", "JSON", "DOM"],
      image: "/assets/certificadoenter02.png",
    },
    {
      id: 3,
      type: "constancia",
      title: "Diseño y Desarrollo de Software",
      institution: "TECSUP – Filial Trujillo",
      date: "Marzo 2026",
      description: "Culminación del sexto ciclo de estudios del Programa de Formación Regular.",
      image: "/assets/constanciatecsup.png",
    },
    {
      id: 4,
      type: "certificado",
      title: "CODE 101 – Explorando el Desarrollo de Software",
      institution: "Enter Tech School",
      date: "Septiembre 2024",
      description: "Certificado de participación en el curso introductorio de desarrollo de software.",
      skills: ["HTML", "CSS"],
      image: "/assets/certificadoenter01.png",
    },
    {
      id: 5,
      type: "certificado",
      title: "Inglés General – Nivel Intermedio (B1)",
      institution: "Conversa Language School by Tecsup",
      date: "Septiembre 2025",
      description: "Certificado de culminación del nivel Intermedio (B1) con una duración de 240 horas.",
      image: "/assets/ingles.png",
    },
    {
      id: 6,
      type: "constancia",
      title: "Constancia de Egresado – Diseño y Desarrollo de Software",
      institution: "TECSUP N° 1 – Filial Trujillo",
      date: "Agosto 2026",
      description: "Acredita la culminación de seis ciclos de estudios y el egreso de la carrera de Diseño y Desarrollo de Software.",
      image: "/assets/constanciadeegresado.png",
    },
    {
      id: 7,
      type: "certificado",
      title: "IA Estratégica para Profesionales",
      institution: "Enter Tech School",
      date: "Octubre 2026",
      description: "Curso de 36 horas adquiriendo competencias esenciales en las principales herramientas de IA del mercado.",
      skills: ["Claude", "Gemini", "Perplexity", "Make", "v0", "OpenRouter", "GitHub"],
      image: "/assets/certificadoiaenter.png",
    },
    {
      id: 8,
      type: "certificado",
      title: "Marketing Digital",
      institution: "IDAT – Intercorp Formación Continua",
      date: "Noviembre 2026",
      description: "Certificado del curso Marketing Digital, desarrollado del 05 al 28 de octubre de 2026 con un total de 32 horas académicas.",
      skills: ["Marketing digital"],
      image: "/assets/certificado-marketing-digital-idat.jpg",
      file: "/assets/certificado-marketing-digital-idat.pdf",
    },
    {
      id: 9,
      type: "constancia",
      title: "Nota final – Marketing Digital",
      institution: "IDAT – EVA",
      date: "Octubre 2026",
      description: "Constancia del registro de la evaluación final del programa Marketing Digital, con una nota de 19.",
      image: "/assets/constancia-nota-marketing-digital-idat.jpg",
      file: "/assets/constancia-nota-marketing-digital-idat.pdf",
    },
  ]; 