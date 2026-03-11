import React, { useState } from "react";
import "./registropagos-responsive.css";

type Pago = {
    id: number;
    tipo: string;
    club: string;
    categoria: string;
    monto: number;
    comprobante: string;
    comprobanteArchivo?: string;
    fecha: string;
    estado: string;
    cantidadJugadores: number;
};

type Props = {
    club: string;
    onGuardar: (pago: Pago) => void;
    montoMinimo: number;
    onCerrar: () => void; // Nuevo prop para cerrar el modal
};

const categorias = ["Masculino", "Femenino", "Ambos"];

const styleConfig = {
    modalContainer: "modal-form-container",
    closeButton: "modal-close-btn",
    title: "form-title-cuota",
    form: "form-body",
    label: "form-label",
    input: "form-input-control",
    fileInput: "form-file-input",
    submitButton: "btn-submit-cuota"
};

// ============================================
// SECCIÓN DE ESTILOS CSS PLANOS INYECTADOS
// ============================================
const globalStyles = `
/* Contenedor Principal del Modal (La tarjeta del formulario) */
.modal-form-container {
    position: relative;
    width: 100%;
    max-width: clamp(300px, 90vw, 450px);
    padding: clamp(1rem, 4vw, 2rem);
    background-color: #ffffff; /* bg-white */
    border-radius: 0.75rem; /* rounded-xl */
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* shadow-2xl */
    z-index: 60; /* Superior al backdrop (z-50) */
    max-height: 90vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}

/* Botón de Cerrar Modal */
.modal-close-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    border: none;
    font-size: 2rem;
    color: #9ca3af; /* text-gray-400 */
    cursor: pointer;
    transition: all 0.2s;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}

.modal-close-btn:hover {
    color: #4b5563; /* hover:text-gray-600 */
    transform: scale(1.1);
}

.modal-close-btn:active {
    transform: scale(0.95);
}

/* Título del Formulario (Cuota) */
.form-title-cuota {
    font-size: clamp(1.2rem, 5vw, 1.5rem);
    font-weight: 700; /* font-bold */
    color: #1f2937; /* text-gray-800 */
    text-align: center;
    border-bottom: 2px solid #f3f4f6;
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
}

/* Cuerpo del Formulario */
.form-body {
    display: flex;
    flex-direction: column;
    gap: 1.25rem; /* space-y-5 */
}

/* Etiqueta del Formulario */
.form-label {
    display: block;
    font-size: clamp(0.85rem, 2.5vw, 0.875rem);
    font-weight: 600; /* font-medium */
    color: #374151; /* text-gray-700 */
    margin-bottom: 0.5rem;
    line-height: 1.3;
}

/* Input/Select Control */
.form-input-control, .form-file-input {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    color: #1f2937; /* text-gray-900 */
    background-color: #f9fafb; /* bg-gray-50 */
    border: 1px solid #d1d5db; /* border-gray-300 */
    border-radius: 0.5rem; /* rounded-lg */
    transition: all 0.2s ease-in-out;
    appearance: none; /* Reset para selects */
    min-height: 44px;
    box-sizing: border-box;
}

.form-input-control:focus, .form-file-input:focus {
    border-color: #1f3c88;
    box-shadow: 0 0 0 3px rgba(31, 60, 136, 0.2);
    outline: none;
    background-color: #ffffff;
}

/* Estilo específico para input de archivo */
.form-file-input {
    padding: 0.5rem 1rem;
}

/* Categoría Grid Selection */
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

/* Botón de Enviar (Submit - Cuota) */
.btn-submit-cuota {
    width: 100%;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600; /* font-semibold */
    text-align: center;
    color: #ffffff; /* text-white */
    background-color: #1f3c88;
    border-radius: 0.5rem; /* rounded-lg */
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    margin-top: 1rem;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-submit-cuota:hover {
    background-color: #153d7b;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(31, 60, 136, 0.3);
}

.btn-submit-cuota:active {
    transform: translateY(0);
}

.btn-submit-cuota:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
`;
// ============================================

const FormularioCuota: React.FC<Props> = ({ club, onGuardar, montoMinimo, onCerrar }) => {
    const [categoria, setCategoria] = useState("Masculino");
    const [cantidadJugadores, setCantidadJugadores] = useState<number>(0);
    const [monto, setMonto] = useState<number>(montoMinimo);
    const [comprobante, setComprobante] = useState("");
    const [comprobanteArchivo, setComprobanteArchivo] = useState<string | undefined>(undefined);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") setComprobanteArchivo(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!categoria || !comprobante || monto < montoMinimo || cantidadJugadores < 1) {
            alert("Completa todos los campos y verifica el monto y cantidad de jugadores.");
            return;
        }
        const pago: Pago = {
            id: Date.now(),
            tipo: "cuota",
            club,
            categoria: categoria as any,
            monto,
            comprobante,
            comprobanteArchivo,
            fecha: new Date().toISOString(),
            estado: "pendiente",
            cantidadJugadores
        };
        onGuardar(pago);
    };

    return (
        <>
            {/* ⚠️ INYECCIÓN DE ESTILOS CSS PLANOS ⚠️ */}
            <style>{globalStyles}</style>

            <div className={styleConfig.modalContainer}>
                <button
                    type="button"
                    onClick={onCerrar} 
                    className={styleConfig.closeButton}
                    aria-label="Cerrar formulario"
                >
                    &times;
                </button>
                <h2 className={styleConfig.title}>
                     Pago de Cuota Anual: {club}
                </h2>
                <form onSubmit={handleSubmit} className={styleConfig.form}>
                    
                    {/* Categoría - Grid Selection */}
                    <div>
                        <label className={styleConfig.label}>Categoría</label>
                        <div className="categoria-grid">
                            {categorias.map(c => (
                                <div key={c} className="categoria-option">
                                    <input 
                                        type="radio" 
                                        id={`cat-${c}`}
                                        name="categoria"
                                        value={c}
                                        checked={categoria === c}
                                        onChange={e => setCategoria(e.target.value)}
                                        required
                                    />
                                    <label htmlFor={`cat-${c}`} className="categoria-label">
                                        {c}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Cantidad de Jugadores */}
                    <div>
                        <label className={styleConfig.label} htmlFor="jugadores">Cantidad de Jugadores</label>
                        <input
                            id="jugadores"
                            name="jugadores"
                            type="number"
                            min={1}
                            value={cantidadJugadores}
                            onChange={e => setCantidadJugadores(Number(e.target.value))}
                            placeholder="Cantidad de jugadores"
                            className={styleConfig.input}
                            required
                        />
                    </div>
                    
                    {/* Monto */}
                    <div>
                        <label className={styleConfig.label} htmlFor="monto">Monto</label>
                        <input
                            id="monto"
                            name="monto"
                            type="number"
                            min={montoMinimo}
                            value={monto}
                            onChange={e => setMonto(Number(e.target.value))}
                            placeholder={`Monto mínimo: $${montoMinimo.toLocaleString()}`}
                            className={styleConfig.input}
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Monto mínimo requerido: ${montoMinimo.toLocaleString()}</p>
                    </div>
                    
                    {/* Comprobante */}
                    <div>
                        <label className={styleConfig.label} htmlFor="comprobante">Número de Comprobante</label>
                        <input
                            id="comprobante"
                            name="comprobante"
                            type="text"
                            value={comprobante}
                            onChange={e => setComprobante(e.target.value)}
                            placeholder="Nº Comprobante de transferencia/depósito"
                            className={styleConfig.input}
                            required
                        />
                    </div>
                    
                    {/* Archivo */}
                    <div>
                        <label className={styleConfig.label} htmlFor="archivo">Adjuntar Comprobante (Opcional)</label>
                        <input
                            id="archivo"
                            name="archivo"
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleFileUpload}
                            className={styleConfig.fileInput}
                        />
                        {comprobanteArchivo && (
                            <p className="text-xs text-gray-500 mt-1 text-center">Archivo cargado.</p>
                        )}
                    </div>

                    <button type="submit" className={styleConfig.submitButton}>
                        Registrar Pago de Cuota
                    </button>
                </form>
            </div>
        </>
    );
};

export default FormularioCuota;
