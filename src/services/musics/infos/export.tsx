/**
 * Fichier: musicProposition.ts
 * Description: Ce fichier contient la logique pour proposer une musique depuis notre base de données MongoDB,
 * vérifier la dernière connexion d'un utilisateur à l'application
 * et pour déterminer s'il est nécessaire de lancer une requête.
 * Auteurs: Yoann PETIT, Simon MANIEZ
 * Date de création: 31 janvier 2023
 */

import axios from 'axios';

/* Note MVP : Les fonctions font des appels à l'API Deezer directement. 
 * À l'avenir, ces informations seront disponibles dans notre BDD MongoDB dès lors qu'un enregistrement musical
 * sera enregistrée, la fiche de l'artiste sera enregistrée. Les genres musicaux vont être ajoutée également.
 */



/**
 * Cette fonction prend un deezer_album_id comme argument, obtient l'année d'un album à partir de l'API Deezer.
 * @param deezer_album_id - l'id de l'album dont on souhaite obtenir l'année.
 * @returns L'année de l'album.
 */
export async function getAlbumTitle(deezer_album_id) {

  try {

    const response = await axios.get(`${process.env.REACT_APP_BACKEND_ADRESS}/infos/album/title/${deezer_album_id}`);
    return response.data;

  } catch (error) {

    console.error(error);
    return '';

  }
};


/**
 * Cette fonction prend un deezer_album_id comme argument, obtient l'année d'un album à partir de l'API Deezer.
 * @param deezer_album_id - l'id de l'album dont on souhaite obtenir l'année.
 * @returns L'année de l'album.
 */
export async function getAlbumYear(deezer_album_id) {

  try {

    const response = await axios.get(`${process.env.REACT_APP_BACKEND_ADRESS}/infos/album/year/${deezer_album_id}`);
    return response.data;

  } catch (error) {

    console.error(error);
    return '';

  }
};



/**
* Cette fonction prend un deezer_album_id comme argument, fait deux appels API et retourne le nom du genre de l'album.
 * @param deezer_album_id - l'id de l'album pour obtenir le genre.
 * @returns Le genre de l'album.
 */
export async function getAlbumGenre(deezer_album_id) {

  try {

    const response = await axios.get(`${process.env.REACT_APP_BACKEND_ADRESS}/infos/album/genre/${deezer_album_id}`);
    return response.data;

  } catch (error) {

    console.error(error);
    return '';

  }  
}



/**
 * Cette fonction prend un deezer_album_id comme argument, récupère l'identifiant de l'artiste dans l'album,
 * puis obtient le nombre de fans de l'artiste.
 * @param deezer_album_id - l'id de l'album pour lequel on souhaite obtenir le nombre de fans.
 * @returns Le nombre de fans de l'artiste de l'album.
 */
export async function getNbArtistFans(deezer_album_id) {
  try {
    const query_album = `https://api.deezer.com/album/${deezer_album_id}`;
    const albumResponse = await axios.get(query_album);
    console.log(`https://api.deezer.com/album/${deezer_album_id}`);
    const artistId = albumResponse.data.artist.id;
    const artistResponse = await axios.get(`https://api.deezer.com/artist/${artistId}`);
    const numberOfFans = artistResponse.data.nb_fan;
    console.log(`Le nombre de fans de ${artistResponse.data.name} est de ${numberOfFans}`);
    return numberOfFans;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



/**
 * Cette fonction prend un deezer_album_id comme argument, renvoie du texte pour indiquer si les paroles sont explicites on non.
 * @param deezer_album_id - l'id de l'album pour lequel on souhaite obtenir le status des paroles.
 * @returns « Explicit » ou « ».
 */
export async function isExplicit(deezer_album_id) {

  try {

    const response = await axios.get(`${process.env.REACT_APP_BACKEND_ADRESS}/infos/album/explicit/${deezer_album_id}`);
    return response.data;

  } catch (error) {

    console.error(error);
    return '';

  }
};



/**
 * Cette fonction prend un deezer_album_id comme argument, récupère l'identifiant de l'artiste à partir de l'album, 
 * puis récupère la petite image de l'artiste.
 * @param deezer_album_id - l'id de l'album dont on souhaite obtenir l'image de l'artiste.
 * @returns La petite image de l'artiste.
 */
export async function getArtistPictureSmall(deezer_album_id) {
  try {
    const query_album = `https://api.deezer.com/album/${deezer_album_id}`;
    const albumResponse = await axios.get(query_album);
    const artistId = albumResponse.data.artist.id;
    const artistResponse = await axios.get(`https://api.deezer.com/artist/${artistId}`);
    const pictureSmall = artistResponse.data.picture_small;
    console.log(`La petite image de ${artistResponse.data.name} est ${pictureSmall}`);
    return pictureSmall;
  } catch (error) {
    console.error(error);
    throw error;
  }
};