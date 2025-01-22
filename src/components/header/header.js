import axios from 'axios';

function getPageTitle(menuItem, currentPath) {
  const currentItem = menuItem.find(item => item.MENU_PATH === currentPath);
  return currentItem 
    ? `<h2 class="page-title__name">${currentItem.MENU_LIST}</h2>`
    : '';
}

function getUserName(userName) {
  return userName
    .map(item => `<span class="page-title__user">안녕하세요, ${item.NAME}님</span>`)
    .join('');
}

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function header() {
  const [menuData, userData] = await Promise.all([
    fetchData('/api/menu/0'),
    fetchData('/api/user/2')
  ]);
  const currentPath = window.location.pathname;
  const pageTitle = getPageTitle(menuData, currentPath);
  const userName = getUserName(userData);

  return `
    <header class="header">
      <ul class="top-menu">
        <li class="top-menu__item item--settings"><a href="javascript:;">설정</a></li>
        <li class="top-menu__item item--share"><a href="javascript:;">공유</a></li>
        <li class="top-menu__item item--notification"><a href="javascript:;">알림</a></li>
      </ul>
      <div class="page-title">
        ${pageTitle}
        ${userName}
      </div>
    </header>
  `;
}