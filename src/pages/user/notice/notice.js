import './notice.css';
import axios from 'axios';
import { formatDateTime } from '../../../util/utils';

export const notice = function (content) {
  content.innerHTML = `
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
    <div class="wrap">
      <header class="header">
        <ul class="top-menu">
          <li class="top-menu__item item--settings"><a href="#">설정</a></li>
          <li class="top-menu__item item--share"><a href="#">공유</a></li>
          <li class="top-menu__item item--notification"><a href="#">알림</a></li>
        </ul>
        <div class="page-title">
          <h2 class="page-title__name">페이지명</h2>
          <span class="page-title__user">안녕하세요, 빵긋님</span>
        </div>
      </header>
      <div class="container">
        <div id="notice">
          <ul class="row notice-card">
          
          </ul>
        </div>
        <section class="pagination">
            <a href="javascript:;" class="pagination--prev">prev</a> 
            <div class="pagination--num"></div>
            <a href="javascript:;" class="pagination--next">next</a>
          </section>
      </div>
    </div>
  `;
  getNoticeData();

  // 공지사항 리스트 API
  async function getNoticeData() {
    try {
      const response = await axios.get('api/notice');
      pageNation(response, response.data.length);
      putCards(response.data.slice(0, 6));
    } catch (error) {
      console.error(error);
    }
  }

  function pageNation(response, responseLength) {
    const pagination = document.querySelector('.pagination--num');
    let str = '';
    let pageNumber = '1';

    for (let i = 0; i <= responseLength % 6; i++) {
      str += `<a href="javascript:" class="pagination--index" data-num="${i + 1}">${i + 1}</a>`;
    }
    pagination.innerHTML = str;

    pagination.addEventListener('click', function (event) {
      pageNumber = event.target.getAttribute('data-num');
      debugger;
      const startIndex = (pageNumber - 1) * 6;
      const endIndex = pageNumber * 6;
      putCards(response.data.slice(startIndex, endIndex));
    });

    return pageNumber;
  }

  function putCards(response) {
    const noticeCard = document.querySelector('.notice-card');
    noticeCard.innerHTML = response
      .map(item => {
        return `
        <li class="notice-card col-4" data-notice-num="${item.noticeNum}">
          <a href="#" class="notice-card__link"> 
            <div class="card-image__container">
              <div class="card-image__style" style="background-image: url(${item.img_path})"></div>  
            </div>
            <div class="card__details">
              <h4 class="detail__title">${item.title}</h4>
              <p class="detail__description">${item.content}</p>
            </div>
            <div class="card__author">
              <img src="${item.img_location}" class="author__img" />
              <div class="author__details">
                <div class="author__description">
                  <span class="author__position">${item.department}팀</span>
                  <span class="author__name">${item.name}</span>
                </div>
                <time>${formatDateTime(item.insert_date)}</time>
              </div>
            </div>
          </a>
        </li>
        `;
      })
      .join('');
  }
};
