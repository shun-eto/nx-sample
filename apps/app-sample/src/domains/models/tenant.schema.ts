import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Ad } from './ad.schema';
import { User } from './user.schema';

class ProviderConfig {
  entryPoint?: string;
  identifierFormat?: string;
  cert?: string;
  privateKey?: string;
  signatureAlgorithm?: string;
}
class Saml {
  provider?: string;
  providerConfig?: ProviderConfig;
}
@Schema()
export class Tenant {
  @Prop()
  key?: string;
  @Prop({ required: true })
  name: string;

  @Prop()
  saml?: Saml;
}

export type TenantDocument = Tenant & Document;

export const TenantSchema = SchemaFactory.createForClass(Tenant);
