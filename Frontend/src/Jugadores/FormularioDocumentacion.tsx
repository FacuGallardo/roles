import React, { useState } from "react";
import './jugadores-responsive.css';

type Props = {
  jugadorInfo: { nombre: string; apellido: string };
  onGuardar: (docs: { carnetUrl?: string; fichaMedicaUrl?: string; vencimientoFichaMedica?: string }) => void;
  onCancelar: () => void;
};

const FormularioDocumentacion: React.FC<Props> = ({
  jugadorInfo,
  onGuardar,
  onCancelar,
}) => {
  const [carnet, setCarnet] = useState<string | undefined>(undefined);
  const [fichaMedica, setFichaMedica] = useState<string | undefined>(undefined);
  const [vencimientoFichaMedica, setVencimientoFichaMedica] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [fichaNombre, setFichaNombre] = useState<string | undefined>(undefined);

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valorLimpio = e.target.value.replace(/\D/g, '');
    if (valorLimpio.length > 8) valorLimpio = valorLimpio.slice(0, 8);
    let valorFormateado = '';
    for (let i = 0; i < valorLimpio.length; i++) {
      if (i === 2 || i === 4) valorFormateado += '/';
      valorFormateado += valorLimpio[i];
    }
    setVencimientoFichaMedica(valorFormateado);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    tipo: "carnet" | "ficha",
  ) => {
    const file = e.target.files?.[0];
    setError(null);
    if (!file) return;

    if (tipo === "carnet" && !file.type.startsWith("image/")) {
      setError("El carnet debe ser una imagen (jpg, png).");
      return;
    }
    if (tipo === "ficha" && file.type !== "application/pdf") {
      setError("La ficha médica debe ser un archivo PDF.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("El archivo no puede superar los 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        if (tipo === "carnet") setCarnet(reader.result);
        if (tipo === "ficha") {
          setFichaMedica(reader.result);
          setFichaNombre(file.name);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    onGuardar({ carnetUrl: carnet, fichaMedicaUrl: fichaMedica, vencimientoFichaMedica: vencimientoFichaMedica || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container-edit" noValidate>
      <h2 className="form-title-edit" style={{ marginTop: 0 }}>Paso 2: Documentación</h2>

      {error && <div style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>{error}</div>}

      <div className="form-fields-grid">
        <div className="form-group">
          <label htmlFor="carnet-upload">Carnet (Imagen, max 5MB)</label>
          <label className="upload-btn" aria-label="Subir carnet">
            <input
              id="carnet-upload"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "carnet")}
              style={{ display: 'none' }}
            />
            Subir Carnet
          </label>

          {carnet && (
            <div className="file-preview" aria-live="polite">
              <img src={carnet} alt="Carnet subido" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="ficha-upload">Ficha Médica (PDF, max 5MB)</label>
          <label className="upload-btn" aria-label="Subir ficha medica">
            <input
              id="ficha-upload"
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileUpload(e, "ficha")}
              style={{ display: 'none' }}
            />
            Subir Ficha Médica (PDF)
          </label>

          {fichaNombre && (
            <div style={{ marginTop: 8 }}>
              <a
                href={fichaMedica}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1f3c88", textDecoration: "underline", display: "inline-block" }}
              >
                {fichaNombre}
              </a>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="vencimiento">Vencimiento de la Ficha Médica (dd/mm/yyyy)</label>
          <input
            id="vencimiento"
            name="vencimiento"
            className="form-input"
            value={vencimientoFichaMedica}
            onChange={handleFechaChange}
            placeholder="dd/mm/yyyy"
            inputMode="numeric"
          />
        </div>
      </div>

      <div className="button-group-edit" style={{ marginTop: 12 }}>
        <button type="submit" className="btn-action btn-primary">Guardar Documentación</button>
        <button type="button" onClick={onCancelar} className="btn-action btn-secondary">Cancelar</button>
      </div>
    </form>
  );
};

export default FormularioDocumentacion;
