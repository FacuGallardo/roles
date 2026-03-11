import React from 'react';
import type { Pago, Club } from './types';

interface Props {
  clubes: Club[];
  pagos: Pago[];
  canCreate: boolean;
  onCrearPago: (pago: Omit<Pago, 'id'>) => void;
}

const TablaPagosClub: React.FC<Props> = ({
  clubes,
  pagos,
  canCreate,
  onCrearPago,
}) => {
  const tiposTabla = [
    { tipo: 'cuota', label: 'Cuota Anual' },
    { tipo: 'arbitraje', label: 'Arbitraje' },
  ];

  const getPaymentCount = (clubId: number, tipo: string) =>
    pagos.filter(p => p.clubId === clubId && p.tipo === tipo).length;

  const getTotalAmount = (clubId: number, tipo: string) =>
    pagos
      .filter(p => p.clubId === clubId && p.tipo === tipo)
      .reduce((sum, p) => sum + p.monto, 0);

  const handleCrearPago = (clubId: number, tipo: string) => {
    if (!canCreate) {
      alert('No tienes permiso para crear pagos');
      return;
    }
    // Crear pago base mínimo y pasar al padre
    const nuevoPago: Omit<Pago, 'id'> = {
      tipo: tipo as any,
      concepto: '',
      clubId,
      monto: 0,
      fecha: new Date().toISOString().split('T')[0],
      estado: 'pendiente',
    };
    onCrearPago(nuevoPago);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Resumen de Pagos por Club</h2>
      </div>

      <div className="table-container">
        <table className="pagos-table">
          <thead className="table-header">
            <tr>
              <th>Club</th>
              {tiposTabla.map(t => (
                <th key={t.tipo} style={{ textAlign: 'center' }}>
                  {t.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clubes.map(club => (
              <tr key={club.id} className="table-row">
                <td data-label="Club">{club.nombre}</td>
                {tiposTabla.map(t => (
                  <td
                    key={`${club.id}-${t.tipo}`}
                    data-label={t.label}
                    style={{ textAlign: 'center' }}
                  >
                    <div className="gap-2">
                      <span className="badge">
                        {getPaymentCount(club.id, t.tipo)}
                      </span>
                      <span className="text-secondary">
                        ${getTotalAmount(club.id, t.tipo).toFixed(2)}
                      </span>
                      {canCreate && (
                        <button
                          className="btn primary"
                          onClick={() => handleCrearPago(club.id, t.tipo)}
                          style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                        >
                          +
                        </button>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaPagosClub;
