import { useState, useCallback } from 'react';
import type { Pago, Club, CreatePagoDto, UpdatePagoDto } from '../types';

const API_URL = 'http://localhost:3001/api';

interface UseRegistroPagosReturn {
  pagos: Pago[];
  clubes: Club[];
  loading: boolean;
  error: string | null;
  fetchPagos: () => Promise<void>;
  fetchClubes: () => Promise<void>;
  crearPago: (payload: CreatePagoDto) => Promise<Pago | null>;
  actualizarPago: (id: number, payload: UpdatePagoDto) => Promise<Pago | null>;
  eliminarPago: (id: number) => Promise<boolean>;
  setError: (error: string | null) => void;
}

export const useRegistroPagos = (): UseRegistroPagosReturn => {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [clubes, setClubes] = useState<Club[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingClubes, setLoadingClubes] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
  });

  const fetchPagos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/pagos`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` },
      });
      if (!response.ok) throw new Error('Error al cargar pagos');
      const data = await response.json();
      setPagos(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      setPagos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchClubes = useCallback(async () => {
    setLoadingClubes(true);
    try {
      const response = await fetch(`${API_URL}/clubes`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` },
      });
      if (!response.ok) throw new Error('Error al cargar clubes');
      const data = await response.json();
      setClubes(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      setClubes([]);
    } finally {
      setLoadingClubes(false);
    }
  }, []);

  const crearPago = useCallback(
    async (payload: CreatePagoDto): Promise<Pago | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/pagos`, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Error al crear pago');
        }
        const newPago = await response.json();
        setPagos((prev) => [...prev, newPago]);
        return newPago;
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

  const actualizarPago = useCallback(
    async (id: number, payload: UpdatePagoDto): Promise<Pago | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/pagos/${id}`, {
          method: 'PATCH',
          headers: getHeaders(),
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Error al actualizar pago');
        }
        const updatedPago = await response.json();
        setPagos((prev) =>
          prev.map((p) => (p.id === id ? updatedPago : p)),
        );
        return updatedPago;
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

  const eliminarPago = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/pagos/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Error al eliminar pago');
      setPagos((prev) => prev.filter((p) => p.id !== id));
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
    pagos,
    clubes,
    loading,
    error,
    fetchPagos,
    fetchClubes,
    crearPago,
    actualizarPago,
    eliminarPago,
    setError,
  };
};
