// src/Jugadores/components/ConfirmDelete.tsx

import React from 'react';

interface ConfirmDeleteProps {
  nombre: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  nombre,
  onConfirm,
  onCancel,
  loading = false,
}) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Confirmar Eliminación</h3>
        <p className="modal-message">
          ¿Estás seguro de que deseas eliminar a <strong>{nombre}</strong>? Esta acción no se puede deshacer.
        </p>
        <div className="modal-actions">
          <button className="btn secondary" onClick={onCancel} disabled={loading}>
            Cancelar
          </button>
          <button className="btn danger" onClick={onConfirm} disabled={loading}>
            {loading ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
};
