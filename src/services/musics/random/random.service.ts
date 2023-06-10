import { Injectable } from '@nestjs/common';
import { fetchMultiplesId } from '../extraction/extraction';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RandomService {
  constructor(private readonly databaseService: DatabaseService) {}
  
  
  async getRandomAlbum() {
    await this.databaseService.connect();
    const client = this.databaseService.getClient();
    const db = client.db('Discoverio');
    const albumIds = await db.collection("albums").distinct("resultat.id");
    const un_album = albumIds[Math.floor(Math.random() * albumIds.length)];
    const album = await db.collection("albums").findOne({ "resultat.id": un_album });
    console.log("Search for " + un_album + " Album...");
    let alb_json = album.resultat;
    for (let i in alb_json) {
      if (alb_json[i].id === un_album) {
        // console.log(alb_json[i].id + " true because find " + un_album);
        // console.log(alb_json[i]);
        // fetchMultiplesId(); [Extraction/Insertion = trop de requetes]
        return alb_json[i];
      }
    }
    // client.close();
  }
}
