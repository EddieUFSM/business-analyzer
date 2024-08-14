import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessDto } from './create-business-analyzer.dto';

export class UpdateBusinessDto extends PartialType(CreateBusinessDto) {}
