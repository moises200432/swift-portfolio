import { certificates } from "@/data/certificates";
import CertificateCard from "./CertificateCard";
import "./certificates.css";

export default function CertificatesSection() {
  return (
    <section className="certs-section" id="certificados">
      {/* Header */}
      <div className="certs-header">
        <span className="certs-eyebrow">Formación & Logros</span>
        <h2 className="certs-title">
          Certificados &amp; <br />
          <span className="certs-title-accent">Constancias</span>
        </h2>
        <p className="certs-subtitle">
          Documentos que respaldan mi formación técnica y experiencia profesional.
        </p>
      </div>

      {/* Grid */}
      <div className="certs-grid">
        {certificates.map((cert, i) => (
          <CertificateCard key={cert.id} cert={cert} index={i} />
        ))}
      </div>
    </section>
  );
}