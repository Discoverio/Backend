import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class InfosService {

  async getAlbumYear(deezer_album_id) {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('albums');
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
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('albums');
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
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('albums');
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

