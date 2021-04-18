export class User {
  // create - создание нового пользователя в базе
  static create(user) { // ссылка с базы
    return fetch('https://project-app-3a86b-default-rtdb.firebaseio.com/users.json', {
      method: 'POST', // создание
      body: JSON.stringify(user), // тело - наш объект
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        let arrGivenAway = [];
        for(let key in response) {
          arrGivenAway.push(response[key])
        }
        // console.log(response) // приходящий с базы объект name
        // user.id = response.name // запись поля name в наш объект под id 
        return arrGivenAway;
      })
  }

  static getting() { // ссылка с базы
    return fetch('https://project-app-3a86b-default-rtdb.firebaseio.com/users.json', {
      method: 'GET', // получение
      body: JSON.stringify(), // тело - наш объект
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        let arrReceived = [];
        for(let key in response) {
          arrReceived.push(response[key])
        }
        return arrReceived;
      })
  }

  static getIdUserAndRestInfo() { // ссылка с базы
    return fetch('https://project-app-3a86b-default-rtdb.firebaseio.com/users.json', {
      method: 'GET', // получение
      body: JSON.stringify(), // тело - наш объект
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        return response;
      })
  }

  static changesСompletely(copyResponseObj) { // ссылка с базы
    return fetch('https://project-app-3a86b-default-rtdb.firebaseio.com/users.json', {
      method: 'PUT', // изменения полностью
      body: JSON.stringify(copyResponseObj), // тело - наш объект
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        return response;
      })
  }

  static deleteUser(user) { // ссылка с базы
    return fetch('https://project-app-3a86b-default-rtdb.firebaseio.com/users.json', {
      method: 'PUT', // изменения полностью
      body: JSON.stringify(user), // тело - наш объект
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        return response;
      })
  }

  static lockUser(user) { // ссылка с базы
    return fetch('https://project-app-3a86b-default-rtdb.firebaseio.com/users.json', {
      method: 'PUT', // изменения полностью
      body: JSON.stringify(user), // тело - наш объект
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        return response;
      })
  }
}