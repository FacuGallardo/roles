// src/Clubes/types/index.ts

export interface Localidad {
  id: number;
  nombre: string;
}

export interface Club {
  id: number;
  nombre: string;
  categoria: "masculino" | "femenino";
  correo: string;
  telefono: string;
  localidad: Localidad | null;
  fechaRegistro: string;
  activo: boolean;
  logoUrl?: string;
  // Estadísticas
  pg: number; // Partidos Ganados
  pe: number; // Partidos Empatados
  pp: number; // Partidos Perdidos
  // Campo futuro (comentado por ahora)
  // ciudad?: string;
}

export interface ClubPayload {
  nombre?: string;
  categoria?: "masculino" | "femenino";
  correo?: string;
  telefono?: string;
  localidadId?: number;
  fechaRegistro?: string;
  logoUrl?: string;
  // ciudad?: string; // Agregar cuando BD esté lista
}

export type ClubFormMode = "create" | "edit";
