// src/Clubes/pages/CrearClub.tsx

import React from "react";
import { ClubForm } from "../components/ClubForm";
import { ClubHeader } from "../components/ClubHeader";
import { useClubes } from "../hooks/useClubes";
import type { ClubPayload } from "../types";

interface CrearClubProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const CrearClub: React.FC<CrearClubProps> = ({ onBack, onSuccess }) => {
  const { localidades, crearClub, loading, error } = useClubes();

  const handleSubmit = async (payload: ClubPayload, logo?: string) => {
    const clubData = {
      ...payload,
      ...(logo && { logoUrl: logo }),
    };

    const resultado = await crearClub(clubData);
    if (resultado) {
      onSuccess();
    }
  };

  return (
    <div className="clubes-container">
      <ClubHeader
        title="Crear Nuevo Club"
        subtitle="Completa el formulario para registrar un nuevo club"
      />

      {error && (
        <div className="error-alert">
          <i className="fas fa-exclamation-triangle"></i> {error}
        </div>
      )}

      <div className="form-wrapper">
        <ClubForm
          mode="create"
          localidades={localidades}
          onSubmit={handleSubmit}
          onCancel={onBack}
          loading={loading}
        />
      </div>
    </div>
  );
};
