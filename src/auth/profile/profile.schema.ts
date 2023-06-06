import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
 @Prop()
 given_name: string;

 @Prop()
 family_name: string;

 @Prop()
 email: string;

 @Prop()
 image: string;

}

export const ProfileSchema = SchemaFactory.createForClass(Profile);