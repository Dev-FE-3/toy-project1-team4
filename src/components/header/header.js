import axios from 'axios';

async function getNav() {
  try {
    const response = await axios.get('/api/menu/0');
    const currentPath = window.location.pathname;
    const navMenu = response.data
      .map(item => {
        if (item.MENU_PATH === currentPath) {
          return `
            <h2 class="page-title__name">${item.MENU_LIST}</h2>
        `;
        }
      })
      .join('');

    return navMenu;
  } catch (error) {
    console.error(error);
  }
}

async function getUser() {
  try {
    const response = await axios.get('/api/user/2');
    const userName = response.data
      .map(item => {
        return `
          <span class="page-title__user">안녕하세요, ${item.NAME}님</span>
      `;
      })
      .join('');

    return userName;
  } catch (error) {
    console.error(error);
  }
}

export async function header() {
  return `
    <header class="header">
      <ul class="top-menu">
        <li class="top-menu__item item--settings"><a href="javascript:;">설정</a></li>
        <li class="top-menu__item item--share"><a href="javascript:;">공유</a></li>
        <li class="top-menu__item item--notification"><a href="javascript:;">알림</a></li>
      </ul>
      <div class="page-title">
        ${await getNav()}
        ${await getUser()}
      </div>
    </header>
  `;
}