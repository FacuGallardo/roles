import { IsString, IsEmail, IsNotEmpty, IsInt, IsEnum, IsOptional } from 'class-validator';

export class CreateReferenteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsEnum(['Masculino', 'Femenino'])
  @IsNotEmpty()
  categoria: 'Masculino' | 'Femenino';

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  // Recibimos el ID del club, no el nombre
  @IsInt()
  @IsNotEmpty()
  clubId: number;
}