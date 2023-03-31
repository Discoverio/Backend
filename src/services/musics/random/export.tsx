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
export async function getOneRandomAlbum(){

  try {

    const response = await axios.get('http://localhost:3000/random');
    return response.data.id;

  } catch (error) {

    console.error(error);
    return '';
  }
  
};