import React, { useState, useEffect } from "react";
import "./registropagos-responsive.css";
// Tipos
type TipoPago = 'cuota' | 'arbitraje' | 'multa' | 'otro';

type Props = {
  tipo: TipoPago;
  club: string;
  montoMinimo: number;
  partidos: any[]; 
  onGuardar: (pagoFormData: any) => void;
  onCerrar: () => void;
};

const categorias = ["Masculino", "Femenino", "Ambos"];

// Estilos
const styleConfig = {
    modalContainer: {
        position: 'relative' as 'relative',
        padding: 'clamp(1rem, 4vw, 2rem)',
        width: '100%',
        maxWidth: 'clamp(300px, 90vw, 500px)',
        margin: '2rem auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        border: '1px solid #ddd',
        maxHeight: '90vh',
        overflowY: 'auto' as 'auto',
        WebkitOverflowScrolling: 'touch' as any,
    },
    closeButton: {
        position: 'absolute' as 'absolute',
        top: '0.5rem',
        right: '0.5rem',
        border: 'none',
        background: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: '#666',
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        transition: 'all 0.2s ease',
    },
    title: {
        borderBottom: '2px solid #1f3c88',
        paddingBottom: '0.5rem',
        marginBottom: '1.5rem',
        textAlign: 'center' as 'center',
        color: '#333',
        fontSize: 'clamp(1.1rem, 4vw, 1.3rem)',
    },
    form: {
        display: 'grid',
        gap: '1rem',
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: 'bold' as 'bold',
        color: '#555',
        fontSize: '0.95rem',
    },
    input: {
        width: '100%',
        padding: '0.75rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box' as 'border-box',
        minHeight: '44px',
        fontSize: '1rem',
        transition: 'all 0.2s ease',
    },
    submitButton: {
        backgroundColor: '#1f3c88',
        color: 'white',
        padding: '0.75rem 1.5rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '1.5rem',
        fontSize: '1rem',
        fontWeight: 'bold' as 'bold',
        minHeight: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        transition: 'all 0.3s ease',
    },
    smallText: {
        display: 'block',
        marginTop: '0.5rem',
        fontSize: '0.85rem',
        color: '#777',
    }
};

const FormularioPago: React.FC<Props> = ({ tipo, club, montoMinimo, partidos = [], onGuardar, onCerrar }) => {
  const [categoria, setCategoria] = useState<string>("Masculino");
  const [cantidadJugadores, setCantidadJugadores] = useState<number>(1);
  const [monto, setMonto] = useState<number>(montoMinimo);
  const [comprobante, setComprobante] = useState("");
  const [comprobanteArchivo, setComprobanteArchivo] = useState<string | undefined>(undefined);
  const [partidoId, setPartidoId] = useState<number | "">("");
  const [motivo, setMotivo] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMonto(montoMinimo);
  }, [montoMinimo, tipo]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) { 
        setError("El archivo no debe superar los 5MB.");
        e.target.value = ''; 
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") setComprobanteArchivo(reader.result);
    };
    reader.readAsDataURL(file);
    setError(null); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 

    if (!comprobante && !comprobanteArchivo) {
        setError("Debes ingresar el número de comprobante o adjuntar el archivo.");
        return;
    }
    if (monto < montoMinimo) {
      setError(`El monto mínimo para ${tipo} es $${montoMinimo.toLocaleString()}.`);
      return;
    }
    if (tipo === "cuota" && (!cantidadJugadores || cantidadJugadores < 1)) {
      setError("Ingresa una cantidad válida de jugadores.");
      return;
    }
    if (tipo === "arbitraje" && !partidoId) {
      setError("Debes seleccionar el partido.");
      return;
    }
    if ((tipo === "multa" || tipo === "otro") && !motivo.trim()) {
      setError(`Debes ingresar un motivo.`);
      return;
    }

    setLoading(true);
    
    const pagoFormData = {
      tipo: tipo,
      club: club, 
      monto: monto,
      comprobante: comprobante,
      comprobanteArchivo: comprobanteArchivo,
      categoria: (tipo === "cuota" || tipo === "arbitraje") ? categoria : undefined,
      partidoId: tipo === "arbitraje" ? Number(partidoId) : undefined,
      cantidadJugadores: tipo === "cuota" ? cantidadJugadores : undefined,
      motivo: (tipo === "multa" || tipo === "otro") ? motivo : ""
    };

    onGuardar(pagoFormData);
    // Nota: setLoading(false) lo manejará el ciclo de vida del componente padre o al desmontar
  };

  // Filtrar partidos
  const partidosRelevantes = tipo === 'arbitraje'
    ? partidos : []; // Ajusta esto si tu estructura de partidos es compleja

  const categoriaGridStyles = `
    .categoria-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 12px;
      margin-bottom: 1rem;
    }
    
    .categoria-option {
      position: relative;
    }
    
    .categoria-option input[type="radio"] {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .categoria-label {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px 16px;
      background-color: #f9fafb;
      border: 2px solid #d1d5db;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      font-weight: 600;
      font-size: 0.95rem;
      color: #374151;
      min-height: 44px;
    }
    
    .categoria-option input[type="radio"]:checked + .categoria-label {
      background-color: #1f3c88;
      border-color: #1f3c88;
      color: white;
      box-shadow: 0 0 0 3px rgba(31, 60, 136, 0.2);
    }
    
    .categoria-label:hover {
      border-color: #1f3c88;
      background-color: #f0f4ff;
    }
    
    .categoria-option input[type="radio"]:checked + .categoria-label:hover {
      background-color: #153d7b;
    }
  `;

  return (
    <>
      <style>{categoriaGridStyles}</style>
    <div style={styleConfig.modalContainer}>
      <button type="button" onClick={onCerrar} style={styleConfig.closeButton}>&times;</button>
      <h2 style={styleConfig.title}>
          {tipo.toUpperCase()}: {club}
      </h2>

      {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={styleConfig.form}>
        {(tipo === "cuota" || tipo === "arbitraje") && (
          <div>
            <label style={styleConfig.label}>Categoría *</label>
            <div className="categoria-grid">
              {categorias.map(cat => (
                <div key={cat} className="categoria-option">
                  <input 
                    type="radio" 
                    id={`cat-${cat}`}
                    name="categoria"
                    value={cat}
                    checked={categoria === cat}
                    onChange={e => setCategoria(e.target.value)}
                    required
                  />
                  <label htmlFor={`cat-${cat}`} className="categoria-label">
                    {cat}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {tipo === "cuota" && (
          <div>
            <label style={styleConfig.label} htmlFor="cantidadJugadores">Cantidad de Jugadores *</label>
            <input id="cantidadJugadores" name="cantidadJugadores" type="number" min={1} value={cantidadJugadores} onChange={e => setCantidadJugadores(Number(e.target.value))} style={styleConfig.input} required />
          </div>
        )}
        
        {(tipo === "multa" || tipo === "otro") && (
          <div>
            <label style={styleConfig.label} htmlFor="motivo">Motivo *</label>
            <input id="motivo" name="motivo" type="text" value={motivo} placeholder="Descripción" onChange={e => setMotivo(e.target.value)} style={styleConfig.input} required />
          </div>
        )}

        <div>
          <label style={styleConfig.label} htmlFor="monto">Monto ($) *</label>
          <input id="monto" name="monto" type="number" min={montoMinimo} value={monto} onChange={e => setMonto(Number(e.target.value))} style={styleConfig.input} required />
            <small style={styleConfig.smallText}>Mínimo: ${montoMinimo.toLocaleString()}</small>
        </div>
        
        <div>
          <label style={styleConfig.label} htmlFor="comprobante">Nº Comprobante *</label>
          <input id="comprobante" name="comprobante" type="text" value={comprobante} placeholder="Ej: 12345" onChange={e => setComprobante(e.target.value)} style={styleConfig.input} required />
        </div>
        
        <div>
          <label style={styleConfig.label} htmlFor="comprobante-archivo">Adjuntar (Opcional)</label>
          <input id="comprobante-archivo" name="comprobante-archivo" type="file" accept="image/*,application/pdf" onChange={handleFileUpload} style={{padding: '5px 0'}} />
            {comprobanteArchivo && <small style={{color: 'green'}}> Archivo listo.</small>}
        </div>

        <button type="submit" style={styleConfig.submitButton} disabled={loading}>
          {loading ? 'Procesando...' : 'Registrar Pago'}
        </button>
      </form>
    </div>
    </>
  );
};

export default FormularioPago;