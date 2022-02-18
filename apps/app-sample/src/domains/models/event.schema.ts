import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { encodeFromObjectId } from '../../utils/hashIdsUtils';

@Schema()
class Lobby {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  value: MongooseSchema.Types.Mixed;
}

@Schema()
class Table {
  @Prop()
  tableName: string;

  @Prop()
  size: string;

  @Prop()
  seats: number;
}

@Schema()
class Cabinet {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  fileSize: number;

  @Prop({ required: true })
  uri: string;
}
@Schema()
class Meeting {
  @Prop()
  tableName: string;

  @Prop()
  size: string;

  @Prop()
  seats: number;

  @Prop()
  cover: string;

  @Prop()
  description: string;

  @Prop([Cabinet])
  documents: Cabinet[];

  @Prop({ required: true, default: [] })
  hosts: MongooseSchema.Types.ObjectId[];

  @Prop()
  exhibition: MongooseSchema.Types.ObjectId;

  @Prop({ default: 'talk' })
  initialMode: string;
}

@Schema()
class Floor {
  @Prop({
    required: function () {
      return this.parent()?.floors?.length > 1;
    },
  })
  name: string;

  @Prop({ required: true, default: true })
  isEnabled: boolean;

  @Prop([Meeting])
  tables: Meeting[];

  @Prop()
  description: string;
}

@Schema()
class DateTime {
  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  endAt: Date;

  @Prop({ required: true })
  forcedEndAt: Date;

  @Prop({ required: false })
  customStartAt: Date;

  @Prop({ required: false })
  customEndAt: Date;
}

@Schema({ _id: false })
class CustomProfile {
  @Prop()
  profileLabel: string;

  @Prop()
  profileType: string;

  @Prop({ default: true })
  required: boolean;

  @Prop()
  selectOptions: string;

  @Prop({ enum: ['public', 'restricted', 'private'], default: 'public' })
  scope: string;
}

@Schema({ _id: false })
class Permissions {
  @Prop({ default: true })
  enableFreeMove: boolean;

  @Prop({ default: false })
  enableTrialView: boolean;

  @Prop({ default: false })
  enableSlido: boolean;

  @Prop({ default: true })
  enableModifyProfileItems: boolean;

  @Prop({ default: true })
  enableShowAttendeeList: boolean;

  @Prop({ default: false })
  enableTableChatHistoryDisplay: boolean;

  @Prop({ default: true })
  enablePrivateChat: boolean;

  @Prop({ default: true })
  enablePublicChat: boolean;

  @Prop({ default: false })
  enablePersonalTable: boolean;

  @Prop({ default: true })
  enableTableChat: boolean;

  @Prop({ default: true })
  enableScreenShare: boolean;

  @Prop({ default: false })
  enableLobby: boolean;

  @Prop({ default: true })
  enableTableFormations: boolean;

  @Prop({ default: false })
  enableTableManagement: boolean;

  @Prop({ default: 'all' })
  showAttendeeName: string;

  @Prop({ default: 'all' })
  showAttendeeProfile: string;

  @Prop({ default: 'table' })
  showFloorView: string;

  @Prop({ default: false })
  enableRepAbsence: boolean;

  @Prop({ default: true })
  enableTableHostMove: boolean;

  @Prop({ default: false })
  enableAttendeesRegistration: boolean;

  @Prop({ default: false })
  enableAd: boolean;

  @Prop({ default: false })
  enableSurvey: boolean;

  @Prop({ default: false })
  enableRecordingPresent: boolean;

  @Prop({ default: false })
  enableAutoRecordingPresent: boolean;

  @Prop({ default: false })
  enableRecordingTables: boolean;

  @Prop({ default: true })
  enableUsersConnection: boolean;

  @Prop({ default: true })
  canViewRestrictedProfilesByTableHost: boolean;

  @Prop({ default: false })
  enableTableHostDownload: boolean;

  @Prop({ default: false })
  enableReminderEmail: boolean;

  @Prop({ default: false })
  enableCustomDateAndTime: boolean;

  // 全体プレゼン、テーブル トークモード、プレゼンモードの3つに分離したので利用しない
  @Prop({ default: false })
  enableMediaDevicesOffUserHidden: boolean;

  @Prop({ default: false })
  enableAttendeesWalkIn: boolean;

  @Prop({ default: false })
  enableMediaDevicesOffUserHiddenInPresent: boolean;

  @Prop({ default: false })
  enableMediaDevicesOffUserHiddenInTalkMode: boolean;

  @Prop({ default: false })
  enableMediaDevicesOffUserHiddenInTablePresent: boolean;
}

@Schema({ _id: false })
class PersonalLink {
  @Prop({ required: true, default: false })
  facebook: boolean;

  @Prop({ required: true, default: false })
  twitter: boolean;

  @Prop({ required: true, default: false })
  linkedIn: boolean;

  @Prop({ required: true, default: false })
  businessCard: boolean;

  @Prop({ required: true, default: false })
  website: boolean;

  @Prop({ enum: ['public', 'restricted', 'private'], default: 'public' })
  scope: string;
}

@Schema()
class Company {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  logo: string;
}

@Schema()
class Category {
  @Prop({ required: true })
  name: string;

  @Prop([Company])
  companies: [Company];
}

@Schema()
class CompanySetting {
  @Prop([Category])
  categories: Category[];

  @Prop({ required: true, default: false })
  isEnabled: boolean;
}

@Schema({ _id: false })
class PrivacyPolicySetting {
  @Prop({ required: true, default: 'https://jp.vcube.com/privacy' })
  url: string;

  @Prop({ required: true, default: false })
  showLinkToVcubePage: boolean;
}

@Schema({ timestamps: true })
export class Event {
  @Prop()
  tenant: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  cover: string;

  @Prop()
  startAt: Date;

  @Prop()
  endAt: Date;

  @Prop()
  forcedEndAt: Date;

  @Prop([DateTime])
  dateTimes: DateTime[];

  @Prop({ required: true, default: 9 })
  timezone: number;

  @Prop({ required: false })
  profileNameLabel: string;

  @Prop([CustomProfile])
  customProfiles: CustomProfile[];

  @Prop([Table])
  tables: Table[];

  @Prop({ type: Permissions, default: {} })
  permissions: Permissions;

  @Prop()
  numberOfTableFormations: number;

  @Prop()
  embedCodeOfSlido: string;

  @Prop([Lobby])
  lobby: Lobby[];

  @Prop([Floor])
  floors: Floor[];

  @Prop({ default: true })
  floorGuideNavigation: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ required: true, default: 'table' })
  tableDesign: string;

  @Prop({
    required: true,
    select: false,
    default: () => {
      return ('000000' + Math.floor(Math.random() * 1000000)).slice(-6);
    },
  })
  skipCountCheckCode: string;

  @Prop()
  secret: string;

  @Prop({ required: false })
  ad: MongooseSchema.Types.ObjectId;

  @Prop({ type: PersonalLink, default: {} })
  personalLinks: PersonalLink;

  @Prop({ type: CompanySetting, default: {} })
  companySettings: CompanySetting;

  @Prop({ type: PrivacyPolicySetting, default: {} })
  privacyPolicySettings: PrivacyPolicySetting;

  constructor(event: Event) {
    Object.assign(this, event);
  }
}

export type EventDocument = Event & Document;

export const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.virtual('hid').get(function () {
  if (!this._id) {
    return undefined;
  }

  return encodeFromObjectId(this._id.toString());
});

EventSchema.loadClass(Event);
