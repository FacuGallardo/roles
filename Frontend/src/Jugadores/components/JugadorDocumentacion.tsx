// src/Jugadores/components/JugadorDocumentacion.tsx

import React, { useState } from 'react';
import type { Jugador, UpdateJugadorPayload } from '../types/jugador.types';

interface JugadorDocumentacionProps {
  jugador: Jugador;
  onSubmit: (payload: UpdateJugadorPayload) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const JugadorDocumentacion: React.FC<JugadorDocumentacionProps> = ({
  jugador,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    vencimiento: jugador.vencimiento || '',
  });

  const [previewCarnet, setPreviewCarnet] = useState<string | null>(jugador.carnetUrl || null);
  const [previewFichaMedica, setPreviewFichaMedica] = useState<string | null>(jugador.fichaMedicaUrl || null);
  const [newCarnet, setNewCarnet] = useState<string | null>(null);
  const [newFichaMedica, setNewFichaMedica] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, vencimiento: e.target.value });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'carnet' | 'ficha'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamaño (máx 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setError('El archivo no debe exceder 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (type === 'carnet') {
        setNewCarnet(base64);
        setPreviewCarnet(base64);
      } else {
        setNewFichaMedica(base64);
        setPreviewFichaMedica(base64);
      }
      setError(null);
    };
    reader.onerror = () => {
      setError('Error al leer el archivo');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = (type: 'carnet' | 'ficha') => {
    if (type === 'carnet') {
      setNewCarnet(null);
      setPreviewCarnet(null);
    } else {
      setNewFichaMedica(null);
      setPreviewFichaMedica(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload: UpdateJugadorPayload = {
      ...formData,
    };

    // Solo incluir archivos si hay nuevos
    if (newCarnet) {
      payload.carnetUrl = newCarnet;
    }
    if (newFichaMedica) {
      payload.fichaMedicaUrl = newFichaMedica;
    }

    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Documentación del Jugador</h2>

      {error && <div className="error-alert">{error}</div>}

      {/* Fecha de Vencimiento */}
      <div className="form-section">
        <h3 className="form-section-title">Información de Vencimiento</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="vencimiento">Fecha de Vencimiento (Opcional)</label>
            <input
              id="vencimiento"
              name="vencimiento"
              type="date"
              value={formData.vencimiento}
              onChange={handleDateChange}
              disabled={loading}
            />
            <span className="form-helper">Fecha de vencimiento del carnet</span>
          </div>
        </div>
      </div>

      {/* Carnet */}
      <div className="form-section">
        <h3 className="form-section-title">Carnet del Jugador</h3>
        <div className="form-group">
          {previewCarnet && (
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                Carnet actual:
              </p>
              <img
                src={previewCarnet}
                alt="Carnet"
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  borderRadius: '6px',
                  border: '1px solid var(--color-border)',
                }}
              />
              {newCarnet && (
                <button
                  type="button"
                  onClick={() => handleRemoveFile('carnet')}
                  className="btn secondary"
                  style={{ marginTop: '0.5rem' }}
                  disabled={loading}
                >
                  Remover nuevo archivo
                </button>
              )}
            </div>
          )}
          <label htmlFor="carnet">
            {previewCarnet && !newCarnet ? 'Cambiar Carnet' : 'Subir Carnet'}
          </label>
          <input
            id="carnet"
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => handleFileChange(e, 'carnet')}
            disabled={loading}
          />
          <span className="form-helper">Formatos: JPG, PNG, PDF. Máximo 5MB</span>
        </div>
      </div>

      {/* Ficha Médica */}
      <div className="form-section">
        <h3 className="form-section-title">Ficha Médica</h3>
        <div className="form-group">
          {previewFichaMedica && (
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                Ficha médica actual:
              </p>
              <img
                src={previewFichaMedica}
                alt="Ficha Médica"
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  borderRadius: '6px',
                  border: '1px solid var(--color-border)',
                }}
              />
              {newFichaMedica && (
                <button
                  type="button"
                  onClick={() => handleRemoveFile('ficha')}
                  className="btn secondary"
                  style={{ marginTop: '0.5rem' }}
                  disabled={loading}
                >
                  Remover nuevo archivo
                </button>
              )}
            </div>
          )}
          <label htmlFor="ficha">
            {previewFichaMedica && !newFichaMedica ? 'Cambiar Ficha Médica' : 'Subir Ficha Médica'}
          </label>
          <input
            id="ficha"
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => handleFileChange(e, 'ficha')}
            disabled={loading}
          />
          <span className="form-helper">Formatos: JPG, PNG, PDF. Máximo 5MB</span>
        </div>
      </div>

      {/* Botones */}
      <div className="button-group">
        <button type="submit" className="btn primary" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Documentación'}
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
