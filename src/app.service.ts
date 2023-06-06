import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './auth/profile/profile.schema';

@Injectable()
export class AppService {
 constructor(@InjectModel(Profile.name) private profileModel: Model<ProfileDocument>) {}
 async login({
   email,
   given_name,
   family_name,
   image,
 }: {
   email: string;
   given_name: string;
   family_name: string;
   image: string;
 }): Promise<any> {
   const profile = await this.profileModel.findOne({ email: email });
   if (!profile) {
     const newProfile = new this.profileModel({ email, given_name, family_name, image });
     await newProfile.save();
     return newProfile;
   } else {
     console.log(profile);
     return profile;
   }
 }
}