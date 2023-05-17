import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { fetchMultiplesId } from '../extraction/extraction';

@Injectable()
export class RandomService {
  
  async getRandomAlbum() {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('albums');
    const albumIds = await db.collection("albums").distinct("resultat.id");
    const un_album = albumIds[Math.floor(Math.random() * albumIds.length)];
    const album = await db.collection("albums").findOne({ "resultat.id": un_album });
    console.log("Search for " + un_album + " Album...");
    let alb_json = album.resultat;
    for (let i in alb_json) {
      if (alb_json[i].id === un_album) {
        // console.log(alb_json[i].id + " true because find " + un_album);
        // console.log(alb_json[i]);
        fetchMultiplesId();
        return alb_json[i];
      }
    }
    client.close();
  }
}
