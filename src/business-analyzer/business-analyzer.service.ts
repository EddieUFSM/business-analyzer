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
    await this.loadDataFromFile();
  }

  async create(createBusinessDto: CreateBusinessDto) {
    return this.businessModel.create(createBusinessDto);
  }

  async findAll(queries: QueriesBusinessDto): Promise<Business[]> {
    const { limit, offset, ...filters } = queries;

    const query = this.businessModel.find(filters);

    if (limit) {
      query.limit(limit);
    }

    if (offset) {
      query.skip(offset);
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

  private async loadDataFromFile() {
    const filePath = path.join(__dirname, '../..', 'research.txt');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const lines = fileContent.trim().split('\n');

    // Verifique o número de linhas lidas
    console.log(`Number of lines read: ${lines.length}`);

    // Se o arquivo contém um cabeçalho, ignore a primeira linha
    const dataLines = lines; // Use todas as linhas se não houver cabeçalho

    const businesses = dataLines
      .map(async (line, index) => {
        console.log(`Processing line ${index + 1}: ${line}`);
        const [rank, company, threeYearGrowth, industry, state, city] =
          line.split(';');

        // Verifique e logue o valor de rank
        const rankNumber = parseInt(rank, 10);
        if (isNaN(rankNumber)) {
          console.error(`Invalid rank value: ${rank} at line ${index + 1}`);
          return null; // Ignorar registros com rank inválido
        }

        // Logue os dados que serão inseridos
        const business = {
          rank: rankNumber,
          company: company.trim(), // Remover espaços em branco extras
          three_year_growth: threeYearGrowth.trim(), // Remover espaços em branco extras
          industry: industry.trim(), // Remover espaços em branco extras
          state: state.trim(), // Remover espaços em branco extras
          city: city ? city.trim() : '', // Remover espaços em branco extras
        };
        console.log(`Parsed business data: ${JSON.stringify(business)}`);
        return await this.businessModel.create(business);
      })
      .filter((record) => record !== null); // Remova registros inválidos

    console.log(`Number of valid records to insert: ${businesses.length}`);
  }
}
