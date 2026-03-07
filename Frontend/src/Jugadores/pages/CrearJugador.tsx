// src/Jugadores/pages/CrearJugador.tsx

import React, { useState } from 'react';
import { JugadorForm, JugadorDocumentacion } from '../components';
import type { Club, CreateJugadorPayload, UpdateJugadorPayload } from '../types/jugador.types';

interface CrearJugadorProps {
  clubes: Club[];
  loading: boolean;
  onCrear: (payload: CreateJugadorPayload) => Promise<void>;
  onCancel: () => void;
}

type Paso = 'datos' | 'documentacion';

export const CrearJugador: React.FC<CrearJugadorProps> = ({
  clubes,
  loading,
  onCrear,
  onCancel,
}) => {
  const [paso, setPaso] = useState<Paso>('datos');
  const [datosTemporales, setDatosTemporales] = useState<CreateJugadorPayload | null>(null);

  const handleDatos = async (payload: CreateJugadorPayload) => {
    setDatosTemporales(payload);
    setPaso('documentacion');
  };

  const handleDocumentacion = async (payload: UpdateJugadorPayload) => {
    if (!datosTemporales) return;
    const payloadCompleto = { ...datosTemporales, ...payload };
    await onCrear(payloadCompleto);
  };

  const handleVolver = () => {
    if (paso === 'documentacion') {
      setPaso('datos');
    } else {
      onCancel();
    }
  };

  return (
    <>
      <div className="jugador-header">
        <div className="jugador-header-content">
          <h1>Registrar Nuevo Jugador</h1>
          <p>Completa los datos del jugador {paso === 'documentacion' ? '(Paso 2 de 2)' : '(Paso 1 de 2)'}</p>
        </div>
      </div>

      {/* Indicador de pasos */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            opacity: paso === 'datos' ? 1 : 0.6,
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: paso === 'datos' ? '#1f3c88' : '#059669',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
            }}
          >
            1
          </div>
          <span style={{ fontWeight: '600' }}>Datos Personales</span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '32px',
            width: '2rem',
            opacity: paso === 'datos' ? 0.3 : 1,
          }}
        >
          →
        </div>

        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            opacity: paso === 'documentacion' ? 1 : 0.6,
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: paso === 'documentacion' ? '#1f3c88' : '#e5e7eb',
              color: paso === 'documentacion' ? 'white' : '#6b7280',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
            }}
          >
            2
          </div>
          <span style={{ fontWeight: '600' }}>Documentación</span>
        </div>
      </div>

      {paso === 'datos' ? (
        <JugadorForm
          mode="create"
          clubes={clubes}
          onSubmit={handleDatos}
          onCancel={onCancel}
          loading={loading}
        />
      ) : (
        <JugadorDocumentacion
          jugador={{
            id: 0,
            nombre: datosTemporales?.nombre || '',
            apellido: datosTemporales?.apellido || '',
            dni: datosTemporales?.dni || '',
            clubId: datosTemporales?.clubId || 0,
            club: clubes.find((c) => c.id === datosTemporales?.clubId) || { id: 0, nombre: '' },
            categoria: datosTemporales?.categoria || '',
            telefono: datosTemporales?.telefono,
            vencimiento: datosTemporales?.vencimiento,
            dorsal: datosTemporales?.dorsal,
            posicion: datosTemporales?.posicion,
            carnetUrl: datosTemporales?.carnetUrl,
            fichaMedicaUrl: datosTemporales?.fichaMedicaUrl,
            observacion: datosTemporales?.observacion,
            estado: datosTemporales?.estado,
          }}
          onSubmit={handleDocumentacion}
          onCancel={handleVolver}
          loading={loading}
        />
      )}
    </>
  );
};
