import axios from 'axios';

function navList(manuList) {
  return `
    <div class="menu">
      <div class="menu__inner">
        <div class="menu__wrap">
          <h1 class="logo">
            <a href="/" class="logo__link">
              <img src="./../public/images/img_logo.png" class="logo__img" alt="PPangGeut">
            </a>
          </h1>
          <nav class="nav">
            <h6 class="nav__title">메뉴</h6>
            <ul class="nav__list">
              ${manuList}
            </ul>
          </nav>
          <div class="bookmark">
            <h6 class="bookmark__title">즐겨찾기</h6>
            <ul class="bookmark__list">
              <li class="bookmark__item item--dashboard"><a href="/">대시 보드</a></li>
            </ul>
          </div>
        </div>
        <div class="logout">
          <a href="/logout" class="logout__button">로그아웃</a>
        </div>
      </div>
    </div>
    `;
}

// const pathMap = {
//   '/': 'item--dashboard',
//   '/work': 'item--work',
//   '/notice': 'item--notice',
// };

export async function nav() {
  try {
    const currentStorage = window.sessionStorage;
    const [response] = await Promise.all([await fetchData(`/api/menu/${currentStorage.role}`)]);
    return navList(navItemClass(response));
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function navItemClass(response) {
  const menuList = response
    .map(item => {
      return `
      <li class="nav__item ${window.location.pathname === item.MENU_PATH ? 'active' : ''}">
        <a href="${item.MENU_PATH}">${item.MENU_LIST}</a>
      </li>
    `;
    })
    .join('');

  return menuList;
}
