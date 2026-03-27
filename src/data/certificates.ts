export interface Certificate {
    id: number;
    type: "certificado" | "constancia";
    title: string;
    institution: string;
    date: string;
    description: string;
    skills?: string[];
    image: string;
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
  ]; 