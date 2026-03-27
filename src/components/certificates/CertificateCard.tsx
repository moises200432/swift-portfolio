import { useState } from "react";
import { Certificate } from "@/data/certificates";

interface Props {
  cert: Certificate;
  index: number;
}

export default function CertificateCard({ cert, index }: Props) {
  const [showModal, setShowModal] = useState(false);

  const isConstancia = cert.type === "constancia";

  return (
    <>
      {/* CARD */}
      <div
        className="cert-card"
        style={{ animationDelay: `${index * 0.1}s` }}
        onClick={() => setShowModal(true)}
      >
        {/* Badge */}
        <span className={`cert-badge ${isConstancia ? "badge-constancia" : "badge-cert"}`}>
          {isConstancia ? "Constancia" : "Certificado"}
        </span>

        {/* Image preview */}
        <div className="cert-img-wrapper">
          <img src={cert.image} alt={cert.title} className="cert-img" />
          <div className="cert-img-overlay">
            <span>Ver documento</span>
          </div>
        </div>

        {/* Info */}
        <div className="cert-info">
          <p className="cert-institution">{cert.institution}</p>
          <h3 className="cert-title">{cert.title}</h3>
          <p className="cert-desc">{cert.description}</p>

          {cert.skills && (
            <div className="cert-skills">
              {cert.skills.map((s) => (
                <span key={s} className="cert-skill-tag">{s}</span>
              ))}
            </div>
          )}

          <p className="cert-date">📅 {cert.date}</p>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="cert-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={() => setShowModal(false)}>✕</button>
            <img src={cert.image} alt={cert.title} className="cert-modal-img" />
            <p className="cert-modal-caption">{cert.title} — {cert.institution}</p>
          </div>
        </div>
      )}
    </>
  );
}