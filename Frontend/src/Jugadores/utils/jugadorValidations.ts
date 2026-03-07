// src/Jugadores/utils/jugadorValidations.ts

export interface ValidationError {
  field: string;
  message: string;
}

export const validarJugador = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Nombre
  if (!data.nombre?.trim()) {
    errors.push({ field: 'nombre', message: 'El nombre es obligatorio' });
  } else if (data.nombre.trim().length < 2) {
    errors.push({ field: 'nombre', message: 'El nombre debe tener al menos 2 caracteres' });
  }

  // Apellido
  if (!data.apellido?.trim()) {
    errors.push({ field: 'apellido', message: 'El apellido es obligatorio' });
  } else if (data.apellido.trim().length < 2) {
    errors.push({ field: 'apellido', message: 'El apellido debe tener al menos 2 caracteres' });
  }

  // DNI
  if (!data.dni?.trim()) {
    errors.push({ field: 'dni', message: 'El DNI es obligatorio' });
  } else if (!/^\d{7,8}$/.test(data.dni.trim())) {
    errors.push({ field: 'dni', message: 'El DNI debe tener 7 u 8 dígitos numéricos' });
  }

  // Club
  if (!data.clubId || data.clubId === 0) {
    errors.push({ field: 'clubId', message: 'Debe seleccionar un club' });
  }

  // Categoría
  if (!data.categoria?.trim()) {
    errors.push({ field: 'categoria', message: 'Debe seleccionar una categoría' });
  }

  // Teléfono (opcional pero validar si existe)
  if (data.telefono && !/^\d{7,15}$/.test(data.telefono)) {
    errors.push({ field: 'telefono', message: 'El teléfono debe tener entre 7 y 15 dígitos' });
  }

  // Dorsal (opcional pero validar si existe)
  if (data.dorsal !== undefined && data.dorsal !== null && data.dorsal !== '') {
    const dorsal = Number(data.dorsal);
    if (isNaN(dorsal) || dorsal < 1 || dorsal > 99) {
      errors.push({ field: 'dorsal', message: 'El dorsal debe ser un número entre 1 y 99' });
    }
  }

  // Vencimiento (opcional pero validar si existe)
  if (data.vencimiento) {
    const fecha = new Date(data.vencimiento);
    if (isNaN(fecha.getTime())) {
      errors.push({ field: 'vencimiento', message: 'La fecha de vencimiento no es válida' });
    }
  }

  return errors;
};

export const getStatusColor = (estado?: string) => {
  switch (estado?.toLowerCase()) {
    case 'activo':
      return '#059669';
    case 'lesionado':
      return '#f59e0b';
    case 'sancionado':
      return '#ef4444';
    case 'inactivo':
      return '#6b7280';
    default:
      return '#059669';
  }
};

export const getStatusLabel = (estado?: string) => {
  switch (estado?.toLowerCase()) {
    case 'activo':
      return 'Activo';
    case 'lesionado':
      return 'Lesionado';
    case 'sancionado':
      return 'Sancionado';
    case 'inactivo':
      return 'Inactivo';
    default:
      return 'Activo';
  }
};
