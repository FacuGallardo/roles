// src/Jugadores/pages/ListadoJugadores.tsx

import React, { useMemo, useState } from 'react';
import type { Jugador } from '../types/jugador.types';
import { ConfirmDelete } from '../components';
import { getStatusLabel } from '../utils/jugadorValidations';

interface ListadoJugadoresProps {
  jugadores: Jugador[];
  loading: boolean;
  onCrear: () => void;
  onVer: (jugador: Jugador) => void;
  onEditar: (jugador: Jugador) => void;
  onEliminar: (id: number) => void;
}

export const ListadoJugadores: React.FC<ListadoJugadoresProps> = ({
  jugadores,
  loading,
  onCrear,
  onVer,
  onEditar,
  onEliminar,
}) => {
  const [busqueda, setBusqueda] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: number; nombre: string } | null>(null);

  const jugadoresFiltrados = useMemo(() => {
    return jugadores.filter(
      (j) =>
        j.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        j.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
        j.dni.includes(busqueda) ||
        (j.dorsal?.toString().includes(busqueda) ?? false)
    );
  }, [jugadores, busqueda]);

  const handleDeleteClick = (id: number, nombre: string, apellido: string) => {
    setDeleteConfirm({ id, nombre: `${nombre} ${apellido}` });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;
    await onEliminar(deleteConfirm.id);
    setDeleteConfirm(null);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Cargando jugadores...</p>
      </div>
    );
  }

  return (
    <>
      <div className="jugador-header">
        <div className="jugador-header-content">
          <h1>Gestión de Jugadores</h1>
          <p>Administra el registro de jugadores de la liga</p>
        </div>
      </div>

      {/* Barra de búsqueda y botón crear */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Buscar por nombre, DNI o dorsal..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="search-input"
          style={{ flex: 1, minWidth: '200px' }}
        />
        <button onClick={onCrear} className="btn primary">
          <i className="fas fa-plus"></i> Nuevo Jugador
        </button>
      </div>

      {/* Tabla de jugadores */}
      {jugadoresFiltrados.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <i className="fas fa-users-slash"></i>
          </div>
          <h3 className="empty-state-title">No hay jugadores registrados</h3>
          <p className="empty-state-message">
            {busqueda ? 'No coincide con tu búsqueda' : 'Comienza agregando un nuevo jugador'}
          </p>
          {!busqueda && (
            <button onClick={onCrear} className="btn primary">
              <i className="fas fa-plus"></i> Registrar Primer Jugador
            </button>
          )}
        </div>
      ) : (
        <div className="table-container">
          <table className="player-table" role="table">
            <thead className="table-header">
              <tr>
                <th>Nombre Completo</th>
                <th>Dorsal</th>
                <th>Posición</th>
                <th>Club</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {jugadoresFiltrados.map((j) => (
                <tr key={j.id} className="table-row">
                  <td data-label="Nombre Completo">
                    <strong>{j.nombre} {j.apellido}</strong>
                  </td>
                  <td data-label="Dorsal">
                    {j.dorsal ? <span className="badge">{j.dorsal}</span> : '-'}
                  </td>
                  <td data-label="Posición">{j.posicion || '-'}</td>
                  <td data-label="Club">{j.club?.nombre || '-'}</td>
                  <td data-label="Estado">
                    <span className={`status-pill status-${(j.estado || 'activo').toLowerCase()}`}>
                      {getStatusLabel(j.estado)}
                    </span>
                  </td>
                  <td data-label="Acciones">
                    <div className="actions-cell">
                      <button
                        onClick={() => onVer(j)}
                        className="action-btn view"
                        title="Ver detalle"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        onClick={() => onEditar(j)}
                        className="action-btn edit"
                        title="Editar"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(j.id, j.nombre, j.apellido)}
                        className="action-btn delete"
                        title="Eliminar"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {deleteConfirm && (
        <ConfirmDelete
          nombre={deleteConfirm.nombre}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </>
  );
};
