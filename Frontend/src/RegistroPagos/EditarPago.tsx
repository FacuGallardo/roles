import React, { useState } from 'react';

interface Props {
  pagoId: number;
  pagoActual: any;
  onGuardar: (updateData: any) => void;
  onCancelar: () => void;
}

const EditarPago: React.FC<Props> = ({
  pagoId,
  pagoActual,
  onGuardar,
  onCancelar,
}) => {
  const [form, setForm] = useState({
    monto: pagoActual.monto,
    estado: pagoActual.estado,
    metodo_pago: pagoActual.metodo_pago || '',
    numero_transaccion: pagoActual.numero_transaccion || '',
    observaciones: pagoActual.observaciones || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'monto' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar(form);
  };

  return (
    <div className="modal-overlay" onClick={onCancelar}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="form-title">Editar Pago #{pagoId}</h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label htmlFor="monto">Monto</label>
            <input
              id="monto"
              type="number"
              name="monto"
              value={form.monto}
              onChange={handleChange}
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="estado">
              Estado <span className="required">*</span>
            </label>
            <select
              id="estado"
              name="estado"
              value={form.estado}
              onChange={handleChange}
              required
            >
              <option value="pendiente">Pendiente</option>
              <option value="pagado">Pagado</option>
              <option value="validado">Validado</option>
              <option value="invalido">Inválido</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="metodo_pago">Método de Pago</label>
            <select
              id="metodo_pago"
              name="metodo_pago"
              value={form.metodo_pago}
              onChange={handleChange}
            >
              <option value="">Selecciona...</option>
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="cheque">Cheque</option>
              <option value="tarjeta">Tarjeta</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="numero_transaccion">Número de Transacción</label>
            <input
              id="numero_transaccion"
              type="text"
              name="numero_transaccion"
              value={form.numero_transaccion}
              onChange={handleChange}
              placeholder="Ej: CVU, Referencia, etc"
            />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="observaciones">Observaciones</label>
            <textarea
              id="observaciones"
              name="observaciones"
              value={form.observaciones}
              onChange={handleChange}
              placeholder="Notas adicionales..."
            />
          </div>

          <div className="button-group" style={{ gridColumn: '1 / -1' }}>
            <button type="button" className="btn secondary" onClick={onCancelar}>
              Cancelar
            </button>
            <button type="submit" className="btn primary">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarPago;
