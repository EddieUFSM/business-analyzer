import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        MONGODB_USER: Joi.string().required(),
        MONGODB_PASSWORD: Joi.string().required(),
      }),
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigSetupModule {}
