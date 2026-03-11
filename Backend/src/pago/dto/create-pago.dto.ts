// src/pago/dto/create-pago.dto.ts
import { IsString, IsNumber, IsNotEmpty, IsOptional, IsEnum, Min, IsInt } from 'class-validator';

export class CreatePagoDto {
  @IsEnum(['cuota', 'arbitraje', 'multa', 'otro'])
  @IsNotEmpty()
  tipo: string;

  @IsInt()
  @IsNotEmpty()
  clubId: number; // Recibe el ID del club

  @IsNumber()
  @Min(0.01) // Monto mínimo
  monto: number;

  @IsOptional()
  @IsString()
  comprobante?: string; // Código de comprobante

  @IsOptional()
  @IsString()
  comprobanteArchivo?: string; // Base64 del archivo

  // --- Campos opcionales ---
  @IsOptional()
  @IsString()
  categoria?: string;

  @IsOptional()
  @IsInt()
  partidoId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  cantidadJugadores?: number;

  @IsOptional()
  @IsString()
  motivo?: string;

    @IsOptional()
    @IsString()
    metodo_pago?: string;

    @IsOptional()
    @IsString()
    numero_transaccion?: string;

    @IsOptional()
    @IsString()
    observaciones?: string;

  // No incluyas id, fecha, estado aquí (se manejan en el backend)
}