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
  vencimiento?: string;
  carnetUrl?: string;
  fichaMedicaUrl?: string;
}

interface ConfirmDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>¿Confirmá la eliminación?</h3>
        <p>Esta acción no puede deshacerse.</p>
        <div className="button-group">
          <button onClick={onConfirm} className="btn-danger">Eliminar</button>
          <button onClick={onCancel} className="btn-secondary">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

type Props = {
  jugador: Jugador;
  jugadores: Jugador[];
  onEditar: (jugador: Jugador) => void;
  onEliminar: (id: number) => void;
  onVolver: () => void;
  permisoEditar?: boolean;
  permisoEliminar?: boolean;
};

const VerJugadores: React.FC<Props> = ({
  jugador,
  jugadores,
  onEditar,
  onEliminar,
  onVolver,
  permisoEditar = true,
  permisoEliminar = true,
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleGuardarDatos = (datosActualizados: Jugador) => {
    onEditar(datosActualizados);
  };

  const handleConfirmDelete = () => {
    onEliminar(jugador.id);
    setShowConfirmDelete(false);
  };

  return (
    <div className="container-detail">
      <h2>{jugador.nombre} {jugador.apellido}</h2>

      <div className="info-card">
        <h3>Información Personal</h3>
        <p><strong>DNI:</strong> {jugador.dni}</p>
        <p><strong>Teléfono:</strong> {jugador.vencimiento || "N/A"}</p>
      </div>

      <div className="info-card">
        <h3>Información Deportiva</h3>
        <p><strong>Club:</strong> {jugador.club}</p>
        <p><strong>Categoría:</strong> {jugador.categoria}</p>
        <p><strong>Estado:</strong> {jugador.estado}</p>
      </div>

      {/* Documentación */}
      <div className="info-card">
        <h3>Documentación</h3>
        {jugador.carnetUrl && (
          <p><a href={jugador.carnetUrl} target="_blank" rel="noopener noreferrer">Ver Carnet</a></p>
        )}
        {jugador.fichaMedicaUrl && (
          <p><a href={jugador.fichaMedicaUrl} target="_blank" rel="noopener noreferrer">Ver Ficha Médica</a></p>
        )}
      </div>

      <div className="button-group">
        {permisoEditar && <button onClick={() => onEditar(jugador)} className="btn-primary">Editar</button>}
        {permisoEliminar && <button onClick={() => setShowConfirmDelete(true)} className="btn-danger">Eliminar</button>}
        <button onClick={onVolver} className="btn-secondary">Volver</button>
      </div>

      {showConfirmDelete && (
        <ConfirmDelete
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirmDelete(false)}
        />
      )}
    </div>
  );
};

export default VerJugadores;
