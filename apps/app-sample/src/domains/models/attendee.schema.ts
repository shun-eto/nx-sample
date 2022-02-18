import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { nanoid } from 'nanoid';
import { encodeFromObjectId } from '../../utils/hashIdsUtils';

export interface AttendeeDocument extends Attendee, Document {
  code: string;
}

class Links {
  facebook: string;
  twitter: string;
  linkedIn: string;
  businessCard: string;
  website: string;
}

@Schema()
class Connection {
  @Prop({ required: true })
  participantId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, enum: ['attendee', 'tableHost', 'host'] })
  role: string;

  @Prop({
    required: true,
    enum: [
      'requested',
      'received',
      'declined',
      'hasBeenDeclined',
      'accepted',
      'hasBeenAccepted',
    ],
  })
  status: string;

  @Prop({ required: false })
  connectedAt: Date;
}

@Schema({ timestamps: true })
export class Attendee {
  @Prop()
  fullName: string;

  @Prop({ lowercase: true })
  email: string;

  @Prop()
  picture: string;

  @Prop()
  profiles: [
    {
      profile: string;
      value: string;
    }
  ];

  @Prop()
  patterns: string[];

  @Prop()
  exchangedCards: string;

  @Prop({ default: 'organizer' })
  registeredBy: string;

  @Prop({ default: 'active', enum: ['active', 'inactive '] })
  status: string;

  @Prop()
  links: Links;

  @Prop([Connection])
  connections: Connection[];

  @Prop()
  transitionSource: string;

  @Prop({ required: true, index: true })
  event: MongooseSchema.Types.ObjectId;

  @Prop({
    set: (val) =>
      val === '' || val === null || val === undefined ? nanoid() : val,
  })
  alternateId: string;

  @Prop({ required: false, enum: ['speaker'] })
  role: string;
}

export const AttendeeSchema = SchemaFactory.createForClass(Attendee);

AttendeeSchema.virtual('code').get(function () {
  if (!this._id) {
    return undefined;
  }
  return encodeFromObjectId(this._id.toString());
});

AttendeeSchema.set('toObject', { virtuals: true });
AttendeeSchema.set('toJSON', { virtuals: true });
