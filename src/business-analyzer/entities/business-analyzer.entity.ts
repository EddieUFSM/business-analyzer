import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Services {
  @Prop({
    type: String,
  })
  service?: string;

  @Prop({
    type: String,
  })
  description?: string;
}

@Schema()
export class Product {
  @Prop({
    type: String,
  })
  product?: string;

  @Prop({
    type: String,
  })
  description?: string;
}

@Schema({ timestamps: true })
export class Business extends Document {
  @Prop({
    type: Number,
    unique: true,
  })
  rank: number;

  @Prop({
    type: String,
    unique: true,
  })
  company: string;

  @Prop({
    type: Number,
  })
  three_year_growth: number;

  @Prop({
    type: String,
  })
  industry: string;

  @Prop({
    type: String,
  })
  state: string;

  @Prop({
    type: String,
  })
  city: string;

  @Prop({
    type: String,
  })
  analysis?: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isItAnalyzed?: boolean;

  @Prop({
    default: false,
  })
  isViable?: boolean;

  @Prop({
    type: String,
  })
  notes?: string;

  @Prop({
    type: String,
  })
  url?: string;

  @Prop([
    {
      type: {
        service: { type: String },
        description: { type: String },
      },
    },
  ])
  services?: Services[];

  @Prop([
    {
      type: {
        product: { type: String },
        description: { type: String },
      },
    },
  ])
  products?: Product[];
}
export const ServicesSchema = SchemaFactory.createForClass(Services);
export const ProductSchema = SchemaFactory.createForClass(Product);
export const BusinessSchema = SchemaFactory.createForClass(Business);
