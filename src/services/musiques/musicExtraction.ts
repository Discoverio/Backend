/**
 * Fichier: musicExtraction.ts
 * Description: Ce fichier contient la logique pour récupérer aléatoirement des enregistrements musicaux
 * avec deezer-public-api, package interrogant l'api officiel de Deezer et les stocker dans une base de données MongoDB
 * Auteurs: Simon MANIEZ, Yoann PETIT
 * Date de création: 31 janvier 2023
 */


const DeezerPublicApi = require('deezer-public-api');
let deezer = new DeezerPublicApi();
let MongoClientExtract = require('mongodb').MongoClient;



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

let ids = [];
for (let i = 0; i < 50; i++) {
    const q = generateAlbumIDForDeezerAPI();
    ids.push(q);
}

// traiter le cas où un id serait déjà présent
let UniqueIdList = ids.filter(function (item, pos, self) {
    return self.indexOf(item) == pos;
});



/**
 * La fonction se connecte au serveur MongoDB, insère l'objet album dans la collection albums, puis
 * ferme la connexion
 * @param album
 */
async function insertAlbum(album) {
    const client = await MongoClientExtract.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('albums');
    const collection = db.collection('albums');

    await collection.insertOne(album);
    client.close();
}



// Envoyer plusieurs requête avec des ID aléatoires.
let promises = UniqueIdList.map(id => deezer.artist.albums(`${id}`).then(responses => {
    
    // On vérifie qu'un album possède bien au moins un titre. Sinon, il est inexistant ou vide.
    if ((responses.total !== 0)) {

        let resultat = "";
        for (let i in responses) {
            if (responses.hasOwnProperty(i)) {

                if (i == "data") {
                    resultat = JSON.parse(JSON.stringify(responses[i]));
                    console.log(resultat);

                    insertAlbum({ resultat });

                }
            }
        }

    }
}
));

