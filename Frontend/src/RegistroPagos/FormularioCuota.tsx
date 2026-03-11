import React, { useState } from 'react';

interface Props {
  clubId: number;
  clubNombre: string;
  montoMinimo: number;
  onGuardar: (pago: any) => void;
  onCerrar: () => void;
}

const FormularioCuota: React.FC<Props> = ({
  clubId,
  clubNombre,
  montoMinimo,
  onGuardar,
  onCerrar,
}) => {
  const [form, setForm] = useState({
    tipo: 'cuota',
    clubId,
    monto: montoMinimo,
    categoria: 'Masculino',
    cantidadJugadores: 1,
    observaciones: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]:
        name === 'monto' || name === 'cantidadJugadores'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.monto < montoMinimo) {
      alert(`Monto mínimo: $${montoMinimo}`);
      return;
    }
    onGuardar(form);
    onCerrar();
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="form-title">Cuota Annual - {clubNombre}</h2>

        <form onSubmit={handleSubmit} className="form-grid">
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

          <div className="form-group">
            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Ambos">Ambos</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cantidadJugadores">Cantidad de Jugadores</label>
            <input
              id="cantidadJugadores"
              type="number"
              name="cantidadJugadores"
              value={form.cantidadJugadores}
              onChange={handleChange}
              min="1"
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
            <button type="button" className="btn secondary" onClick={onCerrar}>
              Cancelar
            </button>
            <button type="submit" className="btn primary">
              Guardar Cuota
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioCuota;
