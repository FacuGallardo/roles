import { useEffect, useState } from "react";
import { hasRole } from "../utils/auth";
import "./clubes-responsive.css";

const API_URL = "http://localhost:3001";

interface Club {
  id: number;
  nombre: string;
  categoria: "masculino" | "femenino";
  correo: string;
  telefono: string;
  localidad: { id: number; nombre: string } | null;
  fechaRegistro: string;
  activo: boolean;
  logoUrl?: string;
}

interface Localidad {
  id: number;
  nombre: string;
}

interface ClubPayload {
  nombre?: string;
  categoria?: "masculino" | "femenino";
  correo?: string;
  telefono?: string;
  localidadId?: number;
  fechaRegistro?: string;
  logoUrl?: string;
}

const LOCALIDADES_FIJAS: Localidad[] = [
  { id: 1, nombre: "Bialet Masse" },
  { id: 2, nombre: "Capilla del Monte" },
  { id: 3, nombre: "Cosquin (cabecera)" },
  { id: 4, nombre: "Huerta Grande" },
  { id: 5, nombre: "La Cumbre" },
  { id: 6, nombre: "La Falda" },
  { id: 7, nombre: "Los Cocos" },
  { id: 8, nombre: "San Antonio de Arredondo" },
  { id: 9, nombre: "San Esteban" },
  { id: 10, nombre: "Santa Maria" },
  { id: 11, nombre: "Tanti" },
  { id: 12, nombre: "Valle Hermoso" },
  { id: 13, nombre: "Villa Carlos Paz" },
  { id: 14, nombre: "Villa Giardino" },
  { id: 15, nombre: "Villa Icho Cruz" },
  { id: 16, nombre: "Villa Santa Cruz del Lago" },
  { id: 17, nombre: "Cabalango" },
  { id: 18, nombre: "Casa Grande" },
  { id: 19, nombre: "Charbonier" },
  { id: 20, nombre: "Cuesta Blanca" },
  { id: 21, nombre: "Estancia Vieja" },
  { id: 22, nombre: "Mayu Sumaj" },
  { id: 23, nombre: "San Roque" },
  { id: 24, nombre: "Tala Huasi" },
  { id: 25, nombre: "Villa Parque Siquiman" },
  { id: 26, nombre: "Malagueño" },
  { id: 27, nombre: "Cordoba Capital" },
  { id: 28, nombre: "Villa Saldan" }
];

export default function VerClubes() {
  const esPresidenta = hasRole([]);

  const [clubes, setClubes] = useState<Club[]>([]);
  const [localidades] = useState<Localidad[]>(LOCALIDADES_FIJAS);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState<"" | "masculino" | "femenino">("");
  const [editando, setEditando] = useState<Club | null>(null);
  const [editandoForm, setEditandoForm] = useState<ClubPayload>({});
  const [nuevoClub, setNuevoClub] = useState<ClubPayload>({});
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/clubes`)
      .then(res => res.json())
      .then(data => setClubes(Array.isArray(data) ? data : []))
      .catch(() => setError("No se pudieron cargar los clubes."));
  }, []);

  const iniciarEdicion = (club: Club) => {
    setEditando(club);
    setEditandoForm({
      nombre: club.nombre,
      categoria: club.categoria,
      correo: club.correo,
      telefono: club.telefono,
      localidadId: club.localidad?.id,
      fechaRegistro: club.fechaRegistro,
      logoUrl: club.logoUrl,
    });
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setEditandoForm({});
  };

  const guardarEdicion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editando) return;
    try {
      setError("");
      const response = await fetch(`${API_URL}/clubes/${editando.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editandoForm),
      });
      if (!response.ok) {
        throw new Error("No se pudo actualizar el club.");
      }
      const actualizado = await response.json();
      setClubes(prev => prev.map(c => (c.id === editando.id ? actualizado : c)));
      cancelarEdicion();
    } catch {
      setError("No se pudo actualizar el club.");
    }
  };

  const clubesFiltrados = clubes.filter(
    c =>
      c.activo &&
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (categoriaFiltro ? c.categoria === categoriaFiltro : true)
  );

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<ClubPayload>>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setState(prev => ({ ...prev, logoUrl: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="clubes-page">
      <div className="clubes-header">
        <h1>Gestión de Clubes</h1>
        <p>Administra y consulta los clubes registrados</p>
      </div>

      {error && (
        <p className="club-error">{error}</p>
      )}

      <div className="clubes-filters">
        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
        <select
          value={categoriaFiltro}
          onChange={e => setCategoriaFiltro(e.target.value as any)}
        >
          <option value="">Todas</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
      </div>

      {clubesFiltrados.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏐</div>
          <h3 className="empty-state-title">
            {clubes.length === 0 ? "Sin Clubes Registrados" : "Sin Resultados"}
          </h3>
          <p className="empty-state-subtitle">
            {clubes.length === 0 
              ? "No hay clubes registrados aún. Comienza añadiendo el primer club."
              : "Intenta cambiar los filtros de búsqueda o categoría."}
          </p>
          {clubes.length === 0 && esPresidenta && (
            <div className="empty-state-action">
              <button onClick={() => setMostrarFormulario(true)}>
                + Añadir Primer Club
              </button>
            </div>
          )}
        </div>
      ) : (
        clubesFiltrados.map(club => (
          <div key={club.id} className="club-card">
            <img
              src={club.logoUrl || "https://via.placeholder.com/120?text=Logo"}
              alt="Logo"
              className="club-logo"
            />

            <div className="club-info">
              <h4>{club.nombre}</h4>
              <p>{club.localidad?.nombre || "Sin localidad"} | {club.categoria}</p>
              <p>{club.correo} | {club.telefono}</p>
              <p>Registrado: {club.fechaRegistro}</p>
            </div>

            {esPresidenta && (
              <div className="club-actions">
                <button className="club-action-btn club-action-primary" onClick={() => iniciarEdicion(club)}>Modificar</button>
                <button className="club-action-btn club-action-danger" onClick={() => setClubes(clubes.map(c => c.id === club.id ? { ...c, activo: false } : c))}>
                  Borrar
                </button>
              </div>
            )}
          </div>
        ))
      )}

      {editando && (
        <form className="club-form" onSubmit={guardarEdicion}>
          <input
            placeholder="Nombre"
            value={editandoForm.nombre || ""}
            onChange={e => setEditandoForm({ ...editandoForm, nombre: e.target.value })}
          />
          <select
            value={editandoForm.categoria || ""}
            onChange={e => setEditandoForm({ ...editandoForm, categoria: e.target.value as any })}
          >
            <option value="">Categoría</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
          <input
            placeholder="Correo"
            value={editandoForm.correo || ""}
            onChange={e => setEditandoForm({ ...editandoForm, correo: e.target.value })}
          />
          <input
            placeholder="Teléfono"
            value={editandoForm.telefono || ""}
            onChange={e => setEditandoForm({ ...editandoForm, telefono: e.target.value })}
          />
          <select
            value={editandoForm.localidadId || ""}
            onChange={e => setEditandoForm({ ...editandoForm, localidadId: Number(e.target.value) })}
          >
            <option value="">Localidad</option>
            {localidades.map(l => <option key={l.id} value={l.id}>{l.nombre}</option>)}
          </select>
          <input
            type="date"
            value={editandoForm.fechaRegistro || ""}
            onChange={e => setEditandoForm({ ...editandoForm, fechaRegistro: e.target.value })}
          />
          <input type="file" accept="image/*" onChange={e => handleFileUpload(e, setEditandoForm)} />
          {editandoForm.logoUrl && <img src={editandoForm.logoUrl} className="club-preview" />}
          <div className="club-form-actions">
            <button className="club-save-btn" type="submit">Guardar cambios</button>
            <button className="club-cancel-btn" type="button" onClick={cancelarEdicion}>Cancelar</button>
          </div>
        </form>
      )}

      {esPresidenta && (
        <button className="club-add-btn" onClick={() => setMostrarFormulario(true)}>Añadir Club</button>
      )}

      {mostrarFormulario && (
        <form className="club-form">
          <input placeholder="Nombre" onChange={e => setNuevoClub({ ...nuevoClub, nombre: e.target.value })} />
          <select onChange={e => setNuevoClub({ ...nuevoClub, categoria: e.target.value as any })}>
            <option value="">Categoría</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
          <input placeholder="Correo" onChange={e => setNuevoClub({ ...nuevoClub, correo: e.target.value })} />
          <input placeholder="Teléfono" onChange={e => setNuevoClub({ ...nuevoClub, telefono: e.target.value })} />
          <select onChange={e => setNuevoClub({ ...nuevoClub, localidadId: Number(e.target.value) })}>
            <option value="">Localidad</option>
            {localidades.map(l => <option key={l.id} value={l.id}>{l.nombre}</option>)}
          </select>
          <input type="date" onChange={e => setNuevoClub({ ...nuevoClub, fechaRegistro: e.target.value })} />
          <input type="file" accept="image/*" onChange={e => handleFileUpload(e, setNuevoClub)} />
          {nuevoClub.logoUrl && <img src={nuevoClub.logoUrl} className="club-preview" />}
          <div className="club-form-actions">
            <button className="club-save-btn">Guardar</button>
            <button className="club-cancel-btn" type="button" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
}
