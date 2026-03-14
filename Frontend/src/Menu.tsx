import { useEffect, useState } from "react";
import { ClubesListado } from "./Clubes/pages/ClubesListado";
import { CrearClub } from "./Clubes/pages/CrearClub";
import { EditarClub } from "./Clubes/pages/EditarClub";
import { DetalleClub } from "./Clubes/pages/DetalleClub";
import { JugadoresPage } from "./Jugadores";
import ReferentesPage from "./Referentes/ReferentesPage";
import FixturePage from "./Fixture/FixturePage";
import EstadisticasPage from "./Estadistica/EstadisticasPage";
import NoticiasPage from "./noticias/Noticiaspage";
import PagosPage from "./RegistroPagos/PagosPage";
import Contacto from "./pages/Contacto";
import Nosotros from "./Nosotros/Nosotros";
import Error404 from "./Error404/Error404";
import LoginModal from "./LoginModal";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./menu-responsive.css";

// Tipo de Noticia para las nuevas vistas
export type Noticia = {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  imagenUrl?: string;
  autor?: string;
};
import "./images-responsive.css";
import "./tables-desktop.css";
import "./typography-desktop.css";
import "./layout-desktop.css";
import "./forms-desktop.css";
import "./feedback-desktop.css";
import "./desktop-fixes.css";

export default function App() {
  const [vista, setVista] = useState(
    () => (localStorage.getItem("vista") as any) || "inicio"
  );
  const [clubIdActual, setClubIdActual] = useState<number | null>(null);

  // Estados para noticias
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState<Noticia | null>(null);

  const [openHandball, setOpenHandball] = useState(false);
  const [openInstitucional, setOpenInstitucional] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- 2. MODIFICACIÓN: Leer el token al inicio para persistir la sesión ---
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token"); // Retorna true si hay token guardado
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("vista", vista);
  }, [vista]);

  // Cargar noticias de la API
  useEffect(() => {
    const cargarNoticias = async () => {
      try {
        const respuesta = await fetch("http://localhost:3001/noticias");
        if (respuesta.ok) {
          const data = await respuesta.json();
          setNoticias(data);
        }
      } catch (error) {
        console.error("Error al cargar noticias:", error);
      }
    };
    cargarNoticias();
  }, []);

  // 🔒 EVENT LISTENERS: Cerrar dropdowns al hacer click o scroll
  useEffect(() => {
    const closeDropdowns = () => {
      setOpenHandball(false);
      setOpenInstitucional(false);
    };
    
    // Cierra al hacer click fuera
    window.addEventListener("click", closeDropdowns);
    
    // Cierra al scrollear - SOLUCIÓN SENIOR
    window.addEventListener("scroll", closeDropdowns, { passive: true });
    
    return () => {
      window.removeEventListener("click", closeDropdowns);
      window.removeEventListener("scroll", closeDropdowns);
    };
  }, []);

  const stop = (e: any) => e.stopPropagation();

  const handleLinkClick = (newVista: string) => {
    setVista(newVista);
    setOpenHandball(false);
    setOpenInstitucional(false);
    setIsMobileMenuOpen(false);
    // Limpiar noticia seleccionada cuando cambias de vista
    if (newVista !== "noticias") {
      setNoticiaSeleccionada(null);
    }
  };
  
  // --- Función para el éxito del login ---
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    alert("¡Inicio de sesión exitoso!");
    // Opcional: redirigir a una vista de admin
    // setVista("admin_dashboard"); 
  };
  
  // --- Función de Logout ---
  const handleLogout = () => {
    // 3. MODIFICACIÓN: Limpiar localStorage al salir
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setVista("inicio"); // Vuelve al inicio
    setIsMobileMenuOpen(false);
  };

  const isNavItemActive = (item: string) => {
    if (item === "handball" && (vista === "clubes" || vista === "crear-club" || vista === "editar-club" || vista === "detalle-club" || vista === "jugadores" || vista === "estadisticas" || vista === "fixture")) {
      return true;
    }
    if (item === "institucional" && (vista === "nosotros" || vista === "referentes")) {
      return true;
    }
    return vista === item;
  };

  return (
    <>
<style>{`
  /* ... (Tus estilos existentes de header, nav, etc. van aquí) ... */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root {
    font-family: 'Inter', sans-serif;
    background-color: #f0f2f5;
    color: #333;
    height: 100%;
    width: 100%;
  }
  .app { display: flex; flex-direction: column; min-height: 100vh; }
  
  /* ===== HEADER Y NAVEGACIÓN (Tus estilos) ===== */
  header {
    background-color: #1f3c88;
    color: white;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    position: relative;
    top: 0;
    z-index: 10;
    height: var(--header-height);
  }
  .logo { display: flex; align-items: center; gap: 0.75rem; font-weight: bold; font-size: 1.25rem; cursor: pointer; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); transition: transform 0.3s ease; }
  .logo:hover { transform: scale(1.02); }
  .logo img { width: 40px; height: 40px; border-radius: 50%; }
  nav { display: flex; gap: clamp(0.75rem, 4vw, 2rem); align-items: center; transition: transform 0.3s ease, opacity 0.3s ease; }
  .nav-btn { background: none; border: none; color: white; font-size: 1rem; font-weight: 600; cursor: pointer; position: relative; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.5rem; transition: color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease; }
  .nav-btn:hover { color: #a0c4ff; transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.2); }
  .nav-btn:active { transform: scale(0.95); }
  .nav-btn.active-nav-btn { color: white; }
  .nav-btn.active-nav-btn::after { content: ""; position: absolute; left: 50%; bottom: 0; width: 100%; height: 4px; background-color: #ffffffff; transform: translateX(-50%); transition: width 0.3s ease, transform 0.3s ease; }
  .nav-btn:not(.active-nav-btn)::after { content: ""; position: absolute; left: 50%; bottom: 0; width: 0; height: 2px; background-color: white; transition: width 0.3s ease, transform 0.3s ease; transform: translateX(-50%); }
  .nav-btn:hover:not(.active-nav-btn)::after { width: 100%; }
  .nav-btn span[role="img"] { display: inline-block; transition: transform 0.3s ease; }
  .nav-btn[aria-expanded="true"] span[role="img"] { transform: rotate(180deg); }
  .nav-btn i { margin-right: 0.5rem; display: inline-block; width: 20px; text-align: center; color: #FF8C00; }
  .nav-btn i.fa-chevron-down { margin-right: 0.25rem; margin-left: auto; font-size: 0.75rem; color: #FF8C00; }
  .dropdown-btn i { margin-right: 0.5rem; display: inline-block; width: 20px; text-align: center; color: #FF8C00; }
  .dropdown { 
    position: absolute; 
    top: 3.5rem; 
    left: 0; 
    background: white; 
    color: #1f3c88; 
    min-width: 200px; 
    max-width: 90vw; 
    border-radius: 16px; 
    box-shadow: 0 8px 24px rgba(0,0,0,0.2); 
    z-index: 100; 
    display: flex; 
    flex-direction: column; 
    font-size: 1rem; 
    overflow: hidden; 
    animation: dropdownIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; 
    transform-origin: top center;
    pointer-events: auto;
  }
  @keyframes dropdownIn { from { opacity: 0; transform: translateY(-10px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes dropdownOut { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(-10px) scale(0.95); } }
  .dropdown-btn { background: none; border: none; color: #1f3c88; text-align: left; padding: 1rem 1.25rem; cursor: pointer; font-weight: 500; transition: background-color 0.2s ease, transform 0.1s ease; min-height: 44px; display: flex; align-items: center; }
  .dropdown-btn:hover { background: #e9ecef; }
  .dropdown-btn:active { transform: scale(0.98); }
  main { flex: 1; padding: 1rem; padding-top: calc(1rem + var(--header-height, 60px)); display: flex; justify-content: center; }
  footer { background: #1f3c88; color: white; text-align: center; padding: 1rem; font-size: 0.9rem; }
  .footer-contact { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; margin-top: 0.5rem; font-size: clamp(0.875rem, 2vw, 0.9rem); line-height: 1.4; }
  .footer-contact img { height: 20px; margin-right: 0.5rem; vertical-align: middle; }
  .footer-contact a { color: white; text-decoration: underline; }
  .sponsors { background: white; border-radius: 12px; padding: clamp(1rem, 4vw, 1.5rem); text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.05); }
  .sponsors h2 { margin-bottom: 1rem; color: #1f3c88; }
  .sponsor-logos { display: flex; flex-wrap: wrap; justify-content: center; gap: clamp(1rem, 4vw, 2rem); }
  .sponsor-logos img { height: 40px; object-fit: contain; opacity: 0.8; transition: opacity 0.3s; }
  .sponsor-logos img:hover { opacity: 1; }
  .hamburger-menu { 
    display: none; 
    font-size: 1.5rem; 
    cursor: pointer; 
    border: none; 
    background: none; 
    color: white;
    min-height: 44px;
    min-width: 44px;
    padding: 0.5rem;
    margin: -0.5rem;
    transition: transform 0.2s ease;
  }
  .hamburger-menu:hover { transform: scale(1.1); }
  
  /* --- BOTONES DE ACCIÓN (Editar, Eliminar, Guardar) --- */
  .btn-primary, .btn-save, .btn-submit {
    background-color: #1f3c88;
    color: white;
    min-height: 44px;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .btn-primary:hover, .btn-save:hover, .btn-submit:hover {
    background-color: #152a5f;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(31, 60, 136, 0.3);
  }
  .btn-secondary, .btn-cancel {
    background-color: #e5e7eb;
    color: #1f3c88;
    min-height: 44px;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .btn-secondary:hover, .btn-cancel:hover {
    background-color: #d1d5db;
    transform: translateY(-2px);
  }
  .btn-danger, .btn-delete {
    background-color: #ef4444;
    color: white;
    min-height: 44px;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .btn-danger:hover, .btn-delete:hover {
    background-color: #dc2626;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
  }
  .btn-warning {
    background-color: #f59e0b;
    color: white;
  }
  .btn-warning:hover {
    background-color: #d97706;
  }
  .btn-success {
    background-color: #10b981;
    color: white;
  }
  .btn-success:hover {
    background-color: #059669;
  }
  
  /* --- 7. NUEVOS ESTILOS PARA VISTA "INICIO" --- */
  .inicio-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 clamp(1rem, 4vw, 2rem);
    display: flex;
    flex-direction: column;
    gap: 2.5rem; /* Espacio entre secciones */
  }
  
  .inicio-section-title {
    font-size: clamp(1.3rem, 4vw, 1.75rem);
    font-weight: 700;
    color: #1f3c88;
    margin-bottom: 1rem;
    border-bottom: 3px solid #1f3c88;
    padding-bottom: 0.5rem;
  }
  
  .inicio-noticias-grid {
    display: grid;
    gap: clamp(1rem, 4vw, 2rem);
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  
  .inicio-data-grid {
    display: grid;
    gap: clamp(1rem, 4vw, 2rem);
    grid-template-columns: 2fr 1fr; /* 2/3 para tabla, 1/3 para calendario */
  }

  .card {
    background: white;
    border-radius: 12px;
    border: 2px solid transparent;
    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
    border-color: #1f3c88;
  }
  
  .card img { width: 100%; height: clamp(150px, 40vw, 250px); object-fit: cover; transition: transform 0.4s ease; }
  .card:hover img { transform: scale(1.05); }
  .card-content { padding: clamp(1rem, 3vw, 1.5rem); flex: 1; display: flex; flex-direction: column; }
  .card-content h2 { font-size: clamp(1.1rem, 3vw, 1.25rem); margin-bottom: 0.5rem; color: #1f3c88; line-height: 1.3; }
  .card-content p { font-size: clamp(0.9rem, 2.5vw, 0.95rem); color: #555; margin-bottom: 1rem; line-height: 1.5; }
  .card-content .noticia-meta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 1rem;
  }
  .card-content .meta-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  .card-content .meta-item i {
    color: #FF8C00;
    width: 16px;
  }
  .card-content .read-more {
    margin-top: auto;
    font-weight: 600;
    color: #1f3c88;
    text-decoration: none;
    font-size: clamp(0.85rem, 2vw, 0.9rem);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
  .card-content .read-more:hover { 
    color: #FF8C00;
    gap: 0.75rem;
  }
  .card-content .read-more i {
    color: #FF8C00;
  }

  .tabla-posiciones {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    background-color: #1f3c88;
    border-radius: 8px;
    overflow: hidden;
  }
  .tabla-posiciones th, .tabla-posiciones td {
    padding: 0.75rem 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    font-size: clamp(0.875rem, 2vw, 1rem);
  }
  .tabla-posiciones th {
    font-size: clamp(0.8rem, 2vw, 0.9rem);
    color: white;
    text-transform: uppercase;
    font-weight: 600;
    background-color: #152a5f;
  }
  .tabla-posiciones td {
    font-weight: 500;
    color: white;
    background-color: #1f3c88;
  }
  .tabla-posiciones tbody tr {
    background-color: #1f3c88;
  }
  .tabla-posiciones tbody tr:hover {
    background-color: #2a4b9f;
  }
  .tabla-posiciones .team-name {
    font-weight: 600;
    color: #a0c4ff;
  }

  .calendario-item {
    padding: 1rem 0;
    border-bottom: 1px dashed #ccc;
  }
  .calendario-item:last-child {
    border-bottom: none;
  }
  .calendario-item strong {
    font-size: 0.9rem;
    color: #333;
    display: block;
    margin-bottom: 0.25rem;
  }
  .calendario-item small {
    color: #666;
    margin-bottom: 0.5rem;
    display: block;
  }
  .calendario-partido {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;
  }
  .calendario-partido .vs {
    font-size: 0.8rem;
    color: #1f3c88;
  }
  
  /* --- Fin nuevos estilos --- */
  
  /* Responsive para móviles */
  @media (max-width: 900px) {
    .inicio-data-grid {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 480px) {
    /* Botones en mobile: asegurar que tengan buen tamaño */
    .btn-primary, .btn-save, .btn-submit,
    .btn-secondary, .btn-cancel,
    .btn-danger, .btn-delete,
    .btn-warning, .btn-success {
      width: 100%;
      padding: 0.85rem 1rem;
      font-size: 0.95rem;
    }
    
    /* Grupos de botones en columna */
    .button-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
  }
  
  @media (min-width: 769px) {
    header { 
      padding: 1rem 2rem;
    }
  }
  
  @media (max-width: 768px) {
    header { 
      padding: 0.75rem 1rem;
      height: var(--header-height);
    }
    nav { 
      display: none; 
      flex-direction: column; 
      position: sticky; 
      top: var(--navbar-mobile-top); 
      left: 0; 
      right: 0;
      background: #1f3c88; 
      width: 100%; 
      max-height: calc(100vh - var(--navbar-mobile-top));
      overflow-y: auto;
      padding: 0.5rem 0; 
      box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
      animation: slideDown 0.3s ease-in-out forwards; 
      z-index: 9;
      padding-bottom: env(safe-area-inset-bottom, 0);
    }
    nav.is-open { 
      align-items: stretch;
      display: flex;
    }
    @keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .nav-btn { 
      width: 100%; 
      justify-content: flex-start; 
      align-items: center; 
      font-size: 1rem;
      min-height: 44px;
      padding: 0.75rem 1rem; 
      gap: 0.75rem;
      border-radius: 0;
    }
    .nav-btn span[role="img"] { font-size: 1.2rem; }
    .nav-btn::after { display: none; }
    .nav-btn.active-nav-btn { background-color: rgba(255, 255, 255, 0.1); }
    .nav-btn.active-nav-btn::after { display: none; }
    .dropdown { 
      position: static; 
      border-radius: 0; 
      box-shadow: none; 
      background: #2a4993; 
      min-width: auto; 
      margin-left: 1.5rem; 
      margin-top: 0.25rem;
      animation: none;
    }
    .dropdown-btn { 
      padding: 0.75rem 0; 
      padding-left: 2rem; 
      color: white; 
      font-size: 0.95rem;
      min-height: 40px;
      display: flex;
      align-items: center;
    }
    .dropdown-btn:hover { background: rgba(255, 255, 255, 0.1); }
    .hamburger-menu { display: block; }
    main { padding: 1rem; padding-top: 1rem; }
  }
`}</style>

      <div className="app">
        <header>
          <div className="logo" onClick={() => handleLinkClick("inicio")}>
            <img src="/Logo.png" alt="Logo" />
            Liga Recreativa Handball Punilla
          </div>
          <button className="hamburger-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            ☰
          </button>
          <nav className={isMobileMenuOpen ? "is-open" : ""}>
            {/* INICIO */}
            <button 
              className={`nav-btn ${isNavItemActive("inicio") ? "active-nav-btn" : ""}`} 
              onClick={() => handleLinkClick("inicio")}
            >
              <i className="fas fa-home"></i> Inicio
            </button>

            {/* HANDBALL DROPDOWN */}
            <div 
              style={{ position: "relative" }} 
              onClick={stop}
              onMouseLeave={() => {
                setOpenHandball(false);
              }}
            >
              <button
                className={`nav-btn ${openHandball || isNavItemActive("handball") ? "active-nav-btn" : ""}`}
                onClick={e => {
                  stop(e);
                  setOpenHandball(v => !v);
                  setOpenInstitucional(false);
                }}
                aria-haspopup="true"
                aria-expanded={openHandball}
              >
                <i className="fas fa-basketball"></i> Handball <i className="fas fa-chevron-down"></i>
              </button>
              {openHandball && (
                <div className="dropdown" onClick={stop}>
                  <button className="dropdown-btn" onClick={() => handleLinkClick("clubes")}><i className="fas fa-shield-alt"></i> Clubes</button>
                  <button className="dropdown-btn" onClick={() => handleLinkClick("jugadores")}><i className="fas fa-users"></i> Jugadores</button>
                  <button className="dropdown-btn" onClick={() => handleLinkClick("estadisticas")}><i className="fas fa-chart-bar"></i> Tablas & Puntuación</button>
                  <button className="dropdown-btn" onClick={() => handleLinkClick("fixture")}><i className="fas fa-calendar-alt"></i> Fixture</button>
                </div>
              )}
            </div>

            {/* INSTITUCIONAL DROPDOWN */}
            <div 
              style={{ position: "relative" }} 
              onClick={stop}
              onMouseLeave={() => {
                setOpenInstitucional(false);
              }}
            >
              <button
                className={`nav-btn ${openInstitucional || isNavItemActive("institucional") ? "active-nav-btn" : ""}`}
                onClick={e => {
                  stop(e);
                  setOpenInstitucional(v => !v);
                  setOpenHandball(false);
                }}
                aria-haspopup="true"
                aria-expanded={openInstitucional}
              >
                <i className="fas fa-building"></i> Institucional <i className="fas fa-chevron-down"></i>
              </button>
              {openInstitucional && (
                <div className="dropdown" onClick={stop}>
                  <button className="dropdown-btn" onClick={() => handleLinkClick("nosotros")}><i className="fas fa-info-circle"></i> Nosotros</button>
                  
                  {/* Mostrar solo si está logueado */}
                  {isLoggedIn && (
                    <>
                      <button className="dropdown-btn" onClick={() => handleLinkClick("referentes")}><i className="fas fa-clipboard-list"></i> Referentes</button>
                      <button className="dropdown-btn" onClick={() => handleLinkClick("Pago de Arbitros")}><i className="fas fa-money-bill-wave"></i> Pago de árbitros</button>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* NOTICIAS */}
            <button 
              className={`nav-btn ${isNavItemActive("noticias") ? "active-nav-btn" : ""}`} 
              onClick={() => handleLinkClick("noticias")}
            >
              <i className="fas fa-newspaper"></i> Noticias
            </button>

            {/* CONTACTO */}
            <button 
              className={`nav-btn ${isNavItemActive("contacto") ? "active-nav-btn" : ""}`} 
              onClick={() => handleLinkClick("contacto")}
            >
              <i className="fas fa-envelope"></i> Contacto
            </button>
            
            {/* LOGIN/LOGOUT */}
            {!isLoggedIn ? (
              <button 
                className="nav-btn" 
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                <i className="fas fa-user"></i> Iniciar Sesión
              </button>
            ) : (
              <button 
                className="nav-btn" 
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
              </button>
            )}
          </nav>
        </header>

        <main>
          {/* --- 6. VISTA DE "INICIO" --- */}
          {vista === "inicio" && (
            <div className="inicio-container">
              {/* Sección de Noticias (3 columnas) */}
              <section>
                <h2 className="inicio-section-title">Últimas Noticias</h2>
                <div className="inicio-noticias-grid">
                  {noticias.length > 0 ? (
                    noticias.slice(0, 3).map((noticia) => (
                      <div key={noticia.id} className="card">
                        {noticia.imagenUrl && (
                          <img src={noticia.imagenUrl} alt={noticia.titulo} />
                        )}
                        <div className="card-content">
                          <h2>{noticia.titulo}</h2>
                          <p className="noticia-meta">
                            <span className="meta-item">
                              <i className="fas fa-user"></i> {noticia.autor || "Admin"}
                            </span>
                            <span className="meta-item">
                              <i className="fas fa-calendar"></i> {new Date(noticia.fecha).toLocaleDateString("es-AR")}
                            </span>
                          </p>
                          <p>{noticia.contenido.substring(0, 150)}...</p>
                          <a 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClick("noticias");
                            }}
                            className="read-more"
                          >
                            Leer más... <i className="fas fa-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="card" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "2rem" }}>
                      <p style={{ color: "#999" }}>No hay noticias disponibles aún.</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Sección de Datos (Tabla y Calendario) */}
              <section className="inicio-data-grid">
                {/* Columna Izquierda: Tabla */}
                <div className="card">
                  <div className="card-content">
                    <h2>Tabla de Puntuaciones (Resumen)</h2>
                    <div className="table-responsive">
                      <table className="tabla-posiciones" style={{ minWidth: "300px" }}>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Equipo</th>
                          <th>PJ</th>
                          <th>DG</th>
                          <th>Pts</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td className="team-name">Estudiantes</td>
                          <td>3</td>
                          <td>+7</td>
                          <td>6</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td className="team-name">Barracas Central</td>
                          <td>3</td>
                          <td>+5</td>
                          <td>6</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td className="team-name">Central Córdoba</td>
                          <td>3</td>
                          <td>+2</td>
                          <td>5</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td className="team-name">Racing Club</td>
                          <td>3</td>
                          <td>-1</td>
                          <td>3</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td className="team-name">Dep. Punilla</td>
                          <td>3</td>
                          <td>-4</td>
                          <td>1</td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </div>
                </div>
                
                {/* Columna Derecha: Calendario */}
                <div className="card">
                  <div className="card-content">
                    <h2>Calendario</h2>
                    <div className="calendario-item">
                      <strong>Copa Asociación (Finalizado)</strong>
                      <small>Hace 3 días</small>
                      <div className="calendario-partido">
                        <span>Racing Club</span> <strong>3 - 0</strong> <span>Dep. Punilla</span>
                      </div>
                    </div>
                    <div className="calendario-item">
                      <strong>Torneo Apertura (Fecha 4)</strong>
                      <small>En 2 días</small>
                      <div className="calendario-partido">
                        <span>La Cumbre</span> <span className="vs">vs</span> <span>Racing Club</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sección de Sponsors */}
              <section className="sponsors">
                <h2>Nuestros Sponsors</h2>
                <div className="sponsor-logos">
                  <a href="https://www.instagram.com/cristiandiaznailsandmakeup/" target="_blank" rel="noopener noreferrer">
                    <img src="./Cris.jpg" alt="Velez" />
                  </a>
                  <a href="https://www.go7.com.ar/" target="_blank" rel="noopener noreferrer">
                    <img src="/go7-2.png" alt="Go7" />
                  </a>
                  <a href="https://danal.ddfabrica.com/productos/" target="_blank" rel="noopener noreferrer">
                    <img src="./Danal.png" alt="Danal" />
                  </a>
                  <a href="https://www.kempaoficial.com/" target="_blank" rel="noopener noreferrer">
                    <img src="/Kempa.jpg" alt="Kempa" />
                  </a>
                </div>
              </section>
            </div>
          )}
          
          {/* CLUBES - Nueva estructura */}
          {vista === "clubes" && (
            <ClubesListado
              onCrearClick={() => {
                setVista("crear-club");
                setClubIdActual(null);
              }}
              onEditarClick={(id) => {
                setVista("editar-club");
                setClubIdActual(id);
              }}
              onVerClick={(id) => {
                setVista("detalle-club");
                setClubIdActual(id);
              }}
            />
          )}
          
          {vista === "crear-club" && (
            <CrearClub
              onBack={() => {
                setVista("clubes");
                setClubIdActual(null);
              }}
              onSuccess={() => {
                setVista("clubes");
                setClubIdActual(null);
              }}
            />
          )}
          
          {vista === "editar-club" && clubIdActual && (
            <EditarClub
              clubId={clubIdActual}
              onBack={() => {
                setVista("clubes");
                setClubIdActual(null);
              }}
              onSuccess={() => {
                setVista("clubes");
                setClubIdActual(null);
              }}
            />
          )}
          
          {vista === "detalle-club" && clubIdActual && (
            <DetalleClub
              clubId={clubIdActual}
              onBack={() => {
                setVista("clubes");
                setClubIdActual(null);
              }}
              onEdit={(id) => {
                setVista("editar-club");
                setClubIdActual(id);
              }}
            />
          )}
          
          {vista === "jugadores" && <JugadoresPage />}
          {vista === "fixture" && <FixturePage />}
          {vista === "estadisticas" && <EstadisticasPage />}
          
          {/* NOTICIAS - Componente completo con CRUD */}
          {vista === "noticias" && <NoticiasPage />}

          {vista === "contacto" && <Contacto />}
          {vista === "nosotros" && <Nosotros />}
          {vista === "error404" && (
            <Error404 
              onBack={() => {
                setVista("inicio");
              }}
            />
          )}
          
          {/* --- 7. MODIFICACIÓN: Renderizar componentes protegidos solo si hay login --- */}
          {vista === "referentes" && isLoggedIn && <ReferentesPage />}
          {vista === "Pago de Arbitros" && isLoggedIn && <PagosPage />}
          
        </main>

        <footer>
          {/* ... (Tu footer - sin cambios) ... */}
          <div className="footer-contact">
            <div>
              <img src="/whatsapp.png" alt="WhatsApp" /> +54 9 351 273 6990 (Atención Lun a Vie de 09:30 a 12:30 y 16:30 a 21:30, salvo días de partido)
            </div>
            <div>
              <img src="/Instagram.png" alt="Instagram" /> Visitanos tambien en nuestro Instagram <a href="https://www.instagram.com/ligapunillahandball/?igsh=MWdreWJwdmN0NjFtMg%3D%3D#" target="_blank" rel="noopener noreferrer">@ligapunillahandball</a>
            </div>
            <div>&copy; 2025 Liga Recreativa Handball Punilla - Todos los derechos reservados.</div>
          </div>
        </footer>
      </div>

      {/* --- 8. RENDERIZAR EL MODAL CONDICIONALMENTE --- */}
      {isLoginModalOpen && (
        <LoginModal 
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}

