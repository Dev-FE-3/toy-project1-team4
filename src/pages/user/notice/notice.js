import './notice.css';
import axios from 'axios';
import noticeData from '../../../../server/data/notice.json';

const triggerRender = function (content) {
  notice(content);
};

const noticeItems = noticeData.data;
console.log('노션아이템들 확인 ::::   ' + noticeItems);
const cardsHTML = noticeItems.map(item => {
  return `
      <li class="notice-card col-4" data-notice-num="${item.cardNum}">
        <a href="#" class="notice-card__link"> 
          <div class="card-image__container">
            <div class="card-image__style" style="background-image: url(${item.cardImg})"></div>  
          </div>
          <div class="card__details">
            <h4 class="detail__title">${item.cardTitle}</h4>
            <p class="detail__description">${item.cardDescription}</p>
          </div>
          <div class="card__author">
            <img src="${item.authorImg}" class="author__img" />
            <div class="author__details">
              <div class="author__description">
                <span class="author__position">${item.authorPosition}</span>
                <span class="author__name">${item.authorName}</span>
              </div>
              <time>${item.date}</time>
            </div>
          </div>
        </a>
      </li>
    `;
});

const listLength = 6;
const indexLength = 8;
const initialIndex = 1;
const totalIndex = Math.ceil(noticeItems.length / listLength);
let paginationBarIndex = 1;
let currentIndex = initialIndex;

export const notice = function (content) {
  const paginationBtnsRender = function () {
    const paginationBtnList = [];
    for (
      let i = 1 + indexLength * (paginationBarIndex - 1);
      i <= indexLength * paginationBarIndex && i <= totalIndex;
      i++
    ) {
      paginationBtnList[i] = `<a href="javascript:;" 
        data-btn-index="${i}" 
        class="pagination--index ${
          i == currentIndex ? 'active' : ''
        }">${i}</a>`;
    }
    return paginationBtnList.join('');
  };

  const paginationBtnsAddEvent = function () {
    const indexBtn = document.querySelectorAll('.pagination--index');
    indexBtn.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentIndex = btn.dataset.btnIndex;
        triggerRender(content);
      });
    });

    const moveBtn = {
      prev: document.querySelector('.pagination--prev'),
      next: document.querySelector('.pagination--next'),
    };

    moveBtn.prev.addEventListener('click', function () {
      console.log('prev clicked');
      if (currentIndex > indexLength) {
        currentIndex -= indexLength;
        paginationBarIndex--;
      } else {
        currentIndex = 1;
      }

      triggerRender(content);
    });
    moveBtn.next.addEventListener('click', function () {
      if (totalIndex > indexLength) {
        if (currentIndex > Math.floor(totalIndex / indexLength) * indexLength) {
          currentIndex = totalIndex;
        } else {
          currentIndex = indexLength * paginationBarIndex + 1;
          paginationBarIndex++;
        }
      } else {
        currentIndex = totalIndex;
      }
      triggerRender(content);
    });

    return;
  };

  const paginationBtns = paginationBtnsRender();

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
            <ul class="row">
              ${cardsHTML
                .slice(
                  (currentIndex - 1) * listLength,
                  (currentIndex - 1) * listLength + listLength,
                )
                .join('')}
            </ul>
            <div class="pagination">
              <a href="#" class="pagination--prev"> prev </a>
                ${paginationBtns}
              <a href="#" class="pagination--next"> next </a>
            </div>
          </div>
        </div>
      </div>
    `;
  paginationBtnsAddEvent();
};
