import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BusinessModule } from './business-analyzer/business-analyzer.module';
import { ConfigSetupModule } from './config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigSetupModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get('MONGODB_USER')}:${configService.get('MONGODB_PASSWORD')}@business-analyzer.srrcm.mongodb.net/?retryWrites=true&w=majority&appName=business-analyzer`,
      }),
      inject: [ConfigService],
    }),
    BusinessModule,
  ],
})
export class AppModule {}
