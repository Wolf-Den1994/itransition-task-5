export class User {
  static create(user) {
    return fetch(
      'https://project-app-3a86b-default-rtdb.firebaseio.com/users.json',
      {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        let arrGivenAway = [];
        for (let key in response) {
          arrGivenAway.push(response[key]);
        }
        return arrGivenAway;
      });
  }

  static getting() {
    return fetch(
      'https://project-app-3a86b-default-rtdb.firebaseio.com/users.json',
      {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        let arrReceived = [];
        for (let key in response) {
          arrReceived.push(response[key]);
        }
        return arrReceived;
      });
  }

  static getIdUserAndRestInfo() {
    return fetch(
      'https://project-app-3a86b-default-rtdb.firebaseio.com/users.json',
      {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }

  static changesСompletely(copyResponseObj) {
    return fetch(
      'https://project-app-3a86b-default-rtdb.firebaseio.com/users.json',
      {
        method: 'PUT',
        body: JSON.stringify(copyResponseObj),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }

  static deleteUser(user) {
    return fetch(
      'https://project-app-3a86b-default-rtdb.firebaseio.com/users.json',
      {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }

  static lockUser(user) {
    return fetch(
      'https://project-app-3a86b-default-rtdb.firebaseio.com/users.json',
      {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }
}
