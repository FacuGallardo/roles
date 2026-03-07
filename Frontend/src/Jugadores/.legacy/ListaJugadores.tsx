import React, { useState, useEffect } from "react";
import './jugadores-responsive.css';

interface Jugador {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  club: string;
  categoria: string;
  estado: string;
}

interface ListaJugadoresProps {
  jugadores: Jugador[];
  onVer: (jugador: Jugador) => void;
  onEditar: (jugador: Jugador) => void;
  onEliminar: (id: number) => void;
  permisoEditar?: boolean;
  permisoEliminar?: boolean;
}

const ListaJugadores: React.FC<ListaJugadoresProps> = ({
  jugadores,
  onVer,
  onEditar,
  onEliminar,
  permisoEditar = true,
  permisoEliminar = true,
}) => {
  const getStatusColor = (estado: string): string => {
    switch (estado.toLowerCase()) {
      case "activo":
        return "#059669";
      case "lesionado":
        return "#F59E0B";
      case "sancionado":
        return "#ef4444";
      case "inactivo":
        return "#9CA3AF";
      default:
        return "#6b7280";
    }
  };

  if (jugadores.length === 0) {
    return <div className="empty-state">No hay jugadores registrados</div>;
  }

  return (
    <table className="table-container">
      <thead>
        <tr>
          <th>Nombre Completo</th>
          <th>DNI</th>
          <th>Club</th>
          <th>Categoría</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {jugadores.map((jugador) => (
          <tr key={jugador.id}>
            <td>{jugador.nombre} {jugador.apellido}</td>
            <td>{jugador.dni}</td>
            <td>{jugador.club}</td>
            <td>{jugador.categoria}</td>
            <td>
              <span className="status-pill" style={{
                backgroundColor: getStatusColor(jugador.estado),
                color: '#fff',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                {jugador.estado}
              </span>
            </td>
            <td>
              <div className="button-group" style={{gap: '4px'}}>
                <button onClick={() => onVer(jugador)} className="btn-secondary" style={{fontSize: '0.875rem'}}>Ver</button>
                {permisoEditar && <button onClick={() => onEditar(jugador)} className="btn-primary" style={{fontSize: '0.875rem'}}>Editar</button>}
                {permisoEliminar && <button onClick={() => onEliminar(jugador.id)} className="btn-danger" style={{fontSize: '0.875rem'}}>Eliminar</button>}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListaJugadores;
