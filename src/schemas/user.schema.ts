import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({required: true, unique: true})
  username : string;

  @Prop({required: true})
  password : string;

  @Prop()
  name : string;

  @Prop()
  createdDay : Date;

  @Prop()
  isActive : boolean;

  @Prop()
  refresh_token : string;
}

export const UserSchema = SchemaFactory.createForClass(User);