import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsInt,
  IsEnum,
  IsOptional,
  IsDateString,
  Min,
  Max,
} from 'class-validator';

enum CategoriaEnum {
  MASCULINO = 'Masculino',
  FEMENINO = 'Femenino',
}

export class CreateJugadorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsEnum(CategoriaEnum)
  @IsNotEmpty()
  categoria: string;

  @IsInt()
  @IsNotEmpty()
  clubId: number; // <-- CLAVE

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsDateString()
  vencimiento?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(99)
  dorsal?: number; // Número de camiseta

  @IsOptional()
  @IsString()
  posicion?: string; // Portero, Extremo Izquierdo, etc.

  @IsOptional()
  @IsString()
  carnetUrl?: string;

  @IsOptional()
  @IsString()
  fichaMedicaUrl?: string;

  @IsOptional()
  @IsString()
  observacion?: string; // Notas internas
}