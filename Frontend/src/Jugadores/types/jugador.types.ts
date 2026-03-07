// src/Jugadores/types/jugador.types.ts

export interface Club {
  id: number;
  nombre: string;
}

export interface Jugador {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  clubId: number;
  club: Club;
  categoria: string; // 'Masculino' | 'Femenino'
  telefono?: string;
  vencimiento?: string;
  dorsal?: number;
  posicion?: string;
  carnetUrl?: string;
  fichaMedicaUrl?: string;
  observacion?: string;
  estado?: string; // 'activo' | 'lesionado' | 'sancionado' | 'inactivo'
}

export interface CreateJugadorPayload {
  nombre: string;
  apellido: string;
  dni: string;
  clubId: number;
  categoria: string;
  telefono?: string;
  vencimiento?: string;
  dorsal?: number;
  posicion?: string;
  carnetUrl?: string;
  fichaMedicaUrl?: string;
  observacion?: string;
  estado?: string;
}

export interface UpdateJugadorPayload extends Partial<CreateJugadorPayload> {}

export type JugadorFormMode = 'create' | 'edit';
