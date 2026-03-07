import React, { useState, useEffect } from "react";
import FormularioDatos from "./FormularioDatos";
import FormularioDocumentacion from "./FormularioDocumentacion";
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

type EditarJugadorProps = {
  jugador: Jugador;
  jugadores: Jugador[];
  onGuardar: (jugador: Jugador) => void;
  onCancelar: () => void;
};

const EditarJugador: React.FC<EditarJugadorProps> = ({ jugador, jugadores, onGuardar, onCancelar }) => {
  const [paso, setPaso] = useState(1);
  const [datosTemporales, setDatosTemporales] = useState<Jugador>(jugador);

  const handleGuardarDatos = (datos: Jugador) => {
    setDatosTemporales(datos);
    setPaso(2);
  };

  const handleGuardarDocumentacion = (documentacion: any) => {
    const datosFinales = { ...datosTemporales, ...documentacion };
    onGuardar(datosFinales);
  };

  return (
    <div className="container-edit">
      {paso === 1 ? (
        <FormularioDatos
          jugador={datosTemporales}
          onGuardar={handleGuardarDatos}
          onCancelar={onCancelar}
          jugadores={jugadores}
        />
      ) : (
        <FormularioDocumentacion
          jugador={datosTemporales}
          onGuardar={handleGuardarDocumentacion}
          onCancelar={() => setPaso(1)}
        />
      )}
    </div>
  );
};

export default EditarJugador;
