export interface Club {
  id: number;
  nombre: string;
}

export interface Referente {
  id: number;
  nombre: string;
  apellido: string;
  categoria: 'Masculino' | 'Femenino';
  dni: string;
  correo: string;
  telefono: string;
  clubId: number;
  club: Club;
}

export interface CreateReferenteDto {
  nombre: string;
  apellido: string;
  categoria: 'Masculino' | 'Femenino';
  dni: string;
  correo: string;
  telefono: string;
  clubId: number;
}

export type UpdateReferenteDto = Partial<CreateReferenteDto>;
