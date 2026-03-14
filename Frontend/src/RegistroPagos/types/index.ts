export interface Pago {
  id: number;
  tipo: 'cuota' | 'arbitraje' | 'multa' | 'otro';
  concepto: string;
  clubId: number;
  monto: number;
  fecha: string;
  vencimiento?: string;
  estado: 'pendiente' | 'pagado' | 'validado' | 'invalido';
  categoria?: string;
  cantidadJugadores?: number;
  partidoId?: number;
  motivo?: string;
  metodo_pago?: 'efectivo' | 'transferencia' | 'cheque' | 'tarjeta';
  numero_transaccion?: string;
  observaciones?: string;
}

export interface Club {
  id: number;
  nombre: string;
}

export type CreatePagoDto = Omit<Pago, 'id'>;
export type UpdatePagoDto = Partial<CreatePagoDto>;
