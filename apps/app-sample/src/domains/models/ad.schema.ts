import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
class Banner {
  @Prop({ required: true })
  bannerUrl: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  linkUrl: string;
}

@Schema()
class AdPattern {
  @Prop({ required: true, default: true })
  showTableMap: boolean;

  @Prop({ required: true, default: true })
  showTable: boolean;

  @Prop([Banner])
  banners: Banner[];
}

export type AdDocument = Ad & Document;

@Schema()
export class Ad {
  @Prop({ required: true })
  event: MongooseSchema.Types.ObjectId;

  @Prop([AdPattern])
  patterns: AdPattern[];
}

export const AdSchema = SchemaFactory.createForClass(Ad);
