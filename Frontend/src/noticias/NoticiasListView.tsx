import React, { useState } from "react";

export type Noticia = {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  imagenUrl?: string;
  autor?: string;
};

type Props = {
  noticias: Noticia[];
  onSelectNoticia: (noticia: Noticia) => void;
};

const NoticiasListView: React.FC<Props> = ({ noticias, onSelectNoticia }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(noticias.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedNoticias = noticias.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="noticias-list-container">
      <style>{`
        .noticias-list-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(1rem, 4vw, 2rem);
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .noticias-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .noticias-header h1 {
          font-size: clamp(2rem, 5vw, 2.5rem);
          color: #1f3c88;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .noticias-header p {
          font-size: clamp(1rem, 3vw, 1.1rem);
          color: #666;
        }

        .noticias-grid {
          display: grid;
          gap: clamp(1.5rem, 4vw, 2rem);
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          margin-bottom: 2rem;
        }

        .noticia-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: flex;
          flex-direction: column;
          height: 100%;
          cursor: pointer;
        }

        .noticia-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(31, 60, 136, 0.15);
          border: 2px solid #FF8C00;
        }

        .noticia-image {
          width: 100%;
          height: 220px;
          background: linear-gradient(135deg, #1f3c88 0%, #2a4b9f 100%);
          overflow: hidden;
          position: relative;
        }

        .noticia-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .noticia-card:hover .noticia-image img {
          transform: scale(1.05);
        }

        .noticia-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 3rem;
        }

        .noticia-content {
          padding: clamp(1rem, 3vw, 1.5rem);
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .noticia-meta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          font-size: 0.85rem;
          color: #666;
        }

        .noticia-meta-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .noticia-meta-item i {
          color: #FF8C00;
          width: 16px;
        }

        .noticia-title {
          font-size: clamp(1.1rem, 3vw, 1.3rem);
          font-weight: 700;
          color: #1f3c88;
          line-height: 1.4;
          margin: 0.5rem 0;
        }

        .noticia-excerpt {
          font-size: clamp(0.9rem, 2.5vw, 0.95rem);
          color: #555;
          line-height: 1.6;
          margin-bottom: 1rem;
          flex: 1;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

        .noticia-read-more {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #1f3c88;
          font-weight: 600;
          text-decoration: none;
          font-size: clamp(0.85rem, 2vw, 0.9rem);
          transition: all 0.3s ease;
          align-self: flex-start;
        }

        .noticia-read-more:hover {
          color: #FF8C00;
          gap: 0.75rem;
        }

        .noticia-read-more i {
          color: #FF8C00;
        }

        .pagination-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .pagination-btn {
          padding: 0.6rem 1rem;
          border: 2px solid #1f3c88;
          background: white;
          color: #1f3c88;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          min-height: 40px;
          min-width: 40px;
          font-size: 0.9rem;
        }

        .pagination-btn:hover:not(:disabled) {
          background: #1f3c88;
          color: white;
          transform: translateY(-2px);
        }

        .pagination-btn.active {
          background: #1f3c88;
          color: white;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-info {
          color: #666;
          font-size: 0.9rem;
          margin: 0 1rem;
        }

        .no-noticias {
          text-align: center;
          padding: 3rem;
          color: #666;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .noticias-grid {
            grid-template-columns: 1fr;
          }

          .noticia-image {
            height: 200px;
          }
        }
      `}</style>

      <div className="noticias-header">
        <h1>Noticias</h1>
        <p>Deporte · Comunidad · Pasión</p>
      </div>

      {noticias.length === 0 ? (
        <div className="no-noticias">
          <p>No hay noticias disponibles por el momento.</p>
        </div>
      ) : (
        <>
          <div className="noticias-grid">
            {displayedNoticias.map((noticia) => (
              <div key={noticia.id} className="noticia-card" onClick={() => onSelectNoticia(noticia)}>
                <div className="noticia-image">
                  {noticia.imagenUrl ? (
                    <img src={noticia.imagenUrl} alt={noticia.titulo} />
                  ) : (
                    <div className="noticia-image-placeholder">
                      <i className="fas fa-newspaper"></i>
                    </div>
                  )}
                </div>
                <div className="noticia-content">
                  <div className="noticia-meta">
                    <span className="noticia-meta-item">
                      <i className="fas fa-user"></i>
                      {noticia.autor || "Admin"}
                    </span>
                    <span className="noticia-meta-item">
                      <i className="fas fa-calendar"></i>
                      {new Date(noticia.fecha).toLocaleDateString("es-AR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="noticia-title">{noticia.titulo}</h3>
                  <p className="noticia-excerpt">{noticia.contenido}</p>
                  <a href="#" className="noticia-read-more" onClick={(e) => {
                    e.preventDefault();
                    onSelectNoticia(noticia);
                  }}>
                    Leer más <i className="fas fa-angle-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                ← Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`pagination-btn ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Siguiente →
              </button>

              <span className="pagination-info">
                Página {currentPage} de {totalPages}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NoticiasListView;
