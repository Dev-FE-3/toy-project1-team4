import axios from 'axios';

function navItemClass(path) {
  const pathMap = {
    '/': 'item--dashboard active',
    '/work': 'item--work',
    '/notice': 'item--notice',
  };
  return pathMap[path] || '';
}

export async function nav() {
  try {
    const response = await axios.get('/api/menu/0');
    const navItem = response.data
      .map(item => {
        return `
        <li class="nav__item ${navItemClass(item.MENU_PATH)}"><a href="${
          item.MENU_PATH
        }">${item.MENU_LIST}</a></li>
        `;
      })
      .join('');

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
                  ${navItem}
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
              <button type="button" class="logout__button">로그아웃</button>
            </div>
          </div>
        </div>
        `;
  } catch (error) {
    console.error(error);
  }
}
