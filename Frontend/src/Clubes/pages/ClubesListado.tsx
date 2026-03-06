// src/Clubes/pages/ClubesListado.tsx

import React, { useState, useMemo } from "react";
import { ClubCard } from "../components/ClubCard";
import { ClubHeader } from "../components/ClubHeader";
import { ConfirmDelete } from "../components/ConfirmDelete";
import { useClubes } from "../hooks/useClubes";
import { hasRole } from "../../utils/auth";
import "../styles/clubes.css";

interface ClubesListadoProps {
  onCrearClick: () => void;
  onEditarClick: (id: number) => void;
  onVerClick: (id: number) => void;
}

export const ClubesListado: React.FC<ClubesListadoProps> = ({
  onCrearClick,
  onEditarClick,
  onVerClick,
}) => {
  const { clubes, error, loading, eliminarClub, setError } = useClubes();
  const puedeEditar = hasRole(["presidenta"]);

  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState<
    "" | "masculino" | "femenino"
  >("");
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: number;
    nombre: string;
  } | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Filtrar clubes
  const clubesFiltrados = useMemo(() => {
    return clubes.filter(
      (c) =>
        c.activo &&
        c.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
        (categoriaFiltro ? c.categoria === categoriaFiltro : true)
    );
  }, [clubes, busqueda, categoriaFiltro]);

  const handleDeleteClick = (id: number, nombre: string) => {
    setDeleteConfirm({ id, nombre });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;
    setDeletingId(deleteConfirm.id);
    const success = await eliminarClub(deleteConfirm.id);
    setDeletingId(null);

    if (success) {
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="clubes-container">
      <ClubHeader
        title="Gestión de Clubes"
        subtitle="Administra y consulta los clubes registrados"
      />

      {error && (
        <div className="error-alert">
          <i className="fas fa-exclamation-triangle"></i> {error}
          <button className="close-btn" onClick={() => setError("")}>
            ×
          </button>
        </div>
      )}

      {/* Controles */}
      <div className="clubes-controls">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <select
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value as any)}
          className="category-filter"
        >
          <option value="">Todas las categorías</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>

        {puedeEditar && (
          <button className="btn btn-primary btn-add" onClick={onCrearClick}>
            <i className="fas fa-plus"></i> Nuevo Club
          </button>
        )}
      </div>

      {/* Estado vacío */}
      {clubesFiltrados.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <i className="fas fa-volleyball-ball"></i>
          </div>
          <h3>
            {clubes.length === 0
              ? "Sin Clubes Registrados"
              : "Sin Resultados"}
          </h3>
          <p>
            {clubes.length === 0
              ? "No hay clubes registrados aún."
              : "Intenta cambiar los filtros de búsqueda o categoría."}
          </p>
        </div>
      ) : (
        /* Grid de clubes */
        <div className="clubes-grid">
          {clubesFiltrados.map((club) => (
            <ClubCard
              key={club.id}
              club={club}
              onView={onVerClick}
              onEdit={onEditarClick}
              onDelete={handleDeleteClick}
              puedeEditar={puedeEditar}
            />
          ))}
        </div>
      )}

      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando...</p>
        </div>
      )}

      {/* Modal confirmación eliminación */}
      {deleteConfirm && (
        <ConfirmDelete
          nombre={deleteConfirm.nombre}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteConfirm(null)}
          loading={deletingId === deleteConfirm.id}
        />
      )}
    </div>
  );
};
