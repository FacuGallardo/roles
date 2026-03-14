import React from "react";

export type Noticia = {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  imagenUrl?: string;
  autor?: string;
};

type Props = {
  noticia: Noticia;
  todasLasNoticias: Noticia[];
  onBack: () => void;
  onSelectNoticia: (noticia: Noticia) => void;
};

const NoticiasDetalle: React.FC<Props> = ({
  noticia,
  todasLasNoticias,
  onBack,
  onSelectNoticia,
}) => {
  const noticiasDesplegadas = todasLasNoticias
    .filter((n) => n.id !== noticia.id)
    .slice(0, 5);

  return (
    <div className="noticia-detalle-container">
      <style>{`
        .noticia-detalle-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(1rem, 4vw, 2rem);
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .noticia-detalle-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .noticia-detalle-header h1 {
          font-size: clamp(2rem, 5vw, 2.5rem);
          color: #1f3c88;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .noticia-detalle-header p {
          font-size: clamp(1rem, 3vw, 1.1rem);
          color: #666;
        }

        .noticia-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #1f3c88;
          font-weight: 600;
          text-decoration: none;
          font-size: 0.95rem;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
        }

        .noticia-back-btn:hover {
          color: #FF8C00;
          gap: 0.75rem;
        }

        .noticia-detalle-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: clamp(2rem, 4vw, 3rem);
        }

        .noticia-articulo {
          background: white;
          padding: clamp(1.5rem, 4vw, 2rem);
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .noticia-articulo-imagen {
          width: 100%;
          height: clamp(200px, 40vw, 350px);
          background: linear-gradient(135deg, #1f3c88 0%, #2a4b9f 100%);
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }

        .noticia-articulo-imagen img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .noticia-articulo-imagen-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 4rem;
        }

        .noticia-articulo-meta {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid #e0e0e0;
        }

        .noticia-meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #666;
        }

        .noticia-meta-item i {
          color: #FF8C00;
          width: 18px;
        }

        .noticia-articulo-titulo {
          font-size: clamp(1.5rem, 5vw, 2rem);
          font-weight: 700;
          color: #1f3c88;
          margin-bottom: 1.5rem;
          line-height: 1.3;
        }

        .noticia-articulo-body {
          font-size: clamp(0.95rem, 2.5vw, 1rem);
          color: #555;
          line-height: 1.8;
          text-align: justify;
        }

        .noticia-articulo-body p {
          margin-bottom: 1.5rem;
        }

        .noticia-articulo-body p:last-child {
          margin-bottom: 0;
        }

        .noticia-sidebar {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .noticia-sidebar-box {
          background: white;
          padding: clamp(1.5rem, 4vw, 2rem);
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .noticia-sidebar-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1f3c88;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 3px solid #FF8C00;
        }

        .noticia-sidebar-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .noticia-sidebar-item {
          padding: 0.75rem 0;
          border-bottom: 1px solid #e0e0e0;
        }

        .noticia-sidebar-item:last-child {
          border-bottom: none;
        }

        .noticia-sidebar-link {
          color: #1f3c88;
          text-decoration: none;
          font-size: clamp(0.9rem, 2.5vw, 0.95rem);
          transition: all 0.3s ease;
          display: block;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .noticia-sidebar-link:hover {
          color: #FF8C00;
          padding-left: 0.5rem;
        }

        @media (max-width: 768px) {
          .noticia-detalle-content {
            grid-template-columns: 1fr;
          }

          .noticia-articulo-titulo {
            font-size: 1.5rem;
          }

          .noticia-articulo-body {
            text-align: left;
          }
        }
      `}</style>

      <div className="noticia-detalle-header">
        <button className="noticia-back-btn" onClick={onBack}>
          <i className="fas fa-arrow-left"></i>
          Volver a Noticias
        </button>
        <h1>{noticia.titulo}</h1>
        <p>Deporte · Comunidad · Pasión</p>
      </div>

      <div className="noticia-detalle-content">
        <article className="noticia-articulo">
          <div className="noticia-articulo-imagen">
            {noticia.imagenUrl ? (
              <img src={noticia.imagenUrl} alt={noticia.titulo} />
            ) : (
              <div className="noticia-articulo-imagen-placeholder">
                <i className="fas fa-newspaper"></i>
              </div>
            )}
          </div>

          <div className="noticia-articulo-meta">
            <span className="noticia-meta-item">
              <i className="fas fa-user"></i>
              <span>{noticia.autor || "Admin"}</span>
            </span>
            <span className="noticia-meta-item">
              <i className="fas fa-calendar"></i>
              <span>
                {new Date(noticia.fecha).toLocaleDateString("es-AR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </span>
          </div>

          <h2 className="noticia-articulo-titulo">{noticia.titulo}</h2>

          <div className="noticia-articulo-body">
            {noticia.contenido.split("\n\n").map((parrafo, idx) => (
              <p key={idx}>{parrafo}</p>
            ))}
          </div>
        </article>

        <aside className="noticia-sidebar">
          <div className="noticia-sidebar-box">
            <h3 className="noticia-sidebar-title">
              <i className="fas fa-newspaper" style={{ marginRight: "0.5rem" }}></i>
              Publicaciones Recientes
            </h3>
            <ul className="noticia-sidebar-list">
              {noticiasDesplegadas.length > 0 ? (
                noticiasDesplegadas.map((n) => (
                  <li key={n.id} className="noticia-sidebar-item">
                    <a
                      href="#"
                      className="noticia-sidebar-link"
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectNoticia(n);
                      }}
                    >
                      {n.titulo}
                    </a>
                  </li>
                ))
              ) : (
                <p style={{ color: "#999", fontSize: "0.9rem" }}>No hay otras noticias disponibles.</p>
              )}
            </ul>
          </div>

          <div className="noticia-sidebar-box">
            <h3 className="noticia-sidebar-title">
              <i className="fas fa-info-circle" style={{ marginRight: "0.5rem" }}></i>
              Información
            </h3>
            <div style={{ fontSize: "0.9rem", color: "#666", lineHeight: "1.6" }}>
              <p>
                Manténete informado sobre las últimas novedades de la Liga Recreativa
                de Handball Punilla.
              </p>
              <p>Síguenos en nuestras redes sociales para no perder ninguna actualización.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NoticiasDetalle;
