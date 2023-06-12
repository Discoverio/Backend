/**
 * Fichier: musicProposition.ts
 * Description: Ce fichier contient la logique pour proposer une musique depuis notre base de données MongoDB,
 * vérifier la dernière connexion d'un utilisateur à l'application
 * et pour déterminer s'il est nécessaire de lancer une requête.
 * Auteurs: Yoann PETIT, Simon MANIEZ
 * Date de création: 31 janvier 2023
 */

import axios from 'axios';


// Fonction pour récupérer la valeur de objectUserId à partir du backend
async function fetchObjectUserId() {
  try {
    const response = await axios.get(`http://localhost:3000/session/userId`);
    return response.data; // Valeur de objectUserId
    console.log(response.data);
    
  } catch (error) {
    console.error('Erreur lors de la récupération de objectUserId :', error);
    return "0"
    // Gérer l'erreur ou afficher un message approprié
  }
}


/**
 * Fonction sans paramètre retournant un enregistrement musical provenant de la base de données de Discoverio
 * Cette base contient des enregistrements musicaux ayant Deezer pour source.
 * @returns un identifiant d'enregistrement musical aléatoire.
 */
export async function getOneRandomAlbum() {
  const objectUserId = await fetchObjectUserId();
  try {

    const response = await axios.get(`http://localhost:3000/music/random/${objectUserId}`);
    return response.data.id;

  } catch (error) {

    console.error(error);
    return '';
  }

};


// let lastExecutionTime = new Date(); //remplacer ici par la dernière date de l'interaction de l'utilisateur
// let currentAlbumId = '400319947';

// /**
//  * Si la dernière exécution remonte à moins de 24 heures, l'execution n'est pas réalisée.
//  * Le temps restant avant la prochaine exécution est indiqué lors du refus.
//  * Sinon, la fonction exécute la requête.
//  * @Retourne la valeur d'un enregistrement musical aléatoire.
//  */
// export async function checkAndExecute() {
//   let currentTime = new Date();
//   console.log("currentTime:", currentTime);
//   console.log("lastExecutionTime:", lastExecutionTime);
//   if (lastExecutionTime && currentTime.getTime() - lastExecutionTime.getTime() < 24 * 60 * 60 * 1000) {
//     let remainingTime = 24 * 60 * 60 * 1000 - (currentTime.getTime() - lastExecutionTime.getTime());
//     let days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);
//     let hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
//     let minutes = Math.floor(remainingTime / 1000 / 60) % 60;
//     let seconds = Math.floor(remainingTime / 1000) % 60;
//     console.log("La requête a été exécutée récemment, veuillez patienter " + days + " jours, " + hours + " heures, " + minutes + " minutes et " + seconds + " secondes.");
//     return;
//   }
//   lastExecutionTime = currentTime;
//   // Lancer la requête ici
//   console.log("Lancement de la requête...");
//   const albumId = await getOneRandomAlbum();
//   currentAlbumId = albumId;
// }

// Appeler cette fonction lors de la connexion d'un utilisateur à l'application
// checkAndExecute();



/**
/**
 * Fonction qui retourne un identifiant d'enregistrement musical aléatoire.
 * Si la dernière exécution pour l'utilisateur remonte à moins de 24 heures, elle retourne le dernier album ID.
 * Si le délai de 24 heures est dépassé, elle exécute la requête pour obtenir un nouvel identifiant aléatoire.
 * @returns Un identifiant d'enregistrement musical aléatoire.
 */
// export async function getRandomAlbumId() {
//   const currentTime = new Date();
//   const timeDifference = currentTime.getTime() - lastExecutionTime.getTime();

//   if (lastExecutionTime && timeDifference < 24 * 60 * 60 * 1000) {
//     // Moins de 24 heures se sont écoulées depuis la dernière exécution
//     let remainingTime = 24 * 60 * 60 * 1000 - timeDifference;
//     let days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);
//     let hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
//     let minutes = Math.floor(remainingTime / 1000 / 60) % 60;
//     let seconds = Math.floor(remainingTime / 1000) % 60;
//     console.log(
//       "La requête a été exécutée récemment, veuillez patienter " +
//         days +
//         " jours, " +
//         hours +
//         " heures, " +
//         minutes +
//         " minutes et " +
//         seconds +
//         " secondes."
//     );
//     return currentAlbumId;
//   }

//   // Le délai de 24 heures est dépassé, exécution aléatoire
//   lastExecutionTime = currentTime;
//   console.log("Lancement de la requête...");
//   const albumId = await getOneRandomAlbum();
//   currentAlbumId = albumId;
//   return albumId;
// }

