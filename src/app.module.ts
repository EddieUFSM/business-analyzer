import { Module } from '@nestjs/common';
import { BusinessModule } from './business-analyzer/business-analyzer.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost:27017/business`),
    BusinessModule,
  ],
})
export class AppModule {}
