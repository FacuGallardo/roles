import React, { useEffect, useState } from "react";
import FormularioNoticia from "./FormularioNoticia";
import NoticiasLista from "./NoticiasLista";
import CarrouselNoticias from "./CarruselNoticias";
import { hasRole } from "../utils/auth"; 
import "./noticias-responsive.css";
// Tipos
type Noticia = {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  imagenUrl?: string;
};

// Tipo para el formulario
type FormNoticia = Omit<Noticia, 'id'> & { id?: number };

type View = 'formulario' | 'lista' | 'novedades';
const API_URL = 'http://localhost:3001/noticias';

const NoticiasPage: React.FC = () => {
  // 🔒 Permisos
  const esPresidenta = hasRole(['presidenta']);

  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [noticiaAEditar, setNoticiaAEditar] = useState<Noticia | null>(null);
  
  // Vista por defecto: Novedades para todos, Formulario si es Presidenta (opcional)
  const [activeView, setActiveView] = useState<View>('novedades');

  useEffect(() => {
    const cargarNoticias = async () => {
      try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error('Error al cargar noticias');
        const data = await respuesta.json();
        setNoticias(data);
      } catch (error) {
        console.error(error);
        alert('No se pudo conectar al servidor de noticias.');
      }
    };
    cargarNoticias();
  }, []);

  // --- CRUD CON TOKEN (Solo Presidenta debería poder llamar esto) ---
   const handleGuardar = async (nueva: FormNoticia) => {
    if (!esPresidenta) return; 

    try {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(nueva),
      });

      if (!respuesta.ok) throw new Error('Error al guardar la noticia');

      const noticiaGuardada = await respuesta.json();
      setNoticias([noticiaGuardada, ...noticias]);
      setActiveView('lista');
      setNoticiaAEditar(null);
      alert('✅ Noticia publicada correctamente.'); // ← AÑADIR AQUÍ
    } catch (error) {
      console.error(error);
      alert('Error al guardar la noticia.');
    }
  };

  const handleActualizar = async (noticiaActualizada: Noticia) => {
    if (!esPresidenta) return;

    try {
      const respuesta = await fetch(`${API_URL}/${noticiaActualizada.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('token')}` // 🔒 TOKEN
        },
        body: JSON.stringify(noticiaActualizada),
      });

      if (!respuesta.ok) throw new Error('Error al actualizar la noticia');

      const noticiaGuardada = await respuesta.json();
      setNoticias(noticias.map(n => n.id === noticiaGuardada.id ? noticiaGuardada : n));
      setNoticiaAEditar(null); 
      setActiveView('lista'); 
      alert("Noticia actualizada correctamente.");
    } catch (error) {
      console.error(error);
      alert('Error al actualizar la noticia.');
    }
  };

  const eliminarNoticiaAPI = async (id: number) => {
    if (!esPresidenta) return;

    try {
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } // 🔒 TOKEN
      });

      if (!respuesta.ok) throw new Error('Error al eliminar la noticia');

      setNoticias(noticias.filter((n) => n.id !== id));
      if (noticiaAEditar && noticiaAEditar.id === id) {
          setNoticiaAEditar(null);
      }
    } catch (error) {
      console.error(error);
      alert('Error al eliminar la noticia.');
    }
  };

  // Función WRAPPER - Agrega confirmación antes de ejecutar
  const handleEliminar = (id: number) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta noticia?")) return;
    eliminarNoticiaAPI(id);
  };

  const handleEditar = (noticia: Noticia) => {
    setNoticiaAEditar(noticia);
    setActiveView('formulario'); 
  };

  const handleVistaToggle = (view: View) => {
    if (view !== 'formulario') setNoticiaAEditar(null);
    setActiveView(view);
  };

  const handleCancelEdit = () => {
    setNoticiaAEditar(null);
    setActiveView('formulario'); 
  };

  return (
    <div className="noticias-page-container" role="main" aria-label="Portal de Noticias">
      <div className="noticias-content-wrapper">
        <h2 className="noticias-main-title">
            Portal de Noticias y Anuncios
        </h2>

        <div className="noticias-toggle-buttons" role="tablist" aria-label="Vistas de contenido">
            {/* Botón visible para todos */}
            <button
                onClick={() => handleVistaToggle('novedades')} 
                className={activeView === 'novedades' ? 'active' : ''}
                role="tab"
                id="novedades-tab"
                aria-selected={activeView === 'novedades'}
                aria-controls="novedades-panel"
            >
                Últimas Novedades
            </button>

            {/* 🔒 Botones SOLO para Presidenta */}
            {esPresidenta && (
                <>
                    <button
                        onClick={() => handleVistaToggle('formulario')}
                        className={activeView === 'formulario' ? 'active' : ''}
                        role="tab"
                        id="formulario-tab"
                        aria-selected={activeView === 'formulario'}
                        aria-controls="formulario-panel"
                    >
                        Gestión de Noticias
                    </button>
                    <button
                        onClick={() => handleVistaToggle('lista')}
                        className={activeView === 'lista' ? 'active' : ''}
                        role="tab"
                        id="lista-tab"
                        aria-selected={activeView === 'lista'}
                        aria-controls="lista-panel"
                    >
                        Ver Listado
                    </button>
                </>
            )}
        </div>

        {activeView === 'novedades' && (
          <section className="noticias-carrusel-section" id="novedades-panel" role="tabpanel" aria-labelledby="novedades-tab">
            <h3 className="noticias-carrusel-title">
              Últimas Novedades
            </h3>
            <CarrouselNoticias noticias={noticias} />
          </section>
        )}

        {/* 🔒 Sección de gestión solo si es Presidenta */}
        {activeView !== 'novedades' && esPresidenta && (
            <section className="noticias-management-section"> 
                
                {activeView === 'formulario' && (
                    <div className="noticias-formulario-container" id="formulario-panel" role="tabpanel" aria-labelledby="formulario-tab">
                        <h3 className="noticias-form-title">
                            {noticiaAEditar ? 'Editar Noticia Existente' : 'Crear Nueva Noticia'}
                        </h3>
                        <FormularioNoticia 
                            onGuardar={handleGuardar} 
                            onActualizar={handleActualizar}
                            noticiaAEditar={noticiaAEditar}
                            onCancelEdit={handleCancelEdit}
                        />
                    </div>
                )}

                {activeView === 'lista' && (
                    <div className="noticias-lista-container" id="lista-panel" role="tabpanel" aria-labelledby="lista-tab">
                        <h3 className="noticias-list-title">
                            Noticias Publicadas
                        </h3>
                        <NoticiasLista 
                            noticias={noticias} 
                            onEliminar={handleEliminar} 
                            onEditar={handleEditar}
                        />
                    </div>
                )}
            </section>
        )}
      </div>
    </div>
  );
};

export default NoticiasPage;