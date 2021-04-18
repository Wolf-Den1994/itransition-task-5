import { activateModalLogin, activateModalSign, renderList, allCheck } from './companent';
import { Hash } from './hash';
import { User } from './user';
import './style.css';
// первые кнопки две
const loginInBtn = document.getElementById('login-in');
const signUpBtn = document.getElementById('sign-up');
const error = document.getElementById('error');
const lock = document.getElementById('lock')
const unlock = document.getElementById('unlock')
const delet = document.getElementById('delete')
const list = document.getElementById('list')


// нажатие на логин запускает создание модалки и
function loginInHundler(e) {
  error.className = 'mui--text-black-54';
  error.innerHTML = '';
  activateModalLogin();
  document.addEventListener('submit', authFormHandler, { once: true });
}
loginInBtn.addEventListener('click', loginInHundler);

async function authFormHandler(e) {
  e.preventDefault();
  let arrReceived = [], arrLoginReceived = [], arrPasswordReceived = [], arrStatusReceived = [];
  let copyRespons = {};
  const btnAuth = e.target.querySelector('#login-btn-form');
  const emailAuth = e.target.querySelector('#email-auth').value;
  const passwordAuth = e.target.querySelector('#password-auth').value;
  await User.getting().then((response) => {
    Object.assign(copyRespons, response)
    arrReceived = [...response];
  });
  arrLoginReceived = arrReceived.map(item => item.login);
  arrPasswordReceived = arrReceived.map(item => item.pass);
  arrStatusReceived = arrReceived.map(item => item.status);
  console.log(arrStatusReceived)

  let work = false;

  let flagSameLogin = false;
  for (let i = 0; i < arrLoginReceived.length; i++) {
    if (arrLoginReceived[i] === emailAuth) flagSameLogin = true;
  }

  // запись емейла в локалсторейд для последующего удаления себя из системы
  localStorage.setItem('email', emailAuth);
  // получение из локалсторейдж
  let getLocalStorageEmail = localStorage.getItem('email')

  const hashPassowrd = Hash.create(passwordAuth); // хэширую пароль
  let flagSamePass = false;
  for (let i = 0; i < arrPasswordReceived.length; i++) {
    if (arrPasswordReceived[i] === hashPassowrd) flagSamePass = true;
  }

  let flagSameStatusLock = false;
  for (let key in copyRespons) {
    if (emailAuth === copyRespons[key].login) {
      if (copyRespons[key].status === 'unactive') {
        flagSameStatusLock = true;
      }
    }
  }

  // проверка логина и емейла
  console.log('status', flagSameStatusLock, 'login', flagSameLogin, 'pass', flagSamePass)
  if (flagSameLogin && flagSamePass) {
    if (flagSameStatusLock) {
      error.className = 'error-email';
      error.innerHTML = '<strong>Error!</strong> You are banned';
      work = false;
    } else {
      error.innerHTML = '<strong>Great!</strong> You are entered';
      work = true;
    }
  } else {
    error.className = 'error-email';
    error.innerHTML = '<strong>Error!</strong> Email or password is not correct';
    work = false;
  }
  if (flagSameLogin) {
    if (!flagSamePass) {
      error.className = 'error-email';
      error.innerHTML = '<strong>Error!</strong> Email or password is not correct';
      work = false;
    }
  }
  if (flagSamePass) {
    if (!flagSameLogin) {
      error.className = 'error-email';
      error.innerHTML = '<strong>Error!</strong> Email or password is not correct';
      work = false;
    }
  }
  const modalEl = document.getElementById('mui-overlay');
  modalEl.remove();

  // если емейл и логин совпали то РАБОТАЕМ
  if (work) {
    const toolbar = document.getElementById('toolbar')
    loginInBtn.style.display = 'none';
    signUpBtn.style.display = 'none';
    toolbar.style.display = 'none';
    error.innerHTML = '';
    let copyResponseObj = {};
    await User.getIdUserAndRestInfo().then((response) => {
      Object.assign(copyResponseObj, response)
    })
    // добавления поля last при входе
    for(let key in copyResponseObj) {
      if (emailAuth === copyResponseObj[key].login && hashPassowrd === copyResponseObj[key].pass) {
        copyResponseObj[key].last = new Date().toJSON();
      }
    }
    let copyResponseObjFromFieldLast = {}
    await User.changesСompletely(copyResponseObj).then((response) => {
      Object.assign(copyResponseObjFromFieldLast, response)
    })
    console.log(copyResponseObjFromFieldLast)
    renderList(copyResponseObjFromFieldLast, checkboxActiveHandler)

    // выделение всех чекбоксов
    const generalCheckbox = document.getElementById('general-checkbox')
    let checkboxAll = document.querySelectorAll('.checkbox');

    let keyForEmail = '';
    for(let key in copyResponseObjFromFieldLast) {
      if(copyResponseObjFromFieldLast[key].login === getLocalStorageEmail) {
        keyForEmail = key
      }
    }

    let copyUserList = {...copyResponseObjFromFieldLast};
    async function checkboxActiveHandler(e) {
      let checkboxAll = list.querySelectorAll('.checkbox');
      checkboxAll.forEach(checkbox => {
        let key = checkbox.dataset.key;
        if (checkbox.checked) {
          delete copyUserList[key]
        } else {
          copyUserList[key] = copyResponseObjFromFieldLast[key]
        }
      })
    }

    // блокировка пользователя
    async function lockUserHandler(str) {
      let copyUserListForLock = {...copyResponseObjFromFieldLast};
      console.log(str, allCheck)
      if (allCheck) {
        for (let key in copyUserListForLock) {
          copyUserListForLock[key].status = str
        }
        await User.lockUser(copyUserListForLock).then((response) => {
          list.innerHTML = '';
          loginInBtn.style.display = 'block';
          signUpBtn.style.display = 'block';
          toolbar.style.display = 'none';
        });
      } else {
        let checkboxAll = list.querySelectorAll('.checkbox');
        checkboxAll.forEach(checkbox => {
          const key = checkbox.dataset.key
          if (checkbox.checked) {
            copyUserListForLock[key].status = str
          }
        })
        if (copyUserListForLock[keyForEmail].status === 'unactive') {
          await User.lockUser(copyUserListForLock).then((response) => {
            list.innerHTML = '';
            loginInBtn.style.display = 'block';
            signUpBtn.style.display = 'block';
            toolbar.style.display = 'none';
          });
        } else {
          await User.lockUser(copyUserListForLock).then((response) => {
            renderList(response, checkboxActiveHandler)
          });
        }
      }
    }
    lock.addEventListener('click', () => lockUserHandler('unactive'))
    unlock.addEventListener('click', () => lockUserHandler('active'))

    async function deletUserHandler(e) {
      if (allCheck) {
        await User.deleteUser(null).then((response) => {
          list.innerHTML = '';
          loginInBtn.style.display = 'block';
          signUpBtn.style.display = 'block';
          toolbar.style.display = 'none';
        });
      } else {
        if (!(JSON.stringify(copyResponseObjFromFieldLast) == JSON.stringify(copyUserList))) {
          if (!(copyUserList.hasOwnProperty(keyForEmail))) {
            await User.deleteUser(copyUserList).then((response) => {
              list.innerHTML = '';
              loginInBtn.style.display = 'block';
              signUpBtn.style.display = 'block';
              toolbar.style.display = 'none';
            });
          } else {
            await User.deleteUser(copyUserList).then((response) => {
              renderList(response, checkboxActiveHandler)
            });
          }
        }
      }      
    }
    delet.addEventListener('click', deletUserHandler)
  }
}




// нажатие на регистрацию запускает создание модалки
// обращаюсь к форме и запускаю обработку regFormHandler
function signUnHundler(e) {
  error.className = 'mui--text-black-54';
  error.innerHTML = '';
  activateModalSign();
  const formReg = document.getElementById('form-reg');
  formReg.addEventListener('submit', regFormHandler, { once: true });
}
signUpBtn.addEventListener('click', signUnHundler);

// регистрация
async function regFormHandler(e) {
  e.preventDefault(); // отключаю перезагрузку страницы
  let arrReceived = [], arrLoginReceived = [];

  const btnReg = e.target.querySelector('#sign-btn-form');
  let emailReg = e.target.querySelector('#email-reg').value;
  let nameReg = e.target.querySelector('#name-reg').value;
  let passwordReg = e.target.querySelector('#password-reg').value;
  const modalEl = document.getElementById('mui-overlay');

  const hashPassowrd = Hash.create(passwordReg); // хэширую пароль

  const user = {
    // создаю объект логина и пароля регистрации
    name: nameReg.trim(),
    login: emailReg.trim(),
    pass: hashPassowrd,
    date: new Date().toJSON(),
    last: 'did not enter',
    status: 'active',
  };
  btnReg.disabled = true;

  await User.getting().then((response) => {
    arrReceived = [...response];
  });

  arrLoginReceived = arrReceived.map(item => item.login);
  let flagSame = false;
  for (let i = 0; i < arrLoginReceived.length; i++) {
    if (arrLoginReceived[i] === emailReg) flagSame = true;
  }
  if (flagSame === true) {
    error.className = 'error-email';
    error.innerHTML = '<strong>Error!</strong> This email is used';
    modalEl.remove();
  } else {
    // async request to server to save user
    await User.create(user).then((response) => {
      btnReg.disabled = false;
      error.innerHTML = '<strong>Great!</strong> You are registered';
      modalEl.remove();
    });
  }
}