/**
 * Fichier: musicProposition.ts
 * Description: Ce fichier contient la logique pour proposer une musique depuis notre base de données MongoDB,
 * vérifier la dernière connexion d'un utilisateur à l'application
 * et pour déterminer s'il est nécessaire de lancer une requête.
 * Auteurs: Yoann PETIT, Simon MANIEZ
 * Date de création: 31 janvier 2023
 */

let MongoClientProposition = require('mongodb').MongoClient;


/**
 * Fonction sans paramètre retournant un enregistrement musical provenant de la base de données de Discoverio
 * Cette base contient des enregistrements musicaux ayant Deezer pour source.
 */
async function getOneRandomAlbum() {
    const client = await MongoClientProposition.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('albums');
    const albumIds = await db.collection("albums").distinct("resultat.id");
    const un_album = albumIds[Math.floor(Math.random() * albumIds.length)];

    const album = await db.collection("albums").findOne({ "resultat.id": un_album });

    console.log("Search for " + un_album + " Album...");


    let alb_json = album.resultat;
    for (let i in alb_json) {

        if (alb_json[i].id === un_album) {
            console.log(alb_json[i].id + " true because find " + un_album);
            console.log(alb_json[i]);
        }
    }

    // return album;
    client.close();
}


let lastExecutionTime: Date = new Date(2023, 0, 31, 14, 35); 

/**
 * Si la dernière exécution remonte à moins de 24 heures, l'execution n'est pas réalisée.
 * Le temps restant avant la prochaine exécution est indiqué lors du refus.
 * Sinon, la fonction exécute la requête.
 * @Retourne la valeur d'un enregistrement musical aléatoire.
 */
function checkAndExecute(): void {
    const currentTime: Date = new Date();
    console.log("currentTime:", currentTime);
    console.log("lastExecutionTime:", lastExecutionTime);
    if (lastExecutionTime && currentTime.getTime() - lastExecutionTime.getTime() < 24 * 60 * 60 * 1000) {

        const remainingTime: number = 24 * 60 * 60 * 1000 - (currentTime.getTime() - lastExecutionTime.getTime());

        const days: number = Math.floor(remainingTime / 1000 / 60 / 60 / 24);
        const hours: number = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
        const minutes: number = Math.floor(remainingTime / 1000 / 60) % 60;
        const seconds: number = Math.floor(remainingTime / 1000) % 60;

        console.log(`La requête a été exécutée récemment, veuillez patienter ${days} jours, ${hours} heures, ${minutes} minutes et ${seconds} secondes.`);
        return;
    }
    lastExecutionTime = currentTime;

    // Lancer la requête ici
    console.log("Lancement de la requête...");
    console.log(getOneRandomAlbum());
}

// Appeler cette fonction lors de la connexion d'un utilisateur à l'application
checkAndExecute();
