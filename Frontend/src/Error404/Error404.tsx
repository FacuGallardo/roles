import React from "react";
import "./Error404.css";

interface Error404Props {
  onBack?: () => void;
}

const Error404: React.FC<Error404Props> = ({ onBack }) => {
  const handleGoHome = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="error404-container">
      {/* Hero Section */}
      <div 
        className="error404-hero"
        style={{
          backgroundImage: "url('/Historia/foto1.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="error404-hero-overlay">
          <div className="error404-hero-content">
            <p className="error404-hero-subtitle">Error · Not Found · Página No Disponible</p>
            <h1 className="error404-hero-title">Error 404</h1>
          </div>
        </div>
      </div>

      {/* Error Content Section */}
      <section className="error404-content">
        <div className="error404-wrapper">
          <div className="error404-icon-section">
            <i className="far fa-sad-cry error404-icon"></i>
          </div>
          
          <div className="error404-text">
            <h2 className="error404-main-title">
              ¡Oops! Página no encontrada.
            </h2>
            
            <p className="error404-description">
              La página que solicitaste no existe, ha sido movida o eliminada.
            </p>

            <div className="error404-reasons">
              <h3>Posibles razones:</h3>
              <ul>
                <li>La URL fue ingresada incorrectamente</li>
                <li>La página fue eliminada o movida a otra ubicación</li>
                <li>No tienes permiso para acceder a este contenido</li>
                <li>Ocurrió un error durante la carga</li>
              </ul>
            </div>

            <div className="error404-actions">
              <button 
                className="error404-btn-primary"
                onClick={handleGoHome}
              >
                <i className="fas fa-home"></i> Volver a la página principal
              </button>
              
              <a href="#" className="error404-btn-secondary">
                <i className="fas fa-envelope"></i> Reportar problema
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="error404-links">
        <div className="error404-links-wrapper">
          <h3>Accesos rápidos:</h3>
          
          <div className="error404-quick-links">
            <a href="#" className="error404-quick-link">
              <i className="fas fa-newspaper"></i>
              <span>Noticias</span>
            </a>
            
            <a href="#" className="error404-quick-link">
              <i className="fas fa-calendar"></i>
              <span>Fixture</span>
            </a>
            
            <a href="#" className="error404-quick-link">
              <i className="fas fa-users"></i>
              <span>Clubes</span>
            </a>
            
            <a href="#" className="error404-quick-link">
              <i className="fas fa-info-circle"></i>
              <span>Contacto</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error404;
