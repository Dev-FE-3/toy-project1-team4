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
            
          </section>
      </div>
    </div>
  `;

  // 페이징처리
  const itemsPerPage = 6;
  let allCardItem = [];
  let nowPage = 1;

  // 비동기로 data 가져오기
  async function getNoticeData() {
    try {
      const response = await axios.get('api/notice');
      allCardItem = response.data;
      renderNoticeCard(nowPage);
      cardPagingBtn();
    } catch (error) {
      console.error(error);
    }
  }

  // 각 페이지에 해당하는 카드 데이터 만들기
  function renderNoticeCard(page) {
    let noticeCard = document.querySelector('.notice-card');

    // 카드 6개씩 만듬
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const pageCardData = allCardItem.slice(startIndex, endIndex);

    noticeCard.innerHTML = pageCardData
      .map(item => {
        return `
            <li class="notice-card col-4" data-notice-num="${item.notice_num}">
              <a href="#" class="notice-card__link"> 
                <div class="card-image__container">
                  <div class="card-image__style" style="background-image: url(${item.img_path})"></div>  
                </div>
                <div class="card__details">
                  <h4 class="detail__title">${item.department}팀 ${item.title}</h4>
                  <p class="detail__description">${item.content}</p>
                </div>
                <div class="card__author">
                  <img src="${item.authorImg}" class="author__img" />
                  <div class="author__details">
                    <div class="author__description">
                      <span class="author__position">${item.department}</span>
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

  // 페이지네이션 버튼 만들기
  function cardPagingBtn() {
    let pagination = document.querySelector('.pagination');
    let paginationBar = '';
    const totalPages = Math.ceil(allCardItem.length / itemsPerPage);

    // pre 버튼
    if (nowPage > 1) {
      paginationBar += `<a href="#" class="pagination--prev" data-page="${nowPage - 1}">prev</a> `;
    }

    // 페이지 index 번호 버튼
    for (let i = 1; i <= totalPages; i++) {
      paginationBar += `<a href="#" class="pagination--index ${i === nowPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
    }

    //next 버튼
    if (nowPage < totalPages) {
      paginationBar += `<a href="#" class="pagination--next" data-page="${nowPage + 1}">next</a>`;
    }

    pagination.innerHTML = paginationBar;

    // 버튼 클릭 이벤트
    document.querySelectorAll('.pagination a').forEach(button => {
      button.addEventListener('click', () => {
        const clickBtn = parseInt(button.getAttribute('data-page'));
        nowPage = clickBtn;
        renderNoticeCard(nowPage);
      });
    });
  }
  getNoticeData();
};
