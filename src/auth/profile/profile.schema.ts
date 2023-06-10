import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
 @Prop()
 sub: string;

 @Prop()
 given_name: string;

 @Prop()
 family_name: string;

 @Prop()
 email: string;

 @Prop()
 image: string;

 @Prop({ type: Object }) // Add @Prop decorator with type declaration
 stats: object;

 @Prop({ type: Object }) // Add @Prop decorator with type declaration
 history: object;

}

export const ProfileSchema = SchemaFactory.createForClass(Profile);