import React, { useState } from "react";
import "./estadistica-responsive.css";

// --- Definición del tipo Equipo ---
export type Equipo = {
  id: number;
  nombre: string;
  pg: number;
  pe: number;
  pp: number;
  goles: number;
  puntos: number;
  activo?: boolean;
};

type Props = {
  equipo: Equipo;
  onActualizar: (id: number, actualizado: Partial<Equipo>) => void; 
  onEliminar: (id: number) => void; 
  rowStyle?: React.CSSProperties;
  puedeEditar: boolean; // 🔒 Nueva prop
};

const EquipoItem: React.FC<Props> = ({
  equipo,
  onActualizar,
  onEliminar,
  rowStyle = {},
  puedeEditar,
}) => {
  const [editando, setEditando] = useState(false);
  const [tempStats, setTempStats] = useState({
    nombre: equipo.nombre, 
    pg: equipo.pg,
    pe: equipo.pe,
    pp: equipo.pp,
    goles: equipo.goles,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempStats(prev => ({
      ...prev,
      [name]: name === "nombre" ? value : Number(value), 
    }));
  };

  const guardarCambios = () => {
    if (!tempStats.nombre.trim()) {
      alert("El nombre no puede estar vacío.");
      return;
    }
    if (tempStats.pg < 0 || tempStats.pe < 0 || tempStats.pp < 0) {
      alert("PG, PE, PP deben ser mayores o iguales a 0.");
      return;
    }

    onActualizar(equipo.id, {
        nombre: tempStats.nombre, 
        pg: tempStats.pg,
        pe: tempStats.pe,
        pp: tempStats.pp,
        goles: tempStats.goles,
    });
    setEditando(false);
  };

  const cancelarEdicion = () => {
      setTempStats({ 
          nombre: equipo.nombre,
          pg: equipo.pg,
          pe: equipo.pe,
          pp: equipo.pp,
          goles: equipo.goles,
      });
      setEditando(false);
  }

  const combinedRowStyle: React.CSSProperties = {
      ...rowStyle,
      transition: 'background-color 0.3s',
      ...(editando ? { backgroundColor: '#fff3cd' } : {}), 
  };

  const cellStyle: React.CSSProperties = {
    padding: '12px 15px',
    textAlign: "center",
    borderBottom: "1px solid #e9ecef",
    fontSize: '0.9rem',
    verticalAlign: 'middle',
    color: '#1a1a1a',
    minHeight: '44px',
  };
  const inputStyle: React.CSSProperties = {
    padding: '4px 6px',
    border: "1px solid #ced4da",
    borderRadius: 4,
    width: "100%",
    boxSizing: "border-box",
    textAlign: 'center', 
  };

  const puntosCalculados = tempStats.pg * 3 + tempStats.pe;

  const baseButtonStyle: React.CSSProperties = {
    padding: "8px 12px",
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
    margin: "0 4px",
    fontSize: "0.85em",
    minWidth: "90px",
    minHeight: "40px",
    transition: 'background-color 0.2s',
  };

  return (
    <tr
      className={editando ? "equipo-item-edit-row" : ""}
      style={combinedRowStyle}
      onMouseEnter={(e) => {
        if (!editando) e.currentTarget.style.backgroundColor = "#e9ecef";
      }}
      onMouseLeave={(e) => {
        if (!editando) {
            const defaultBg = ( (parseInt(e.currentTarget.rowIndex.toString())-1) % 2 === 1 ? '#f8f9fa' : 'white');
            e.currentTarget.style.backgroundColor = rowStyle.backgroundColor || defaultBg;
        }
      }}
    >
      {editando ? (
        <>
          <td style={{ ...cellStyle, textAlign: "left" }}>
            <input name="nombre" value={tempStats.nombre} onChange={handleChange} style={{ ...inputStyle, width: "120px" }} />
          </td>
          <td style={cellStyle}>
            <input name="pg" type="number" min="0" value={tempStats.pg} onChange={handleChange} style={{ ...inputStyle, width: "60px" }} />
          </td>
          <td style={cellStyle}>
            <input name="pe" type="number" min="0" value={tempStats.pe} onChange={handleChange} style={{ ...inputStyle, width: "60px" }} />
          </td>
          <td style={cellStyle}>
            <input name="pp" type="number" min="0" value={tempStats.pp} onChange={handleChange} style={{ ...inputStyle, width: "60px" }} />
          </td>
          <td style={cellStyle}>
            <input name="goles" type="number" value={tempStats.goles} onChange={handleChange} style={{ ...inputStyle, width: "60px" }} />
          </td>
          <td style={{ ...cellStyle, fontWeight: "bold" }}>
            {puntosCalculados}
          </td>
          <td style={cellStyle} className="equipo-actions">
            <button onClick={guardarCambios} style={{ ...baseButtonStyle, backgroundColor: "#1f3c88", color: "white" }}>
              Guardar
            </button>
            <button onClick={cancelarEdicion} style={{ ...baseButtonStyle, backgroundColor: "#dc3545", color: "white" }}>
              Cancelar
            </button>
          </td>
        </>
      ) : (
        <>
          <td style={{ ...cellStyle, textAlign: "left", fontWeight: 500 }}>{equipo.nombre}</td>
          <td style={cellStyle}>{equipo.pg}</td>
          <td style={cellStyle}>{equipo.pe}</td>
          <td style={cellStyle}>{equipo.pp}</td>
          <td style={cellStyle}>{equipo.goles}</td>
          <td style={{ ...cellStyle, fontWeight: "bold", color: "#1f3c88", fontSize: "1.1em" }}>
            {equipo.puntos}
          </td>
          
          {/* 🔒 Botones solo visibles si tiene permiso */}
          {puedeEditar && (
            <td style={cellStyle} className="equipo-actions">
                <button
                onClick={() => setEditando(true)}
                style={{ ...baseButtonStyle, backgroundColor: "#1f3c88", color: "white" }}
                >
                Editar
                </button>
                <button
                onClick={() => onEliminar(equipo.id)}
                style={{ ...baseButtonStyle, backgroundColor: "#dc3545", color: "white" }}
                >
                Eliminar
                </button>
            </td>
          )}
        </>
      )}
    </tr>
  );
};

export default EquipoItem;