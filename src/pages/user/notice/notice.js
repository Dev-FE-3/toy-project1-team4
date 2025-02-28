import { header } from './../../../components/header/header.js';
import { nav } from './../../../components/nav/nav.js';
import './notice.css';
import axios from 'axios';
import { formatDateTime } from '../../../util/utils';

export const notice = async function (content) {
  content.innerHTML = `
  ${await nav()}
    <div class="wrap">
    ${await header()}
      <div class="container">
        <div id="notice">
          <ul class="row notice-card">
          
          </ul>
        </div>
        <section class="pagination">
            <button type="button" class="pagination--prev">prev</button>  
            <div class="pagination--num"></div>
            <button type="button" class="pagination--next">next</button>
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
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  function pageNation(response, responseLength) {
    const pagination = document.querySelector('.pagination--num');
    let str = '';
    let pageNumber = '1';

    for (let i = 0; i < Math.ceil(responseLength / 6); i++) {
      str += `
      <button type="button" data-num="${i + 1}">${i + 1}</button>`;
    }
    pagination.innerHTML = str;
    pagination.querySelector('button').classList.add('active');

    pagination.addEventListener('click', function (event) {
      pageNumber = event.target.getAttribute('data-num');
      if (!pageNumber) return;

      const startIndex = (pageNumber - 1) * 6;
      const endIndex = pageNumber * 6;
      putCards(response.data.slice(startIndex, endIndex));
      activePageNumber(event, pageNumber);
    });

    return pageNumber;
  }

  //페이지 버튼 활성화
  function activePageNumber(event, pageNumber) {
    // event.target.classList.add('active');
    const activeButton = event.currentTarget.querySelectorAll('button');
    Array.from(activeButton).filter(item => {
      item.dataset.num === pageNumber ? item.classList.add('active') : item.classList.remove('active');
    });
  }

  function putCards(response) {
    const noticeCard = document.querySelector('.notice-card');
    noticeCard.innerHTML = response
      .map(item => {
        return `
        <li class="notice-card col-4 col-lg-6 col-md-12" data-notice-num="${item.noticeNum}">
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
