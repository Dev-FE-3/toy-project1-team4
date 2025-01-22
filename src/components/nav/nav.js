export const nav = `
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
            <li class="nav__item item--dashboard active"><a href="/">대시 보드</a></li>
            <li class="nav__item item--work"><a href="/work">근태 관리</a></li>
            <li class="nav__item item--notice"><a href="/notice">사내 공지</a></li>
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
        <button type="" class="logout__button">로그아웃</button>
      </div>
    </div>
  </div>
`

export default nav;