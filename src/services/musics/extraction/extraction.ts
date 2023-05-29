/**
 * Fichier: musicExtraction.ts
 * Description: Ce fichier contient la logique pour récupérer aléatoirement des enregistrements musicaux
 * avec deezer-public-api, package interrogant l'api officiel de Deezer et les stocker dans une base de données MongoDB
 * Auteurs: Simon MANIEZ, Yoann PETIT
 * Date de création: 31 janvier 2023
 * Date de modification: 03 mars 2023
 */

import { Console, log } from "console";

// import { Inject } from '@nestjs/common';
import { DatabaseService } from "src/database/database.service";

const DeezerPublicApi = require('deezer-public-api');
let deezer = new DeezerPublicApi();

const databaseService = new DatabaseService();

/**
* Renvoie un nombre entier aléatoire entre les valeurs min et max.
 * @param min - Le nombre minimum que vous voulez générer.
 * @param max - Le nombre maximum de la plage.
 * @returns Un nombre aléatoire entre les valeurs min et max.
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}



/**
 * Elle génère un nombre aléatoire entre 044456 et 999999, et le renvoie.
 * @returns Un nombre aléatoire entre 044456 et 999999.
 */
function generateAlbumIDForDeezerAPI() {
    const randomID = getRandomInt('0o44456', 999999);
    return randomID;
}



/*
1. Générer 50 ID d'album aléatoires
2. Pour chaque ID d'album, une requête est réalisée à l'API de Deezer.
3. Enregistrez la réponse
*/
const max_val = 10; // 50

let ids = [];
for (let i = 0; i < max_val; i++) {
    const q = generateAlbumIDForDeezerAPI();
    ids.push(q);
}



// traiter le cas où un id serait déjà présent
let UniqueIdList = ids.filter(function (item, pos, self) {
    return self.indexOf(item) == pos;
});



/**
 * La fonction se connecte au serveur MongoDB, insère l'objet album dans la collection albums s'il n'est pas présent,
 * puis ferme la connexion
 * @param album
 */
async function insertAlbum(album) {
  try {
    await databaseService.connect(); // Connectez-vous à la base de données en utilisant le service DatabaseService

    const client = databaseService.getClient(); // Obtenez le client MongoDB à partir du service
    const db = client.db('Discoverio');
    const collection = db.collection('albums');

    const existingAlbum = await collection.findOne({ id: album });

    if (existingAlbum) {
      console.log(`L'album avec l'ID ${album} existe déjà dans la collection.`);
      return;
    }
    await collection.insertOne({ id: album });
  } catch (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } finally {
    // databaseService.disconnect(); // Fermez la connexion à la base de données
  }
}



/**
 * La fonction se connecte au serveur MongoDB, insère l'objet artiste dans la collection artustes s'il n'est pas présent,
 * puis ferme la connexion
 * @param artist
 */
async function insertArtist(artist) {
  try {
    await databaseService.connect(); // Connectez-vous à la base de données en utilisant le service DatabaseService

    const client = databaseService.getClient(); // Obtenez le client MongoDB à partir du service
    const db = client.db('Discoverio');
    const collection = db.collection('artists');

    const existingArtist = await collection.findOne({ id: artist.id });

    if (existingArtist) {
      console.log(`L'artiste avec l'ID ${artist.id} existe déjà dans la collection.`);
      return;
    }

    await collection.insertOne(artist);
    console.log(`L'artiste avec l'ID ${artist.id} a été inséré dans la collection.`);
  } catch (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } finally {
    // databaseService.disconnect(); // Fermez la connexion à la base de données
  }
}




// function sleep(ms: number) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

export async function fetchMultiplesId() {
    // Envoyer plusieurs requête avec des ID aléatoires.
  let promises = UniqueIdList.map(id => deezer.artist.albums(`${id}`).then(responses => {

    // On vérifie qu'un album possède bien au moins un titre. Sinon, il est inexistant ou vide.
    if ((responses.total !== 0)) {

        let resultat = "";
        for (let i in responses) {
            if (responses.hasOwnProperty(i)) {

                if (i == "data") {
                    resultat = JSON.parse(JSON.stringify(responses[i]));
         
                    for (const element of resultat) {
                      let album_id = element['id'];
                      const test = deezer.artist(album_id);
                      let promises2 = test.then(async respo2 => {
                        // console.log(respo2);
                        insertArtist(respo2)
                      });
                    

                    }
 
                    
                    // console.log(resultat);
                    
                    insertAlbum({ resultat });
    
                }
            }
            
        }

    }

    return promises;
  }
  ));
}



// artistes


// genres


/**
 * Cette va récupérer la liste de tous les genres musicaux de l'api Deezer
 * @returns Les genres sous forme JSON.
 */
export async function getGenres() {
    try {
      const response = await deezer.genre();
      const genres = response.data;
      const documents = [];
      genres.forEach((genre) => {
        const document = {
          id: genre.id,
          name: genre.name,
          picture: genre.picture
        };
        documents.push(document);
      });
      return documents;
    } catch (error) {
      console.error(error);
    }
  }
  


  

  

// Fonction pour insérer les genres dans la collection "genres" de la base de données "albums"
async function insertGenres(genres) {
  try {
    await databaseService.connect();

    const client = databaseService.getClient();
    const collection = client.db('Discoverio').collection('genres');

    const insertPromises = genres.map(genre => {
      return collection.insertOne(genre);
    });

    const results = await Promise.all(insertPromises);
    console.log(`${results.length} genres ont été insérés dans la collection.`);
  } catch (error) {
    console.error(error);
  } finally {
    // databaseService.disconnect();
  }
}

  
// Appel des fonctions pour récupérer et insérer les genres [cette fonction s'appelle une fois seulement]
//   getGenres().then(genres => {
//     insertGenres(genres);
//   }).catch(error => {
//     console.error(error);
//   });


