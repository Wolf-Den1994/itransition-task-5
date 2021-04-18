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
        // console.log(response) // приходящий с базы объект name
        user.id = response.name // запись поля name в наш объект под id 
        return user;
      })
      .then(addSavege)
  }
}

// занесение всех юзеров полученных из базы в локалсторейдж
function addSavege(user) {
  const all = getUsersFromSavege();
  all.push(user)
  localStorage.setItem('usersSave', JSON.stringify(all))
}

// получение из локал сторейд всех юзеров для пополнения (чтобы не перезаписывать)
function getUsersFromSavege() {
  return JSON.parse(localStorage.getItem('usersSave') || '[]')
}




let arrLoginsReceived = [];

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
        // console.log(response) // приходящий с базы объект name
        user.id = response.name // запись поля name в наш объект под id 
        return user;
      })
  }

  static getting() { // ссылка с базы
    return fetch('https://project-app-3a86b-default-rtdb.firebaseio.com/users.json', {
      method: 'GET', // создание
      body: JSON.stringify(), // тело - наш объект
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        for(var key in response) {
          arrLoginsReceived.push(response[key].login)
        }
      })
      .then(loginsReceived)
  }
}

function loginsReceived() {
  return arrLoginsReceived;
}