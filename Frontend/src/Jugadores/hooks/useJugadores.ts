// src/Jugadores/hooks/useJugadores.ts

import { useState, useCallback } from 'react';
import type { Jugador, CreateJugadorPayload, UpdateJugadorPayload } from '../types/jugador.types';

const API_URL = 'http://localhost:3001';

interface UseJugadoresReturn {
  jugadores: Jugador[];
  loading: boolean;
  error: string | null;
  fetchJugadores: () => Promise<void>;
  fetchJugadorById: (id: number) => Promise<Jugador | null>;
  crearJugador: (payload: CreateJugadorPayload) => Promise<Jugador | null>;
  actualizarJugador: (id: number, payload: UpdateJugadorPayload) => Promise<Jugador | null>;
  eliminarJugador: (id: number) => Promise<boolean>;
  setError: (error: string | null) => void;
}

export const useJugadores = (): UseJugadoresReturn => {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJugadores = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/jugadores`);
      if (!response.ok) throw new Error('Error al cargar jugadores');
      const data = await response.json();
      setJugadores(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      setJugadores([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJugadorById = useCallback(async (id: number): Promise<Jugador | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/jugadores/${id}`);
      if (!response.ok) throw new Error('Error al cargar jugador');
      return await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const crearJugador = useCallback(async (payload: CreateJugadorPayload): Promise<Jugador | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/jugadores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Error al crear jugador');
      const newJugador = await response.json();
      setJugadores((prev) => [...prev, newJugador]);
      return newJugador;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const actualizarJugador = useCallback(
    async (id: number, payload: UpdateJugadorPayload): Promise<Jugador | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/jugadores/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Error al actualizar jugador');
        const updatedJugador = await response.json();
        setJugadores((prev) =>
          prev.map((j) => (j.id === id ? updatedJugador : j))
        );
        return updatedJugador;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const eliminarJugador = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/jugadores/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar jugador');
      setJugadores((prev) => prev.filter((j) => j.id !== id));
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    jugadores,
    loading,
    error,
    fetchJugadores,
    fetchJugadorById,
    crearJugador,
    actualizarJugador,
    eliminarJugador,
    setError,
  };
};
