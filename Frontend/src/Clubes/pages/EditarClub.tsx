// src/Clubes/pages/EditarClub.tsx

import React, { useEffect, useState } from "react";
import { ClubForm } from "../components/ClubForm";
import { ClubHeader } from "../components/ClubHeader";
import { useClubes } from "../hooks/useClubes";
import type { Club, ClubPayload } from "../types";

interface EditarClubProps {
  clubId: number;
  onBack: () => void;
  onSuccess: () => void;
}

export const EditarClub: React.FC<EditarClubProps> = ({
  clubId,
  onBack,
  onSuccess,
}) => {
  const { localidades, actualizarClub, fetchClubById, loading, error } =
    useClubes();
  const [club, setClub] = useState<Club | null>(null);
  const [loadingClub, setLoadingClub] = useState(true);

  useEffect(() => {
    const cargarClub = async () => {
      setLoadingClub(true);
      const clubData = await fetchClubById(clubId);
      setClub(clubData);
      setLoadingClub(false);
    };

    cargarClub();
  }, [clubId]);

  const handleSubmit = async (payload: ClubPayload, logo?: string) => {
    const clubData = {
      ...payload,
      ...(logo && { logoUrl: logo }),
    };

    const resultado = await actualizarClub(clubId, clubData);
    if (resultado) {
      onSuccess();
    }
  };

  if (loadingClub) {
    return (
      <div className="clubes-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando club...</p>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="clubes-container">
        <ClubHeader title="Club No Encontrado" />
        <div className="error-alert">
          No se encontró el club solicitado.
        </div>
        <button className="btn btn-primary" onClick={onBack}>
          Volver al Listado
        </button>
      </div>
    );
  }

  return (
    <div className="clubes-container">
      <ClubHeader
        title="Editar Club"
        subtitle={`Modificando: ${club.nombre}`}
      />

      {error && (
        <div className="error-alert">
          <i className="fas fa-exclamation-triangle"></i> {error}
        </div>
      )}

      <div className="form-wrapper">
        <ClubForm
          mode="edit"
          club={club}
          localidades={localidades}
          onSubmit={handleSubmit}
          onCancel={onBack}
          loading={loading}
        />
      </div>
    </div>
  );
};
