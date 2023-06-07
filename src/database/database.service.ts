import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

@Injectable()
export class DatabaseService {
  private client: MongoClient;
  private uri: string = `mongodb+srv://${username}:${password}@discoverio.8i7zy8i.mongodb.net/Discoverio`;

  async connect(): Promise<void> {
    try {
      this.client = await MongoClient.connect(this.uri);
    } catch (err) {
      console.error('Erreur de connexion à la base de données:', err);
      throw err;
    }
  }

  // async disconnect(): Promise<void> {
  //   if (this.client) {
  //     await this.client.close();
  //   }
  // }

  getClient() {
    if (!this.client) {
      throw new Error('La connexion à la base de données n\'est pas encore établie.');
    }

    return this.client;
  }
}
