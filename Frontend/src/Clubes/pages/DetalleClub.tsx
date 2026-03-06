// src/Clubes/pages/DetalleClub.tsx

import React, { useEffect, useState } from "react";
import type { Club } from "../types";
import { useClubes } from "../hooks/useClubes";
import { hasRole } from "../../utils/auth";

interface DetalleClubProps {
  clubId: number;
  onBack: () => void;
  onEdit: (id: number) => void;
}

export const DetalleClub: React.FC<DetalleClubProps> = ({
  clubId,
  onBack,
  onEdit,
}) => {
  const { fetchClubById } = useClubes();
  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  const puedeEditar = hasRole(["presidenta"]);

  useEffect(() => {
    const cargarClub = async () => {
      setLoading(true);
      const clubData = await fetchClubById(clubId);
      setClub(clubData);
      setLoading(false);
    };

    cargarClub();
  }, [clubId]);

  if (loading) {
    return (
      <div className="clubes-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando detalle...</p>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="clubes-container">
        <div className="detail-header">
          <h1>Club No Encontrado</h1>
        </div>
        <div className="error-alert">
          No se encontró el club solicitado.
        </div>
        <button className="btn btn-primary" onClick={onBack}>
          <i className="fas fa-arrow-left"></i> Volver
        </button>
      </div>
    );
  }

  const pj = club.pg + club.pe + club.pp;

  return (
    <div className="clubes-container">
      {/* Header del Club */}
      <div className="detail-header">
        <div className="detail-header-logo">
          {club.logoUrl ? (
            <img src={club.logoUrl} alt={club.nombre} />
          ) : (
            <div className="detail-logo-placeholder">
              <i className="fas fa-shield-alt"></i>
            </div>
          )}
        </div>

        <div className="detail-header-content">
          <h1>{club.nombre}</h1>
          <p className="detail-category">
            {club.categoria === "masculino" ? "Categoría Masculina" : "Categoría Femenina"}
          </p>
          <div className="detail-badge">
            <span className={`badge ${club.activo ? "badge-success" : "badge-danger"}`}>
              {club.activo ? "Activo" : "Inactivo"}
            </span>
          </div>
        </div>
      </div>

      {/* Información General */}
      <div className="detail-card">
        <h2 className="detail-card-title">
          <i className="fas fa-info-circle"></i> Información General
        </h2>

        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Localidad</span>
            <span className="detail-value">{club.localidad?.nombre || "Sin especificar"}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Fecha de Registro</span>
            <span className="detail-value">{club.fechaRegistro}</span>
          </div>
        </div>
      </div>

      {/* Contacto */}
      <div className="detail-card">
        <h2 className="detail-card-title">
          <i className="fas fa-phone"></i> Contacto
        </h2>

        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Correo</span>
            <span className="detail-value">
              <a href={`mailto:${club.correo}`}>{club.correo}</a>
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Teléfono</span>
            <span className="detail-value">
              <a href={`tel:${club.telefono}`}>{club.telefono}</a>
            </span>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="detail-card">
        <h2 className="detail-card-title">
          <i className="fas fa-chart-bar"></i> Estadísticas
        </h2>

        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-number">{pj}</div>
            <div className="stat-label">Partidos</div>
          </div>

          <div className="stat-box">
            <div className="stat-number">{club.pg}</div>
            <div className="stat-label">Ganados</div>
          </div>

          <div className="stat-box">
            <div className="stat-number">{club.pe}</div>
            <div className="stat-label">Empatados</div>
          </div>

          <div className="stat-box">
            <div className="stat-number">{club.pp}</div>
            <div className="stat-label">Perdidos</div>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="detail-actions">
        {puedeEditar && (
          <button
            className="btn btn-primary"
            onClick={() => onEdit(club.id)}
          >
            <i className="fas fa-edit"></i> Editar
          </button>
        )}

        <button
          className="btn btn-secondary"
          onClick={onBack}
        >
          <i className="fas fa-arrow-left"></i> Volver
        </button>
      </div>
    </div>
  );
};
