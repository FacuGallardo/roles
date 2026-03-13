import { useState, useCallback } from 'react';
import type { Referente, Club, CreateReferenteDto, UpdateReferenteDto } from '../types';

interface UseReferentesReturn {
  referentes: Referente[];
  clubes: Club[];
  loading: boolean;
  error: string | null;
  fetchReferentes: () => Promise<void>;
  fetchClubes: () => Promise<void>;
  crearReferente: (payload: CreateReferenteDto) => Promise<Referente | null>;
  actualizarReferente: (id: number, payload: UpdateReferenteDto) => Promise<Referente | null>;
  eliminarReferente: (id: number) => Promise<boolean>;
  setError: (error: string | null) => void;
}

export const useReferentes = (): UseReferentesReturn => {
  const [referentes, setReferentes] = useState<Referente[]>([]);
  const [clubes, setClubes] = useState<Club[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  });

  const fetchReferentes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/referentes', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) throw new Error('Error al cargar referentes');
      const data = await response.json();
      setReferentes(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      setReferentes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchClubes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/clubes', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) throw new Error('Error al cargar clubes');
      const data = await response.json();
      setClubes(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      setClubes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const crearReferente = useCallback(
    async (payload: CreateReferenteDto): Promise<Referente | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/referentes', {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Error al crear referente');
        }
        const newReferente = await response.json();
        setReferentes((prev) => [...prev, newReferente]);
        return newReferente;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const actualizarReferente = useCallback(
    async (id: number, payload: UpdateReferenteDto): Promise<Referente | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/referentes/${id}`, {
          method: 'PATCH',
          headers: getHeaders(),
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Error al actualizar referente');
        }
        const updatedReferente = await response.json();
        setReferentes((prev) =>
          prev.map((r) => (r.id === id ? updatedReferente : r)),
        );
        return updatedReferente;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const eliminarReferente = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/referentes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) throw new Error('Error al eliminar referente');
      setReferentes((prev) => prev.filter((r) => r.id !== id));
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
    referentes,
    clubes,
    loading,
    error,
    fetchReferentes,
    fetchClubes,
    crearReferente,
    actualizarReferente,
    eliminarReferente,
    setError,
  };
};
