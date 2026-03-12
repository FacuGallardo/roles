import type { CreateReferenteDto, UpdateReferenteDto, Referente } from '../types';

export interface ValidationError {
  field: string;
  message: string;
}

export const validarReferente = (
  data: CreateReferenteDto | UpdateReferenteDto,
  referentes: Referente[] = [],
  editId: number | null = null,
): ValidationError[] => {
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
  } else if (!/^\d{7,10}$/.test(data.dni.trim())) {
    errors.push({ field: 'dni', message: 'El DNI debe tener entre 7 y 10 dígitos' });
  }

  // Validación de duplicados de DNI
  if (data.dni && referentes.length > 0) {
    const referenteDuplicado = referentes.some(
      (r) => r.dni === data.dni && r.id !== editId,
    );
    if (referenteDuplicado) {
      errors.push({ field: 'dni', message: 'El DNI ya está registrado' });
    }
  }

  // Correo
  if (!data.correo?.trim()) {
    errors.push({ field: 'correo', message: 'El correo es obligatorio' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo)) {
    errors.push({ field: 'correo', message: 'El correo no es válido' });
  }

  // Teléfono
  if (!data.telefono?.trim()) {
    errors.push({ field: 'telefono', message: 'El teléfono es obligatorio' });
  } else if (!/^\d{7,15}$/.test(data.telefono)) {
    errors.push({ field: 'telefono', message: 'El teléfono debe tener entre 7 y 15 dígitos' });
  }

  // Categoría
  if (!data.categoria?.trim()) {
    errors.push({ field: 'categoria', message: 'Debe seleccionar una categoría' });
  }

  // Club
  if (!data.clubId || data.clubId === 0) {
    errors.push({ field: 'clubId', message: 'Debe seleccionar un club' });
  }

  return errors;
};
