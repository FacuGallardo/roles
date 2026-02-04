import React, { useState } from "react";
import FormularioDatos from "./FormularioDatos"; 
import FormularioDocumentacion from "./FormularioDocumentacion";
import { hasRole } from "../utils/auth";
import './jugadores-responsive.css';

// Definición local
type Jugador = {
    estado?: string;
    id: number;
    nombre: string;
    apellido: string;
    dni: string;
    clubId: number;
    club: { id: number, nombre: string }; // Ajuste de tipo
    categoria: string;
    telefono?: string;
    vencimiento?: string;
    carnetUrl?: string;
    fichaMedicaUrl?: string;
};

type Props = {
    jugador: Jugador;
    onActualizar: (jugador: any) => void;
    onEliminar: (id: number) => void;
    // 🔒 Nuevos props
    permisoEditar: boolean;
    permisoEliminar: boolean;
    onVolver: () => void;
};

const VerJugadores: React.FC<Props> = ({ 
    jugador, onActualizar, onEliminar, 
    permisoEditar, permisoEliminar, onVolver 
}) => {
    const puedeVerDatos = hasRole(['presidenta', 'referente']);
    
    const [editandoDatos, setEditandoDatos] = useState(false);
    const [editandoDocs, setEditandoDocs] = useState(false);

    const handleGuardarDatos = (j: any) => {
        onActualizar(j);
        setEditandoDatos(false);
    };
    
    const handleGuardarDocs = (j: any) => {
        onActualizar(j);
        setEditandoDocs(false);
    };

    const handleEliminar = () => {
        if (window.confirm(`¿Eliminar a ${jugador.nombre}?`)) {
            onEliminar(jugador.id);
        }
    };

    const getStatusClass = (estado?: string) => {
        return `status-pill status-${(estado || "activo").toLowerCase()}`;
    };

    return (
        <div className="player-card" role="region" aria-label={`Ficha de ${jugador.nombre} ${jugador.apellido}`}>
            <button onClick={onVolver} className="btn-volver" style={{marginBottom: '12px'}}>← Volver</button>

            <h3 className="player-name" style={{margin:0, marginBottom:8}}>{jugador.nombre} {jugador.apellido}</h3>

            <div className="player-info-list">
              <p className="player-info"><strong>Club:</strong> {jugador.club?.nombre}</p>
              {puedeVerDatos && <p className="player-info"><strong>DNI:</strong> {jugador.dni}</p>}
              <p className="player-info">
                <strong>Estado:</strong> 
                <span className={getStatusClass(jugador.estado)} style={{marginLeft:8}}>{jugador.estado || 'activo'}</span>
              </p>
              <p className="player-info"><strong>Categoría:</strong> {jugador.categoria}</p>
              {puedeVerDatos && jugador.telefono && <p className="player-info"><strong>Teléfono:</strong> {jugador.telefono}</p>}
              {puedeVerDatos && jugador.vencimiento && <p className="player-info"><strong>Vencimiento:</strong> {jugador.vencimiento}</p>}
            </div>

            {/* previsualización de carnet si existe */}
           {jugador.carnetUrl && (
              <div className="file-preview" style={{marginTop:12}}>
                <img src={jugador.carnetUrl} alt={`Carnet de ${jugador.nombre}`} />
                <button 
                  className="document-link"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = jugador.carnetUrl!;
                    link.download = `carnet-${jugador.nombre}-${jugador.apellido}.png`;
                    link.click();
                  }}
                  style={{
                    background: '#1f3c88',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '8px',
                    display: 'block',
                    width: '100%',
                    textAlign: 'center',
                    fontWeight: '600'
                  }}
                >
                  Descargar Carnet
                </button>
              </div>
            )}

            {/* acciones adaptadas a móvil: apiladas y táctiles */}
            <div className="action-buttons-container" style={{marginTop:12}}>
                {permisoEditar && (
                  <button className="btn-action btn-primary" onClick={() => setEditandoDatos(true)}>Editar Datos</button>
                )}
                {permisoEditar && (
                  <button className="btn-action btn-primary" onClick={() => setEditandoDocs(true)}>Editar Docs</button>
                )}
                {permisoEliminar && (
                  <button className="btn-action btn-delete" onClick={handleEliminar}>Eliminar</button>
                )}
            </div>

            {/* Subformularios en línea (mantengo la lógica, los formularios reutilizan los componentes ya existentes) */}
            {editandoDatos && (
              <div style={{marginTop:12}}>
                <FormularioDatos jugador={jugador as any} onGuardar={handleGuardarDatos} onCancelar={() => setEditandoDatos(false)} jugadores={[]} />
              </div>
            )}

            {editandoDocs && (
              <div style={{marginTop:12}}>
                <FormularioDocumentacion jugadorInfo={jugador as any} onGuardar={(docs) => handleGuardarDocs({...jugador, ...docs})} onCancelar={() => setEditandoDocs(false)} />
              </div>
            )}
        </div>
    );
};

export default VerJugadores;
