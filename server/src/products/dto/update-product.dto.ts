import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { EXP, PROD_STATUS, UNITS } from '../types/products-types';

// DTO для обновления товара
export class UpdateProductDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  visibility?: boolean;

  @IsOptional()
  @IsString()
  status?: PROD_STATUS;

  @IsOptional()
  @IsNumber()
  unit?: UNITS;

  @IsOptional()
  @IsNumber()
  finalPrice?: number;

  @IsOptional()
  @IsString()
  compound?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsNumber()
  expDate?: number;

  @IsOptional()
  @IsString()
  expType?: EXP;

  @IsOptional()
  @IsNumber()
  multiplicity?: number;
}
