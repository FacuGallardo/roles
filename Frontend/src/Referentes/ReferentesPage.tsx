import React, { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import RegistrarReferente from "./RegistrarReferente";
import EditarReferente from "./EditarReferente";
import ListaReferente from "./ListaReferente";
import VistaReferente from "./VistaReferente";
import { useReferentes } from "./hooks/useReferentes";
import type { Referente, CreateReferenteDto, UpdateReferenteDto } from "./types";
import { validarReferente } from "./utils/referenteValidations";
import "./referentes-responsive.css";

// =========================================================
// 🎨 SECCIÓN DE ESTILOS
// =========================================================
interface Styles {
  [key: string]: CSSProperties;
}

export const styles: Styles = {
  contenedorPrincipal: {
    padding: '32px',
    paddingTop: '1rem',
    backgroundColor: '#eef2f6',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  titulo: {
    fontSize: '36px',
    fontWeight: '600',
    textAlign: 'center',
    color: '#1e40af',
    borderBottom: '3px solid #1e40af',
    paddingBottom: '5px',
    display: 'block',
    width: 'fit-content',
    margin: '0 auto 24px auto',
    letterSpacing: '0.02em',
  },
  formTitulo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e40af',
    textAlign: 'center',
    marginBottom: '28px',
  },
  cardFormulario: {
    maxWidth: '52rem',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.05)',
    borderRadius: '16px',
    padding: '36px',
    marginBottom: '32px',
    border: '1px solid #e2e8f0',
  },
  cardLista: {
    maxWidth: '52rem',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.05)',
    borderRadius: '16px',
    padding: '32px',
    border: '1px solid #e2e8f0',
  },
  inputOscuro: {
    backgroundColor: '#374151',
    color: '#ffffff',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #4b5563',
    marginBottom: '16px',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '16px',
  } as CSSProperties,
  botonPrimario: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.1s ease, opacity 0.3s ease',
    boxShadow: '0 4px 10px rgba(59, 130, 246, 0.5)',
    width: '100%',
    marginTop: '20px',
  } as CSSProperties,
  botonSecundario: {
    backgroundColor: '#9ca3af',
    color: '#ffffff',
    padding: '10px 16px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.1s ease',
  } as CSSProperties,
  mensajeAlerta: {
    padding: '12px',
    borderRadius: '8px',
    fontWeight: '600',
    textAlign: 'center',
  } as CSSProperties,
  mensajeError: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    border: '1px solid #fca5a5',
  },
  mensajeExito: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    border: '1px solid #a7f3d0',
  },
};

// =========================================================

const ReferentesPage: React.FC = () => {
  const { referentes, clubes, error, fetchReferentes, fetchClubes, crearReferente, actualizarReferente, eliminarReferente, setError } = useReferentes();
  const [referenteSeleccionado, setReferenteSeleccionado] = useState<Referente | null>(null);
  const [editando, setEditando] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(true);
  const [validationErrors, setValidationErrors] = useState<any>(null);

  useEffect(() => {
    fetchReferentes();
    fetchClubes();
  }, [fetchReferentes, fetchClubes]);

  const manejarVolver = () => {
    setReferenteSeleccionado(null);
    setEditando(false);
    setError(null);
    setValidationErrors(null);
  };

  const manejarIrRegistro = () => {
    setMostrarRegistro(true);
    manejarVolver();
  };

  const manejarIrLista = () => {
    setMostrarRegistro(false);
    manejarVolver();
  };

  const registrarReferente = async (dto: CreateReferenteDto) => {
    setError(null);
    setValidationErrors(null);
    
    const errors = validarReferente(dto, referentes);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    const result = await crearReferente(dto);
    if (result) {
      manejarIrLista();
    }
  };

  const actualizarReferenteHandler = async (id: number, dto: UpdateReferenteDto) => {
    setError(null);
    setValidationErrors(null);
    
    const errors = validarReferente(dto, referentes, id);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    const result = await actualizarReferente(id, dto);
    if (result) {
      manejarIrLista();
    }
  };

  const eliminarReferenteHandler = (id: number) => {
    if (!window.confirm("¿Seguro que quieres eliminar este referente?")) return;
    eliminarReferente(id).then((success) => {
      if (success) {
        manejarVolver();
      }
    });
  };

  const vistaDetalleActiva = referenteSeleccionado !== null;

  const estiloBotonNavegacion: CSSProperties = {
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    backgroundColor: "#1f3c88",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease, opacity 0.3s ease",
    fontWeight: "600",
    fontSize: "16px",
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: "auto",
    marginTop: 0,
  };

  const getErrorMessage = () => {
    if (error) return error;
    if (validationErrors && validationErrors.length > 0) {
      return validationErrors.map((e: any) => e.message).join("; ");
    }
    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <div style={styles.contenedorPrincipal}>
      <h2 style={styles.titulo}>Gestión de Referentes</h2>

      {referenteSeleccionado && !editando && (
        <VistaReferente
          referente={referenteSeleccionado}
          onVolver={manejarIrLista}
        />
      )}

      {referenteSeleccionado && editando && (
        <EditarReferente
          referente={referenteSeleccionado}
          clubes={clubes}
          onActualizar={actualizarReferenteHandler}
          onCancelar={manejarIrLista}
          error={errorMessage}
        />
      )}

      {!vistaDetalleActiva && (
        <div style={{ maxWidth: "52rem", margin: "0 auto", width: "100%", marginBottom: "-32px" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "32px" }}>
            <button
              onClick={manejarIrRegistro}
              style={{ ...estiloBotonNavegacion, opacity: mostrarRegistro ? 1 : 0.6 }}
            >
              Formulario de Registro
            </button>
            <button
              onClick={manejarIrLista}
              style={{ ...estiloBotonNavegacion, opacity: !mostrarRegistro ? 1 : 0.6 }}
            >
              Lista de Referentes ({referentes.length})
            </button>
          </div>

          {errorMessage && mostrarRegistro && (
            <div style={{ ...styles.mensajeAlerta, ...styles.mensajeError, maxWidth: "52rem", marginLeft: "auto", marginRight: "auto", marginBottom: "16px", marginTop: 0 }}>
              {errorMessage}
            </div>
          )}

          {mostrarRegistro ? (
            <div style={styles.cardFormulario}>
              <RegistrarReferente onGuardar={registrarReferente} clubes={clubes} />
            </div>
          ) : (
            <div style={styles.cardLista}>
              <ListaReferente
                referentes={referentes}
                onVer={setReferenteSeleccionado}
                onEditar={(ref: Referente) => {
                  setReferenteSeleccionado(ref);
                  setEditando(true);
                }}
                onEliminar={eliminarReferenteHandler}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReferentesPage;
