import axios from 'axios';

export const fetchDataForFav = () => {
  return axios
    .get('http://localhost:3000/infos/profile/hystory/musics/liked/1')
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

export const fetchDataForHate = () => {
    return axios
      .get('http://localhost:3000/infos/profile/hystory/musics/unliked/1')
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


export const fetchDataForHystory = () => {
    return axios
      .get('http://localhost:3000/infos/profile/hystory/musics/1')
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


  export const fetchDataForFirstName = () => {
    return axios
      .get('http://localhost:3000/infos/profile/firstname/1')
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
  


  export const fetchDataForLastName = () => {
    return axios
      .get('http://localhost:3000/infos/profile/lastname/1')
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