import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueriesBusinessDto {
  @IsNumber()
  @IsOptional()
  rank?: number;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  offset?: number;
}
