import { Injectable } from '@nestjs/common';
import { Console, log } from 'console';
import { MongoClient, Collection, Filter, ObjectId } from 'mongodb';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class ProfileInfosService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getLikedMusics(profileId: string): Promise<string[]> {
    try {
      await this.databaseService.connect();
      const client = this.databaseService.getClient();
      const database = client.db('Discoverio');
      const collection = database.collection('profiles');
      const objectId = new ObjectId(profileId);
      const existingProfile = await collection.findOne({ _id: objectId });

      if (!existingProfile) {
        console.log('Le profileId spécifié n\'existe pas.');
        return [];
      }

      const result = await collection
        .find({ _id: objectId })
        .project({ 'history.musics.liked': 1 })
        .toArray();

      const likedMusics: string[] = [];

      for (const doc of result) {
        const likedMusicsData = doc.history?.musics?.liked || [];
        likedMusics.push(...likedMusicsData);
      }

      return likedMusics;
    } catch (err) {
      console.error('Erreur de connexion à la base de données:', err);
      return [];
    } finally {
      
    }
  }
  
  

  

  async setLikedMusic(profileId: string, albumId: string): Promise<void> {
    try {
      await this.databaseService.connect();
      const client = this.databaseService.getClient();
      const database = client.db('Discoverio');
      const collection = database.collection('profiles');
      const objectId = new ObjectId(profileId);
      const existingProfile = await collection.findOne({ _id: objectId });
  
      if (!existingProfile) {
        console.log('Le profileId spécifié n\'existe pas.');
        return;
      }
  
      await collection.updateOne(
        { _id: objectId },
        { $push: { 'history.musics.liked': albumId } }
      );
  
      console.log('ID aimé ajouté avec succès !');
    } catch (err) {
      console.error('Erreur de connexion à la base de données:', err);
    } finally {
      
    }
  }






  async removeLikedMusic(profileId: string, albumId: string): Promise<void> {
    try {
      await this.databaseService.connect();
      const client = this.databaseService.getClient();
      const database = client.db('Discoverio');
      const collection = database.collection('profiles');
      const objectId = new ObjectId(profileId);
      const existingProfile = await collection.findOne({ _id: objectId });
  
      if (!existingProfile) {
        console.log('Le profileId spécifié n\'existe pas.');
        return;
      }
  
      await collection.updateOne(
        { _id: objectId },
        { $pull: { 'history.musics.liked': albumId } }
      );
  
      console.log('ID aimé supprimé avec succès !');
    } catch (err) {
      console.error('Erreur de connexion à la base de données:', err);
    } finally {
      
    }
  }
  






  



    async getUnLikedMusics(profileId: string): Promise<string[]> {
      try {
        await this.databaseService.connect();
        const client = this.databaseService.getClient();
        const database = client.db('Discoverio');
        const collection = database.collection('profiles');
        const objectId = new ObjectId(profileId);
        const existingProfile = await collection.findOne({ _id: objectId });

        if (!existingProfile) {
          console.log('Le profileId spécifié n\'existe pas.');
          return [];
        }

        const result = await collection
        .find({ _id: objectId })
        .project({ 'history.musics.unliked': 1 })
        .toArray();

        const unlikedMusics: string[] = [];
    
        for (const doc of result) {
          const unlikedMusicsData = doc.history?.musics?.unliked || [];
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
        const collection = database.collection('profiles');
        const objectId = new ObjectId(profileId);
        const existingProfile = await collection.findOne({ _id: objectId });
    
        if (!existingProfile) {
          console.log('Le profileId spécifié n\'existe pas.');
          return;
        }
    
        await collection.updateOne(
          { _id: objectId },
          { $push: { 'history.musics.unliked': albumId } }
        );
    
        console.log('ID non-aimé ajouté avec succès !');
      } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
      } finally {
        
      }
    }
    
    async removeUnLikedMusic(profileId: string, albumId: string): Promise<void> {
      try {
        await this.databaseService.connect();
        const client = this.databaseService.getClient();
        const database = client.db('Discoverio');
        const collection = database.collection('profiles');
        const objectId = new ObjectId(profileId);
        const existingProfile = await collection.findOne({ _id: objectId });
    
        if (!existingProfile) {
          console.log('Le profileId spécifié n\'existe pas.');
          return;
        }
    
        await collection.updateOne(
          { _id: objectId },
          { $pull: { 'history.musics.unliked': albumId } }
        );
    
        console.log('ID non-aimé supprimé avec succès !');
      } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
      } finally {
        
      }
    }
    


    async getDoneMusics(profileId: string): Promise<string[]> {
      try {
        await this.databaseService.connect();
        const client = this.databaseService.getClient();
        const database = client.db('Discoverio');
        const collection = database.collection('profiles');
        const objectId = new ObjectId(profileId);
        const existingProfile = await collection.findOne({ _id: objectId });
  
        if (!existingProfile) {
          console.log('Le profileId spécifié n\'existe pas.');
          return [];
        }
  
        const result = await collection
          .find({ _id: objectId })
          .project({ 'history.musics.done': 1 })
          .toArray();
  
        const doneMusics: string[] = [];
  
        for (const doc of result) {
          const doneMusicsData = doc.history?.musics?.done || [];
          doneMusics.push(...doneMusicsData);
        }
  
        return doneMusics;
      } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return [];
      } finally {
        
      }
    }



    async setDoneMusic(profileId: string, albumId: string): Promise<void> {
      try {
        await this.databaseService.connect();
        const client = this.databaseService.getClient();
        const database = client.db('Discoverio');
        const collection = database.collection('profiles');
        const objectId = new ObjectId(profileId);
        const existingProfile = await collection.findOne({ _id: objectId });
    
        if (!existingProfile) {
          console.log('Le profileId spécifié n\'existe pas.');
          return;
        }
    
        await collection.updateOne(
          { _id: objectId },
          { $push: { 'history.musics.done': albumId } }
        );
    
        console.log('ID «réalisée» ajouté avec succès !');
      } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
      } finally {
        
      }
    }
    
    async unsetDoneMusic(profileId: string, albumId: string): Promise<void> {
      try {
        await this.databaseService.connect();
        const client = this.databaseService.getClient();
        const database = client.db('Discoverio');
        const collection = database.collection('profiles');
        const objectId = new ObjectId(profileId);
        const existingProfile = await collection.findOne({ _id: objectId });
    
        if (!existingProfile) {
          console.log('Le profileId spécifié n\'existe pas.');
          return;
        }
    
        await collection.updateOne(
          { _id: objectId },
          { $pull: { 'history.musics.done': albumId } }
        );
    
        console.log('ID «réalisée» supprimé avec succès !');
      } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
      } finally {
        
      }
    }









    async getAllMusics(profileId: string): Promise<number[]> {
      try {
        await this.databaseService.connect();
        const client = this.databaseService.getClient();
        const database = client.db('Discoverio');
        const collection = database.collection('profiles');
        const objectId = new ObjectId(profileId);
        const existingProfile = await collection.findOne({ _id: objectId });

        if (!existingProfile) {
          console.log('Le profileId spécifié n\'existe pas.');
          return [];
        }

        const result = await collection
        .find({ _id: objectId })
        .project({ 'history.musics': 1 })
        .toArray();

        const allMusics: number[] = [];
      
        for (const doc of result) {
          const history = doc.history || {};
          const musics = history.musics || {};
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
      const collection = database.collection('profiles');
      const objectId = new ObjectId(profileId);
      const existingProfile = await collection.findOne({ _id: objectId });

      if (!existingProfile) {
        console.log('Le profileId spécifié n\'existe pas.');
        return [];
      }

      const result = await collection
      .find({ _id: objectId })
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
    const collection = database.collection('profiles');
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
    const collection = database.collection('profiles');

    // Creating an ObjectId instance from the profileId
    const objectId = new ObjectId(profileId);

    const existingProfile = await collection.findOne({ _id: objectId });

    if (!existingProfile) {
      console.log('Le profileId spécifié '+objectId+' n\'existe pas.');
      return '';
    }

    const result = await collection
      .find({ _id: objectId })
      .project({ given_name: 1 })
      .toArray();

    let firstName: string = '';

    for (const doc of result) {
      const firstNameData = doc.given_name || '';
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
    const collection = database.collection('profiles');

    // Creating an ObjectId instance from the profileId
    const objectId = new ObjectId(profileId);

    const existingProfile = await collection.findOne({ _id: objectId });

    if (!existingProfile) {
      console.log('Le profileId spécifié n\'existe pas.');
      return '';
    }

    const result = await collection
      .find({ _id: objectId })
      .project({ family_name: 1 })
      .toArray();

    let lastName: string = '';

    for (const doc of result) {
      const lastNameData = doc.family_name || '';
      lastName += lastNameData;
    }

    // client.close();        
    return lastName;
  } catch (err) {
    console.error('Erreur de connexion à la base de données:', err);
  }


}
}
