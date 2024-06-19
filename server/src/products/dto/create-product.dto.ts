import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EXP, PROD_STATUS, UNITS } from '../types/products-types';

// При создании товара обязательными полями из 1С будут:
// ID поставщика, бренда и подкатегории, имя, цена и кол-во на складе (?)
export class CreateProductDto {
  @IsNotEmpty()
  orgId: string;

  @IsNotEmpty()
  brandId: string;

  @IsNotEmpty()
  subcategoryId: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  count: number;

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
