/**
 * Fichier: musicProposition.ts
 * Description: Ce fichier contient la logique pour proposer une musique depuis notre base de données MongoDB,
 * vérifier la dernière connexion d'un utilisateur à l'application
 * et pour déterminer s'il est nécessaire de lancer une requête.
 * Auteurs: Yoann PETIT, Simon MANIEZ
 * Date de création: 31 janvier 2023
 */

import axios from 'axios';



/**
 * Fonction sans paramètre retournant un enregistrement musical provenant de la base de données de Discoverio
 * Cette base contient des enregistrements musicaux ayant Deezer pour source.
 * @returns un identifiant d'enregistrement musical aléatoire.
 */
export async function getOneRandomAlbum() {

  try {

    const response = await axios.get(`${process.env.REACT_APP_BACKEND_ADRESS}/random`);
    return response.data.id;

  } catch (error) {

    console.error(error);
    return '';
  }

};



let lastExecutionTime = new Date(2022, 6, 8, 22, 30); //remplacer ici par la dernière date de l'interaction de l'utilisateur
/**
 * Si la dernière exécution remonte à moins de 24 heures, l'execution n'est pas réalisée.
 * Le temps restant avant la prochaine exécution est indiqué lors du refus.
 * Sinon, la fonction exécute la requête.
 * @Retourne la valeur d'un enregistrement musical aléatoire.
 */
export async function checkAndExecute() {
  let currentTime = new Date();
  console.log("currentTime:", currentTime);
  console.log("lastExecutionTime:", lastExecutionTime);
  if (lastExecutionTime && currentTime.getTime() - lastExecutionTime.getTime() < 24 * 60 * 60 * 1000) {
    let remainingTime = 24 * 60 * 60 * 1000 - (currentTime.getTime() - lastExecutionTime.getTime());
    let days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);
    let hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
    let minutes = Math.floor(remainingTime / 1000 / 60) % 60;
    let seconds = Math.floor(remainingTime / 1000) % 60;
    console.log("La requète a été exécutée récemment, veuillez patienter " + days + " jours, " + hours + " heures, " + minutes + " minutes et " + seconds + " secondes.");
    return;
  }
  lastExecutionTime = currentTime;
  // Lancer la requête ici
  console.log("Lancement de la requête...");
  // console.log(getOneRandomAlbum());
  return getOneRandomAlbum();
}
// Appeler cette fonction lors de la connexion d'un utilisateur à l'application
// checkAndExecute();