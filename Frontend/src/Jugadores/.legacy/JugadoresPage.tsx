import React, { useState, useEffect } from "react";
import BarraProgreso from "./BarraProgreso";
import ListaJugadores from "./ListaJugadores";
import RegistroJugador from "./RegistroJugador";
import EditarJugador from "./EditarJugador";
import VerJugadores from "./VerJugadores";
import './jugadores-responsive.css';

interface Club {
  id: number;
  nombre: string;
}

interface Jugador {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  clubId: number;
  club?: string;
  categoria: string;
  telefono?: string;
  vencimiento?: string;
  carnetUrl?: string;
  fichaMedicaUrl?: string;
  estado?: string;
}

type Vista = 'listado' | 'crear' | 'editar' | 'detalle';

const JugadoresPage: React.FC = () => {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [clubes, setClubes] = useState<Club[]>([]);
  const [vista, setVista] = useState<Vista>('listado');
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState<Jugador | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paso, setPaso] = useState(1);

  const API_URL = 'http://localhost:3001';
  const token = localStorage.getItem('token');

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch jugadores
        const response = await fetch(`${API_URL}/jugador`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch jugadores');
        const data = await response.json();
        setJugadores(data);

        // Fetch clubes
        const clubesResponse = await fetch(`${API_URL}/clubes`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!clubesResponse.ok) throw new Error('Failed to fetch clubes');
        const clubesData = await clubesResponse.json();
        setClubes(clubesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };
    fetchData();
  }, []);

  // Crear jugador
  const handleCrear = async (datosPersonales: Jugador, documentacion: any) => {
    try {
      const payload = { ...datosPersonales, ...documentacion };
      const response = await fetch(`${API_URL}/jugador`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to create jugador');
      const newJugador = await response.json();
      setJugadores([...jugadores, newJugador]);
      setVista('listado');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  // Editar jugador
  const handleEditar = async (jugadorActualizado: Jugador) => {
    try {
      const response = await fetch(`${API_URL}/jugador/${jugadorActualizado.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jugadorActualizado),
      });
      if (!response.ok) throw new Error('Failed to update jugador');
      const updated = await response.json();
      setJugadores(jugadores.map(j => j.id === updated.id ? updated : j));
      setVista('listado');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  // Eliminar jugador
  const handleEliminar = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/jugador/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to delete jugador');
      setJugadores(jugadores.filter(j => j.id !== id));
      setVista('listado');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const permisoEditar = true; // TODO: Get from auth context
  const permisoEliminar = true; // TODO: Get from auth context

  return (
    <div className="jugadores-page">
      {error && <div className="alert-error">{error}</div>}

      {(vista === 'crear' || vista === 'editar') && <BarraProgreso fase={paso} />}

      {vista === 'listado' && (
        <>
          <button onClick={() => { setVista('crear'); setPaso(1); }} className="btn-primary">
            Crear Jugador
          </button>
          <ListaJugadores
            jugadores={jugadores}
            onVer={(j) => {
              setJugadorSeleccionado(j);
              setVista('detalle');
            }}
            onEditar={(j) => {
              setJugadorSeleccionado(j);
              setVista('editar');
              setPaso(1);
            }}
            onEliminar={handleEliminar}
            permisoEditar={permisoEditar}
            permisoEliminar={permisoEliminar}
          />
        </>
      )}

      {vista === 'crear' && (
        <>
          {paso === 1 ? (
            <RegistroJugador
              clubes={clubes}
              onRegistrar={(datos) => {
                setJugadorSeleccionado(datos as Jugador);
                setPaso(2);
              }}
            />
          ) : (
            // TODO: Documentación paso
            <div>Documentación pendiente</div>
          )}
        </>
      )}

      {vista === 'editar' && jugadorSeleccionado && (
        <EditarJugador
          jugador={jugadorSeleccionado}
          jugadores={jugadores}
          onGuardar={handleEditar}
          onCancelar={() => setVista('listado')}
        />
      )}

      {vista === 'detalle' && jugadorSeleccionado && (
        <VerJugadores
          jugador={jugadorSeleccionado}
          jugadores={jugadores}
          onEditar={(j) => {
            setJugadorSeleccionado(j);
            setVista('editar');
          }}
          onEliminar={handleEliminar}
          onVolver={() => setVista('listado')}
          permisoEditar={permisoEditar}
          permisoEliminar={permisoEliminar}
        />
      )}
    </div>
  );
};

export default JugadoresPage;
