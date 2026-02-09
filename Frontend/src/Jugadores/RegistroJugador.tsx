import React, { useState } from "react";
import './jugadores-responsive.css';

// --- Tipos ---
interface Club {
  id: number;
  nombre: string;
}

// DTO para Fase 1 (igual que antes)
interface CreateJugadorFase1Dto {
  nombre: string;
  apellido: string;
  dni: string;
  clubId: number;
  categoria: string;
  telefono?: string;
  fechaNacimiento: string;
  estado: string;
}

// Props que recibe (mismas que antes)
type Props = {
  onRegistrar: (dto: CreateJugadorFase1Dto) => void;
  clubes: Club[];
};

const RegistroJugador: React.FC<Props> = ({ onRegistrar, clubes }) => {
  const [form, setForm] = useState<CreateJugadorFase1Dto>({
    nombre: "",
    apellido: "",
    dni: "",
    clubId: 0,
    categoria: "",
    telefono: "",
    fechaNacimiento: "",
    estado: "activo",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setError(null);

    // Validación de entrada en tiempo real (mismo comportamiento que antes)
    if ((name === "nombre" || name === "apellido") && !/^[A-Za-z\s]*$/.test(value)) return;
    if (name === "dni" && !/^\d{0,8}$/.test(value)) return;
    if (name === "telefono" && !/^\d{0,15}$/.test(value)) return;

    // Máscara para fecha de nacimiento dd/mm/yyyy
    if (name === "fechaNacimiento") {
      let valorLimpio = value.replace(/\D/g, '');
      if (valorLimpio.length > 8) valorLimpio = valorLimpio.slice(0, 8);
      let valorFormateado = '';
      for (let i = 0; i < valorLimpio.length; i++) {
        if (i === 2 || i === 4) valorFormateado += '/';
        valorFormateado += valorLimpio[i];
      }
      setForm({ ...form, [name]: valorFormateado });
      return;
    }

    setForm({
      ...form,
      [name]: name === "clubId" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Validación de campos obligatorios (igual que antes)
    if (
      !form.nombre.trim() || !form.apellido.trim() || !form.dni.trim() ||
      !form.clubId || form.clubId === 0 || !form.categoria
    ) {
      setError("⚠️ Todos los campos marcados con * son obligatorios.");
      return;
    }

    // 2. Validación de formato de DNI (igual)
    if (!/^\d{7,8}$/.test(form.dni.trim())) {
      setError("El DNI debe tener 7 u 8 dígitos numéricos.");
      return;
    }

    // 3. Validación de Teléfono (si existe)
    if (form.telefono && !/^\d{7,15}$/.test(form.telefono)) {
      setError("El teléfono debe tener entre 7 y 15 dígitos numéricos.");
      return;
    }

    // Si todo OK, emitimos el evento (misma lógica)
    onRegistrar(form);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container-edit" noValidate>
      <h2 className="form-title-edit">Paso 1: Datos del Jugador</h2>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <div className="form-fields-grid">
        <div className="form-group">
          <label htmlFor="nombre">Nombre <span aria-hidden style={{color:'#c00'}}>*</span></label>
          <input
            id="nombre"
            name="nombre"
            className="form-input"
            value={form.nombre}
            onChange={handleChange}
            aria-required
            autoComplete="given-name"
            inputMode="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="apellido">Apellido <span aria-hidden style={{color:'#c00'}}>*</span></label>
          <input
            id="apellido"
            name="apellido"
            className="form-input"
            value={form.apellido}
            onChange={handleChange}
            aria-required
            autoComplete="family-name"
            inputMode="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dni">DNI <span aria-hidden style={{color:'#c00'}}>*</span></label>
          <input
            id="dni"
            name="dni"
            className="form-input"
            value={form.dni}
            onChange={handleChange}
            aria-required
            inputMode="numeric"
            placeholder="Ej: 12345678"
          />
        </div>

        <div className="form-group">
          <label htmlFor="clubId">Club <span aria-hidden style={{color:'#c00'}}>*</span></label>
          <select
            id="clubId"
            name="clubId"
            className="form-input"
            value={form.clubId}
            onChange={handleChange}
            aria-required
          >
            <option value={0}>--- Seleccione un club ---</option>
            {clubes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría <span aria-hidden style={{color:'#c00'}}>*</span></label>
          <select
            id="categoria"
            name="categoria"
            className="form-input"
            value={form.categoria}
            onChange={handleChange}
            aria-required
          >
            <option value="">--- Seleccione una categoría ---</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono (Opcional)</label>
          <input
            id="telefono"
            name="telefono"
            className="form-input"
            value={form.telefono || ""}
            onChange={handleChange}
            inputMode="tel"
            placeholder="Ej: 1155555555"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
          <input
            id="fechaNacimiento"
            name="fechaNacimiento"
            className="form-input"
            value={form.fechaNacimiento}
            onChange={handleChange}
            placeholder="dd/mm/yyyy"
            inputMode="numeric"
          />
        </div>
        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            name="estado"
            className="form-input"
            value={form.estado}
            onChange={handleChange}
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
      </div>

      <div className="button-group button-group-right">
        <button type="submit" className="btn-primary">Registrar</button>
      </div>
    </form>
  );
};

export default RegistroJugador;
