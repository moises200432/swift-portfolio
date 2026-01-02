import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase } from "lucide-react";

const timeline = [
  {
    year: "2023 - Presente",
    title: "Desarrollador Senior",
    institution: "Tech Solutions Inc.",
    description:
      "Liderazgo técnico en proyectos móviles y web. Arquitectura de aplicaciones y mentoría de desarrolladores junior.",
    type: "work",
  },
  {
    year: "2021 - 2023",
    title: "Desarrollador Full Stack",
    institution: "Digital Agency",
    description:
      "Desarrollo de aplicaciones web completas con React y Node.js. Implementación de APIs REST y bases de datos.",
    type: "work",
  },
  {
    year: "2020",
    title: "Certificación AWS",
    institution: "Amazon Web Services",
    description:
      "AWS Certified Developer Associate. Servicios cloud, Lambda, S3, DynamoDB y despliegue.",
    type: "education",
  },
  {
    year: "2017 - 2021",
    title: "Ingeniería en Sistemas",
    institution: "Universidad Tecnológica",
    description:
      "Licenciatura en Ingeniería de Software con especialización en desarrollo de aplicaciones.",
    type: "education",
  },
];

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Educación y Trayectoria</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Mi camino profesional y formación académica
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative grid md:grid-cols-2 gap-8 ${
                  index % 2 === 0 ? "" : "md:direction-rtl"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-primary rounded-full md:-translate-x-1/2 -translate-y-1/2 top-6 glow-effect" />

                <div
                  className={`glass-card p-6 ml-6 md:ml-0 hover-glow ${
                    index % 2 === 0 ? "md:text-right md:mr-12" : "md:order-2 md:ml-12"
                  }`}
                >
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-3">
                    {item.type === "work" ? (
                      <Briefcase className="w-3 h-3" />
                    ) : (
                      <GraduationCap className="w-3 h-3" />
                    )}
                    {item.year}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-primary/80 text-sm mb-3">{item.institution}</p>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>

                <div className={index % 2 === 0 ? "md:order-2" : ""} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
