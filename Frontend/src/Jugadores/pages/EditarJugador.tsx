// src/Jugadores/pages/EditarJugador.tsx

import React, { useState } from 'react';
import { JugadorForm, JugadorDocumentacion } from '../components';
import type { Jugador, Club, UpdateJugadorPayload } from '../types/jugador.types';

interface EditarJugadorProps {
  jugador: Jugador;
  clubes: Club[];
  loading: boolean;
  onEditar: (payload: UpdateJugadorPayload) => Promise<void>;
  onCancel: () => void;
}

type Paso = 'datos' | 'documentacion';

export const EditarJugador: React.FC<EditarJugadorProps> = ({
  jugador,
  clubes,
  loading,
  onEditar,
  onCancel,
}) => {
  const [paso, setPaso] = useState<Paso>('datos');

  const handleDatos = async (payload: any) => {
    const updatePayload: UpdateJugadorPayload = {
      nombre: payload.nombre,
      apellido: payload.apellido,
      dni: payload.dni,
      clubId: payload.clubId,
      categoria: payload.categoria,
      dorsal: payload.dorsal,
      posicion: payload.posicion,
      estado: payload.estado,
      vencimiento: payload.vencimiento,
      observacion: payload.observacion,
    };
    await onEditar(updatePayload);
  };

  const handleDocumentacion = async (payload: UpdateJugadorPayload) => {
    await onEditar(payload);
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
          <h1>Editar Jugador</h1>
          <p>{jugador.nombre} {jugador.apellido}</p>
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
          mode="edit"
          jugador={jugador}
          clubes={clubes}
          onSubmit={handleDatos}
          onCancel={onCancel}
          loading={loading}
        />
      ) : (
        <JugadorDocumentacion
          jugador={jugador}
          onSubmit={handleDocumentacion}
          onCancel={handleVolver}
          loading={loading}
        />
      )}
    </>
  );
};
