import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class InfosService {
  constructor(private readonly databaseService: DatabaseService) {}
  async getNameOfAlbumId(albumId: number): Promise<string> {
    try {
      await this.databaseService.connect();
      const client = this.databaseService.getClient();
      const db = client.db('Discoverio'); // Remplacez 'your_database_name' par le nom de votre base de données
      const collection = db.collection('albums'); // Remplacez 'your_collection_name' par le nom de votre collection

      const result = await collection.findOne({ 'resultat.id': albumId });
      if (result && result.resultat && result.resultat.length > 0) {
        const album = result.resultat[0];
        return album.title;
      } else {
        throw new Error(`Album with ID ${albumId} not found.`);
      }
    } catch (err) {
      console.error('Erreur lors de la récupération du titre de l\'album:', err);
      throw err;
    }
  }

  async getAlbumYear(deezer_album_id) {
    await this.databaseService.connect();
    const client = this.databaseService.getClient();
    const db = client.db('Discoverio');
    const album = await db.collection("albums").findOne({ "resultat.id": parseInt(deezer_album_id) });

    let alb_json = album.resultat;
    for (let i in alb_json) {
      if (alb_json[i].id === parseInt(deezer_album_id)) {
        console.log(alb_json[i].id + " true because find " + deezer_album_id);
        const albumYear = alb_json[i].release_date.slice(0, 4);
        console.log(albumYear);
        return albumYear;
      }
    }

    client.close();
  }


  async isExplicit_lyrics(deezer_album_id) {
    await this.databaseService.connect();
    const client = this.databaseService.getClient();
    const db = client.db('Discoverio');
    const album = await db.collection("albums").findOne({ "resultat.id": parseInt(deezer_album_id) });
    let alb_json = album.resultat;
    for (let i in alb_json) {
      if (alb_json[i].id === parseInt(deezer_album_id)) {
        console.log(alb_json[i].id + " true because find " + deezer_album_id);
        const explicit = alb_json[i].explicit_lyrics;
        console.log(explicit ? "Contient des paroles « Explicit »" : "Ne Contient des paroles « Explicit »");

        client.close();
        return explicit ? "Explicit" : "";
      }
    }
  }

  async getAlbumGenre(deezer_album_id) {
    await this.databaseService.connect();
    const client = this.databaseService.getClient();
    const db = client.db('Discoverio');
    const album = await db.collection("albums").findOne({ "resultat.id": parseInt(deezer_album_id) });

    let alb_json = album.resultat;


    for (let i in alb_json) {
      if (alb_json[i].id === parseInt(deezer_album_id)) {
        console.log(alb_json[i].id + " true because find " + deezer_album_id);
        const albumGenre = alb_json[i].genre_id;
        console.log(albumGenre);
       
        const genre = await db.collection("genres").findOne({ "id": parseInt(albumGenre) });
        console.log(genre.name);
        return genre.name
        
      }


    }
      client.close();
    }

  }

