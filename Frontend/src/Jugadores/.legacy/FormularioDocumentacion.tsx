import React, { useState } from "react";
import './jugadores-responsive.css';

type Jugador = {
  id: number;
  nombre: string;
  apellido: string;
  vencimiento?: string;
  carnetUrl?: string;
  fichaMedicaUrl?: string;
  vencimientoFichaMedica?: string;
};

type UpdateJugadorPayload = {
  carnetUrl?: string;
  fichaMedicaUrl?: string;
  vencimientoFichaMedica?: string;
  // ... otros campos
};

type Props = {
  jugador: Jugador;
  onGuardar: (payload: UpdateJugadorPayload) => void;
  onCancelar: () => void;
};

const FormularioDocumentacion: React.FC<Props> = ({ jugador, onGuardar, onCancelar }) => {
  const [form, setForm] = useState<UpdateJugadorPayload>({
    vencimientoFichaMedica: jugador.vencimientoFichaMedica || "",
    carnetUrl: jugador.carnetUrl || "",
    fichaMedicaUrl: jugador.fichaMedicaUrl || "",
  });
  const [previewCarnet, setPreviewCarnet] = useState<string | null>(jugador.carnetUrl || null);
  const [previewFicha, setPreviewFicha] = useState<string | null>(jugador.fichaMedicaUrl || null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, tipo: "carnet" | "ficha") => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamaño (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("El archivo no debe superar 5MB.");
      return;
    }

    // Validar tipo de archivo
    const extensionesPermitidas = tipo === "carnet" ? ["image/jpeg", "image/png"] : ["application/pdf", "image/jpeg", "image/png"];
    if (!extensionesPermitidas.includes(file.type)) {
      setError(`Tipo de archivo no soportado para ${tipo === "carnet" ? "carnet" : "ficha"}.`);
      return;
    }

    setError(null);

    // Convertir a Base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      if (tipo === "carnet") {
        setForm({ ...form, carnetUrl: base64 });
        setPreviewCarnet(base64);
      } else {
        setForm({ ...form, fichaMedicaUrl: base64 });
        setPreviewFicha(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar(form);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container-edit" noValidate>
      <h2 className="form-title-edit">Paso 2: Documentación</h2>

      {error && <div className="form-error">{error}</div>}

      <div className="form-fields-grid">
        <div className="form-group">
          <label htmlFor="vencimientoFichaMedica">Vencimiento de Ficha Médica</label>
          <input
            id="vencimientoFichaMedica"
            name="vencimientoFichaMedica"
            className="form-input"
            type="date"
            value={form.vencimientoFichaMedica || ""}
            onChange={(e) => setForm({ ...form, vencimientoFichaMedica: e.target.value })}
          />
        </div>
      </div>

      <div className="form-fields-grid">
        <div className="form-group">
          <label htmlFor="carnet">Carnet <span aria-hidden style={{color:'#c00'}}>*</span></label>
          <input
            id="carnet"
            type="file"
            className="form-input"
            accept="image/jpeg,image/png"
            onChange={(e) => handleFileChange(e, "carnet")}
          />
          {previewCarnet && (
            <img src={previewCarnet} alt="Preview de Carnet" style={{ maxWidth: '100px', marginTop: '8px', borderRadius: '4px' }} />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="ficha">Ficha Médica</label>
          <input
            id="ficha"
            type="file"
            className="form-input"
            accept="application/pdf,image/jpeg,image/png"
            onChange={(e) => handleFileChange(e, "ficha")}
          />
          {previewFicha && (
            fichaMedicaUrl?.endsWith('.pdf') ? (
              <a href={previewFicha} target="_blank" rel="noopener noreferrer" style={{ color: '#1f3c88', textDecoration: 'underline' }}>Ver PDF</a>
            ) : (
              <img src={previewFicha} alt="Preview de Ficha Médica" style={{ maxWidth: '100px', marginTop: '8px', borderRadius: '4px' }} />
            )
          )}
        </div>
      </div>

      <div className="button-group-edit" style={{ marginTop: 16 }}>
        <button type="submit" className="btn-action btn-primary">Guardar</button>
        <button type="button" onClick={onCancelar} className="btn-action btn-secondary">Cancelar</button>
      </div>
    </form>
  );
};

export default FormularioDocumentacion;
