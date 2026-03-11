import React from 'react';

interface Pago {
  id: number;
  tipo: string;
  clubId: number;
  monto: number;
  fecha: string;
  estado: string;
  metodo_pago?: string;
  numero_transaccion?: string;
  observaciones?: string;
}

interface Props {
  pago: Pago;
}

const RegistroPago: React.FC<Props> = ({ pago }) => {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Pago #{pago.id}</h2>
        <span className={`status-pill status-${pago.estado}`}>
          {pago.estado}
        </span>
      </div>

      <div className="card-content">
        <div className="card-row">
          <div className="card-label">Tipo</div>
          <div className="card-value badge">{pago.tipo}</div>
        </div>

        <div className="card-row">
          <div className="card-label">Monto</div>
          <div className="card-value">${pago.monto.toFixed(2)}</div>
        </div>

        <div className="card-row">
          <div className="card-label">Fecha</div>
          <div className="card-value">{formatDate(pago.fecha)}</div>
        </div>

        {pago.metodo_pago && (
          <div className="card-row">
            <div className="card-label">Método</div>
            <div className="card-value">{pago.metodo_pago}</div>
          </div>
        )}

        {pago.numero_transaccion && (
          <div className="card-row">
            <div className="card-label">Transacción</div>
            <div className="card-value">{pago.numero_transaccion}</div>
          </div>
        )}

        {pago.observaciones && (
          <div className="card-row">
            <div className="card-label">Observaciones</div>
            <div className="card-value">{pago.observaciones}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistroPago;
