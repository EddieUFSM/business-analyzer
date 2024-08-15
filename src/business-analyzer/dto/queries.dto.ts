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

  @IsString()
  @IsOptional()
  isItAnalyzed?: string;

  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  offset?: number;

  @IsString()
  @IsOptional()
  sortBy?: string;
}
