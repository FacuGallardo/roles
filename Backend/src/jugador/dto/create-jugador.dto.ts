import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsInt,
  IsEnum,
  IsOptional,
  IsDateString,
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
  @IsString()
  carnetUrl?: string;

  @IsOptional()
  @IsString()
  fichaMedicaUrl?: string;
}