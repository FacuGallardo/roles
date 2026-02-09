import React, { useState } from "react";
import './jugadores-responsive.css';

// Inlined Jugador type
type Jugador = {
  estado?: string;
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  club: string;
  categoria: string;
  telefono?: string;
  vencimiento?: string;
  carnetUrl?: string;
  fichaMedicaUrl?: string;
};

// Inlined validarJugador (NO se modifica la lógica, sólo se reusa)
function validarJugador(nuevo: Jugador, jugadores: Jugador[]): string | null {
  if (jugadores.some(j => j.dni === nuevo.dni && j.id !== nuevo.id)) {
    return "El DNI ingresado ya pertenece a otro jugador.";
  }

  if (nuevo.telefono && jugadores.some(j => j.telefono === nuevo.telefono && j.id !== nuevo.id)) {
    return "El teléfono ingresado ya pertenece a otro jugador.";
  }

  if (
    !nuevo.nombre.trim() ||
    !nuevo.apellido.trim() ||
    !nuevo.dni.trim() ||
    !nuevo.club.trim() ||
    !nuevo.categoria
  ) {
    return "Todos los campos son obligatorios.";
  }

  if (nuevo.nombre.trim().length < 2 || nuevo.apellido.trim().length < 2) {
    return "El nombre y apellido deben tener al menos 2 caracteres.";
  }

  if (!/^\d{7,8}$/.test(nuevo.dni)) {
    return "El DNI debe tener 7 u 8 dígitos numéricos.";
  }

  if (nuevo.telefono && !/^\d{7,15}$/.test(nuevo.telefono)) {
    return "El teléfono debe tener entre 7 y 15 dígitos numéricos.";
  }

  if (nuevo.vencimiento) {
    const fecha = new Date(nuevo.vencimiento);
    if (isNaN(fecha.getTime()) || fecha <= new Date()) {
      return "La fecha de vencimiento debe ser válida y posterior a hoy.";
    }
  }
  return null;
}

type Props = {
  jugador: Jugador;
  onGuardar: (jugador: Jugador) => void;
  onCancelar: () => void;
  jugadores?: Jugador[];
};

const FormularioDatos: React.FC<Props> = ({ jugador, onGuardar, onCancelar, jugadores = [] }) => {
  const [form, setForm] = useState<Jugador>({ ...jugador });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Permite letras y espacios en nombre/apellido
    if ((name === "nombre" || name === "apellido") && !/^[A-Za-z\s]*$/.test(value)) return;
    // Limita DNI a 8 dígitos
    if (name === "dni" && !/^\d{0,8}$/.test(value)) return;
    // Limita teléfono a 15 dígitos
    if (name === "telefono" && !/^\d{0,15}$/.test(value)) return;

    setForm({ ...form, [name]: value });
  };

  const categorias = ["Masculino", "Femenino"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validarJugador(form, jugadores);
    if (error) {
      alert(error);
      return;
    }
    onGuardar(form);
    // No cancelamos automáticamente, ya que el componente padre decide la navegación.
  };

  return (
    <form onSubmit={handleSubmit} className="form-container-edit" noValidate>
      {/* Título opcional */}
    <h2 className="form-title-edit">Paso 1: Datos del Jugador</h2>

      <div className="form-fields-grid">
        <div className="form-group">
          <label htmlFor="nombre">Nombre <span aria-hidden="true" style={{color:'#c00'}}>*</span></label>
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
          <label htmlFor="apellido">Apellido <span aria-hidden="true" style={{color:'#c00'}}>*</span></label>
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
          <label htmlFor="dni">DNI <span aria-hidden="true" style={{color:'#c00'}}>*</span></label>
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
          <label htmlFor="club">Club <span aria-hidden="true" style={{color:'#c00'}}>*</span></label>
          <input
            id="club"
            name="club"
            className="form-input"
            value={form.club}
            onChange={handleChange}
            placeholder="Nombre del club"
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría <span aria-hidden="true" style={{color:'#c00'}}>*</span></label>
          <select
            id="categoria"
            name="categoria"
            className="form-input"
            value={form.categoria}
            onChange={handleChange}
            aria-required
          >
            <option value="">--- Seleccione una categoría ---</option>
            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
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
          <label htmlFor="vencimiento">Vencimiento (Opcional)</label>
          <input
            id="vencimiento"
            name="vencimiento"
            className="form-input"
            value={form.vencimiento || ""}
            onChange={handleChange}
            placeholder="yyyy-mm-dd"
            inputMode="numeric"
          />
        </div>
      </div>

      <div className="button-group-edit" style={{ marginTop: 16 }}>
        <button type="submit" className="btn-action btn-primary">Guardar</button>
        <button type="button" onClick={onCancelar} className="btn-action btn-secondary">Cancelar</button>
      </div>
    </form>
  );
};

export default FormularioDatos;