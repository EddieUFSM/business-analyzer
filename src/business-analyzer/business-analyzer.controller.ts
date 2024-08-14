import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BusinessService } from './business-analyzer.service';
import { CreateBusinessDto } from './dto/create-business-analyzer.dto';
import { UpdateBusinessDto } from './dto/update-business-analyzer.dto';
import { QueriesBusinessDto } from './dto/queries.dto';

@Controller('business-analyzer')
export class BusinessController {
  constructor(private readonly businessBusinessService: BusinessService) {}

  @Post()
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessBusinessService.create(createBusinessDto);
  }

  @Get()
  findAll(@Query() queriesBusinessDto: QueriesBusinessDto) {
    return this.businessBusinessService.findAll(queriesBusinessDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessBusinessService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    return this.businessBusinessService.update(id, updateBusinessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessBusinessService.remove(id);
  }
}
