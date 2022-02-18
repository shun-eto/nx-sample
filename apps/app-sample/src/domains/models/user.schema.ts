import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { Tenant } from './tenant.schema';

class Saml {
  id?: string;
  name?: string;
  picture?: string;
}

class Google {
  id?: string;
  name?: string;
  picture?: string;
}

class Facebook {
  id?: string;
  name?: string;
  picture?: string;
}

@Schema({ _id: false })
class Local {
  @Prop()
  name?: string;

  @Prop({ select: false })
  password?: string;

  @Prop({ select: false, required: false })
  activateToken?: string;

  @Prop({ required: false })
  activatedAt?: Date;

  @Prop({ select: false, required: false })
  resetPasswordToken?: string;

  @Prop({ select: false })
  resetPasswordExpiredAt?: Date;
}

const LocalSchema = SchemaFactory.createForClass(Local);

@Schema({ timestamps: true })
export class User {
  @Prop({ trim: true, lowercase: true, index: { unique: true, sparse: true } })
  email?: string;
  @Prop()
  name: string;

  @Prop()
  picture?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Tenant.name })
  tenant?: MongooseSchema.Types.ObjectId;

  @Prop({ type: LocalSchema, required: false, default: {} })
  local?: Local;

  @Prop()
  google?: Google;

  @Prop()
  facebook?: Facebook;

  @Prop()
  saml?: Saml;

  @Prop()
  alternateId?: string;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }

  async getSignUpUrl(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const token = v4();
    const url = `${process.env.FRONTEND_URL}/activate/${token}`;

    this.local = {
      ...this.local,
      password: passwordHash,
      activateToken: token,
    };

    return url;
  }

  async authenticate(password: string): Promise<boolean> {
    if (this?.local?.password) {
      return await bcrypt.compare(password, this.local.password);
    }
    return false;
  }

  async resetPassword(): Promise<{ url: string }> {
    const token = v4();
    const expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + 1);
    const url = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    this.local.resetPasswordToken = token;
    this.local.resetPasswordExpiredAt = expiredAt;

    return { url };
  }

  async changePassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    this.local.password = passwordHash;
    this.local.resetPasswordToken = null;
    this.local.resetPasswordExpiredAt = null;
  }

  changePicture(picture: string) {
    this.picture = picture;
  }

  activate() {
    this.local.activatedAt = new Date();
  }
}

export type UserDocument = User & Document;

const UserSchema = SchemaFactory.createForClass(User);

// TODO もう少し調査する必要あり。 loadClassと同時に利用できないかも。
// modelに対するstaticsメソッドの定義を追加
// https://stackoverflow.com/questions/52168287/how-to-define-static-mongoose-methods-in-document-interface-while-using-nestjs
// export interface IUserModel extends Model<Document> {
//   findWithTenant: (id) => Promise<any>;
// }
//
// UserSchema.statics.findWithTenant = function (id) {
//   return this.findById(id).populate('tenant').exec();
// };

UserSchema.loadClass(User);

export { UserSchema };
