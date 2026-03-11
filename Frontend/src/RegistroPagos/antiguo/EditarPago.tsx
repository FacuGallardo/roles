import React, { useState, useEffect } from "react";
import "./registropagos-responsive.css";

type Pago = any;

type Props = {
    pago: Pago;
    montoMinimo: number;
    partidos: any[];
    onGuardar: (actualizado: Pago) => void;
    onCancelar: () => void;
};

// Estilos CSS inyectados
const globalStyles = `
    .edit-form-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 500px; margin: 20px auto; }
    .form-label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; }
    .form-input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; }
    .btn-group { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
    .btn-save { background: #1f3c88; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .btn-cancel { background: #ef4444; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
`;

const EditarPago: React.FC<Props> = ({ pago, montoMinimo, partidos, onGuardar, onCancelar }) => {
    const [form, setForm] = useState<Pago>({ ...pago });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setForm({ ...pago });
    }, [pago]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev: any) => ({
             ...prev,
             [name]: (name === "monto" || name === "partidoId" || name === "cantidadJugadores") ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        onGuardar(form);
    };

    // Formato fecha
    const fechaInputValue = form.fecha ? new Date(form.fecha).toISOString().split('T')[0] : '';

    return (
        <>
            <style>{globalStyles}</style>
            <div className="edit-form-card">
                <h3 style={{textAlign: 'center', color: '#333', borderBottom: '1px solid #eee', paddingBottom: '10px'}}>
                    Editar Pago #{form.id}
                </h3>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="club" className="form-label">Club</label>
                        <input id="club" className="form-input" value={form.club} readOnly style={{backgroundColor: '#f9f9f9'}} />
                    </div>
                    
                    <div>
                        <label htmlFor="estado" className="form-label">Estado (Validación)</label>
                        <select id="estado" name="estado" className="form-input" value={form.estado} onChange={handleChange}>
                            <option value="pendiente">Pendiente</option>
                            <option value="validado">Validado</option>
                            <option value="invalido">Inválido</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="monto" className="form-label">Monto ($)</label>
                        <input id="monto" name="monto" type="number" className="form-input" value={form.monto} onChange={handleChange} min={montoMinimo} required />
                    </div>

                    <div>
                        <label htmlFor="comprobante" className="form-label">Nº Comprobante</label>
                        <input id="comprobante" name="comprobante" type="text" className="form-input" value={form.comprobante} onChange={handleChange} required />
                    </div>

                    <div>
                        <label htmlFor="fecha" className="form-label">Fecha</label>
                        <input id="fecha" name="fecha" type="date" className="form-input" value={fechaInputValue} onChange={handleChange} required />
                    </div>

                    {(form.tipo === 'multa' || form.tipo === 'otro') && (
                        <div>
                            <label htmlFor="motivo" className="form-label">Motivo</label>
                            <input id="motivo" name="motivo" className="form-input" value={form.motivo || ''} onChange={handleChange} />
                        </div>
                    )}

                    <div className="btn-group">
                        <button type="submit" className="btn-save" disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar'}
                        </button>
                        <button type="button" className="btn-cancel" onClick={onCancelar} disabled={loading}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditarPago;