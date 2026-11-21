import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Maximize2,
  Minimize2,
  RefreshCw,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Certificate } from "@/data/certificates";

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

interface Props {
  certificates: Certificate[];
}

export default function CertificateQuickView({ certificates }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  const count = certificates.length;
  const cert = certificates[activeIndex];

  useEffect(() => {
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
    setIsDragging(false);
    dragRef.current = null;
  }, [activeIndex]);

  useEffect(() => {
    if (!isExpanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsExpanded(false);
      if (event.key === "ArrowRight") setActiveIndex((i) => (i + 1) % count);
      if (event.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + count) % count);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isExpanded, count]);

  if (!cert) return null;

  const goTo = (index: number) => setActiveIndex((index + count) % count);

  const changeZoom = (delta: number) => {
    setZoom((current) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number((current + delta).toFixed(2)))));
  };

  const resetView = () => {
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, ox: offset.x, oy: offset.y };
    setIsDragging(true);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    setOffset({
      x: dragRef.current.ox + event.clientX - dragRef.current.x,
      y: dragRef.current.oy + event.clientY - dragRef.current.y,
    });
  };

  const endDrag = () => {
    dragRef.current = null;
    setIsDragging(false);
  };

  const renderToolbar = (expanded: boolean) => (
    <div className="cert-qv-toolbar">
      <div className="cert-qv-group">
        <button
          type="button"
          className="cert-qv-btn"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Documento anterior"
          title="Anterior"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="cert-qv-counter">
          {activeIndex + 1} / {count}
        </span>
        <button
          type="button"
          className="cert-qv-btn"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Documento siguiente"
          title="Siguiente"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="cert-qv-group">
        <button
          type="button"
          className="cert-qv-btn"
          onClick={() => changeZoom(-ZOOM_STEP)}
          disabled={zoom <= MIN_ZOOM}
          aria-label="Alejar"
          title="Alejar"
        >
          <ZoomOut size={16} />
        </button>
        <span className="cert-qv-zoom">{Math.round(zoom * 100)}%</span>
        <button
          type="button"
          className="cert-qv-btn"
          onClick={() => changeZoom(ZOOM_STEP)}
          disabled={zoom >= MAX_ZOOM}
          aria-label="Acercar"
          title="Acercar"
        >
          <ZoomIn size={16} />
        </button>
        <button
          type="button"
          className="cert-qv-btn"
          onClick={() => setRotation((current) => (current + 90) % 360)}
          aria-label="Girar 90 grados"
          title="Girar"
        >
          <RotateCw size={16} />
        </button>
        <button
          type="button"
          className="cert-qv-btn"
          onClick={resetView}
          aria-label="Restablecer vista"
          title="Restablecer"
        >
          <RefreshCw size={16} />
        </button>
        {cert.file && (
          <a
            className="cert-qv-btn"
            href={cert.file}
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir documento PDF"
            title="Abrir PDF"
          >
            <FileText size={16} />
            <span className="cert-qv-btn-label">PDF</span>
          </a>
        )}
        <button
          type="button"
          className="cert-qv-btn"
          onClick={() => setIsExpanded((current) => !current)}
          aria-label={expanded ? "Cerrar vista ampliada" : "Ampliar vista"}
          title={expanded ? "Cerrar" : "Ampliar"}
        >
          {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>
    </div>
  );

  const renderStage = (expanded: boolean) => (
    <div
      className={`cert-qv-stage${expanded ? " cert-qv-stage--expanded" : ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{
        cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default",
        touchAction: zoom > 1 ? "none" : "pan-y",
      }}
    >
      <img
        key={cert.id}
        src={cert.image}
        alt={`${cert.title} — ${cert.institution}`}
        className="cert-qv-image"
        draggable={false}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom}) rotate(${rotation}deg)`,
          transition: isDragging ? "none" : "transform 0.22s ease",
        }}
      />
    </div>
  );

  return (
    <>
      <div className="certs-quickview">
        <div className="certs-quickview-head">
          <div>
            <span className="certs-eyebrow">Demostración</span>
            <h3 className="certs-quickview-title">Vista rápida de certificados</h3>
            <p className="certs-quickview-sub">
              Elige un documento, acércalo, gíralo y arrástralo para revisarlo sin salir del portafolio.
            </p>
          </div>
          <span className="cert-qv-badge">{count} documentos</span>
        </div>

        <div className="certs-quickview-body">
          <div className="cert-qv-list" aria-label="Documentos disponibles">
            <div className="cert-qv-list-inner">
              {certificates.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`cert-qv-item${index === activeIndex ? " is-active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={index === activeIndex}
                >
                  <img src={item.image} alt="" className="cert-qv-thumb" loading="lazy" />
                  <span className="cert-qv-item-text">
                    <span className="cert-qv-item-inst">{item.institution}</span>
                    <span className="cert-qv-item-title">{item.title}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="cert-qv-panel">
            {renderToolbar(false)}
            {renderStage(false)}
            <div className="cert-qv-footer">
              <div className="cert-qv-current">
                <span className="cert-qv-current-inst">{cert.institution}</span>
                <span className="cert-qv-current-title">{cert.title}</span>
              </div>
              <div className="cert-qv-footer-right">
                <span className="cert-qv-hint">
                  {zoom > 1 ? "Arrastra para mover la imagen" : "Acerca para ver el detalle"}
                </span>
                {cert.file && (
                  <a className="cert-qv-file" href={cert.file} target="_blank" rel="noreferrer">
                    Abrir PDF <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="cert-qv-overlay" onClick={() => setIsExpanded(false)}>
          <div
            className="cert-qv-expanded"
            role="dialog"
            aria-modal="true"
            aria-label={`Vista rápida: ${cert.title}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cert-qv-expanded-head">
              <div className="cert-qv-current">
                <span className="cert-qv-current-inst">{cert.institution}</span>
                <span className="cert-qv-current-title">{cert.title}</span>
              </div>
              <button
                type="button"
                className="cert-qv-btn"
                onClick={() => setIsExpanded(false)}
                aria-label="Cerrar vista ampliada"
                autoFocus
              >
                <X size={18} />
              </button>
            </div>
            {renderToolbar(true)}
            {renderStage(true)}
          </div>
        </div>
      )}
    </>
  );
}
