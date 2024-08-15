import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business-analyzer.dto';
import { UpdateBusinessDto } from './dto/update-business-analyzer.dto';
import { Business } from './entities/business-analyzer.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { QueriesBusinessDto } from './dto/queries.dto';
import * as path from 'path';
import * as fs from 'fs-extra';

@Injectable()
export class BusinessService implements OnModuleInit {
  constructor(
    @InjectModel(Business.name) private businessModel: Model<Business>,
  ) {}

  async onModuleInit() {
    return;
  }

  async create(createBusinessDto: CreateBusinessDto) {
    return this.businessModel.create(createBusinessDto);
  }

  async findAll(queries: QueriesBusinessDto): Promise<Business[]> {
    const { limit, offset, sortBy, ...filters } = queries;

    const queryFilter: any = {
      isItAnalyzed: Boolean(filters.isItAnalyzed),
      ...filters,
    };

    const query = this.businessModel.find(queryFilter);

    if (limit) {
      query.limit(limit);
    }

    if (offset) {
      query.skip(offset);
    }

    if (sortBy) {
      // Verifica se sortBy é um objeto que contém o nome do campo e a ordem (asc/desc)
      const [field, order] = sortBy.split(':');
      const sortOrder = -1;
      //order === 'desc' ? -1 : 1;
      query.sort({ [field]: sortOrder });
    }

    return query.exec();
  }

  findOne(id: string) {
    return this.businessModel.findById(id);
  }

  update(id: string, updateBusinessDto: UpdateBusinessDto) {
    return this.businessModel.findByIdAndUpdate(id, updateBusinessDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.businessModel.findByIdAndDelete(id);
  }
}
