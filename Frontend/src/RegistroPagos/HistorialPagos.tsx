import React from 'react';
import type { Pago, Club } from './types';

interface Props {
  pagos: Pago[];
  clubes: Club[];
  canEdit: boolean;
  canDelete: boolean;
  onEditar: (pago: Pago | null) => void;
  onActualizar: (pagoId: number, updateData: Partial<Pago>) => void;
  onEliminar: (pagoId: number) => void;
  editingPago: Pago | null;
}

const HistorialPagos: React.FC<Props> = ({
  pagos,
  clubes,
  canEdit,
  canDelete,
  onEditar,
  onActualizar,
  onEliminar,
  editingPago,
}) => {
  const getStatusClass = (status: string) => `status-pill status-${status}`;
  const getClubName = (clubId: number) =>
    clubes.find(c => c.id === clubId)?.nombre || `Club #${clubId}`;

  const handleStatusChange = (pagoId: number, newStatus: string) => {
    onActualizar(pagoId, { estado: newStatus as Pago['estado'] });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Historial de Pagos</h2>
        <span className="badge">{pagos.length} pagos</span>
      </div>

      <div className="table-container">
        {pagos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <div className="empty-state-title">Sin pagos registrados</div>
            <div className="empty-state-message">No hay pagos para mostrar</div>
          </div>
        ) : (
          <table className="pagos-table">
            <thead className="table-header">
              <tr>
                <th>Club</th>
                <th>Tipo</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Estado</th>
                {(canEdit || canDelete) && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {pagos.map(pago => (
                <tr key={pago.id} className="table-row">
                  <td data-label="Club">{getClubName(pago.clubId)}</td>
                  <td data-label="Tipo">
                    <span className="badge">{pago.tipo}</span>
                  </td>
                  <td data-label="Monto">${pago.monto.toFixed(2)}</td>
                  <td data-label="Fecha">
                    {new Date(pago.fecha).toLocaleDateString('es-AR')}
                  </td>
                  <td data-label="Estado">
                    <span className={getStatusClass(pago.estado)}>
                      {pago.estado}
                    </span>
                  </td>
                  {(canEdit || canDelete) && (
                    <td data-label="Acciones" className="actions-cell">
                      {canEdit && (
                        <button
                          className="action-btn edit"
                          onClick={() => onEditar(pago)}
                          title="Editar"
                        >
                          ✎
                        </button>
                      )}
                      {canDelete && (
                        <button
                          className="action-btn delete"
                          onClick={() => onEliminar(pago.id)}
                          title="Eliminar"
                        >
                          🗑
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal de edición */}
      {editingPago && (
        <div className="modal-overlay" onClick={() => onEditar(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Editar Pago #{editingPago.id}</div>
            <div className="card-content">
              <div className="card-row">
                <div className="card-label">Estado</div>
                <select
                  className="filter-select"
                  value={editingPago.estado}
                  onChange={e =>
                    handleStatusChange(editingPago.id, e.target.value)
                  }
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="pagado">Pagado</option>
                  <option value="validado">Validado</option>
                  <option value="invalido">Inválido</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn secondary"
                onClick={() => onEditar(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialPagos;
