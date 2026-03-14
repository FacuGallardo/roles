import React from "react";
import "./Nosotros.css";

const Nosotros: React.FC = () => {
  // Datos de autoridades reales
  const comision = [
    { nombre: "Myriam Calderon", cargo: "Presidenta", foto: "./Autoridades/Myriam Calderon.jpeg" },
    { nombre: "Marcelo Gallardo", cargo: "Tesorero", foto: "./Autoridades/Marcelo Gallardo.jpeg" },
    { nombre: "Laura Tambe", cargo: "Secretaria", foto: "./Autoridades/Laura Tambe.jpeg" },
    { nombre: "Jesús Vergara", cargo: "Vocal Titular", foto: "./Autoridades/JesusVergara.jpeg" },
    { nombre: "Carolina Torres", cargo: "Vocal Titular", foto: "./Autoridades/Carolinatorres.jpeg" },
    { nombre: "Cristian Seijo", cargo: "Revisor de cuentas", foto: "./Autoridades/Cristian Seijo.jpeg" },
    { nombre: "Santiago Altamirano", cargo: "Revisor de cuentas", foto: "./Autoridades/Santiago Altamirano.jpeg" }
  ];

  return (
    <div className="nosotros-container">
      {/* Sección Hero / Breadcrumb */}
      <div 
        className="nosotros-hero" 
        style={{
          backgroundImage: "url('/Nosotros.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="nosotros-hero-overlay">
          <div className="nosotros-hero-content">
            <p className="nosotros-hero-subtitle">Deporte · Comunidad · Pasión</p>
            <h1 className="nosotros-hero-title">Nosotros</h1>
          </div>
        </div>
      </div>

      {/* Sección Destacada - Nuestra Liga */}
      <section className="nosotros-featured">
        <div className="nosotros-featured-container">
          <div className="nosotros-featured-content">
            <h2 className="nosotros-section-title">
              Nuestra <span className="nosotros-orange-text">Liga</span>
            </h2>
            
            <div className="nosotros-features-grid">
              {/* Feature 1 */}
              <div className="nosotros-feature-item">
                <div className="nosotros-feature-icon">
                  <i className="fas fa-hand-paper"></i>
                </div>
                <div className="nosotros-feature-content">
                  <h3>Competencia Recreativa</h3>
                  <p>
                    Organizamos torneos de handball en el Valle de Punilla promoviendo 
                    el juego limpio, la inclusión y el compañerismo entre clubes.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="nosotros-feature-item">
                <div className="nosotros-feature-icon">
                  <i className="fas fa-file-signature"></i>
                </div>
                <div className="nosotros-feature-content">
                  <h3>Organización Oficial</h3>
                  <p>
                    Contamos con reglamentos claros, calendario anual y estructura 
                    administrativa para garantizar una competencia ordenada.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="nosotros-feature-item">
                <div className="nosotros-feature-icon">
                  <i className="fas fa-running"></i>
                </div>
                <div className="nosotros-feature-content">
                  <h3>Desarrollo Deportivo</h3>
                  <p>
                    Fomentamos el crecimiento de jugadores y clubes, impulsando la 
                    formación y la participación en todas las categorías.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="nosotros-feature-item">
                <div className="nosotros-feature-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="nosotros-feature-content">
                  <h3>Comunidad y Valores</h3>
                  <p>
                    La liga es un espacio de encuentro donde el respeto, la amistad 
                    y la pasión por el handball son nuestra prioridad.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Comisión / Equipo */}
      <section className="nosotros-team">
        <div className="nosotros-section-header">
          <h2 className="nosotros-section-title">
            Nuestra <span className="nosotros-orange-text">Comisión</span>
          </h2>
          <p className="nosotros-section-description">
            Equipo responsable de la organización, coordinación y desarrollo del handball 
            en el Valle de Punilla.
          </p>
        </div>

        <div className="nosotros-team-grid">
          {comision.map((miembro, index) => (
            <div key={index} className="nosotros-team-item">
              <div 
                className="nosotros-team-image"
                style={{
                  backgroundImage: `url('${miembro.foto}')`
                }}
              ></div>
              <div className="nosotros-team-info">
                <h4>{miembro.nombre} <span>{miembro.cargo}</span></h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección Reglamento */}
      <section className="nosotros-reglamento">
        <div className="nosotros-section-header">
          <h2 className="nosotros-section-title">
            Reglamento <span className="nosotros-orange-text">Disciplinario</span>
          </h2>
          <p className="nosotros-section-description">
            Liga Recreativa de Handball Punilla
          </p>
        </div>

        <div className="nosotros-pdf-section">
          <div className="nosotros-pdf-container">
            <iframe 
              src="/REGLAMENTO.pdf" 
              title="REGLAMENTO DISCIPLINARIO"
              className="nosotros-pdf-viewer"
            ></iframe>
          </div>
          <div className="nosotros-pdf-actions">
            <a 
              href="/REGLAMENTO.pdf" 
              download 
              className="nosotros-download-btn"
            >
              <i className="fas fa-download"></i> Descargar PDF
            </a>
          </div>
        </div>
      </section>

      {/* Sección Timeline / Eventos */}
      <section className="nosotros-timeline">
        <div className="nosotros-section-header">
          <h2 className="nosotros-section-title">
            Eventos en el <span className="nosotros-orange-text">Tiempo</span>
          </h2>
        </div>

        <div className="nosotros-timeline-grid">
          {/* Event 1 */}
          <div className="nosotros-timeline-item">
            <div 
              className="nosotros-timeline-image"
              style={{
                backgroundImage: "url('/Historia/foto1.jpeg')"
              }}
            ></div>
            <div className="nosotros-timeline-info">
              <h3>15 de mayo</h3>
              <p>Fundación de la liga</p>
            </div>
          </div>

          {/* Event 2 */}
          <div className="nosotros-timeline-item">
            <div 
              className="nosotros-timeline-image"
              style={{
                backgroundImage: "url('/Historia/foto2.jpeg')"
              }}
            ></div>
            <div className="nosotros-timeline-info">
              <h3>Primer Logo de la Liga</h3>
              <p>Diseñado por los fundadores de la liga</p>
            </div>
          </div>

          {/* Event 3 */}
          <div className="nosotros-timeline-item">
            <div 
              className="nosotros-timeline-image"
              style={{
                backgroundImage: "url('/Historia/foto3.jpeg')"
              }}
            ></div>
            <div className="nosotros-timeline-info">
              <h3>Crecimiento</h3>
              <p>La Liga suma nuevos miembros</p>
            </div>
          </div>

          {/* Event 4 */}
          <div className="nosotros-timeline-item">
            <div 
              className="nosotros-timeline-image"
              style={{
                backgroundImage: "url('/Historia/foto4.jpeg')"
              }}
            ></div>
            <div className="nosotros-timeline-info">
              <h3>Gran reunión</h3>
              <p>Llegan nuevos clubes a la liga</p>
            </div>
          </div>

          {/* Event 5 */}
          <div className="nosotros-timeline-item">
            <div 
              className="nosotros-timeline-image"
              style={{
                backgroundImage: "url('/Historia/foto5.jpeg')"
              }}
            ></div>
            <div className="nosotros-timeline-info">
              <h3>De manera exponencial</h3>
              <p>La liga crece exponencialmente con nuevos clubes y jugadores</p>
            </div>
          </div>

          {/* Event 6 */}
          <div className="nosotros-timeline-item">
            <div 
              className="nosotros-timeline-image"
              style={{
                backgroundImage: "url('/Historia/foto6.jpeg')"
              }}
            ></div>
            <div className="nosotros-timeline-info">
              <h3>Seleccionado de la Liga Punilla</h3>
              <p>El seleccionado participa en campeonatos en Alta Gracia</p>
            </div>
          </div>

          {/* Event 7 */}
          <div className="nosotros-timeline-item">
            <div 
              className="nosotros-timeline-image"
              style={{
                backgroundImage: "url('/Historia/foto7.jpeg')"
              }}
            ></div>
            <div className="nosotros-timeline-info">
              <h3>Convenio con la Federación</h3>
              <p>La liga firma convenio y cuenta con sus propios árbitros</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
