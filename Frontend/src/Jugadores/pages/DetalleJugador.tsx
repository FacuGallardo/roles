// src/Jugadores/pages/DetalleJugador.tsx

import React, { useState } from 'react';
import { JugadorHeader, ConfirmDelete } from '../components';
import type { Jugador } from '../types/jugador.types';
import { getStatusLabel } from '../utils/jugadorValidations';

interface DetalleJugadorProps {
  jugador: Jugador;
  onEditar: () => void;
  onEliminar: (id: number) => void;
  onVolver: () => void;
}

export const DetalleJugador: React.FC<DetalleJugadorProps> = ({
  jugador,
  onEditar,
  onEliminar,
  onVolver,
}) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirmDelete = async () => {
    setLoading(true);
    await onEliminar(jugador.id);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={onVolver}
        style={{
          marginBottom: '1.5rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: 'transparent',
          border: '2px solid #1f3c88',
          color: '#1f3c88',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <i className="fas fa-arrow-left"></i> Volver
      </button>

      <JugadorHeader jugador={jugador} />

      {/* Información Personal */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 className="form-section-title">Información Personal</h3>
        <div className="card-content">
          <div className="card-row">
            <span className="card-label">DNI:</span>
            <span className="card-value">{jugador.dni}</span>
          </div>
          {jugador.telefono && (
            <div className="card-row">
              <span className="card-label">Teléfono:</span>
              <span className="card-value">{jugador.telefono}</span>
            </div>
          )}
        </div>
      </div>

      {/* Información Deportiva */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 className="form-section-title">Información Deportiva</h3>
        <div className="card-content">
          {jugador.dorsal && (
            <div className="card-row">
              <span className="card-label">Dorsal:</span>
              <span className="card-value"># {jugador.dorsal}</span>
            </div>
          )}
          {jugador.posicion && (
            <div className="card-row">
              <span className="card-label">Posición:</span>
              <span className="card-value">{jugador.posicion}</span>
            </div>
          )}
          <div className="card-row">
            <span className="card-label">Club:</span>
            <span className="card-value">{jugador.club?.nombre}</span>
          </div>
          <div className="card-row">
            <span className="card-label">Categoría:</span>
            <span className="card-value">{jugador.categoria}</span>
          </div>
          <div className="card-row">
            <span className="card-label">Estado:</span>
            <span
              className={`status-pill status-${(jugador.estado || 'activo').toLowerCase()}`}
              style={{ display: 'inline-block' }}
            >
              {getStatusLabel(jugador.estado)}
            </span>
          </div>
        </div>
      </div>

      {/* Documentación */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 className="form-section-title">Documentación</h3>
        <div className="card-content">
          {jugador.vencimiento && (
            <div className="card-row">
              <span className="card-label">Vencimiento:</span>
              <span className="card-value">
                {new Date(jugador.vencimiento).toLocaleDateString()}
              </span>
            </div>
          )}
          {jugador.carnetUrl && (
            <div className="card-row">
              <span className="card-label">Carnet:</span>
              <div
                style={{
                  marginTop: '0.5rem',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  maxWidth: '200px',
                }}
              >
                <img
                  src={jugador.carnetUrl}
                  alt="Carnet"
                  style={{ width: '100%', height: 'auto', borderRadius: '6px' }}
                />
              </div>
            </div>
          )}
          {jugador.fichaMedicaUrl && (
            <div className="card-row">
              <span className="card-label">Ficha Médica:</span>
              <div
                style={{
                  marginTop: '0.5rem',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  maxWidth: '200px',
                }}
              >
                <img
                  src={jugador.fichaMedicaUrl}
                  alt="Ficha Médica"
                  style={{ width: '100%', height: 'auto', borderRadius: '6px' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Acciones */}
      <div className="button-group" style={{ marginTop: '2rem' }}>
        <button onClick={onEditar} className="btn primary">
          <i className="fas fa-edit"></i> Editar
        </button>
        <button
          onClick={() => setDeleteConfirm(true)}
          className="btn danger"
        >
          <i className="fas fa-trash"></i> Eliminar
        </button>
        <button onClick={onVolver} className="btn secondary">
          <i className="fas fa-arrow-left"></i> Volver
        </button>
      </div>

      {/* Modal de confirmación */}
      {deleteConfirm && (
        <ConfirmDelete
          nombre={`${jugador.nombre} ${jugador.apellido}`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteConfirm(false)}
          loading={loading}
        />
      )}
    </>
  );
};
