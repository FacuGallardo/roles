// src/Clubes/components/ClubCard.tsx

import React from "react";
import type { Club } from "../types";

interface ClubCardProps {
  club: Club;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number, nombre: string) => void;
  puedeEditar: boolean;
}

export const ClubCard: React.FC<ClubCardProps> = ({
  club,
  onView,
  onEdit,
  onDelete,
  puedeEditar,
}) => {
  const pj = club.pg + club.pe + club.pp; // Partidos Jugados

  return (
    <div className="club-card">
      {/* Logo */}
      <div className="club-card-logo">
        {club.logoUrl ? (
          <img src={club.logoUrl} alt={club.nombre} />
        ) : (
          <div className="club-logo-placeholder">
            <i className="fas fa-shield-alt"></i>
          </div>
        )}
      </div>

      {/* Información del Club */}
      <div className="club-card-body">
        <h3 className="club-card-title">{club.nombre}</h3>

        <div className="club-card-info">
          <div className="info-row">
            <span className="info-label">
              <i className="fas fa-venus-mars"></i> Categoría:
            </span>
            <span className="info-value">
              {club.categoria === "masculino" ? "Masculino" : "Femenino"}
            </span>
          </div>

          <div className="info-row">
            <span className="info-label">
              <i className="fas fa-map-marker-alt"></i> Localidad:
            </span>
            <span className="info-value">{club.localidad?.nombre || "Sin localidad"}</span>
          </div>

          <div className="info-row">
            <span className="info-label">
              <i className="fas fa-envelope"></i> Correo:
            </span>
            <span className="info-value">{club.correo}</span>
          </div>

          <div className="info-row">
            <span className="info-label">
              <i className="fas fa-phone"></i> Teléfono:
            </span>
            <span className="info-value">{club.telefono}</span>
          </div>

          {/* Estadísticas */}
          <div className="club-stats">
            <div className="stat-item">
              <span className="stat-label">PJ</span>
              <span className="stat-value">{pj}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">PG</span>
              <span className="stat-value">{club.pg}</span>
            </div>
          </div>

          {/* Estado */}
          <div className="club-status">
            <span
              className={`badge ${
                club.activo ? "badge-success" : "badge-danger"
              }`}
            >
              {club.activo ? "Activo" : "Inactivo"}
            </span>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="club-card-actions">
        <button
          className="club-action-btn club-action-view"
          onClick={() => onView(club.id)}
          title="Ver detalle"
        >
          <i className="fas fa-eye"></i> Ver
        </button>

        {puedeEditar && (
          <>
            <button
              className="club-action-btn club-action-edit"
              onClick={() => onEdit(club.id)}
              title="Editar"
            >
              <i className="fas fa-edit"></i> Editar
            </button>

            <button
              className="club-action-btn club-action-delete"
              onClick={() => onDelete(club.id, club.nombre)}
              title="Eliminar"
            >
              <i className="fas fa-trash"></i> Eliminar
            </button>
          </>
        )}
      </div>
    </div>
  );
};
