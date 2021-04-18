export function activateModalLogin() {
  var modalEl = document.createElement('div');
  modalEl.style.width = '400px';
  modalEl.style.height = '300px';
  modalEl.style.margin = '100px auto';
  modalEl.style.backgroundColor = '#fff';
  modalEl.style.display = 'flex';
  modalEl.style.justifyContent = 'center';
  modalEl.style.alignItems = 'center';
  modalEl.insertAdjacentHTML(
    'afterbegin',
    `<form class="mui-form" id="form-auth">
      <legend>LOGIN IN</legend>
      <div class="mui-textfield mui-textfield--float-label">
        <input type="email" id="email-auth" required>
        <label for="email">Email</label>
      </div>
      <div class="mui-textfield mui-textfield--float-label">
        <input type="password" id="password-auth" required>
        <label for="password">Password</label>
      </div>
      <button type="submit" class="mui-btn mui-btn--raised" id="login-btn-form">Login in</button>
    </form>`
  );

  mui.overlay('on', modalEl);
}

export function activateModalSign() {
  var modalEl = document.createElement('div');
  modalEl.style.width = '400px';
  modalEl.style.height = '300px';
  modalEl.style.margin = '100px auto';
  modalEl.style.backgroundColor = '#fff';
  modalEl.style.display = 'flex';
  modalEl.style.justifyContent = 'center';
  modalEl.style.alignItems = 'center';
  modalEl.insertAdjacentHTML(
    'afterbegin',
    `<form class="mui-form" id="form-reg">
      <legend>SIGN UP</legend>
      <div class="mui-textfield mui-textfield--float-label">
        <input type="text" id="name-reg" required>
        <label for="name-reg">Name</label>
      </div>
      <div class="mui-textfield mui-textfield--float-label">
        <input type="email" id="email-reg" required>
        <label for="email-reg">Email</label>
      </div>
      <div class="mui-textfield mui-textfield--float-label">
        <input type="password" id="password-reg" required>
        <label for="password-reg">Password</label>
      </div>
      <button type="submit" class="mui-btn mui-btn--raised" id="sign-btn-form">Sign up</button>
    </form>`
  );

  mui.overlay('on', modalEl);
}

export let allCheck = false;

export function renderList(
  copyResponseObjFromFieldLast,
  checkboxActiveHandler,
  checkboxAllActiveHandler
) {
  let html = '';
  let htmlTHead = `
  <table class="mui-table mui-table--bordered">
    <thead>
      <tr>
        <th>
          <label for="general-checkbox">All</label>
          <input type="checkbox" id="general-checkbox" name="general-checkbox">
        </th>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Date Reg</th>
        <th>Date Last in</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
  `;
  for (let key in copyResponseObjFromFieldLast) {
    let lastIn = `${new Date(
      copyResponseObjFromFieldLast[key].last
    ).toLocaleDateString()}
    ${new Date(copyResponseObjFromFieldLast[key].last).toLocaleTimeString()}`;
    let lastInDisplay = ``;
    if (`${lastIn}`.substring(0, 7) === 'Invalid') {
      lastInDisplay = 'did not enter';
    } else {
      lastInDisplay = `${new Date(
        copyResponseObjFromFieldLast[key].last
      ).toLocaleDateString()}
      ${new Date(copyResponseObjFromFieldLast[key].last).toLocaleTimeString()}`;
    }
    html += `
    <tr>
        <td>
          <input type="checkbox" class="checkbox" data-key="${key}" name="checkbox">
        </td>
        <td>
          ${key}
        </td>
        <td>
          ${copyResponseObjFromFieldLast[key].name}
        </td>
        <td>
          ${copyResponseObjFromFieldLast[key].login}
        </td>
        <td>
          ${new Date(
            copyResponseObjFromFieldLast[key].date
          ).toLocaleDateString()}
          ${new Date(
            copyResponseObjFromFieldLast[key].date
          ).toLocaleTimeString()}
        </td>
        <td>
          ${lastInDisplay}
        </td>
        <td>
          ${copyResponseObjFromFieldLast[key].status}
        </td>
      </tr>
    `;
  }
  let htmlTFooter = `
    </tbody>
  </table>
  `;
  const toolbar = document.getElementById('toolbar');
  toolbar.style.display = 'flex';

  const list = document.getElementById('list');
  list.innerHTML = htmlTHead + html + htmlTFooter;

  const generalCheckbox = document.getElementById('general-checkbox');
  let checkboxAll = list.querySelectorAll('.checkbox');
  checkboxAll.forEach((checkbox) => {
    checkbox.addEventListener('change', checkboxActiveHandler);
  });

  function checkboxAllActiveHandler() {
    checkboxAll.forEach((checkbox) => {
      if (generalCheckbox.checked) {
        checkbox.checked = true;
        allCheck = true;
      } else {
        checkbox.checked = false;
        allCheck = false;
      }
    });
  }

  generalCheckbox.addEventListener('change', checkboxAllActiveHandler);
}
