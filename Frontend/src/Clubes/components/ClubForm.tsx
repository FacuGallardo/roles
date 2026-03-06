// src/Clubes/components/ClubForm.tsx

import React, { useEffect, useState } from "react";
import type { Club, ClubPayload, Localidad, ClubFormMode } from "../types";

interface ClubFormProps {
  mode: ClubFormMode;
  club?: Club;
  localidades: Localidad[];
  onSubmit: (payload: ClubPayload, logo?: string) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const ClubForm: React.FC<ClubFormProps> = ({
  mode,
  club,
  localidades,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState<ClubPayload>({
    nombre: "",
    categoria: "masculino",
    correo: "",
    telefono: "",
    localidadId: undefined,
    fechaRegistro: new Date().toISOString().split("T")[0],
    logoUrl: "",
  });

  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");

  useEffect(() => {
    if (mode === "edit" && club) {
      setFormData({
        nombre: club.nombre,
        categoria: club.categoria,
        correo: club.correo,
        telefono: club.telefono,
        localidadId: club.localidad?.id,
        fechaRegistro: club.fechaRegistro,
        logoUrl: club.logoUrl,
      });
      if (club.logoUrl) {
        setLogoPreview(club.logoUrl);
      }
    }
  }, [mode, club]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "localidadId"
          ? value
            ? Number(value)
            : undefined
          : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona una imagen");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen debe pesar menos de 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setLogoFile(reader.result);
        setLogoPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre?.trim()) {
      alert("El nombre del club es obligatorio");
      return;
    }

    await onSubmit(formData, logoFile || undefined);
  };

  return (
    <form className="club-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3 className="form-section-title">Datos del Club</h3>

        <div className="form-group">
          <label htmlFor="nombre">Nombre del Club *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre || ""}
            onChange={handleChange}
            placeholder="Nombre del club..."
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="categoria">Categoría *</label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria || ""}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona categoría</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="fechaRegistro">Fecha de Registro</label>
            <input
              type="date"
              id="fechaRegistro"
              name="fechaRegistro"
              value={formData.fechaRegistro || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Sección Contacto */}
      <div className="form-section">
        <h3 className="form-section-title">Contacto</h3>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="correo">Correo *</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo || ""}
              onChange={handleChange}
              placeholder="correo@club.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono *</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono || ""}
              onChange={handleChange}
              placeholder="+54 351 XXXXXX"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="localidadId">Localidad</label>
          <select
            id="localidadId"
            name="localidadId"
            value={formData.localidadId || ""}
            onChange={handleChange}
          >
            <option value="">Selecciona localidad</option>
            {localidades.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sección Logo */}
      <div className="form-section">
        <h3 className="form-section-title">Logo del Club</h3>

        <div className="form-group">
          <label htmlFor="logo">Seleccionar Logo</label>
          <input
            type="file"
            id="logo"
            accept="image/*"
            onChange={handleFileChange}
          />
          <small>Máximo 5MB, formatos: JPG, PNG</small>
        </div>

        {logoPreview && (
          <div className="logo-preview">
            <img src={logoPreview} alt="Logo preview" />
          </div>
        )}
      </div>

      {/* Campos comentados para agregarse después */}
      {/* 
      <div className="form-section">
        <h3 className="form-section-title">Ubicación</h3>
        <div className="form-group">
          <label htmlFor="ciudad">Ciudad</label>
          <input
            type="text"
            id="ciudad"
            placeholder="Córdoba"
          />
        </div>
      </div>
      */}

      {/* Botones */}
      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Guardando..." : mode === "create" ? "Crear Club" : "Actualizar Club"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
