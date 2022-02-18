import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Exhibition {
  @Prop({ required: true })
  type: string;

  @Prop()
  title: string;

  @Prop({ required: true })
  value: MongooseSchema.Types.Mixed; // string or string[]

  @Prop()
  youtubeId: string;

  @Prop()
  vimeoSrc: string;
}

@Schema()
export class Exhibitions {
  @Prop({ required: true })
  event: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  table: MongooseSchema.Types.ObjectId;

  @Prop([Exhibition])
  media: Exhibition[];
}

export type ExhibitionsDocument = Exhibitions & Document;

export const ExhibitionsSchema = SchemaFactory.createForClass(Exhibitions);
