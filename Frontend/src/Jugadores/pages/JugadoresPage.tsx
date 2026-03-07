// src/Jugadores/pages/JugadoresPage.tsx

import React, { useEffect, useState } from 'react';
import { useJugadores } from '../hooks/useJugadores';
import type { Jugador, Club, CreateJugadorPayload, UpdateJugadorPayload } from '../types/jugador.types';
import { ListadoJugadores } from './ListadoJugadores';
import { CrearJugador } from './CrearJugador';
import { EditarJugador } from './EditarJugador';
import { DetalleJugador } from './DetalleJugador';
import '../styles/jugadores.css';

type Vista = 'listado' | 'crear' | 'editar' | 'detalle';

const API_URL = 'http://localhost:3001';

export const JugadoresPage: React.FC = () => {
  const { jugadores, loading, error, fetchJugadores, crearJugador, actualizarJugador, eliminarJugador, setError } = useJugadores();
  const [vista, setVista] = useState<Vista>('listado');
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState<Jugador | null>(null);
  const [clubes, setClubes] = useState<Club[]>([]);
  const [cargandoClubes, setCargandoClubes] = useState(false);

  // Cargar jugadores y clubes al montar
  useEffect(() => {
    fetchJugadores();
    cargarClubes();
  }, []);

  const cargarClubes = async () => {
    setCargandoClubes(true);
    try {
      const response = await fetch(`${API_URL}/clubes`);
      if (!response.ok) throw new Error('Error al cargar clubes');
      const data = await response.json();
      setClubes(data);
    } catch (err) {
      console.error('Error cargando clubes:', err);
    } finally {
      setCargandoClubes(false);
    }
  };

  const handleCrear = async (payload: CreateJugadorPayload) => {
    const success = await crearJugador(payload);
    if (success) {
      setVista('listado');
      setError(null);
    }
  };

  const handleEditar = async (payload: UpdateJugadorPayload) => {
    if (!jugadorSeleccionado) return;
    const success = await actualizarJugador(jugadorSeleccionado.id, payload);
    if (success) {
      setVista('listado');
      setJugadorSeleccionado(null);
      setError(null);
    }
  };

  const handleEliminar = async (id: number) => {
    const success = await eliminarJugador(id);
    if (success) {
      setVista('listado');
      setJugadorSeleccionado(null);
      setError(null);
    }
  };

  const handleVerDetalle = (jugador: Jugador) => {
    setJugadorSeleccionado(jugador);
    setVista('detalle');
  };

  const handleIniciarEdicion = (jugador: Jugador) => {
    setJugadorSeleccionado(jugador);
    setVista('editar');
  };

  const handleVolver = () => {
    setVista('listado');
    setJugadorSeleccionado(null);
  };

  return (
    <div className="jugadores-container">
      {error && (
        <div className="error-alert">
          <i className="fas fa-exclamation-circle"></i>
          {error}
        </div>
      )}

      {vista === 'listado' && (
        <ListadoJugadores
          jugadores={jugadores}
          loading={loading}
          onCrear={() => setVista('crear')}
          onVer={handleVerDetalle}
          onEditar={handleIniciarEdicion}
          onEliminar={handleEliminar}
        />
      )}

      {vista === 'crear' && (
        <CrearJugador
          clubes={clubes}
          loading={cargandoClubes}
          onCrear={handleCrear}
          onCancel={handleVolver}
        />
      )}

      {vista === 'editar' && jugadorSeleccionado && (
        <EditarJugador
          jugador={jugadorSeleccionado}
          clubes={clubes}
          loading={cargandoClubes}
          onEditar={handleEditar}
          onCancel={handleVolver}
        />
      )}

      {vista === 'detalle' && jugadorSeleccionado && (
        <DetalleJugador
          jugador={jugadorSeleccionado}
          onEditar={() => setVista('editar')}
          onEliminar={handleEliminar}
          onVolver={handleVolver}
        />
      )}
    </div>
  );
};
