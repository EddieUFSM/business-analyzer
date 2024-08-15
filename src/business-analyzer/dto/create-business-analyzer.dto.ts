import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Services {
  @IsString()
  service: string;

  @IsString()
  description: string;
}

export class Product {
  @IsString()
  product: string;

  @IsString()
  description: string;
}

export class CreateBusinessDto {
  @IsNumber()
  rank: number;

  @IsString()
  company: string;

  @IsNumber()
  three_year_growth: number;

  @IsString()
  industry: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  @IsOptional()
  analysis?: string;

  @IsBoolean()
  @IsOptional()
  isViable?: boolean;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => Services)
  services?: Services[];

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => Product)
  products?: Product[];

  @IsBoolean()
  @IsOptional()
  isItAnalyzed?: boolean;
}
