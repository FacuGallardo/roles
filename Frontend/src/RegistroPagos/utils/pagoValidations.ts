import type { CreatePagoDto } from '../types';

export interface PagoValidationErrors {
  tipo?: string;
  concepto?: string;
  monto?: string;
  fecha?: string;
  vencimiento?: string;
  estado?: string;
  clubId?: string;
}

export const validatePago = (pago: Partial<CreatePagoDto>): PagoValidationErrors => {
  const errors: PagoValidationErrors = {};

  // Validar tipo
  if (!pago.tipo) {
    errors.tipo = 'El tipo es requerido';
  } else if (!['cuota', 'arbitraje', 'multa', 'otro'].includes(pago.tipo)) {
    errors.tipo = 'Tipo de pago inválido';
  }

  // Validar concepto
  if (!pago.concepto?.trim()) {
    errors.concepto = 'El concepto es requerido';
  } else if (pago.concepto.length < 3) {
    errors.concepto = 'El concepto debe tener al menos 3 caracteres';
  } else if (pago.concepto.length > 200) {
    errors.concepto = 'El concepto no puede exceder 200 caracteres';
  }

  // Validar monto
  if (!pago.monto) {
    errors.monto = 'El monto es requerido';
  } else if (typeof pago.monto !== 'number' || pago.monto <= 0) {
    errors.monto = 'El monto debe ser un número mayor a 0';
  }

  // Validar fecha
  if (!pago.fecha) {
    errors.fecha = 'La fecha es requerida';
  } else {
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(pago.fecha)) {
      errors.fecha = 'Formato de fecha inválido (YYYY-MM-DD)';
    }
  }

  // Validar vencimiento si está presente
  if (pago.vencimiento) {
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(pago.vencimiento)) {
      errors.vencimiento = 'Formato de vencimiento inválido (YYYY-MM-DD)';
    }
  }

  // Validar estado
  if (!pago.estado) {
    errors.estado = 'El estado es requerido';
  } else if (!['pendiente', 'pagado', 'validado', 'invalido'].includes(pago.estado)) {
    errors.estado = 'Estado inválido';
  }

  // Validar clubId
  if (!pago.clubId) {
    errors.clubId = 'El club es requerido';
  } else if (typeof pago.clubId !== 'number' || pago.clubId <= 0) {
    errors.clubId = 'Club inválido';
  }

  return errors;
};

export const hasValidationErrors = (errors: PagoValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
