import { Injectable } from '@nestjs/common';
import { Console, log } from 'console';
import { MongoClient, Collection, Filter } from 'mongodb';

const username = 'admin';
const password = 'mettre_le_mot_de_passe_apres_clone_ou_update';

@Injectable()
export class ProfileInfosService {

  async getLikedMusics(profileId: string): Promise<string[]> {
    const uri = `mongodb+srv://${username}:${password}@discoverio.8i7zy8i.mongodb.net/`;
    
    try {
      const client = await MongoClient.connect(uri);
      const database = client.db('Discoverio');
      const collection = database.collection('profile');
      const existingProfile = await collection.findOne({ profile_id: profileId });
  
      if (!existingProfile) {
        console.log('Le profileId spécifié n\'existe pas.');
        return [];
      }
  
      const result = await collection
        .find({ profile_id: profileId })
        .project({ 'hystory.musics.liked': 1 })
        .toArray();
  
      const likedMusics: string[] = [];
  
      for (const doc of result) {
        const likedMusicsData = doc.hystory?.musics?.liked || [];
        likedMusics.push(...likedMusicsData);
      }
  
      client.close();
      return likedMusics;
    } catch (err) {
      console.error('Erreur de connexion à la base de données:', err);
      return [];
    }
  }
  
    


    async getUnLikedMusics(profileId: string): Promise<string[]> {
      const uri = `mongodb+srv://${username}:${password}@discoverio.8i7zy8i.mongodb.net/`;
  
      try {
        const client = await MongoClient.connect(uri);
        const database = client.db('Discoverio');
        const collection = database.collection('profile');
        const existingProfile = await collection.findOne({ profile_id: profileId });

        if (!existingProfile) {
          console.log('Le profileId spécifié n\'existe pas.');
          return [];
        }

        const result = await collection
        .find({ profile_id: profileId })
        .project({ 'hystory.musics.unliked': 1 })
        .toArray();

        const unlikedMusics: string[] = [];
    
        for (const doc of result) {
          const unlikedMusicsData = doc.hystory?.musics?.unliked || [];
          unlikedMusics.push(...unlikedMusicsData);
        }
        
        client.close();        
        return unlikedMusics;
      } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
      }

    }










    async getAllMusics(profileId: string): Promise<number[]> {
      const uri = `mongodb+srv://${username}:${password}@discoverio.8i7zy8i.mongodb.net/`;
  
      try {
        const client = await MongoClient.connect(uri);
        const database = client.db('Discoverio');
        const collection = database.collection('profile');
        const existingProfile = await collection.findOne({ profile_id: profileId });

        if (!existingProfile) {
          console.log('Le profileId spécifié n\'existe pas.');
          return [];
        }

        const result = await collection
        .find({ profile_id: profileId })
        .project({ 'hystory.musics': 1 })
        .toArray();

        const allMusics: number[] = [];
      
        for (const doc of result) {
          const hystory = doc.hystory || {};
          const musics = hystory.musics || {};
          const likedMusics = musics.liked || [];
          const unlikedMusics = musics.unliked || [];
      
          const combinedMusics = [...likedMusics, ...unlikedMusics];
          allMusics.push(...combinedMusics);
        }
      
        return allMusics;
      } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
      }

    }
  



















  async getUserCredits(profileId: string): Promise<number[]> {
    const uri = `mongodb+srv://${username}:${password}@discoverio.8i7zy8i.mongodb.net/`;

    try {
      const client = await MongoClient.connect(uri);
      const database = client.db('Discoverio');
      const collection = database.collection('profile');
      const existingProfile = await collection.findOne({ profile_id: profileId });

      if (!existingProfile) {
        console.log('Le profileId spécifié n\'existe pas.');
        return [];
      }

      const result = await collection
      .find({ profile_id: profileId })
      .project({ 'stats.credits': 1 })
      .toArray();

      const credits = result.map(item => Number(item.stats.credits));

      return credits;
    } catch (err) {
      console.error('Erreur de connexion à la base de données:', err);
    }

  }






















async getUserPerformedActivities(profileId: string): Promise<number[]> {
  const uri = `mongodb+srv://${username}:${password}@discoverio.8i7zy8i.mongodb.net/`;

  try {
    const client = await MongoClient.connect(uri);
    const database = client.db('Discoverio');
    const collection = database.collection('profile');
    const existingProfile = await collection.findOne({ profile_id: profileId });

    if (!existingProfile) {
      console.log('Le profileId spécifié n\'existe pas.');
      return [];
    }

    const result = await collection
    .find({ profile_id: profileId })
    .project({ 'stats.performed_activities': 1 })
    .toArray();

    const performed_activities = result.map(item => Number(item.stats.performed_activities));
    
    return performed_activities;
  } catch (err) {
    console.error('Erreur de connexion à la base de données:', err);
  }

}


























async getFirstNameOfUser(profileId: string): Promise<string> {
  const uri = `mongodb+srv://${username}:${password}@discoverio.8i7zy8i.mongodb.net/`;

  try {
    const client = await MongoClient.connect(uri);
    const database = client.db('Discoverio');
    const collection = database.collection('profile');
    const existingProfile = await collection.findOne({ profile_id: profileId });

    if (!existingProfile) {
      console.log('Le profileId spécifié n\'existe pas.');
      return '';
    }

    const result = await collection
      .find({ profile_id: profileId })
      .project({ 'firstname': 1 })
      .toArray();

    let firstName: string = '';

    for (const doc of result) {
      const firstNameData = doc.firstname || '';
      firstName += firstNameData;
    }
    
    client.close();        
    return firstName;
  } catch (err) {
    console.error('Erreur de connexion à la base de données:', err);
  }
}


















async getLastNameOfUser(profileId: string): Promise<string> {
  const uri = `mongodb+srv://${username}:${password}@discoverio.8i7zy8i.mongodb.net/`;

  try {
    const client = await MongoClient.connect(uri);
    const database = client.db('Discoverio');
    const collection = database.collection('profile');
    const existingProfile = await collection.findOne({ profile_id: profileId });

    if (!existingProfile) {
      console.log('Le profileId spécifié n\'existe pas.');
      return '';
    }

    const result = await collection
      .find({ profile_id: profileId })
      .project({ 'lastname': 1 })
      .toArray();

    let lastName: string = '';

    for (const doc of result) {
      const lastNameData = doc.lastname || '';
      lastName += lastNameData;
    }
    
    client.close();        
    return lastName;
  } catch (err) {
    console.error('Erreur de connexion à la base de données:', err);
  }

}


}