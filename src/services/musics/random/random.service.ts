import { Injectable } from '@nestjs/common';
import { fetchMultiplesId } from '../extraction/extraction';
import { DatabaseService } from 'src/database/database.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class RandomService {
  constructor(private readonly databaseService: DatabaseService) {}
  async getRandomAlbumId(userId: string) {
    await this.databaseService.connect();
    const client = this.databaseService.getClient();
    const database = client.db('Discoverio');
    const profilesCollection = database.collection('profiles');
    const currentTime = new Date();
  
    const objectId = new ObjectId(userId);
    const profile = await profilesCollection.findOne({ _id: objectId });
    const userLastExecutionTime = profile?.current?.music?.lastExecutionTime;
    const timeDifference = currentTime.getTime() - userLastExecutionTime;
  
    if (profile?.current?.music?.albumId && timeDifference < 24 * 60 * 60 * 1000) {
      // Moins de 24 heures se sont écoulées depuis la dernière exécution
      const remainingTime = 24 * 60 * 60 * 1000 - timeDifference;
      const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);
      const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
      const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
      const seconds = Math.floor(remainingTime / 1000) % 60;
      console.log(
        `[USER_${objectId}] La requête a été exécutée récemment, veuillez patienter ${days} jours, ${hours} heures, ${minutes} minutes et ${seconds} secondes.`
      );
      const currentAlbumId = JSON.stringify(profile.current.music.albumId.id);
      console.log(`[USER_${objectId}] L'album ${currentAlbumId} restera chargé pendant ce temps`);
  
      const album = await this.getAlbumById(currentAlbumId);
      return album;
    }
  
    // Le délai de 24 heures est dépassé, exécution aléatoire
    const randomAlbumId = await this.getRandomAlbum();
    await profilesCollection.updateOne({ _id: objectId }, { $set: { 'current.music.lastExecutionTime': currentTime, 'current.music.albumId': randomAlbumId } });
  
    // const album = await this.getAlbumById(randomAlbumId);
    return randomAlbumId;
  }
  
  
  async getAlbumById(albumId) {
    await this.databaseService.connect();
    const client = this.databaseService.getClient();
    const db = client.db('Discoverio');
    const album = await db.collection("albums").findOne({ "resultat.id": parseInt(albumId) });
    console.log("◄ Recherche de l'album " + albumId + "...");
    
    if (album && album.resultat) {
      const alb_json = album.resultat;
      for (let i in alb_json) {
        if (alb_json[i].id === parseInt(albumId)) {
          return alb_json[i];
        }
      }
    }
    
    return null; // Return null or handle the case when the album is not found
  }
  

  

  
  async getRandomAlbum() {
    await this.databaseService.connect();
    const client = this.databaseService.getClient();
    const db = client.db('Discoverio');
    const albumIds = await db.collection("albums").distinct("resultat.id");
    const unlikedAlbums = new Set(await db.collection("history").distinct("musics.unliked"));
  
    // Exclure les albums non aimés de la sélection aléatoire
    const filteredAlbumIds = albumIds.filter(albumId => !unlikedAlbums.has(albumId));
  
    if (filteredAlbumIds.length === 0) {
      console.log("Aucun album correspondant aux critères n'a été trouvé.");
      return null;
    }
  
    const un_album = filteredAlbumIds[Math.floor(Math.random() * filteredAlbumIds.length)];
    const album = await db.collection("albums").findOne({ "resultat.id": un_album });
    console.log("Recherche de l'album " + un_album + "...");
    let alb_json = album.resultat;
    for (let i in alb_json) {
      if (alb_json[i].id === un_album) {
        return alb_json[i];
      }
    }
    // client.close();
  }
  

}
