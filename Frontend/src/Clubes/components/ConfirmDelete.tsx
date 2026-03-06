// src/Clubes/components/ConfirmDelete.tsx

import React from "react";

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
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Confirmar Eliminación</h2>
          <button
            className="modal-close"
            onClick={onCancel}
            disabled={loading}
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <p>
            ¿Estás seguro que deseas eliminar el club{" "}
            <strong>{nombre}</strong>?
          </p>
          <p className="warning-text">Esta acción no se puede deshacer.</p>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Eliminando..." : "Eliminar Club"}
          </button>
        </div>
      </div>
    </div>
  );
};
