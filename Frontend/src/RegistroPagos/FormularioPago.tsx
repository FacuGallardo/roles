import React, { useState } from 'react';

interface Props {
  clubId: number;
  clubNombre: string;
  montoMinimo: number;
  onGuardar: (pago: any) => void;
  onCerrar: () => void;
}

const FormularioPago: React.FC<Props> = ({
  clubId,
  clubNombre,
  montoMinimo,
  onGuardar,
  onCerrar,
}) => {
  const [tipo, setTipo] = useState<'cuota' | 'arbitraje' | 'multa' | 'otro'>('cuota');
  const [form, setForm] = useState({
    monto: montoMinimo,
    motivo: '',
    observaciones: '',
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
    if (form.monto < montoMinimo) {
      alert(`Monto mínimo: $${montoMinimo}`);
      return;
    }

    const pago: any = {
      tipo,
      clubId,
      monto: form.monto,
      estado: 'pendiente',
      observaciones: form.observaciones,
    };

    if ((tipo === 'multa' || tipo === 'otro') && form.motivo) {
      pago.motivo = form.motivo;
    }

    onGuardar(pago);
    onCerrar();
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="form-title">Nuevo Pago - {clubNombre}</h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label htmlFor="tipo">
              Tipo de Pago <span className="required">*</span>
            </label>
            <select
              id="tipo"
              value={tipo}
              onChange={e => setTipo(e.target.value as any)}
            >
              <option value="cuota">Cuota Anual</option>
              <option value="arbitraje">Arbitraje</option>
              <option value="multa">Multa</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="monto">
              Monto <span className="required">*</span>
            </label>
            <input
              id="monto"
              type="number"
              name="monto"
              value={form.monto}
              onChange={handleChange}
              min={montoMinimo}
              step="0.01"
              required
            />
            <div className="form-helper">Mínimo: ${montoMinimo}</div>
          </div>

          {(tipo === 'multa' || tipo === 'otro') && (
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="motivo">Motivo</label>
              <input
                id="motivo"
                type="text"
                name="motivo"
                value={form.motivo}
                onChange={handleChange}
                placeholder="Motivo de la multa o pago..."
              />
            </div>
          )}

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
            <button type="button" className="btn secondary" onClick={onCerrar}>
              Cancelar
            </button>
            <button type="submit" className="btn primary">
              Guardar Pago
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioPago;
