import React, { useState } from "react";
import type { CSSProperties } from "react";
import { styles } from "./ReferentesPage";
import type { Referente, Club, UpdateReferenteDto } from "./types";
import "./referentes-responsive.css";

interface Props {
  referente: Referente;
  clubes: Club[];
  onActualizar: (id: number, dto: UpdateReferenteDto) => void;
  onCancelar: () => void;
  error: string | null;
}

const categorias = ["Masculino", "Femenino"];

const estiloBotonBase: CSSProperties = {
  padding: "0.5rem 1rem",
  borderRadius: "5px",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "16px",
  transition: 'background-color 0.3s ease, transform 0.1s ease',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const estiloBotonActualizar: CSSProperties = {
  ...estiloBotonBase,
  backgroundColor: "#1f3c88",
};

const estiloBotonCancelar: CSSProperties = {
  ...estiloBotonBase,
  backgroundColor: "#ef4444",
};

const EditarReferente: React.FC<Props> = ({
  referente,
  clubes,
  onActualizar,
  onCancelar,
  error,
}) => {
  const [form, setForm] = useState<UpdateReferenteDto>({
    nombre: referente.nombre,
    apellido: referente.apellido,
    categoria: referente.categoria,
    dni: referente.dni,
    correo: referente.correo,
    telefono: referente.telefono,
    clubId: referente.clubId,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "clubId" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onActualizar(referente.id, form);
  };

  return (
    <div style={styles.cardFormulario}>
      <h2 style={styles.formTitulo}>Editar Referente</h2>

      {error && (
        <div style={{ ...styles.mensajeAlerta, ...styles.mensajeError }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            style={{ ...styles.inputOscuro, flex: 1, marginBottom: 0 }}
            required
          />
          <input
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            style={{ ...styles.inputOscuro, flex: 1, marginBottom: 0 }}
            required
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#1f2937' }}>
            Categoría
          </label>
          <div className="categoria-grid">
            {categorias.map((c) => (
              <div key={c} className="categoria-option">
                <input
                  type="radio"
                  id={`cat-${c}`}
                  name="categoria"
                  value={c}
                  checked={form.categoria === c as any}
                  onChange={handleChange}
                  required
                />
                <label htmlFor={`cat-${c}`} className="categoria-label">
                  {c}
                </label>
              </div>
            ))}
          </div>
        </div>

        <input
          name="dni"
          type="text"
          placeholder="DNI (sin puntos)"
          value={form.dni}
          onChange={handleChange}
          style={styles.inputOscuro}
          required
        />

        <input
          name="correo"
          type="email"
          placeholder="Correo Electrónico"
          value={form.correo}
          onChange={handleChange}
          style={styles.inputOscuro}
          required
        />

        <input
          name="telefono"
          type="tel"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          style={styles.inputOscuro}
          required
        />

        <select
          name="clubId"
          value={form.clubId}
          onChange={handleChange}
          style={styles.inputOscuro}
          required
        >
          <option value={0} disabled>
            — Seleccione Equipo —
          </option>
          {clubes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>

        <div style={{ display: "flex", gap: "16px", marginTop: "30px" }}>
          <button
            type="submit"
            style={{ ...estiloBotonActualizar, width: "50%", marginTop: 0 }}
          >
            Actualizar
          </button>
          <button
            type="button"
            onClick={onCancelar}
            style={{ ...estiloBotonCancelar, width: "50%", marginTop: 0 }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarReferente;
