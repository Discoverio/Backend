import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './auth/profile/profile.schema';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<ProfileDocument>, private readonly databaseService: DatabaseService) {}

  async login({
    email,
    sub,
    given_name,
    family_name,
    image,
    stats,
    history
  }: {
    email: string;
    sub: string;
    given_name: string;
    family_name: string;
    image: string;
    stats: object;
    history: object;
  }): Promise<any> {
    const profile = await this.profileModel.findOne({ email: email });
    if (!profile) {
      const newProfile = new this.profileModel({ email, sub, given_name, family_name, image, stats, history });
      await newProfile.save();
      return newProfile;
    } else {
      console.log(profile);
      return profile;
    }
  }

  async getUserIdFromSub(userId) {
    try {
      await this.databaseService.connect();
      const client = this.databaseService.getClient();
      const db = client.db('Discoverio');
      const collection = db.collection('profiles');
      
      const user = await collection.findOne({ sub: userId });
      if (user) {
        const objectUserId = user._id.toString();
        return objectUserId;
      } else {
        console.log('Utilisateur introuvable dans la base de données');
        return null;
      }
    } catch (error) {
      console.error('Erreur lors de la recherche de l\'utilisateur:', error);
      return null;
    }
  }
}
