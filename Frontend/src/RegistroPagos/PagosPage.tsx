import React, { useState, useEffect } from 'react';
import { hasRole } from '../utils/auth';
import './styles/pagos.css';
import TablaPagosClub from './TablaPagosClub.tsx';
import HistorialPagos from './HistorialPagos.tsx';
import type { Pago, Club } from './types';

const PagosPage: React.FC = () => {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [clubes, setClubes] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tabla' | 'historial'>('tabla');
  const [editingPago, setEditingPago] = useState<Pago | null>(null);

  // Permisos
  const canCreate = hasRole(['presidenta', 'tesorero']);
  const canEdit = hasRole(['presidenta', 'tesorero']);
  const canDelete = hasRole(['presidenta']);

  // Cargar datos
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [pagosRes, clubesRes] = await Promise.all([
          fetch('/api/pagos'),
          fetch('/api/clubes'),
        ]);

        if (!pagosRes.ok || !clubesRes.ok) throw new Error('Error cargando datos');

        const pagosData = await pagosRes.json();
        const clubesData = await clubesRes.json();

        setPagos(pagosData);
        setClubes(clubesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Crear pago
  const handleCrearPago = async (pago: Omit<Pago, 'id'>) => {
    try {
      const res = await fetch('/api/pagos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pago),
      });

      if (!res.ok) throw new Error('Error creando pago');

      const nuevoPago = await res.json();
      setPagos([...pagos, nuevoPago]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear pago');
    }
  };

  // Actualizar pago
  const handleActualizarPago = async (pagoId: number, updateData: Partial<Pago>) => {
    try {
      const res = await fetch(`/api/pagos/${pagoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) throw new Error('Error actualizando pago');

      const updated = await res.json();
      setPagos(pagos.map(p => (p.id === pagoId ? updated : p)));
      setEditingPago(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar pago');
    }
  };

  // Eliminar pago
  const handleEliminarPago = async (pagoId: number) => {
    if (!confirm('¿Confirmar eliminación de pago?')) return;

    try {
      const res = await fetch(`/api/pagos/${pagoId}`, { method: 'DELETE' });

      if (!res.ok) throw new Error('Error eliminando pago');

      setPagos(pagos.filter(p => p.id !== pagoId));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar pago');
    }
  };

  if (loading) {
    return (
      <div className="pagos-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando pagos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pagos-container">
      {/* Header */}
      <div className="pagos-header">
        <div className="pagos-header-content">
          <h1>Registro de Pagos</h1>
          <p>Gestión centralizada de pagos de clubes</p>
        </div>
      </div>

      {/* Alertas */}
      {error && (
        <div className="error-alert">
          <i className="fas fa-exclamation-circle"></i>
          <span>{error}</span>
        </div>
      )}

      {/* Tabs para navegación */}
      <div className="search-bar" style={{ marginBottom: '2rem' }}>
        <button
          className={`btn ${activeTab === 'tabla' ? 'primary' : 'secondary'}`}
          onClick={() => setActiveTab('tabla')}
        >
          Tabla de Clubes
        </button>
        <button
          className={`btn ${activeTab === 'historial' ? 'primary' : 'secondary'}`}
          onClick={() => setActiveTab('historial')}
        >
          Historial Completo
        </button>
      </div>

      {/* Contenido por tab */}
      {activeTab === 'tabla' && (
        <TablaPagosClub
          clubes={clubes}
          pagos={pagos}
          canCreate={canCreate}
          onCrearPago={handleCrearPago}
        />
      )}

      {activeTab === 'historial' && (
        <HistorialPagos
          pagos={pagos}
          clubes={clubes}
          canEdit={canEdit}
          canDelete={canDelete}
          onEditar={setEditingPago}
          onActualizar={handleActualizarPago}
          onEliminar={handleEliminarPago}
          editingPago={editingPago}
        />
      )}
    </div>
  );
};

export default PagosPage;
