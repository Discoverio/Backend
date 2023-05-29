import { Injectable } from '@nestjs/common';
import { Console, log } from 'console';
import { MongoClient, Collection, Filter } from 'mongodb';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class ProfileInfosService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getLikedMusics(profileId: string): Promise<string[]> {
    try {
      await this.databaseService.connect();
      const client = this.databaseService.getClient();
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

      return likedMusics;
    } catch (err) {
      console.error('Erreur de connexion à la base de données:', err);
      return [];
    } finally {
      // await this.databaseService.disconnect();
    }
  }
  
  

  

  async setLikedMusic(profileId: string, albumId: string): Promise<void> {
    try {
      await this.databaseService.connect();
      const client = this.databaseService.getClient();
      const database = client.db('Discoverio');
      const collection = database.collection('profile');
      const existingProfile = await collection.findOne({ profile_id: profileId });
  
      if (!existingProfile) {
        console.log('Le profileId spécifié n\'existe pas.');
        return;
      }
  
      await collection.updateOne(
        { profile_id: profileId },
        { $push: { 'hystory.musics.liked': albumId } }
      );
  
      console.log('ID aimé ajouté avec succès !');
    } catch (err) {
      console.error('Erreur de connexion à la base de données:', err);
    } finally {
      // await this.databaseService.disconnect();
    }
  }






  async removeLikedMusic(profileId: string, albumId: string): Promise<void> {
    try {
      await this.databaseService.connect();
      const client = this.databaseService.getClient();
      const database = client.db('Discoverio');
      const collection = database.collection('profile');
      const existingProfile = await collection.findOne({ profile_id: profileId });
  
      if (!existingProfile) {
        console.log('Le profileId spécifié n\'existe pas.');
        return;
      }
  
      await collection.updateOne(
        { profile_id: profileId },
        { $pull: { 'hystory.musics.liked': albumId } }
      );
  
      console.log('ID aimé supprimé avec succès !');
    } catch (err) {
      console.error('Erreur de connexion à la base de données:', err);
    } finally {
      // await this.databaseService.disconnect();
    }
  }
  






  



    async getUnLikedMusics(profileId: string): Promise<string[]> {
      try {
        await this.databaseService.connect();
        const client = this.databaseService.getClient();
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
       
        return unlikedMusics;
      } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
      }

    }






    async setUnLikedMusic(profileId: string, albumId: string): Promise<void> {
      try {
        await this.databaseService.connect();
        const client = this.databaseService.getClient();
        const database = client.db('Discoverio');
        const collection = database.collection('profile');
        const existingProfile = await collection.findOne({ profile_id: profileId });
    
        if (!existingProfile) {
          console.log('Le profileId spécifié n\'existe pas.');
          return;
        }
    
        await collection.updateOne(
          { profile_id: profileId },
          { $push: { 'hystory.musics.unliked': albumId } }
        );
    
        console.log('ID non-aimé ajouté avec succès !');
      } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
      } finally {
        // await this.databaseService.disconnect();
      }
    }
    
    async removeUnLikedMusic(profileId: string, albumId: string): Promise<void> {
      try {
        await this.databaseService.connect();
        const client = this.databaseService.getClient();
        const database = client.db('Discoverio');
        const collection = database.collection('profile');
        const existingProfile = await collection.findOne({ profile_id: profileId });
    
        if (!existingProfile) {
          console.log('Le profileId spécifié n\'existe pas.');
          return;
        }
    
        await collection.updateOne(
          { profile_id: profileId },
          { $pull: { 'hystory.musics.unliked': albumId } }
        );
    
        console.log('ID non-aimé supprimé avec succès !');
      } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
      } finally {
        // await this.databaseService.disconnect();
      }
    }
    


    async getDoneMusics(profileId: string): Promise<string[]> {
      try {
        await this.databaseService.connect();
        const client = this.databaseService.getClient();
        const database = client.db('Discoverio');
        const collection = database.collection('profile');
        const existingProfile = await collection.findOne({ profile_id: profileId });
  
        if (!existingProfile) {
          console.log('Le profileId spécifié n\'existe pas.');
          return [];
        }
  
        const result = await collection
          .find({ profile_id: profileId })
          .project({ 'hystory.musics.done': 1 })
          .toArray();
  
        const doneMusics: string[] = [];
  
        for (const doc of result) {
          const doneMusicsData = doc.hystory?.musics?.done || [];
          doneMusics.push(...doneMusicsData);
        }
  
        return doneMusics;
      } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return [];
      } finally {
        // await this.databaseService.disconnect();
      }
    }



    async setDoneMusic(profileId: string, albumId: string): Promise<void> {
      try {
        await this.databaseService.connect();
        const client = this.databaseService.getClient();
        const database = client.db('Discoverio');
        const collection = database.collection('profile');
        const existingProfile = await collection.findOne({ profile_id: profileId });
    
        if (!existingProfile) {
          console.log('Le profileId spécifié n\'existe pas.');
          return;
        }
    
        await collection.updateOne(
          { profile_id: profileId },
          { $push: { 'hystory.musics.done': albumId } }
        );
    
        console.log('ID «réalisée» ajouté avec succès !');
      } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
      } finally {
        // await this.databaseService.disconnect();
      }
    }
    
    async unsetDoneMusic(profileId: string, albumId: string): Promise<void> {
      try {
        await this.databaseService.connect();
        const client = this.databaseService.getClient();
        const database = client.db('Discoverio');
        const collection = database.collection('profile');
        const existingProfile = await collection.findOne({ profile_id: profileId });
    
        if (!existingProfile) {
          console.log('Le profileId spécifié n\'existe pas.');
          return;
        }
    
        await collection.updateOne(
          { profile_id: profileId },
          { $pull: { 'hystory.musics.done': albumId } }
        );
    
        console.log('ID «réalisée» supprimé avec succès !');
      } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
      } finally {
        // await this.databaseService.disconnect();
      }
    }









    async getAllMusics(profileId: string): Promise<number[]> {
      try {
        await this.databaseService.connect();
        const client = this.databaseService.getClient();
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
    try {
      await this.databaseService.connect();
      const client = this.databaseService.getClient();
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
  try {
    await this.databaseService.connect();
    const client = this.databaseService.getClient();
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
  try {
    await this.databaseService.connect();
    const client = this.databaseService.getClient();
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
    
    // client.close();        
    return firstName;
  } catch (err) {
    console.error('Erreur de connexion à la base de données:', err);
  }
}


















async getLastNameOfUser(profileId: string): Promise<string> {
  try {
    await this.databaseService.connect();
    const client = this.databaseService.getClient();
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
    
    // client.close();        
    return lastName;
  } catch (err) {
    console.error('Erreur de connexion à la base de données:', err);
  }

}


}