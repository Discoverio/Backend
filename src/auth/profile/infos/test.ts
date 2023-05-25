/**
 * Fichier: profile\export.tsx
 * Description: Ce fichier contient la logique pour interagir avec les données utilisateurs depuis notre base de données MongoDB
 * Auteurs: Yoann PETIT, Simon MANIEZ
 * Date de création: 19 mai 2023
 */
import { log } from 'console';
import { MongoClient, Collection, Filter } from 'mongodb';

const username = 'admin';
const password = 'mettre_le_mot_de_passe_apres_clone_ou_update';

async function getLikedMusics(collection: Collection): Promise<string[]> {
  const result = await collection.find({}).project({ 'hystory.musics.liked': 1 }).toArray();
  const likedMusics: string[] = [];

  for (const doc of result) {
    const likedMusicsData = doc.hystory?.musics?.liked || [];
    likedMusics.push(...likedMusicsData);
  }

  return likedMusics;
}

async function getUnlikedMusics(collection: Collection): Promise<string[]> {
  const result = await collection.find({}).project({ 'hystory.musics.unliked': 1 }).toArray();
  const unlikedMusics: string[] = [];

  for (const doc of result) {
    const unlikedMusicsData = doc.hystory?.musics?.unliked || [];
    unlikedMusics.push(...unlikedMusicsData);
  }

  return unlikedMusics;
}

async function getAllMusics(collection: Collection): Promise<number[]> {
  const result = await collection.find({}).project({ 'hystory.musics': 1 }).toArray();
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
}

export async function connectToDatabase() {
  const uri = `mongodb+srv://${username}:${password}@discoverio.8i7zy8i.mongodb.net/`;
  
  try {
    const client = await MongoClient.connect(uri);
    console.log('Connecté à la base de données MongoDB');

    // Effectuez des opérations sur la base de données ici
    // Récupérer les données depuis la base de données
    const database = client.db('Discoverio');
    const collection = database.collection('profile');

    const likedMusics = await getLikedMusics(collection);
    console.log('Musiques aimées:', likedMusics);

    const unlikedMusics = await getUnlikedMusics(collection);
    console.log('Musiques non-aimées:', unlikedMusics);

    const allMusics = await getAllMusics(collection);
    console.log('Toutes les musiques:', allMusics);
    // client.close();
    // console.log('Déconnexion de la base de données MongoDB');
  } catch (err) {
    console.error('Erreur de connexion à la base de données:', err);
  }
}

