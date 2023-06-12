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

export const fetchDataForFav = async () => {
  const objectUserId = await fetchObjectUserId();
  return axios
    .get(`http://localhost:3000/infos/profile/history/musics/liked/${objectUserId}`)
    .then(response => {
      const numbers = response.data;
      const promises = numbers.map((number, index) => {
        return axios.get(`http://localhost:3000/infos/album/title/${number}`)
          .then(albumResponse => ({
            id: index + 1,
            title: albumResponse.data,
          }));
      });

      return Promise.all(promises);
    })
    .catch(error => {
      console.error(error);
      return [];
    });
};


export const fetchDataForHate = async () => {
  const objectUserId = await fetchObjectUserId();
    return axios
      .get(`http://localhost:3000/infos/profile/history/musics/unliked/${objectUserId}`)
      .then(response => {
        const numbers = response.data;
        return numbers.map((number, index) => ({
          id: index + 1,
          title: `Album n° ${number}`,
        }));
      })
      .catch(error => {
        console.error(error);
        return [];
      });
  };


export const fetchDataForhistory = async () => {
  const objectUserId = await fetchObjectUserId();
    return axios
      .get(`http://localhost:3000/infos/profile/history/musics/${objectUserId}`)
      .then(response => {
        const numbers = response.data;
        return numbers.map((number, index) => ({
          id: index + 1,
          title: `Album n° ${number}`,
        }));
      })
      .catch(error => {
        console.error(error);
        return [];
      });
  };


  export const fetchDataForFirstName = async () => {
    const objectUserId = await fetchObjectUserId();
    return axios.get(`http://localhost:3000/infos/profile/firstname/${objectUserId}`)
      .then(response => {
        // Récupérer la chaîne de caractères
        const firstName = response.data;
        
        // Utiliser la chaîne de caractères comme nécessaire
        console.log(firstName); // Affiche "John"

        // Retourner la chaîne de caractères si nécessaire
        return firstName;
      })
      .catch(error => {
        // Gérer les erreurs de requête
        console.error('Erreur lors de la requête:', error);
      });
  };
  


  export const fetchDataForLastName = async () => {
    const objectUserId = await fetchObjectUserId();
    return axios
      .get(`http://localhost:3000/infos/profile/lastname/${objectUserId}`)
      .then(response => {
        // Récupérer la chaîne de caractères
        const lastName = response.data;
        
        // Utiliser la chaîne de caractères comme nécessaire
        console.log(lastName); // Affiche "Doe"

        // Retourner la chaîne de caractères si nécessaire
        return lastName;
      })
      .catch(error => {
        // Gérer les erreurs de requête
        console.error('Erreur lors de la requête:', error);
      });
  };