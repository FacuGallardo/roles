// src/Jugadores/components/JugadorHeader.tsx

import React from 'react';
import type { Jugador } from '../types/jugador.types';
import { getStatusLabel } from '../utils/jugadorValidations';

interface JugadorHeaderProps {
  jugador: Jugador;
}

export const JugadorHeader: React.FC<JugadorHeaderProps> = ({ jugador }) => {
  const statusColor =
    jugador.estado?.toLowerCase() === 'activo' ? '#059669' :
    jugador.estado?.toLowerCase() === 'lesionado' ? '#f59e0b' :
    jugador.estado?.toLowerCase() === 'sancionado' ? '#ef4444' : '#6b7280';

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">{jugador.nombre} {jugador.apellido}</h2>
          <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280', fontSize: '0.9rem' }}>
            DNI: {jugador.dni}
          </p>
        </div>
        <div
          style={{
            backgroundColor: statusColor,
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
          }}
        >
          {getStatusLabel(jugador.estado)}
        </div>
      </div>

      <div className="card-content">
        <div className="card-row">
          <span className="card-label">Club:</span>
          <span className="card-value">{jugador.club?.nombre || 'Sin asignar'}</span>
        </div>

        <div className="card-row">
          <span className="card-label">Categoría:</span>
          <span className="card-value">{jugador.categoria}</span>
        </div>

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

        {jugador.telefono && (
          <div className="card-row">
            <span className="card-label">Teléfono:</span>
            <span className="card-value">{jugador.telefono}</span>
          </div>
        )}

        {jugador.vencimiento && (
          <div className="card-row">
            <span className="card-label">Vencimiento:</span>
            <span className="card-value">
              {new Date(jugador.vencimiento).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
