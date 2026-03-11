import React from 'react';

interface Pago {
  id: number;
  tipo: string;
  clubId: number;
  monto: number;
  fecha: string;
  estado: string;
}

interface Props {
  pagos: Pago[];
}

const ListaPagos: React.FC<Props> = ({ pagos }) => {
  const getStatusClass = (status: string) => `status-pill status-${status}`;

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Lista de Pagos Recientes</h2>
        <span className="badge">{pagos.length}</span>
      </div>

      <div className="card-content">
        {pagos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <div className="empty-state-title">Sin pagos</div>
            <div className="empty-state-message">No hay pagos registrados</div>
          </div>
        ) : (
          pagos.slice(0, 10).map(pago => (
            <div key={pago.id} className="card-row">
              <div className="card-label">
                Pago #{pago.id} - {pago.tipo.toUpperCase()}
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span>${pago.monto.toFixed(2)}</span>
                <span className={getStatusClass(pago.estado)}>
                  {pago.estado}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListaPagos;
