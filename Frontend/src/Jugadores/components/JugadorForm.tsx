
import React, { useEffect, useState } from 'react';
import type { Jugador, CreateJugadorPayload, JugadorFormMode, Club } from '../types/jugador.types';
import { validarJugador } from '../utils/jugadorValidations';

interface JugadorFormProps {
  mode: JugadorFormMode;
  jugador?: Jugador;
  clubes: Club[];
  onSubmit: (payload: CreateJugadorPayload) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const POSICIONES = [
  'Portero',
  'Extremo Izquierdo',
  'Extremo Derecho',
  'Lateral Izquierdo',
  'Lateral Derecho',
  'Pivote',
];

const CATEGORIAS = ['Masculino', 'Femenino'];

const ESTADOS = ['activo', 'lesionado', 'sancionado', 'inactivo'];

export const JugadorForm: React.FC<JugadorFormProps> = ({
  mode,
  jugador,
  clubes,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState<CreateJugadorPayload>({
    nombre: '',
    apellido: '',
    dni: '',
    clubId: 0,
    categoria: '',
    telefono: '',
    vencimiento: '',
    dorsal: undefined,
    posicion: '',
    estado: 'activo',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mode === 'edit' && jugador) {
      setFormData({
        nombre: jugador.nombre,
        apellido: jugador.apellido,
        dni: jugador.dni,
        clubId: jugador.clubId,
        categoria: jugador.categoria,
        telefono: jugador.telefono || '',
        vencimiento: jugador.vencimiento || '',
        dorsal: jugador.dorsal,
        posicion: jugador.posicion || '',
        carnetUrl: jugador.carnetUrl,
        fichaMedicaUrl: jugador.fichaMedicaUrl,
        observacion: jugador.observacion || '',
        estado: jugador.estado || 'activo',
      });
    }
  }, [mode, jugador]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Limpiar error del campo
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'clubId' || name === 'dorsal'
          ? value === ''
            ? undefined
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar
    const validationErrors = validarJugador(formData);
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return;
    }

    setErrors({});
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">
        {mode === 'create' ? 'Registrar Nuevo Jugador' : 'Editar Jugador'}
      </h2>

      {/* SECCIÓN 1: Datos Personales */}
      <div className="form-section">
        <h3 className="form-section-title">Datos Personales</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="nombre">
              Nombre <span className="required">*</span>
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Juan"
              disabled={loading}
            />
            {errors.nombre && <span className="form-error">{errors.nombre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="apellido">
              Apellido <span className="required">*</span>
            </label>
            <input
              id="apellido"
              name="apellido"
              type="text"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Ej: García López"
              disabled={loading}
            />
            {errors.apellido && <span className="form-error">{errors.apellido}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="dni">
              DNI <span className="required">*</span>
            </label>
            <input
              id="dni"
              name="dni"
              type="text"
              value={formData.dni}
              onChange={handleChange}
              placeholder="Ej: 12345678"
              disabled={loading}
              inputMode="numeric"
            />
            {errors.dni && <span className="form-error">{errors.dni}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono (Opcional)</label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ej: +54 351 1234567"
              disabled={loading}
              inputMode="tel"
            />
            {errors.telefono && <span className="form-error">{errors.telefono}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="vencimiento">Fecha de Vencimiento (Opcional)</label>
            <input
              id="vencimiento"
              name="vencimiento"
              type="date"
              value={formData.vencimiento}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.vencimiento && <span className="form-error">{errors.vencimiento}</span>}
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: Información Deportiva */}
      <div className="form-section">
        <h3 className="form-section-title">Información Deportiva</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="clubId">
              Club <span className="required">*</span>
            </label>
            <select
              id="clubId"
              name="clubId"
              value={formData.clubId || ''}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">-- Seleccionar club --</option>
              {clubes.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.nombre}
                </option>
              ))}
            </select>
            {errors.clubId && <span className="form-error">{errors.clubId}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="categoria">
              Categoría <span className="required">*</span>
            </label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">-- Seleccionar categoría --</option>
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.categoria && <span className="form-error">{errors.categoria}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="dorsal">
              Dorsal <span className="required">*</span>
            </label>
            <input
              id="dorsal"
              name="dorsal"
              type="number"
              min="1"
              max="99"
              value={formData.dorsal || ''}
              onChange={handleChange}
              placeholder="Ej: 7"
              disabled={loading}
              inputMode="numeric"
            />
            {errors.dorsal && <span className="form-error">{errors.dorsal}</span>}
            <span className="form-helper">Número entre 1 y 99</span>
          </div>

          <div className="form-group">
            <label htmlFor="posicion">
              Posición <span className="required">*</span>
            </label>
            <select
              id="posicion"
              name="posicion"
              value={formData.posicion}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">-- Seleccionar posición --</option>
              {POSICIONES.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
            {errors.posicion && <span className="form-error">{errors.posicion}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="estado">
              Estado <span className="required">*</span>
            </label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              disabled={loading}
            >
              {ESTADOS.map((state) => (
                <option key={state} value={state}>
                  {state.charAt(0).toUpperCase() + state.slice(1)}
                </option>
              ))}
            </select>
            {errors.estado && <span className="form-error">{errors.estado}</span>}
          </div>
        </div>
      </div>

      {/* SECCIÓN 3: Observaciones (Comentado hasta agregar a BD) */}
      <div className="form-section form-group hidden">
        <label htmlFor="observacion">Observaciones</label>
        <textarea
          id="observacion"
          name="observacion"
          value={formData.observacion || ''}
          onChange={handleChange}
          placeholder="Notas internas sobre el jugador..."
          disabled={loading}
        />
        {errors.observacion && <span className="form-error">{errors.observacion}</span>}
      </div>

      {/* Botones */}
      <div className="button-group">
        <button
          type="submit"
          className="btn primary"
          disabled={loading}
        >
          {loading ? 'Guardando...' : mode === 'create' ? 'Registrar Jugador' : 'Actualizar Datos'}
        </button>
        <button
          type="button"
          className="btn secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
