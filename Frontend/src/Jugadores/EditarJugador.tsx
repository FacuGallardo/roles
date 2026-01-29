import React, { useState } from "react";
import './jugadores-responsive.css';

// Definición local para evitar conflicto de imports
interface Club { id: number; nombre: string; }
interface Jugador {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  clubId: number;
  club: Club;
  categoria: string;
  telefono?: string;
  vencimiento?: string;
  estado?: string;
}

type Props = {
  jugador: Jugador;
  onActualizar: (id: number, dto: Partial<any>) => void;
  onCancelar: () => void;
  jugadores: Jugador[];
  clubes: Club[];
};

const EditarJugador: React.FC<Props> = ({
  jugador,
  onActualizar,
  onCancelar,
  jugadores,
  clubes,
}) => {
  const [form, setForm] = useState({
    nombre: jugador.nombre,
    apellido: jugador.apellido,
    dni: jugador.dni,
    clubId: jugador.clubId,
    categoria: jugador.categoria,
    telefono: jugador.telefono || "",
    vencimiento: jugador.vencimiento ? jugador.vencimiento.split('T')[0] : "",
    estado: jugador.estado || "activo",
  });
  
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setError(null);
    setForm({ ...form, [name]: name === "clubId" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.apellido || !form.dni || !form.clubId) {
      setError("Campos obligatorios faltantes.");
      return;
    }
    const updateDto = { ...form, vencimiento: form.vencimiento || null };
    onActualizar(jugador.id, updateDto);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container-edit" noValidate>
      <h2 className="form-title-edit">Editando a {jugador.nombre}</h2>
      {error && <div className="error-message-edit" style={{color:'red', marginBottom:8}}>{error}</div>}
      
      <div className="edit-form-grid form-fields-grid">
          <div className="form-group">
              <label className="form-label-edit" htmlFor="nombre">Nombre</label>
              <input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
              <label className="form-label-edit" htmlFor="apellido">Apellido</label>
              <input id="apellido" name="apellido" value={form.apellido} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
              <label className="form-label-edit" htmlFor="dni">DNI</label>
              <input id="dni" name="dni" value={form.dni} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
              <label className="form-label-edit" htmlFor="clubId">Club</label>
              <select id="clubId" name="clubId" value={form.clubId} onChange={handleChange} className="form-input">
                  {clubes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
          </div>

          <div className="form-group">
              <label className="form-label-edit" htmlFor="categoria">Categoría</label>
              <input id="categoria" name="categoria" value={form.categoria} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
              <label className="form-label-edit" htmlFor="telefono">Teléfono</label>
              <input id="telefono" name="telefono" value={form.telefono} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
              <label className="form-label-edit" htmlFor="vencimiento">Vencimiento</label>
              <input id="vencimiento" name="vencimiento" value={form.vencimiento} onChange={handleChange} className="form-input" />
          </div>
      </div>

      <div className="button-group-edit" style={{marginTop:12}}>
        <button type="submit" className="btn-action btn-update">Actualizar</button>
        <button type="button" onClick={onCancelar} className="btn-action btn-cancel">Cancelar</button>
      </div>
    </form>
  );
};

export default EditarJugador;
