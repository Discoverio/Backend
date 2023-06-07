export function sendRequest(action, method, id, content) {
    const baseUrl = `${process.env.REACT_APP_BACKEND_ADRESS}/infos/profile/history/musics`;
    const url = `${baseUrl}/${action}/${id}`;
  
    const body = content ? JSON.stringify(content) : JSON.stringify({ id: id });
  
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
    .then(response => {
      if (response.ok) {
        console.log("ID envoyé avec succès !");
      } else {
        console.error("Une erreur s'est produite lors de l'envoi de l'ID.");
      }
    })
    .catch(error => {
      console.error(error);
    });
  }
  