import React, { useState, useEffect } from 'react';
import { hasRole } from '../utils/auth';
import { useRegistroPagos } from './hooks/useRegistroPagos';
import './styles/pagos.css';
import TablaPagosClub from './TablaPagosClub.tsx';
import HistorialPagos from './HistorialPagos.tsx';
import type { Pago } from './types';

const PagosPage: React.FC = () => {
  const { pagos, clubes, loading, error, fetchPagos, fetchClubes, crearPago, actualizarPago, eliminarPago, setError } = useRegistroPagos();
  const [activeTab, setActiveTab] = useState<'tabla' | 'historial'>('tabla');
  const [editingPago, setEditingPago] = useState<Pago | null>(null);

  // Permisos
  const canCreate = hasRole(['presidenta', 'tesorero']);
  const canEdit = hasRole(['presidenta', 'tesorero']);
  const canDelete = hasRole(['presidenta']);

  // Cargar datos
  useEffect(() => {
    fetchPagos();
    fetchClubes();
  }, [fetchPagos, fetchClubes]);

  // Crear pago
  const handleCrearPago = async (pago: Omit<Pago, 'id'>) => {
    const result = await crearPago(pago);
    if (result) {
      setError(null);
    }
  };

  // Actualizar pago
  const handleActualizarPago = async (pagoId: number, updateData: Partial<Pago>) => {
    const result = await actualizarPago(pagoId, updateData);
    if (result) {
      setEditingPago(null);
      setError(null);
    }
  };

  // Eliminar pago
  const handleEliminarPago = async (pagoId: number) => {
    if (!confirm('¿Confirmar eliminación de pago?')) return;
    const result = await eliminarPago(pagoId);
    if (result) {
      setError(null);
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
