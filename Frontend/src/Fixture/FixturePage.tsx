import React, { useState, useEffect } from "react";
import RegistrarFixture from "./RegistrarFixture";
import EditarFixture from "./EditarFixture";
import ListaFixture from "./ListaFixture";
import { hasRole } from "../utils/auth"; 
import './fixture-responsive.css';

// --- Tipos de la API ---
interface Club {
  id: number;
  nombre: string;
}

interface EncuentroAPI {
  id: number;
  jornada: number;
  grupo?: string;
  fecha?: string;
  resultado: string;
  club1Id: number;
  club2Id: number;
  club1: Club;
  club2: Club;
}

interface FixtureAPI {
  id: number;
  fecha: string;
  lugar: string;
  partidos: EncuentroAPI[];
}

// --- DTOs para enviar ---
interface CreateEncuentroDto {
  jornada: number;
  grupo?: string;
  fecha?: string;
  resultado: string;
  club1Id: number;
  club2Id: number;
}

interface CreateFixtureDto {
  fecha: string;
  lugar: string;
  partidos: CreateEncuentroDto[];
}

const API_URL = "http://localhost:3001";

const FixturePage: React.FC = () => {
  // 🔒 Permisos: Solo la Presidenta edita/crea
  const esPresidenta = hasRole(['presidenta']);

  const [fixtures, setFixtures] = useState<FixtureAPI[]>([]);
  const [clubes, setClubes] = useState<Club[]>([]);
  const [fixtureEditando, setFixtureEditando] = useState<FixtureAPI | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🎨 ESTILOS PARA REGISTRAR FIXTURE
  const buttonStyles = {
    buttonBase: {
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold" as const,
      transition: "background-color 0.3s",
    },
    buttonPrimary: {
      backgroundColor: "#1f3c88",
      color: "white",
    },
    buttonSuccess: {
      backgroundColor: "#28a745",
      color: "white",
    },
    buttonContainer: {
      display: "flex" as const,
      gap: "10px",
      marginTop: "20px",
    },
    errorMessage: {
      color: "#d32f2f",
      backgroundColor: "#ffebee",
      padding: "10px",
      borderRadius: "4px",
      marginBottom: "10px",
      border: "1px solid #ef5350",
    },
    successMessage: {
      color: "#388e3c",
      backgroundColor: "#e8f5e9",
      padding: "10px",
      borderRadius: "4px",
      marginBottom: "10px",
      border: "1px solid #66bb6a",
    },
  };

  useEffect(() => {
    cargarFixtures();
    cargarClubes();
  }, []);

  const cargarFixtures = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/fixtures`);
      if (!res.ok) throw new Error("Error al cargar fixtures");
      const data: FixtureAPI[] = await res.json();
      setFixtures(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const cargarClubes = async () => {
    try {
      const res = await fetch(`${API_URL}/clubes`);
      if (!res.ok) throw new Error("Error al cargar clubes");
      const data: Club[] = await res.json();
      setClubes(data);
    } catch (err) {
      console.error("Error cargando clubes:", err);
    }
  };

  // --- Funciones CRUD (Protegidas con Token) ---
  const agregarFixture = async (dto: CreateFixtureDto) => {
    if (!esPresidenta) return; // 🔒 Bloqueo extra

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/fixtures`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}` // 🔒 Token
        },
        body: JSON.stringify(dto),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Error al crear fixture");
      }
      await cargarFixtures(); 
      alert("Fixture guardado exitosamente!"); 
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const iniciarEdicion = (fixture: FixtureAPI) => {
    if (!esPresidenta) return; // 🔒
    setFixtureEditando(fixture);
    setError(null);
  };

  const guardarEdicion = async (id: number, dto: Partial<CreateFixtureDto>) => {
    if (!esPresidenta) return; // 🔒

    setLoading(true);
    setError(null);
    try {
      const payload = { fecha: dto.fecha, lugar: dto.lugar };

      const res = await fetch(`${API_URL}/fixtures/${id}`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}` // 🔒 Token
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Error al actualizar fixture");
      }
      await cargarFixtures();
      cancelarEdicion(); 
      alert("Fixture actualizado exitosamente!"); 
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const cancelarEdicion = () => {
    setFixtureEditando(null);
    setError(null);
  };

  const generarFixtureAutomatico = async () => {
    if (!esPresidenta) return; // 🔒

    if (clubes.length < 2) { 
      setError("Se necesitan al menos 2 clubes registrados para generar un fixture.");
      return;
    }
    const jornada = fixtures.length + 1;
    const fechaHoy = new Date().toISOString().split("T")[0];
    const partidosDto: CreateEncuentroDto[] = [];

    const clubesParaGenerar = [...clubes]; 
    if (clubesParaGenerar.length % 2 !== 0) {
        clubesParaGenerar.push({ id: -1, nombre: "BYE" });
    }
    const numRondas = clubesParaGenerar.length - 1;
    const mitad = clubesParaGenerar.length / 2;

    for (let r = 0; r < numRondas; r++) {
      for (let i = 0; i < mitad; i++) {
        const club1 = clubesParaGenerar[i];
        const club2 = clubesParaGenerar[clubesParaGenerar.length - 1 - i];

        if (club1.id !== -1 && club2.id !== -1) {
            const esLocalClub1 = r % 2 === 0 || i === 0; 
             partidosDto.push({
                jornada: jornada + r, 
                club1Id: esLocalClub1 ? club1.id : club2.id,
                club2Id: esLocalClub1 ? club2.id : club1.id,
                resultado: "-",
                fecha: fechaHoy 
            });
        }
      }
      const ultimo = clubesParaGenerar.pop();
      if(ultimo) clubesParaGenerar.splice(1, 0, ultimo);
    }

    if (partidosDto.length === 0) {
        setError("No se pudieron generar partidos.");
        return;
    }

    const fixtureGeneradoDto: CreateFixtureDto = {
      fecha: fechaHoy, 
      lugar: `Generado Autom. ${numRondas} Jornadas`,
      partidos: partidosDto,
    };

    await agregarFixture(fixtureGeneradoDto);
  };

  return (
    <main className="pageContainer" role="main" aria-label="Gestión de Fixture">
      <section className="fixture-card">
        <header className="fixture-header">
          <h1 className="title">Gestión y Registro de Fixture</h1>
          <div className="buttonContainer" role="toolbar" aria-label="Acciones de Fixture">
            {/* buttons handled below */}
          </div>
        </header>

        {error && <div className="errorMessage" role="alert" aria-live="polite">{error}</div>}
        {loading && (
          <div className="loading-container" role="status" aria-live="polite" aria-label="Cargando fixtures">
            <div className="spinner"></div>
            <p className="loading-text">Cargando fixtures...</p>
          </div>
        )}

        {/* 🔒 SECCIÓN DE EDICIÓN (SOLO PRESIDENTA) */}
        {fixtureEditando && esPresidenta ? (
          <EditarFixture
            fixture={fixtureEditando}
            clubes={clubes}
            onGuardar={(id, actualizado) => guardarEdicion(id, actualizado)}
            onCancelar={cancelarEdicion}
          />
        ) : (
          /* 🔒 SECCIÓN DE REGISTRO (SOLO PRESIDENTA) */
          esPresidenta && (
            <>
              <RegistrarFixture
                onAgregarFixture={agregarFixture}
                onGenerarAutomatico={generarFixtureAutomatico}
                clubes={clubes}
                styles={buttonStyles}
              />
              <hr className="divider" aria-hidden="true" />
            </>
          )
        )}

        <h3>Fixtures Existentes</h3>

        <ListaFixture
          fixtures={fixtures}
          onEdit={iniciarEdicion}
          canEdit={esPresidenta} // 🔒 Pasamos el permiso al componente hijo
        />
      </section>
    </main>
  );
};

export default FixturePage;