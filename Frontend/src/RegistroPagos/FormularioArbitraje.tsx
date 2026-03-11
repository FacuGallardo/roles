import React, { useState } from 'react';

interface Partido {
  id: number;
  jornada: number;
  club1: string;
  club2: string;
}

interface Props {
  clubId: number;
  clubNombre: string;
  partidos: Partido[];
  montoMinimo: number;
  onGuardar: (pago: any) => void;
  onCerrar: () => void;
}

const FormularioArbitraje: React.FC<Props> = ({
  clubId,
  clubNombre,
  partidos,
  montoMinimo,
  onGuardar,
  onCerrar,
}) => {
  const [form, setForm] = useState({
    tipo: 'arbitraje',
    clubId,
    monto: montoMinimo,
    categoria: 'Masculino',
    partidoId: '',
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
    if (!form.partidoId) {
      alert('Selecciona un partido');
      return;
    }
    onGuardar({
      ...form,
      partidoId: Number(form.partidoId),
    });
    onCerrar();
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="form-title">Arbitraje - {clubNombre}</h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label htmlFor="partidoId">
              Partido <span className="required">*</span>
            </label>
            <select
              id="partidoId"
              name="partidoId"
              value={form.partidoId}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un partido...</option>
              {partidos.map(p => (
                <option key={p.id} value={p.id}>
                  Jornada {p.jornada}: {p.club1} vs {p.club2}
                </option>
              ))}
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
            </select>
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
              Guardar Arbitraje
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioArbitraje;
